import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_TASKS } from '../data/initialTasks';

const TaskContext = createContext();

const STORAGE_KEY = 'catatkuliah_pwa_tasks_v1';

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load tasks from localStorage', e);
    }
    return INITIAL_TASKS;
  });

  // Save to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks to localStorage', e);
    }
  }, [tasks]);

  // CRUD Operations
  const createTask = (taskData) => {
    const newTask = {
      id: 'task-' + Date.now(),
      title: taskData.title.trim(),
      subject: taskData.subject || 'Lainnya',
      dueDate: taskData.dueDate || new Date().toISOString().split('T')[0],
      priority: taskData.priority || 'medium',
      status: taskData.status || 'pending',
      description: taskData.description ? taskData.description.trim() : '',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  const updateTask = (id, updatedData) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === 'completed' ? 'pending' : 'completed';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const getTaskById = (id) => {
    return tasks.find((t) => t.id === id);
  };

  const resetToDefault = () => {
    setTasks(INITIAL_TASKS);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
    } catch (e) {
      console.error(e);
    }
  };

  // Stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const pendingTasks = tasks.filter((t) => t.status !== 'completed').length;
  const highPriorityTasks = tasks.filter(
    (t) => t.priority === 'high' && t.status !== 'completed'
  ).length;

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        getTaskById,
        resetToDefault,
        stats: {
          total: totalTasks,
          completed: completedTasks,
          pending: pendingTasks,
          highPriority: highPriorityTasks
        }
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
