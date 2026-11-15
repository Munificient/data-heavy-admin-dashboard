import React, { useMemo, useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, Trash2, CheckCircle2, X } from 'lucide-react';
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
  const [records, setRecords] = useState(orderRecords);
  const [statusTab, setStatusTab] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);

  const filteredRecords = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    let rows = records.filter((row) => {
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
  }, [records, statusTab, searchTerm, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageRows = filteredRecords.slice(pageStart, pageStart + PAGE_SIZE);

  const toggleRow = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
  };

  const toggleAllOnPage = () => {
    const pageIds = pageRows.map((row) => row.id);
    const allSelected = pageIds.every((id) => selectedIds.includes(id));
    setSelectedIds((prev) =>
      allSelected ? prev.filter((id) => !pageIds.includes(id)) : Array.from(new Set([...prev, ...pageIds]))
    );
  };

  const bulkDelete = () => {
    setRecords((prev) => prev.filter((row) => !selectedIds.includes(row.id)));
    setSelectedIds([]);
  };

  const bulkMarkPaid = () => {
    setRecords((prev) => prev.map((row) => (selectedIds.includes(row.id) ? { ...row, status: 'Paid' } : row)));
    setSelectedIds([]);
  };

  const changeTab = (tab) => {
    setStatusTab(tab);
    setCurrentPage(1);
  };

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

  const allOnPageSelected = pageRows.length > 0 && pageRows.every((row) => selectedIds.includes(row.id));

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Orders</h3>
        <div className="flex items-center gap-1 rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => changeTab(tab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ${
                statusTab === tab ? 'bg-white dark:bg-slate-900 text-brand-700 shadow-sm' : 'text-slate-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between gap-3 bg-brand-50/70 dark:bg-brand-500/10 px-5 py-3 border-b border-brand-100 dark:border-brand-500/20">
          <span className="flex items-center gap-2 text-xs font-semibold text-brand-700 dark:text-brand-400">
            <CheckCircle2 size={15} /> {selectedIds.length} selected
          </span>
          <div className="flex items-center gap-2">
            <button type="button" onClick={bulkMarkPaid} className="rounded-md bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 shadow-sm">
              Mark as Paid
            </button>
            <button type="button" onClick={bulkDelete} className="flex items-center gap-1.5 rounded-md bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">
              <Trash2 size={13} /> Delete
            </button>
            <button type="button" onClick={() => setSelectedIds([])} className="rounded-md p-1.5 text-brand-700 dark:text-brand-400">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <th className="w-10 px-5 py-3">
              <input type="checkbox" checked={allOnPageSelected} onChange={toggleAllOnPage} />
            </th>
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
              <td className="px-5 py-3.5">
                <input type="checkbox" checked={selectedIds.includes(row.id)} onChange={() => toggleRow(row.id)} />
              </td>
              <td className="px-3 py-3.5 font-mono text-xs text-slate-500">{row.id}</td>
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
            disabled={safePage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600"
          >
            <ChevronLeft size={13} /> Previous
          </button>
          <span className="px-2 text-xs text-slate-500">Page {safePage} of {totalPages}</span>
          <button
            type="button"
            disabled={safePage === totalPages}
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
