import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
}

export function Footer({ onScrollToTop }: FooterProps) {
  return (
    <footer className="relative z-20 bg-[#050608] border-t border-white/10 px-4 sm:px-8 py-12 text-white/50 font-mono text-xs">
      <div className="max-w-[1720px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3.5">
          <div className="w-7 h-7 border border-white/20 bg-white/[0.04] flex items-center justify-center text-[11px] font-bold text-white">
            03
          </div>
          <div>
            <div className="text-white font-medium text-xs tracking-wider">
              ATELIER ORTHO // SPATIAL RESEARCH &amp; ARCH-VIZ
            </div>
            <div className="text-white/40 text-[10px] mt-0.5">
              THREE.JS • R3F • DREI • TAILWIND CSS • GLTF 2.0 PBR
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[10px] text-white/40">
          <span>ORTHO RATIO: 1:15</span>
          <span>•</span>
          <span>DAMPING: 0.05</span>
          <span>•</span>
          <span>POLAR RANGE: 45°–90°</span>
          <span>•</span>
          <span className="text-white">60 FPS VIEWPORT</span>
        </div>

        <button
          onClick={onScrollToTop}
          className="flex items-center gap-2 px-3 py-1.5 border border-white/15 bg-white/[0.02] text-white/70 hover:text-white hover:border-white/30 transition-colors text-[11px]"
        >
          <span>TOP OF VIEWPORT</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
