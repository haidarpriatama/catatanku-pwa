import React, { useState, useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import { SUBJECTS } from '../data/initialTasks';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import ConfirmModal from '../components/ConfirmModal';

export default function Tasks() {
  const { tasks, createTask, updateTask, deleteTask, toggleTaskStatus, resetToDefault } = useTasks();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Semua Mata Kuliah');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pending' | 'completed'
  const [priorityFilter, setPriorityFilter] = useState('all'); // 'all' | 'high' | 'medium' | 'low'
  const [sortBy, setSortBy] = useState('dueDate'); // 'dueDate' | 'priority' | 'newest'

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

  // Filter & Search logic
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Search query
        const matchSearch =
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));

        // Subject filter
        const matchSubject =
          selectedSubject === 'Semua Mata Kuliah' || task.subject === selectedSubject;

        // Status filter
        const matchStatus =
          statusFilter === 'all' ||
          (statusFilter === 'completed' && task.status === 'completed') ||
          (statusFilter === 'pending' && task.status !== 'completed');

        // Priority filter
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

  return (
    <div className="page-container">
      {/* Page Title & Add Button */}
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Kelola Tugas Kuliah</h1>
          <p className="page-subtitle">
            Halaman CRUD Fungsional untuk menambah, melihat, mengedit, dan menghapus tugas.
          </p>
        </div>
        <div className="header-button-group">
          <button onClick={resetToDefault} className="btn-secondary btn-sm" title="Kembalikan data default praktikum">
            Reset Data Demo
          </button>
          <button onClick={handleOpenAdd} className="btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Tambah Tugas</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="filter-card">
        <div className="search-input-wrapper">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Cari tugas berdasarkan judul, mata kuliah, atau kata kunci..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="btn-clear-search" onClick={() => setSearchQuery('')}>
              &times;
            </button>
          )}
        </div>

        <div className="filter-controls-grid">
          {/* Filter Mata Kuliah */}
          <div className="filter-item">
            <label className="filter-label">Mata Kuliah</label>
            <select
              className="form-select"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Filter Status */}
          <div className="filter-item">
            <label className="filter-label">Status</label>
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Semua Status</option>
              <option value="pending">Belum Selesai</option>
              <option value="completed">Selesai</option>
            </select>
          </div>

          {/* Filter Prioritas */}
          <div className="filter-item">
            <label className="filter-label">Prioritas</label>
            <select
              className="form-select"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">Semua Prioritas</option>
              <option value="high">Tinggi</option>
              <option value="medium">Sedang</option>
              <option value="low">Rendah</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="filter-item">
            <label className="filter-label">Urutkan</label>
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="dueDate">Tenggat Waktu Terdekat</option>
              <option value="priority">Prioritas Tertinggi</option>
              <option value="newest">Baru Ditambahkan</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task Count Indicator */}
      <div className="result-counter-row">
        <span>Menampilkan <strong>{filteredTasks.length}</strong> dari <strong>{tasks.length}</strong> tugas</span>
        {(searchQuery || selectedSubject !== 'Semua Mata Kuliah' || statusFilter !== 'all' || priorityFilter !== 'all') && (
          <button
            className="btn-link"
            onClick={() => {
              setSearchQuery('');
              setSelectedSubject('Semua Mata Kuliah');
              setStatusFilter('all');
              setPriorityFilter('all');
            }}
          >
            Reset Filter
          </button>
        )}
      </div>

      {/* Tasks Grid / List */}
      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3 className="empty-title">Tidak ada tugas yang cocok</h3>
          <p className="empty-text">Coba ubah kata kunci pencarian atau bersihkan filter yang aktif.</p>
          <button onClick={handleOpenAdd} className="btn-primary">
            Tambah Tugas Baru
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
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal CRUD */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editingTask={editingTask}
      />

      {/* Confirm Delete */}
      <ConfirmModal
        isOpen={!!deletingTask}
        title="Hapus Tugas"
        message={`Apakah Anda yakin ingin menghapus "${deletingTask?.title}"? Data akan terhapus dari penyimpanan lokal.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingTask(null)}
      />
    </div>
  );
}
