'use client';

import Link from 'next/link';
import SiteFooter from '../../components/layout/SiteFooter';
import SiteHeader from '../../components/layout/SiteHeader';

const targetAudience = [
  'Current vehicle owners focused on upkeep (not pre-purchase)',
  'Drivers preparing for long road trips or seasonal changes',
  'Vehicles approaching major service intervals',
  'Owners who suspect unusual noises, vibrations, or behaviors',
  'Drivers seeking peace of mind about their vehicle’s current health',
];

const deliverables = [
  'Maintenance-oriented digital inspection report',
  'Ratings for each inspected system with wear projections',
  'Summary of technician notes, photos, and action steps',
  'Prioritized recommendations for repairs and preventive service',
];

const inclusionSections = [
  {
    title: 'Essential Fluid Service',
    description:
      'We check and top off engine oil, coolant, brake fluid, power steering fluid (if equipped), and windshield washer fluid—flagging contamination or low levels that signal emerging issues.',
  },
  {
    title: 'Tire Health Assessment',
    description:
      'Pressure is set to manufacturer specification while tread depth, sidewalls, and wear patterns are reviewed for alignment or suspension red flags.',
  },
  {
    title: 'Computer Diagnostics',
    description:
      'OBD-II scan, warning light verification, and sensor health review ensure subsystems are communicating properly and no silent faults exist.',
  },
  {
    title: 'Customer Concerns Deep-Dive',
    description:
      'Technicians prioritize your reported symptoms, reproduce issues when possible, and provide honest guidance on urgency, costs, and repair sequencing.',
  },
];

const fluidChecklist = [
  'Engine oil level and condition snapshot',
  'Coolant level and protection rating',
  'Brake fluid moisture and level check',
  'Power steering fluid (if applicable)',
  'Windshield washer fluid top-off',
];

const diagnosticsChecklist = [
  'OBD-II code scan and interpretation',
  'Warning light status review and reset (if resolved)',
  'Sensor data validation for core systems',
];

const customerCareChecklist = [
  'Document your specific concerns or noises',
  'Targeted inspection of requested components',
  'Clear guidance on urgency vs. monitor items',
  'Repair prioritization and cost expectations',
];

const valueHighlights = [
  'Ideal for owners who want to prevent surprise breakdowns',
  'Pairs well with upcoming road trips or seasonal weather shifts',
  'At $100, it routinely saves hundreds by catching issues early',
];

export default function RoutineCheckUpPage() {
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
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0f172a] px-[10%] pt-14 pb-16 sm:pt-16 sm:pb-20">
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
            Routine Check-Up • $100
          </span>
          <h1 className="mt-6 text-3xl sm:text-4xl lg:text-[2.9rem] font-bold leading-tight text-white">
            Keep Your Vehicle Road-Ready Every Week
          </h1>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white shadow-lg shadow-black/20 ring-1 ring-white/30">
            Inspection Duration: 30-45 Minutes
          </div>
          <p className="mt-5 text-lg sm:text-xl leading-relaxed text-white/80">
            The Routine Check-Up is designed specifically for current vehicle owners who want to maintain their vehicle&apos;s health and catch potential problems early. This maintenance-focused inspection combines fluid testing, targeted diagnostics, and technician consultation so you stay ahead of wear, avoid unexpected breakdowns, and plan repairs on your schedule.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/book-appointment?service=routine#booking-form"
              className="group inline-flex items-center gap-3 rounded-full bg-[#E54E3D] px-8 py-4 text-base font-semibold uppercase tracking-wide text-white shadow-lg shadow-[#E54E3D]/40 transition-all hover:-translate-y-0.5 hover:bg-[#d14130]"
            >
              Book This Inspection
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </Link>
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

      {/* Audience + Overview */}
      <section className="relative px-[10%] py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#fef4f1] via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-[#1b2136] via-[#141b32] to-[#2c1f33] p-10 text-white shadow-2xl shadow-[#0f172a]/35">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,113,96,0.22),transparent_60%)]" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/70 shadow-inner shadow-black/25">
                  Audience Fit
                </span>
                <h3 className="mt-4 text-2xl font-semibold text-white">Who It&apos;s For</h3>
                <p className="mt-3 text-sm text-white/70">
                  Tailored for owners who want proactive maintenance insight instead of reactive repairs.
                </p>
                <ul className="mt-8 space-y-4 text-sm sm:text-base leading-relaxed text-white/85">
                  {targetAudience.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-sm text-xs font-semibold text-[#FCD34D] shadow-inner shadow-black/25">
                        <svg className="h-3.5 w-3.5 text-[#FCD34D]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M8.5 13.38 5.53 10.4l-.71.7 3.68 3.68 6.89-6.9-.71-.7Z" />
                        </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2.25rem] border border-[#dbe4ff] bg-gradient-to-br from-white via-[#f7f8ff] to-white p-10 shadow-xl shadow-[#c7d2fe]/45">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(15,23,42,0.08),transparent_60%)]" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#eef2ff] px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#4c5d81] shadow-inner shadow-white">
                  What You Can Expect
                </span>
                <h3 className="mt-4 text-2xl font-semibold text-[#0f172a]">Maintenance clarity, not guesswork</h3>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#3f4756]">
                  We handle fluids, tires, diagnostics, and your personal concerns in one focused visit—so you can drive with confidence and plan repairs on your own schedule.
                </p>
                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.35em] text-[#2f3f63]">
                  Rapid turnaround with digital report in six hours or less.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2.25rem] border border-[#fde2db] bg-gradient-to-br from-[#fff1ec] via-[#fff7f4] to-white p-10 shadow-xl shadow-[#f8d8cf]/45">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,78,61,0.16),transparent_60%)]" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#fee4db] px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E54E3D] shadow-inner shadow-white/60">
                  Deliverables
                </span>
                <h3 className="mt-4 text-2xl font-semibold text-[#0f172a]">What You Receive</h3>
                <p className="mt-3 text-sm text-[#3f4756]">
                  Maintenance-oriented reporting, annotated media, and prioritized guidance tailored to everyday ownership.
                </p>
                <ul className="mt-8 space-y-4 text-sm sm:text-base leading-relaxed text-[#3f4756]">
                  {deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#E54E3D]/12 text-xs font-semibold text-[#E54E3D] shadow-inner shadow-[#fcd8ce]/45">
                        <svg className="h-3.5 w-3.5 text-[#E54E3D]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M8.5 13.38 5.53 10.4l-.71.7 3.68 3.68 6.89-6.9-.71-.7Z" />
                        </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What&apos;s Included */}
      <section className="relative bg-[#f9fbff] px-[10%] py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(229,78,61,0.08),transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-[#0f172a]">
              What&apos;s <span className="text-[#E54E3D]">Included</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#3a4a61]">
              Preventative touchpoints that keep you ahead of major service or costly surprises.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {inclusionSections.map((item) => (
              <div key={item.title} className="relative overflow-hidden rounded-3xl bg-white p-7 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,23,42,0.08),transparent_60%)]" />
                <div className="relative">
                  <h3 className="text-lg font-semibold text-[#0f172a]">{item.title}</h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#3f4756]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Care Modules */}
      <section className="relative px-[10%] py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E54E3D]/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#E54E3D]">
              Maintenance Deep-Dive
            </span>
            <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-[#0f172a]">
              Focused checklists for everyday reliability
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#3a4a61]">
              Each module zeroes in on the areas owners care about most—from fluids to diagnostics to your personal concerns.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <div className="relative overflow-hidden rounded-[2rem] bg-[#0f172a] p-9 text-white shadow-2xl shadow-[#0f172a]/35">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(94,146,255,0.22),transparent_60%)]" />
              <div className="relative">
                <h3 className="text-xl font-semibold text-white">Fluid Essentials</h3>
                <ul className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-white/85">
                  {fluidChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#F97362]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-[#dbe4ff] bg-gradient-to-br from-white via-[#f8f9ff] to-white p-9 shadow-xl shadow-[#c7d2fe]/45">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,23,42,0.08),transparent_60%)]" />
              <div className="relative">
                <h3 className="text-xl font-semibold text-[#0f172a]">Diagnostic Snapshot</h3>
                <ul className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-[#3f4756]">
                  {diagnosticsChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#2c4fb3]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-[#fde1da] bg-gradient-to-br from-[#fff4f1] via-white to-[#fff8f4] p-9 shadow-xl shadow-[#f8d8cf]/45">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(229,78,61,0.14),transparent_60%)]" />
              <div className="relative">
                <h3 className="text-xl font-semibold text-[#0f172a]">Your Concerns Prioritized</h3>
                <p className="mt-3 text-sm text-[#3f4756]">
                  We listen first, diagnose second—so you leave with answers to the issues that matter most to you.
                </p>
                <ul className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-[#3f4756]">
                  {customerCareChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#E54E3D]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose + CTA */}
      <section className="relative px-[10%] py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative overflow-hidden rounded-[2rem] border border-[#fde1da] bg-gradient-to-br from-[#fff4f1] via-white to-[#fff9f6] p-10 shadow-xl shadow-[#f8d8cf]/45">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,98,0.12),transparent_60%)]" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E54E3D]">
                  Why Drivers Choose Routine
                </span>
                <h3 className="mt-4 text-2xl font-semibold text-[#0f172a]">Peace of mind between service intervals</h3>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#3a4a61]">
                  Regular check-ups help you avoid expensive surprises by catching small problems early. Many owners recover the $100 investment in a single visit—and enjoy worry-free road trips knowing every system has been reviewed.
                </p>
                <ul className="mt-8 space-y-4 text-sm sm:text-base leading-relaxed text-[#3f4756]">
                  {valueHighlights.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#E54E3D]/12 text-xs font-semibold text-[#E54E3D] shadow-inner shadow-[#fcd8ce]/45">
                        <svg className="h-3.5 w-3.5 text-[#E54E3D]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M8.5 13.38 5.53 10.4l-.71.7 3.68 3.68 6.89-6.9-.71-.7Z" />
                        </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-[#0f172a] p-10 text-white shadow-2xl shadow-[#0f172a]/35">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(94,146,255,0.25),transparent_60%)]" />
              <div className="relative flex h-full flex-col">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/70">
                  Ready for Your Next Drive
                </span>
                <h3 className="mt-4 text-2xl font-semibold leading-snug text-white">Reserve your Routine Check-Up visit</h3>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/80">
                  Schedule a technician at your location, confirm your vehicle’s health, and get back on the road with confidence in under an hour.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <div className="rounded-2xl bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/80 ring-1 ring-white/20">
                    Investment $100
                  </div>
                  <div className="rounded-2xl bg-[#E54E3D] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-white shadow-lg shadow-[#E54E3D]/40">
                    Report Ready in 6 Hours
                  </div>
                </div>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link
                    href="/book-appointment?service=routine#booking-form"
                    className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-[#E54E3D] shadow-lg shadow-white/30 transition-all hover:-translate-y-0.5 hover:bg-[#f9f5f3]"
                  >
                    Book Now
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m13 6 6 6-6 6" />
                    </svg>
                  </Link>
                  <Link
                    href="/#pricing"
                    className="inline-flex items-center justify-center gap-3 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-all hover:-translate-y-0.5 hover:border-white"
                  >
                    View Pricing
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m13 6 6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Summary */}
      <section className="relative px-[10%] pt-16 pb-16 sm:pt-20 sm:pb-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#f7f9fc] via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl rounded-3xl bg-white p-0 shadow-lg shadow-slate-200/50 ring-1 ring-[#dbe4ff]">
          <div className="rounded-t-3xl bg-[#1f3a8a] px-6 py-6 text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-wide">Comparison Summary</h2>
            <p className="mt-2 text-sm sm:text-base text-white/80">Choosing the Right Inspection</p>
          </div>

          <div className="px-6 py-6">
            <table className="w-full border-collapse text-sm sm:text-base">
              <thead>
                <tr className="bg-white text-[#1f2a37]">
                  {['Package', 'Price', 'Best For', 'Duration'].map((heading) => (
                    <th key={heading} className="border border-[#c7d2fe] px-4 py-3 font-semibold uppercase tracking-wide">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[{
                  name: 'Standard',
                  price: '$150',
                  bestFor: 'Newer vehicles under 5 years, lower mileage',
                  duration: '45-60 min',
                  highlight: true,
                }, {
                  name: 'Enhanced',
                  price: '$200',
                  bestFor: 'Vehicles 5-10 years old, includes diagnostics (Most Popular)',
                  duration: '60-90 min',
                }, {
                  name: 'Full-Spectrum',
                  price: '$300',
                  bestFor: 'High-value or older vehicles, includes negotiation help',
                  duration: '90-120 min',
                  highlight: true,
                }, {
                  name: 'Routine Check-Up',
                  price: '$100',
                  bestFor: 'Current owners wanting maintenance assessment',
                  duration: '30-45 min',
                  highlight: true,
                }].map((row) => (
                  <tr key={row.name} className={row.highlight ? 'bg-[#f1f6ff]' : 'bg-white'}>
                    <td className="border border-[#c7d2fe] px-4 py-4 font-semibold text-[#152032]">{row.name}</td>
                    <td className="border border-[#c7d2fe] px-4 py-4 text-[#152032]">{row.price}</td>
                    <td className="border border-[#c7d2fe] px-4 py-4 text-[#3f4756]">{row.bestFor}</td>
                    <td className="border border-[#c7d2fe] px-4 py-4 text-[#3f4756]">{row.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 rounded-2xl bg-[#0f172a] px-5 py-4 text-center text-sm sm:text-base font-semibold text-white shadow-lg shadow-[#0f172a]/30">
              Still not sure? Call us at <a href="tel:6139815498" className="underline decoration-white/60 underline-offset-4 transition hover:decoration-white">(613) 981-5498</a> and we’ll help you choose the inspection package that fits best.
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
