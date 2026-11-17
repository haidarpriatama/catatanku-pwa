import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { CheckSquare, Download, Wifi, WifiOff } from 'lucide-react';
import { Button } from './ui/button';

export default function Navbar() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setInstallPrompt(null);
    }
  };

  const navItemClass = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-zinc-900 ${
      isActive ? 'text-zinc-900 font-semibold' : 'text-zinc-500'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-xs">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <NavLink to="/" className="flex items-center gap-2 text-zinc-900">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-900 text-white">
              <CheckSquare className="h-4 w-4" />
            </div>
            <span className="font-semibold tracking-tight text-sm sm:text-base">CatatKuliah</span>
            <span className="rounded border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium text-zinc-600">
              PWA
            </span>
          </NavLink>

          <nav className="hidden md:flex items-center gap-5 text-sm">
            <NavLink to="/" end className={navItemClass}>
              Ringkasan
            </NavLink>
            <NavLink to="/tasks" className={navItemClass}>
              Daftar Tugas
            </NavLink>
            <NavLink to="/profile" className={navItemClass}>
              Profil
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Online/Offline Status */}
          <div
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
              isOnline
                ? 'border-emerald-200 bg-emerald-50/70 text-emerald-700'
                : 'border-zinc-200 bg-zinc-100 text-zinc-600'
            }`}
          >
            {isOnline ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="hidden sm:inline">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="h-3 w-3 text-zinc-500" />
                <span>Offline</span>
              </>
            )}
          </div>

          {/* PWA Install Button */}
          {installPrompt && !isInstalled && (
            <Button variant="outline" size="sm" onClick={handleInstallClick} className="gap-1.5 h-8">
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Install</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
