import React, { useEffect, useRef, useState } from 'react';
import { Search, Sun, Moon, Bell, ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';
import { notifications as initialNotifications, currentUser } from '../../data/mockDashboardData.js';

function useClickOutside(ref, onOutside) {
  useEffect(() => {
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) onOutside();
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, onOutside]);
}

export default function Header({ searchTerm, onSearchChange }) {
  const { isDark, toggleTheme } = useTheme();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifs = initialNotifications;
  const unreadCount = notifs.filter((n) => n.unread).length;

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  useClickOutside(notifRef, () => setNotifOpen(false));
  useClickOutside(profileRef, () => setProfileOpen(false));

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

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          className="h-9 w-9 flex items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {isDark ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setNotifOpen((prev) => !prev)}
            className="relative h-9 w-9 flex items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500" />
            )}
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl">
              {notifs.map((notif) => (
                <div key={notif.id} className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 last:border-b-0">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{notif.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{notif.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <div className="h-7 w-7 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center">
              {currentUser.initials}
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl p-3">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{currentUser.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{currentUser.email}</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
