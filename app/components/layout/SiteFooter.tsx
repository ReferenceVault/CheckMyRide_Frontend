'use client';

import Link from 'next/link';

const serviceLinks = [
  { label: 'Standard Inspection', href: '/services/standard-inspection' },
  { label: 'Enhanced Inspection', href: '/services/enhanced-inspection' },
  { label: 'Full-Spectrum Inspection', href: '/services/full-spectrum-inspection' },
  { label: 'Routine Check-Up', href: '/services/routine-check-up' },
  { label: 'Pricing', href: '/#pricing' },
];

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Join Our Team', href: '/careers' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
];

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#f7f9fc] text-[#152032]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,78,61,0.12),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_55%),radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute -left-40 top-[-5rem] hidden h-[520px] w-[280px] lg:block">
        <div className="hero-wave" />
      </div>
      <div className="pointer-events-none absolute -right-40 bottom-[-5rem] hidden h-[520px] w-[280px] lg:block">
        <div className="hero-wave rotate-180" />
      </div>

      <div className="relative px-[15%] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <div>
              <Link href="/" className="inline-flex items-center">
                <div className="relative flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16">
                  <img src="/images/logo.png" alt="CheckMyRide" className="h-full w-full object-contain" />
                </div>
                <span className="ml-1 text-2xl font-bold tracking-tight text-[#152032]">
                  Check<span className="text-[#E54E3D]">MyRide</span>
                </span>
              </Link>
              <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#E54E3D] to-[#f97362]" />
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-[#4a5568]">
              Professional pre-purchase vehicle inspection services across Canada. Our experts help you make informed decisions and avoid costly mistakes.
            </p>
            <div className="flex gap-3">
              {[
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
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-[#E54E3D]/25 bg-white text-[#E54E3D] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#E54E3D] hover:text-white"
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold tracking-wide text-[#0f172a]">Services</h3>
              <div className="mt-3 h-1 w-12 rounded-full bg-[#E54E3D]" />
            </div>
            <ul className="space-y-3 text-sm sm:text-base text-[#3f4756]">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link className="inline-flex items-center gap-2 transition-all hover:text-[#E54E3D]" href={link.href}>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E54E3D]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold tracking-wide text-[#0f172a]">Company</h3>
              <div className="mt-3 h-1 w-12 rounded-full bg-[#E54E3D]" />
            </div>
            <ul className="space-y-3 text-sm sm:text-base text-[#3f4756]">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a className="inline-flex items-center gap-2 transition-all hover:text-[#E54E3D]" href={link.href}>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E54E3D]" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold tracking-wide text-[#0f172a]">Contact Us</h3>
              <div className="mt-3 h-1 w-12 rounded-full bg-[#E54E3D]" />
            </div>
            <ul className="space-y-4 text-sm sm:text-base text-[#3f4756]">
              <li>
                <span className="block text-[#6b7280]">Email:</span>
                <a className="transition-colors hover:text-[#E54E3D]" href="mailto:info@checkmyride.ca">
                  info@checkmyride.ca
                </a>
              </li>
              <li>
                <span className="block text-[#6b7280]">Phone:</span>
                <a className="transition-colors hover:text-[#E54E3D]" href="tel:6139815498">
                  (613)-981-5498
                </a>
              </li>
              <li>
                <span className="block text-[#6b7280]">Hours:</span>
                <span>Mon-Fri 9am-6pm EST</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative border-t border-[#dbe0ef] px-[15%] py-6 text-center sm:text-left">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:text-base text-[#687385]">
          <p>
            © 2025 CheckMyRide. All Rights Reserved.{' '}
            <Link className="hover:text-[#E54E3D]" href="/privacy-terms">
              Privacy Policy and Terms of Service
            </Link>
          </p>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#475569]">
            <span>Vehicles</span>
            <span className="h-px w-6 bg-[#dbe0ef]" />
            <span>Inspections</span>
            <span className="h-px w-6 bg-[#dbe0ef]" />
            <span>Peace of Mind</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
