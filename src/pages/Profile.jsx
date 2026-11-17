import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';

export default function Profile() {
  const { stats, resetToDefault } = useTasks();

  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('catatkuliah_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      nama: 'Haidar Rafi Apta Priatama',
      nim: '21120124140107',
      kelompok: 'Kelompok 38',
      shift: 'Shift 06',
      prodi: 'Teknik Komputer',
      universitas: 'Universitas Diponegoro',
      mataKuliah: 'Praktikum Pemrograman Perangkat Bergerak',
      semester: 'Semester 5 (Gasal 2026/2027)'
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profileData);
  const [swStatus, setSwStatus] = useState('Memeriksa...');
  const [cacheStatus, setCacheStatus] = useState('Tersedia');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg) {
          setSwStatus(`Aktif (${reg.active ? 'Active & Controlling' : 'Installing/Waiting'})`);
        } else {
          setSwStatus('Belum terdaftar (akan aktif pada environment produksi)');
        }
      }).catch(() => {
        setSwStatus('Service Worker error');
      });
    } else {
      setSwStatus('Browser tidak mendukung Service Worker');
    }

    if ('caches' in window) {
      caches.keys().then((keys) => {
        setCacheStatus(`${keys.length} Cache Store aktif (${keys.join(', ') || 'Ready'})`);
      });
    }
  }, []);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileData(formData);
    localStorage.setItem('catatkuliah_profile', JSON.stringify(formData));
    setIsEditing(false);
    showNotice('Profil berhasil diperbarui!');
  };

  const showNotice = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleClearCache = async () => {
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      showNotice('Cache PWA berhasil dibersihkan! Memuat ulang...');
      setTimeout(() => window.location.reload(), 1000);
    } else {
      showNotice('Cache API tidak didukung di browser ini.');
    }
  };

  return (
    <div className="page-container">
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Profil Pengembang & Praktikum</h1>
          <p className="page-subtitle">Informasi identitas mahasiswa, kelompok, dan status sistem PWA.</p>
        </div>
      </div>

      {notification && <div className="notice-banner">{notification}</div>}

      <div className="profile-layout-grid">
        {/* Main Identity Card */}
        <div className="profile-card">
          <div className="profile-cover"></div>
          <div className="profile-card-body">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar">
                <span>{profileData.nama.split(' ').map((n) => n[0]).slice(0, 2).join('')}</span>
              </div>
            </div>

            <div className="profile-headings">
              <h2 className="profile-name">{profileData.nama}</h2>
              <span className="profile-nim">NIM: {profileData.nim}</span>
              <span className="profile-badge-group">{profileData.kelompok} • {profileData.shift}</span>
            </div>

            {!isEditing ? (
              <div className="profile-details-list">
                <div className="profile-detail-item">
                  <span className="detail-item-label">Mata Kuliah</span>
                  <span className="detail-item-value">{profileData.mataKuliah}</span>
                </div>
                <div className="profile-detail-item">
                  <span className="detail-item-label">Semester</span>
                  <span className="detail-item-value">{profileData.semester}</span>
                </div>
                <div className="profile-detail-item">
                  <span className="detail-item-label">Program Studi</span>
                  <span className="detail-item-value">{profileData.prodi}</span>
                </div>
                <div className="profile-detail-item">
                  <span className="detail-item-label">Universitas</span>
                  <span className="detail-item-value">{profileData.universitas}</span>
                </div>

                <div className="profile-action-btn-row">
                  <button onClick={() => setIsEditing(true)} className="btn-secondary btn-block">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    <span>Edit Data Profil</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveProfile} className="profile-edit-form">
                <div className="form-group">
                  <label className="form-label">Nama Lengkap</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">NIM</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.nim}
                      onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Kelompok</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.kelompok}
                      onChange={(e) => setFormData({ ...formData, kelompok: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Shift</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.shift}
                      onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Program Studi</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.prodi}
                      onChange={(e) => setFormData({ ...formData, prodi: e.target.value })}
                    />
                  </div>
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-secondary" onClick={() => setIsEditing(false)}>
                    Batal
                  </button>
                  <button type="submit" className="btn-primary">
                    Simpan Profil
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* PWA & System Telemetry Card */}
        <div className="system-telemetry-col">
          <div className="telemetry-card">
            <h3 className="telemetry-card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                <line x1="2" y1="12" x2="22" y2="12"></line>
              </svg>
              <span>Status PWA & Offline Engine</span>
            </h3>

            <div className="telemetry-item">
              <span className="telemetry-label">Status Jaringan:</span>
              <span className={`telemetry-val ${navigator.onLine ? 'text-success' : 'text-danger'}`}>
                {navigator.onLine ? '● Online (Terhubung)' : '○ Offline Mode'}
              </span>
            </div>

            <div className="telemetry-item">
              <span className="telemetry-label">Service Worker:</span>
              <span className="telemetry-val">{swStatus}</span>
            </div>

            <div className="telemetry-item">
              <span className="telemetry-label">Penyimpanan Cache:</span>
              <span className="telemetry-val">{cacheStatus}</span>
            </div>

            <div className="telemetry-item">
              <span className="telemetry-label">Web Manifest:</span>
              <span className="telemetry-val text-success">✓ manifest.json (Standalone)</span>
            </div>

            <div className="telemetry-item">
              <span className="telemetry-label">Penyimpanan Lokal:</span>
              <span className="telemetry-val">localStorage ({stats.total} data tugas)</span>
            </div>

            <div className="telemetry-actions-row">
              <button onClick={handleClearCache} className="btn-secondary btn-sm">
                Bersihkan Cache PWA
              </button>
              <button
                onClick={() => {
                  resetToDefault();
                  showNotice('Data tugas berhasil direset ke nilai default praktikum!');
                }}
                className="btn-secondary btn-sm"
              >
                Reset Data Demo
              </button>
            </div>
          </div>

          {/* Tech Stack Card */}
          <div className="telemetry-card">
            <h3 className="telemetry-card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
              <span>Teknologi Modul Praktikum</span>
            </h3>

            <div className="tech-badge-wrap">
              <span className="tech-badge">React 19</span>
              <span className="tech-badge">Vite Build Tool</span>
              <span className="tech-badge">React Router v7</span>
              <span className="tech-badge">Service Worker Cache API</span>
              <span className="tech-badge">Web App Manifest</span>
              <span className="tech-badge">Local Storage CRUD</span>
              <span className="tech-badge">Vercel Deployment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
