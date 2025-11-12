'use client';

import Link from 'next/link';
import { useState } from 'react';
import BookingModal from '../components/BookingModal';
import SiteFooter from '../components/layout/SiteFooter';
import SiteHeader from '../components/layout/SiteHeader';

const socialLinks = [
  { label: 'Facebook', href: '#', icon: 'facebook' },
  { label: 'Instagram', href: '#', icon: 'instagram' },
  { label: 'X', href: '#', icon: 'x' },
  { label: 'YouTube', href: '#', icon: 'youtube' },
];

function renderIcon(type: string) {
  switch (type) {
    case 'facebook':
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M22 12.07C22 6.55 17.52 2 12 2S2 6.55 2 12.07C2 17 5.66 21.12 10.44 21.9v-6.89H7.9V12h2.54V9.79c0-2.5 1.48-3.89 3.76-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.25 0-1.64.78-1.64 1.58V12h2.79l-.45 3.01h-2.34v6.89C18.34 21.12 22 17 22 12.07Z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.51 4.51 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5.75-2.75a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
        </svg>
      );
    case 'x':
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4 3h4.38l3.24 4.86L15.98 3H20l-6.22 8.1L20.67 21h-4.31l-3.68-5.33L8.54 21H4.1l6.5-8.57Z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 5 12 5 12 5s-6 0-7.7.3a2.7 2.7 0 0 0-1.9 1.9C2 9 2 12 2 12s0 3 .4 4.8a2.7 2.7 0 0 0 1.9 1.9C5.9 19 12 19 12 19s6 0 7.7-.3a2.7 2.7 0 0 0 1.9-1.9C22 15 22 12 22 12s0-3-.4-4.8ZM10 15.5v-7l6 3.5Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function CareersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f9fc] text-[#0f172a]">
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,78,61,0.12),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_55%),radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_60%)]" />

      <SiteHeader />

      <section className="relative mx-auto flex max-w-5xl flex-col items-center gap-12 px-6 py-16 sm:px-10 sm:py-20 lg:py-24 text-center">
        <header className="space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#E54E3D]">
            Join Our Team
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-[#1f2a37]">Careers at</span>{' '}
            <span className="text-[#E54E3D]">CheckMyRide</span>
          </h1>
          <p className="mx-auto max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed text-[#3f4756]">
            Thank you for your interest in joining CheckMyRide! We’re currently not hiring, but we’re always excited to connect with talented automotive professionals, inspectors, and customer service experts who share our passion for helping buyers make informed vehicle decisions.
          </p>
        </header>

        <div className="rounded-[2.5rem] bg-white/95 p-8 sm:p-12 shadow-xl shadow-slate-200/60 ring-1 ring-slate-100 text-left sm:text-center">
          <h2 className="text-2xl font-semibold text-[#152032]">Stay in Touch</h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#3f4756]">
            Please check back periodically for future opportunities or follow us on social media to stay updated on company news and career openings.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                className="group inline-flex items-center gap-2 rounded-full border border-[#E54E3D]/25 bg-white px-5 py-3 text-sm font-semibold tracking-wide text-[#E54E3D] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E54E3D] hover:text-white"
              >
                {renderIcon(link.icon)}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-[2.25rem] bg-[#0f172a] px-8 py-10 text-white shadow-xl shadow-[#0f172a]/40">
          <h2 className="text-2xl font-semibold">Want to collaborate on inspections?</h2>
          <p className="mt-3 max-w-3xl text-sm sm:text-base leading-relaxed text-white/80">
            We work with a trusted network of technicians and service providers. If you’re interested in partnership opportunities, send us your details and we’ll set up a conversation when new roles open up.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#E54E3D] via-[#f97362] to-[#fb9f8a] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[#E54E3D]/40 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Join Our Vendor List
            </button>
            <Link
              href="mailto:info@checkmyride.ca"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-white"
            >
              Email Us Your Resume
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
