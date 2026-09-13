import React from 'react';
import { Sparkles, Eye, Info, CheckCircle2 } from 'lucide-react';
import { MaterialSpec } from '../types';
import { MATERIAL_SPECS } from '../data';

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
    <section className="relative z-20 bg-[#0c0d12] border-t border-white/5 px-6 lg:px-12 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="font-mono text-xs text-emerald-400 tracking-widest uppercase mb-1.5 flex items-center gap-2">
              <span className="w-2 h-0.5 bg-emerald-400" />
              PHYSICAL MATERIAL SPECIFICATION
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white">
              SURFACE FINISHES &amp; RADIANCE
            </h3>
          </div>
          <p className="text-white/50 text-xs md:text-sm font-sans max-w-md">
            Click any material node below to visually highlight and inspect its PBR reflectance, emission intensity, and texture map attributes in the viewport.
          </p>
        </div>

        {/* Asymmetric Grid: Material Selector Cards (Left) & Active Inspector Drawer (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Material Node Chips */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MATERIAL_SPECS.map((mat) => {
              const isSelected = activeMaterialId === mat.id;
              return (
                <button
                  key={mat.id}
                  id={`mat-btn-${mat.id}`}
                  onClick={() => onSelectMaterial(isSelected ? null : mat.id)}
                  className={`text-left p-4 rounded-xl border transition-all duration-200 group relative ${
                    isSelected
                      ? 'bg-[#151922] border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.12)]'
                      : 'bg-[#111319]/80 border-white/5 hover:border-white/15 hover:bg-[#151821]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      {/* Color Swatch Dot with Glow */}
                      <span
                        className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                        style={{
                          backgroundColor: mat.color,
                          boxShadow: mat.emissiveIntensity ? `0 0 10px ${mat.color}` : 'none',
                        }}
                      />
                      <span className="font-mono text-xs font-semibold text-white/90">
                        {mat.code}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-white/5 text-white/50">
                      {mat.type}
                    </span>
                  </div>

                  <div className="font-sans text-sm font-medium text-white/80 group-hover:text-white">
                    {mat.name}
                  </div>
                  <div className="font-mono text-xs text-white/40 mt-1">
                    Roughness: {mat.roughness} {mat.emissiveIntensity ? `• Emit: ${mat.emissiveIntensity}x` : ''}
                  </div>

                  {isSelected && (
                    <div className="absolute right-3 bottom-3 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Technical Inspector Plinth */}
          <div className="lg:col-span-5 bg-[#12151d] border border-white/10 rounded-2xl p-6 lg:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                  ACTIVE NODE TELEMETRY
                </span>
                <h4 className="font-display text-xl font-bold text-white mt-1">
                  {currentSpec.name}
                </h4>
              </div>
              <div
                className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center font-mono text-xs"
                style={{
                  backgroundColor: currentSpec.color,
                  boxShadow: currentSpec.emissiveIntensity ? `0 0 16px ${currentSpec.color}` : 'none',
                }}
              />
            </div>

            <p className="text-white/60 text-sm leading-relaxed font-sans font-light">
              {currentSpec.description}
            </p>

            {/* Technical Parameter Readouts */}
            <div className="grid grid-cols-2 gap-4 font-mono text-xs pt-2">
              <div className="bg-[#0b0c10] border border-white/5 p-3 rounded-lg">
                <div className="text-white/40 text-[10px] uppercase">HEX VALUE</div>
                <div className="text-white font-medium mt-0.5">{currentSpec.color}</div>
              </div>
              <div className="bg-[#0b0c10] border border-white/5 p-3 rounded-lg">
                <div className="text-white/40 text-[10px] uppercase">SHADER CLASS</div>
                <div className="text-white font-medium mt-0.5">{currentSpec.type}</div>
              </div>
              <div className="bg-[#0b0c10] border border-white/5 p-3 rounded-lg">
                <div className="text-white/40 text-[10px] uppercase">MICRO-FACET ROUGHNESS</div>
                <div className="text-emerald-400 font-medium mt-0.5">{currentSpec.roughness}</div>
              </div>
              <div className="bg-[#0b0c10] border border-white/5 p-3 rounded-lg">
                <div className="text-white/40 text-[10px] uppercase">EMISSIVE MULTIPLIER</div>
                <div className="text-amber-400 font-medium mt-0.5">
                  {currentSpec.emissiveIntensity ? `${currentSpec.emissiveIntensity}x` : '0.0 (None)'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-white/40 bg-white/5 rounded-lg p-3">
              <Info className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {activeMaterialId
                  ? `Viewport highlighting node "${activeMaterialId}". Click again to reset.`
                  : 'Select any card on the left to highlight its mesh inside the 3D room.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
