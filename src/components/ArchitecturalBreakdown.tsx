import React from 'react';
import { Box, Cpu, Compass, SunDim, ShieldCheck, Flame } from 'lucide-react';

export function ArchitecturalBreakdown() {
  const pillars = [
    {
      num: '01',
      title: 'Axonometric Spatial Calibration',
      subtitle: 'True Isometric Depth Ratio',
      desc: 'Formulated with an optical 45° angle and calibrated vertical compression to eliminate perspective distortion while emphasizing structural silhouettes and negative floor space.',
      tag: 'OPTICAL MATRIX',
      icon: Compass,
    },
    {
      num: '02',
      title: 'Phosphor & Tungsten Emission',
      subtitle: 'Sub-surface Glow Pipeline',
      desc: 'Real-time emissive shaders casting dynamic radial point-light falloff from the IDE terminal screen (GREEN EMIT) and bedside nightstand (ORANGE) onto surrounding matte surfaces.',
      tag: 'PBR RADIANCE',
      icon: Flame,
    },
    {
      num: '03',
      title: 'Low-Poly Tactile Materiality',
      subtitle: 'Basalt & Belgian Linen',
      desc: 'Harmonizing hard-surface architectural concrete (WALL) and brushed basalt flooring (FLOOR.001) with soft diffuse microfiber bedsheets and hand-sculpted zen river stones.',
      tag: 'TEXTILE & STONE',
      icon: Box,
    },
  ];

  return (
    <section className="relative z-20 bg-[#08090d] border-t border-white/5 px-6 lg:px-12 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="font-mono text-xs text-emerald-400 tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-0.5 bg-emerald-400" />
            DESIGN METHODOLOGY
          </div>
          <h3 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            ARCHITECTURAL PRINCIPLES &amp; SPATIAL HIERARCHY
          </h3>
          <p className="text-white/60 text-sm sm:text-base font-sans font-light leading-relaxed">
            Constructed with deliberate restraint. Rejecting generic saturated AI clichés in pursuit of editorial precision, refined contrast, and physical presence.
          </p>
        </div>

        {/* Asymmetric 3-Column Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="bg-[#10131a] border border-white/5 hover:border-white/15 rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-extrabold text-white/20 group-hover:text-emerald-400 transition-colors">
                      {item.num}
                    </span>
                    <span className="font-mono text-[10px] text-white/40 bg-white/5 px-2.5 py-1 rounded tracking-wider uppercase">
                      {item.tag}
                    </span>
                  </div>

                  <div className="p-3 w-fit rounded-xl bg-white/[0.03] border border-white/10 text-white/80 group-hover:text-emerald-300 group-hover:border-emerald-500/30 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <h4 className="font-display text-xl font-bold text-white tracking-tight">
                      {item.title}
                    </h4>
                    <p className="font-mono text-xs text-emerald-400/80 mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-white/60 text-xs sm:text-sm font-sans font-light leading-relaxed pt-2">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-white/30 font-mono text-[11px]">
                  <span>PRECISION: 0.001mm</span>
                  <span>OPENGL / WEBGL2</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Editorial Quote / Architectural Statement Strip */}
        <div className="mt-16 bg-[#0e1118] border border-white/10 rounded-2xl p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-[10px] text-emerald-400 tracking-widest uppercase">
              STUDIO MANIFESTO
            </span>
            <blockquote className="font-display text-lg sm:text-xl text-white/90 font-medium italic">
              "A space does not require excessive noise to hold weight. When geometry, light falloff, and tactile textures align, the chamber breathes."
            </blockquote>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-white/40">
            <div className="text-right">
              <div className="text-white/80 font-medium">ATELIER STUDIO 03</div>
              <div>KYOTO // LOS ANGELES</div>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center font-bold text-emerald-400">
              03
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
