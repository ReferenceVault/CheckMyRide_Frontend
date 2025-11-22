'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SiteHeader from '../../components/layout/SiteHeader';
import SiteFooter from '../../components/layout/SiteFooter';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
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
        throw new Error(data.message || `Request failed (${response.status})`);
      }

      setSuccess(true);
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
    <main className="min-h-screen bg-[#2B333B]">
      <SiteHeader />
      
      {/* Forgot Password Section */}
      <section className="relative overflow-hidden bg-[#2B333B] px-0 pt-24 pb-12 sm:pt-10 sm:pb-16 lg:pt-[30px] lg:pb-[1.25rem]">
        {/* Background Effects */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,78,61,0.2),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.18),transparent_50%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.22),transparent_45%)]" />
        <div className="pointer-events-none absolute -left-64 top-[-6rem] hidden h-[760px] w-[420px] lg:block">
          <div className="hero-wave" />
        </div>
        <div className="pointer-events-none absolute -right-64 bottom-[-6rem] hidden h-[760px] w-[420px] lg:block">
          <div className="hero-wave rotate-180" />
        </div>

        {/* Main Content */}
        <div className="relative flex items-center justify-center min-h-[60vh] px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            {/* Forgot Password Card */}
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
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">Forgot Password?</h2>
                  <p className="text-slate-400">Enter your email address and we'll send you a link to reset your password.</p>
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

                {success ? (
                  <div className="space-y-6">
                    <div className="rounded-2xl bg-green-950/50 border border-green-800/50 p-6 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                        <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-green-300 mb-2">Check Your Email</h3>
                      <p className="text-sm text-green-200 mb-4">
                        If an account with that email exists, we've sent you a password reset link.
                      </p>
                      <p className="text-xs text-green-300/80">
                        Please check your inbox and follow the instructions to reset your password.
                      </p>
                    </div>
                    <Link
                      href="/admin/login"
                      className="block w-full text-center text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      ← Back to Login
                    </Link>
                  </div>
                ) : (
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
                          Sending...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Send Reset Link
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Back to Login */}
                {!success && (
                  <div className="mt-6 text-center">
                    <Link
                      href="/admin/login"
                      className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Back to Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

