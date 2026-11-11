import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar.jsx';
import { useTheme } from './context/ThemeContext.jsx';

export default function App() {
  const { isDark, toggleTheme } = useTheme();
  const [activeView, setActiveView] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((prev) => !prev)}
        activeView={activeView}
        onNavigate={setActiveView}
      />
      <div className="flex-1">
        <div className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-end px-6">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-md border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-300"
          >
            {isDark ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
        <main className="p-6">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white capitalize">{activeView}</h1>
        </main>
      </div>
    </div>
  );
}
