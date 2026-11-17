import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import ConfirmModal from '../components/ConfirmModal';

export default function Home() {
  const navigate = useNavigate();
  const { tasks, stats, createTask, updateTask, deleteTask, toggleTaskStatus } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'urgent' | 'today'

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

  // Filter tasks for quick view
  const filteredTasks = tasks.filter((t) => {
    if (filterMode === 'urgent') {
      return t.priority === 'high' && t.status !== 'completed';
    }
    if (filterMode === 'today') {
      return t.dueDate === todayStr;
    }
    return true;
  }).slice(0, 5); // Show top 5 on dashboard

  return (
    <div className="page-container">
      {/* Welcome Hero */}
      <section className="hero-section">
        <div className="hero-text">
          <span className="hero-greeting">Halo, Mahasiswa! 👋</span>
          <h1 className="hero-title">Kelola Tugas & Aktivitas Kuliah</h1>
          <p className="hero-subtitle">
            Aplikasi PWA offline-first untuk mencatat, memantau, dan menyelesaikan tugas akademik tepat waktu.
          </p>
        </div>
        <div className="hero-action">
          <button onClick={handleOpenAddModal} className="btn-primary-large">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Tambah Tugas</span>
          </button>
        </div>
      </section>

      {/* Stats Cards Grid */}
      <section className="stats-grid">
        <div className="stat-card" onClick={() => navigate('/tasks')}>
          <div className="stat-icon stat-blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total Tugas</span>
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate('/tasks')}>
          <div className="stat-icon stat-amber">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-number">{stats.pending}</span>
            <span className="stat-label">Belum Selesai</span>
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate('/tasks')}>
          <div className="stat-icon stat-green">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-number">{stats.completed}</span>
            <span className="stat-label">Tugas Selesai</span>
          </div>
        </div>
      </section>

      {/* PWA Feature Highlight Banner */}
      <div className="pwa-info-banner">
        <div className="pwa-info-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        </div>
        <div className="pwa-info-text">
          <strong>Fitur Progressive Web App Aktif:</strong> Aplikasi ini didukung Service Worker dan Cache Storage. Data tetap tersimpan dan dapat diakses tanpa koneksi internet (offline).
        </div>
      </div>

      {/* Quick Tasks List */}
      <section className="section-block">
        <div className="section-header-row">
          <div>
            <h2 className="section-heading">Tugas Terbaru</h2>
            <p className="section-subheading">Pantau progres tugas kuliah prioritas Anda</p>
          </div>
          <div className="filter-pill-group">
            <button
              className={`pill-btn ${filterMode === 'all' ? 'active' : ''}`}
              onClick={() => setFilterMode('all')}
            >
              Semua
            </button>
            <button
              className={`pill-btn ${filterMode === 'urgent' ? 'active' : ''}`}
              onClick={() => setFilterMode('urgent')}
            >
              Mendesak ({stats.highPriority})
            </button>
            <button
              className={`pill-btn ${filterMode === 'today' ? 'active' : ''}`}
              onClick={() => setFilterMode('today')}
            >
              Hari Ini
            </button>
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎉</div>
            <p className="empty-text">Tidak ada tugas pada kategori ini.</p>
            <button onClick={handleOpenAddModal} className="btn-secondary">
              Buat Tugas Sekarang
            </button>
          </div>
        ) : (
          <div className="task-list">
            {filteredTasks.map((task) => (
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

        <div className="view-more-container">
          <Link to="/tasks" className="btn-outline-wide">
            Lihat Semua Tugas & Kelola CRUD &rarr;
          </Link>
        </div>
      </section>

      {/* Task Modal for Add/Edit */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        editingTask={editingTask}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={!!deletingTask}
        title="Hapus Tugas Kuliah"
        message={`Apakah Anda yakin ingin menghapus "${deletingTask?.title}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingTask(null)}
      />
    </div>
  );
}
