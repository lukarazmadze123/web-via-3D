import React from 'react';
import { ArrowUp, Terminal, Shield, Sparkles } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
}

export function Footer({ onScrollToTop }: FooterProps) {
  return (
    <footer className="relative z-20 bg-[#07080b] border-t border-white/10 px-6 lg:px-12 py-12 text-white/50 font-sans text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-7 h-7 rounded border border-white/15 bg-white/5 flex items-center justify-center font-mono text-[11px] font-bold text-white">
            03
          </div>
          <div>
            <div className="text-white font-medium text-sm">
              ATELIER // ISOMETRIC ROOM DIORAMA
            </div>
            <div className="text-white/40 font-mono text-[11px]">
              ENGINEERED WITH REACT • THREE.JS • R3F • DREI • TAILWIND CSS
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 font-mono text-[11px]">
          <span className="text-white/40">GLTF 2.0 COMPLIANT</span>
          <span className="text-white/20">•</span>
          <span className="text-emerald-400">PBR EMISSION ENABLED</span>
          <span className="text-white/20">•</span>
          <span className="text-white/40">60 FPS VIEWPORT</span>
        </div>

        <button
          onClick={onScrollToTop}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-white hover:border-white/20 transition-all font-mono text-xs"
        >
          <span>FOCUS VIEWPORT</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
