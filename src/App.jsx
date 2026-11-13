import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar.jsx';
import Header from './components/layout/Header.jsx';
import MetricCard from './components/dashboard/MetricCard.jsx';
import { kpiMetrics } from './data/mockDashboardData.js';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((prev) => !prev)}
        activeView={activeView}
        onNavigate={setActiveView}
      />
      <div className="flex-1">
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <main className="p-6">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white capitalize mb-6">{activeView}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {kpiMetrics.map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
