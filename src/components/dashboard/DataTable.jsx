import React, { useMemo, useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { orderRecords, orderStatuses, statusStyles } from '../../data/mockDashboardData.js';

const PAGE_SIZE = 8;
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

function SortIcon({ active, direction }) {
  if (!active) return <ArrowUpDown size={13} className="text-slate-300" />;
  return direction === 'asc' ? <ArrowUp size={13} className="text-brand-600" /> : <ArrowDown size={13} className="text-brand-600" />;
}

export default function DataTable({ searchTerm = '' }) {
  const [statusTab, setStatusTab] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRecords = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    let rows = orderRecords.filter((row) => {
      const matchesStatus = statusTab === 'All' || row.status === statusTab;
      const matchesSearch =
        term.length === 0 ||
        row.customer.toLowerCase().includes(term) ||
        row.id.toLowerCase().includes(term);
      return matchesStatus && matchesSearch;
    });

    rows = [...rows].sort((a, b) => {
      const { key, direction } = sortConfig;
      let comparison = 0;
      if (key === 'amount') comparison = a.amount - b.amount;
      else if (key === 'date') comparison = new Date(a.date) - new Date(b.date);
      else comparison = a.customer.localeCompare(b.customer);
      return direction === 'asc' ? comparison : -comparison;
    });

    return rows;
  }, [statusTab, searchTerm, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / PAGE_SIZE));
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageRows = filteredRecords.slice(pageStart, pageStart + PAGE_SIZE);

  const handleSort = (key) => {
    setSortConfig((prev) =>
      prev.key === key ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' } : { key, direction: 'asc' }
    );
  };

  const columns = [
    { key: 'id', label: 'Order ID', sortable: false },
    { key: 'customer', label: 'Customer Name', sortable: true },
    { key: 'date', label: 'Purchase Date', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true },
    { key: 'status', label: 'Status', sortable: false },
  ];

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
            {columns.map((col) => (
              <th key={col.key} className="px-3 py-3 text-xs font-semibold uppercase text-slate-400 first:px-5">
                {col.sortable ? (
                  <button type="button" onClick={() => handleSort(col.key)} className="flex items-center gap-1.5">
                    {col.label}
                    <SortIcon active={sortConfig.key === col.key} direction={sortConfig.direction} />
                  </button>
                ) : (
                  col.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageRows.map((row) => (
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

      <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 dark:border-slate-800">
        <p className="text-xs text-slate-500">
          Showing {pageStart + 1} to {Math.min(pageStart + PAGE_SIZE, filteredRecords.length)} of {filteredRecords.length} entries
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600"
          >
            <ChevronLeft size={13} /> Previous
          </button>
          <span className="px-2 text-xs text-slate-500">Page {currentPage} of {totalPages}</span>
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600"
          >
            Next <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
