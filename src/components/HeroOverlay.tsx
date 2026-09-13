import React from 'react';
import { CameraPreset, LightingPreset } from '../types';
import { LIGHTING_PRESETS } from '../data';
import { Compass, RotateCw, Pause, Play, Layers, Grid3X3, Lock, Unlock } from 'lucide-react';

interface HeroOverlayProps {
  cameraPreset: CameraPreset;
  onSelectCamera: (preset: CameraPreset) => void;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  wireframe: boolean;
  onToggleWireframe: () => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  allowZoom: boolean;
  onToggleZoom: () => void;
  lightingPreset: LightingPreset;
  onSelectLighting: (preset: LightingPreset) => void;
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
  allowZoom,
  onToggleZoom,
  lightingPreset,
  onSelectLighting,
}: HeroOverlayProps) {
  const cameraPresets: { id: CameraPreset; label: string; code: string; angle: string }[] = [
    { id: 'isometric', label: 'ISOMETRIC 45°', code: 'CAM-01', angle: 'θ 45° // φ 35°' },
    { id: 'front', label: 'ELEVATION 0°', code: 'CAM-02', angle: 'θ 0° // φ 15°' },
    { id: 'top', label: 'PLAN PROJECTION', code: 'CAM-03', angle: 'θ 0° // φ 90°' },
    { id: 'desk', label: 'WORKSTATION', code: 'CAM-04', angle: 'TARGET: OLED' },
    { id: 'bed', label: 'LOUNGE ALCOVE', code: 'CAM-05', angle: 'TARGET: LINEN' },
  ];

  const lightingLabels: Record<LightingPreset, { title: string; kelvin: string }> = {
    midnight: { title: 'MIDNIGHT OBSIDIAN', kelvin: 'PBR 1.4' },
    sunset: { title: 'GOLDEN HOUR', kelvin: '3200K' },
    studio: { title: 'ARCHITECTURAL NEUTRAL', kelvin: '6500K' },
    cyber: { title: 'TOKYO NOIR', kelvin: '520NM' },
  };

  return (
    <div className="flex flex-col justify-between h-full space-y-6">
      {/* Top Editorial Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5 font-mono text-[11px] text-white/50 tracking-[0.15em] uppercase">
          <span className="text-white font-bold">PLATE 01</span>
          <span>//</span>
          <span>AXONOMETRIC SPATIAL RESIDENCE</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-[1.08]">
          THE ISOMETRIC <br />
          SANCTUARY.
        </h2>

        <p className="text-white/60 text-xs sm:text-sm font-sans font-light leading-relaxed max-w-lg">
          A spatial contemplation chamber engineered with 45° orthogonal projection. Calibrated with physical PBR micro-faceting, 520nm phosphor terminal illumination, and tactile Belgian linen textures.
        </p>
      </div>

      {/* Camera Perspectives Selector */}
      <div className="space-y-2.5 pt-2 border-t border-white/10">
        <div className="flex items-center justify-between font-mono text-[10px] text-white/40 uppercase tracking-widest">
          <span className="flex items-center gap-1.5">
            <Compass className="w-3 h-3 text-white/70" />
            CAMERA PROJECTIONS
          </span>
          <span>5 PRESETS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5">
          {cameraPresets.map((preset) => {
            const isActive = cameraPreset === preset.id;
            return (
              <button
                key={preset.id}
                id={`cam-preset-${preset.id}`}
                onClick={() => onSelectCamera(preset.id)}
                className={`text-left px-3 py-2 border font-mono text-xs transition-colors flex items-center justify-between ${
                  isActive
                    ? 'border-white bg-white text-black font-semibold'
                    : 'border-white/10 bg-[#101218] text-white/60 hover:text-white hover:border-white/25'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] ${isActive ? 'text-black/60' : 'text-white/30'}`}>
                    {preset.code}
                  </span>
                  <span>{preset.label}</span>
                </div>
                <span className={`text-[10px] ${isActive ? 'text-black/60' : 'text-white/30'}`}>
                  {preset.angle}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lighting Environment Selector */}
      <div className="space-y-2.5 pt-2 border-t border-white/10">
        <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest flex items-center justify-between">
          <span>ILLUMINATION ATMOSPHERE</span>
          <span>KELVIN / PBR</span>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          {(Object.keys(lightingLabels) as LightingPreset[]).map((key) => {
            const isActive = lightingPreset === key;
            const item = lightingLabels[key];
            return (
              <button
                key={key}
                id={`lighting-select-${key}`}
                onClick={() => onSelectLighting(key)}
                className={`text-left p-2.5 border font-mono text-xs transition-colors ${
                  isActive
                    ? 'border-white bg-white text-black font-semibold'
                    : 'border-white/10 bg-[#101218] text-white/60 hover:text-white hover:border-white/25'
                }`}
              >
                <div className="text-[10px] text-white/40">{item.kelvin}</div>
                <div className="truncate mt-0.5">{item.title}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Viewport Control Toggles */}
      <div className="pt-2 border-t border-white/10 space-y-2">
        <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
          VIEWPORT CALIBRATION
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-1.5">
          {/* Auto Rotation */}
          <button
            id="toggle-auto-rotate"
            onClick={onToggleAutoRotate}
            className={`px-2.5 py-2 border font-mono text-[11px] flex items-center justify-between transition-colors ${
              autoRotate
                ? 'border-white/40 bg-white/10 text-white'
                : 'border-white/10 bg-[#101218] text-white/50 hover:text-white'
            }`}
            title="Toggle continuous room rotation"
          >
            <span className="flex items-center gap-1.5">
              {autoRotate ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>ROTATION</span>
            </span>
            <span className="text-[9px] text-white/40">{autoRotate ? 'ON' : 'OFF'}</span>
          </button>

          {/* Wireframe Topology */}
          <button
            id="toggle-wireframe"
            onClick={onToggleWireframe}
            className={`px-2.5 py-2 border font-mono text-[11px] flex items-center justify-between transition-colors ${
              wireframe
                ? 'border-white/40 bg-white/10 text-white'
                : 'border-white/10 bg-[#101218] text-white/50 hover:text-white'
            }`}
            title="Inspect 3D polygon topology"
          >
            <span className="flex items-center gap-1.5">
              <Layers className="w-3 h-3" />
              <span>WIREFRAME</span>
            </span>
            <span className="text-[9px] text-white/40">{wireframe ? 'ON' : 'OFF'}</span>
          </button>

          {/* Metric Ground Grid */}
          <button
            id="toggle-grid"
            onClick={onToggleGrid}
            className={`px-2.5 py-2 border font-mono text-[11px] flex items-center justify-between transition-colors ${
              showGrid
                ? 'border-white/40 bg-white/10 text-white'
                : 'border-white/10 bg-[#101218] text-white/50 hover:text-white'
            }`}
            title="Toggle ground architectural metric grid"
          >
            <span className="flex items-center gap-1.5">
              <Grid3X3 className="w-3 h-3" />
              <span>METRIC GRID</span>
            </span>
            <span className="text-[9px] text-white/40">{showGrid ? 'ON' : 'OFF'}</span>
          </button>

          {/* Wheel Zoom Lock Toggle */}
          <button
            id="toggle-zoom"
            onClick={onToggleZoom}
            className={`px-2.5 py-2 border font-mono text-[11px] flex items-center justify-between transition-colors ${
              allowZoom
                ? 'border-emerald-500/60 bg-emerald-950/20 text-emerald-300'
                : 'border-white/10 bg-[#101218] text-white/50 hover:text-white'
            }`}
            title="When locked, trackpad/wheel scrolls the webpage seamlessly without capturing zoom"
          >
            <span className="flex items-center gap-1.5">
              {allowZoom ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
              <span>WHEEL ZOOM</span>
            </span>
            <span className="text-[9px] text-white/40">{allowZoom ? 'UNLOCKED' : 'LOCKED'}</span>
          </button>
        </div>

        <div className="font-mono text-[10px] text-white/35 pt-1">
          {allowZoom
            ? '• Wheel Zoom Unlocked: Scroll wheel zooms 3D model.'
            : '• Wheel Zoom Locked: Scroll wheel moves down the webpage seamlessly.'}
        </div>
      </div>
    </div>
  );
}
