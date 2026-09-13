import React from 'react';
import { MaterialSpec } from '../types';
import { MATERIAL_SPECS } from '../data';
import { Layers, Crosshair, ArrowUpRight } from 'lucide-react';

interface MaterialInspectorProps {
  activeMaterialId: string | null;
  onSelectMaterial: (id: string | null) => void;
}

export function MaterialInspector({
  activeMaterialId,
  onSelectMaterial,
}: MaterialInspectorProps) {
  const currentSpec = MATERIAL_SPECS.find((m) => m.id === activeMaterialId) || MATERIAL_SPECS[0];

  return (
    <section className="relative z-20 bg-[#090a0e] border-t border-white/10 px-4 sm:px-8 py-16 lg:py-24">
      <div className="max-w-[1720px] mx-auto">
        {/* Section Masthead */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-[11px] text-white/40 tracking-[0.15em] uppercase">
              <span className="text-white font-semibold">PLATE 02</span>
              <span>//</span>
              <span>PBR MATERIAL SPECIMEN ARCHIVE</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              SURFACE TAXONOMY &amp; OPTICAL REFLECTANCE
            </h3>
          </div>
          <p className="text-white/50 text-xs sm:text-sm font-sans font-light max-w-lg leading-relaxed">
            Select an architectural material specimen to isolate its node geometry inside the 3D diorama and audit its physical shader properties.
          </p>
        </div>

        {/* Specimen Index Grid + Active Spec Plinth */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Specimen Index List (8 Columns) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {MATERIAL_SPECS.map((mat, idx) => {
              const isSelected = activeMaterialId === mat.id;
              const indexCode = `SPEC-${String(idx + 1).padStart(2, '0')}`;
              return (
                <button
                  key={mat.id}
                  id={`mat-btn-${mat.id}`}
                  onClick={() => onSelectMaterial(isSelected ? null : mat.id)}
                  className={`text-left p-4 border transition-all duration-150 flex flex-col justify-between ${
                    isSelected
                      ? 'border-white bg-white text-black'
                      : 'border-white/10 bg-[#101217] text-white hover:border-white/25 hover:bg-[#141620]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3 font-mono text-[11px]">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 border border-black/20"
                        style={{ backgroundColor: mat.color }}
                      />
                      <span className={`font-semibold ${isSelected ? 'text-black' : 'text-white'}`}>
                        {mat.code}
                      </span>
                    </div>
                    <span className={isSelected ? 'text-black/50' : 'text-white/40'}>
                      {indexCode}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className={`font-display text-sm font-medium ${isSelected ? 'text-black' : 'text-white/90'}`}>
                      {mat.name}
                    </div>
                    <div className={`font-mono text-[11px] ${isSelected ? 'text-black/70' : 'text-white/40'}`}>
                      Roughness: {mat.roughness} {mat.emissiveIntensity ? `// Emit: ${mat.emissiveIntensity}x` : ''}
                    </div>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-black/10 border-white/5 flex items-center justify-between font-mono text-[10px]">
                    <span className={`uppercase ${isSelected ? 'text-black/60' : 'text-white/40'}`}>
                      {mat.type}
                    </span>
                    <span className={isSelected ? 'text-black font-semibold' : 'text-white/40'}>
                      {isSelected ? '[ ISOLATED ]' : '[ AUDIT ]'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Technical Spec Plinth (4 Columns) */}
          <div className="lg:col-span-4 border border-white/10 bg-[#111319] p-6 lg:p-7 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">
                  SPECIMEN DOSSIER
                </span>
                <h4 className="font-display text-xl font-bold text-white mt-0.5">
                  {currentSpec.name}
                </h4>
              </div>
              <div
                className="w-10 h-10 border border-white/20"
                style={{ backgroundColor: currentSpec.color }}
              />
            </div>

            <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-sans font-light">
              {currentSpec.description}
            </p>

            {/* Parameter Matrix */}
            <div className="grid grid-cols-2 gap-2 font-mono text-xs pt-1">
              <div className="border border-white/10 bg-[#0c0d12] p-3">
                <div className="text-white/40 text-[10px] uppercase">HEX VALUE</div>
                <div className="text-white font-medium mt-1">{currentSpec.color}</div>
              </div>
              <div className="border border-white/10 bg-[#0c0d12] p-3">
                <div className="text-white/40 text-[10px] uppercase">PBR CLASS</div>
                <div className="text-white font-medium mt-1">{currentSpec.type}</div>
              </div>
              <div className="border border-white/10 bg-[#0c0d12] p-3">
                <div className="text-white/40 text-[10px] uppercase">ROUGHNESS VALUE</div>
                <div className="text-white font-medium mt-1">{currentSpec.roughness}</div>
              </div>
              <div className="border border-white/10 bg-[#0c0d12] p-3">
                <div className="text-white/40 text-[10px] uppercase">EMISSION COEFFICIENT</div>
                <div className="text-white font-medium mt-1">
                  {currentSpec.emissiveIntensity ? `${currentSpec.emissiveIntensity}x` : '0.0 (None)'}
                </div>
              </div>
            </div>

            {/* Viewport Link Hint */}
            <div className="p-3 border border-white/10 bg-[#0c0d12] flex items-center justify-between font-mono text-[11px] text-white/50">
              <span className="flex items-center gap-2">
                <Crosshair className="w-3.5 h-3.5 text-white/70" />
                <span>
                  {activeMaterialId
                    ? `NODE "${activeMaterialId}" HIGHLIGHTED IN SCENE`
                    : 'CLICK ANY SPECIMEN TO HIGHLIGHT'}
                </span>
              </span>
              {activeMaterialId && (
                <button
                  onClick={() => onSelectMaterial(null)}
                  className="text-white underline hover:text-white/80"
                >
                  RESET
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
