'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import { useAdminAuth } from '../../hooks/useAdminAuth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Feedback {
  _id: string;
  bookingId: {
    _id: string;
    vehicleInfo?: {
      year?: number;
      make?: string;
      model?: string;
    };
  };
  mechanicId?: {
    _id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  customerName: string;
  customerEmail: string;
  ratings: {
    overallExperience: number;
    mechanicProfessionalism: number;
    inspectionThoroughness: number;
    reportClarity: number;
    communication: number;
  };
  recommendation: 'yes' | 'maybe' | 'no';
  detailedFeedback?: string;
  submittedAt: string;
  averageRating?: number;
}

export default function FeedbackPage() {
  const { user, isLoading: isAuthLoading } = useAdminAuth();
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    if (!isAuthLoading && user) {
      fetchFeedback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthLoading, user]);

  const fetchFeedback = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('Authentication required. Please login again.');
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/feedback?page=1&limit=20`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch feedback');
      }

      const data = await response.json();
      setFeedback(data.feedback || []);
      setPagination(data.pagination || { page: 1, limit: 20, total: 0, pages: 0 });
    } catch (error: any) {
      setError(error.message || 'Failed to load feedback');
      console.error('Error fetching feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getRecommendationBadge = (recommendation: string) => {
    const styles = {
      yes: 'bg-green-100 text-green-800 border-green-200',
      maybe: 'bg-orange-100 text-orange-800 border-orange-200',
      no: 'bg-red-100 text-red-800 border-red-200',
    };
    const labels = {
      yes: 'Yes',
      maybe: 'Maybe',
      no: 'No',
    };
    return {
      className: styles[recommendation as keyof typeof styles] || styles.maybe,
      label: labels[recommendation as keyof typeof labels] || recommendation,
    };
  };

  const handleRowClick = (item: Feedback) => {
    setSelectedFeedback(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFeedback(null);
  };

  if (isAuthLoading || isLoading) {
    return (
      <AdminLayout pageTitle="Feedback" pageSubtitle="Customer feedback and ratings">
        <div className="p-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E54E3D] mx-auto mb-4"></div>
            <p className="text-slate-300">Loading feedback...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout pageTitle="Feedback" pageSubtitle="Customer feedback and ratings">
      <div className="p-6">
        {error && (
          <div className="mb-6 rounded-2xl bg-red-950/50 border border-red-800/50 p-4">
            <div className="flex items-start gap-3">
              <svg className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <p className="text-sm text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {feedback.length === 0 && !isLoading ? (
          <div className="rounded-2xl bg-slate-800/60 backdrop-blur-xl p-12 shadow-xl border border-slate-700/50 text-center">
            <svg className="h-16 w-16 text-slate-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <h3 className="text-lg font-semibold text-white mb-2">No feedback yet</h3>
            <p className="text-slate-400">Customer feedback will appear here once submitted.</p>
          </div>
        ) : (
          <div className="rounded-2xl bg-slate-800/60 backdrop-blur-xl shadow-xl border border-slate-700/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50 border-b border-slate-600/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Vehicle</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Average Rating</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Recommendation</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Submitted</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {feedback.map((item) => {
                    const recommendationBadge = getRecommendationBadge(item.recommendation);
                    const vehicleInfo = item.bookingId?.vehicleInfo;
                    const vehicle = vehicleInfo
                      ? `${vehicleInfo.year || ''} ${vehicleInfo.make || ''} ${vehicleInfo.model || ''}`.trim()
                      : 'N/A';

                    return (
                      <tr key={item._id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-semibold text-white">{item.customerName}</p>
                            <p className="text-xs text-slate-400">{item.customerEmail}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-white">{vehicle}</p>
                        </td>
                        <td className="px-6 py-4">
                          {item.averageRating ? (
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-white">{item.averageRating.toFixed(1)}</span>
                              <span className="text-slate-400 text-sm">/5</span>
                              <div className="flex gap-0.5">
                                {'⭐'.repeat(Math.round(item.averageRating))}
                                {'☆'.repeat(5 - Math.round(item.averageRating))}
                              </div>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-sm">N/A</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${recommendationBadge.className}`}>
                            {recommendationBadge.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-white">{formatShortDate(item.submittedAt)}</p>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleRowClick(item)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#E54E3D]/10 px-3 py-1.5 text-xs font-semibold text-[#E54E3D] hover:bg-[#E54E3D] hover:text-white transition-colors"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination Info */}
        {pagination.total > 0 && (
          <div className="mt-6 text-center text-sm text-slate-400">
            Showing {feedback.length} of {pagination.total} feedback entries
          </div>
        )}

        {/* Modal for Detailed Feedback */}
        {isModalOpen && selectedFeedback && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[75vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#E54E3D] to-[#D43E2D] px-5 py-3 flex items-center justify-between flex-shrink-0">
                <div>
                  <h2 className="text-lg font-bold text-white">Feedback Details</h2>
                  <p className="text-xs text-white/90 mt-0.5">{selectedFeedback.customerName}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-1.5 rounded-lg text-white hover:bg-white/20 transition-colors"
                  aria-label="Close modal"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-4 bg-[#f7f9fc]">
                <div className="space-y-4">
                  {/* Customer & Booking Info */}
                  <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <h3 className="text-base font-bold text-[#1f2a37] mb-3">Customer & Booking Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <span className="text-xs text-slate-500 uppercase">Customer Name</span>
                        <p className="text-sm font-semibold text-[#1f2a37] mt-1">{selectedFeedback.customerName}</p>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 uppercase">Email</span>
                        <p className="text-sm font-semibold text-[#1f2a37] mt-1">{selectedFeedback.customerEmail}</p>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 uppercase">Vehicle</span>
                        <p className="text-sm font-semibold text-[#1f2a37] mt-1">
                          {selectedFeedback.bookingId?.vehicleInfo
                            ? `${selectedFeedback.bookingId.vehicleInfo.year || ''} ${selectedFeedback.bookingId.vehicleInfo.make || ''} ${selectedFeedback.bookingId.vehicleInfo.model || ''}`.trim()
                            : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 uppercase">Mechanic</span>
                        <p className="text-sm font-semibold text-[#1f2a37] mt-1">
                          {selectedFeedback.mechanicId
                            ? `${selectedFeedback.mechanicId.firstName || ''} ${selectedFeedback.mechanicId.lastName || ''}`.trim() || selectedFeedback.mechanicId.email || 'Unknown'
                            : 'Not assigned'}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 uppercase">Submitted Date</span>
                        <p className="text-sm font-semibold text-[#1f2a37] mt-1">{formatDate(selectedFeedback.submittedAt)}</p>
                      </div>
                      {selectedFeedback.averageRating && (
                        <div>
                          <span className="text-xs text-slate-500 uppercase">Average Rating</span>
                          <p className="text-sm font-semibold text-[#1f2a37] mt-1">{selectedFeedback.averageRating.toFixed(1)} / 5</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Ratings */}
                  <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <h3 className="text-base font-bold text-[#1f2a37] mb-3">Ratings</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                        <span className="text-sm font-medium text-slate-700">Overall Experience</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#1f2a37]">{selectedFeedback.ratings.overallExperience}/5</span>
                          <div className="text-yellow-400 text-sm">{'⭐'.repeat(selectedFeedback.ratings.overallExperience)}{'☆'.repeat(5 - selectedFeedback.ratings.overallExperience)}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                        <span className="text-sm font-medium text-slate-700">Mechanic Professionalism</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#1f2a37]">{selectedFeedback.ratings.mechanicProfessionalism}/5</span>
                          <div className="text-yellow-400 text-sm">{'⭐'.repeat(selectedFeedback.ratings.mechanicProfessionalism)}{'☆'.repeat(5 - selectedFeedback.ratings.mechanicProfessionalism)}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                        <span className="text-sm font-medium text-slate-700">Inspection Thoroughness</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#1f2a37]">{selectedFeedback.ratings.inspectionThoroughness}/5</span>
                          <div className="text-yellow-400 text-sm">{'⭐'.repeat(selectedFeedback.ratings.inspectionThoroughness)}{'☆'.repeat(5 - selectedFeedback.ratings.inspectionThoroughness)}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                        <span className="text-sm font-medium text-slate-700">Report Clarity & Quality</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#1f2a37]">{selectedFeedback.ratings.reportClarity}/5</span>
                          <div className="text-yellow-400 text-sm">{'⭐'.repeat(selectedFeedback.ratings.reportClarity)}{'☆'.repeat(5 - selectedFeedback.ratings.reportClarity)}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-1.5">
                        <span className="text-sm font-medium text-slate-700">Communication & Responsiveness</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#1f2a37]">{selectedFeedback.ratings.communication}/5</span>
                          <div className="text-yellow-400 text-sm">{'⭐'.repeat(selectedFeedback.ratings.communication)}{'☆'.repeat(5 - selectedFeedback.ratings.communication)}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <h3 className="text-base font-bold text-[#1f2a37] mb-2">Recommendation</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-slate-600">Would you recommend CheckMyRide?</span>
                      <span className={`inline-flex px-3 py-1.5 rounded-full text-sm font-semibold border ${getRecommendationBadge(selectedFeedback.recommendation).className}`}>
                        {getRecommendationBadge(selectedFeedback.recommendation).label}
                      </span>
                    </div>
                  </div>

                  {/* Detailed Feedback */}
                  {selectedFeedback.detailedFeedback && (
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <h3 className="text-base font-bold text-[#1f2a37] mb-2">Detailed Feedback</h3>
                      <p className="text-sm text-slate-600 whitespace-pre-wrap bg-slate-50 p-3 rounded-lg border border-slate-200">
                        {selectedFeedback.detailedFeedback}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end flex-shrink-0">
                <button
                  onClick={closeModal}
                  className="px-5 py-2 bg-[#E54E3D] text-white rounded-lg text-sm font-semibold hover:bg-[#D43E2D] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
