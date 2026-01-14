'use client';

import Link from 'next/link';
import SiteFooter from '../../components/layout/SiteFooter';
import SiteHeader from '../../components/layout/SiteHeader';

const targetAudience = [
  'Buyers considering vehicles with 80,000-150,000 km',
  'Vehicles that are 5-10 years old',
  'Buyers who want diagnostic computer scanning included',
  'Vehicles with potential electrical or engine concerns',
  'Buyers making a significant financial investment',
  'Drivers who want our most popular, comprehensive option',
];

const deliverables = [
  'Comprehensive digital inspection report with findings',
  'Ratings for each inspected component',
  'Summary of inspector notes and comments',
  'Recommendations for your purchase decision',
];

const inclusionSections = [
  {
    title: 'Advanced Body Inspection',
    description:
      'Beyond surface checks, we analyze paint finish consistency and look for subtle signs of bodywork that can reveal undisclosed collision repairs.',
  },
  {
    title: 'Comprehensive Undercarriage Examination',
    description:
      'We perform a deep review of the chassis for rust, cracks, or damage. Exhaust components receive enhanced scrutiny for leaks, corrosion, and abnormal noise.',
  },
  {
    title: 'Expanded Fluid Inspection',
    description:
      'In addition to standard fluids, we inspect transmission fluid level and condition—an essential indicator of transmission health and service history.',
  },
  {
    title: 'Belts & Hoses Inspection',
    description:
      'All accessible drive belts are checked for cracks or fraying while hoses are examined for swelling, leaks, or deterioration that could lead to breakdowns.',
  },
  {
    title: 'Extended Test Drive',
    description:
      'A minimum five-mile evaluation across city and highway speeds measures acceleration smoothness, shift points, braking performance, and NVH characteristics.',
  },
];

const diagnosticUpgrades = [
  {
    title: 'OBD-II Computer Scan',
    description:
      'We interrogate the onboard diagnostic system to capture current and pending trouble codes—surfacing emissions, sensor, or powertrain issues before lights appear.',
  },
  {
    title: 'Battery Load Test',
    description:
      'A professional load test reveals the battery’s true condition and remaining lifespan, not just whether it starts the vehicle today.',
  },
  {
    title: 'Alternator Output Test',
    description:
      'We verify the alternator is charging at the correct voltage under load to prevent unexpected no-start or electrical failures.',
  },
  {
    title: 'Cooling System Pressure Test',
    description:
      'Pressurization checks for hidden leaks within the cooling system that can lead to overheating or major repairs if left undiscovered.',
  },
];

const valueHighlights = [
  'Popular choice for vehicles sitting in the 5-10 year, 80-150k km sweet spot',
  'Diagnostic testing exposes electrical and emissions issues invisible to the eye',
  'Balances depth and value—chosen by 65% of customers for added peace of mind',
];

export default function EnhancedInspectionPage() {
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
            Enhanced Inspection • $200
          </span>
          <h1 className="mt-6 text-3xl sm:text-4xl lg:text-[2.9rem] font-bold leading-tight text-white">
            Comprehensive Diagnostics Before You Commit
          </h1>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white shadow-lg shadow-black/20 ring-1 ring-white/30">
            Inspection Duration: 60-90 Minutes
          </div>
          <p className="mt-5 text-lg sm:text-xl leading-relaxed text-white/80">
            The Enhanced Inspection is our most popular package, ideal for vehicles five to ten years old or with moderate mileage. With a 75+ point assessment and advanced diagnostics, it provides the extra assurance you need before making a significant investment.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/book-appointment?service=enhanced#booking-form"
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
            <div className="relative overflow-hidden rounded-[2rem] bg-[#0f172a] p-10 text-white shadow-2xl shadow-[#0f172a]/30">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,113,96,0.28),transparent_55%)]" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/70">
                  Audience Fit
                </span>
                <h3 className="mt-4 text-2xl font-semibold text-white">Who It&apos;s For</h3>
                <p className="mt-3 text-sm text-white/70">
                  Tailor-made for shoppers evaluating more seasoned vehicles or those with emerging electronic concerns.
                </p>
                <ul className="mt-8 space-y-4 text-sm sm:text-base leading-relaxed text-white/90">
                  {targetAudience.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/15 text-xs font-semibold text-[#FCD34D] shadow-inner shadow-black/20">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M8.5 13.38 5.53 10.4l-.71.7 3.68 3.68 6.89-6.9-.71-.7Z" />
                        </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-[#dbe4ff] bg-white p-10 shadow-xl shadow-[#c7d2fe]/40">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(15,23,42,0.08),transparent_60%)]" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#f3f6ff] px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#4c5d81]">
                  What You Can Expect
                </span>
                <h3 className="mt-4 text-2xl font-semibold text-[#0f172a]">Depth that goes beyond visual checks</h3>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#3f4756]">
                  Expect an expanded appointment that explores drivability, electronics, and component wear more thoroughly than the Standard package. Findings are prioritized so you know where to negotiate or walk away.
                </p>
                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.35em] text-[#39496b]">
                  Rapid turnaround with digital report in six hours or less.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-[#fde2db] bg-gradient-to-br from-[#fff4f1] via-white to-[#fffafa] p-10 shadow-xl shadow-[#f8d8cf]/45">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,78,61,0.14),transparent_60%)]" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E54E3D]">
                  Deliverables
                </span>
                <h3 className="mt-4 text-2xl font-semibold text-[#0f172a]">What You Receive</h3>
                <p className="mt-3 text-sm text-[#3f4756]">
                  Every conclusion is backed by evidence—photos, diagnostic snapshots, and technician commentary.
                </p>
                <ul className="mt-8 space-y-4 text-sm sm:text-base leading-relaxed text-[#3f4756]">
                  {deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#E54E3D]/10 text-xs font-semibold text-[#E54E3D] shadow-inner shadow-[#fcd8ce]/50">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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

      {/* What's Included */}
      <section className="relative bg-[#f9fbff] px-[10%] py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(229,78,61,0.08),transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-[#0f172a]">
              Everything from Standard <span className="text-[#E54E3D]">Plus</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#3a4a61]">
              Enhanced coverage that digs deeper into structural integrity, fluids, and on-road performance before you finalize the deal.
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

      {/* Diagnostic Testing */}
      <section className="relative px-[10%] py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E54E3D]/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#E54E3D]">
              Diagnostic Testing • The Enhanced Difference
            </span>
            <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-[#0f172a]">
              Data-backed insights before you sign
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#3a4a61]">
              Advanced tests surface hidden electrical, cooling, and powertrain issues that traditional visual inspections can miss.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {diagnosticUpgrades.map((item) => (
              <div key={item.title} className="relative overflow-hidden rounded-3xl bg-[#0f172a] p-7 text-white shadow-2xl shadow-[#0f172a]/30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(94,146,255,0.22),transparent_60%)]" />
                <div className="relative">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/80">{item.description}</p>
                </div>
              </div>
            ))}
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
                  Why Buyers Choose Enhanced
                </span>
                <h3 className="mt-4 text-2xl font-semibold text-[#0f172a]">Best value for deep diagnostics</h3>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#3a4a61]">
                  The Enhanced Inspection’s diagnostic suite can save thousands by revealing engine, transmission, or emissions issues you can’t spot visually. More than 65% of our customers select this package for the extra assurance.
                </p>
                <ul className="mt-8 space-y-4 text-sm sm:text-base leading-relaxed text-[#3f4756]">
                  {valueHighlights.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#E54E3D]/10 text-xs font-semibold text-[#E54E3D] shadow-inner shadow-[#fcd8ce]/40">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
                  Ready to Upgrade
                </span>
                <h3 className="mt-4 text-2xl font-semibold leading-snug text-white">Reserve your Enhanced Inspection window</h3>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/80">
                  Coordinate timing with the seller, capture advanced diagnostics, and receive actionable insights within hours.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <div className="rounded-2xl bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/80 ring-1 ring-white/20">
                    Investment $200
                  </div>
                  <div className="rounded-2xl bg-[#E54E3D] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-white shadow-lg shadow-[#E54E3D]/40">
                    Report Ready in 6 Hours
                  </div>
                </div>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link
                    href="/book-appointment?service=enhanced#booking-form"
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
                  price: '$180',
                  bestFor: 'Newer vehicles under 5 years, lower mileage',
                  duration: '45-60 min',
                  highlight: true,
                }, {
                  name: 'Enhanced',
                  price: '$200',
                  bestFor: 'Vehicles 5-10 years old, includes diagnostics (Most Popular)',
                  duration: '60-90 min',
                  highlight: true,
                }, {
                  name: 'Full-Spectrum',
                  price: '$300',
                  bestFor: 'High-value or older vehicles, includes negotiation help',
                  duration: '90-120 min',
                  highlight: true,
                }, {
                  name: 'Routine Check-Up',
                  price: '$120',
                  bestFor: 'Current owners wanting maintenance assessment',
                  duration: '30-45 min',
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
