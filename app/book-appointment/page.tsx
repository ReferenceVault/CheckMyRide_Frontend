'use client';

import Link from 'next/link';
import { Suspense, useMemo, useState, useRef, FormEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SiteFooter from '../components/layout/SiteFooter';
import SiteHeader from '../components/layout/SiteHeader';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

function AppointmentBookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  
  const inspectionOptions = [
    { value: 'standard', label: 'Standard Inspection' },
    { value: 'enhanced', label: 'Enhanced Inspection' },
    { value: 'full-spectrum', label: 'Full-spectrum Inspection' },
    { value: 'routine', label: 'Routine Checkup' },
  ] as const;

  const selectedService = inspectionOptions.some((option) => option.value === searchParams.get('service'))
    ? (searchParams.get('service') as typeof inspectionOptions[number]['value'])
    : undefined;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setFieldErrors({});
    setSubmitSuccess(false);

    const formData = new FormData(e.currentTarget);
    
    // Client-side validation
    const errors: Record<string, string> = {};
    
    // Validate required fields
    if (!formData.get('fullName')?.toString().trim()) {
      errors.fullName = 'Full Name is required';
    }
    if (!formData.get('email')?.toString().trim()) {
      errors.email = 'Email Address is required';
    }
    if (!formData.get('phone')?.toString().trim()) {
      errors.phone = 'Phone Number is required';
    }
    if (!formData.get('vehicleMake')?.toString().trim()) {
      errors.vehicleMake = 'Vehicle Make is required';
    }
    if (!formData.get('vehicleModel')?.toString().trim()) {
      errors.vehicleModel = 'Vehicle Model is required';
    }
    if (!formData.get('vehicleYear')?.toString().trim()) {
      errors.vehicleYear = 'Vehicle Year is required';
    }
    if (!formData.get('inspection-type')) {
      errors['inspection-type'] = 'Inspection Type is required';
    }
    if (!formData.get('inspection-location')) {
      errors['inspection-location'] = 'Inspection Location is required';
    }
    if (!formData.get('preferredDate')?.toString().trim()) {
      errors.preferredDate = 'Preferred Appointment Date is required';
    }
    if (!formData.get('preferredTime')?.toString().trim()) {
      errors.preferredTime = 'Preferred Appointment Time is required';
    }
    if (!formData.get('inspectionAddress')?.toString().trim()) {
      errors.inspectionAddress = 'Inspection Address is required';
    }
    if (!formData.get('payment-method')) {
      errors['payment-method'] = 'Payment Method is required';
    }
    if (formData.get('termsAccepted') !== 'on') {
      errors.termsAccepted = 'You must accept the Privacy Policy and Terms of Service to continue.';
    }
    
    // If there are validation errors, show them and stop submission
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsSubmitting(false);
      // Scroll to first error field
      setTimeout(() => {
        const firstErrorField = Object.keys(errors)[0];
        const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      return;
    }

    const formValues = {
      personalInfo: {
        fullName: formData.get('fullName') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
      },
      vehicleInfo: {
        make: formData.get('vehicleMake') as string,
        model: formData.get('vehicleModel') as string,
        year: parseInt(formData.get('vehicleYear') as string),
        mileage: formData.get('mileage') ? parseInt(formData.get('mileage') as string) : undefined,
        vin: (formData.get('vin') as string)?.trim() || undefined,
      },
      inspectionDetails: {
        type: formData.get('inspection-type') as string,
        location: (formData.get('inspection-location') as string) === 'Mobile Inspection' ? 'mobile' : 'checkmyride',
      },
      appointmentDetails: {
        preferredDate: formData.get('preferredDate') as string,
        preferredTime: formData.get('preferredTime') as string,
        address: formData.get('inspectionAddress') as string,
      },
      additionalInfo: {
        notes: (formData.get('notes') as string)?.trim() || undefined,
        paymentMethod: (formData.get('payment-method') as string) === 'Cash' ? 'cash' : 'e-transfer',
        promoCode: (formData.get('promoCode') as string)?.trim() || undefined,
      },
      termsAccepted: true,
    };

    try {
      // Create AbortController for timeout handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle non-JSON responses
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || `Server returned ${response.status} ${response.statusText}`);
      }

      if (!response.ok) {
        // Handle validation errors
        if (response.status === 400 && data.errors && Array.isArray(data.errors)) {
          const errors: Record<string, string> = {};
          
          data.errors.forEach((err: any) => {
            const field = err.field || '';
            const message = err.message || '';
            
            // Map backend field names to form field names
            const fieldMap: Record<string, string> = {
              'personalInfo.fullName': 'fullName',
              'personalInfo.email': 'email',
              'personalInfo.phone': 'phone',
              'vehicleInfo.make': 'vehicleMake',
              'vehicleInfo.model': 'vehicleModel',
              'vehicleInfo.year': 'vehicleYear',
              'inspectionDetails.type': 'inspection-type',
              'inspectionDetails.location': 'inspection-location',
              'appointmentDetails.preferredDate': 'preferredDate',
              'appointmentDetails.preferredTime': 'preferredTime',
              'appointmentDetails.address': 'inspectionAddress',
              'additionalInfo.paymentMethod': 'payment-method',
            };
            
            const formFieldName = fieldMap[field] || field.split('.').pop() || field;
            errors[formFieldName] = message;
          });
          
          setFieldErrors(errors);
          
          // Scroll to first error field
          setTimeout(() => {
            const firstErrorField = Object.keys(errors)[0];
            const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
            if (errorElement) {
              errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 100);
          
          setIsSubmitting(false);
          return;
        }
        
        // Handle other error responses
        throw new Error(data.message || data.error || `Failed to submit booking (${response.status})`);
      }

      // Success case
      setSubmitSuccess(true);
      setFieldErrors({});
      
      // Reset form using ref
      if (formRef.current) {
        formRef.current.reset();
      }
      
      // Scroll to top to show success message
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);

    } catch (error: any) {
      // Handle different error types
      if (error.name === 'AbortError') {
        setSubmitError('Request timed out. Please check your connection and try again.');
      } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setSubmitError('Network error. Please check your internet connection and try again.');
      } else if (error.message) {
        setSubmitError(error.message);
      } else {
        setSubmitError('An unexpected error occurred. Please try again later.');
      }

      // Scroll to error message
      setTimeout(() => {
        const errorElement = document.getElementById('error-message');
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
            Provide a few details about you and the vehicle you're considering. Our team will confirm availability and lock in the perfect inspection time—so you can move forward with clarity.
          </p>
        </header>

        {submitSuccess && (
          <div className="rounded-2xl bg-green-50 border-2 border-green-200 p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="text-xl font-semibold text-green-800">Booking Submitted Successfully!</h3>
            </div>
            <p className="text-green-700 mb-4">
              Thank you for your booking. We'll contact you shortly to confirm your appointment.
            </p>
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center justify-center rounded-full bg-green-600 hover:bg-green-700 px-6 py-3 text-sm font-semibold text-white transition shadow-md hover:shadow-lg"
            >
              Go to Home Page
            </button>
          </div>
        )}

        {submitError && (
          <div id="error-message" className="rounded-2xl bg-red-50 border-2 border-red-200 p-6">
            <div className="flex items-start gap-3">
              <svg className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-red-800 mb-1">Error</h3>
                <p className="text-red-700 text-sm leading-relaxed">{submitError}</p>
                <button
                  onClick={() => setSubmitError(null)}
                  className="mt-3 text-sm text-red-600 hover:text-red-800 underline"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        <form
          ref={formRef}
          id="booking-form"
          onSubmit={handleSubmit}
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
                  {fieldErrors.fullName && (
                    <p className="text-xs text-red-600 font-normal">{fieldErrors.fullName}</p>
                  )}
                  <input
                    type="text"
                    name="fullName"
                    className={`w-full rounded-xl border ${fieldErrors.fullName ? 'border-red-300' : 'border-[#e2e8f0]'} bg-[#f8fafc] px-4 py-3 text-sm text-[#152032] shadow-inner shadow-slate-200/50 transition focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30`}
                    placeholder="Your full name"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-[#1f2a37]">
                  <span>Email Address *</span>
                  {fieldErrors.email && (
                    <p className="text-xs text-red-600 font-normal">{fieldErrors.email}</p>
                  )}
                  <input
                    type="email"
                    name="email"
                    className={`w-full rounded-xl border ${fieldErrors.email ? 'border-red-300' : 'border-[#e2e8f0]'} bg-[#f8fafc] px-4 py-3 text-sm text-[#152032] shadow-inner shadow-slate-200/50 transition focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30`}
                    placeholder="you@email.com"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-[#1f2a37]">
                  <span>Phone Number *</span>
                  {fieldErrors.phone && (
                    <p className="text-xs text-red-600 font-normal">{fieldErrors.phone}</p>
                  )}
                  <input
                    type="tel"
                    name="phone"
                    className={`w-full rounded-xl border ${fieldErrors.phone ? 'border-red-300' : 'border-[#e2e8f0]'} bg-[#f8fafc] px-4 py-3 text-sm text-[#152032] shadow-inner shadow-slate-200/50 transition focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30`}
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
                  {fieldErrors.vehicleMake && (
                    <p className="text-xs text-red-600 font-normal">{fieldErrors.vehicleMake}</p>
                  )}
                  <input
                    type="text"
                    name="vehicleMake"
                    className={`w-full rounded-xl border ${fieldErrors.vehicleMake ? 'border-red-300' : 'border-[#e2e8f0]'} bg-[#f8fafc] px-4 py-3 text-sm text-[#152032] shadow-inner shadow-slate-200/50 transition focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30`}
                    placeholder="e.g., Toyota"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-[#1f2a37]">
                  <span>Model *</span>
                  {fieldErrors.vehicleModel && (
                    <p className="text-xs text-red-600 font-normal">{fieldErrors.vehicleModel}</p>
                  )}
                  <input
                    type="text"
                    name="vehicleModel"
                    className={`w-full rounded-xl border ${fieldErrors.vehicleModel ? 'border-red-300' : 'border-[#e2e8f0]'} bg-[#f8fafc] px-4 py-3 text-sm text-[#152032] shadow-inner shadow-slate-200/50 transition focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30`}
                    placeholder="e.g., Corolla"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-[#1f2a37]">
                  <span>Year *</span>
                  {fieldErrors.vehicleYear && (
                    <p className="text-xs text-red-600 font-normal">{fieldErrors.vehicleYear}</p>
                  )}
                  <input
                    type="number"
                    name="vehicleYear"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    className={`w-full rounded-xl border ${fieldErrors.vehicleYear ? 'border-red-300' : 'border-[#e2e8f0]'} bg-[#f8fafc] px-4 py-3 text-sm text-[#152032] shadow-inner shadow-slate-200/50 transition focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30`}
                    placeholder="e.g., 2021"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-[#1f2a37]">
                  <span>Mileage (km)</span>
                  <input
                    type="number"
                    name="mileage"
                    min="0"
                    className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#152032] shadow-inner shadow-slate-200/50 transition focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30"
                    placeholder="e.g., 45,000"
                  />
                </label>
              </div>
              <label className="space-y-2 text-sm font-semibold text-[#1f2a37]">
                <span>VIN (optional)</span>
                <input
                  type="text"
                  name="vin"
                  maxLength={17}
                  className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#152032] shadow-inner shadow-slate-200/50 transition focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30"
                  placeholder="17-character VIN"
                />
              </label>
            </section>
          </div>

          <section className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#152032]">3. Inspection Type *</h2>
                <p className="mt-1 text-sm text-[#64748b]">Choose the inspection package you're interested in.</p>
              </div>
              {fieldErrors['inspection-type'] && (
                <p className="text-xs text-red-600 font-normal">{fieldErrors['inspection-type']}</p>
              )}
              <div className="grid gap-3">
                {inspectionOptions.map((option, index) => (
                  <label key={option.value} className={`flex items-start gap-3 rounded-2xl border ${fieldErrors['inspection-type'] ? 'border-red-300' : 'border-[#e2e8f0]'} bg-[#f8fafc] px-4 py-3 text-sm text-[#1f2a37] shadow-inner shadow-slate-200/40`}>
                    <input
                      type="radio"
                      name="inspection-type"
                      value={option.value}
                      className="mt-1 h-4 w-4 border-[#cbd5f5] text-[#E54E3D] focus:ring-[#E54E3D]"
                      defaultChecked={selectedService === option.value}
                    />
                    <span className="font-semibold">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#152032]">4. Inspection Location *</h2>
                <p className="mt-1 text-sm text-[#64748b]">Tell us where you'd like the inspection to happen.</p>
              </div>
              {fieldErrors['inspection-location'] && (
                <p className="text-xs text-red-600 font-normal">{fieldErrors['inspection-location']}</p>
              )}
              <div className="space-y-3">
                <label className={`flex items-start gap-3 rounded-2xl border ${fieldErrors['inspection-location'] ? 'border-red-300' : 'border-[#e2e8f0]'} bg-[#f8fafc] px-4 py-3 text-sm text-[#1f2a37] shadow-inner shadow-slate-200/40`}>
                  <input type="radio" name="inspection-location" value="Mobile Inspection" className="mt-1 h-4 w-4 border-[#cbd5f5] text-[#E54E3D] focus:ring-[#E54E3D]" />
                  <span className="font-semibold">
                    Mobile Inspection <span className="block text-xs font-normal text-[#64748b]">On-site inspection at your location of choice.</span>
                  </span>
                </label>
                <label className={`flex items-start gap-3 rounded-2xl border ${fieldErrors['inspection-location'] ? 'border-red-300' : 'border-[#e2e8f0]'} bg-[#f8fafc] px-4 py-3 text-sm text-[#1f2a37] shadow-inner shadow-slate-200/40`}>
                  <input type="radio" name="inspection-location" value="Inspection at CheckMyRide" className="mt-1 h-4 w-4 border-[#cbd5f5] text-[#E54E3D] focus:ring-[#E54E3D]" />
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
                  {fieldErrors.preferredDate && (
                    <p className="text-xs text-red-600 font-normal">{fieldErrors.preferredDate}</p>
                  )}
                  <input
                    type="date"
                    name="preferredDate"
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full rounded-xl border ${fieldErrors.preferredDate ? 'border-red-300' : 'border-[#e2e8f0]'} bg-[#f8fafc] px-4 py-3 text-sm text-[#152032] shadow-inner shadow-slate-200/50 transition focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30`}
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-[#1f2a37]">
                  <span>Preferred Appointment Time *</span>
                  {fieldErrors.preferredTime && (
                    <p className="text-xs text-red-600 font-normal">{fieldErrors.preferredTime}</p>
                  )}
                  <input
                    type="time"
                    name="preferredTime"
                    className={`w-full rounded-xl border ${fieldErrors.preferredTime ? 'border-red-300' : 'border-[#e2e8f0]'} bg-[#f8fafc] px-4 py-3 text-sm text-[#152032] shadow-inner shadow-slate-200/50 transition focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30`}
                  />
                </label>
              </div>
              <label className="space-y-2 text-sm font-semibold text-[#1f2a37]">
                <span>Inspection Address *</span>
                {fieldErrors.inspectionAddress && (
                  <p className="text-xs text-red-600 font-normal">{fieldErrors.inspectionAddress}</p>
                )}
                <input
                  type="text"
                  name="inspectionAddress"
                  className={`w-full rounded-xl border ${fieldErrors.inspectionAddress ? 'border-red-300' : 'border-[#e2e8f0]'} bg-[#f8fafc] px-4 py-3 text-sm text-[#152032] shadow-inner shadow-slate-200/50 transition focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30`}
                  placeholder="Street, City, Province"
                />
              </label>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#152032]">6. Additional Comments</h2>
                <p className="mt-1 text-sm text-[#64748b]">Anything specific you'd like us to know?</p>
              </div>
              <label className="space-y-2 text-sm font-semibold text-[#1f2a37]">
                <span>Notes for the inspection team</span>
                <textarea
                  name="notes"
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
                <h2 className="text-2xl font-semibold text-[#152032]">7. Payment Information *</h2>
                <p className="mt-1 text-sm text-[#64748b]">Let us know how you'd like to pay once the inspection is complete.</p>
              </div>
              {fieldErrors['payment-method'] && (
                <p className="text-xs text-red-600 font-normal">{fieldErrors['payment-method']}</p>
              )}
              <div className="space-y-3">
                <label className={`flex items-start gap-3 rounded-2xl border ${fieldErrors['payment-method'] ? 'border-red-300' : 'border-[#e2e8f0]'} bg-[#f8fafc] px-4 py-3 text-sm text-[#1f2a37] shadow-inner shadow-slate-200/40`}>
                  <input type="radio" name="payment-method" value="Cash" className="mt-1 h-4 w-4 border-[#cbd5f5] text-[#E54E3D] focus:ring-[#E54E3D]" />
                  <span className="font-semibold">Cash</span>
                </label>
                <label className={`flex items-start gap-3 rounded-2xl border ${fieldErrors['payment-method'] ? 'border-red-300' : 'border-[#e2e8f0]'} bg-[#f8fafc] px-4 py-3 text-sm text-[#1f2a37] shadow-inner shadow-slate-200/40`}>
                  <input type="radio" name="payment-method" value="E-transfer" className="mt-1 h-4 w-4 border-[#cbd5f5] text-[#E54E3D] focus:ring-[#E54E3D]" />
                  <span className="font-semibold">E-transfer</span>
                </label>
              </div>
              <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-xs leading-relaxed font-bold text-[#475569] shadow-inner shadow-slate-200/40">
                Payment is due upon completion of the inspection, unless otherwise arranged. Receipts are provided digitally via email.
              </div>
            </div>

            <div className="space-y-6">
              <label className="space-y-2 text-sm font-semibold text-[#1f2a37]">
                <span>Promo Code</span>
                <input
                  type="text"
                  name="promoCode"
                  className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#152032] shadow-inner shadow-slate-200/50 transition focus:border-[#E54E3D] focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/30"
                  placeholder="Enter promo or referral code (if applicable)"
                />
              </label>
            </div>
          </section>

          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-[#152032]">8. Confirmation</h2>
              <p className="mt-1 text-sm text-[#64748b]">Please review your information before submitting.</p>
            </div>
            {fieldErrors.termsAccepted && (
              <p className="text-xs text-red-600 font-normal">{fieldErrors.termsAccepted}</p>
            )}
            <label className={`flex items-start gap-3 rounded-2xl border ${fieldErrors.termsAccepted ? 'border-red-300' : 'border-[#e2e8f0]'} bg-[#f8fafc] px-4 py-3 text-sm text-[#1f2a37] shadow-inner shadow-slate-200/40`}>
              <input type="checkbox" name="termsAccepted" className="mt-1 h-4 w-4 rounded border-[#cbd5f5] text-[#E54E3D] focus:ring-[#E54E3D]" />
              <span>
                I confirm that the information provided is accurate, and I agree to the{' '}
                <Link href="/privacy-terms" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#E54E3D] hover:text-[#d14130]">
                  Privacy Policy and Terms of Service
                </Link>
                .
              </span>
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#E54E3D] via-[#f97362] to-[#fb9f8a] px-6 py-4 text-base font-semibold uppercase tracking-wide text-white shadow-xl shadow-[#E54E3D]/40 transition hover:-translate-y-0.5 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Book My Appointment'
              )}
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
    </>
  );
}

export default function AppointmentBookingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f9fc] text-[#0f172a]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,78,61,0.12),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_55%),radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_60%)]" />

      <SiteHeader />

      <Suspense fallback={
        <section className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 pt-16 pb-10 sm:px-10 sm:pt-20 lg:pt-24">
          <div className="text-center">
            <p className="text-lg text-[#3f4756]">Loading booking form...</p>
          </div>
        </section>
      }>
        <AppointmentBookingForm />
      </Suspense>
    </main>
  );
}
