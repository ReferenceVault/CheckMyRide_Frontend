'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

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
  };
  inspectionDetails: {
    type: string;
    location: string;
  };
  appointmentDetails: {
    preferredDate: string;
    preferredTime: string;
  };
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

interface DashboardStats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
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

export default function AdminDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  });
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication
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
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    setIsLoadingStats(true);
    setError(null);

    try {
      // Fetch all bookings to calculate stats
      const response = await fetch(`${API_URL}/api/bookings?limit=1000`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const data = await response.json();
      const bookings = data.bookings || [];

      // Calculate statistics
      const statsData: DashboardStats = {
        total: bookings.length,
        pending: bookings.filter((b: Booking) => b.status === 'pending').length,
        confirmed: bookings.filter((b: Booking) => b.status === 'confirmed').length,
        completed: bookings.filter((b: Booking) => b.status === 'completed').length,
        cancelled: bookings.filter((b: Booking) => b.status === 'cancelled').length,
      };

      setStats(statsData);

      // Get recent bookings (last 5)
      const sortedBookings = [...bookings]
        .sort((a: Booking, b: Booking) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);
      setRecentBookings(sortedBookings);
    } catch (error: any) {
      setError(error.message || 'Failed to load dashboard data');
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#2B333B] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E54E3D] mx-auto mb-4"></div>
          <p className="text-slate-300">Loading...</p>
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
                      const isActive = pathname === item.href;
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
              onClick={handleLogout}
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
          <div className="px-6 pt-[18px] pb-[18px] flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-[#0f172a]">Home</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={fetchDashboardData}
                disabled={isLoadingStats}
                className="p-2 rounded-xl text-[#64748b] hover:bg-[#E54E3D]/10 hover:text-[#E54E3D] transition-colors disabled:opacity-50"
                title="Refresh"
              >
                <svg className={`h-5 w-5 ${isLoadingStats ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-xl text-[#64748b] hover:bg-[#E54E3D]/10 hover:text-[#E54E3D] transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              {!isSidebarOpen && user && (
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl text-[#64748b] hover:bg-[#E54E3D]/10 hover:text-[#E54E3D] transition-colors"
                  title="Logout"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
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

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { 
                  label: 'Total Bookings', 
                  value: isLoadingStats ? '...' : stats.total.toString(), 
                  color: 'from-[#E54E3D] to-[#f97362]',
                  icon: (
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  )
                },
                { 
                  label: 'Pending', 
                  value: isLoadingStats ? '...' : stats.pending.toString(), 
                  color: 'from-[#f59e0b] to-[#fbbf24]',
                  icon: (
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
                { 
                  label: 'Confirmed', 
                  value: isLoadingStats ? '...' : stats.confirmed.toString(), 
                  color: 'from-[#10b981] to-[#34d399]',
                  icon: (
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
                { 
                  label: 'Completed', 
                  value: isLoadingStats ? '...' : stats.completed.toString(), 
                  color: 'from-[#3b82f6] to-[#60a5fa]',
                  icon: (
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="relative rounded-xl bg-slate-800/60 backdrop-blur-xl p-4 shadow-xl border border-slate-700/50 overflow-hidden group hover:border-slate-600/50 transition-all"
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-slate-700/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-slate-400">{stat.label}</p>
                      <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                        {stat.icon}
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                    {stat.label === 'Total Bookings' && stats.total > 0 && (
                      <p className="text-xs text-slate-400">
                        {stats.completed > 0 && `${Math.round((stats.completed / stats.total) * 100)}% completed`}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Bookings & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Bookings */}
              <div className="lg:col-span-2 rounded-2xl bg-slate-800/60 backdrop-blur-xl p-6 shadow-xl border border-slate-700/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Recent Bookings</h3>
                  <Link
                    href="/admin/dashboard/bookings"
                    className="text-sm font-semibold text-[#E54E3D] hover:text-[#f97362] transition-colors flex items-center gap-1"
                  >
                    View All
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                {isLoadingStats ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E54E3D] mx-auto mb-4"></div>
                    <p className="text-slate-400">Loading bookings...</p>
                  </div>
                ) : recentBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="h-12 w-12 text-slate-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="text-slate-400">No recent bookings</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentBookings.map((booking) => (
                      <Link
                        key={booking._id}
                        href={`/admin/dashboard/bookings/${booking._id}`}
                        className="block p-4 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 border border-slate-700/50 transition-all group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <p className="text-sm font-semibold text-white truncate">{booking.personalInfo.fullName}</p>
                              <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold border ${getStatusBadge(booking.status)} capitalize`}>
                                {booking.status}
                              </span>
                            </div>
                            <p className="text-sm text-slate-300 truncate">
                              {booking.vehicleInfo.year} {booking.vehicleInfo.make} {booking.vehicleInfo.model}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                              {booking.inspectionDetails.type} • {formatDate(booking.appointmentDetails.preferredDate)}
                            </p>
                          </div>
                          <svg className="h-5 w-5 text-slate-400 group-hover:text-[#E54E3D] transition-colors flex-shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="rounded-2xl bg-slate-800/60 backdrop-blur-xl p-6 shadow-xl border border-slate-700/50">
                <h3 className="text-lg font-semibold text-white mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  <Link
                    href="/admin/dashboard/bookings"
                    className="flex items-center gap-3 p-4 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 border border-slate-700/50 transition-all group"
                  >
                    <div className="h-10 w-10 rounded-lg bg-[#E54E3D]/20 flex items-center justify-center group-hover:bg-[#E54E3D] transition-colors">
                      <svg className="h-5 w-5 text-[#E54E3D] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white">View All Bookings</p>
                      <p className="text-xs text-slate-400">Manage and track all appointments</p>
                    </div>
                  </Link>
                  <Link
                    href="/admin/dashboard/users"
                    className="flex items-center gap-3 p-4 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 border border-slate-700/50 transition-all group"
                  >
                    <div className="h-10 w-10 rounded-lg bg-[#E54E3D]/20 flex items-center justify-center group-hover:bg-[#E54E3D] transition-colors">
                      <svg className="h-5 w-5 text-[#E54E3D] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white">Manage Users</p>
                      <p className="text-xs text-slate-400">View and manage user accounts</p>
                    </div>
                  </Link>
                  <Link
                    href="/admin/dashboard/settings"
                    className="flex items-center gap-3 p-4 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 border border-slate-700/50 transition-all group"
                  >
                    <div className="h-10 w-10 rounded-lg bg-[#E54E3D]/20 flex items-center justify-center group-hover:bg-[#E54E3D] transition-colors">
                      <svg className="h-5 w-5 text-[#E54E3D] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white">Settings</p>
                      <p className="text-xs text-slate-400">Configure system settings</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

