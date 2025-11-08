'use client';

import Link from 'next/link';
import { useState } from 'react';
import BookingModal from './components/BookingModal';
import SiteFooter from './components/layout/SiteFooter';
import SiteHeader from './components/layout/SiteHeader';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const homeNavLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#features' },
    { label: 'Vehicles For Sale', href: '#about' },
    { label: 'Contact', href: '#contact' },
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
      <SiteHeader navLinks={homeNavLinks} onBookInspection={() => setIsModalOpen(true)} />

      {/* Hero Section - Dark Background */}
      <section
        id="home"
        className="relative overflow-hidden bg-[#2B333B] px-[15%] pt-24 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-[1.25rem]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,78,61,0.2),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.18),transparent_50%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.22),transparent_45%)]" />
        <div className="pointer-events-none absolute -left-64 top-[-6rem] hidden h-[760px] w-[420px] lg:block">
          <div className="hero-wave" />
        </div>
        <div className="pointer-events-none absolute -right-64 bottom-[-6rem] hidden h-[760px] w-[420px] lg:block">
          <div className="hero-wave rotate-180" />
        </div>
        <div className="pointer-events-none absolute -right-24 -top-24 hidden h-96 w-96 rotate-12 rounded-full border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent lg:block">
          <div className="absolute inset-8 rounded-full border border-white/15" />
          <div className="absolute inset-0 flex items-center justify-center text-5xl text-white/20">
            🛠️
          </div>
        </div>
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

        <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:items-center">
          <div className="-mt-14 lg:-mt-20">
            <div className="mb-5 flex items-center gap-4 text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/70 text-lg">
                🛠️
              </span>
              <span className="text-sm font-semibold uppercase tracking-[0.35em] text-white/80">
                Welcome to CheckMyRide
              </span>
            </div>
            <h1 className="text-[1.55rem] sm:text-[2.1rem] md:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-4 sm:mb-6">
              <span className="block whitespace-nowrap">Professional Vehicle Inspections</span>
              <span className="block text-[#E54E3D]">Before You Buy</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-5 sm:mb-8">
                Don't risk buying a lemon. Our certified mechanics will thoroughly inspect any vehicle before you purchase, giving you peace of mind and confidence in your decision.
              </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-full bg-[#E54E3D] px-4 sm:px-8 py-2 sm:py-4 text-xs sm:text-lg font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#D43E2D] hover:shadow-xl"
                >
                <span>Book An Inspection</span>
                <span className="text-xl sm:text-2xl">↗</span>
                </button>
              <button className="hidden sm:inline-flex px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white border-2 border-gray-400 rounded-lg hover:border-gray-300 transition-all text-sm sm:text-lg font-semibold">
                  Learn More
                </button>
              </div>
            </div>

          <div className="hidden lg:flex justify-center lg:justify-end">
            <figure className="relative flex w-full max-w-[500px] items-center justify-center overflow-hidden rounded-3xl p-0 lg:-mt-[1.25rem]">
              <img
                src="/images/hero-vehicle.png"
                alt="Certified mechanic inspecting a vehicle"
                className="h-[580px] w-full rounded-3xl object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* Our Inspection Services Section */}
      <section id="features" className="relative bg-white px-[15%] pt-[40px] pb-20 sm:pt-[40px] sm:pb-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#fdf5f3] via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-y-10 left-10 hidden w-32 rounded-full bg-gradient-to-b from-[#fde8e2] via-transparent to-transparent blur-xl sm:block" />
        <div className="pointer-events-none absolute inset-y-24 right-6 hidden w-40 rounded-full bg-gradient-to-t from-[#fde0d6] via-transparent to-transparent blur-2xl lg:block" />
        <div className="mx-auto max-w-7xl relative">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight text-[#0f172a]">
                Our <span className="text-[#E54E3D]">Inspection</span> <span className="text-[#E54E3D]">Services</span>
              </h2>
          </div>

          <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div className="relative hidden lg:block">
              <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-tr from-[#0f172a] via-[#1f2937] to-[#0ea5e9] p-1 shadow-2xl">
                <div className="h-[520px] w-full rounded-[2.3rem] bg-cover bg-center" style={{ backgroundImage: "url('/images/service-driver.png')" }} />
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-transparent via-[#0ea5e9]/15 to-[#0f172a]/70 mix-blend-screen" />
              </div>
            </div>

            <div>
              <div className="mb-5 text-left">
                <p className="text-[0.95rem] sm:text-[1.02rem] leading-[1.6] text-[#3a4a61]">
                  Choose the package that gives you the confidence to move forward. From foundational safety checks to full-spectrum diagnostics, our inspectors deliver actionable insights within 24 hours.
                </p>
              </div>

              <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
                {[
                  {
                    title: 'Standard Inspection',
                    desc: '50+ point checklist with HD photos, severity tags, and repair estimates.',
                    accent: 'from-[#E54E3D]/10 via-white to-white',
                    href: '/services/standard-inspection',
                    Icon: (
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 11h14l-1.2-3.6a2 2 0 0 0-1.9-1.4H8.1a2 2 0 0 0-1.9 1.4L5 11Zm0 0-1.5 4.5A2 2 0 0 0 5.4 18H18.6a2 2 0 0 0 1.9-1.5L20 11m-9 7h2" />
                      </svg>
                    ),
                  },
                  {
                    title: 'Enhanced Inspection',
                    desc: 'Adds scan-tool diagnostics, fluid analysis, and underbody evaluation.',
                    accent: 'from-[#0ea5e9]/10 via-white to-white',
                    href: '/services/enhanced-inspection',
                    Icon: (
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
                        <circle cx="11" cy="11" r="6" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="m20 20-3.5-3.5" />
                      </svg>
                    ),
                  },
                  {
                    title: 'Full-Spectrum',
                    desc: '100+ points with compression testing, paint depth mapping, and negotiation playbook.',
                    accent: 'from-[#22c55e]/10 via-white to-white',
                    href: '/services/full-spectrum-inspection',
                    Icon: (
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
                      </svg>
                    ),
                  },
                  {
                    title: 'Routine Check-Up',
                    desc: 'Mobile maintenance visit for brakes, tires, battery, and predictive wear insights.',
                    accent: 'from-[#f59e0b]/10 via-white to-white',
                    href: '/services/routine-check-up',
                    Icon: (
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M6 3h12m-8 14v4m-4-4v4m8-4v4m4-4v4M6 7l.5 10.5a1.5 1.5 0 0 0 1.5 1.4h7a1.5 1.5 0 0 0 1.5-1.4L18 7" />
                      </svg>
                    ),
                  },
                ].map((feature) => (
                  <div
                    key={feature.title}
                    className="group relative overflow-hidden rounded-2xl bg-white/95 p-4 sm:p-5 shadow ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-[#ef7b57] hover:text-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#E54E3D]/20 text-lg text-[#E54E3D] group-hover:bg-white/20 group-hover:text-white">
                        {feature.Icon}
                      </div>
                      <h3 className="text-[1.05rem] sm:text-lg font-bold text-[#1F1F1F] group-hover:text-white">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-[0.85rem] sm:text-[0.92rem] leading-relaxed text-[#4a4f5a] group-hover:text-white/85">
                      {feature.desc}
                    </p>
                    {feature.href ? (
                      <Link
                        href={feature.href}
                        className="mt-4 inline-flex items-center gap-1.5 text-[0.7rem] font-semibold text-[#E54E3D] transition group-hover:text-white group-hover:gap-2.5"
                      >
                        Explore details
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </Link>
                    ) : (
                      <button className="mt-4 inline-flex items-center gap-1.5 text-[0.7rem] font-semibold text-[#E54E3D] transition group-hover:text-white group-hover:gap-2.5">
                        Explore details
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative overflow-hidden bg-[#f3f5f9] px-[15%] pt-[40px] pb-16 sm:pt-[40px] sm:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,78,61,0.12),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.12),transparent_50%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_45%)]" />
        <div className="pointer-events-none absolute -left-56 top-[-6rem] hidden h-[640px] w-[360px] lg:block">
          <div className="hero-wave" />
        </div>
        <div className="pointer-events-none absolute -right-56 bottom-[-6rem] hidden h-[640px] w-[360px] lg:block">
          <div className="hero-wave rotate-180" />
        </div>
        <div className="mx-auto max-w-6xl relative">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight text-[#0f172a]">
                How <span className="text-[#E54E3D]">It Works</span> 
              </h2>
            <p className="mt-4 text-lg sm:text-xl leading-relaxed text-[#3a4a61] max-w-2xl mx-auto">
              A guided journey from first click to final report—so you always know what happens next.
              </p>
            </div>

          <div className="relative flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-center">
            <div className="flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:justify-between">
              {[{
                title: 'Book Online',
                desc: 'Tell us about the vehicle, choose a time, and confirm with one tap.',
                icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="4" width="18" height="16" rx="4" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 2v4M16 2v4M7 10h10" />
                  </svg>
                ),
                badge: 'linear-gradient(135deg, #fce6df 0%, #f8bba7 100%)',
              },
              {
                title: 'We Coordinate',
                desc: 'We liaise with the seller or dealership and lock in logistics for you.',
                icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h.01M12 7h.01M16 7h.01M5 11h14M5 15h10M16.5 21 21 16.5m0 0H17m4 0v4" />
                  </svg>
                ),
                badge: 'linear-gradient(135deg, #fcd9d0 0%, #f59a7d 100%)',
              },
              {
                title: 'On-Site Inspection',
                desc: 'Certified inspectors arrive with scan tools, diagnostics, and a checklist of 100+ data points.',
                icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                ),
                badge: 'linear-gradient(135deg, #f9cfc2 0%, #ee7a52 100%)',
              },
              {
                title: 'Interactive Report',
                desc: 'Receive photos, severity tags, repair estimates, and negotiation tips within 24 hours.',
                icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16M4 10h8m-8 5h16m-16 5h10" />
                    <rect x="3" y="3" width="18" height="18" rx="4" />
                  </svg>
                ),
                badge: 'linear-gradient(135deg, #f5c1af 0%, #e54e3d 100%)',
              }].map((step, index) => (
                <div key={step.title} className="relative flex w-full max-w-[230px] flex-col items-center text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full text-white text-lg font-bold shadow-lg"
                      style={{ background: step.badge }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-[#E54E3D]">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E54E3D]/10">{step.icon}</span>
                      <h3 className="text-base sm:text-lg font-bold text-[#152032]">{step.title}</h3>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-center pb-10 lg:pb-0">
                    <div className="flex h-[180px] w-[180px] items-center justify-center rounded-full bg-white/95 p-6 text-center shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                      <p className="text-sm sm:text-base leading-relaxed text-[#5c6574]">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative overflow-hidden bg-white px-[15%] pt-[40px] pb-20 sm:pt-[40px] sm:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,78,61,0.14),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(249,115,98,0.12),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(252,165,143,0.12),transparent_60%)]" />
        <div className="mx-auto max-w-6xl relative">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight text-[#0f172a]">
                Our <span className="text-[#E54E3D]">Pricing</span> 
              </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#3a4a61] max-w-2xl mx-auto">
                Transparent and competitive pricing for our professional inspection services.
              </p>
            </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[{
              name: 'Standard',
              price: '$150',
              accent: 'from-[#E54E3D] via-[#f97362] to-[#E54E3D]',
              border: 'border-[#fbd1ca]',
              shadow: 'shadow-[#e54e3d]/18',
              badge: null,
              button: 'bg-[#E54E3D] text-white hover:bg-[#d14130]',
              features: ['50+ Point Inspection', 'Detailed Report', 'Professional Mechanic', "Service at Seller's Location"],
            },
            {
              name: 'Enhanced',
              price: '$200',
              accent: 'from-[#0f172a] via-[#1f2937] to-[#0f172a]',
              border: 'border-[#0f172a]/40',
              shadow: 'shadow-[#0f172a]/20',
              badge: 'MOST POPULAR',
              button: 'bg-[#E54E3D] text-white hover:bg-[#d14130]',
              features: ['75+ Point Inspection', 'Comprehensive Report', 'Professional Mechanic', "Service at Seller's Location"],
            },
            {
              name: 'Full-Spectrum',
              price: '$300',
              accent: 'from-[#0ea5e9] via-[#38bdf8] to-[#2563eb]',
              border: 'border-[#bae6fd]',
              shadow: 'shadow-[#0ea5e9]/20',
              badge: null,
              button: 'bg-[#0ea5e9] text-white hover:bg-[#0284c7]',
              features: ['100+ Point Inspection', 'Elite Detailed Report', 'Professional Mechanic', "Service at Seller's Location"],
            },
            {
              name: 'Routine Check-Up',
              price: '$100',
              accent: 'from-[#16a34a] via-[#22c55e] to-[#16a34a]',
              border: 'border-[#bbf7d0]',
              shadow: 'shadow-[#16a34a]/18',
              badge: null,
              button: 'bg-[#16a34a] text-white hover:bg-[#15803d]',
              features: ['Multi-Point Inspection', 'Fluid Levels Check', 'Tire & Brake Assessment', 'Battery Health Evaluation'],
            }].map((plan) => (
              <article
                key={plan.name}
                className={`group relative flex flex-col rounded-3xl border ${plan.border} bg-white/95 p-8 shadow-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl ${plan.shadow}`}
              >
                {plan.badge && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#E54E3D] px-5 py-1 text-xs font-semibold tracking-[0.32em] uppercase text-white shadow-lg">
                    {plan.badge}
                  </span>
                )}

                <header className="flex flex-col items-center gap-5 text-center">
                  <div className={`relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br ${plan.accent} shadow-inner shadow-black/10`}>
                    <div className="flex h-[92px] w-[92px] items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                      <span className="text-3xl font-extrabold tracking-tight text-white">{plan.price}</span>
                </div>
              </div>
                  <h3 className="text-xl font-bold text-[#152032]">{plan.name}</h3>
                </header>

                <ul className="mt-6 flex-1 space-y-4 text-left">
                  {plan.features.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-[#3f4756]">
                      <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#E54E3D]/10 text-[#E54E3D]">
                        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-7.071 7.071a1 1 0 0 1-1.414 0L5.293 11.95a1 1 0 1 1 1.414-1.414l1.828 1.829 6.364-6.364a1 1 0 0 1 1.414 0Z" clipRule="evenodd" />
                      </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                  </ul>

                <button className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-all ${plan.button}`}>
                  Book Now
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                      </svg>
                  </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative overflow-hidden bg-[#f7f9fc] px-[15%] pt-[40px] pb-20 sm:pt-[40px] sm:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,78,61,0.12),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_55%),radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_60%)]" />
        <div className="pointer-events-none absolute -left-40 top-[-5rem] hidden h-[520px] w-[280px] lg:block">
          <div className="hero-wave" />
        </div>
        <div className="pointer-events-none absolute -right-40 bottom-[-5rem] hidden h-[520px] w-[280px] lg:block">
          <div className="hero-wave rotate-180" />
        </div>

        <div className="mx-auto max-w-6xl relative">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight text-[#0f172a]">
                What <span className="text-[#E54E3D]">Our Customers Say</span> 
              </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#3a4a61] max-w-2xl mx-auto">
                Don't just take our word for it. Here's what some of our satisfied customers have to say about our services.
              </p>
            </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[{
              quote: 'CheckMyRide saved me from buying a car with hidden transmission issues. The inspection was thorough and the mechanic explained everything clearly. Worth every penny!',
              name: 'Michael Johnson',
              location: 'Toronto, ON',
            },
            {
              quote: "The convenience of having someone go to the seller's location made the whole process so easy. Professional service and detailed report helped me negotiate a better price.",
              name: 'Sarah Williams',
              location: 'Vancouver, BC',
            },
            {
              quote: "As someone who knows nothing about cars, CheckMyRide gave me the confidence to make my purchase. Their inspector was knowledgeable and patient with all my questions.",
              name: 'David Chen',
              location: 'Calgary, AB',
            }].map((testimonial) => (
              <article
                key={testimonial.name}
                className="group relative flex h-full flex-col rounded-3xl border border-white/60 bg-white/95 p-8 shadow-xl shadow-slate-300/40 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:border-[#E54E3D]/40"
              >
                <div className="absolute -top-10 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-[#E54E3D] text-white shadow-xl shadow-[#E54E3D]/30">
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h3.983v10h-9.983z" />
                  </svg>
              </div>

                <p className="mt-10 text-sm sm:text-base leading-relaxed text-[#132032]/90">“{testimonial.quote}”</p>

                <footer className="mt-8 border-t border-white/60 pt-6">
                  <p className="text-lg font-semibold text-[#152032]">{testimonial.name}</p>
                  <p className="text-sm text-[#5c6574]">{testimonial.location}</p>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#E54E3D]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#E54E3D]">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd" />
                    </svg>
                    Verified Inspection
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="relative overflow-hidden bg-[#0f172a] px-[15%] py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,78,61,0.22),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(249,115,98,0.18),transparent_60%),radial-gradient(circle_at_center,rgba(252,165,143,0.14),transparent_65%)]" />
        <div className="pointer-events-none absolute -left-32 top-[-6rem] hidden h-[520px] w-[320px] lg:block">
          <div className="hero-wave" />
        </div>
        <div className="pointer-events-none absolute -right-32 bottom-[-6rem] hidden h-[520px] w-[320px] lg:block">
          <div className="hero-wave rotate-180" />
        </div>

        <div className="mx-auto max-w-5xl relative text-center text-white">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
            Instant Booking
          </span>
          <h2 className="mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] font-bold leading-tight">
            Ready to Inspect Your Next Ride?
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-white/85 max-w-2xl mx-auto">
            Don't take chances with one of the biggest purchases you'll make. Let our experts inspect the vehicle and give you peace of mind.
          </p>

          <div className="mt-10 flex items-center justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-10 py-4 text-sm sm:text-base font-bold uppercase tracking-wide text-[#E54E3D] shadow-lg shadow-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-[#f8f9ff]"
            >
              Book an Inspection Now
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}


