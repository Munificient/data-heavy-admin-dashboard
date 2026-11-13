import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const strokeByAccent = {
  indigo: '#6366f1',
  emerald: '#10b981',
  amber: '#f59e0b',
  rose: '#f43f5e',
};

export default function MetricCard({ metric }) {
  const isUp = metric.trendDirection === 'up';
  // alerts going up is bad, not good — don't paint it green just because direction is 'up'
  const isPositiveContext = metric.id !== 'alerts';
  const trendIsGood = isPositiveContext ? isUp : !isUp;

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{metric.title}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{metric.value}</p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
            trendIsGood
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-rose-50 text-rose-700'
          }`}
        >
          {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {metric.trendLabel}
        </span>
        <div className="h-9 w-20">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={metric.sparkline}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={strokeByAccent[metric.accent]}
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
