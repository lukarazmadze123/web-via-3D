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
import { UploadCloud, CornerDownRight, Crosshair } from 'lucide-react';

export default function App() {
  const [lightingPreset, setLightingPreset] = useState<LightingPreset>('midnight');
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('isometric');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [allowZoom, setAllowZoom] = useState<boolean>(false);
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
      a.download = `atelier-room-${lightingPreset}-${Date.now()}.png`;
      a.click();
    } catch (e) {
      console.warn('Unable to capture screenshot from canvas buffer', e);
    }
  }, [lightingPreset]);

  // Drag & drop handler for .glb
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
    <div className="relative min-h-screen bg-[#07080b] text-neutral-100 selection:bg-white selection:text-black">
      {/* Global Studio Masthead */}
      <Header
        currentPreset={lightingPreset}
        onSelectPreset={setLightingPreset}
        onOpenUploader={() => setIsUploaderOpen(true)}
        onCaptureSnapshot={handleCaptureSnapshot}
        isCustomModelActive={!!customGlbUrl}
      />

      {/* ========================================================
          1. FRAMED ARCHITECTURAL EXHIBITION STAGE (SPLIT LAYOUT)
         ======================================================== */}
      <section className="relative px-4 sm:px-8 py-6 lg:py-10 max-w-[1720px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Editorial Dossier & Camera/Lighting Controls */}
          <div className="lg:col-span-5 xl:col-span-4 border border-white/10 bg-[#0d0e13] p-6 sm:p-8 flex flex-col justify-between">
            <HeroOverlay
              cameraPreset={cameraPreset}
              onSelectCamera={setCameraPreset}
              autoRotate={autoRotate}
              onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
              wireframe={wireframe}
              onToggleWireframe={() => setWireframe(!wireframe)}
              showGrid={showGrid}
              onToggleGrid={() => setShowGrid(!showGrid)}
              allowZoom={allowZoom}
              onToggleZoom={() => setAllowZoom(!allowZoom)}
              lightingPreset={lightingPreset}
              onSelectLighting={setLightingPreset}
            />
          </div>

          {/* Right Column: Framed Architectural Viewport */}
          <div
            className="lg:col-span-7 xl:col-span-8 relative border border-white/15 bg-[#0b0c10] flex flex-col justify-between min-h-[580px] lg:min-h-[760px]"
            onDragOver={handleCanvasDragOver}
            onDragLeave={handleCanvasDragLeave}
            onDrop={handleCanvasDrop}
          >
            {/* Viewport Top Telemetry Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#0e1016] font-mono text-[11px] text-white/50 select-none z-10">
              <div className="flex items-center gap-3">
                <span className="text-white font-semibold flex items-center gap-1.5">
                  <Crosshair className="w-3.5 h-3.5 text-white" />
                  VIEWPORT 01
                </span>
                <span className="hidden sm:inline text-white/20">•</span>
                <span className="hidden sm:inline">PROJECTION: AXONOMETRIC 45°</span>
              </div>
              <div className="flex items-center gap-3 text-[10px]">
                <span>FOV: 45°</span>
                <span>•</span>
                <span>CAM: [5, 5, 5]</span>
                <span>•</span>
                <span className="text-white">DAMPING: 0.05</span>
              </div>
            </div>

            {/* Corner Registration Crosshairs (Non-interactive) */}
            <div className="absolute top-11 left-3 font-mono text-[10px] text-white/20 pointer-events-none select-none z-10">
              + 0,0
            </div>
            <div className="absolute top-11 right-3 font-mono text-[10px] text-white/20 pointer-events-none select-none z-10">
              + 1920,0
            </div>
            <div className="absolute bottom-11 left-3 font-mono text-[10px] text-white/20 pointer-events-none select-none z-10">
              + 0,1080
            </div>
            <div className="absolute bottom-11 right-3 font-mono text-[10px] text-white/20 pointer-events-none select-none z-10">
              + 1920,1080
            </div>

            {/* 3D WebGL Canvas Viewport Stage */}
            <div className="relative w-full flex-1 min-h-[500px] lg:min-h-[660px]">
              <Scene3D
                lighting={activeLightingConfig}
                autoRotate={autoRotate}
                cameraPreset={cameraPreset}
                wireframe={wireframe}
                activeMaterialId={activeMaterialId}
                customGlbUrl={customGlbUrl}
                showGrid={showGrid}
                allowZoom={allowZoom}
                onCanvasReady={(canvas) => {
                  canvasElementRef.current = canvas;
                }}
              />
            </div>

            {/* Viewport Bottom Status Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-2.5 border-t border-white/10 bg-[#0e1016] font-mono text-[11px] text-white/40 gap-2 z-10">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-white/70">CLICK &amp; DRAG TO ORBIT</span>
                <span className="text-white/20">•</span>
                <span>WHEEL SCROLLS PAGE NORMALLY</span>
              </div>
              <div className="flex items-center gap-2 text-[10px]">
                <span>DRAG &amp; DROP .GLB ANYWHERE ON CANVAS</span>
              </div>
            </div>

            {/* Drag & drop overlay indicator if user drags a file */}
            {isDraggingOverCanvas && (
              <div className="absolute inset-0 z-50 bg-black/85 flex flex-col items-center justify-center border-2 border-dashed border-white pointer-events-none">
                <UploadCloud className="w-12 h-12 text-white animate-bounce mb-3" />
                <div className="font-mono text-sm font-bold text-white tracking-wider">
                  DROP .GLB ARCHITECTURAL MODEL HERE
                </div>
                <div className="font-mono text-xs text-white/50 mt-1">
                  Model bounds will automatically center at [0, 0, 0]
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          2. MATERIAL & SURFACE SPECIMEN TAXONOMY
         ======================================================== */}
      <MaterialInspector
        activeMaterialId={activeMaterialId}
        onSelectMaterial={setActiveMaterialId}
      />

      {/* ========================================================
          3. ARCHITECTURAL METHODOLOGY & BLUEPRINT SPECIFICATION
         ======================================================== */}
      <ArchitecturalBreakdown />

      {/* ========================================================
          4. ATELIER COLOPHON & DIAGNOSTICS
         ======================================================== */}
      <Footer onScrollToTop={scrollToTop} />

      {/* ========================================================
          5. 3D MODEL IMPORT MODAL
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
