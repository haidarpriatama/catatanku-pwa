import React from 'react';

export function Button({
  children,
  variant = 'default',
  size = 'default',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 cursor-pointer';

  const variants = {
    default: 'bg-zinc-900 text-zinc-50 shadow-sm hover:bg-zinc-900/90',
    destructive: 'bg-red-600 text-white shadow-sm hover:bg-red-600/90',
    outline: 'border border-zinc-200 bg-white shadow-sm hover:bg-zinc-100 hover:text-zinc-900 text-zinc-700',
    secondary: 'bg-zinc-100 text-zinc-900 shadow-sm hover:bg-zinc-200/80',
    ghost: 'hover:bg-zinc-100 hover:text-zinc-900 text-zinc-600',
    link: 'text-zinc-900 underline-offset-4 hover:underline'
  };

  const sizes = {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 rounded-md px-3 text-xs',
    lg: 'h-10 rounded-md px-8',
    icon: 'h-8 w-8 p-0'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
