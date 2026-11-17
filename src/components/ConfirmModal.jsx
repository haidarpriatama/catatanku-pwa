import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
      <div
        className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-6 shadow-lg animate-in fade-in-0 zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600 mb-3">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-semibold text-zinc-900 mb-1">
            {title || 'Hapus Data?'}
          </h3>
          <p className="text-xs text-zinc-500 mb-5">
            {message || 'Data akan dihapus secara permanen dari penyimpanan lokal.'}
          </p>

          <div className="flex items-center gap-2 w-full">
            <Button variant="outline" className="flex-1" onClick={onCancel}>
              Batal
            </Button>
            <Button variant="destructive" className="flex-1" onClick={onConfirm}>
              Hapus
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
