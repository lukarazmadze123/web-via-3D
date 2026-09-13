import React, { useState, useRef, useCallback } from 'react';
import { CameraPreset, LightingPreset } from './types';
import { LIGHTING_PRESETS } from './data';
import { Scene3D } from './components/Scene3D';
import { Header } from './components/Header';
import { HeroOverlay } from './components/HeroOverlay';
import { MaterialInspector } from './components/MaterialInspector';
import { ArchitecturalBreakdown } from './components/ArchitecturalBreakdown';
import { ModelUploaderModal } from './components/ModelUploaderModal';
import { Footer } from './components/Footer';
import { UploadCloud } from 'lucide-react';

export default function App() {
  const [lightingPreset, setLightingPreset] = useState<LightingPreset>('midnight');
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('isometric');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [activeMaterialId, setActiveMaterialId] = useState<string | null>(null);

  const [customGlbUrl, setCustomGlbUrl] = useState<string | null>(null);
  const [customFilename, setCustomFilename] = useState<string | undefined>(undefined);
  const [isUploaderOpen, setIsUploaderOpen] = useState<boolean>(false);
  const [isDraggingOverCanvas, setIsDraggingOverCanvas] = useState<boolean>(false);

  const canvasElementRef = useRef<HTMLCanvasElement | null>(null);

  const activeLightingConfig = LIGHTING_PRESETS[lightingPreset];

  // Snapshot capture handler
  const handleCaptureSnapshot = useCallback(() => {
    if (!canvasElementRef.current) return;
    try {
      const dataUrl = canvasElementRef.current.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `isometric-room-${lightingPreset}-${Date.now()}.png`;
      a.click();
    } catch (e) {
      console.warn('Unable to capture screenshot from canvas buffer', e);
    }
  }, [lightingPreset]);

  // Window drag & drop handler for .glb
  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOverCanvas(true);
  };

  const handleCanvasDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOverCanvas(false);
  };

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOverCanvas(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.glb') || file.name.endsWith('.gltf')) {
        const objectUrl = URL.createObjectURL(file);
        setCustomGlbUrl(objectUrl);
        setCustomFilename(file.name);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#0b0c10] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* ========================================================
          1. HERO 3D VIEWPORT CONTAINER
         ======================================================== */}
      <section
        className="relative w-full h-screen overflow-hidden"
        onDragOver={handleCanvasDragOver}
        onDragLeave={handleCanvasDragLeave}
        onDrop={handleCanvasDrop}
      >
        {/* Global Navigation Header */}
        <Header
          currentPreset={lightingPreset}
          onSelectPreset={setLightingPreset}
          onOpenUploader={() => setIsUploaderOpen(true)}
          onCaptureSnapshot={handleCaptureSnapshot}
          isCustomModelActive={!!customGlbUrl}
        />

        {/* 3D WebGL Canvas Layer */}
        <div className="absolute inset-0 w-full h-full">
          <Scene3D
            lighting={activeLightingConfig}
            autoRotate={autoRotate}
            cameraPreset={cameraPreset}
            wireframe={wireframe}
            activeMaterialId={activeMaterialId}
            customGlbUrl={customGlbUrl}
            showGrid={showGrid}
            onCanvasReady={(canvas) => {
              canvasElementRef.current = canvas;
            }}
          />
        </div>

        {/* Editorial Typography & Controls Overlay */}
        <HeroOverlay
          cameraPreset={cameraPreset}
          onSelectCamera={setCameraPreset}
          autoRotate={autoRotate}
          onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
          wireframe={wireframe}
          onToggleWireframe={() => setWireframe(!wireframe)}
          showGrid={showGrid}
          onToggleGrid={() => setShowGrid(!showGrid)}
        />

        {/* Drop indicator if user drags a .glb file over the screen */}
        {isDraggingOverCanvas && (
          <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center border-4 border-dashed border-emerald-500 pointer-events-none">
            <UploadCloud className="w-16 h-16 text-emerald-400 animate-bounce mb-3" />
            <div className="font-display text-2xl font-bold text-white">
              DROP YOUR .GLB MODEL HERE
            </div>
            <div className="font-mono text-xs text-white/50 mt-1">
              Supports room.glb with embedded nodes and materials
            </div>
          </div>
        )}
      </section>

      {/* ========================================================
          2. INTERACTIVE MATERIAL INSPECTOR
         ======================================================== */}
      <MaterialInspector
        activeMaterialId={activeMaterialId}
        onSelectMaterial={setActiveMaterialId}
      />

      {/* ========================================================
          3. ARCHITECTURAL BREAKDOWN & METHODOLOGY
         ======================================================== */}
      <ArchitecturalBreakdown />

      {/* ========================================================
          4. FOOTER & CREDITS
         ======================================================== */}
      <Footer onScrollToTop={scrollToTop} />

      {/* ========================================================
          5. MODEL UPLOADER MODAL
         ======================================================== */}
      <ModelUploaderModal
        isOpen={isUploaderOpen}
        onClose={() => setIsUploaderOpen(false)}
        onLoadCustomModel={(url, filename) => {
          setCustomGlbUrl(url);
          setCustomFilename(filename);
        }}
        currentCustomUrl={customGlbUrl}
        currentFilename={customFilename}
      />
    </div>
  );
}
