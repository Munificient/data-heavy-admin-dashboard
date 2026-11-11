import React from 'react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'users', label: 'Users' },
  { id: 'orders', label: 'Orders' },
  { id: 'settings', label: 'Settings' },
];

export default function Sidebar({ activeView, onNavigate }) {
  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-screen">
      <div className="h-16 flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
        <p className="font-bold text-slate-900 dark:text-white">Pulse Admin</p>
      </div>
      <nav className="p-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
              activeView === item.id
                ? 'bg-brand-50 text-brand-700'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
