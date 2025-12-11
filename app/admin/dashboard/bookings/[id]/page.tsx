'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAdminAuth } from '../../../hooks/useAdminAuth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    label: 'Overview',
    items: [
      {
        label: 'Home',
        href: '/admin/dashboard',
        icon: (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        ),
      },
    ],
  },
  {
    label: 'Main',
    items: [
      {
        label: 'Bookings',
        href: '/admin/dashboard/bookings',
        icon: (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        ),
      },
    ],
  },
  {
    label: 'Financial',
    items: [],
  },
  {
    label: 'Account',
    items: [
      {
        label: 'Users',
        href: '/admin/dashboard/users',
        icon: (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ),
      },
      {
        label: 'Settings',
        href: '/admin/dashboard/settings',
        icon: (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        ),
      },
    ],
  },
];

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
    mechanicId: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
    assignedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function BookingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const bookingId = params?.id as string;
  const { user, isLoading: isAuthLoading, logout } = useAdminAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoadingBooking, setIsLoadingBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  const [mechanics, setMechanics] = useState<Array<{ id: string; email: string; name: string }>>([]);
  const [selectedMechanicId, setSelectedMechanicId] = useState('');
  const [isLoadingMechanics, setIsLoadingMechanics] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (user && bookingId && !isAuthLoading) {
      fetchBooking();
    }
  }, [user, bookingId, isAuthLoading]);

  const fetchBooking = async () => {
    setIsLoadingBooking(true);
    setError(null);

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('Authentication required. Please login again.');
        setIsLoadingBooking(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
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

      setBooking({ ...booking, status: newStatus as any });
      toast.success('Status updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update status');
    }
  };

  const fetchMechanics = async () => {
    setIsLoadingMechanics(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/mechanics`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch mechanics');
      }

      const data = await response.json();
      setMechanics(data.mechanics || []);
    } catch (error: any) {
      console.error('Error fetching mechanics:', error);
      setError('Failed to load mechanics. Please try again.');
    } finally {
      setIsLoadingMechanics(false);
    }
  };

  const handleAssignMechanic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking) return;

    if (!selectedMechanicId) {
      toast.error('Please select a mechanic');
      return;
    }

    setIsAssigning(true);
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        toast.error('Authentication required. Please login again.');
        setIsAssigning(false);
        return;
      }
      
      const response = await fetch(`${API_URL}/api/bookings/${bookingId}/assign-mechanic`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          mechanicId: selectedMechanicId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to assign mechanic');
      }

      await fetchBooking();
      setSelectedMechanicId('');
      setShowAssignForm(false);
      toast.success('Mechanic assigned successfully! Email notification sent.');
    } catch (error: any) {
      toast.error(error.message || 'Failed to assign mechanic');
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

  const getReportSubmissionLink = (bookingId: string, inspectionType: string) => {
    const frontendUrl = window.location.origin;
    return `${frontendUrl}/mechanic/report/${bookingId}/${inspectionType}`;
  };

  const handleCopyReportLink = async () => {
    if (!booking) return;
    const link = getReportSubmissionLink(booking._id, booking.inspectionDetails.type);
    try {
      await navigator.clipboard.writeText(link);
      setCopiedLink(true);
      toast.success('Link copied to clipboard');
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      toast.error('Failed to copy link. Please try again.');
    }
  };

  console.log("booking==============", booking);
  console.log("user==============", user);
  const getUserDisplayName = () => {
    if (!user) return 'Admin';
    
    // Check for firstName and lastName
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    
    // Check for name or fullName
    const fullName = user.name || user.fullName;
    if (fullName) {
      return fullName;
    }
    
    // Fallback to email prefix or Admin
    if (user.email) {
      const emailPrefix = user.email.split('@')[0];
      // Capitalize first letter and replace dots/underscores with spaces
      return emailPrefix
        .replace(/[._]/g, ' ')
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    return 'Admin';
  };


  if (isAuthLoading || isLoadingBooking) {
    return (
      <div className="min-h-screen bg-[#2B333B] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E54E3D] mx-auto mb-4"></div>
          <p className="text-slate-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-[#2B333B] flex items-center justify-center">
        <div className="text-center max-w-md">
          <svg className="h-16 w-16 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
          <p className="text-slate-300 mb-6">{error || 'Booking not found'}</p>
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
    <div className="min-h-screen bg-[#2B333B] flex">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-800/90 backdrop-blur-xl shadow-2xl border-r border-slate-700/50 transition-all duration-300 flex flex-col fixed h-full z-30`}
      >
        {/* Logo Section */}
        <div className="pt-[8px] pr-6 pb-[8px] pl-0 border-b border-slate-200 bg-white">
          <div className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} gap-[7px]`}>
            {isSidebarOpen && (
              <div className="flex items-center flex-1">
                <div className="relative flex h-14 w-14 items-center justify-center flex-shrink-0">
                  <img src="/images/logo.png" alt="CheckMyRide" className="h-full w-full object-contain" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-[#1f2a37]">
                  Check<span className="text-[#E54E3D]">MyRide</span>
                </span>
              </div>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg text-[#1f2a37] hover:bg-slate-100 transition-colors flex-shrink-0"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
          <div className="space-y-6">
            {navSections.map((section) => (
              <div key={section.label}>
                {isSidebarOpen && (
                  <div className="px-4 mb-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {section.label}
                    </p>
                  </div>
                )}
                {section.items.length > 0 && (
                  <div className="space-y-2">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href || (item.href === '/admin/dashboard/bookings' && pathname?.includes('/bookings'));
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                            isActive
                              ? 'bg-gradient-to-r from-[#E54E3D] to-[#f97362] text-white shadow-lg shadow-[#E54E3D]/30'
                              : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                          }`}
                        >
                          <span className="flex-shrink-0">{item.icon}</span>
                          {isSidebarOpen && <span className="font-semibold">{item.label}</span>}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* User Section */}
        {isSidebarOpen && user && (
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#E54E3D] to-[#f97362] flex items-center justify-center text-white font-semibold shadow-lg shadow-[#E54E3D]/30">
                {user.email?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">Admin</p>
                <p className="text-xs text-slate-400 truncate">{user.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-20">
          <div className="px-6 py-3 flex items-center justify-between">
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
                <h1 className="text-xl font-bold text-[#0f172a]">Booking Details</h1>
                <p className="text-sm text-[#64748b]">Booking ID: {booking._id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {/* Primary Actions Group */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/report/${booking._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Report
                </Link>
              </div>
              
              {/* Report Form Actions Group */}
              <div className="flex items-center gap-2 pl-2 border-l border-slate-300">
                <button
                  onClick={handleCopyReportLink}
                  className="inline-flex items-center gap-2 rounded-xl bg-purple-500 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-600 transition-colors"
                  title="Copy report form link to clipboard"
                >
                  {copiedLink ? (
                    <>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600 transition-colors"
                  title="Open report submission form"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Go to Form
                </Link>
              </div>
              
              {/* Status Selector */}
              <div className="flex items-center gap-2 pl-2 border-l border-slate-300">
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
          <div className="rounded-2xl bg-slate-800/60 backdrop-blur-xl shadow-xl border border-slate-700/50 p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <svg className="h-5 w-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
                <p className="text-sm font-semibold text-white mt-1">{booking.personalInfo.fullName}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</label>
                <p className="text-sm font-semibold text-white mt-1">{booking.personalInfo.email}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone</label>
                <p className="text-sm font-semibold text-white mt-1">{booking.personalInfo.phone}</p>
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="rounded-2xl bg-slate-800/60 backdrop-blur-xl shadow-xl border border-slate-700/50 p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <svg className="h-5 w-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Vehicle Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Make</label>
                <p className="text-sm font-semibold text-white mt-1">{booking.vehicleInfo.make}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Model</label>
                <p className="text-sm font-semibold text-white mt-1">{booking.vehicleInfo.model}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Year</label>
                <p className="text-sm font-semibold text-white mt-1">{booking.vehicleInfo.year}</p>
              </div>
              {booking.vehicleInfo.mileage && (
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Mileage</label>
                  <p className="text-sm font-semibold text-white mt-1">{booking.vehicleInfo.mileage.toLocaleString()} km</p>
                </div>
              )}
              {booking.vehicleInfo.vin && (
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">VIN</label>
                  <p className="text-sm font-semibold text-white mt-1 font-mono">{booking.vehicleInfo.vin}</p>
                </div>
              )}
            </div>
          </div>

          {/* Inspection Details */}
          <div className="rounded-2xl bg-slate-800/60 backdrop-blur-xl shadow-xl border border-slate-700/50 p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <svg className="h-5 w-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Inspection Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Type</label>
                <p className="text-sm font-semibold text-white mt-1 capitalize">{booking.inspectionDetails.type.replace('-', ' ')}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</label>
                <p className="text-sm font-semibold text-white mt-1 capitalize">{booking.inspectionDetails.location}</p>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="rounded-2xl bg-slate-800/60 backdrop-blur-xl shadow-xl border border-slate-700/50 p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <svg className="h-5 w-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Appointment Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Preferred Date</label>
                <p className="text-sm font-semibold text-white mt-1">{formatDate(booking.appointmentDetails.preferredDate)}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Preferred Time</label>
                <p className="text-sm font-semibold text-white mt-1">{booking.appointmentDetails.preferredTime}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Address</label>
                <p className="text-sm font-semibold text-white mt-1">{booking.appointmentDetails.address}</p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="rounded-2xl bg-slate-800/60 backdrop-blur-xl shadow-xl border border-slate-700/50 p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <svg className="h-5 w-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Additional Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Payment Method</label>
                <p className="text-sm font-semibold text-white mt-1 capitalize">{booking.additionalInfo.paymentMethod}</p>
              </div>
              {booking.additionalInfo.promoCode && (
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Promo Code</label>
                  <p className="text-sm font-semibold text-white mt-1">{booking.additionalInfo.promoCode}</p>
                </div>
              )}
              {booking.additionalInfo.notes && (
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Notes</label>
                  <p className="text-sm text-slate-300 mt-1 whitespace-pre-wrap">{booking.additionalInfo.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Assigned Mechanic */}
          <div className="rounded-2xl bg-slate-800/60 backdrop-blur-xl shadow-xl border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <svg className="h-5 w-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Assigned Mechanic
              </h2>
              {booking.assignedMechanic && booking.assignedMechanic.mechanicId && typeof booking.assignedMechanic.mechanicId === 'object' ? (
                <button
                  onClick={() => {
                    setShowAssignForm(true);
                    fetchMechanics();
                    // Try to find and select current mechanic if exists in list
                    const mechanicId = booking.assignedMechanic?.mechanicId 
                      ? (typeof booking.assignedMechanic.mechanicId === 'object' && '_id' in booking.assignedMechanic.mechanicId
                          ? booking.assignedMechanic.mechanicId._id
                          : booking.assignedMechanic.mechanicId)
                      : null;
                    const currentMechanic = mechanicId ? mechanics.find(
                      (m) => m.id === mechanicId
                    ) : undefined;
                    if (currentMechanic) {
                      setSelectedMechanicId(currentMechanic.id);
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#E54E3D]/10 px-4 py-2 text-sm font-semibold text-[#E54E3D] hover:bg-[#E54E3D] hover:text-white transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Reassign Mechanic
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowAssignForm(true);
                    fetchMechanics();
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#E54E3D] px-4 py-2 text-sm font-semibold text-white hover:bg-[#d14130] transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Assign Mechanic
                </button>
              )}
            </div>

            {booking.assignedMechanic && booking.assignedMechanic.mechanicId && typeof booking.assignedMechanic.mechanicId === 'object' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {booking.assignedMechanic.mechanicId.firstName || booking.assignedMechanic.mechanicId.lastName ? (
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</label>
                    <p className="text-sm font-semibold text-white mt-1">
                      {booking.assignedMechanic.mechanicId.firstName || ''}{' '}
                      {booking.assignedMechanic.mechanicId.lastName || ''}
                    </p>
                  </div>
                ) : null}
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</label>
                  <p className="text-sm font-semibold text-white mt-1">
                    {booking.assignedMechanic.mechanicId.email || 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Assigned At</label>
                  <p className="text-sm font-semibold text-white mt-1">{formatDateTime(booking.assignedMechanic.assignedAt)}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-400">No mechanic assigned yet</p>
            )}

            {showAssignForm && (
              <form onSubmit={handleAssignMechanic} className="mt-6 p-4 bg-slate-700/30 rounded-xl border-2 border-slate-600/50">
                <h3 className="text-sm font-semibold text-white mb-4">
                  {booking.assignedMechanic ? 'Reassign Mechanic' : 'Assign Mechanic'}
                </h3>
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Select Mechanic <span className="text-red-400">*</span>
                  </label>
                  {isLoadingMechanics ? (
                    <div className="flex items-center gap-2 text-slate-400">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#E54E3D]"></div>
                      <span className="text-sm">Loading mechanics...</span>
                    </div>
                  ) : mechanics.length === 0 ? (
                    <div className="rounded-lg border-2 border-yellow-600/50 bg-yellow-950/20 p-3">
                      <p className="text-sm text-yellow-300">
                        No mechanics found. Please create users with role "mechanic" first.
                      </p>
                    </div>
                  ) : (
                    <select
                      value={selectedMechanicId}
                      onChange={(e) => setSelectedMechanicId(e.target.value)}
                      required
                      className="w-full rounded-lg border-2 border-slate-600/50 bg-slate-900/50 backdrop-blur-sm px-4 py-2 text-sm text-white focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30"
                    >
                      <option value="">-- Select a mechanic --</option>
                      {mechanics.map((mechanic) => (
                        <option key={mechanic.id} value={mechanic.id}>
                          {mechanic.name} ({mechanic.email})
                        </option>
                      ))}
                    </select>
                  )}
                  {selectedMechanicId && (
                    <div className="mt-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <p className="text-xs text-slate-400 mb-1">Selected Mechanic:</p>
                      <p className="text-sm font-semibold text-white">
                        {mechanics.find((m) => m.id === selectedMechanicId)?.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {mechanics.find((m) => m.id === selectedMechanicId)?.email}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isAssigning || !selectedMechanicId || isLoadingMechanics}
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
                      setSelectedMechanicId('');
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-700/50 border-2 border-slate-600/50 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-700/70 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Timestamps */}
          <div className="rounded-2xl bg-slate-800/60 backdrop-blur-xl shadow-xl border border-slate-700/50 p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <svg className="h-5 w-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Timestamps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Created At</label>
                <p className="text-sm font-semibold text-white mt-1">{formatDateTime(booking.createdAt)}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Updated</label>
                <p className="text-sm font-semibold text-white mt-1">{formatDateTime(booking.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}

