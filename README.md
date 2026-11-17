# CatatKuliah PWA 📱

> **Aplikasi Progressive Web App (PWA) Manajemen Catatan & Tugas Mahasiswa**  
> Dibuat untuk memenuhi Tugas Akhir Praktikum Pemrograman Perangkat Bergerak (PPB).

---

## 👥 Identitas Mahasiswa & Kelompok
- **Nama**: Haidar Rafi Apta Priatama
- **NIM**: 21120124140107
- **Kelompok**: 38
- **Shift**: 06
- **Program Studi**: Teknik Komputer
- **Universitas**: Universitas Diponegoro
- **Mata Kuliah**: Praktikum Pemrograman Perangkat Bergerak (Semester 5)

---

## 🚀 Fitur Utama & Kepatuhan Syarat

1. **Minimal 3 Halaman Navigasi**:
   - 🏠 **Beranda (`/`)**: Dashboard ringkasan tugas, metrik statistik (total, belum selesai, selesai), pintasan tambah tugas, dan banner status PWA.
   - 📋 **Kelola Tugas (`/tasks`)**: Halaman CRUD fungsional penuh, dilengkapi pencarian kata kunci, filter mata kuliah, filter prioritas/status, dan pengurutan (sorting).
   - 🔍 **Detail Tugas (`/tasks/:id`)**: Halaman detail spesifik tiap tugas dengan opsi share link, toggle status, dan edit cepat.
   - 👤 **Profil Pengembang (`/profile`)**: Menampilkan Nama, NIM, Kelompok, Shift, Prodi, info praktikum, serta telemetri Service Worker & Cache PWA.

2. **Halaman CRUD Fungsional**:
   - **Create**: Tambah tugas baru dengan judul, mata kuliah, tenggat waktu (due date), prioritas (tinggi/sedang/rendah), status, dan deskripsi.
   - **Read**: Tampilan daftar kartu interaktif dengan indikator tenggat waktu ("Hari ini", "Terlewat") dan badge prioritas.
   - **Update**: Edit data tugas atau ubah status selesai secara instan.
   - **Delete**: Hapus tugas dengan dialog konfirmasi aman.
   - **Data Persistence**: Disimpan pada `localStorage` (tetap tersimpan saat halaman dimuat ulang dan bekerja 100% offline).

3. **Fungsionalitas Progressive Web App (PWA)**:
   - **Installable (Dapat Diinstal)**: Dilengkapi `manifest.json` standar, ikon 192x192 & 512x512, tema warna, serta event handler `beforeinstallprompt` untuk tombol "Install App".
   - **Bekerja Offline (Offline Support)**: Didukung Service Worker (`sw.js`) dengan strategi caching (pre-cache shell & Stale-While-Revalidate untuk aset), serta fallback navigasi halaman saat tidak ada jaringan.
   - **Indikator Online / Offline**: Menampilkan status konektivitas perangkat pengguna secara realtime.

4. **Teknologi yang Digunakan (Sesuai Modul Praktikum)**:
   - React JS
   - Vite
   - React Router DOM (`react-router-dom`)
   - Service Worker & Cache Storage API
   - Web App Manifest
   - Vercel Deployment Configuration (`vercel.json`)

---

## 🛠️ Menjalankan Proyek Secara Lokal

1. Buka terminal di dalam direktori proyek:
   ```bash
   cd catatanku-pwa
   ```

2. Jalankan server pengembangan (Development mode):
   ```bash
   npm run dev
   ```
   Buka URL yang ditampilkan (biasanya `http://localhost:5173`) di browser.

3. Untuk menguji build produksi & Service Worker:
   ```bash
   npm run build
   npm run preview
   ```
   Buka `http://localhost:4173` di browser.

---

## 🌐 Panduan Deploy ke Vercel

Proyek ini telah dilengkapi file konfigurasi `vercel.json` dengan rewrite rules untuk mendukung client-side routing React Router.

### Cara 1: Deploy Melalui GitHub (Direkomendasikan)
1. Buat repository baru di akun GitHub Anda (misal: `catatanku-pwa`).
2. Hubungkan repository lokal dan push kode:
   ```bash
   git remote add origin https://github.com/<username-anda>/catatanku-pwa.git
   git push -u origin main
   ```
3. Buka [https://vercel.com](https://vercel.com) dan login dengan akun GitHub Anda.
4. Klik **Add New...** &rarr; **Project**.
5. Pilih repository `catatanku-pwa`, lalu klik **Import**.
6. Konfigurasi build (akan otomatis terdeteksi):
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
7. Klik **Deploy**. Setelah selesai, tautan URL produksi Vercel (misal: `https://catatanku-pwa.vercel.app`) siap dikumpulkan!

### Cara 2: Deploy Melalui Vercel CLI
```bash
npx vercel
```
Ikuti petunjuk di terminal, pilih direktori proyek saat ini, dan aplikasi akan langsung ter-deploy.
