'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface BodyConditionItem {
  item: string;
  rating: 'excellent' | 'good' | 'fair' | 'needs-attention' | 'critical' | 'n/a' | '';
  notes: string;
}

const RATING_OPTIONS = [
  { value: 'excellent', label: 'Excellent', color: 'bg-green-500' },
  { value: 'good', label: 'Good', color: 'bg-green-400' },
  { value: 'fair', label: 'Fair', color: 'bg-yellow-400' },
  { value: 'needs-attention', label: 'Needs attention', color: 'bg-orange-400' },
  { value: 'critical', label: 'Critical', color: 'bg-red-500' },
  { value: 'n/a', label: 'N/A', color: 'bg-gray-400' },
];

const BODY_CONDITION_ITEMS = [
  'Dents, scratches, rust on panels',
  'Paint condition and finish quality',
  'Glass condition (windshield, windows)',
  'Lights and electrical components',
  'Tires and wheels condition',
  'Interior condition and wear',
  'Upholstery and trim condition',
  'Dashboard and controls functionality',
  'HVAC system operation',
  'Audio and entertainment systems',
  'Safety features and restraints',
  'Frame and structural integrity',
];

const INSPECTION_TYPES = [
  { value: 'standard', label: 'Standard Inspection' },
  { value: 'enhanced', label: 'Enhanced Inspection' },
  { value: 'full-spectrum', label: 'Full-Spectrum Inspection' },
  { value: 'routine', label: 'Routine Check-Up' },
];

export default function InspectionReportPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params?.bookingId as string;
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string | null>(null);
  const [booking, setBooking] = useState<any>(null);
  const [existingReport, setExistingReport] = useState<any>(null);
  const [selectedInspectionType, setSelectedInspectionType] = useState<string>('standard');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    generalInfo: {
      clientName: '',
      email: '',
      phone: '',
      appointmentDate: '',
      inspectionTime: '',
      inspectorName: '',
      sellerType: '',
      sellerName: '',
      inspectionLocation: '',
    },
    vehicleInfo: {
      year: '',
      make: '',
      model: '',
      trim: '',
      vin: '',
      mileage: '',
      color: '',
      transmission: '',
      drivetrain: '',
      bodyStyle: '',
      fuelType: '',
    },
    bodyCondition: [] as BodyConditionItem[],
    summary: {
      overallCondition: '',
      inspectionSummary: '',
      recommendations: '',
      recommendationNotes: '',
    },
    valueAssessment: {
      assessment: '',
      notes: '',
    },
  });

  useEffect(() => {
    fetchBookingAndReport();
  }, [bookingId]);

  const fetchBookingAndReport = async () => {
    try {
      const [bookingRes, reportRes] = await Promise.all([
        fetch(`${API_URL}/api/bookings/${bookingId}`),
        fetch(`${API_URL}/api/reports/booking/${bookingId}`).catch(() => null),
      ]);

      if (!bookingRes.ok) {
        throw new Error('Booking not found');
      }

      const bookingData = await bookingRes.json();
      setBooking(bookingData.booking);
      
      // Set initial inspection type from booking
      setSelectedInspectionType(bookingData.booking.inspectionDetails?.type || 'standard');

      // Pre-fill form with booking data
      setFormData(prev => ({
        ...prev,
        generalInfo: {
          clientName: bookingData.booking.personalInfo.fullName,
          email: bookingData.booking.personalInfo.email,
          phone: bookingData.booking.personalInfo.phone,
          appointmentDate: new Date(bookingData.booking.appointmentDetails.preferredDate).toISOString().split('T')[0],
          inspectionTime: bookingData.booking.appointmentDetails.preferredTime,
          inspectorName: bookingData.booking.assignedMechanic?.name || '',
          sellerType: '',
          sellerName: '',
          inspectionLocation: bookingData.booking.inspectionDetails.location === 'mobile' ? 'Mobile' : 'CheckMyRide Facility',
        },
        vehicleInfo: {
          year: bookingData.booking.vehicleInfo.year.toString(),
          make: bookingData.booking.vehicleInfo.make,
          model: bookingData.booking.vehicleInfo.model,
          trim: '',
          vin: bookingData.booking.vehicleInfo.vin || '',
          mileage: bookingData.booking.vehicleInfo.mileage?.toString() || '',
          color: '',
          transmission: '',
          drivetrain: '',
          bodyStyle: '',
          fuelType: '',
        },
        bodyCondition: BODY_CONDITION_ITEMS.map(item => ({
          item,
          rating: '' as const,
          notes: '',
        })),
      }));

      if (reportRes && reportRes.ok) {
        const reportData = await reportRes.json();
        setExistingReport(reportData.report);
        // Pre-fill with existing report data
        if (reportData.report) {
          setFormData(prev => ({
            ...prev,
            generalInfo: { ...prev.generalInfo, ...reportData.report.generalInfo },
            vehicleInfo: { ...prev.vehicleInfo, ...reportData.report.vehicleInfo },
            bodyCondition: reportData.report.bodyCondition.length > 0 
              ? reportData.report.bodyCondition 
              : prev.bodyCondition,
            summary: reportData.report.summary || prev.summary,
            valueAssessment: reportData.report.valueAssessment || prev.valueAssessment,
          }));
        }
      }
    } catch (error: any) {
      setError(error.message || 'Failed to load booking');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const handleBodyConditionChange = (index: number, field: 'rating' | 'notes', value: string) => {
    setFormData(prev => {
      const newBodyCondition = [...prev.bodyCondition];
      newBodyCondition[index] = {
        ...newBodyCondition[index],
        [field]: value,
      };
      return {
        ...prev,
        bodyCondition: newBodyCondition,
      };
    });
  };

  const calculateFormProgress = (): number => {
    let totalFields = 0;
    let filledFields = 0;

    // General Info (required fields)
    const generalInfoRequired = ['clientName', 'email', 'phone', 'appointmentDate', 'inspectionTime', 'inspectorName', 'inspectionLocation'];
    totalFields += generalInfoRequired.length;
    generalInfoRequired.forEach(field => {
      if (formData.generalInfo[field as keyof typeof formData.generalInfo]?.toString().trim()) {
        filledFields++;
      }
    });

    // Vehicle Info (required fields)
    const vehicleInfoRequired = ['year', 'make', 'model'];
    totalFields += vehicleInfoRequired.length;
    vehicleInfoRequired.forEach(field => {
      if (formData.vehicleInfo[field as keyof typeof formData.vehicleInfo]?.toString().trim()) {
        filledFields++;
      }
    });

    // Body Condition (only if full-spectrum inspection)
    if (selectedInspectionType === 'full-spectrum') {
      formData.bodyCondition.forEach(item => {
        totalFields++;
        if (item.rating && item.rating.trim() !== '') {
          filledFields++;
        }
      });
    }

    // Summary (required fields)
    const summaryRequired = ['overallCondition', 'inspectionSummary', 'recommendations'];
    totalFields += summaryRequired.length;
    summaryRequired.forEach(field => {
      if (formData.summary[field as keyof typeof formData.summary]?.toString().trim()) {
        filledFields++;
      }
    });

    // Value Assessment (required field)
    totalFields++;
    if (formData.valueAssessment.assessment?.trim()) {
      filledFields++;
    }

    return totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
  };

  const validateForm = (isSubmit: boolean = false): string[] => {
    const errors: string[] = [];
    
    if (!formData.generalInfo.clientName.trim()) {
      errors.push('Client Name is required');
    }
    if (!formData.generalInfo.email.trim()) {
      errors.push('Email is required');
    }
    if (!formData.generalInfo.phone.trim()) {
      errors.push('Phone is required');
    }
    if (!formData.generalInfo.appointmentDate) {
      errors.push('Appointment Date is required');
    }
    if (!formData.generalInfo.inspectionTime.trim()) {
      errors.push('Inspection Time is required');
    }
    if (!formData.generalInfo.inspectorName.trim()) {
      errors.push('Inspector Name is required');
    }
    if (!formData.generalInfo.inspectionLocation.trim()) {
      errors.push('Inspection Location is required');
    }
    
    if (!formData.vehicleInfo.year) {
      errors.push('Vehicle Year is required');
    }
    if (!formData.vehicleInfo.make.trim()) {
      errors.push('Vehicle Make is required');
    }
    if (!formData.vehicleInfo.model.trim()) {
      errors.push('Vehicle Model is required');
    }
    
    if (isSubmit) {
      if (!formData.summary.overallCondition) {
        errors.push('Overall Vehicle Condition is required');
      }
      if (!formData.summary.inspectionSummary.trim()) {
        errors.push('Inspection Summary is required');
      }
      if (!formData.summary.recommendations) {
        errors.push('Recommendations is required');
      }
      if (!formData.valueAssessment.assessment) {
        errors.push('Value Assessment is required');
      }
    }
    
    return errors;
  };

  const handleSaveDraft = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setValidationErrors([]);

    try {
      // Filter out bodyCondition items without ratings for draft
      const filteredBodyCondition = formData.bodyCondition.filter(
        item => item.rating && item.rating.trim() !== ''
      );

      const response = await fetch(`${API_URL}/api/reports/booking/${bookingId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          bodyCondition: filteredBodyCondition,
          generalInfo: {
            ...formData.generalInfo,
            appointmentDate: new Date(formData.generalInfo.appointmentDate).toISOString(),
          },
          vehicleInfo: {
            ...formData.vehicleInfo,
            year: parseInt(formData.vehicleInfo.year),
            mileage: formData.vehicleInfo.mileage ? parseInt(formData.vehicleInfo.mileage) : undefined,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors && Array.isArray(errorData.errors)) {
          setValidationErrors(errorData.errors);
          throw new Error(errorData.message || 'Validation failed');
        }
        throw new Error(errorData.message || 'Failed to save draft');
      }

      setSuccess('Draft saved successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error: any) {
      setError(error.message || 'Failed to save draft');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setValidationErrors([]);

    // Frontend validation
    const frontendErrors = validateForm(true);
    if (frontendErrors.length > 0) {
      setValidationErrors(frontendErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Filter out bodyCondition items without ratings
      const filteredBodyCondition = formData.bodyCondition.filter(
        item => item.rating && item.rating.trim() !== ''
      );

      // Save first
      const saveResponse = await fetch(`${API_URL}/api/reports/booking/${bookingId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          bodyCondition: filteredBodyCondition,
          generalInfo: {
            ...formData.generalInfo,
            appointmentDate: new Date(formData.generalInfo.appointmentDate).toISOString(),
          },
          vehicleInfo: {
            ...formData.vehicleInfo,
            year: parseInt(formData.vehicleInfo.year),
            mileage: formData.vehicleInfo.mileage ? parseInt(formData.vehicleInfo.mileage) : undefined,
          },
        }),
      });

      if (!saveResponse.ok) {
        const errorData = await saveResponse.json();
        if (errorData.errors && Array.isArray(errorData.errors)) {
          setValidationErrors(errorData.errors);
          throw new Error(errorData.message || 'Validation failed');
        }
        throw new Error(errorData.message || 'Failed to save report');
      }

      // Then submit
      const submitResponse = await fetch(`${API_URL}/api/reports/booking/${bookingId}/submit`, {
        method: 'PATCH',
      });

      if (!submitResponse.ok) {
        const errorData = await submitResponse.json();
        if (errorData.errors && Array.isArray(errorData.errors)) {
          setValidationErrors(errorData.errors);
          throw new Error(errorData.message || 'Validation failed');
        }
        throw new Error(errorData.message || 'Failed to submit report');
      }

      setSuccess('Report submitted successfully!');
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        router.push('/');
      }, 5000);
    } catch (error: any) {
      setError(error.message || 'Failed to submit report');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E54E3D] mx-auto mb-4"></div>
          <p className="text-[#64748b]">Loading...</p>
        </div>
      </div>
    );
  }

  if (error && !booking) {
    return (
      <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-[#1f2a37] mb-2">Error</h2>
          <p className="text-[#64748b] mb-6">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1f2a37] to-[#0f172a] text-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Check<span className="text-[#E54E3D]">MyRide</span> Vehicle Inspection Report
          </h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-[#E54E3D] text-white px-6 py-2.5 pr-10 rounded-lg font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 hover:bg-[#d14130] transition-all duration-200 shadow-lg border-2 border-white/20 min-w-[240px] text-left flex items-center justify-between"
              >
                <span>{INSPECTION_TYPES.find(t => t.value === selectedInspectionType)?.label || 'Select Inspection Type'}</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-full bg-white rounded-lg shadow-xl border-2 border-[#e2e8f0] overflow-hidden z-20">
                    {INSPECTION_TYPES.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => {
                          setSelectedInspectionType(type.value);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full border-b border-gray-300 px-6 py-2 text-left font-semibold transition-all duration-200 ${
                          selectedInspectionType === type.value
                            ? 'bg-[#E54E3D] text-white'
                            : 'text-[#1f2a37] hover:bg-[#f8fafc] hover:text-[#E54E3D]'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="w-full bg-white h-1">
        <div
          className="bg-[#E54E3D] h-1 transition-all duration-500 ease-out"
          style={{ width: `${calculateFormProgress()}%` }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border-2 border-red-200 p-4">
            <p className="font-semibold text-red-800 mb-2">{error}</p>
            {validationErrors.length > 0 && (
              <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
                {validationErrors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            )}
          </div>
        )}
        {validationErrors.length > 0 && !error && (
          <div className="mb-6 rounded-lg bg-red-50 border-2 border-red-200 p-4">
            <p className="font-semibold text-red-800 mb-2">Please fix the following errors:</p>
            <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
              {validationErrors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}
        {success && (
          <div className="mb-6 rounded-lg bg-green-50 border-2 border-green-200 p-6 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-2">Success!</h3>
              <p className="text-lg text-green-700 mb-4">{success}</p>
              <p className="text-sm text-green-600">You will be redirected to the home page in a few seconds...</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className={`space-y-6 ${success ? 'opacity-50 pointer-events-none' : ''}`}>
          {/* General Information */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#1f2a37] mb-4">General Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#64748b] mb-2">Client Name</label>
                <input
                  type="text"
                  value={formData.generalInfo.clientName}
                  onChange={(e) => handleInputChange('generalInfo', 'clientName', e.target.value)}
                  required
                  className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748b] mb-2">Email</label>
                <input
                  type="email"
                  value={formData.generalInfo.email}
                  onChange={(e) => handleInputChange('generalInfo', 'email', e.target.value)}
                  required
                  className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748b] mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.generalInfo.phone}
                  onChange={(e) => handleInputChange('generalInfo', 'phone', e.target.value)}
                  required
                  className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748b] mb-2">Appointment Date</label>
                <input
                  type="date"
                  value={formData.generalInfo.appointmentDate}
                  onChange={(e) => handleInputChange('generalInfo', 'appointmentDate', e.target.value)}
                  required
                  className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748b] mb-2">Inspection Time</label>
                <input
                  type="time"
                  value={formData.generalInfo.inspectionTime}
                  onChange={(e) => handleInputChange('generalInfo', 'inspectionTime', e.target.value)}
                  required
                  className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748b] mb-2">Inspector Name</label>
                <input
                  type="text"
                  value={formData.generalInfo.inspectorName}
                  onChange={(e) => handleInputChange('generalInfo', 'inspectorName', e.target.value)}
                  required
                  className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748b] mb-2">Seller Type</label>
                <select
                  value={formData.generalInfo.sellerType}
                  onChange={(e) => handleInputChange('generalInfo', 'sellerType', e.target.value)}
                  className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                >
                  <option value="">Select...</option>
                  <option value="private">Private Seller</option>
                  <option value="dealer">Dealer</option>
                  <option value="auction">Auction</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748b] mb-2">Seller Name</label>
                <input
                  type="text"
                  value={formData.generalInfo.sellerName}
                  onChange={(e) => handleInputChange('generalInfo', 'sellerName', e.target.value)}
                  className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748b] mb-2">Inspection Location</label>
                <input
                  type="text"
                  value={formData.generalInfo.inspectionLocation}
                  onChange={(e) => handleInputChange('generalInfo', 'inspectionLocation', e.target.value)}
                  required
                  className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#1f2a37] mb-4">Vehicle Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#64748b] mb-2">Year</label>
                <input
                  type="number"
                  value={formData.vehicleInfo.year}
                  onChange={(e) => handleInputChange('vehicleInfo', 'year', e.target.value)}
                  required
                  className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748b] mb-2">Make</label>
                <input
                  type="text"
                  value={formData.vehicleInfo.make}
                  onChange={(e) => handleInputChange('vehicleInfo', 'make', e.target.value)}
                  required
                  className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748b] mb-2">Model</label>
                <input
                  type="text"
                  value={formData.vehicleInfo.model}
                  onChange={(e) => handleInputChange('vehicleInfo', 'model', e.target.value)}
                  required
                  className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748b] mb-2">Trim</label>
                <input
                  type="text"
                  value={formData.vehicleInfo.trim}
                  onChange={(e) => handleInputChange('vehicleInfo', 'trim', e.target.value)}
                  className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748b] mb-2">VIN</label>
                <input
                  type="text"
                  value={formData.vehicleInfo.vin}
                  onChange={(e) => handleInputChange('vehicleInfo', 'vin', e.target.value.toUpperCase())}
                  maxLength={17}
                  className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748b] mb-2">Mileage</label>
                <input
                  type="number"
                  value={formData.vehicleInfo.mileage}
                  onChange={(e) => handleInputChange('vehicleInfo', 'mileage', e.target.value)}
                  className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748b] mb-2">Color</label>
                <input
                  type="text"
                  value={formData.vehicleInfo.color}
                  onChange={(e) => handleInputChange('vehicleInfo', 'color', e.target.value)}
                  className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748b] mb-2">Transmission</label>
                <select
                  value={formData.vehicleInfo.transmission}
                  onChange={(e) => handleInputChange('vehicleInfo', 'transmission', e.target.value)}
                  className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                >
                  <option value="">Select...</option>
                  <option value="manual">Manual</option>
                  <option value="automatic">Automatic</option>
                  <option value="cvt">CVT</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748b] mb-2">Drivetrain</label>
                <select
                  value={formData.vehicleInfo.drivetrain}
                  onChange={(e) => handleInputChange('vehicleInfo', 'drivetrain', e.target.value)}
                  className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                >
                  <option value="">Select...</option>
                  <option value="fwd">FWD</option>
                  <option value="rwd">RWD</option>
                  <option value="awd">AWD</option>
                  <option value="4wd">4WD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748b] mb-2">Body Style</label>
                <select
                  value={formData.vehicleInfo.bodyStyle}
                  onChange={(e) => handleInputChange('vehicleInfo', 'bodyStyle', e.target.value)}
                  className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                >
                  <option value="">Select...</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="truck">Truck</option>
                  <option value="coupe">Coupe</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="convertible">Convertible</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748b] mb-2">Fuel Type</label>
                <select
                  value={formData.vehicleInfo.fuelType}
                  onChange={(e) => handleInputChange('vehicleInfo', 'fuelType', e.target.value)}
                  className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                >
                  <option value="">Select...</option>
                  <option value="gasoline">Gasoline</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>
          </div>

          {/* Rating Guidelines */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#1f2a37] mb-4">Rating Guidelines</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#f8fafc]">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#64748b]">Rating</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#64748b]">Description</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#64748b]">Recommended Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  <tr>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-500"></div>
                        <span className="font-semibold">Excellent</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#64748b]">In perfect condition; no concerns noted.</td>
                    <td className="px-4 py-3 text-sm text-[#64748b]">No action required.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-400"></div>
                        <span className="font-semibold">Good</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#64748b]">Performing well; no immediate issues.</td>
                    <td className="px-4 py-3 text-sm text-[#64748b]">Routine maintenance as scheduled.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                        <span className="font-semibold">Fair</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#64748b]">Slight wear or aging; might need attention in the future.</td>
                    <td className="px-4 py-3 text-sm text-[#64748b]">Monitor during upcoming maintenance visits.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-orange-400"></div>
                        <span className="font-semibold">Needs attention</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#64748b]">Signs of significant wear or performance issues.</td>
                    <td className="px-4 py-3 text-sm text-[#64748b]">Service or replace within the next 1-3 months.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-red-500"></div>
                        <span className="font-semibold">Critical</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#64748b]">Component is non-functional or unsafe; immediate attention required.</td>
                    <td className="px-4 py-3 text-sm text-[#64748b]">Address immediately before continued operation.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                        <span className="font-semibold">N/A</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#64748b]">Not applicable or not present for this inspection.</td>
                    <td className="px-4 py-3 text-sm text-[#64748b]">No action required.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Body Condition - Only show for Full-Spectrum Inspection */}
          {selectedInspectionType === 'full-spectrum' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#1f2a37] mb-4">Body Condition</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#f8fafc]">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[#64748b]">Item</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[#64748b]">Rating</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[#64748b]">Inspector Notes/Comments</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e2e8f0]">
                    {formData.bodyCondition.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 font-semibold text-[#1f2a37]">{item.item}</td>
                        <td className="px-4 py-3">
                          <select
                            value={item.rating}
                            onChange={(e) => handleBodyConditionChange(index, 'rating', e.target.value)}
                            className="w-full rounded-lg border-2 border-[#e2e8f0] px-3 py-2 text-sm focus:border-[#E54E3D] focus:outline-none"
                          >
                            <option value="">Select rating...</option>
                            {RATING_OPTIONS.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <textarea
                            value={item.notes}
                            onChange={(e) => handleBodyConditionChange(index, 'notes', e.target.value)}
                            rows={2}
                            className="w-full rounded-lg border-2 border-[#e2e8f0] px-3 py-2 text-sm focus:border-[#E54E3D] focus:outline-none"
                            placeholder="Add notes..."
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Summary and Recommendations */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#1f2a37] mb-4">Summary and Recommendations</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#64748b] mb-2">Overall Vehicle Condition</label>
                <select
                  value={formData.summary.overallCondition}
                  onChange={(e) => handleInputChange('summary', 'overallCondition', e.target.value)}
                  required
                  className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                >
                  <option value="">Select...</option>
                  {RATING_OPTIONS.filter(opt => opt.value !== 'n/a').map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748b] mb-2">Inspection Summary</label>
                <textarea
                  value={formData.summary.inspectionSummary}
                  onChange={(e) => handleInputChange('summary', 'inspectionSummary', e.target.value)}
                  required
                  rows={6}
                  className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                  placeholder="Provide a comprehensive summary of the vehicle's condition based on inspection findings..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748b] mb-2">Recommendations</label>
                <select
                  value={formData.summary.recommendations}
                  onChange={(e) => handleInputChange('summary', 'recommendations', e.target.value)}
                  required
                  className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                >
                  <option value="">Select...</option>
                  <option value="purchase-recommended">Purchase Recommended</option>
                  <option value="purchase-with-conditions">Purchase with Conditions</option>
                  <option value="negotiate-price">Negotiate Price</option>
                  <option value="do-not-purchase">Do Not Purchase</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748b] mb-2">Additional notes or explanations for your recommendation</label>
                <textarea
                  value={formData.summary.recommendationNotes}
                  onChange={(e) => handleInputChange('summary', 'recommendationNotes', e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                  placeholder="Add additional notes..."
                />
              </div>
            </div>
          </div>

          {/* Value Assessment */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#1f2a37] mb-4">Value Assessment</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#64748b] mb-2">Select value assessment</label>
                <select
                  value={formData.valueAssessment.assessment}
                  onChange={(e) => handleInputChange('valueAssessment', 'assessment', e.target.value)}
                  required
                  className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                >
                  <option value="">Select...</option>
                  <option value="above-market">Above Market Value</option>
                  <option value="at-market">At Market Value</option>
                  <option value="below-market">Below Market Value</option>
                  <option value="significantly-below">Significantly Below Market Value</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#64748b] mb-2">Additional notes on vehicle value and price considerations</label>
                <textarea
                  value={formData.valueAssessment.notes}
                  onChange={(e) => handleInputChange('valueAssessment', 'notes', e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                  placeholder="Add notes on value assessment..."
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pb-6">
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isSaving}
              className="px-6 py-3 rounded-lg bg-[#f97362] text-white font-semibold hover:bg-[#E54E3D] transition-colors disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Draft'}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-lg bg-[#E54E3D] text-white font-semibold hover:bg-[#d14130] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

