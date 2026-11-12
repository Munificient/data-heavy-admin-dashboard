import React from 'react';
import { Search, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function Header({ searchTerm, onSearchChange }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 gap-4">
      <div className="relative max-w-md flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search orders, customers..."
          className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 pl-9 pr-3 py-2 text-sm"
        />
      </div>
      <button
        type="button"
        onClick={toggleTheme}
        className="h-9 w-9 flex items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        {isDark ? <Moon size={18} /> : <Sun size={18} />}
      </button>
    </header>
  );
}
