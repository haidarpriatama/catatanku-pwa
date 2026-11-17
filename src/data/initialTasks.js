export const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Laporan Akhir Praktikum PPB Modul PWA',
    subject: 'Pemrograman Perangkat Bergerak',
    dueDate: '2026-11-20',
    priority: 'high', // 'high' | 'medium' | 'low'
    status: 'in_progress', // 'pending' | 'in_progress' | 'completed'
    description: 'Menyusun laporan akhir pembuatan Progressive Web App (PWA) dengan fitur installable, offline support, routing, dan CRUD.',
    createdAt: '2026-11-15'
  },
  {
    id: 'task-2',
    title: 'Deploy Proyek PWA ke Vercel',
    subject: 'Pemrograman Perangkat Bergerak',
    dueDate: '2026-11-18',
    priority: 'high',
    status: 'completed',
    description: 'Upload repository ke GitHub, hubungkan ke Vercel, pastikan konfigurasi rewrite berjalan lancar tanpa 404 pada routing.',
    createdAt: '2026-11-16'
  },
  {
    id: 'task-3',
    title: 'Simulasi Jaringan RIPv2 & OSPF',
    subject: 'Jaringan Komputer',
    dueDate: '2026-11-25',
    priority: 'medium',
    status: 'pending',
    description: 'Menganalisis tabel routing dinamis pada topologi multi-router menggunakan Cisco Packet Tracer.',
    createdAt: '2026-11-14'
  },
  {
    id: 'task-4',
    title: 'Implementasi Sensor Suhu & Kelembaban ESP32',
    subject: 'Sistem Tertanam & IoT',
    dueDate: '2026-11-28',
    priority: 'low',
    status: 'pending',
    description: 'Membaca data sensor DHT22 dengan ESP32 dan mengirimkan payload telemetri melalui protokol MQTT.',
    createdAt: '2026-11-12'
  }
];

export const SUBJECTS = [
  'Semua Mata Kuliah',
  'Pemrograman Perangkat Bergerak',
  'Jaringan Komputer',
  'Sistem Tertanam & IoT',
  'Sistem Basis Data',
  'Kecerdasan Buatan',
  'Lainnya'
];
