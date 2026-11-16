import React, { useMemo, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { revenueTimelines, timelineScopes, acquisitionChannels } from '../../data/mockDashboardData.js';

function currency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function TrendTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg dark:border-slate-700 dark:bg-surface-darkCard">
      <p className="mb-1 font-semibold text-slate-700 dark:text-slate-200">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 capitalize text-slate-500 dark:text-slate-400">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            {entry.dataKey}
          </span>
          <span className="font-medium text-slate-700 dark:text-slate-200">
            {entry.dataKey === 'revenue' ? currency(entry.value) : entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

function DonutTooltip({ active, payload, total }) {
  if (!active || !payload || payload.length === 0) return null;
  const entry = payload[0];
  const percent = ((entry.value / total) * 100).toFixed(1);

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg dark:border-slate-700 dark:bg-surface-darkCard">
      <p className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-200">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.payload.color }} />
        {entry.name}
      </p>
      <p className="mt-1 text-slate-500 dark:text-slate-400">
        {entry.value.toLocaleString()} users &middot; {percent}%
      </p>
    </div>
  );
}

export default function AnalyticsCharts() {
  const [scope, setScope] = useState('7d');
  const [activeChannelId, setActiveChannelId] = useState(null);

  const data = revenueTimelines[scope];
  const totalUsers = useMemo(
    () => acquisitionChannels.reduce((sum, channel) => sum + channel.value, 0),
    []
  );

  const periodTotal = useMemo(
    () => data.reduce((sum, point) => sum + point.revenue, 0),
    [data]
  );

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
      {/* Main trend panel */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-card transition-colors duration-200 dark:border-slate-800 dark:bg-surface-darkCard dark:shadow-card-dark xl:col-span-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              Revenue Trend
            </h3>
            <p className="mt-1 flex items-baseline gap-2">
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                {currency(periodTotal)}
              </span>
              <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <TrendingUp size={13} />
                across selected period
              </span>
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800/70">
            {timelineScopes.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setScope(tab.id)}
                className={`focus-ring rounded-md px-3 py-1.5 text-xs font-semibold transition-all duration-200 ease-in-out ${
                  scope === tab.id
                    ? 'bg-white text-brand-700 shadow-sm dark:bg-slate-900 dark:text-brand-400'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="ordersFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-100 dark:stroke-slate-800" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: 'currentColor' }}
                className="text-slate-400 dark:text-slate-500"
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: 'currentColor' }}
                className="text-slate-400 dark:text-slate-500"
                axisLine={false}
                tickLine={false}
                width={44}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<TrendTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                strokeWidth={2.5}
                fill="url(#revenueFill)"
              />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="#22c55e"
                strokeWidth={2}
                fill="url(#ordersFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-2 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-brand-500" /> Revenue
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Orders
          </span>
        </div>
      </div>

      {/* Donut distribution panel */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-card transition-colors duration-200 dark:border-slate-800 dark:bg-surface-darkCard dark:shadow-card-dark">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          User Acquisition Channels
        </h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {totalUsers.toLocaleString()} total acquired users
        </p>

        <div className="relative mt-2 h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={acquisitionChannels}
                dataKey="value"
                nameKey="name"
                innerRadius={62}
                outerRadius={88}
                paddingAngle={3}
                onMouseEnter={(_, index) => setActiveChannelId(acquisitionChannels[index].id)}
                onMouseLeave={() => setActiveChannelId(null)}
              >
                {acquisitionChannels.map((channel) => (
                  <Cell
                    key={channel.id}
                    fill={channel.color}
                    fillOpacity={
                      activeChannelId === null || activeChannelId === channel.id ? 1 : 0.25
                    }
                    stroke="transparent"
                  />
                ))}
              </Pie>
              <Tooltip content={<DonutTooltip total={totalUsers} />} />
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              {activeChannelId
                ? `${(
                    (acquisitionChannels.find((c) => c.id === activeChannelId).value / totalUsers) *
                    100
                  ).toFixed(1)}%`
                : '100%'}
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              {activeChannelId
                ? acquisitionChannels.find((c) => c.id === activeChannelId).name
                : 'All channels'}
            </span>
          </div>
        </div>

        {/* Interactive legend */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          {acquisitionChannels.map((channel) => {
            const percent = ((channel.value / totalUsers) * 100).toFixed(1);
            const isDimmed = activeChannelId !== null && activeChannelId !== channel.id;

            return (
              <button
                key={channel.id}
                type="button"
                onMouseEnter={() => setActiveChannelId(channel.id)}
                onMouseLeave={() => setActiveChannelId(null)}
                className={`focus-ring flex items-center justify-between rounded-lg border border-transparent px-2.5 py-2 text-left transition-all duration-200 ease-in-out ${
                  isDimmed ? 'opacity-40' : 'opacity-100'
                } hover:border-slate-200 hover:bg-slate-50 dark:hover:border-slate-700 dark:hover:bg-slate-800/50`}
              >
                <span className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: channel.color }}
                  />
                  {channel.name}
                </span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                  {percent}%
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
