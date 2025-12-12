'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import AdminLayout from '../../../components/layout/AdminLayout';
import { useAdminAuth } from '../../hooks/useAdminAuth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Booking {
  _id: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
  };
  vehicleInfo: {
    make: string;
    model: string;
    year: number;
    mileage?: number;
    vin?: string;
  };
  inspectionDetails: {
    type: string;
    location: string;
  };
  appointmentDetails: {
    preferredDate: string;
    preferredTime: string;
    address: string;
  };
  additionalInfo: {
    paymentMethod: string;
    notes?: string;
    promoCode?: string;
  };
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export default function BookingsPage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAdminAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    total: 0,
    pages: 0,
  });
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthLoading && user) {
      fetchBookings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, currentPage, isAuthLoading, user]);


  const fetchBookings = async () => {
    setIsLoadingBookings(true);
    setError(null);

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('Authentication required. Please login again.');
        setIsLoadingBookings(false);
        return;
      }

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '5',
      });
      if (statusFilter) {
        params.append('status', statusFilter);
      }

      const response = await fetch(`${API_URL}/api/bookings?${params.toString()}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const data = await response.json();
      setBookings(data.bookings || []);
      setPagination(data.pagination || { page: 1, limit: 5, total: 0, pages: 0 });
    } catch (error: any) {
      setError(error.message || 'Failed to load bookings');
      console.error('Error fetching bookings:', error);
    } finally {
      setIsLoadingBookings(false);
    }
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        toast.error('Authentication required. Please login again.');
        return;
      }
      
      const response = await fetch(`${API_URL}/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Refresh bookings
      fetchBookings();
      toast.success('Status updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update status');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
      completed: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  const getReportSubmissionLink = (bookingId: string, inspectionType: string) => {
    const frontendUrl = window.location.origin;
    return `${frontendUrl}/mechanic/report/${bookingId}/${inspectionType}`;
  };

  const handleCopyReportLink = async (bookingId: string, inspectionType: string) => {
    const link = getReportSubmissionLink(bookingId, inspectionType);
    try {
      await navigator.clipboard.writeText(link);
      setCopiedLink(bookingId);
      toast.success('Link copied to clipboard');
      setTimeout(() => setCopiedLink(null), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      toast.error('Failed to copy link. Please try again.');
    }
  };

  return (
    <AdminLayout
      pageTitle="Bookings"
      pageSubtitle="Manage and track all appointments"
      headerActions={
        <button
          onClick={fetchBookings}
          disabled={isLoadingBookings}
          className="p-2 rounded-xl text-[#64748b] hover:bg-[#E54E3D]/10 hover:text-[#E54E3D] transition-colors disabled:opacity-50"
          title="Refresh"
        >
          <svg className={`h-5 w-5 ${isLoadingBookings ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      }
    >
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
            {/* Filters */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <label className="text-sm font-semibold text-white">Filter by Status:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="rounded-xl border-2 border-slate-600/50 bg-slate-800/60 backdrop-blur-sm px-4 py-2 text-sm text-white focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30"
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <button
                onClick={fetchBookings}
                disabled={isLoadingBookings}
                className="inline-flex items-center gap-2 rounded-xl bg-[#E54E3D] px-4 py-2 text-sm font-semibold text-white hover:bg-[#d14130] transition-colors disabled:opacity-50"
              >
                <svg className={`h-4 w-4 ${isLoadingBookings ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 rounded-2xl bg-red-950/50 border border-red-800/50 p-4">
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm text-red-300">{error}</p>
                    <button
                      onClick={() => setError(null)}
                      className="mt-2 text-xs text-red-400 hover:text-red-300 underline"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Bookings Table */}
            {isLoadingBookings ? (
              <div className="rounded-2xl bg-slate-800/60 backdrop-blur-xl p-12 shadow-xl border border-slate-700/50 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E54E3D] mx-auto mb-4"></div>
                <p className="text-slate-300">Loading bookings...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="rounded-2xl bg-slate-800/60 backdrop-blur-xl p-12 shadow-xl border border-slate-700/50 text-center">
                <svg className="h-16 w-16 text-slate-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="text-lg font-semibold text-white mb-2">No bookings found</h3>
                <p className="text-slate-400">There are no bookings matching your filters.</p>
              </div>
            ) : (
              <div className="rounded-2xl bg-slate-800/60 backdrop-blur-xl shadow-xl border border-slate-700/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-700/50 border-b border-slate-600/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Customer</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Vehicle</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Inspection</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Appointment</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                      {bookings.map((booking) => (
                        <tr key={booking._id} className="hover:bg-slate-700/30 transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-sm font-semibold text-white">{booking.personalInfo.fullName}</p>
                              <p className="text-xs text-slate-400">{booking.personalInfo.email}</p>
                              <p className="text-xs text-slate-400">{booking.personalInfo.phone}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-sm font-semibold text-white">
                                {booking.vehicleInfo.year} {booking.vehicleInfo.make} {booking.vehicleInfo.model}
                              </p>
                              {booking.vehicleInfo.mileage && (
                                <p className="text-xs text-slate-400">{booking.vehicleInfo.mileage.toLocaleString()} km</p>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-sm font-semibold text-white capitalize">{booking.inspectionDetails.type.replace('-', ' ')}</p>
                              <p className="text-xs text-slate-400 capitalize">{booking.inspectionDetails.location}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-sm font-semibold text-white">{formatDate(booking.appointmentDetails.preferredDate)}</p>
                              <p className="text-xs text-slate-400">{booking.appointmentDetails.preferredTime}</p>
                              <p className="text-xs text-slate-400 truncate max-w-[200px]">{booking.appointmentDetails.address}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={booking.status}
                              onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                              className={`rounded-lg border-2 px-3 py-1 text-xs font-semibold capitalize focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30 ${getStatusBadge(booking.status)}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-2">
                              {/* Primary Actions */}
                              <div className="flex items-center gap-2">
                                <Link
                                  href={`/admin/dashboard/bookings/${booking._id}`}
                                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#E54E3D]/10 px-3 py-1.5 text-xs font-semibold text-[#E54E3D] hover:bg-[#E54E3D] hover:text-white transition-colors"
                                >
                                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                  View Details
                                </Link>
                                <Link
                                  href={`/report/${booking._id}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-400 hover:bg-blue-500 hover:text-white transition-colors"
                                >
                                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  View Report
                                </Link>
                              </div>
                              {/* Report Form Actions */}
                              {/* <div className="flex items-center gap-2 pt-1 border-t border-slate-700/30">
                                <button
                                  onClick={() => handleCopyReportLink(booking._id, booking.inspectionDetails.type)}
                                  className="inline-flex items-center gap-1.5 rounded-lg bg-purple-500/10 px-3 py-1.5 text-xs font-semibold text-purple-400 hover:bg-purple-500 hover:text-white transition-colors"
                                  title="Copy report form link to clipboard"
                                >
                                  {copiedLink === booking._id ? (
                                    <>
                                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                      </svg>
                                      Copied!
                                    </>
                                  ) : (
                                    <>
                                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                      </svg>
                                      Copy Form Link
                                    </>
                                  )}
                                </button>
                                <Link
                                  href={`/mechanic/report/${booking._id}/${booking.inspectionDetails.type}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 rounded-lg bg-green-500/10 px-3 py-1.5 text-xs font-semibold text-green-400 hover:bg-green-500 hover:text-white transition-colors"
                                  title="Open report submission form"
                                >
                                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                  Go to Form
                                </Link>
                              </div> */}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {pagination.total > 0 && (
                  <div className="px-6 py-4 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-slate-400">
                      Showing <span className="font-semibold text-white">{(currentPage - 1) * pagination.limit + 1}</span> to <span className="font-semibold text-white">{Math.min(currentPage * pagination.limit, pagination.total)}</span> of <span className="font-semibold text-white">{pagination.total}</span> bookings
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-slate-700/50 hover:bg-[#E54E3D] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-700/50 transition-colors"
                      >
                        Previous
                      </button>
                      <div className="flex items-center gap-1">
                        {pagination.pages <= 7 ? (
                          // Show all pages if 7 or fewer
                          Array.from({ length: pagination.pages }, (_, i) => {
                            const pageNum = i + 1;
                            return (
                              <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors min-w-[36px] ${
                                  currentPage === pageNum
                                    ? 'bg-[#E54E3D] text-white'
                                    : 'text-white bg-slate-700/50 hover:bg-[#E54E3D]/50'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          })
                        ) : (
                          // Show first, last, and pages around current
                          <>
                            <button
                              onClick={() => setCurrentPage(1)}
                              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors min-w-[36px] ${
                                currentPage === 1
                                  ? 'bg-[#E54E3D] text-white'
                                  : 'text-white bg-slate-700/50 hover:bg-[#E54E3D]/50'
                              }`}
                            >
                              1
                            </button>
                            {currentPage > 3 && <span className="text-slate-400 px-1">...</span>}
                            {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                              let pageNum;
                              if (currentPage <= 3) {
                                pageNum = i + 2;
                              } else if (currentPage >= pagination.pages - 2) {
                                pageNum = pagination.pages - 4 + i;
                              } else {
                                pageNum = currentPage - 2 + i;
                              }
                              if (pageNum <= 1 || pageNum >= pagination.pages) return null;
                              return (
                                <button
                                  key={pageNum}
                                  onClick={() => setCurrentPage(pageNum)}
                                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors min-w-[36px] ${
                                    currentPage === pageNum
                                      ? 'bg-[#E54E3D] text-white'
                                      : 'text-white bg-slate-700/50 hover:bg-[#E54E3D]/50'
                                  }`}
                                >
                                  {pageNum}
                                </button>
                              );
                            })}
                            {currentPage < pagination.pages - 2 && <span className="text-slate-400 px-1">...</span>}
                            <button
                              onClick={() => setCurrentPage(pagination.pages)}
                              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors min-w-[36px] ${
                                currentPage === pagination.pages
                                  ? 'bg-[#E54E3D] text-white'
                                  : 'text-white bg-slate-700/50 hover:bg-[#E54E3D]/50'
                              }`}
                            >
                              {pagination.pages}
                            </button>
                          </>
                        )}
                      </div>
                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(pagination.pages, prev + 1))}
                        disabled={currentPage === pagination.pages}
                        className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-slate-700/50 hover:bg-[#E54E3D] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-700/50 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>
    </AdminLayout>
  );
}

