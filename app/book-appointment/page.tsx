'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import SiteFooter from '../components/layout/SiteFooter';
import SiteHeader from '../components/layout/SiteHeader';

export default function AppointmentBookingPage() {
  const searchParams = useSearchParams();
  const navLinks = useMemo(
    () => [
      { label: 'Home', href: '/#home' },
      { label: 'Services', href: '/#features' },
      { label: 'Vehicles For Sale', href: '/#about' },
      { label: 'Contact', href: '/#contact' },
    ],
    []
  );

  const inspectionOptions = [
    { value: 'standard', label: 'Standard Inspection' },
    { value: 'enhanced', label: 'Enhanced Inspection' },
    { value: 'full-spectrum', label: 'Full-spectrum Inspection' },
    { value: 'routine', label: 'Routine Checkup' },
  ] as const;

  const selectedService = inspectionOptions.some((option) => option.value === searchParams.get('service'))
    ? (searchParams.get('service') as typeof inspectionOptions[number]['value'])
    : undefined;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f9fc] text-[#0f172a]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,78,61,0.12),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_55%),radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_60%)]" />

      <SiteHeader navLinks={navLinks} />

      <section className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 pt-16 pb-10 sm:px-10 sm:pt-20 lg:pt-24">
        <header className="space-y-5 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#E54E3D]">
            CheckMyRide Appointment Booking Form
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-[#1f2a37]">Schedule an Inspection</span>{' '}
            <span className="text-[#E54E3D]">with Confidence</span>
          </h1>
          <p className="mx-auto max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed text-[#3f4756]">
            Provide a few details about you and the vehicle you’re considering. Our team will confirm availability and lock in the perfect inspection time—so you can move forward with clarity.
          </p>
        </header>

        <form
          id="booking-form"
          className="space-y-12 rounded-[2.75rem] bg-white/95 p-8 sm:p-12 shadow-xl shadow-slate-200/60 ring-1 ring-slate-100"
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <section className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#152032]">1. Personal Information</h2>
                <p className="mt-1 text-sm text-[#64748b]">We’ll use these details to confirm your appointment.</p>
              </div>
              <div className="grid gap-5">
                <label className="space-y-2 text-sm font-semibold text-[#1f2a37]">
                  <span>Full Name *</span>
                  <input
                    type="text"
                    required
                    className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#152032] shadow-inner shadow-slate-200/50 transition focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30"
                    placeholder="Your full name"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-[#1f2a37]">
                  <span>Email Address *</span>
                  <input
                    type="email"
                    required
                    className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#152032] shadow-inner shadow-slate-200/50 transition focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30"
                    placeholder="you@email.com"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-[#1f2a37]">
                  <span>Phone Number *</span>
                  <input
                    type="tel"
                    required
                    className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#152032] shadow-inner shadow-slate-200/50 transition focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30"
                    placeholder="(613) 123-4567"
                  />
                </label>
              </div>
            </section>

            <section className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#152032]">2. Vehicle Information</h2>
                <p className="mt-1 text-sm text-[#64748b]">Tell us about the vehicle you’d like inspected.</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold text-[#1f2a37]">
                  <span>Make *</span>
                  <input
                    type="text"
                    required
                    className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#152032] shadow-inner shadow-slate-200/50 transition focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30"
                    placeholder="e.g., Toyota"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-[#1f2a37]">
                  <span>Model *</span>
                  <input
                    type="text"
                    required
                    className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#152032] shadow-inner shadow-slate-200/50 transition focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30"
                    placeholder="e.g., Corolla"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-[#1f2a37]">
                  <span>Year *</span>
                  <input
                    type="number"
                    required
                    className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#152032] shadow-inner shadow-slate-200/50 transition focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30"
                    placeholder="e.g., 2021"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-[#1f2a37]">
                  <span>Mileage (km)</span>
                  <input
                    type="number"
                    className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#152032] shadow-inner shadow-slate-200/50 transition focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30"
                    placeholder="e.g., 45,000"
                  />
                </label>
              </div>
              <label className="space-y-2 text-sm font-semibold text-[#1f2a37]">
                <span>VIN (optional)</span>
                <input
                  type="text"
                  className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#152032] shadow-inner shadow-slate-200/50 transition focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30"
                  placeholder="17-character VIN"
                />
              </label>
            </section>
          </div>

          <section className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#152032]">3. Inspection Type</h2>
                <p className="mt-1 text-sm text-[#64748b]">Choose the inspection package you’re interested in.</p>
              </div>
              <div className="grid gap-3">
                {inspectionOptions.map((option, index) => (
                  <label key={option.value} className="flex items-start gap-3 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#1f2a37] shadow-inner shadow-slate-200/40">
                    <input
                      type="radio"
                      name="inspection-type"
                      value={option.value}
                      className="mt-1 h-4 w-4 border-[#cbd5f5] text-[#E54E3D] focus:ring-[#E54E3D]"
                      defaultChecked={selectedService === option.value}
                      required={!selectedService && index === 0}
                    />
                    <span className="font-semibold">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#152032]">4. Inspection Location</h2>
                <p className="mt-1 text-sm text-[#64748b]">Tell us where you’d like the inspection to happen.</p>
              </div>
              <div className="space-y-3">
                <label className="flex items-start gap-3 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#1f2a37] shadow-inner shadow-slate-200/40">
                  <input type="radio" name="inspection-location" required className="mt-1 h-4 w-4 border-[#cbd5f5] text-[#E54E3D] focus:ring-[#E54E3D]" />
                  <span className="font-semibold">
                    Mobile Inspection <span className="block text-xs font-normal text-[#64748b]">On-site inspection at your location of choice.</span>
                  </span>
                </label>
                <label className="flex items-start gap-3 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#1f2a37] shadow-inner shadow-slate-200/40">
                  <input type="radio" name="inspection-location" className="mt-1 h-4 w-4 border-[#cbd5f5] text-[#E54E3D] focus:ring-[#E54E3D]" />
                  <span className="font-semibold">
                    Inspection at CheckMyRide <span className="block text-xs font-normal text-[#64748b]">Bring the vehicle to our location.</span>
                  </span>
                </label>
              </div>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#152032]">5. Appointment Details</h2>
                <p className="mt-1 text-sm text-[#64748b]">Provide your preferred date, time, and address.</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold text-[#1f2a37]">
                  <span>Preferred Appointment Date *</span>
                  <input
                    type="date"
                    required
                    className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#152032] shadow-inner shadow-slate-200/50 transition focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-[#1f2a37]">
                  <span>Preferred Appointment Time *</span>
                  <input
                    type="time"
                    required
                    className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#152032] shadow-inner shadow-slate-200/50 transition focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30"
                  />
                </label>
              </div>
              <label className="space-y-2 text-sm font-semibold text-[#1f2a37]">
                <span>Inspection Address *</span>
                <input
                  type="text"
                  required
                  className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#152032] shadow-inner shadow-slate-200/50 transition focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30"
                  placeholder="Street, City, Province"
                />
              </label>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#152032]">6. Additional Comments</h2>
                <p className="mt-1 text-sm text-[#64748b]">Anything specific you’d like us to know?</p>
              </div>
              <label className="space-y-2 text-sm font-semibold text-[#1f2a37]">
                <span>Notes for the inspection team</span>
                <textarea
                  rows={6}
                  className="w-full resize-none rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#152032] shadow-inner shadow-slate-200/50 transition focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30"
                  placeholder="Share any special requests, concerns, or vehicle history details."
                />
              </label>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#152032]">7. Payment Information</h2>
                <p className="mt-1 text-sm text-[#64748b]">Let us know how you’d like to pay once the inspection is complete.</p>
              </div>
              <div className="space-y-3">
                <label className="flex items-start gap-3 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#1f2a37] shadow-inner shadow-slate-200/40">
                  <input type="radio" name="payment-method" required className="mt-1 h-4 w-4 border-[#cbd5f5] text-[#E54E3D] focus:ring-[#E54E3D]" />
                  <span className="font-semibold">Cash</span>
                </label>
                <label className="flex items-start gap-3 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#1f2a37] shadow-inner shadow-slate-200/40">
                  <input type="radio" name="payment-method" className="mt-1 h-4 w-4 border-[#cbd5f5] text-[#E54E3D] focus:ring-[#E54E3D]" />
                  <span className="font-semibold">E-transfer</span>
                </label>
              </div>
            </div>

            <div className="space-y-6">
              <label className="space-y-2 text-sm font-semibold text-[#1f2a37]">
                <span>Promo Code</span>
                <input
                  type="text"
                  className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#152032] shadow-inner shadow-slate-200/50 transition focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30"
                  placeholder="Enter promo or referral code (if applicable)"
                />
              </label>
              <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-xs leading-relaxed text-[#475569] shadow-inner shadow-slate-200/40">
                Payment is due upon completion of the inspection, unless otherwise arranged. Receipts are provided digitally via email.
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-[#152032]">8. Confirmation</h2>
              <p className="mt-1 text-sm text-[#64748b]">Please review your information before submitting.</p>
            </div>
            <label className="flex items-start gap-3 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#1f2a37] shadow-inner shadow-slate-200/40">
              <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-[#cbd5f5] text-[#E54E3D] focus:ring-[#E54E3D]" />
              <span>
                I confirm that the information provided is accurate, and I agree to the{' '}
                <Link href="/privacy-terms" className="font-semibold text-[#E54E3D] hover:text-[#d14130]">
                  Privacy Policy and Terms of Service
                </Link>
                .
              </span>
            </label>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#E54E3D] via-[#f97362] to-[#fb9f8a] px-6 py-4 text-base font-semibold uppercase tracking-wide text-white shadow-xl shadow-[#E54E3D]/40 transition hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Book My Appointment
            </button>
          </section>
        </form>

        <div className="rounded-[2.25rem] bg-[#0f172a] px-8 py-10 text-center text-white shadow-xl shadow-[#0f172a]/40">
          <h2 className="text-2xl font-semibold">Need help choosing the right package?</h2>
          <p className="mt-3 mx-auto max-w-3xl text-sm sm:text-base leading-relaxed text-white/80">
            Give us a call or send a message—our inspection specialists can guide you through the differences between each package and help you pick the perfect fit for your situation.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="tel:6139815498"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-white"
            >
              Call (613) 981-5498
            </Link>
            <Link
              href="mailto:info@checkmyride.ca"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#0f172a] transition hover:bg-white/90"
            >
              Email Us
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
