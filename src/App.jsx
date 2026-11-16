import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar.jsx';
import Header from './components/layout/Header.jsx';
import MetricCard from './components/dashboard/MetricCard.jsx';
import AnalyticsCharts from './components/dashboard/AnalyticsCharts.jsx';
import DataTable from './components/dashboard/DataTable.jsx';
import { kpiMetrics, orderRecords } from './data/mockDashboardData.js';
import { Users, ShoppingBag, Settings as SettingsIcon, Mail, Bell, Shield } from 'lucide-react';

const viewTitles = {
  dashboard: { title: 'Dashboard Overview', subtitle: "Here's what's happening across your store today." },
  analytics: { title: 'Analytics', subtitle: 'Deep dive into revenue, orders, and acquisition performance.' },
  users: { title: 'Users', subtitle: 'Everyone with access to your workspace.' },
  orders: { title: 'Orders', subtitle: 'Every transaction, searchable and sortable.' },
  settings: { title: 'Settings', subtitle: 'Manage preferences for your account and workspace.' },
};

function DashboardView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {kpiMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>
      <AnalyticsCharts />
      <DataTable searchTerm="" />
    </div>
  );
}

function AnalyticsView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {kpiMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>
      <AnalyticsCharts />
    </div>
  );
}

function OrdersView({ searchTerm }) {
  return <DataTable searchTerm={searchTerm} />;
}

function UsersView() {
  const uniqueCustomers = Array.from(
    new Map(orderRecords.map((row) => [row.email, row])).values()
  );

  return (
    <div className="rounded-xl border border-slate-200/80 bg-white shadow-card dark:border-slate-800 dark:bg-surface-darkCard dark:shadow-card-dark">
      <div className="flex items-center gap-2 border-b border-slate-100 p-5 dark:border-slate-800">
        <Users size={16} className="text-slate-400" />
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          Customers ({uniqueCustomers.length})
        </h3>
      </div>
      <div className="grid grid-cols-1 divide-y divide-slate-100 dark:divide-slate-800 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-3">
        {uniqueCustomers.map((customer) => (
          <div
            key={customer.email}
            className="flex items-center gap-3 border-b border-slate-100 p-4 transition-colors duration-200 last:border-b-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40 sm:border-r"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-400">
              {customer.customer
                .split(' ')
                .map((part) => part[0])
                .join('')}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">
                {customer.customer}
              </p>
              <p className="truncate text-xs text-slate-400 dark:text-slate-500">
                {customer.email}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsView() {
  const rows = [
    { icon: Mail, label: 'Email notifications', description: 'Order confirmations, refunds, and weekly summaries.', enabled: true },
    { icon: Bell, label: 'Push alerts', description: 'Real-time alerts for system and payment failures.', enabled: true },
    { icon: Shield, label: 'Two-factor authentication', description: 'Require a verification code at sign-in.', enabled: false },
    { icon: SettingsIcon, label: 'Beta features', description: 'Get early access to experimental dashboard modules.', enabled: false },
  ];

  const [toggles, setToggles] = useState(rows.map((row) => row.enabled));

  return (
    <div className="max-w-2xl rounded-xl border border-slate-200/80 bg-white shadow-card dark:border-slate-800 dark:bg-surface-darkCard dark:shadow-card-dark">
      <div className="border-b border-slate-100 p-5 dark:border-slate-800">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Preferences</h3>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {rows.map((row, index) => {
          const Icon = row.icon;
          return (
            <div key={row.label} className="flex items-center gap-4 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <Icon size={17} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{row.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{row.description}</p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setToggles((prev) => prev.map((val, i) => (i === index ? !val : val)))
                }
                className={`focus-ring relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ease-in-out ${
                  toggles[index] ? 'bg-brand-600' : 'bg-slate-200 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ease-in-out ${
                    toggles[index] ? 'left-[22px]' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  const meta = viewTitles[activeView];

  return (
    <div className="min-h-screen bg-surface transition-colors duration-200 dark:bg-surface-dark">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((prev) => !prev)}
        activeView={activeView}
        onNavigate={setActiveView}
      />

      <div
        className={`flex min-h-screen flex-col transition-all duration-200 ease-in-out ${
          collapsed ? 'lg:pl-[76px]' : 'lg:pl-64'
        }`}
      >
        <Header
          onToggleSidebar={() => setCollapsed((prev) => !prev)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-6">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                {meta.title}
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{meta.subtitle}</p>
            </div>

            {activeView === 'dashboard' && <DashboardView />}
            {activeView === 'analytics' && <AnalyticsView />}
            {activeView === 'orders' && <OrdersView searchTerm={searchTerm} />}
            {activeView === 'users' && <UsersView />}
            {activeView === 'settings' && <SettingsView />}
          </div>
        </main>
      </div>
    </div>
  );
}
