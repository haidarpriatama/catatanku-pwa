import React from 'react';

export function Badge({ children, variant = 'default', className = '' }) {
  const base = 'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium transition-colors focus:outline-none';

  const variants = {
    default: 'border border-transparent bg-zinc-900 text-zinc-50',
    secondary: 'border border-transparent bg-zinc-100 text-zinc-900',
    outline: 'border border-zinc-200 text-zinc-700 bg-white',
    destructive: 'border border-red-200 bg-red-50 text-red-700',
    warning: 'border border-amber-200 bg-amber-50 text-amber-800',
    success: 'border border-emerald-200 bg-emerald-50 text-emerald-800'
  };

  return (
    <span className={`${base} ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
}
