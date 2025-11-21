'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '../../../components/layout/AdminLayout';

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
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    // User is handled by AdminLayout, but we still need it for fetchBookings
    const userData = localStorage.getItem('adminUser');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && user) {
      fetchBookings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, currentPage]);


  const fetchBookings = async () => {
    setIsLoadingBookings(true);
    setError(null);

    try {
      const token = localStorage.getItem('adminToken');
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
      });
      if (statusFilter) {
        params.append('status', statusFilter);
      }

      const response = await fetch(`${API_URL}/api/bookings?${params.toString()}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const data = await response.json();
      setBookings(data.bookings || []);
      setPagination(data.pagination || { page: 1, limit: 10, total: 0, pages: 0 });
    } catch (error: any) {
      setError(error.message || 'Failed to load bookings');
      console.error('Error fetching bookings:', error);
    } finally {
      setIsLoadingBookings(false);
    }
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch(`${API_URL}/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Refresh bookings
      fetchBookings();
    } catch (error: any) {
      alert(error.message || 'Failed to update status');
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
                            <Link
                              href={`/admin/dashboard/bookings/${booking._id}`}
                              className="inline-flex items-center gap-1 rounded-lg bg-[#E54E3D]/10 px-3 py-1.5 text-xs font-semibold text-[#E54E3D] hover:bg-[#E54E3D] hover:text-white transition-colors"
                            >
                              View
                              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="px-6 py-4 border-t border-slate-700/50 flex items-center justify-between">
                    <div className="text-sm text-slate-400">
                      Showing {(currentPage - 1) * pagination.limit + 1} to {Math.min(currentPage * pagination.limit, pagination.total)} of {pagination.total} bookings
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-xl text-sm font-semibold text-white hover:bg-[#E54E3D]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                          let pageNum;
                          if (pagination.pages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= pagination.pages - 2) {
                            pageNum = pagination.pages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${
                                currentPage === pageNum
                                  ? 'bg-[#E54E3D] text-white'
                                  : 'text-white hover:bg-[#E54E3D]/10'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>
                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(pagination.pages, prev + 1))}
                        disabled={currentPage === pagination.pages}
                        className="px-4 py-2 rounded-xl text-sm font-semibold text-white hover:bg-[#E54E3D]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

