'use client';

import Link from 'next/link';
import SiteFooter from '../components/layout/SiteFooter';
import SiteHeader from '../components/layout/SiteHeader';

export default function PreInspectedListingsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f9fc] text-[#0f172a]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,78,61,0.12),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_55%),radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_60%)]" />

      <SiteHeader />

      <section className="relative mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:py-24">
        <header className="space-y-5 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#E54E3D]">
            Pre-Inspected Listings
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            No Vehicles Currently Available
          </h1>
          <p className="mx-auto max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed text-[#3f4756]">
            We don&apos;t have any pre-inspected vehicles listed at the moment. Check back soon! We&apos;re building a curated selection of vehicles that have undergone our professional inspection process. Each listing will include a complete CheckMyRide inspection report, giving you full transparency and confidence in your purchase.
          </p>
        </header>

        <section className="grid gap-6 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60 ring-1 ring-slate-100 sm:p-10">
          <h2 className="text-xl font-semibold text-[#152032] sm:text-2xl">In the meantime</h2>
          <ul className="space-y-4 text-sm sm:text-base text-[#3f4756]">
            <li className="flex items-start gap-3">
              <span className="mt-1 block h-2.5 w-2.5 rounded-full bg-[#E54E3D]" />
              Buying a car?{' '}
              <Link href="/book-appointment#booking-form" className="font-semibold text-[#E54E3D] underline-offset-4 transition hover:text-[#c63a2c] hover:underline">
                Book an inspection before you purchase
              </Link>
              .
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 block h-2.5 w-2.5 rounded-full bg-[#E54E3D]" />
              Selling a car? Get it inspected to attract serious buyers and give them confidence.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 block h-2.5 w-2.5 rounded-full bg-[#E54E3D]" />
              Contact us to list your inspected vehicle free of charge.
            </li>
          </ul>

          <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/book-appointment#booking-form"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#E54E3D] via-[#f97362] to-[#fb9f8a] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[#E54E3D]/40 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Schedule an Inspection
            </Link>
            <Link
              href="mailto:info@checkmyride.ca"
              className="inline-flex items-center justify-center rounded-full border border-[#E54E3D]/40 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#E54E3D] transition hover:border-[#E54E3D] hover:text-[#d14130]"
            >
              Email Us to List a Vehicle
            </Link>
          </div>
        </section>
      </section>

      <SiteFooter />
    </main>
  );
}

