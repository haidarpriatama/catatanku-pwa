import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Eye, Pencil, Trash2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export default function TaskCard({ task, onToggleStatus, onEdit, onDelete }) {
  const navigate = useNavigate();
  const isCompleted = task.status === 'completed';

  const formatDueDate = (dateStr) => {
    if (!dateStr) return '-';
    const today = new Date().toISOString().split('T')[0];
    if (dateStr === today) return 'Hari ini';

    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const d = new Date(parts[0], parts[1] - 1, parts[2]);
        return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
      }
    } catch {
      return dateStr;
    }
    return dateStr;
  };

  const getPriorityBadge = (p) => {
    switch (p) {
      case 'high':
        return <Badge variant="destructive">Tinggi</Badge>;
      case 'medium':
        return <Badge variant="warning">Sedang</Badge>;
      case 'low':
        return <Badge variant="secondary">Rendah</Badge>;
      default:
        return <Badge variant="outline">{p}</Badge>;
    }
  };

  const isPastDue = !isCompleted && task.dueDate && task.dueDate < new Date().toISOString().split('T')[0];

  return (
    <div
      className={`group rounded-lg border border-zinc-200 bg-white p-4 transition-all hover:border-zinc-300 hover:shadow-xs ${
        isCompleted ? 'bg-zinc-50/50 opacity-75' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Native custom-styled Checkbox */}
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggleStatus(task.id)}
          className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-950 cursor-pointer"
          aria-label="Tandai selesai"
        />

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              onClick={() => navigate(`/tasks/${task.id}`)}
              className={`text-sm font-semibold tracking-tight text-zinc-900 cursor-pointer hover:underline truncate ${
                isCompleted ? 'line-through text-zinc-400' : ''
              }`}
            >
              {task.title}
            </span>
          </div>

          {task.description && (
            <p
              onClick={() => navigate(`/tasks/${task.id}`)}
              className="text-xs text-zinc-500 line-clamp-2 cursor-pointer mb-2.5"
            >
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-zinc-100 text-xs text-zinc-500">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="font-normal text-[11px]">
                {task.subject}
              </Badge>
              {getPriorityBadge(task.priority)}
              {isPastDue && (
                <span className="text-[11px] font-medium text-red-600">
                  Terlambat
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-zinc-400 text-[11px]">
                <Calendar className="h-3 w-3" />
                <span>{formatDueDate(task.dueDate)}</span>
              </div>

              <div className="flex items-center gap-0.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-zinc-400 hover:text-zinc-900"
                  onClick={() => navigate(`/tasks/${task.id}`)}
                  title="Lihat Detail"
                >
                  <Eye className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-zinc-400 hover:text-zinc-900"
                  onClick={() => onEdit(task)}
                  title="Edit"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-zinc-400 hover:text-red-600"
                  onClick={() => onDelete(task)}
                  title="Hapus"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
