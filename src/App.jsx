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
      <div className="app-shell">
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="footer-container">
          <div className="footer-content">
            <p className="footer-text">
              <strong>CatatKuliah PWA</strong> &bull; Praktikum Pemrograman Perangkat Bergerak 2026
            </p>
            <p className="footer-subtext">
              Kelompok 38 &bull; Haidar Rafi Apta Priatama (21120124140107) &bull; Teknik Komputer UNDIP
            </p>
          </div>
        </footer>

        <BottomNav />
      </div>
    </TaskProvider>
  );
}
