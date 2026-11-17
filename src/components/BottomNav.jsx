import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, User } from 'lucide-react';

export default function BottomNav() {
  const linkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium transition-colors ${
      isActive ? 'text-zinc-950 font-semibold' : 'text-zinc-400 hover:text-zinc-600'
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-200 bg-white/95 backdrop-blur-xs md:hidden">
      <div className="grid grid-cols-3 h-14">
        <NavLink to="/" end className={linkClass}>
          <LayoutDashboard className="h-4 w-4" />
          <span>Ringkasan</span>
        </NavLink>

        <NavLink to="/tasks" className={linkClass}>
          <CheckSquare className="h-4 w-4" />
          <span>Tugas</span>
        </NavLink>

        <NavLink to="/profile" className={linkClass}>
          <User className="h-4 w-4" />
          <span>Profil</span>
        </NavLink>
      </div>
    </nav>
  );
}
