import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, ArrowRight, CheckCircle2, Clock, ListTodo } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import ConfirmModal from '../components/ConfirmModal';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export default function Home() {
  const navigate = useNavigate();
  const { tasks, stats, createTask, updateTask, deleteTask, toggleTaskStatus } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [tabFilter, setTabFilter] = useState('all'); // 'all' | 'urgent' | 'today'

  const todayStr = new Date().toISOString().split('T')[0];

  const handleOpenAddModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (task) => {
    setDeletingTask(task);
  };

  const handleConfirmDelete = () => {
    if (deletingTask) {
      deleteTask(deletingTask.id);
      setDeletingTask(null);
    }
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      createTask(taskData);
    }
  };

  const displayedTasks = tasks
    .filter((t) => {
      if (tabFilter === 'urgent') return t.priority === 'high' && t.status !== 'completed';
      if (tabFilter === 'today') return t.dueDate === todayStr;
      return true;
    })
    .slice(0, 5);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Ringkasan</h1>
          <p className="text-sm text-zinc-500">
            Pantau dan kelola jadwal tugas kuliah Anda secara offline-first.
          </p>
        </div>
        <div>
          <Button onClick={handleOpenAddModal} className="gap-2">
            <Plus className="h-4 w-4" />
            <span>Tambah Tugas</span>
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
        <Card className="cursor-pointer hover:border-zinc-300 transition-colors" onClick={() => navigate('/tasks')}>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Total Tugas</p>
              <p className="text-2xl font-bold tracking-tight text-zinc-900 mt-1">{stats.total}</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-100 text-zinc-700">
              <ListTodo className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-zinc-300 transition-colors" onClick={() => navigate('/tasks')}>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Belum Selesai</p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-2xl font-bold tracking-tight text-zinc-900">{stats.pending}</p>
                {stats.highPriority > 0 && (
                  <span className="text-xs font-medium text-red-600">
                    ({stats.highPriority} mendesak)
                  </span>
                )}
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-amber-50 text-amber-700">
              <Clock className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-zinc-300 transition-colors" onClick={() => navigate('/tasks')}>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Selesai</p>
              <p className="text-2xl font-bold tracking-tight text-zinc-900 mt-1">{stats.completed}</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task List Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold tracking-tight text-zinc-900">Tugas Terbaru</h2>
          <div className="inline-flex h-8 items-center rounded-lg bg-zinc-100 p-0.5 text-zinc-500 text-xs">
            <button
              onClick={() => setTabFilter('all')}
              className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                tabFilter === 'all' ? 'bg-white text-zinc-900 shadow-xs' : 'hover:text-zinc-900'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setTabFilter('urgent')}
              className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                tabFilter === 'urgent' ? 'bg-white text-zinc-900 shadow-xs' : 'hover:text-zinc-900'
              }`}
            >
              Mendesak
            </button>
            <button
              onClick={() => setTabFilter('today')}
              className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                tabFilter === 'today' ? 'bg-white text-zinc-900 shadow-xs' : 'hover:text-zinc-900'
              }`}
            >
              Hari Ini
            </button>
          </div>
        </div>

        {displayedTasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-200 p-8 text-center bg-white">
            <p className="text-sm text-zinc-500">Tidak ada tugas pada kategori ini.</p>
            <Button variant="outline" size="sm" onClick={handleOpenAddModal} className="mt-3">
              Buat Tugas Baru
            </Button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {displayedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleStatus={toggleTaskStatus}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}

        <div className="pt-2">
          <Link to="/tasks" className="w-full inline-block">
            <Button variant="outline" className="w-full gap-2">
              <span>Buka Daftar Tugas Lengkap</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        editingTask={editingTask}
      />

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={!!deletingTask}
        title="Hapus Tugas"
        message={`Hapus tugas "${deletingTask?.title}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingTask(null)}
      />
    </div>
  );
}
