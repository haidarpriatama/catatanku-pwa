import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import TaskDetail from './pages/TaskDetail';
import Profile from './pages/Profile';
import { TaskProvider } from './context/TaskContext';

export default function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-zinc-50/60 text-zinc-900 flex flex-col antialiased selection:bg-zinc-900 selection:text-white">
        <Navbar />

        <main className="flex-1 pb-20 md:pb-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="border-t border-zinc-200 bg-white py-6 px-4 text-center text-xs text-zinc-400">
          <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>
              <span className="font-medium text-zinc-700">CatatKuliah PWA</span> &bull; Praktikum Pemrograman Perangkat Bergerak
            </p>
            <p className="text-zinc-400">
              Kelompok 20 &bull; Kevin Nibras Kusuma (21120124140131)
            </p>
          </div>
        </footer>

        <BottomNav />
      </div>
    </TaskProvider>
  );
}
