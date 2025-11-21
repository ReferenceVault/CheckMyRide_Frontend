'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

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

interface AdminLayoutProps {
  children: ReactNode;
  pageTitle?: string;
  pageSubtitle?: string;
  headerActions?: ReactNode;
}

export default function AdminLayout({ children, pageTitle, pageSubtitle, headerActions }: AdminLayoutProps) {
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
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    return 'Admin';
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
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
        } relative backdrop-blur-xl shadow-2xl border-r border-slate-700/50 transition-all duration-300 flex flex-col fixed h-full z-30 overflow-hidden`}
      >
        {/* Hero Section Gradient Background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,78,61,0.2),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.18),transparent_50%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.22),transparent_45%)]" />
        <div className="absolute inset-0 bg-slate-800/90" />
        
        {/* Hero Wave Effects */}
        <div className="pointer-events-none absolute -left-32 top-[-6rem] hidden h-[760px] w-[420px] lg:block opacity-60">
          <div className="hero-wave" />
        </div>
        <div className="pointer-events-none absolute -right-32 bottom-[-6rem] hidden h-[760px] w-[420px] lg:block opacity-60">
          <div className="hero-wave rotate-180" />
        </div>

        {/* Sidebar Content */}
        <div className="relative z-10 flex flex-col h-full">
        {/* Logo Section */}
        <div className="pt-[8px] pr-6 pb-[8px] pl-0 border-b border-slate-200 bg-white relative z-20">
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
        <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar relative z-10">
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
          <div className="p-4 border-t border-slate-700/50 relative z-10">
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
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} relative min-h-screen flex flex-col overflow-x-hidden`}>
        {/* Hero Section Gradient Background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,78,61,0.2),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.18),transparent_50%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.22),transparent_45%)]" />
        <div className="absolute inset-0 bg-[#2B333B]" />
        
        {/* Hero Wave Effects */}
        <div className="pointer-events-none absolute -left-64 top-[-6rem] hidden h-[760px] w-[420px] lg:block opacity-60">
          <div className="hero-wave" />
        </div>
        <div className="pointer-events-none absolute -right-64 bottom-[-6rem] hidden h-[760px] w-[420px] lg:block opacity-60">
          <div className="hero-wave rotate-180" />
        </div>

        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-20 relative">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              {pageTitle && <h1 className="text-xl font-bold text-[#0f172a]">{pageTitle}</h1>}
              {pageSubtitle && <p className="text-sm text-[#64748b]">{pageSubtitle}</p>}
            </div>
            <div className="flex items-center gap-4">
              {headerActions}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-xl text-[#64748b] hover:bg-[#E54E3D]/10 hover:text-[#E54E3D] transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Children - Positioned above gradient */}
        <div className="relative z-10 flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

