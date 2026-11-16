import React from 'react';
import {
  LayoutDashboard,
  LineChart,
  Users,
  ShoppingCart,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  Activity,
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', icon: LineChart },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ collapsed, onToggle, activeView, onNavigate }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-slate-200/80 bg-white transition-all duration-200 ease-in-out dark:border-slate-800 dark:bg-surface-darkCard ${
        collapsed ? 'w-[76px]' : 'w-64'
      }`}
    >
      {/* Brand */}
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-slate-200/80 px-4 dark:border-slate-800">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white shadow-sm">
          <Activity size={20} strokeWidth={2.25} />
        </div>
        <div
          className={`overflow-hidden transition-all duration-200 ease-in-out ${
            collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
          }`}
        >
          <p className="whitespace-nowrap text-sm font-bold tracking-tight text-slate-900 dark:text-white">
            Pulse Admin
          </p>
          <p className="whitespace-nowrap text-xs text-slate-400 dark:text-slate-500">
            Control Center
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              title={collapsed ? item.label : undefined}
              className={`focus-ring group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out ${
                isActive
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white'
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-brand-600 dark:bg-brand-400" />
              )}
              <Icon size={19} strokeWidth={2} className="shrink-0" />
              <span
                className={`whitespace-nowrap transition-all duration-200 ease-in-out ${
                  collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-slate-200/80 p-3 dark:border-slate-800">
        <button
          type="button"
          onClick={onToggle}
          className="focus-ring flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 transition-all duration-200 ease-in-out hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white"
        >
          {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
          <span
            className={`whitespace-nowrap transition-all duration-200 ease-in-out ${
              collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
            }`}
          >
            Collapse
          </span>
        </button>
      </div>
    </aside>
  );
}
