import React from 'react';
import { RotateCw, Eye, Grid3X3, Layers, Compass, Play, Pause } from 'lucide-react';
import { CameraPreset } from '../types';

interface HeroOverlayProps {
  cameraPreset: CameraPreset;
  onSelectCamera: (preset: CameraPreset) => void;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  wireframe: boolean;
  onToggleWireframe: () => void;
  showGrid: boolean;
  onToggleGrid: () => void;
}

export function HeroOverlay({
  cameraPreset,
  onSelectCamera,
  autoRotate,
  onToggleAutoRotate,
  wireframe,
  onToggleWireframe,
  showGrid,
  onToggleGrid,
}: HeroOverlayProps) {
  const cameraPresets: { id: CameraPreset; label: string; angle: string }[] = [
    { id: 'isometric', label: 'Isometric 45°', angle: 'θ 45° / φ 35°' },
    { id: 'front', label: 'Elevation', angle: 'θ 0° / φ 15°' },
    { id: 'top', label: 'Blueprint', angle: 'θ 0° / φ 90°' },
    { id: 'desk', label: 'Workstation', angle: 'Target: Terminal' },
    { id: 'bed', label: 'Bedside', angle: 'Target: Lounge' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 md:p-10 pt-24 pb-8 overflow-hidden">
      {/* Top / Left Editorial Headline Section */}
      <div className="max-w-xl pointer-events-auto space-y-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded tracking-widest uppercase">
            ARCHITECTURAL DIORAMA
          </span>
          <span className="font-mono text-[11px] text-white/40 tracking-wider">
            SCALE: 1:15 // METRIC
          </span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.08]">
          TACTILE GEOMETRY &amp; <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
            AMBIENT RADIANCE.
          </span>
        </h2>

        <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-md font-sans font-light">
          An interactive isometric chamber sculpted for deep focus. Featuring PBR phosphor emission, organic Belgian linen textures, and calibrated directional illumination.
        </p>

        {/* Camera Views Selector */}
        <div className="pt-2">
          <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <Compass className="w-3 h-3 text-emerald-400" />
            CAMERA PERSPECTIVES
          </div>
          <div className="flex flex-wrap gap-1.5">
            {cameraPresets.map((preset) => {
              const active = cameraPreset === preset.id;
              return (
                <button
                  key={preset.id}
                  id={`cam-preset-${preset.id}`}
                  onClick={() => onSelectCamera(preset.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-200 border flex items-center gap-1.5 ${
                    active
                      ? 'bg-emerald-500/15 border-emerald-500/60 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                      : 'bg-[#11141c]/80 border-white/10 text-white/60 hover:text-white hover:border-white/20'
                  }`}
                >
                  <span>{preset.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Bar: Interaction Guidance & Live Viewport Toggles */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-auto w-full">
        {/* Interaction Hint */}
        <div className="flex items-center gap-3 bg-[#0d0f15]/90 border border-white/10 rounded-lg px-3.5 py-2 text-xs font-mono text-white/50 backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-emerald-400/80 animate-ping" />
          <span>DRAG TO ORBIT</span>
          <span className="text-white/20">•</span>
          <span>SCROLL TO ZOOM</span>
          <span className="text-white/20">•</span>
          <span>RIGHT-CLICK TO PAN</span>
        </div>

        {/* Quick Viewport Toggles */}
        <div className="flex items-center gap-2 bg-[#0d0f15]/90 border border-white/10 rounded-lg p-1.5 backdrop-blur-md">
          {/* Auto Rotate */}
          <button
            id="toggle-auto-rotate"
            onClick={onToggleAutoRotate}
            className={`px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1.5 transition-all ${
              autoRotate
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
            title="Toggle continuous room rotation"
          >
            {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>AUTO-ROTATE</span>
          </button>

          {/* Wireframe Mode */}
          <button
            id="toggle-wireframe"
            onClick={onToggleWireframe}
            className={`px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1.5 transition-all ${
              wireframe
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
            title="Inspect 3D polygon topology"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>WIREFRAME</span>
          </button>

          {/* Ground Grid */}
          <button
            id="toggle-grid"
            onClick={onToggleGrid}
            className={`px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1.5 transition-all ${
              showGrid
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
            title="Toggle ground architectural coordinate grid"
          >
            <Grid3X3 className="w-3.5 h-3.5" />
            <span>GRID</span>
          </button>
        </div>
      </div>
    </div>
  );
}
