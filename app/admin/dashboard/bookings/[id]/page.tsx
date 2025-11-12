'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

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
  assignedMechanic?: {
    name: string;
    email: string;
    assignedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function BookingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const bookingId = params?.id as string;
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoadingBooking, setIsLoadingBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [mechanicName, setMechanicName] = useState('');
  const [mechanicEmail, setMechanicEmail] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');

    if (!token || !userData) {
      router.push('/admin/login');
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/admin/login');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (user && bookingId) {
      fetchBooking();
    }
  }, [user, bookingId]);

  const fetchBooking = async () => {
    setIsLoadingBooking(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Booking not found');
        }
        throw new Error('Failed to fetch booking');
      }

      const data = await response.json();
      setBooking(data.booking);
    } catch (error: any) {
      setError(error.message || 'Failed to load booking');
      console.error('Error fetching booking:', error);
    } finally {
      setIsLoadingBooking(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!booking) return;

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

      setBooking({ ...booking, status: newStatus as any });
    } catch (error: any) {
      alert(error.message || 'Failed to update status');
    }
  };

  const handleAssignMechanic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking) return;

    if (!mechanicName.trim() || !mechanicEmail.trim()) {
      alert('Please fill in both mechanic name and email');
      return;
    }

    setIsAssigning(true);
    try {
      const response = await fetch(`${API_URL}/api/bookings/${bookingId}/assign-mechanic`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: mechanicName.trim(),
          email: mechanicEmail.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to assign mechanic');
      }

      const data = await response.json();
      setBooking(data.booking);
      setMechanicName('');
      setMechanicEmail('');
      setShowAssignForm(false);
      alert('Mechanic assigned successfully! Email notification sent.');
    } catch (error: any) {
      alert(error.message || 'Failed to assign mechanic');
    } finally {
      setIsAssigning(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
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

  if (isLoading || isLoadingBooking) {
    return (
      <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E54E3D] mx-auto mb-4"></div>
          <p className="text-[#64748b]">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center">
        <div className="text-center max-w-md">
          <svg className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-[#1f2a37] mb-2">Error</h2>
          <p className="text-[#64748b] mb-6">{error || 'Booking not found'}</p>
          <Link
            href="/admin/dashboard/bookings"
            className="inline-flex items-center gap-2 rounded-xl bg-[#E54E3D] px-6 py-3 text-sm font-semibold text-white hover:bg-[#d14130] transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Bookings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <header className="bg-white shadow-sm border-b border-[#e2e8f0] sticky top-0 z-20">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/dashboard/bookings"
                className="p-2 rounded-xl text-[#64748b] hover:bg-[#E54E3D]/10 hover:text-[#E54E3D] transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-[#0f172a]">Booking Details</h1>
                <p className="text-sm text-[#64748b]">Booking ID: {booking._id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-[#64748b]">Status:</span>
              <select
                value={booking.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className={`rounded-lg border-2 px-4 py-2 text-sm font-semibold capitalize focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30 ${getStatusBadge(booking.status)}`}
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Personal Information */}
          <div className="rounded-2xl bg-white shadow-lg shadow-slate-200/60 ring-1 ring-slate-100 p-6">
            <h2 className="text-lg font-bold text-[#1f2a37] mb-4 flex items-center gap-2">
              <svg className="h-5 w-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Full Name</label>
                <p className="text-sm font-semibold text-[#1f2a37] mt-1">{booking.personalInfo.fullName}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Email</label>
                <p className="text-sm font-semibold text-[#1f2a37] mt-1">{booking.personalInfo.email}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Phone</label>
                <p className="text-sm font-semibold text-[#1f2a37] mt-1">{booking.personalInfo.phone}</p>
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="rounded-2xl bg-white shadow-lg shadow-slate-200/60 ring-1 ring-slate-100 p-6">
            <h2 className="text-lg font-bold text-[#1f2a37] mb-4 flex items-center gap-2">
              <svg className="h-5 w-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Vehicle Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Make</label>
                <p className="text-sm font-semibold text-[#1f2a37] mt-1">{booking.vehicleInfo.make}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Model</label>
                <p className="text-sm font-semibold text-[#1f2a37] mt-1">{booking.vehicleInfo.model}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Year</label>
                <p className="text-sm font-semibold text-[#1f2a37] mt-1">{booking.vehicleInfo.year}</p>
              </div>
              {booking.vehicleInfo.mileage && (
                <div>
                  <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Mileage</label>
                  <p className="text-sm font-semibold text-[#1f2a37] mt-1">{booking.vehicleInfo.mileage.toLocaleString()} km</p>
                </div>
              )}
              {booking.vehicleInfo.vin && (
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">VIN</label>
                  <p className="text-sm font-semibold text-[#1f2a37] mt-1 font-mono">{booking.vehicleInfo.vin}</p>
                </div>
              )}
            </div>
          </div>

          {/* Inspection Details */}
          <div className="rounded-2xl bg-white shadow-lg shadow-slate-200/60 ring-1 ring-slate-100 p-6">
            <h2 className="text-lg font-bold text-[#1f2a37] mb-4 flex items-center gap-2">
              <svg className="h-5 w-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Inspection Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Type</label>
                <p className="text-sm font-semibold text-[#1f2a37] mt-1 capitalize">{booking.inspectionDetails.type.replace('-', ' ')}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Location</label>
                <p className="text-sm font-semibold text-[#1f2a37] mt-1 capitalize">{booking.inspectionDetails.location}</p>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="rounded-2xl bg-white shadow-lg shadow-slate-200/60 ring-1 ring-slate-100 p-6">
            <h2 className="text-lg font-bold text-[#1f2a37] mb-4 flex items-center gap-2">
              <svg className="h-5 w-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Appointment Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Preferred Date</label>
                <p className="text-sm font-semibold text-[#1f2a37] mt-1">{formatDate(booking.appointmentDetails.preferredDate)}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Preferred Time</label>
                <p className="text-sm font-semibold text-[#1f2a37] mt-1">{booking.appointmentDetails.preferredTime}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Address</label>
                <p className="text-sm font-semibold text-[#1f2a37] mt-1">{booking.appointmentDetails.address}</p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="rounded-2xl bg-white shadow-lg shadow-slate-200/60 ring-1 ring-slate-100 p-6">
            <h2 className="text-lg font-bold text-[#1f2a37] mb-4 flex items-center gap-2">
              <svg className="h-5 w-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Additional Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Payment Method</label>
                <p className="text-sm font-semibold text-[#1f2a37] mt-1 capitalize">{booking.additionalInfo.paymentMethod}</p>
              </div>
              {booking.additionalInfo.promoCode && (
                <div>
                  <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Promo Code</label>
                  <p className="text-sm font-semibold text-[#1f2a37] mt-1">{booking.additionalInfo.promoCode}</p>
                </div>
              )}
              {booking.additionalInfo.notes && (
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Notes</label>
                  <p className="text-sm text-[#1f2a37] mt-1 whitespace-pre-wrap">{booking.additionalInfo.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Assigned Mechanic */}
          <div className="rounded-2xl bg-white shadow-lg shadow-slate-200/60 ring-1 ring-slate-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#1f2a37] flex items-center gap-2">
                <svg className="h-5 w-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Assigned Mechanic
              </h2>
              {!booking.assignedMechanic && (
                <button
                  onClick={() => setShowAssignForm(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#E54E3D] px-4 py-2 text-sm font-semibold text-white hover:bg-[#d14130] transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Assign Mechanic
                </button>
              )}
            </div>

            {booking.assignedMechanic ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Name</label>
                  <p className="text-sm font-semibold text-[#1f2a37] mt-1">{booking.assignedMechanic.name}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Email</label>
                  <p className="text-sm font-semibold text-[#1f2a37] mt-1">{booking.assignedMechanic.email}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Assigned At</label>
                  <p className="text-sm font-semibold text-[#1f2a37] mt-1">{formatDateTime(booking.assignedMechanic.assignedAt)}</p>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setShowAssignForm(true);
                      setMechanicName(booking.assignedMechanic!.name);
                      setMechanicEmail(booking.assignedMechanic!.email);
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#E54E3D]/10 px-4 py-2 text-sm font-semibold text-[#E54E3D] hover:bg-[#E54E3D] hover:text-white transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Reassign
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-[#64748b]">No mechanic assigned yet</p>
            )}

            {showAssignForm && (
              <form onSubmit={handleAssignMechanic} className="mt-6 p-4 bg-[#f8fafc] rounded-xl border-2 border-[#e2e8f0]">
                <h3 className="text-sm font-semibold text-[#1f2a37] mb-4">
                  {booking.assignedMechanic ? 'Reassign Mechanic' : 'Assign Mechanic'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-2">
                      Mechanic Name
                    </label>
                    <input
                      type="text"
                      value={mechanicName}
                      onChange={(e) => setMechanicName(e.target.value)}
                      required
                      className="w-full rounded-lg border-2 border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#1f2a37] focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30"
                      placeholder="Enter mechanic name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-2">
                      Mechanic Email
                    </label>
                    <input
                      type="email"
                      value={mechanicEmail}
                      onChange={(e) => setMechanicEmail(e.target.value)}
                      required
                      className="w-full rounded-lg border-2 border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#1f2a37] focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30"
                      placeholder="mechanic@example.com"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isAssigning}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#E54E3D] px-4 py-2 text-sm font-semibold text-white hover:bg-[#d14130] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAssigning ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Assigning...
                      </>
                    ) : (
                      <>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Assign & Send Email
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAssignForm(false);
                      setMechanicName('');
                      setMechanicEmail('');
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-white border-2 border-[#e2e8f0] px-4 py-2 text-sm font-semibold text-[#64748b] hover:bg-[#f8fafc] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Timestamps */}
          <div className="rounded-2xl bg-white shadow-lg shadow-slate-200/60 ring-1 ring-slate-100 p-6">
            <h2 className="text-lg font-bold text-[#1f2a37] mb-4 flex items-center gap-2">
              <svg className="h-5 w-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Timestamps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Created At</label>
                <p className="text-sm font-semibold text-[#1f2a37] mt-1">{formatDateTime(booking.createdAt)}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Last Updated</label>
                <p className="text-sm font-semibold text-[#1f2a37] mt-1">{formatDateTime(booking.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

