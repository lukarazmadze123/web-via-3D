import React from 'react';
import { Compass, Flame, Box, Maximize2, Shield, Eye } from 'lucide-react';

export function ArchitecturalBreakdown() {
  const plates = [
    {
      index: '01',
      code: 'AXONOMETRIC-45',
      title: 'Orthogonal Projection Ratio',
      subtitle: 'Zero Parallax Calibration',
      desc: 'Formulated with true 45° isometric inclination and calibrated vertical compression. This eliminates wide-angle perspective warp, emphasizing geometric silhouette clarity and room boundary proportions.',
      metric: 'FOV: 45° // SCALE 1:15',
    },
    {
      index: '02',
      code: 'PHOTOMETRIC-PBR',
      title: 'Phosphor & Tungsten Emission',
      subtitle: 'Sub-surface Radiance Pipeline',
      desc: 'Dynamic real-time emissive surfaces radiating calibrated monochromatic green (520nm) from the workstation OLED matrix and warm 2700K tungsten amber from the bedside luminaire.',
      metric: 'PEAK: 3.5x EMIT COEFFICIENT',
    },
    {
      index: '03',
      code: 'MATERIAL-RATIO',
      title: 'Tactile Materiality Balance',
      subtitle: 'Basalt & Belgian Linen',
      desc: 'Rigid architectural boundaries (WALL concrete, FLOOR.001 brushed basalt plinth) juxtaposed against soft-surface natural Belgian linen drapery and organic sculpted river stones.',
      metric: 'PBR ROUGHNESS: 0.10 - 0.90',
    },
  ];

  const dimensions = [
    { label: 'ROOM FOOTPRINT', value: '5.20m × 5.20m', spec: 'Orthogonal Plan' },
    { label: 'VERTICAL ENVELOPE', value: '2.40m Clearance', spec: 'Finished Concrete' },
    { label: 'PLINTH SUBSTRATE', value: '0.30m Foundation', spec: 'Brushed Basalt' },
    { label: 'DESK WORKSTATION', value: '0.75m Elevation', spec: 'Anodized Slate' },
    { label: 'LOUNGE PLATFORM', value: '2.20m × 1.60m', spec: 'Belgian Linen' },
    { label: 'FOCAL ALIGNMENT', value: '[0.0, 0.8, 0.0]', spec: 'Drei Center Top' },
  ];

  return (
    <section className="relative z-20 bg-[#07080b] border-t border-white/10 px-4 sm:px-8 py-16 lg:py-24">
      <div className="max-w-[1720px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 pb-6 border-b border-white/10 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-[11px] text-white/40 tracking-[0.15em] uppercase">
              <span className="text-white font-semibold">PLATE 03</span>
              <span>//</span>
              <span>ARCHITECTURAL METHODOLOGY</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              SPATIAL CALIBRATION &amp; GEOMETRIC PRINCIPLES
            </h3>
          </div>
          <p className="text-white/50 text-xs sm:text-sm font-sans font-light max-w-lg leading-relaxed">
            Constructed with deliberate architectural restraint. Eliminating arbitrary ornamentation to let proportion, lighting physics, and raw material authenticity dictate the space.
          </p>
        </div>

        {/* 3-Column Editorial Technical Plates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plates.map((item) => (
            <div
              key={item.index}
              className="border border-white/10 bg-[#0d0e13] p-7 flex flex-col justify-between hover:border-white/25 transition-colors"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
                  <span className="text-white font-bold tracking-wider">
                    {item.index} // {item.code}
                  </span>
                  <span className="text-white/40">{item.metric}</span>
                </div>

                <div>
                  <h4 className="font-display text-lg font-bold text-white tracking-tight">
                    {item.title}
                  </h4>
                  <div className="font-mono text-xs text-white/40 mt-0.5">
                    {item.subtitle}
                  </div>
                </div>

                <p className="text-white/60 text-xs sm:text-sm font-sans font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 font-mono text-[10px] text-white/30 flex items-center justify-between">
                <span>VERIFIED STANDARD</span>
                <span>OPENGL / WEBGL2</span>
              </div>
            </div>
          ))}
        </div>

        {/* Dimensional Blueprint Spec Table */}
        <div className="mt-12 border border-white/10 bg-[#0d0e13] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-white/10 gap-3">
            <div>
              <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">
                TECHNICAL BLUEPRINT SPECIFICATIONS
              </span>
              <h4 className="font-display text-base font-bold text-white mt-0.5">
                SPATIAL ENVELOPE &amp; DIMENSIONAL MATRIX
              </h4>
            </div>
            <div className="font-mono text-xs text-white/40">
              SCALE: 1:15 // UNIT: METRIC (m)
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {dimensions.map((dim, i) => (
              <div key={i} className="border border-white/5 bg-[#090a0e] p-3.5 space-y-1">
                <div className="font-mono text-[10px] text-white/40 uppercase">
                  {dim.label}
                </div>
                <div className="font-mono text-sm font-bold text-white">
                  {dim.value}
                </div>
                <div className="font-mono text-[10px] text-white/30">
                  {dim.spec}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Studio Manifesto Strip */}
        <div className="mt-12 border border-white/10 bg-[#0b0c10] p-7 lg:p-9 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">
              STUDIO MANIFESTO
            </span>
            <blockquote className="font-display text-base sm:text-lg text-white/90 font-light italic">
              "A space does not require excessive visual noise to command presence. When proportion, directional luminance, and tactile finishes align, the chamber breathes."
            </blockquote>
          </div>
          <div className="font-mono text-xs text-white/40 border-l border-white/10 pl-5 space-y-0.5">
            <div className="text-white font-medium">ATELIER ORTHO // STUDIO 03</div>
            <div>KYOTO // LOS ANGELES</div>
            <div className="text-[10px] text-white/30">COORDINATES: 35.0116° N, 135.7681° E</div>
          </div>
        </div>
      </div>
    </section>
  );
}
