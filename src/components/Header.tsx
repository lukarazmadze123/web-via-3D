import React, { useState } from 'react';
import { Volume2, VolumeX, Camera, UploadCloud, Sun, Moon, Sparkles, Terminal } from 'lucide-react';
import { LightingPreset } from '../types';
import { LIGHTING_PRESETS } from '../data';
import { ambientSoundscape } from '../utils/audio';

interface HeaderProps {
  currentPreset: LightingPreset;
  onSelectPreset: (preset: LightingPreset) => void;
  onOpenUploader: () => void;
  onCaptureSnapshot: () => void;
  isCustomModelActive: boolean;
}

export function Header({
  currentPreset,
  onSelectPreset,
  onOpenUploader,
  onCaptureSnapshot,
  isCustomModelActive,
}: HeaderProps) {
  const [audioActive, setAudioActive] = useState(false);

  const handleToggleAudio = () => {
    const active = ambientSoundscape.toggle();
    setAudioActive(active);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0c0d12]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between text-xs">
      {/* Left Masthead */}
      <div className="flex items-center gap-3.5">
        <div className="w-7 h-7 border border-white/20 bg-white/[0.04] flex items-center justify-center font-mono text-[11px] font-semibold text-white tracking-wider">
          03
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
              ATELIER ORTHO // ARCH-VIZ
            </span>
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
          </div>
          <span className="font-display text-sm font-semibold tracking-tight text-white">
            ISOMETRIC SANCTUARY <span className="font-mono text-[10px] text-white/40 font-normal">REF: 842</span>
          </span>
        </div>
      </div>

      {/* Center Lighting Environment Switcher */}
      <div className="hidden lg:flex items-center border border-white/10 p-0.5 bg-[#12141c]">
        {(Object.keys(LIGHTING_PRESETS) as LightingPreset[]).map((key, idx) => {
          const isActive = currentPreset === key;
          const labels: Record<LightingPreset, string> = {
            midnight: '01 // MIDNIGHT',
            sunset: '02 // GOLDEN HOUR',
            studio: '03 // NEUTRAL',
            cyber: '04 // TOKYO NOIR',
          };
          return (
            <button
              key={key}
              id={`nav-preset-${key}`}
              onClick={() => onSelectPreset(key)}
              className={`px-3 py-1.5 font-mono text-[11px] transition-colors ${
                isActive
                  ? 'bg-white text-black font-semibold'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {labels[key]}
            </button>
          );
        })}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Model Asset Manager */}
        <button
          id="upload-model-btn"
          onClick={onOpenUploader}
          className={`flex items-center gap-2 px-3 py-1.5 border font-mono text-[11px] transition-colors ${
            isCustomModelActive
              ? 'border-emerald-500/60 bg-emerald-950/30 text-emerald-300'
              : 'border-white/15 bg-white/[0.02] text-white/70 hover:text-white hover:border-white/30'
          }`}
          title="Switch or upload custom .glb model"
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">
            {isCustomModelActive ? 'CUSTOM MODEL' : 'IMPORT .GLB'}
          </span>
        </button>

        {/* Ambient Room Soundscape */}
        <button
          id="audio-toggle-btn"
          onClick={handleToggleAudio}
          className={`p-2 border transition-colors ${
            audioActive
              ? 'border-white bg-white text-black'
              : 'border-white/15 bg-white/[0.02] text-white/60 hover:text-white hover:border-white/30'
          }`}
          title={audioActive ? 'Mute ambient room audio' : 'Play ambient audio soundscape'}
        >
          {audioActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>

        {/* High-Resolution Viewport Render Snapshot */}
        <button
          id="snapshot-btn"
          onClick={onCaptureSnapshot}
          className="flex items-center gap-1.5 px-2.5 py-1.5 border border-white/15 bg-white/[0.02] text-white/70 hover:text-white hover:border-white/30 transition-colors font-mono text-[11px]"
          title="Capture viewport render"
        >
          <Camera className="w-3.5 h-3.5" />
          <span className="hidden md:inline">RENDER</span>
        </button>
      </div>
    </header>
  );
}
