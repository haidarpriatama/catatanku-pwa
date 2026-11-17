import React, { useState, useEffect } from 'react';
import { User, ShieldCheck, HardDrive, RefreshCw, Pencil, Check } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';

export default function Profile() {
  const { stats, resetToDefault } = useTasks();

  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('catatkuliah_profile_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      nama: 'Kevin Nibras Kusuma',
      nim: '21120124140131',
      kelompok: 'Kelompok 20',
      shift: 'Shift 3',
      prodi: 'Teknik Komputer',
      universitas: 'Universitas Diponegoro',
      mataKuliah: 'Praktikum Pemrograman Perangkat Bergerak',
      semester: 'Semester 5'
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profileData);
  const [swActive, setSwActive] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg && reg.active) setSwActive(true);
      });
    }
  }, []);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileData(formData);
    localStorage.setItem('catatkuliah_profile_v2', JSON.stringify(formData));
    setIsEditing(false);
    showNotice('Data profil berhasil disimpan.');
  };

  const showNotice = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(''), 3000);
  };

  const handleClearCache = async () => {
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      showNotice('Cache PWA dibersihkan. Memuat ulang...');
      setTimeout(() => window.location.reload(), 800);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 space-y-6">
      {/* Header */}
      <div className="pb-6 border-b border-zinc-200">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Profil Praktikan</h1>
        <p className="text-sm text-zinc-500">
          Informasi identitas mahasiswa dan detail teknis implementasi PWA.
        </p>
      </div>

      {notice && (
        <div className="rounded-md border border-zinc-200 bg-zinc-50 p-3 text-xs font-medium text-zinc-800 flex items-center gap-2">
          <Check className="h-4 w-4 text-emerald-600" />
          <span>{notice}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Student Profile */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex-row items-center justify-between pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white font-semibold text-base">
                  {profileData.nama
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <div>
                  <CardTitle>{profileData.nama}</CardTitle>
                  <CardDescription>NIM: {profileData.nim}</CardDescription>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFormData(profileData);
                  setIsEditing(!isEditing);
                }}
                className="gap-1.5 h-8 text-xs"
              >
                <Pencil className="h-3.5 w-3.5" />
                <span>{isEditing ? 'Batal' : 'Edit'}</span>
              </Button>
            </CardHeader>

            <CardContent className="pt-5">
              {!isEditing ? (
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 text-xs">
                  <div>
                    <dt className="text-zinc-400 font-medium">Kelompok Praktikum</dt>
                    <dd className="font-semibold text-zinc-900 mt-0.5">
                      <Badge variant="secondary">{profileData.kelompok}</Badge>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-zinc-400 font-medium">Shift</dt>
                    <dd className="font-semibold text-zinc-900 mt-0.5">{profileData.shift}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-400 font-medium">Mata Kuliah</dt>
                    <dd className="font-semibold text-zinc-900 mt-0.5">{profileData.mataKuliah}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-400 font-medium">Semester</dt>
                    <dd className="font-semibold text-zinc-900 mt-0.5">{profileData.semester}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-400 font-medium">Program Studi</dt>
                    <dd className="font-semibold text-zinc-900 mt-0.5">{profileData.prodi}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-400 font-medium">Institusi</dt>
                    <dd className="font-semibold text-zinc-900 mt-0.5">{profileData.universitas}</dd>
                  </div>
                </dl>
              ) : (
                <form onSubmit={handleSaveProfile} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-zinc-600">Nama</label>
                    <Input
                      value={formData.nama}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-zinc-600">NIM</label>
                      <Input
                        value={formData.nim}
                        onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-zinc-600">Kelompok</label>
                      <Input
                        value={formData.kelompok}
                        onChange={(e) => setFormData({ ...formData, kelompok: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-zinc-600">Shift</label>
                      <Input
                        value={formData.shift}
                        onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-zinc-600">Program Studi</label>
                      <Input
                        value={formData.prodi}
                        onChange={(e) => setFormData({ ...formData, prodi: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                      Batal
                    </Button>
                    <Button type="submit" size="sm">
                      Simpan Perubahan
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: PWA & Tech Spec */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Status PWA & Storage</CardTitle>
              <CardDescription>Pemeriksaan lingkungan offline</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-zinc-100">
                <span className="text-zinc-500">Service Worker</span>
                <span className="font-medium text-zinc-900">
                  {swActive ? 'Aktif & Siap' : 'Terdaftar (Produksi)'}
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-zinc-100">
                <span className="text-zinc-500">Manifest PWA</span>
                <span className="font-medium text-emerald-700">Valid (Standalone)</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-zinc-100">
                <span className="text-zinc-500">Data Lokal</span>
                <span className="font-medium text-zinc-900">{stats.total} entri tugas</span>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <Button variant="outline" size="sm" onClick={handleClearCache} className="w-full text-xs">
                  Bersihkan Cache PWA
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    resetToDefault();
                    showNotice('Data reset ke default praktikum.');
                  }}
                  className="w-full text-xs"
                >
                  Reset Data Demo
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Teknologi Modul</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="outline">React 19</Badge>
                <Badge variant="outline">Vite</Badge>
                <Badge variant="outline">Tailwind CSS</Badge>
                <Badge variant="outline">shadcn/ui</Badge>
                <Badge variant="outline">React Router v7</Badge>
                <Badge variant="outline">Service Worker</Badge>
                <Badge variant="outline">Vercel</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
