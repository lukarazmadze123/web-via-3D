import React, { useRef, useState } from 'react';
import { X, UploadCloud, Box, Check, RefreshCw, FileCode } from 'lucide-react';

interface ModelUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadCustomModel: (url: string | null, filename?: string) => void;
  currentCustomUrl: string | null;
  currentFilename?: string;
}

export function ModelUploaderModal({
  isOpen,
  onClose,
  onLoadCustomModel,
  currentCustomUrl,
  currentFilename,
}: ModelUploaderModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFile = (file: File) => {
    if (file.name.endsWith('.glb') || file.name.endsWith('.gltf')) {
      const objectUrl = URL.createObjectURL(file);
      onLoadCustomModel(objectUrl, file.name);
      onClose();
    } else {
      alert('Please select a valid .glb or .gltf 3D binary file.');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#111319] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white">
                3D MODEL ASSET MANAGER
              </h3>
              <p className="font-mono text-xs text-white/50">
                GLTF 2.0 BINARY (.GLB)
              </p>
            </div>
          </div>
          <button
            id="close-uploader-btn"
            onClick={onClose}
            className="p-2 text-white/40 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Model Status */}
        <div className="bg-[#0b0c10] border border-white/5 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <div className="text-xs font-mono text-white/40 uppercase">ACTIVE SCENE SOURCE</div>
              <div className="text-sm font-medium text-white">
                {currentCustomUrl ? currentFilename || 'Custom room.glb' : 'Built-in Procedural Sanctuary'}
              </div>
            </div>
          </div>
          {currentCustomUrl && (
            <button
              onClick={() => {
                onLoadCustomModel(null);
                onClose();
              }}
              className="text-xs font-mono px-3 py-1.5 rounded bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-all flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset to Procedural
            </button>
          )}
        </div>

        {/* Drag and Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 ${
            dragActive
              ? 'border-emerald-500 bg-emerald-950/20'
              : 'border-white/10 hover:border-emerald-500/50 hover:bg-white/[0.02]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".glb,.gltf"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
          />

          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/60">
            <UploadCloud className="w-6 h-6 text-emerald-400" />
          </div>

          <div>
            <div className="font-medium text-sm text-white">
              Click to select or drag &amp; drop your <code className="text-emerald-400 font-mono">room.glb</code>
            </div>
            <div className="font-mono text-xs text-white/40 mt-1">
              Supports GLTF 2.0 binary models with embedded materials
            </div>
          </div>
        </div>

        {/* Model Spec Note */}
        <div className="p-3.5 rounded-lg bg-white/5 border border-white/5 text-xs text-white/60 flex items-start gap-2.5 font-sans leading-relaxed">
          <FileCode className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            The component parses the exact node tree (<code className="text-emerald-300 font-mono">Wall</code>, <code className="text-emerald-300 font-mono">Cube003_1...18</code>) and binds materials (<code className="text-emerald-300 font-mono">GREEN EMIT</code>, <code className="text-emerald-300 font-mono">EMISSION</code>, <code className="text-emerald-300 font-mono">BEDSHEET</code>) with real-time bloom and shadows.
          </div>
        </div>
      </div>
    </div>
  );
}
