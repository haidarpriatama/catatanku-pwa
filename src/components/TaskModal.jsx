import React, { useState, useEffect } from 'react';
import { SUBJECTS } from '../data/initialTasks';

export default function TaskModal({ isOpen, onClose, onSave, editingTask }) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Pemrograman Perangkat Bergerak');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [status, setStatus] = useState('pending');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const subjectOptions = SUBJECTS.filter((s) => s !== 'Semua Mata Kuliah');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setSubject(editingTask.subject || 'Pemrograman Perangkat Bergerak');
      setDueDate(editingTask.dueDate || '');
      setPriority(editingTask.priority || 'medium');
      setStatus(editingTask.status || 'pending');
      setDescription(editingTask.description || '');
      setError('');
    } else {
      // Default for new task
      setTitle('');
      setSubject('Pemrograman Perangkat Bergerak');
      setDueDate(new Date().toISOString().split('T')[0]);
      setPriority('medium');
      setStatus('pending');
      setDescription('');
      setError('');
    }
  }, [editingTask, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Judul tugas wajib diisi!');
      return;
    }

    onSave({
      title,
      subject,
      dueDate,
      priority,
      status,
      description
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {editingTask ? 'Edit Tugas Kuliah' : 'Tambah Tugas Baru'}
          </h2>
          <button className="btn-close" onClick={onClose} aria-label="Tutup modal">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="form-alert">{error}</div>}

          <div className="form-group">
            <label className="form-label">
              Judul Tugas <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Contoh: Laporan Modul 5 PWA"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              autoFocus
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Mata Kuliah</label>
              <select
                className="form-select"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                {subjectOptions.map((subj) => (
                  <option key={subj} value={subj}>
                    {subj}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Tenggat Waktu (Due Date)</label>
              <input
                type="date"
                className="form-input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Prioritas</label>
              <select
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="high">Tinggi (Penting & Mendesak)</option>
                <option value="medium">Sedang (Normal)</option>
                <option value="low">Rendah (Santai)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Status Progres</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">Belum Dimulai</option>
                <option value="in_progress">Sedang Dikerjakan</option>
                <option value="completed">Selesai</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Deskripsi / Catatan Tambahan</label>
            <textarea
              className="form-textarea"
              rows="3"
              placeholder="Tuliskan petunjuk tugas, tautan referensi, atau instruksi..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn-primary">
              {editingTask ? 'Simpan Perubahan' : 'Tambah Tugas'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
