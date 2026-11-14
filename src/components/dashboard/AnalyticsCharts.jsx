import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { revenueTimelines, timelineScopes } from '../../data/mockDashboardData.js';

export default function AnalyticsCharts() {
  const [scope, setScope] = useState('7d');
  const data = revenueTimelines[scope];

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Revenue Trend</h3>
        <div className="flex items-center gap-1 rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
          {timelineScopes.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setScope(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ${
                scope === tab.id ? 'bg-white dark:bg-slate-900 text-brand-700 shadow-sm' : 'text-slate-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#revenueFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
