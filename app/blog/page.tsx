'use client';

import Link from 'next/link';
import SiteFooter from '../components/layout/SiteFooter';
import SiteHeader from '../components/layout/SiteHeader';

export default function BlogComingSoon() {
  const navLinks = [
    { label: 'Home', href: '/#home' },
    { label: 'Services', href: '/#features' },
    { label: 'Vehicles For Sale', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f9fc]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,78,61,0.12),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_55%),radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_60%)]" />

      <SiteHeader navLinks={navLinks} />

      <div className="relative mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center gap-10 px-6 py-16 text-center text-[#0f172a]">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#E54E3D]">
            Coming Soon
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-[#1f2a37]">Check</span>
            <span className="text-[#E54E3D]">MyRide</span>{' '}
            <span className="text-[#1f2a37]">Insights is on the way</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#3f4756]">
            Our blog is currently under development! Soon, you’ll find expert advice to navigate the used car market with total confidence.
          </p>
        </div>

        <div className="w-full max-w-3xl rounded-3xl bg-white/90 p-6 sm:p-10 shadow-xl shadow-slate-200/50 ring-1 ring-slate-100 text-left text-[#1f2a37]">
          <h2 className="text-xl font-semibold text-[#152032]">What to expect:</h2>
          <ul className="mt-4 space-y-3 text-sm sm:text-base text-[#3f4756]">
            <li className="flex items-start gap-3">
              <span className="mt-1 block h-2.5 w-2.5 rounded-full bg-[#E54E3D]" />
              Vehicle inspection tips and red flags to watch for
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 block h-2.5 w-2.5 rounded-full bg-[#E54E3D]" />
              Seasonal car maintenance advice
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 block h-2.5 w-2.5 rounded-full bg-[#E54E3D]" />
              Understanding common mechanical issues
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 block h-2.5 w-2.5 rounded-full bg-[#E54E3D]" />
              Ottawa-area automotive news and updates
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 block h-2.5 w-2.5 rounded-full bg-[#E54E3D]" />
              Buyer’s guides and inspection checklists
            </li>
          </ul>
        </div>

        <div className="max-w-2xl text-sm sm:text-base text-[#3f4756]">
          <p>
            In the meantime, if you have questions about our inspection services or need advice on a specific vehicle, reach out directly—we’re here to help.
          </p>
          <p className="mt-4 font-semibold text-[#E54E3D]">
            Need support today? <Link href="tel:6139815498" className="underline underline-offset-4">Call (613) 981-5498</Link>
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E54E3D] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[#E54E3D]/40 transition hover:-translate-y-0.5 hover:bg-[#d14130]"
        >
          Back to Home
        </Link>
      </div>

      <SiteFooter />
    </main>
  );
}
