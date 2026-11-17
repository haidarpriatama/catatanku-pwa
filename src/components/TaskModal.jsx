import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { SUBJECTS } from '../data/initialTasks';
import { Button } from './ui/button';
import { Input } from './ui/input';

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
      setError('Judul tugas wajib diisi.');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
      <div
        className="w-full max-w-lg rounded-xl border border-zinc-200 bg-white p-6 shadow-lg animate-in fade-in-0 zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div>
            <h2 className="text-base font-semibold tracking-tight text-zinc-900">
              {editingTask ? 'Edit Tugas' : 'Tambah Tugas Baru'}
            </h2>
            <p className="text-xs text-zinc-500">
              {editingTask ? 'Perbarui informasi tugas akademik Anda' : 'Catat tugas baru ke dalam daftar kuliah'}
            </p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-700" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 p-2.5 text-xs text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700">
              Judul Tugas <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Contoh: Laporan Modul 5 PWA"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              autoFocus
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700">Mata Kuliah</label>
              <select
                className="flex h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950"
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

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700">Tenggat Waktu</label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700">Prioritas</label>
              <select
                className="flex h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="high">Tinggi</option>
                <option value="medium">Sedang</option>
                <option value="low">Rendah</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700">Status</label>
              <select
                className="flex h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">Belum Dimulai</option>
                <option value="in_progress">Sedang Dikerjakan</option>
                <option value="completed">Selesai</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700">Catatan / Deskripsi</label>
            <textarea
              className="flex w-full rounded-md border border-zinc-200 bg-white p-3 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 placeholder:text-zinc-400"
              rows={3}
              placeholder="Instruksi, tautan modul, atau catatan..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-100">
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">
              {editingTask ? 'Simpan' : 'Tambah'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
