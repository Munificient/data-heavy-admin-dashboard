import React, { useMemo, useState } from 'react';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Trash2,
  CheckCircle2,
  X,
} from 'lucide-react';
import { orderRecords, orderStatuses, statusStyles } from '../../data/mockDashboardData.js';

const PAGE_SIZE = 8;
const STATUS_TABS = ['All', ...orderStatuses];

function currency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function formatDate(isoDate) {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function StatusBadge({ status }) {
  const style = statusStyles[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${style.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
}

function SortIcon({ active, direction }) {
  if (!active) {
    return <ArrowUpDown size={13} className="text-slate-300 dark:text-slate-600" />;
  }
  return direction === 'asc' ? (
    <ArrowUp size={13} className="text-brand-600 dark:text-brand-400" />
  ) : (
    <ArrowDown size={13} className="text-brand-600 dark:text-brand-400" />
  );
}

function downloadCsv(rows) {
  const header = ['Order ID', 'Customer Name', 'Email', 'Purchase Date', 'Amount', 'Status'];
  const escapeCell = (value) => `"${String(value).replace(/"/g, '""')}"`;

  const lines = rows.map((row) =>
    [row.id, row.customer, row.email, row.date, row.amount.toFixed(2), row.status]
      .map(escapeCell)
      .join(',')
  );

  const csvContent = [header.join(','), ...lines].join('\n');
  const encodedUri = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;

  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `orders-export-${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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

      if (key === 'amount') {
        comparison = a.amount - b.amount;
      } else if (key === 'date') {
        comparison = new Date(a.date) - new Date(b.date);
      } else {
        comparison = a.customer.localeCompare(b.customer);
      }

      return direction === 'asc' ? comparison : -comparison;
    });

    return rows;
  }, [records, statusTab, searchTerm, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageRows = filteredRecords.slice(pageStart, pageStart + PAGE_SIZE);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const changeTab = (tab) => {
    setStatusTab(tab);
    setCurrentPage(1);
  };

  const toggleRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAllOnPage = () => {
    const pageIds = pageRows.map((row) => row.id);
    const allSelected = pageIds.every((id) => selectedIds.includes(id));

    setSelectedIds((prev) =>
      allSelected
        ? prev.filter((id) => !pageIds.includes(id))
        : Array.from(new Set([...prev, ...pageIds]))
    );
  };

  const bulkDelete = () => {
    setRecords((prev) => prev.filter((row) => !selectedIds.includes(row.id)));
    setSelectedIds([]);
  };

  const bulkMarkPaid = () => {
    setRecords((prev) =>
      prev.map((row) => (selectedIds.includes(row.id) ? { ...row, status: 'Paid' } : row))
    );
    setSelectedIds([]);
  };

  const allOnPageSelected =
    pageRows.length > 0 && pageRows.every((row) => selectedIds.includes(row.id));

  const columns = [
    { key: 'id', label: 'Order ID', sortable: false },
    { key: 'customer', label: 'Customer Name', sortable: true },
    { key: 'date', label: 'Purchase Date', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true },
    { key: 'status', label: 'Status', sortable: false },
  ];

  return (
    <div className="rounded-xl border border-slate-200/80 bg-white shadow-card transition-colors duration-200 dark:border-slate-800 dark:bg-surface-darkCard dark:shadow-card-dark">
      {/* Header: title, status tabs, export */}
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Orders</h3>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            {filteredRecords.length} total records
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800/70">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => changeTab(tab)}
                className={`focus-ring rounded-md px-3 py-1.5 text-xs font-semibold transition-all duration-200 ease-in-out ${
                  statusTab === tab
                    ? 'bg-white text-brand-700 shadow-sm dark:bg-slate-900 dark:text-brand-400'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => downloadCsv(filteredRecords)}
            className="focus-ring flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition-all duration-200 ease-in-out hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Download size={13} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Bulk action bar */}
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          selectedIds.length > 0 ? 'max-h-16 border-b border-brand-100 dark:border-brand-500/20' : 'max-h-0'
        }`}
      >
        <div className="flex items-center justify-between gap-3 bg-brand-50/70 px-5 py-3 dark:bg-brand-500/10">
          <span className="flex items-center gap-2 text-xs font-semibold text-brand-700 dark:text-brand-400">
            <CheckCircle2 size={15} />
            {selectedIds.length} selected
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={bulkMarkPaid}
              className="focus-ring rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition-all duration-200 ease-in-out hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Mark as Paid
            </button>
            <button
              type="button"
              onClick={bulkDelete}
              className="focus-ring flex items-center gap-1.5 rounded-md bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition-all duration-200 ease-in-out hover:bg-rose-700"
            >
              <Trash2 size={13} />
              Delete
            </button>
            <button
              type="button"
              onClick={() => setSelectedIds([])}
              aria-label="Clear selection"
              className="focus-ring rounded-md p-1.5 text-brand-700 transition-colors duration-200 hover:bg-brand-100 dark:text-brand-400 dark:hover:bg-brand-500/20"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] table-auto border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <th className="w-10 px-5 py-3">
                <input
                  type="checkbox"
                  checked={allOnPageSelected}
                  onChange={toggleAllOnPage}
                  className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 dark:border-slate-600 dark:bg-slate-800"
                />
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500"
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(col.key)}
                      className="focus-ring flex items-center gap-1.5 transition-colors duration-200 hover:text-slate-700 dark:hover:text-slate-200"
                    >
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
            {pageRows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-sm text-slate-400 dark:text-slate-500">
                  No orders match your current filters.
                </td>
              </tr>
            )}
            {pageRows.map((row) => (
              <tr
                key={row.id}
                className={`border-b border-slate-50 text-sm transition-colors duration-200 last:border-b-0 dark:border-slate-800/60 ${
                  selectedIds.includes(row.id)
                    ? 'bg-brand-50/50 dark:bg-brand-500/5'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'
                }`}
              >
                <td className="px-5 py-3.5">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(row.id)}
                    onChange={() => toggleRow(row.id)}
                    className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 dark:border-slate-600 dark:bg-slate-800"
                  />
                </td>
                <td className="px-3 py-3.5 font-mono text-xs font-medium text-slate-500 dark:text-slate-400">
                  {row.id}
                </td>
                <td className="px-3 py-3.5">
                  <p className="font-medium text-slate-800 dark:text-slate-100">{row.customer}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{row.email}</p>
                </td>
                <td className="px-3 py-3.5 text-slate-600 dark:text-slate-300">
                  {formatDate(row.date)}
                </td>
                <td className="px-3 py-3.5 font-semibold text-slate-800 dark:text-slate-100">
                  {currency(row.amount)}
                </td>
                <td className="px-3 py-3.5">
                  <StatusBadge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Showing {filteredRecords.length === 0 ? 0 : pageStart + 1} to{' '}
          {Math.min(pageStart + PAGE_SIZE, filteredRecords.length)} of {filteredRecords.length} entries
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={safePage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            className="focus-ring flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-all duration-200 ease-in-out enabled:hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:enabled:hover:bg-slate-800"
          >
            <ChevronLeft size={13} />
            Previous
          </button>
          <span className="px-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            Page {safePage} of {totalPages}
          </span>
          <button
            type="button"
            disabled={safePage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            className="focus-ring flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-all duration-200 ease-in-out enabled:hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:enabled:hover:bg-slate-800"
          >
            Next
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
