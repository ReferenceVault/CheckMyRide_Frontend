'use client';

import Link from 'next/link';
import SiteFooter from '../components/layout/SiteFooter';
import SiteHeader from '../components/layout/SiteHeader';

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f9fc]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,78,61,0.12),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_55%),radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_60%)]" />

      <SiteHeader />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16 sm:px-10 sm:py-20 lg:py-24 text-[#0f172a]">
        <header className="space-y-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#E54E3D]">
            About Us
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-[#1f2a37]">Your Vehicle&#39;s Health is</span>{' '}
            <span className="text-[#E54E3D]">Our Priority</span>
          </h1>
          <p className="mx-auto max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed text-[#3f4756]">
            At CheckMyRide, we believe every vehicle purchase should be a confident decision—not a gamble. Founded in Ottawa in 2024, we’re a dedicated team of automotive professionals delivering transparent, thorough pre-purchase inspections.
          </p>
        </header>

        <section className="grid gap-8 rounded-[2.5rem] bg-white/95 p-8 sm:p-10 shadow-xl shadow-slate-200/60 ring-1 ring-slate-100 lg:grid-cols-2">
          <article className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#152032]">Our Mission</h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#3f4756]">
              Our mission is simple: to give car buyers peace of mind through professional, unbiased vehicle inspections. We serve as your trusted advisor in the car-buying process, helping you make informed decisions based on the true condition of a vehicle—not just what sellers claim.
            </p>
            <div className="rounded-2xl bg-[#f8fafc] p-5 text-sm sm:text-base text-[#3f4756] shadow-inner shadow-slate-200/50">
              <p className="font-semibold text-[#1f2a37]">What sets us apart?</p>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-3">
                  <span className="mt-1 block h-2.5 w-2.5 rounded-full bg-[#E54E3D]" />
                  Fully ASE-certified inspectors who document every finding.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 block h-2.5 w-2.5 rounded-full bg-[#E54E3D]" />
                  Unbiased reporting focused solely on your best interest.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 block h-2.5 w-2.5 rounded-full bg-[#E54E3D]" />
                  Local Ottawa expertise with national inspection standards.
                </li>
              </ul>
            </div>
          </article>

          <article className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#152032]">Meet Our Team</h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#3f4756]">
              Led by co-founders Anthony Annan and Harrison Ackwah—who also serves as our head inspector—our team brings together automotive professionals passionate about vehicle safety and consumer protection. Every inspector undergoes rigorous training to uphold our standards of inspection quality.
            </p>
            <div className="rounded-2xl bg-[#fef4f1] p-5 text-sm sm:text-base text-[#3f4756] shadow-inner shadow-slate-200/50">
              <p className="font-semibold text-[#E54E3D]">Our Commitment</p>
              <p className="mt-3">
                We’re committed to saving you from the headaches and financial burdens that come with buying a problematic vehicle. Transparency builds trust: we document everything we find—both the good and the items that need attention—so you can move forward with confidence.
              </p>
            </div>
          </article>
        </section>

        <section className="flex flex-col gap-6 rounded-[2.5rem] bg-white px-8 py-10 shadow-xl shadow-slate-200/60 ring-1 ring-slate-100 text-center text-[#1f2a37]">
          <h2 className="text-2xl font-semibold text-[#152032]">CheckMyRide — Know Before You Buy</h2>
          <p className="mx-auto max-w-3xl text-sm sm:text-base leading-relaxed text-[#3f4756]">
            Whether you’re a first-time buyer or a seasoned car enthusiast, we’re here to be your trusted partner in the vehicle purchasing process. Book an inspection today and see why Ottawa drivers choose CheckMyRide for unbiased, professional vehicle advice.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/book-appointment?service=standard#booking-form"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#E54E3D] via-[#f97362] to-[#fb9f8a] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[#E54E3D]/40 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Book an Inspection
            </Link>
            <Link
              href="tel:6139815498"
              className="inline-flex items-center justify-center rounded-full border border-[#E54E3D]/40 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#E54E3D] transition hover:border-[#E54E3D] hover:text-[#d14130]"
            >
              Call (613) 981-5498
            </Link>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
