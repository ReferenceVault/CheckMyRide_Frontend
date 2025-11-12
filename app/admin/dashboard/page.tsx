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

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: 'Bookings',
    href: '/admin/dashboard/bookings',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
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
];

export default function AdminDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E54E3D] mx-auto mb-4"></div>
          <p className="text-[#64748b]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc] flex">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white shadow-xl transition-all duration-300 flex flex-col fixed h-full z-30`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-[#e2e8f0]">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-white via-white/90 to-white/70 shadow-lg shadow-[#E54E3D]/20 flex-shrink-0">
              <img src="/images/logo.png" alt="CheckMyRide" className="h-10 w-10 object-contain" />
            </div>
            {isSidebarOpen && (
              <div>
                <span className="text-xl font-bold tracking-tight text-[#1f2a37]">
                  Check<span className="text-[#E54E3D]">MyRide</span>
                </span>
                <p className="text-xs text-[#64748b]">Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#E54E3D] to-[#f97362] text-white shadow-lg shadow-[#E54E3D]/30'
                    : 'text-[#64748b] hover:bg-[#E54E3D]/10 hover:text-[#E54E3D]'
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {isSidebarOpen && <span className="font-semibold">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        {isSidebarOpen && user && (
          <div className="p-4 border-t border-[#e2e8f0]">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#E54E3D] to-[#f97362] flex items-center justify-center text-white font-semibold">
                {user.email?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#1f2a37] truncate">Admin</p>
                <p className="text-xs text-[#64748b] truncate">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-[#E54E3D] hover:bg-[#E54E3D]/10 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-4 top-20 h-8 w-8 rounded-full bg-white border-2 border-[#e2e8f0] shadow-lg flex items-center justify-center text-[#64748b] hover:text-[#E54E3D] hover:border-[#E54E3D] transition-colors"
        >
          <svg
            className={`h-4 w-4 transition-transform ${isSidebarOpen ? '' : 'rotate-180'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-[#e2e8f0] sticky top-0 z-20">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#0f172a]">Dashboard</h1>
              <p className="text-sm text-[#64748b]">Welcome back, {user?.email || 'Admin'}</p>
            </div>
            <div className="flex items-center gap-4">
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
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Total Bookings', value: '0', color: 'from-[#E54E3D] to-[#f97362]' },
                { label: 'Pending', value: '0', color: 'from-[#f59e0b] to-[#fbbf24]' },
                { label: 'Confirmed', value: '0', color: 'from-[#10b981] to-[#34d399]' },
                { label: 'Completed', value: '0', color: 'from-[#3b82f6] to-[#60a5fa]' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-[#64748b]">{stat.label}</p>
                    <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-[#0f172a]">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Welcome Card */}
            <div className="rounded-2xl bg-gradient-to-br from-[#E54E3D] via-[#f97362] to-[#fb9f8a] p-8 text-white shadow-xl shadow-[#E54E3D]/40 mb-8">
              <h2 className="text-2xl font-bold mb-2">Welcome to Admin Dashboard</h2>
              <p className="text-white/90">Manage bookings, users, and settings from here.</p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
                <h3 className="text-lg font-semibold text-[#0f172a] mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link
                    href="/admin/dashboard/bookings"
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#f8fafc] hover:bg-[#E54E3D]/10 transition-colors group"
                  >
                    <div className="h-10 w-10 rounded-lg bg-[#E54E3D]/10 flex items-center justify-center group-hover:bg-[#E54E3D] transition-colors">
                      <svg className="h-5 w-5 text-[#E54E3D] group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1f2a37]">View All Bookings</p>
                      <p className="text-xs text-[#64748b]">Manage and track all appointments</p>
                    </div>
                  </Link>
                  <Link
                    href="/admin/dashboard/users"
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#f8fafc] hover:bg-[#E54E3D]/10 transition-colors group"
                  >
                    <div className="h-10 w-10 rounded-lg bg-[#E54E3D]/10 flex items-center justify-center group-hover:bg-[#E54E3D] transition-colors">
                      <svg className="h-5 w-5 text-[#E54E3D] group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1f2a37]">Manage Users</p>
                      <p className="text-xs text-[#64748b]">View and manage user accounts</p>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
                <h3 className="text-lg font-semibold text-[#0f172a] mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f8fafc]">
                    <div className="h-2 w-2 rounded-full bg-[#E54E3D]"></div>
                    <p className="text-sm text-[#64748b]">No recent activity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

