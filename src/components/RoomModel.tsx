import React, { useMemo, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  url?: string;
  wireframe?: boolean;
  [key: string]: unknown;
}

export function UserRoomGLTF({ url = '/room.glb', wireframe = false, ...props }: ModelProps) {
  const gltf = useGLTF(url);
  const nodes = gltf.nodes as Record<string, any>;
  const materials = gltf.materials as Record<string, any>;

  // Boost emissive materials if present
  useEffect(() => {
    if (materials['GREEN EMIT']) {
      const mat = materials['GREEN EMIT'] as THREE.MeshStandardMaterial;
      mat.emissive = new THREE.Color('#10b981');
      mat.emissiveIntensity = 2.5;
      mat.toneMapped = false;
    }
    if (materials.EMISSION) {
      const mat = materials.EMISSION as THREE.MeshStandardMaterial;
      mat.emissive = new THREE.Color('#38bdf8');
      mat.emissiveIntensity = 2.0;
      mat.toneMapped = false;
    }
    if (materials.ORANGE) {
      const mat = materials.ORANGE as THREE.MeshStandardMaterial;
      mat.emissive = new THREE.Color('#ea580c');
      mat.emissiveIntensity = 1.0;
    }
    if (materials.BEDSHEET) {
      const mat = materials.BEDSHEET as THREE.MeshStandardMaterial;
      mat.roughness = 0.85;
    }
  }, [materials]);

  // Update wireframe mode
  useEffect(() => {
    Object.values(materials).forEach((mat: any) => {
      if (mat) {
        mat.wireframe = wireframe;
      }
    });
  }, [materials, wireframe]);

  // If the gltf has the specific Cube003 & Wall nodes from the prompt:
  const hasExactNodes = nodes.Wall && nodes.Cube003;

  if (!hasExactNodes) {
    // Graceful fallback to full scene if user dropped an exported glb with varied names
    return <primitive object={gltf.scene} castShadow receiveShadow {...props} />;
  }

  return (
    <group {...props} dispose={null}>
      <group position={[0, 0.122, 0.705]} rotation={[-Math.PI / 2, 0, 0]} scale={0.105}>
        <mesh castShadow receiveShadow geometry={nodes.Wall.geometry} material={materials['FLOOR.001']} />
        <mesh castShadow receiveShadow geometry={nodes.Wall_1.geometry} material={materials['DARK GREY.001']} />
        <mesh castShadow receiveShadow geometry={nodes.Wall_2.geometry} material={materials['LIGHT GREY.001']} />
      </group>
      <group position={[0, 1.313, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube003.geometry} material={materials.WALL} />
        <mesh castShadow receiveShadow geometry={nodes.Cube003_1.geometry} material={materials.TEXTURE} />
        <mesh castShadow receiveShadow geometry={nodes.Cube003_2.geometry} material={materials['LIGHT GREY']} />
        <mesh castShadow receiveShadow geometry={nodes.Cube003_3.geometry} material={materials.EMISSION} />
        <mesh castShadow receiveShadow geometry={nodes.Cube003_4.geometry} material={materials['DARK GREY']} />
        <mesh castShadow receiveShadow geometry={nodes.Cube003_5.geometry} material={materials['GREEN EMIT']} />
        <mesh castShadow receiveShadow geometry={nodes.Cube003_6.geometry} material={materials.ORANGE} />
        <mesh castShadow receiveShadow geometry={nodes.Cube003_7.geometry} material={materials.WHITE} />
        <mesh castShadow receiveShadow geometry={nodes.Cube003_8.geometry} material={materials.GREEN} />
        <mesh castShadow receiveShadow geometry={nodes.Cube003_9.geometry} material={materials.ROCK1} />
        <mesh castShadow receiveShadow geometry={nodes.Cube003_10.geometry} material={materials.ROCK2} />
        <mesh castShadow receiveShadow geometry={nodes.Cube003_11.geometry} material={materials.ROCK3} />
        <mesh castShadow receiveShadow geometry={nodes.Cube003_12.geometry} material={materials.BEDSHEET} />
        <mesh castShadow receiveShadow geometry={nodes.Cube003_13.geometry} material={materials.BED} />
        <mesh castShadow receiveShadow geometry={nodes.Cube003_14.geometry} material={materials.PAPER} />
        <mesh castShadow receiveShadow geometry={nodes.Cube003_15.geometry} material={materials.BOOK1} />
        <mesh castShadow receiveShadow geometry={nodes.Cube003_16.geometry} material={materials.BOOK2} />
        <mesh castShadow receiveShadow geometry={nodes.Cube003_17.geometry} material={materials.BOOK3} />
        <mesh castShadow receiveShadow geometry={nodes.Cube003_18.geometry} material={materials.BLUE} />
      </group>
    </group>
  );
}

// Error Boundary for GLTF loading
interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ModelErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn('GLTF load failed or /room.glb not found, switching to procedural architectural room fallback.', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
