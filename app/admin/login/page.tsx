'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
      if (error.name === 'AbortError') {
        setError('Request timed out. Please check your connection and try again.');
      } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setError('Network error. Please check your internet connection and try again.');
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
    <main className="relative min-h-screen bg-gradient-to-br from-[#f7f9fc] via-white to-[#f3f5f9] flex items-center justify-center p-4">
      {/* Decorative Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -left-64 top-[-6rem] hidden h-[760px] w-[420px] lg:block">
          <div className="hero-wave" />
        </div>
        <div className="absolute -right-64 bottom-[-6rem] hidden h-[760px] w-[420px] lg:block">
          <div className="hero-wave rotate-180" />
        </div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-4">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-white via-white/90 to-white/70 shadow-lg shadow-[#E54E3D]/20">
              <img src="/images/logo.png" alt="CheckMyRide" className="h-12 w-12 object-contain" />
            </div>
            <span className="text-3xl font-bold tracking-tight text-[#1f2a37]">
              Check<span className="text-[#E54E3D]">MyRide</span>
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-[#0f172a] mb-2">Admin Login</h1>
          <p className="text-[#64748b]">Sign in to access the admin dashboard</p>
        </div>

        {/* Login Card */}
        <div className="rounded-[2.75rem] bg-white/95 p-8 sm:p-10 shadow-xl shadow-slate-200/60 ring-1 ring-slate-100">
          {error && (
            <div className="mb-6 rounded-2xl bg-red-50 border-2 border-red-200 p-4">
              <div className="flex items-start gap-3">
                <svg className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm text-red-700">{error}</p>
                  <button
                    onClick={() => setError(null)}
                    className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
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
              <label htmlFor="email" className="block text-sm font-semibold text-[#1f2a37] mb-2">
                Email Address <span className="text-[#E54E3D]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full rounded-xl border-2 border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#152032] shadow-inner shadow-slate-200/50 transition focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30"
                placeholder="admin@checkmyride.ca"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#1f2a37] mb-2">
                Password <span className="text-[#E54E3D]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full rounded-xl border-2 border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 pr-12 text-sm text-[#152032] shadow-inner shadow-slate-200/50 transition focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#E54E3D] transition-colors"
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
              className="w-full inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#E54E3D] via-[#f97362] to-[#fb9f8a] px-6 py-4 text-base font-semibold uppercase tracking-wide text-white shadow-xl shadow-[#E54E3D]/40 transition hover:-translate-y-0.5 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-[#64748b] hover:text-[#E54E3D] transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

