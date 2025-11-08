'use client';

import Link from 'next/link';
import { useState } from 'react';
import BookingModal from '../../components/BookingModal';
import SiteFooter from '../../components/layout/SiteFooter';
import SiteHeader from '../../components/layout/SiteHeader';

const checklist = [
  '75+ point chassis, drivetrain, and interior evaluation',
  'Advanced OBD-II scanning with freeze-frame data retention',
  'Thermal imaging sweep for battery, brakes, and HVAC hotspots',
  'Fluid sampling (engine oil + coolant) with contamination scoring',
  'Underbody corrosion and leak documentation using lift imagery',
  'Road test telemetry covering acceleration, braking, and NVH',
];

const highlights = [
  {
    title: 'Best for modern vehicles',
    description:
      'Ideal if you are shopping late-model or high-mileage cars that rely on sophisticated electronics. We interrogate every module and fluid system for hidden warning signs.',
  },
  {
    title: 'Inspection window',
    description:
      'We typically deploy within 24 hours. The diagnostics package extends the appointment by ~45 minutes so every subsystem is stress-tested.',
  },
  {
    title: 'Deliverables',
    description:
      'Interactive report, lab results, annotated photos, and a technician video recap to guide your next move.',
  },
];

export default function EnhancedInspectionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/#features' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Contact', href: '/#contact' },
  ];

  const heroSocialLinks = [
    {
      label: 'Facebook',
      href: '#',
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M22 12.07C22 6.55 17.52 2 12 2S2 6.55 2 12.07C2 17 5.66 21.12 10.44 21.9v-6.89H7.9V12h2.54V9.79c0-2.5 1.48-3.89 3.76-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.25 0-1.64.78-1.64 1.58V12h2.79l-.45 3.01h-2.34v6.89C18.34 21.12 22 17 22 12.07Z" />
        </svg>
      ),
    },
    {
      label: 'Instagram',
      href: '#',
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.51 4.51 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5.75-2.75a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
        </svg>
      ),
    },
    {
      label: 'X',
      href: '#',
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4 3h4.38l3.24 4.86L15.98 3H20l-6.22 8.1L20.67 21h-4.31l-3.68-5.33L8.54 21H4.1l6.5-8.57Z" />
        </svg>
      ),
    },
    {
      label: 'YouTube',
      href: '#',
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 5 12 5 12 5s-6 0-7.7.3a2.7 2.7 0 0 0-1.9 1.9C2 9 2 12 2 12s0 3 .4 4.8a2.7 2.7 0 0 0 1.9 1.9C5.9 19 12 19 12 19s6 0 7.7-.3a2.7 2.7 0 0 0 1.9-1.9C22 15 22 12 22 12s0-3-.4-4.8ZM10 15.5v-7l6 3.5Z" />
        </svg>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <SiteHeader navLinks={navLinks} onBookInspection={() => setIsModalOpen(true)} />

      <section className="relative overflow-hidden bg-[#0f172a] px-[12%] sm:px-[14%] lg:px-[15%] pt-14 pb-16 sm:pt-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,78,61,0.22),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(249,115,98,0.18),transparent_60%),radial-gradient(circle_at_center,rgba(252,165,143,0.14),transparent_65%)]" />
        <div className="pointer-events-none hidden lg:block">
          <div className="fixed left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
            <span className="block h-16 w-px bg-white/25" />
            {heroSocialLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#E54E3D] hover:border-[#E54E3D]"
              >
                {item.icon}
              </Link>
            ))}
            <span className="block h-16 w-px bg-white/25" />
          </div>
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/75">
            Enhanced Inspection
          </span>
          <h1 className="mt-6 text-3xl sm:text-4xl lg:text-[2.9rem] font-bold leading-tight text-white">
            Deeper diagnostics for modern drivetrains
          </h1>
          <p className="mt-5 text-lg sm:text-xl leading-relaxed text-white/80">
            Step beyond the basics with expanded diagnostics, fluid analysis, and underbody imaging. This package is engineered to reveal issues hiding behind sensors and dashboards.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center gap-3 rounded-full bg-[#E54E3D] px-8 py-4 text-base font-semibold uppercase tracking-wide text-white shadow-lg shadow-[#E54E3D]/40 transition-all hover:-translate-y-0.5 hover:bg-[#d14130]"
            >
              Book This Inspection
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </button>
            <Link
              href="/#features"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-all hover:-translate-y-0.5 hover:border-white"
            >
              Back to all services
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative px-[12%] sm:px-[14%] lg:px-[15%] py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#fef4f1] via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight text-[#0f172a]">
              What <span className="text-[#E54E3D]">We Deliver</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#3a4a61]">
              Expanded coverage to expose electrical, thermal, and mechanical risk before you buy.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/60 ring-1 ring-slate-100">
              <h3 className="text-lg font-semibold text-[#152032]">Inspection Checklist</h3>
              <ul className="mt-6 space-y-4 text-[#3f4756]">
                {checklist.map((item) => (
                  <li key={item} className="flex gap-3 text-sm sm:text-base">
                    <span className="mt-1 flex h-2.5 w-2.5 rounded-full bg-[#E54E3D]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#f36f51] px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-black shadow-lg shadow-[#f36f51]/30 transition-all hover:-translate-y-0.5 hover:bg-[#e75f3c]"
                >
                  Book Now
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </button>
                <Link
                  href="/#pricing"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-[#CBD5F5]/60 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-[#1f2a37] transition-all hover:-translate-y-0.5 hover:border-[#CBD5F5]"
                >
                  View Pricing
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {highlights.map((highlight) => (
                <div key={highlight.title} className="rounded-3xl bg-[#fdf3ef] p-6 shadow-inner shadow-[#fcd8ce]/40">
                  <h3 className="text-base font-semibold text-[#E54E3D] uppercase tracking-wide">{highlight.title}</h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#3f4756]">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
