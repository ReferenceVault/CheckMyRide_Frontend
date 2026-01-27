'use client';

import Link from 'next/link';
import { CalendarCheck, Phone, Mail, Clock, MapPin, ArrowRight } from 'lucide-react';
import SiteFooter from '../components/layout/SiteFooter';
import SiteHeader from '../components/layout/SiteHeader';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#142b3f_0%,#213f5b_45%,#102033_100%)] px-[10%] pt-24 pb-16 text-white sm:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,78,61,0.25),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(14,116,210,0.28),transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
            <CalendarCheck className="h-4 w-4" />
            Let’s Talk
          </span>
          <h1 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.9rem]">
            Contact the CheckMyRide Team
          </h1>
          <p className="mt-4 text-base text-white/80 sm:text-lg">
            Book an inspection, ask a question, or get tailored guidance for your next vehicle purchase. Our Ottawa-based team responds within one business day.
          </p>
        </div>
      </section>

      <section className="relative px-[10%] py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-[#e2e8f0] bg-white p-8 shadow-xl shadow-slate-200/60">
            <h2 className="text-2xl font-semibold text-[#0f172a] sm:text-3xl">Send Us a Message</h2>
            <p className="mt-2 text-sm text-[#475569] sm:text-base">
              Share your inspection needs or questions. We’ll follow up by email to confirm details and recommend the best package.
            </p>

            <form className="mt-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-[#0f172a]">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Jane Doe"
                    className="w-full rounded-2xl border border-[#d4dbe8] bg-[#f8fafc] px-4 py-3 text-sm text-[#0f172a] shadow-sm outline-none transition focus:border-[#E54E3D] focus:ring-2 focus:ring-[#E54E3D]/30"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-[#0f172a]">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-[#d4dbe8] bg-[#f8fafc] px-4 py-3 text-sm text-[#0f172a] shadow-sm outline-none transition focus:border-[#E54E3D] focus:ring-2 focus:ring-[#E54E3D]/30"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-semibold text-[#0f172a]">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(613) 981-5498"
                    className="w-full rounded-2xl border border-[#d4dbe8] bg-[#f8fafc] px-4 py-3 text-sm text-[#0f172a] shadow-sm outline-none transition focus:border-[#E54E3D] focus:ring-2 focus:ring-[#E54E3D]/30"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="service" className="text-sm font-semibold text-[#0f172a]">
                    Inspection Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full rounded-2xl border border-[#d4dbe8] bg-[#f8fafc] px-4 py-3 text-sm text-[#0f172a] shadow-sm outline-none transition focus:border-[#E54E3D] focus:ring-2 focus:ring-[#E54E3D]/30"
                    defaultValue="standard"
                  >
                    <option value="standard">Standard Inspection</option>
                    <option value="enhanced">Enhanced Inspection</option>
                    <option value="full-spectrum">Full-Spectrum Inspection</option>
                    <option value="routine">Routine Check-Up</option>
                    <option value="other">Other / Not sure</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="details" className="text-sm font-semibold text-[#0f172a]">
                  Vehicle or Request Details
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows={5}
                  placeholder="Share the vehicle make/model, current location, or anything you’d like us to know."
                  className="w-full rounded-2xl border border-[#d4dbe8] bg-[#f8fafc] px-4 py-3 text-sm text-[#0f172a] shadow-sm outline-none transition focus:border-[#E54E3D] focus:ring-2 focus:ring-[#E54E3D]/30"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E54E3D] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[#E54E3D]/35 transition hover:-translate-y-0.5 hover:bg-[#d14130]"
              >
                Submit Request
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          <aside className="space-y-8">
            <div className="rounded-3xl bg-[#142b3f] p-8 text-white shadow-lg shadow-[#0b1f31]/60">
              <h3 className="text-xl font-semibold">Contact Information</h3>
              <p className="mt-3 text-sm text-white/80">
                We’re based in Ottawa and dispatch inspectors across Kanata, Orleans, Gatineau, and surrounding areas.
              </p>
              <div className="mt-6 space-y-5 text-sm">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#E64B37]" />
                  <a href="tel:+16139815498" className="text-white transition hover:text-[#E64B37]">
                    (613) 981-5498
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#E64B37]" />
                  <a href="mailto:info@checkmyride.ca" className="text-white transition hover:text-[#E64B37]">
                    info@checkmyride.ca
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarCheck className="h-5 w-5 text-[#E64B37]" />
                  <Link href="/book-appointment#booking-form" className="text-white transition hover:text-[#E64B37]">
                    Book an Inspection
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#e2e8f0] bg-white p-6 shadow-lg shadow-slate-200/60">
              <h3 className="text-lg font-semibold text-[#0f172a]">Hours of Availability</h3>
              <div className="mt-4 space-y-3 text-sm text-[#475569]">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-[#E64B37]" />
                  <span>Monday – Saturday: 9:00 AM – 5:00 PM</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-[#E64B37]" />
                  <span>Sunday: Appointment only</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#e2e8f0] bg-white p-6 shadow-lg shadow-slate-200/60">
              <h3 className="text-lg font-semibold text-[#0f172a]">Service Area</h3>
              <div className="mt-4 flex items-start gap-3 text-sm text-[#475569]">
                <MapPin className="mt-0.5 h-5 w-5 text-[#E64B37]" />
                <p>
                  Ottawa • Kanata • Orleans • Gatineau • Barrhaven<br />
                  We travel to dealerships, private sellers, or your home.
                </p>
              </div>
              <p className="mt-4 text-xs text-[#64748b]">
                Need an inspection outside the Ottawa region? Contact us for custom travel options.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="relative px-[10%] pb-20 sm:pb-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-[#f8fafc] p-8 shadow-lg shadow-slate-200/70">
          <h2 className="text-xl font-semibold text-[#0f172a] sm:text-2xl text-center">Prefer to Call?</h2>
          <p className="mt-3 text-sm text-[#475569] sm:text-base text-center">
            Our team can help you choose the right inspection package, explain findings, or schedule re-inspections with the seller.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <a
              href="tel:+16135550123"
              className="inline-flex items-center gap-2 rounded-full bg-[#E54E3D] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[#E54E3D]/35 transition hover:-translate-y-0.5 hover:bg-[#d14130]"
            >
              Call Us Directly
              <Phone className="h-4 w-4" />
            </a>
            <a
              href="mailto:info@checkmyride.ca"
              className="inline-flex items-center gap-2 rounded-full border border-[#E54E3D]/30 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#E54E3D] transition hover:-translate-y-0.5 hover:border-[#E54E3D]"
            >
              Email Your Request
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

