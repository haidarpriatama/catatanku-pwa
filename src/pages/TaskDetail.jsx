import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import TaskModal from '../components/TaskModal';
import ConfirmModal from '../components/ConfirmModal';

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
      <div className="page-container">
        <div className="empty-state">
          <div className="empty-icon">⚠️</div>
          <h2 className="empty-title">Tugas Tidak Ditemukan</h2>
          <p className="empty-text">Tugas dengan ID tersebut tidak ada atau telah dihapus.</p>
          <Link to="/tasks" className="btn-primary">
            Kembali ke Daftar Tugas
          </Link>
        </div>
      </div>
    );
  }

  const isCompleted = task.status === 'completed';

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Tugas: ${task.title}`,
          text: `Mata Kuliah: ${task.subject} | Tenggat: ${task.dueDate}`,
          url: url
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
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
    <div className="page-container">
      {/* Back button */}
      <div className="breadcrumb-nav">
        <button onClick={() => navigate(-1)} className="btn-back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Kembali</span>
        </button>
      </div>

      <div className="detail-card">
        <div className="detail-header">
          <div className="detail-meta">
            <span className="badge subject-badge-large">{task.subject}</span>
            <span className={`badge priority-badge priority-${task.priority}`}>
              Prioritas: {task.priority === 'high' ? 'Tinggi' : task.priority === 'medium' ? 'Sedang' : 'Rendah'}
            </span>
            <span className={`badge status-badge ${isCompleted ? 'status-completed' : 'status-pending'}`}>
              {isCompleted ? '✓ Selesai' : '⏳ Belum Selesai'}
            </span>
          </div>

          <h1 className="detail-title">{task.title}</h1>
        </div>

        <div className="detail-body">
          <div className="info-box-grid">
            <div className="info-box">
              <span className="info-box-label">Tenggat Waktu</span>
              <span className="info-box-val">{task.dueDate || '-'}</span>
            </div>
            <div className="info-box">
              <span className="info-box-label">Status Saat Ini</span>
              <span className="info-box-val">
                {task.status === 'completed'
                  ? 'Selesai'
                  : task.status === 'in_progress'
                  ? 'Sedang Dikerjakan'
                  : 'Belum Dimulai'}
              </span>
            </div>
            <div className="info-box">
              <span className="info-box-label">Tanggal Dibuat</span>
              <span className="info-box-val">{task.createdAt || '-'}</span>
            </div>
          </div>

          <div className="detail-section">
            <h3 className="detail-section-title">Deskripsi & Catatan Tugas</h3>
            <div className="detail-description">
              {task.description ? (
                <p style={{ whiteSpace: 'pre-wrap' }}>{task.description}</p>
              ) : (
                <p className="text-muted">Tidak ada catatan deskripsi tambahan untuk tugas ini.</p>
              )}
            </div>
          </div>
        </div>

        <div className="detail-footer-actions">
          <button
            onClick={() => toggleTaskStatus(task.id)}
            className={`btn ${isCompleted ? 'btn-secondary' : 'btn-success'}`}
          >
            {isCompleted ? 'Tandai Belum Selesai' : '✓ Tandai Selesai'}
          </button>

          <button onClick={handleShare} className="btn-secondary" title="Bagikan tautan tugas">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            <span>{copied ? 'Tautan Tersalin! ✓' : 'Share Link'}</span>
          </button>

          <button onClick={() => setIsEditOpen(true)} className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            <span>Edit</span>
          </button>

          <button onClick={() => setIsDeleteOpen(true)} className="btn-danger">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            <span>Hapus</span>
          </button>
        </div>
      </div>

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
