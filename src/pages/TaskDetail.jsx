import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Share2, Check, Pencil, Trash2, Calendar, BookOpen, AlertCircle } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import TaskModal from '../components/TaskModal';
import ConfirmModal from '../components/ConfirmModal';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTaskById, updateTask, deleteTask, toggleTaskStatus } = useTasks();

  const task = getTaskById(id);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!task) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 mx-auto mb-4 text-zinc-500">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h2 className="text-lg font-semibold text-zinc-900">Tugas Tidak Ditemukan</h2>
        <p className="text-sm text-zinc-500 mt-1 mb-6">Tugas ini tidak ada atau mungkin sudah dihapus.</p>
        <Link to="/tasks">
          <Button variant="outline">Kembali ke Daftar Tugas</Button>
        </Link>
      </div>
    );
  }

  const isCompleted = task.status === 'completed';

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: task.title,
          text: `Tugas: ${task.title} - ${task.subject}`,
          url: url
        });
        return;
      } catch {
        // fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Tautan disalin: ' + url);
    }
  };

  const handleSaveEdit = (updatedData) => {
    updateTask(task.id, updatedData);
  };

  const handleConfirmDelete = () => {
    deleteTask(task.id);
    navigate('/tasks');
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 space-y-6">
      <div>
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="gap-1.5 -ml-2 text-zinc-600">
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali</span>
        </Button>
      </div>

      <Card>
        <CardContent className="p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="gap-1 font-medium text-xs">
                <BookOpen className="h-3 w-3" />
                <span>{task.subject}</span>
              </Badge>
              {task.priority === 'high' ? (
                <Badge variant="destructive">Prioritas Tinggi</Badge>
              ) : task.priority === 'medium' ? (
                <Badge variant="warning">Prioritas Sedang</Badge>
              ) : (
                <Badge variant="secondary">Prioritas Rendah</Badge>
              )}
              <Badge variant={isCompleted ? 'success' : 'outline'}>
                {isCompleted ? '✓ Selesai' : 'Sedang Berjalan'}
              </Badge>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">
              {task.title}
            </h1>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-y border-zinc-100 text-xs">
            <div>
              <p className="text-zinc-400 font-medium mb-1">Tenggat Waktu</p>
              <div className="flex items-center gap-1.5 font-semibold text-zinc-900">
                <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                <span>{task.dueDate || '-'}</span>
              </div>
            </div>

            <div>
              <p className="text-zinc-400 font-medium mb-1">Status Progres</p>
              <p className="font-semibold text-zinc-900">
                {task.status === 'completed'
                  ? 'Selesai'
                  : task.status === 'in_progress'
                  ? 'Sedang Dikerjakan'
                  : 'Belum Dimulai'}
              </p>
            </div>

            <div>
              <p className="text-zinc-400 font-medium mb-1">Dibuat Pada</p>
              <p className="font-semibold text-zinc-900">{task.createdAt || '-'}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Deskripsi & Instruksi
            </h3>
            <div className="rounded-lg bg-zinc-50 border border-zinc-100 p-4 text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap">
              {task.description || (
                <span className="text-zinc-400 italic">Tidak ada catatan tambahan untuk tugas ini.</span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-zinc-100">
            <Button
              variant={isCompleted ? 'outline' : 'default'}
              size="sm"
              onClick={() => toggleTaskStatus(task.id)}
            >
              {isCompleted ? 'Tandai Belum Selesai' : 'Tandai Selesai'}
            </Button>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShare} className="gap-1.5">
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
                <span>{copied ? 'Tersalin' : 'Bagikan'}</span>
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsEditOpen(true)} className="gap-1.5">
                <Pencil className="h-3.5 w-3.5" />
                <span>Edit</span>
              </Button>
              <Button variant="destructive" size="sm" onClick={() => setIsDeleteOpen(true)} className="gap-1.5">
                <Trash2 className="h-3.5 w-3.5" />
                <span>Hapus</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <TaskModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSaveEdit}
        editingTask={task}
      />

      <ConfirmModal
        isOpen={isDeleteOpen}
        title="Hapus Tugas"
        message={`Apakah Anda yakin ingin menghapus "${task.title}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </div>
  );
}
