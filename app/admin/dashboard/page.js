'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ClipboardList, LogOut, Clock, CheckCircle, Search } from 'lucide-react';

const STATUS_CONFIG = {
  pending: { label: 'Pending', className: 'bg-amber-900/40 text-amber-300' },
  proposal_created: { label: 'Proposal Created', className: 'bg-emerald-900/40 text-emerald-300' },
};

export default function AdminDashboardPage() {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const router = useRouter();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from('consultation_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch submissions:', error);
    } else {
      setSubmissions(data || []);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      !searchQuery ||
      submission.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.customer_email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || submission.proposal_status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-neutral-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ClipboardList className="w-5 h-5 text-[#1D4B26]" />
            <h1 className="text-lg font-light tracking-wide font-[family-name:var(--font-montserrat)]">
              Lume Admin
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-light">Consultation Submissions</h2>
          <span className="text-sm text-neutral-500">
            {filteredSubmissions.length} submission{filteredSubmissions.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#1D4B26] transition-colors"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'proposal_created'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  statusFilter === status
                    ? 'bg-[#1D4B26] text-white'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {status === 'all' ? 'All' : STATUS_CONFIG[status]?.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submissions List */}
        {isLoading ? (
          <div className="text-center py-16 text-neutral-500">Loading submissions...</div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-neutral-500">
              {searchQuery || statusFilter !== 'all'
                ? 'No submissions match your filters.'
                : 'No submissions yet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSubmissions.map((submission) => {
              const serviceCount = submission.services?.length || 0;
              const statusInfo = STATUS_CONFIG[submission.proposal_status] || STATUS_CONFIG.pending;

              return (
                <div
                  key={submission.id}
                  onClick={() => router.push(`/admin/proposals/${submission.id}`)}
                  className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 hover:border-neutral-700 cursor-pointer transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-white font-medium truncate group-hover:text-[#4a9e6a] transition-colors">
                          {submission.customer_name}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${statusInfo.className}`}>
                          {statusInfo.label}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-400 truncate">
                        {submission.customer_email} &middot; {submission.customer_phone}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(submission.created_at)}
                        </span>
                        <span>
                          {serviceCount} service{serviceCount !== 1 ? 's' : ''} selected
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {submission.proposal_status === 'pending' ? (
                        <span className="text-xs text-neutral-500 group-hover:text-[#4a9e6a] transition-colors">
                          Create Proposal →
                        </span>
                      ) : (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      )}
                    </div>
                  </div>

                  {/* Service tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {submission.services?.map((service, index) => (
                      <span
                        key={index}
                        className="text-xs bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded"
                      >
                        {service.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
