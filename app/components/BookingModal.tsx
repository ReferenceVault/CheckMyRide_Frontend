'use client';

import { useState, useEffect } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultInspectionType?: string;
}

export default function BookingModal({ isOpen, onClose, defaultInspectionType }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inspectionType: defaultInspectionType ?? '',
    vehicle: '',
    preferredDate: '',
    notes: '',
  });

  // Update inspection type whenever default changes or modal opens anew
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        inspectionType: defaultInspectionType ?? '',
      }));
    }
  }, [defaultInspectionType, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 bg-black/45 backdrop-blur-sm">
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-[0_26px_60px_-40px_rgba(15,23,42,0.55)] ring-1 ring-white/60">
        <div className="pointer-events-none absolute -top-20 -left-20 h-48 w-48 rounded-full bg-[#f97362]/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-[-20%] h-48 w-48 rounded-full bg-[#0ea5e9]/18 blur-3xl" />

        {/* Header */}
        <div className="relative flex flex-col gap-3 bg-gradient-to-br from-[#E54E3D] via-[#f97362] to-[#fcd9d0] px-5 py-5 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-white/70">Book Inspection</p>
            <h2 className="mt-1 text-xl sm:text-2xl font-bold leading-tight">Reserve Your CheckMyRide Appointment</h2>
            <p className="mt-1 text-xs sm:text-sm text-white/85">
              Tell us about the vehicle and your timing—we’ll align the right technician and send confirmation quickly.
            </p>
          </div>
          <button
            onClick={onClose}
            className="self-end rounded-full bg-white/10 p-2 transition hover:bg-white/20"
            aria-label="Close booking form"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative flex flex-col gap-4 px-5 py-5 sm:px-7">
          <div className="max-h-[50vh] overflow-y-auto pr-1 custom-scrollbar">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-[#152032]">
                  Full Name <span className="text-[#E54E3D]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#d9e1f2] bg-white/95 px-3.5 py-2 text-[#1f2937] shadow-inner shadow-slate-200/40 transition focus:border-[#E54E3D] focus:outline-none text-sm"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-[#152032]">
                  Email Address <span className="text-[#E54E3D]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#d9e1f2] bg-white/95 px-3.5 py-2 text-[#1f2937] shadow-inner shadow-slate-200/40 transition focus:border-[#E54E3D] focus:outline-none text-sm"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-semibold text-[#152032]">
                  Phone Number <span className="text-[#E54E3D]">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#d9e1f2] bg-white/95 px-3.5 py-2 text-[#1f2937] shadow-inner shadow-slate-200/40 transition focus:border-[#E54E3D] focus:outline-none text-sm"
                  placeholder="(613) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="inspectionType" className="text-sm font-semibold text-[#152032]">
                  Inspection Package <span className="text-[#E54E3D]">*</span>
                </label>
                <select
                  id="inspectionType"
                  name="inspectionType"
                  value={formData.inspectionType}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#d9e1f2] bg-white/95 px-3.5 py-2 text-[#1f2937] shadow-inner shadow-slate-200/40 transition focus:border-[#E54E3D] focus:outline-none text-sm"
                >
                  <option value="" disabled>
                    Select a package
                  </option>
                  <option value="Standard">Standard Inspection</option>
                  <option value="Enhanced">Enhanced Inspection</option>
                  <option value="Full-Spectrum">Full-Spectrum Inspection</option>
                  <option value="Routine Check-Up">Routine Check-Up</option>
                </select>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="vehicle" className="text-sm font-semibold text-[#152032]">
                  Vehicle Make & Model <span className="text-[#E54E3D]">*</span>
                </label>
                <input
                  type="text"
                  id="vehicle"
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#d9e1f2] bg-white/95 px-3.5 py-2 text-[#1f2937] shadow-inner shadow-slate-200/40 transition focus:border-[#E54E3D] focus:outline-none text-sm"
                  placeholder="e.g., Tesla Model 3 2022"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="preferredDate" className="text-sm font-semibold text-[#152032]">
                  Preferred Inspection Date & Time <span className="text-[#E54E3D]">*</span>
                </label>
                <input
                  type="datetime-local"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  required
                  min={new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16)}
                  className="w-full rounded-xl border border-[#d9e1f2] bg-white/95 px-3.5 py-2 text-[#1f2937] shadow-inner shadow-slate-200/40 transition focus:border-[#E54E3D] focus:outline-none text-sm"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="notes" className="text-sm font-semibold text-[#152032]">
                  Additional Details or Concerns
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-xl border border-[#d9e1f2] bg-white/95 px-3.5 py-2 text-[#1f2937] shadow-inner shadow-slate-200/40 transition focus:border-[#E54E3D] focus:outline-none text-sm"
                  placeholder="Share anything specific you’d like us to look for."
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 rounded-xl bg-[#f7f8ff] px-4 py-3 text-xs text-[#3f4756] shadow-inner shadow-slate-200/50 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-start gap-2">
              <span className="mt-1 block h-2.5 w-2.5 rounded-full bg-[#E54E3D]" />
              <span>We confirm availability within two business hours and coordinate with sellers on your behalf.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="mt-1 block h-2.5 w-2.5 rounded-full bg-[#0ea5e9]" />
              <span>Need help choosing? Call <a href="tel:6139815498" className="font-semibold text-[#E54E3D]">(613) 981-5498</a>.</span>
            </p>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full border border-[#d1d9ee] bg-white px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[#1f2a37] transition hover:border-[#E54E3D]/40 hover:text-[#E54E3D]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-full bg-gradient-to-r from-[#E54E3D] via-[#f97362] to-[#fb9f8a] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[#E54E3D]/40 transition hover:shadow-xl"
            >
              Submit Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

