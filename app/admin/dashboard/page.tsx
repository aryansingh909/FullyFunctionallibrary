'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  LogOut, Settings, Download, Search, Filter, RefreshCw,
  BookOpen, GraduationCap, MessageSquare, Users, Inbox,
  ChevronLeft, ChevronRight, X, Eye, Trash2, Phone, Mail,
  CheckCircle2, Clock, AlertCircle, SlidersHorizontal
} from 'lucide-react';
import { Inquiry, InquiryType, InquiryStatus } from '@/lib/types';

const STATUS_CONFIG: Record<InquiryStatus, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  new: { label: 'New', color: 'bg-blue-100 text-blue-800', icon: AlertCircle },
  contacted: { label: 'Contacted', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  resolved: { label: 'Resolved', color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
};

const TYPE_ICONS: Record<InquiryType, typeof BookOpen> = {
  library: BookOpen,
  enrollment: GraduationCap,
  general: MessageSquare,
};

function StatusBadge({ status }: { status: InquiryStatus }) {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.color}`}>
      <Icon className="w-3 h-3" /> {cfg.label}
    </span>
  );
}

interface DetailModalProps {
  inquiry: Inquiry;
  onClose: () => void;
  onStatusChange: (id: string, status: InquiryStatus) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

function DetailModal({ inquiry, onClose, onStatusChange, onDelete }: DetailModalProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleStatus = async (status: InquiryStatus) => {
    setSaving(true);
    await onStatusChange(inquiry.id, status);
    setSaving(false);
  };

  const handleDelete = async () => {
    setSaving(true);
    await onDelete(inquiry.id);
    setSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            {(() => { const Icon = TYPE_ICONS[inquiry.type]; return <Icon className="w-5 h-5 text-[#0B3D91]" />; })()}
            <h2 className="font-bold text-gray-900 capitalize">{inquiry.type} Inquiry</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Contact info */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-gray-500 mb-0.5">Name</div>
              <div className="font-semibold text-gray-900">{inquiry.name}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-0.5">Status</div>
              <StatusBadge status={inquiry.status} />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-0.5">Phone</div>
              <a href={`tel:${inquiry.phone}`} className="text-[#0B3D91] font-medium flex items-center gap-1 hover:text-[#F97316]">
                <Phone className="w-3 h-3" /> {inquiry.phone}
              </a>
            </div>
            {inquiry.email && (
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Email</div>
                <a href={`mailto:${inquiry.email}`} className="text-[#0B3D91] text-sm flex items-center gap-1 hover:text-[#F97316] break-all">
                  <Mail className="w-3 h-3" /> {inquiry.email}
                </a>
              </div>
            )}
            {inquiry.address && (
              <div className="col-span-2">
                <div className="text-xs text-gray-500 mb-0.5">Address</div>
                <div className="text-gray-700 text-sm">{inquiry.address}</div>
              </div>
            )}
            {inquiry.programme && (
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Programme</div>
                <div className="text-gray-700 text-sm font-medium">{inquiry.programme}</div>
              </div>
            )}
            {inquiry.plan && (
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Plan</div>
                <div className="text-gray-700 text-sm">{inquiry.plan}</div>
              </div>
            )}
            {inquiry.highest_qualification && (
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Qualification</div>
                <div className="text-gray-700 text-sm">{inquiry.highest_qualification}</div>
              </div>
            )}
            {inquiry.preferred_timing && (
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Preferred Timing</div>
                <div className="text-gray-700 text-sm">{inquiry.preferred_timing}</div>
              </div>
            )}
            {inquiry.preferred_callback && (
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Preferred Callback</div>
                <div className="text-gray-700 text-sm">{inquiry.preferred_callback}</div>
              </div>
            )}
            {inquiry.specialization && (
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Specialization</div>
                <div className="text-gray-700 text-sm">{inquiry.specialization}</div>
              </div>
            )}
          </div>

          {inquiry.message && (
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-500 mb-1">Message</div>
              <p className="text-gray-700 text-sm leading-relaxed">{inquiry.message}</p>
            </div>
          )}

          <div className="text-xs text-gray-400">
            Submitted: {new Date(inquiry.created_at).toLocaleString('en-IN')}
          </div>

          {/* Status actions */}
          <div className="border-t border-gray-100 pt-4">
            <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Update Status</div>
            <div className="flex gap-2 flex-wrap">
              {(Object.keys(STATUS_CONFIG) as InquiryStatus[]).map(s => (
                <button
                  key={s}
                  onClick={() => handleStatus(s)}
                  disabled={saving || inquiry.status === s}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 ${
                    inquiry.status === s
                      ? 'bg-[#0B3D91] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {STATUS_CONFIG[s].label}
                </button>
              ))}
            </div>
          </div>

          {/* Delete */}
          <div className="border-t border-gray-100 pt-4">
            {!confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                className="flex items-center gap-1.5 text-red-600 text-sm hover:text-red-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Delete this inquiry
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm text-red-700 font-medium">Are you sure?</span>
                <button
                  onClick={handleDelete}
                  disabled={saving}
                  className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Filters
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 15;

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        type: typeFilter,
        status: statusFilter,
        search,
        page: String(page),
        pageSize: String(pageSize),
      });
      const res = await fetch(`/api/admin/inquiries?${params}`);
      if (res.status === 401) { router.push('/admin/login'); return; }
      const data = await res.json();
      if (data.success) {
        setInquiries(data.data);
        setTotal(data.total);
      }
    } catch { /* silent */ }
    setLoading(false);
  }, [typeFilter, statusFilter, search, page, router]);

  useEffect(() => { fetchInquiries(); }, [fetchInquiries]);

  // Summary counts
  const newCount = inquiries.filter(i => i.status === 'new').length;

  const handleStatusChange = async (id: string, status: InquiryStatus) => {
    const res = await fetch(`/api/admin/inquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
      if (selectedInquiry?.id === id) setSelectedInquiry(prev => prev ? { ...prev, status } : null);
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/admin/inquiries/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setInquiries(prev => prev.filter(i => i.id !== id));
      setTotal(t => t - 1);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const handleExport = () => {
    const params = new URLSearchParams({ type: typeFilter, status: statusFilter });
    window.location.href = `/api/admin/export?${params}`;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const totalPages = Math.ceil(total / pageSize);

  const summaryCards = [
    { label: 'Total Inquiries', value: total, icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'New / Unread', value: newCount, icon: Inbox, color: 'text-orange-600 bg-orange-50' },
    { label: 'Library Inquiries', value: inquiries.filter(i => i.type === 'library').length, icon: BookOpen, color: 'text-green-600 bg-green-50' },
    { label: 'Enrollment', value: inquiries.filter(i => i.type === 'enrollment').length, icon: GraduationCap, color: 'text-purple-600 bg-purple-50' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#0B3D91] text-white px-4 sm:px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#F97316] rounded-lg flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-bold text-sm sm:text-base">SRS Digital Library</div>
            <div className="text-blue-200 text-xs hidden sm:block">Admin Dashboard</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push('/admin/settings')}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map(card => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-500 text-sm">{card.label}</span>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">{card.value}</div>
              </div>
            );
          })}
        </div>

        {/* Filters & search */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  placeholder="Search by name, phone, email..."
                  className="w-full rounded-xl border border-gray-300 pl-9 pr-4 py-2.5 text-sm text-gray-900 focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] outline-none"
                />
                {searchInput && (
                  <button type="button" onClick={() => { setSearchInput(''); setSearch(''); setPage(1); }} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:text-gray-700 text-gray-400">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
              <button type="submit" className="px-4 py-2.5 bg-[#0B3D91] text-white rounded-xl text-sm font-medium hover:bg-blue-800 transition-colors">
                Search
              </button>
            </form>

            {/* Filters */}
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-gray-400" />
                <select
                  value={typeFilter}
                  onChange={e => { setTypeFilter(e.target.value); setPage(1); }}
                  className="rounded-xl border border-gray-300 px-3 py-2.5 text-sm text-gray-700 focus:border-[#0B3D91] outline-none bg-white"
                >
                  <option value="all">All Types</option>
                  <option value="library">Library</option>
                  <option value="enrollment">Enrollment</option>
                  <option value="general">General</option>
                </select>
              </div>

              <select
                value={statusFilter}
                onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
                className="rounded-xl border border-gray-300 px-3 py-2.5 text-sm text-gray-700 focus:border-[#0B3D91] outline-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button onClick={fetchInquiries} className="p-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors" title="Refresh">
                <RefreshCw className="w-4 h-4 text-gray-500" />
              </button>
              <button onClick={handleExport} className="flex items-center gap-1.5 px-3 py-2.5 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors text-gray-700">
                <Download className="w-4 h-4" />
                <span className="hidden sm:block">Export CSV</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-gray-400">
              <RefreshCw className="w-5 h-5 animate-spin mr-2" /> Loading...
            </div>
          ) : inquiries.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Inbox className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p>No inquiries found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Programme/Plan</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Date</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {inquiries.map(inquiry => {
                    const TypeIcon = TYPE_ICONS[inquiry.type];
                    return (
                      <tr key={inquiry.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <TypeIcon className="w-4 h-4 text-gray-500" />
                            <span className="capitalize text-gray-600 hidden sm:block">{inquiry.type}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900">{inquiry.name}</td>
                        <td className="px-4 py-3">
                          <a href={`tel:${inquiry.phone}`} className="text-[#0B3D91] hover:text-[#F97316] transition-colors font-medium">
                            {inquiry.phone}
                          </a>
                        </td>
                        <td className="px-4 py-3 text-gray-600 hidden md:table-cell">
                          {inquiry.programme ?? inquiry.plan ?? '—'}
                        </td>
                        <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">
                          {new Date(inquiry.created_at).toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={inquiry.status} />
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setSelectedInquiry(inquiry)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
              <span className="text-sm text-gray-500">
                Page {page} of {totalPages} · {total} total
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-40"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedInquiry && (
        <DetailModal
          inquiry={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
