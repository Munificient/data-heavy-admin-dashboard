import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users2, Percent, AlertTriangle } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const iconByMetric = {
  revenue: DollarSign,
  subscriptions: Users2,
  conversion: Percent,
  alerts: AlertTriangle,
};

const accentStyles = {
  indigo: {
    iconWrap: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400',
    stroke: '#6366f1',
  },
  emerald: {
    iconWrap: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    stroke: '#10b981',
  },
  amber: {
    iconWrap: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    stroke: '#f59e0b',
  },
  rose: {
    iconWrap: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
    stroke: '#f43f5e',
  },
};

export default function MetricCard({ metric }) {
  const Icon = iconByMetric[metric.id] ?? DollarSign;
  const accent = accentStyles[metric.accent] ?? accentStyles.indigo;
  const isUp = metric.trendDirection === 'up';
  const isPositiveContext = metric.id !== 'alerts';
  const trendIsGood = isPositiveContext ? isUp : !isUp;

  return (
    <div className="group rounded-xl border border-slate-200/80 bg-white p-5 shadow-card transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-surface-darkCard dark:shadow-card-dark">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{metric.title}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {metric.value}
          </p>
        </div>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${accent.iconWrap}`}>
          <Icon size={19} strokeWidth={2} />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
            trendIsGood
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
              : 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
          }`}
        >
          {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {metric.trendLabel}
        </span>

        <div className="h-9 w-20 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={metric.sparkline}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={accent.stroke}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
