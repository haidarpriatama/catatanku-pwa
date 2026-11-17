import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TaskCard({ task, onToggleStatus, onEdit, onDelete }) {
  const navigate = useNavigate();

  const isCompleted = task.status === 'completed';

  // Format due date friendly
  const formatDueDate = (dateStr) => {
    if (!dateStr) return '-';
    const today = new Date().toISOString().split('T')[0];
    if (dateStr === today) return 'Hari ini';
    
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const d = new Date(parts[0], parts[1] - 1, parts[2]);
        return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
      }
    } catch {
      return dateStr;
    }
    return dateStr;
  };

  const getPriorityLabel = (p) => {
    switch (p) {
      case 'high': return 'Tinggi';
      case 'medium': return 'Sedang';
      case 'low': return 'Rendah';
      default: return p;
    }
  };

  const isPastDue = !isCompleted && task.dueDate && task.dueDate < new Date().toISOString().split('T')[0];

  return (
    <div className={`task-card ${isCompleted ? 'completed' : ''} ${isPastDue ? 'past-due' : ''}`}>
      <div className="task-header-row">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => onToggleStatus(task.id)}
            aria-label="Tandai selesai"
          />
          <span className="checkmark"></span>
        </label>

        <div className="task-main-info" onClick={() => navigate(`/tasks/${task.id}`)}>
          <h3 className="task-title">{task.title}</h3>
          <div className="task-meta-tags">
            <span className="badge subject-badge">{task.subject}</span>
            <span className={`badge priority-badge priority-${task.priority}`}>
              {getPriorityLabel(task.priority)}
            </span>
            {isPastDue && <span className="badge badge-overdue">Terlewat</span>}
          </div>
        </div>
      </div>

      {task.description && (
        <p className="task-snippet" onClick={() => navigate(`/tasks/${task.id}`)}>
          {task.description.length > 110 ? task.description.slice(0, 110) + '...' : task.description}
        </p>
      )}

      <div className="task-footer">
        <div className="task-due-date">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>Tenggat: {formatDueDate(task.dueDate)}</span>
        </div>

        <div className="task-actions">
          <button
            onClick={() => navigate(`/tasks/${task.id}`)}
            className="btn-icon"
            title="Lihat Detail"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
          <button
            onClick={() => onEdit(task)}
            className="btn-icon btn-edit"
            title="Edit Tugas"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button
            onClick={() => onDelete(task)}
            className="btn-icon btn-delete"
            title="Hapus Tugas"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
