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
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between pointer-events-none backdrop-blur-md bg-[#0b0c10]/70 border-b border-white/5">
      {/* Left Masthead */}
      <div className="flex items-center gap-4 pointer-events-auto">
        <div className="w-8 h-8 rounded border border-emerald-500/40 bg-emerald-950/30 flex items-center justify-center text-emerald-400 font-mono text-xs font-semibold tracking-wider shadow-[0_0_12px_rgba(16,185,129,0.2)]">
          3D
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-white/40 tracking-widest uppercase">STUDIO // SPATIAL</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <h1 className="font-display text-base font-bold tracking-tight text-white/90">
            ISOMETRIC SANCTUARY <span className="font-mono text-xs text-emerald-400 font-normal ml-1">v2.4</span>
          </h1>
        </div>
      </div>

      {/* Center Lighting Mode Pills */}
      <div className="hidden md:flex items-center bg-[#13161f]/90 border border-white/10 rounded-full p-1 gap-1 pointer-events-auto shadow-2xl">
        {(Object.keys(LIGHTING_PRESETS) as LightingPreset[]).map((key) => {
          const isActive = currentPreset === key;
          return (
            <button
              key={key}
              id={`preset-${key}`}
              onClick={() => onSelectPreset(key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-white/15 text-white shadow-sm border border-white/10'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              {key === 'midnight' && <Moon className="w-3.5 h-3.5 text-blue-400" />}
              {key === 'sunset' && <Sun className="w-3.5 h-3.5 text-amber-400" />}
              {key === 'studio' && <Sparkles className="w-3.5 h-3.5 text-slate-300" />}
              {key === 'cyber' && <Terminal className="w-3.5 h-3.5 text-emerald-400" />}
              <span className="capitalize">{key}</span>
            </button>
          );
        })}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 pointer-events-auto">
        {/* Model Status Indicator */}
        <button
          id="upload-model-btn"
          onClick={onOpenUploader}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
            isCustomModelActive
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
              : 'bg-[#141822]/90 border-white/10 text-white/70 hover:text-white hover:border-white/20'
          }`}
          title="Switch or upload custom .glb model"
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">
            {isCustomModelActive ? 'CUSTOM GLB' : 'LOAD .GLB'}
          </span>
        </button>

        {/* Ambient Audio Synthesizer */}
        <button
          id="audio-toggle-btn"
          onClick={handleToggleAudio}
          className={`p-2 rounded-lg border text-xs transition-all ${
            audioActive
              ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
              : 'bg-[#141822]/90 border-white/10 text-white/50 hover:text-white hover:border-white/20'
          }`}
          title={audioActive ? 'Mute generative room audio' : 'Play ambient room soundscape'}
        >
          {audioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Snapshot Capture */}
        <button
          id="snapshot-btn"
          onClick={onCaptureSnapshot}
          className="p-2 rounded-lg border border-white/10 bg-[#141822]/90 text-white/70 hover:text-white hover:border-white/20 transition-all"
          title="Capture high-resolution 3D viewport render"
        >
          <Camera className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
