import React, { useState, useMemo } from 'react';
import { Plus, Search, RotateCcw, X, SlidersHorizontal } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { SUBJECTS } from '../data/initialTasks';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import ConfirmModal from '../components/ConfirmModal';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function Tasks() {
  const { tasks, createTask, updateTask, deleteTask, toggleTaskStatus, resetToDefault } = useTasks();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Semua Mata Kuliah');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  const handleOpenAdd = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = (task) => {
    setDeletingTask(task);
  };

  const handleConfirmDelete = () => {
    if (deletingTask) {
      deleteTask(deletingTask.id);
      setDeletingTask(null);
    }
  };

  const handleSave = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      createTask(taskData);
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        const matchSearch =
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchSubject =
          selectedSubject === 'Semua Mata Kuliah' || task.subject === selectedSubject;

        const matchStatus =
          statusFilter === 'all' ||
          (statusFilter === 'completed' && task.status === 'completed') ||
          (statusFilter === 'pending' && task.status !== 'completed');

        const matchPriority =
          priorityFilter === 'all' || task.priority === priorityFilter;

        return matchSearch && matchSubject && matchStatus && matchPriority;
      })
      .sort((a, b) => {
        if (sortBy === 'dueDate') {
          return (a.dueDate || '').localeCompare(b.dueDate || '');
        }
        if (sortBy === 'priority') {
          const pScore = { high: 3, medium: 2, low: 1 };
          return (pScore[b.priority] || 0) - (pScore[a.priority] || 0);
        }
        if (sortBy === 'newest') {
          return (b.id || '').localeCompare(a.id || '');
        }
        return 0;
      });
  }, [tasks, searchQuery, selectedSubject, statusFilter, priorityFilter, sortBy]);

  const hasActiveFilters =
    searchQuery ||
    selectedSubject !== 'Semua Mata Kuliah' ||
    statusFilter !== 'all' ||
    priorityFilter !== 'all';

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Kelola Tugas</h1>
          <p className="text-sm text-zinc-500">
            Daftar tugas kuliah lengkap dengan fungsi CRUD fungsional & penyimpanan lokal.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={resetToDefault} className="gap-1.5 h-9" title="Kembalikan data default praktikum">
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset Demo</span>
          </Button>
          <Button onClick={handleOpenAdd} className="gap-2 h-9">
            <Plus className="h-4 w-4" />
            <span>Tambah Tugas</span>
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="rounded-xl border border-zinc-200 bg-white p-4 my-6 shadow-xs space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Cari tugas berdasarkan judul atau kata kunci..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-9"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <div>
            <label className="block text-[11px] font-medium text-zinc-500 mb-1">Mata Kuliah</label>
            <select
              className="h-9 w-full rounded-md border border-zinc-200 bg-white px-2.5 text-xs shadow-xs focus:outline-none focus:ring-1 focus:ring-zinc-950"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-zinc-500 mb-1">Status</label>
            <select
              className="h-9 w-full rounded-md border border-zinc-200 bg-white px-2.5 text-xs shadow-xs focus:outline-none focus:ring-1 focus:ring-zinc-950"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Semua Status</option>
              <option value="pending">Belum Selesai</option>
              <option value="completed">Selesai</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-zinc-500 mb-1">Prioritas</label>
            <select
              className="h-9 w-full rounded-md border border-zinc-200 bg-white px-2.5 text-xs shadow-xs focus:outline-none focus:ring-1 focus:ring-zinc-950"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">Semua Prioritas</option>
              <option value="high">Tinggi</option>
              <option value="medium">Sedang</option>
              <option value="low">Rendah</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-zinc-500 mb-1">Urutan</label>
            <select
              className="h-9 w-full rounded-md border border-zinc-200 bg-white px-2.5 text-xs shadow-xs focus:outline-none focus:ring-1 focus:ring-zinc-950"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="dueDate">Tenggat Terdekat</option>
              <option value="priority">Prioritas Tertinggi</option>
              <option value="newest">Baru Ditambahkan</option>
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-xs text-zinc-500">
            <span>Filter aktif diterapkan</span>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSubject('Semua Mata Kuliah');
                setStatusFilter('all');
                setPriorityFilter('all');
              }}
              className="text-zinc-900 font-medium hover:underline"
            >
              Hapus Filter
            </button>
          </div>
        )}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-zinc-500 px-1">
          <span>Menampilkan {filteredTasks.length} dari {tasks.length} tugas</span>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-200 p-12 text-center bg-white">
            <p className="text-sm font-medium text-zinc-900 mb-1">Tidak ada tugas ditemukan</p>
            <p className="text-xs text-zinc-500 mb-4">Coba sesuaikan kata kunci pencarian atau bersihkan filter.</p>
            <Button size="sm" onClick={handleOpenAdd}>
              Tambah Tugas Baru
            </Button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleStatus={toggleTaskStatus}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editingTask={editingTask}
      />

      <ConfirmModal
        isOpen={!!deletingTask}
        title="Hapus Tugas"
        message={`Hapus tugas "${deletingTask?.title}" dari penyimpanan?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingTask(null)}
      />
    </div>
  );
}
