import React from 'react';

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal-dialog modal-sm" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon-wrapper">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <h3 className="confirm-title">{title || 'Hapus Tugas?'}</h3>
        <p className="confirm-message">{message || 'Apakah Anda yakin ingin menghapus tugas ini? Tindakan ini tidak dapat dibatalkan.'}</p>
        
        <div className="modal-actions center">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Batal
          </button>
          <button type="button" className="btn-danger" onClick={onConfirm}>
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
