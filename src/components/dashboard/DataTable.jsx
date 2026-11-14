import React, { useMemo, useState } from 'react';
import { orderRecords, orderStatuses, statusStyles } from '../../data/mockDashboardData.js';

const STATUS_TABS = ['All', ...orderStatuses];

function currency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function StatusBadge({ status }) {
  const style = statusStyles[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${style.badge}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
}

export default function DataTable({ searchTerm = '' }) {
  const [statusTab, setStatusTab] = useState('All');

  const filteredRecords = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return orderRecords.filter((row) => {
      const matchesStatus = statusTab === 'All' || row.status === statusTab;
      const matchesSearch =
        term.length === 0 ||
        row.customer.toLowerCase().includes(term) ||
        row.id.toLowerCase().includes(term);
      return matchesStatus && matchesSearch;
    });
  }, [statusTab, searchTerm]);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Orders</h3>
        <div className="flex items-center gap-1 rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusTab(tab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ${
                statusTab === tab ? 'bg-white dark:bg-slate-900 text-brand-700 shadow-sm' : 'text-slate-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <th className="px-5 py-3 text-xs font-semibold uppercase text-slate-400">Order ID</th>
            <th className="px-3 py-3 text-xs font-semibold uppercase text-slate-400">Customer Name</th>
            <th className="px-3 py-3 text-xs font-semibold uppercase text-slate-400">Purchase Date</th>
            <th className="px-3 py-3 text-xs font-semibold uppercase text-slate-400">Amount</th>
            <th className="px-3 py-3 text-xs font-semibold uppercase text-slate-400">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((row) => (
            <tr key={row.id} className="border-b border-slate-50 dark:border-slate-800/60 text-sm">
              <td className="px-5 py-3.5 font-mono text-xs text-slate-500">{row.id}</td>
              <td className="px-3 py-3.5 text-slate-800 dark:text-slate-100">{row.customer}</td>
              <td className="px-3 py-3.5 text-slate-600 dark:text-slate-300">{row.date}</td>
              <td className="px-3 py-3.5 font-semibold text-slate-800 dark:text-slate-100">{currency(row.amount)}</td>
              <td className="px-3 py-3.5"><StatusBadge status={row.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
