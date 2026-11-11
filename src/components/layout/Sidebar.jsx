import React from 'react';
import {
  LayoutDashboard,
  LineChart,
  Users,
  ShoppingCart,
  Settings,
  ChevronsLeft,
  ChevronsRight,
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
      className={`shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-screen transition-all duration-200 ease-in-out ${
        collapsed ? 'w-[76px]' : 'w-64'
      }`}
    >
      <div className="h-16 flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
        {!collapsed && <p className="font-bold text-slate-900 dark:text-white">Pulse Admin</p>}
      </div>
      <nav className="p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              title={collapsed ? item.label : undefined}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeView === item.id
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <Icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>
      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm text-slate-500 hover:bg-slate-100"
        >
          {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}
