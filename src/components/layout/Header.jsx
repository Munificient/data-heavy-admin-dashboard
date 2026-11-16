import React, { useEffect, useRef, useState } from 'react';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  ChevronDown,
  LogOut,
  UserCircle,
  Settings as SettingsIcon,
  CheckCheck,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';
import { notifications as initialNotifications, currentUser } from '../../data/mockDashboardData.js';

function useClickOutside(ref, onOutside) {
  useEffect(() => {
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutside();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, onOutside]);
}

export default function Header({ onToggleSidebar, searchTerm, onSearchChange }) {
  const { isDark, toggleTheme } = useTheme();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifs, setNotifs] = useState(initialNotifications);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useClickOutside(notifRef, () => setNotifOpen(false));
  useClickOutside(profileRef, () => setProfileOpen(false));

  const unreadCount = notifs.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-md transition-colors duration-200 dark:border-slate-800 dark:bg-surface-darkCard/90 sm:px-6">
      <button
        type="button"
        onClick={onToggleSidebar}
        className="focus-ring rounded-lg p-2 text-slate-500 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white lg:hidden"
      >
        <Menu size={20} />
      </button>

      {/* Global search */}
      <div className="relative hidden max-w-md flex-1 sm:block">
        <Search
          size={17}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search orders, customers, IDs..."
          className="focus-ring w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 transition-colors duration-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 sm:flex-none">
        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="focus-ring relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <Sun
            size={19}
            className={`absolute transition-all duration-200 ease-in-out ${
              isDark ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
            }`}
          />
          <Moon
            size={19}
            className={`absolute transition-all duration-200 ease-in-out ${
              isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'
            }`}
          />
        </button>

        {/* Notification center */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => {
              setNotifOpen((prev) => !prev);
              setProfileOpen(false);
            }}
            aria-label="Notifications"
            className="focus-ring relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="animate-slide-down absolute right-0 mt-2 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-surface-darkCard">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Notifications
                </p>
                <button
                  type="button"
                  onClick={markAllRead}
                  className="focus-ring flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-brand-600 transition-colors duration-200 hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-brand-500/10"
                >
                  <CheckCheck size={13} />
                  Mark all read
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifs.map((notif) => (
                  <div
                    key={notif.id}
                    className="flex gap-3 border-b border-slate-50 px-4 py-3 transition-colors duration-200 last:border-b-0 hover:bg-slate-50 dark:border-slate-800/60 dark:hover:bg-slate-800/40"
                  >
                    <span
                      className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                        notif.unread ? 'bg-brand-500' : 'bg-transparent'
                      }`}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">
                        {notif.title}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                        {notif.description}
                      </p>
                      <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                        {notif.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="focus-ring w-full border-t border-slate-100 py-2.5 text-center text-xs font-semibold text-brand-600 transition-colors duration-200 hover:bg-slate-50 dark:border-slate-800 dark:text-brand-400 dark:hover:bg-slate-800/40"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>

        {/* Profile menu */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => {
              setProfileOpen((prev) => !prev);
              setNotifOpen(false);
            }}
            className="focus-ring flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2 transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-white">
              {currentUser.initials}
            </div>
            <span className="hidden text-sm font-medium text-slate-700 dark:text-slate-200 md:block">
              {currentUser.name}
            </span>
            <ChevronDown size={14} className="hidden text-slate-400 md:block" />
          </button>

          {profileOpen && (
            <div className="animate-slide-down absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-surface-darkCard">
              <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {currentUser.name}
                </p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                  {currentUser.email}
                </p>
              </div>
              <div className="py-1">
                <button
                  type="button"
                  className="focus-ring flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-600 transition-colors duration-200 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/40"
                >
                  <UserCircle size={16} />
                  My Profile
                </button>
                <button
                  type="button"
                  className="focus-ring flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-600 transition-colors duration-200 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/40"
                >
                  <SettingsIcon size={16} />
                  Account Settings
                </button>
              </div>
              <div className="border-t border-slate-100 py-1 dark:border-slate-800">
                <button
                  type="button"
                  className="focus-ring flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-rose-600 transition-colors duration-200 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
