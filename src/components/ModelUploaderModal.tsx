import React, { useRef, useState } from 'react';
import { X, UploadCloud, Box, RefreshCw, FileCode } from 'lucide-react';

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
      console.warn('Selected file is not a .glb or .gltf binary.');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#0e1015] border border-white/15 p-6 sm:p-8 space-y-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <div className="font-mono text-[10px] text-white/40 tracking-widest uppercase">
              ASSET PIPELINE // GLTF 2.0
            </div>
            <h3 className="font-display text-lg font-bold text-white mt-0.5">
              LOAD 3D ROOM MODEL
            </h3>
          </div>
          <button
            id="close-uploader-btn"
            onClick={onClose}
            className="p-1.5 text-white/40 hover:text-white border border-white/10 hover:border-white/30 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Active Source Status */}
        <div className="border border-white/10 bg-[#08090d] p-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-white/40 uppercase">ACTIVE 3D SOURCE</div>
            <div className="text-sm font-medium text-white font-mono mt-0.5">
              {currentCustomUrl ? currentFilename || 'custom-room.glb' : 'Built-in Procedural Sanctuary'}
            </div>
          </div>
          {currentCustomUrl && (
            <button
              onClick={() => {
                onLoadCustomModel(null);
                onClose();
              }}
              className="text-xs font-mono px-2.5 py-1.5 border border-white/20 text-white hover:bg-white hover:text-black transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3 h-3" />
              RESTORE
            </button>
          )}
        </div>

        {/* Drag and Drop Box */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-3 ${
            dragActive
              ? 'border-white bg-white/5'
              : 'border-white/15 hover:border-white/40 bg-[#0b0c10]'
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

          <div className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/70">
            <UploadCloud className="w-5 h-5" />
          </div>

          <div>
            <div className="font-mono text-xs text-white">
              CLICK OR DRAG <code className="text-white font-bold bg-white/10 px-1 py-0.5">room.glb</code> HERE
            </div>
            <div className="font-mono text-[11px] text-white/40 mt-1">
              Parsed directly into Drei's centered model coordinate matrix
            </div>
          </div>
        </div>

        {/* Technical Specification Footnote */}
        <div className="p-3.5 border border-white/10 bg-[#08090d] text-xs text-white/50 flex items-start gap-2.5 font-mono leading-relaxed">
          <FileCode className="w-4 h-4 text-white/80 shrink-0 mt-0.5" />
          <div>
            Automatically binds the exact nodes (<code className="text-white">Wall</code>, <code className="text-white">Cube003</code>) and materials (<code className="text-white">GREEN EMIT</code>, <code className="text-white">EMISSION</code>, <code className="text-white">BEDSHEET</code>) with real-time bloom and shadows.
          </div>
        </div>
      </div>
    </div>
  );
}
