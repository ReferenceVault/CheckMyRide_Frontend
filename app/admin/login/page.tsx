'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SiteHeader from '../../components/layout/SiteHeader';
import SiteFooter from '../../components/layout/SiteFooter';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Debug: Log the API URL being used
      console.log('Attempting login with API_URL:', API_URL);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      });
      
      console.log('Login response status:', response.status);

      clearTimeout(timeoutId);

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || `Server returned ${response.status} ${response.statusText}`);
      }

      if (!response.ok) {
        if (response.status === 400 && data.errors && Array.isArray(data.errors)) {
          const errorMessages = data.errors.map((err: any) => err.message).join(', ');
          throw new Error(`Validation Error: ${errorMessages}`);
        }
        throw new Error(data.message || `Login failed (${response.status})`);
      }

      // Store token and user info
      if (data.token) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
      }

      // Redirect to admin dashboard
      router.push('/admin/dashboard');

    } catch (error: any) {
      console.error('Login error:', error);
      
      if (error.name === 'AbortError') {
        setError('Request timed out. Please check your connection and try again.');
      } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setError(`Network error: Unable to connect to ${API_URL}. Please ensure the backend server is running on port 3001.`);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#2B333B]">
      <SiteHeader />
      
      {/* Admin Login Section */}
      <section className="relative overflow-hidden bg-[#2B333B] px-0 pt-24 pb-12 sm:pt-10 sm:pb-16 lg:pt-[30px] lg:pb-[1.25rem]">
        {/* Background Effects - Same as Hero Section */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,78,61,0.2),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.18),transparent_50%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.22),transparent_45%)]" />
        <div className="pointer-events-none absolute -left-64 top-[-6rem] hidden h-[760px] w-[420px] lg:block">
          <div className="hero-wave" />
        </div>
        <div className="pointer-events-none absolute -right-64 bottom-[-6rem] hidden h-[760px] w-[420px] lg:block">
          <div className="hero-wave rotate-180" />
        </div>

        {/* Main Content - Split Layout */}
        <div className="relative flex gap-0 min-w-0 overflow-x-hidden">

      {/* Left Section - Promotional Content */}
      <div className="hidden lg:flex lg:flex-[2] min-w-0 flex-col justify-start pl-[15%] pr-0 pt-[55px] pb-12 xl:pb-16 text-white relative overflow-hidden">
        <div className="space-y-8">
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-[1.55rem] sm:text-[2.1rem] md:text-4xl lg:text-[2.75rem] font-bold leading-tight text-white">
              Canada's Premier Vehicle
              <br />
              <span className="text-[#E54E3D]">Inspection Platform</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Advanced pre-purchase vehicle inspection powered by expert mechanics. Precision<br />
              diagnostics for confident automotive decisions.
            </p>
          </div>

          {/* Visualization Box */}
          <div className="relative mt-12 ml-8 w-full max-w-md h-64 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 overflow-hidden pl-8 min-w-0">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgb(148,163,184) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            
            {/* Left Animation - Central Point */}
            <div className="absolute top-1/2 left-1/2 -translate-x-8 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50 animate-pulse" />
            
            {/* Left Animation - Orbiting Vehicle Icons */}
            <div className="absolute top-1/2 left-1/2 -translate-x-8 -translate-y-1/2 w-32 h-32">
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '18s' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '14s', animationDirection: 'reverse' }}>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Animation - Central Point */}
            <div className="absolute top-1/2 left-1/2 translate-x-8 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50 animate-pulse" />
            
            {/* Right Animation - Orbiting Vehicle Icons */}
            <div className="absolute top-1/2 left-1/2 translate-x-8 -translate-y-1/2 w-32 h-32">
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="absolute bottom-4 left-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-sm text-slate-300">50+ Inspections Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-sm text-slate-300">Service Ready</span>
              </div>
            </div>
          </div>

          {/* Feature Icons */}
          <div className="flex gap-8 mt-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
                <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-slate-300 font-medium">Certified</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
                <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-slate-300 font-medium">Real-time</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
                <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <span className="text-slate-300 font-medium">Expert-Driven</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:flex-[1] min-w-0 flex items-start justify-start pl-0 pr-[15%] pt-[55px] pb-6 sm:pb-8 lg:pb-12 overflow-hidden">
        <div className="w-full max-w-none">
          {/* Login Card - Dark Glassmorphism */}
          <div className="relative rounded-3xl bg-slate-800/60 backdrop-blur-xl pt-0 pb-8 sm:pb-10 px-8 sm:px-10 shadow-2xl shadow-black/30 border border-slate-700/50 overflow-hidden">
            {/* Glossy Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-3xl" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
            
            {/* Inner Glow */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500/20 via-transparent to-blue-500/20 rounded-3xl opacity-50 blur-xl -z-10" />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="pt-8 sm:pt-10 mb-8 text-center">
                <h2 className="text-3xl font-bold text-[#E54E3D] mb-2">Admin Login</h2>
                <p className="text-slate-400">Enter your credentials to access your account.</p>
              </div>

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

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/50 backdrop-blur-sm px-4 py-3 text-sm text-white placeholder-slate-500 shadow-lg shadow-black/20 transition focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:bg-slate-900/70"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className="flex items-center gap-2 text-sm font-medium text-slate-300">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Password <span className="text-cyan-400">*</span>
                    </label>
                    <Link
                      href="/admin/forgot-password"
                      className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/50 backdrop-blur-sm px-4 py-3 pr-12 text-sm text-white placeholder-slate-500 shadow-lg shadow-black/20 transition focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:bg-slate-900/70"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 px-6 py-3.5 text-base font-semibold text-white shadow-xl shadow-cyan-500/30 transition hover:shadow-2xl hover:shadow-cyan-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Sign In
                    </>
                  )}
                </button>
              </form>

              {/* Security Indicator */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-green-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Protected by secure authentication</span>
              </div>

            </div>
          </div>
        </div>
      </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

