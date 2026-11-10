import React from 'react';
import { useTheme } from './context/ThemeContext.jsx';

export default function App() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
      <button
        type="button"
        onClick={toggleTheme}
        className="rounded-md border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-300"
      >
        {isDark ? 'Switch to light' : 'Switch to dark'}
      </button>
    </div>
  );
}
