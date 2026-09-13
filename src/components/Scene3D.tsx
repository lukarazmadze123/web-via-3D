import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Grid, Center } from '@react-three/drei';
import * as THREE from 'three';
import { CameraPreset, LightingConfig } from '../types';
import { ProceduralRoom } from './ProceduralRoom';
import { UserRoomGLTF, ModelErrorBoundary } from './RoomModel';

interface Scene3DProps {
  lighting: LightingConfig;
  autoRotate: boolean;
  cameraPreset: CameraPreset;
  wireframe: boolean;
  activeMaterialId: string | null;
  customGlbUrl: string | null;
  showGrid: boolean;
  allowZoom?: boolean;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}

// Camera controller with smooth lerp interpolation
function CameraRig({ preset }: { preset: CameraPreset }) {
  const { camera } = useThree();
  const controlsRef = useThree((state) => state.controls as any);

  const targets: Record<CameraPreset, { pos: [number, number, number]; lookAt: [number, number, number] }> = {
    isometric: { pos: [5.0, 5.0, 5.0], lookAt: [0, 0.8, 0] },
    front: { pos: [0, 2.4, 6.2], lookAt: [0, 0.9, 0] },
    top: { pos: [0.01, 7.5, 0.01], lookAt: [0, 0.4, 0] },
    desk: { pos: [2.5, 2.0, 0.4], lookAt: [1.2, 1.1, -1.0] },
    bed: { pos: [-2.6, 2.0, 0.8], lookAt: [-1.1, 0.8, -0.9] },
  };

  const target = targets[preset];
  const desiredPos = useRef(new THREE.Vector3(...target.pos));
  const desiredLookAt = useRef(new THREE.Vector3(...target.lookAt));

  useEffect(() => {
    desiredPos.current.set(...target.pos);
    desiredLookAt.current.set(...target.lookAt);
  }, [preset]);

  useFrame((_, delta) => {
    camera.position.lerp(desiredPos.current, Math.min(delta * 4, 0.15));
    if (controlsRef && controlsRef.target) {
      controlsRef.target.lerp(desiredLookAt.current, Math.min(delta * 4, 0.15));
    }
  });

  return null;
}

// Canvas capture helper
function CanvasGrabber({ onReady }: { onReady?: (canvas: HTMLCanvasElement) => void }) {
  const { gl } = useThree();
  useEffect(() => {
    if (onReady) {
      onReady(gl.domElement);
    }
  }, [gl, onReady]);
  return null;
}

export function Scene3D({
  lighting,
  autoRotate,
  cameraPreset,
  wireframe,
  activeMaterialId,
  customGlbUrl,
  showGrid,
  allowZoom = false,
  onCanvasReady,
}: Scene3DProps) {
  return (
    <div className="relative w-full h-full select-none cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
          preserveDrawingBuffer: true,
        }}
        camera={{ position: [5, 5, 5], fov: 45 }}
      >
        <color attach="background" args={[lighting.bgHex]} />
        <fog attach="fog" args={[lighting.bgHex, 14, 30]} />

        <CanvasGrabber onReady={onCanvasReady} />
        <CameraRig preset={cameraPreset} />

        {/* OrbitControls with strict damping, vertical limits, and scroll-safe zoom control */}
        <OrbitControls
          makeDefault
          enableDamping={true}
          dampingFactor={0.05}
          enableZoom={allowZoom}
          minDistance={3.5}
          maxDistance={12.0}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          autoRotate={autoRotate}
          autoRotateSpeed={0.8}
        />

        {/* Calibrated Studio Lighting */}
        <ambientLight color={lighting.ambientColor} intensity={lighting.ambientIntensity} />

        <directionalLight
          position={lighting.directionalPos}
          color={lighting.directionalColor}
          intensity={lighting.directionalIntensity}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={25}
          shadow-camera-left={-4.5}
          shadow-camera-right={4.5}
          shadow-camera-top={4.5}
          shadow-camera-bottom={-4.5}
          shadow-bias={-0.0002}
        />

        {/* Rim / Fill Light */}
        <directionalLight
          position={[-6, 4, -5]}
          color="#94a3b8"
          intensity={0.3}
        />

        {/* Specific Emissive Point Lights making materials pop */}
        <pointLight
          position={[1.4, 1.45, -1.0]}
          color={lighting.screenGlowColor}
          intensity={lighting.screenGlowIntensity}
          distance={3.2}
          decay={2}
        />

        <pointLight
          position={[-2.0, 0.95, 0.7]}
          color={lighting.lampGlowColor}
          intensity={lighting.lampGlowIntensity}
          distance={3.5}
          decay={2}
        />

        {/* Subtle Architectural Metric Grid */}
        {showGrid && (
          <Grid
            position={[0, -0.01, 0]}
            args={[14, 14]}
            cellSize={0.5}
            cellThickness={0.7}
            cellColor="#262b36"
            sectionSize={2.0}
            sectionThickness={1.0}
            sectionColor="#3d4454"
            fadeDistance={16}
            fadeStrength={1.5}
          />
        )}

        {/* 3D Model Centered with Drei Center component to guarantee correct bounds & scale */}
        <Suspense fallback={null}>
          <Center top position={[0, 0, 0]}>
            {customGlbUrl ? (
              <ModelErrorBoundary
                fallback={
                  <ProceduralRoom
                    wireframe={wireframe}
                    activeMaterialId={activeMaterialId}
                  />
                }
              >
                <UserRoomGLTF
                  url={customGlbUrl}
                  wireframe={wireframe}
                />
              </ModelErrorBoundary>
            ) : (
              <ProceduralRoom
                wireframe={wireframe}
                activeMaterialId={activeMaterialId}
              />
            )}
          </Center>
        </Suspense>

        {/* Ground Contact Shadow */}
        <ContactShadows
          position={[0, -0.01, 0]}
          opacity={0.65}
          scale={7.5}
          blur={1.8}
          far={3.0}
          resolution={1024}
          color="#000000"
        />
      </Canvas>
    </div>
  );
}
