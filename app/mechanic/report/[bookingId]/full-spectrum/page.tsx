'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  BodyConditionItem,
  RATING_OPTIONS,
  FULL_SPECTRUM_BODY_CONDITION_ITEMS,
  FULL_SPECTRUM_LIGHTS_ITEMS,
  FULL_SPECTRUM_WHEELS_TIRES_ITEMS,
  FULL_SPECTRUM_EXTERIOR_COMPONENTS_ITEMS,
  FULL_SPECTRUM_UNDERCARRIAGE_ITEMS,
  FULL_SPECTRUM_ENGINE_ITEMS,
  BATTERY_ALTERNATOR_ITEMS,
  FULL_SPECTRUM_FLUID_INSPECTION_ITEMS,
  FULL_SPECTRUM_BELTS_HOSES_ITEMS,
  FULL_SPECTRUM_DIAGNOSTIC_TESTING_ITEMS,
  FULL_SPECTRUM_DASHBOARD_CONTROLS_ITEMS,
  FULL_SPECTRUM_WINDOWS_MIRRORS_ITEMS,
  FULL_SPECTRUM_SAFETY_EQUIPMENT_ITEMS,
  FULL_SPECTRUM_FUNCTIONAL_TESTS_ITEMS,
  FULL_SPECTRUM_INTERIOR_CONDITION_ITEMS,
  FULL_SPECTRUM_SEATS_UPHOLSTERY_ITEMS,
  FULL_SPECTRUM_DRIVING_PERFORMANCE_ITEMS,
  AUDIO_ENTERTAINMENT_SYSTEM_ITEMS,
  EMISSIONS_ENVIRONMENTAL_ITEMS,
  PRICE_NEGOTIATION_ITEMS,
} from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const INSPECTION_TYPES = [
  { value: 'standard', label: 'Standard Inspection' },
  { value: 'enhanced', label: 'Enhanced Inspection' },
  { value: 'full-spectrum', label: 'Full-Spectrum Inspection' },
  { value: 'routine', label: 'Routine Check-Up' },
];

export default function FullSpectrumInspectionPage() {
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
  const [selectedInspectionType, setSelectedInspectionType] = useState<string>('full-spectrum');

  const [expandedSections, setExpandedSections] = useState({
    generalInfo: true,
    bodyCondition: false,
    lights: false,
    wheelsTires: false,
    exteriorComponents: false,
    undercarriage: false,
    engine: false,
    batteryAlternator: false,
    fluidInspection: false,
    beltsHoses: false,
    diagnosticTesting: false,
    dashboardControls: false,
    windowsMirrors: false,
    safetyEquipment: false,
    functionalTests: false,
    interiorCondition: false,
    seatsUpholstery: false,
    drivingPerformance: false,
    audioEntertainment: false,
    emissionsEnvironmental: false,
    priceNegotiation: false,
    summary: false,
    valueAssessment: false,
  });

  const [formData, setFormData] = useState({
    generalInfo: {
      clientName: '',
      email: '',
      phone: '',
      appointmentDate: '',
      inspectionTime: '',
      inspectorName: '',
    },
    bodyCondition: [] as BodyConditionItem[],
    lights: [] as BodyConditionItem[],
    wheelsTires: [] as BodyConditionItem[],
    exteriorComponents: [] as BodyConditionItem[],
    undercarriage: [] as BodyConditionItem[],
    engine: [] as BodyConditionItem[],
    batteryAlternator: [] as BodyConditionItem[],
    fluidInspection: [] as BodyConditionItem[],
    beltsHoses: [] as BodyConditionItem[],
    diagnosticTesting: [] as BodyConditionItem[],
    dashboardControls: [] as BodyConditionItem[],
    windowsMirrors: [] as BodyConditionItem[],
    safetyEquipment: [] as BodyConditionItem[],
    functionalTests: [] as BodyConditionItem[],
    interiorCondition: [] as BodyConditionItem[],
    seatsUpholstery: [] as BodyConditionItem[],
    drivingPerformance: [] as BodyConditionItem[],
    audioEntertainment: [] as BodyConditionItem[],
    emissionsEnvironmental: [] as BodyConditionItem[],
    priceNegotiation: [] as BodyConditionItem[],
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
      setSelectedInspectionType(bookingData.booking.inspectionDetails?.type || 'full-spectrum');

      setFormData(prev => ({
        ...prev,
        generalInfo: {
          clientName: bookingData.booking.personalInfo.fullName,
          email: bookingData.booking.personalInfo.email,
          phone: bookingData.booking.personalInfo.phone,
          appointmentDate: new Date(bookingData.booking.appointmentDetails.preferredDate).toISOString().split('T')[0],
          inspectionTime: bookingData.booking.appointmentDetails.preferredTime,
          inspectorName: bookingData.booking.assignedMechanic?.name || '',
        },
        bodyCondition: FULL_SPECTRUM_BODY_CONDITION_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        lights: FULL_SPECTRUM_LIGHTS_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        wheelsTires: FULL_SPECTRUM_WHEELS_TIRES_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        exteriorComponents: FULL_SPECTRUM_EXTERIOR_COMPONENTS_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        undercarriage: FULL_SPECTRUM_UNDERCARRIAGE_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        engine: FULL_SPECTRUM_ENGINE_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        batteryAlternator: BATTERY_ALTERNATOR_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        fluidInspection: FULL_SPECTRUM_FLUID_INSPECTION_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        beltsHoses: FULL_SPECTRUM_BELTS_HOSES_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        diagnosticTesting: FULL_SPECTRUM_DIAGNOSTIC_TESTING_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        dashboardControls: FULL_SPECTRUM_DASHBOARD_CONTROLS_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        windowsMirrors: FULL_SPECTRUM_WINDOWS_MIRRORS_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        safetyEquipment: FULL_SPECTRUM_SAFETY_EQUIPMENT_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        functionalTests: FULL_SPECTRUM_FUNCTIONAL_TESTS_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        interiorCondition: FULL_SPECTRUM_INTERIOR_CONDITION_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        seatsUpholstery: FULL_SPECTRUM_SEATS_UPHOLSTERY_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        drivingPerformance: FULL_SPECTRUM_DRIVING_PERFORMANCE_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        audioEntertainment: AUDIO_ENTERTAINMENT_SYSTEM_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        emissionsEnvironmental: EMISSIONS_ENVIRONMENTAL_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        priceNegotiation: PRICE_NEGOTIATION_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
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
      }));

      if (reportRes && reportRes.ok) {
        const reportData = await reportRes.json();
        setExistingReport(reportData.report);
        if (reportData.report) {
          setFormData(prev => ({
            ...prev,
            generalInfo: { ...prev.generalInfo, ...reportData.report.generalInfo },
            bodyCondition: reportData.report.bodyCondition?.length > 0 ? reportData.report.bodyCondition : prev.bodyCondition,
            lights: reportData.report.lights?.length > 0 ? reportData.report.lights : prev.lights,
            wheelsTires: reportData.report.wheelsTires?.length > 0 ? reportData.report.wheelsTires : prev.wheelsTires,
            exteriorComponents: reportData.report.exteriorComponents?.length > 0 ? reportData.report.exteriorComponents : prev.exteriorComponents,
            undercarriage: reportData.report.undercarriage?.length > 0 ? reportData.report.undercarriage : prev.undercarriage,
            engine: reportData.report.engine?.length > 0 ? reportData.report.engine : prev.engine,
            batteryAlternator: reportData.report.batteryAlternator?.length > 0 ? reportData.report.batteryAlternator : prev.batteryAlternator,
            fluidInspection: reportData.report.fluidInspection?.length > 0 ? reportData.report.fluidInspection : prev.fluidInspection,
            beltsHoses: reportData.report.beltsHoses?.length > 0 ? reportData.report.beltsHoses : prev.beltsHoses,
            diagnosticTesting: reportData.report.diagnosticTesting?.length > 0 ? reportData.report.diagnosticTesting : prev.diagnosticTesting,
            dashboardControls: reportData.report.dashboardControls?.length > 0 ? reportData.report.dashboardControls : prev.dashboardControls,
            windowsMirrors: reportData.report.windowsMirrors?.length > 0 ? reportData.report.windowsMirrors : prev.windowsMirrors,
            safetyEquipment: reportData.report.safetyEquipment?.length > 0 ? reportData.report.safetyEquipment : prev.safetyEquipment,
            functionalTests: reportData.report.functionalTests?.length > 0 ? reportData.report.functionalTests : prev.functionalTests,
            interiorCondition: reportData.report.interiorCondition?.length > 0 ? reportData.report.interiorCondition : prev.interiorCondition,
            seatsUpholstery: reportData.report.seatsUpholstery?.length > 0 ? reportData.report.seatsUpholstery : prev.seatsUpholstery,
            drivingPerformance: reportData.report.drivingPerformance?.length > 0 ? reportData.report.drivingPerformance : prev.drivingPerformance,
            audioEntertainment: reportData.report.audioEntertainment?.length > 0 ? reportData.report.audioEntertainment : prev.audioEntertainment,
            emissionsEnvironmental: reportData.report.emissionsEnvironmental?.length > 0 ? reportData.report.emissionsEnvironmental : prev.emissionsEnvironmental,
            priceNegotiation: reportData.report.priceNegotiation?.length > 0 ? reportData.report.priceNegotiation : prev.priceNegotiation,
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

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleInspectionTypeChange = (type: string) => {
    router.replace(`/mechanic/report/${bookingId}/${type}`);
  };

  // Handler functions for each section
  const createSectionHandler = (section: keyof typeof formData) => {
    return (index: number, field: 'rating' | 'notes', value: string) => {
      setFormData(prev => {
        const sectionData = prev[section] as BodyConditionItem[];
        const newSectionData = [...sectionData];
        newSectionData[index] = { ...newSectionData[index], [field]: value };
        return { ...prev, [section]: newSectionData };
      });
    };
  };

  const handleBodyConditionChange = createSectionHandler('bodyCondition');
  const handleLightsChange = createSectionHandler('lights');
  const handleWheelsTiresChange = createSectionHandler('wheelsTires');
  const handleExteriorComponentsChange = createSectionHandler('exteriorComponents');
  const handleUndercarriageChange = createSectionHandler('undercarriage');
  const handleEngineChange = createSectionHandler('engine');
  const handleBatteryAlternatorChange = createSectionHandler('batteryAlternator');
  const handleFluidInspectionChange = createSectionHandler('fluidInspection');
  const handleBeltsHosesChange = createSectionHandler('beltsHoses');
  const handleDiagnosticTestingChange = createSectionHandler('diagnosticTesting');
  const handleDashboardControlsChange = createSectionHandler('dashboardControls');
  const handleWindowsMirrorsChange = createSectionHandler('windowsMirrors');
  const handleSafetyEquipmentChange = createSectionHandler('safetyEquipment');
  const handleFunctionalTestsChange = createSectionHandler('functionalTests');
  const handleInteriorConditionChange = createSectionHandler('interiorCondition');
  const handleSeatsUpholsteryChange = createSectionHandler('seatsUpholstery');
  const handleDrivingPerformanceChange = createSectionHandler('drivingPerformance');
  const handleAudioEntertainmentChange = createSectionHandler('audioEntertainment');
  const handleEmissionsEnvironmentalChange = createSectionHandler('emissionsEnvironmental');
  const handlePriceNegotiationChange = createSectionHandler('priceNegotiation');

  const calculateFormProgress = (): number => {
    let totalFields = 0;
    let filledFields = 0;

    // General Info
    const generalInfoRequired = ['clientName', 'email', 'phone', 'appointmentDate', 'inspectionTime', 'inspectorName'];
    totalFields += generalInfoRequired.length;
    generalInfoRequired.forEach(field => {
      if (formData.generalInfo[field as keyof typeof formData.generalInfo]?.toString().trim()) {
        filledFields++;
      }
    });

    // All inspection sections
    const sections: Array<keyof typeof formData> = [
      'bodyCondition', 'lights', 'wheelsTires', 'exteriorComponents', 'undercarriage', 'engine',
      'batteryAlternator', 'fluidInspection', 'beltsHoses', 'diagnosticTesting', 'dashboardControls',
      'windowsMirrors', 'safetyEquipment', 'functionalTests', 'interiorCondition', 'seatsUpholstery',
      'drivingPerformance', 'audioEntertainment', 'emissionsEnvironmental', 'priceNegotiation'
    ];

    sections.forEach(section => {
      const sectionData = formData[section] as BodyConditionItem[];
      sectionData.forEach(item => {
        totalFields++;
        if (item.rating && item.rating.trim() !== '') {
          filledFields++;
        }
      });
    });

    return totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
  };

  const validateForm = (isSubmit: boolean = false): string[] => {
    const errors: string[] = [];
    if (!formData.generalInfo.clientName.trim()) errors.push('Client Name is required');
    if (!formData.generalInfo.email.trim()) errors.push('Email is required');
    if (!formData.generalInfo.phone.trim()) errors.push('Phone is required');
    if (!formData.generalInfo.appointmentDate) errors.push('Appointment Date is required');
    if (!formData.generalInfo.inspectionTime.trim()) errors.push('Inspection Time is required');
    if (!formData.generalInfo.inspectorName.trim()) errors.push('Inspector Name is required');
    return errors;
  };

  const handleSaveDraft = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setValidationErrors([]);

    try {
      const response = await fetch(`${API_URL}/api/reports/booking/${bookingId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          generalInfo: {
            ...formData.generalInfo,
            appointmentDate: new Date(formData.generalInfo.appointmentDate).toISOString(),
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

    const frontendErrors = validateForm(true);
    if (frontendErrors.length > 0) {
      setValidationErrors(frontendErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const saveResponse = await fetch(`${API_URL}/api/reports/booking/${bookingId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          generalInfo: {
            ...formData.generalInfo,
            appointmentDate: new Date(formData.generalInfo.appointmentDate).toISOString(),
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

  // Render section component
  const renderInspectionSection = (
    sectionKey: keyof typeof formData,
    title: string,
    icon: JSX.Element,
    handler: (index: number, field: 'rating' | 'notes', value: string) => void
  ) => {
    const sectionData = formData[sectionKey] as BodyConditionItem[];
    const expandedKey = sectionKey as keyof typeof expandedSections;

    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection(expandedKey)}
          className="w-full bg-gradient-to-r from-orange-50 to-gray-50 px-6 py-4 flex items-center justify-between hover:from-orange-100 hover:to-gray-100 transition-all duration-200"
        >
          <h2 className="text-base font-bold text-[#1f2a37] flex items-center gap-2">
            {icon}
            {title}
          </h2>
          <svg
            className={`w-5 h-5 text-[#E54E3D] transition-transform duration-200 ${expandedSections[expandedKey] ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expandedSections[expandedKey] && (
          <div className="px-[30px] py-[40px]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-orange-50">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-orange-600">Component</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-orange-600">Condition</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-orange-600">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  {sectionData.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-[#f8fafc]'}>
                      <td className="px-4 py-3 font-semibold text-[#1f2a37]" style={{ fontSize: '14px' }}>{item.item}</td>
                      <td className="px-4 py-3">
                        <select
                          value={item.rating}
                          onChange={(e) => handler(index, 'rating', e.target.value)}
                          className="w-full rounded-lg border-2 border-[#e2e8f0] px-3 py-2 focus:border-[#E54E3D] focus:outline-none"
                          style={{ fontSize: '14px' }}
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
                          onChange={(e) => handler(index, 'notes', e.target.value)}
                          rows={2}
                          className="w-full rounded-lg border-2 border-[#e2e8f0] px-3 py-2 focus:border-[#E54E3D] focus:outline-none"
                          placeholder="Add notes..."
                          style={{ fontSize: '14px' }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
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
      <div className="bg-gradient-to-r from-orange-50 via-gray-50 to-orange-50 border-b border-orange-200 py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="inline-flex items-center hover:opacity-80 transition-opacity">
            <div className="relative -ml-[18px] -mt-4 flex h-[72px] w-[72px] items-center justify-center sm:-ml-[18px] sm:-mt-4 sm:h-[92px] sm:w-[92px]">
              <img src="/images/logofooter1.png" alt="CheckMyRide" className="h-full w-full object-contain" />
            </div>
            <span className="-ml-[25px] -mt-4 text-2xl font-bold tracking-tight text-[#152032]">
              Check<span className="text-[#E54E3D]">MyRide</span>
            </span>
          </Link>

          <div className="flex-1 flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold text-[#1f2a37]">
              Vehicle Inspection Report
            </h1>
            <p className="text-xs text-[#64748b]">Booking ID: {bookingId}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={selectedInspectionType}
                onChange={(e) => handleInspectionTypeChange(e.target.value)}
                className="bg-[#E54E3D] text-white px-6 py-2.5 rounded-lg font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/50 hover:bg-[#d14130] transition-all duration-200 shadow-lg border-2 border-[#E54E3D]/20 min-w-[240px]"
              >
                {INSPECTION_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-[#64748b]">Form Progress</span>
            <span className="text-sm font-bold text-[#E54E3D]">{calculateFormProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-[#E54E3D] to-[#f97362] h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${calculateFormProgress()}%` }}
            ></div>
          </div>
        </div>
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
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('generalInfo')}
              className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-[#f8fafc] to-white hover:from-[#f1f5f9] hover:to-[#f8fafc] transition-all"
            >
              <h2 className="text-base font-bold text-[#1f2a37] flex items-center gap-2">
                <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                General Information
              </h2>
              <svg
                className={`w-5 h-5 text-[#64748b] transition-transform duration-300 ${expandedSections.generalInfo ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedSections.generalInfo && (
              <div className="p-6 pt-0 transition-all duration-300 ease-in-out">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#64748b] mb-2" style={{ fontSize: '14px' }}>Client Name</label>
                    <input type="text" value={formData.generalInfo.clientName} readOnly className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 bg-gray-50 text-gray-600 cursor-not-allowed" style={{ fontSize: '14px' }} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#64748b] mb-2" style={{ fontSize: '14px' }}>Email</label>
                    <input type="email" value={formData.generalInfo.email} readOnly className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 bg-gray-50 text-gray-600 cursor-not-allowed" style={{ fontSize: '14px' }} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#64748b] mb-2" style={{ fontSize: '14px' }}>Phone</label>
                    <input type="tel" value={formData.generalInfo.phone} readOnly className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 bg-gray-50 text-gray-600 cursor-not-allowed" style={{ fontSize: '14px' }} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#64748b] mb-2" style={{ fontSize: '14px' }}>Appointment Date</label>
                    <input type="date" value={formData.generalInfo.appointmentDate} readOnly className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 bg-gray-50 text-gray-600 cursor-not-allowed" style={{ fontSize: '14px' }} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#64748b] mb-2" style={{ fontSize: '14px' }}>Inspection Time</label>
                    <input type="time" value={formData.generalInfo.inspectionTime} readOnly className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 bg-gray-50 text-gray-600 cursor-not-allowed" style={{ fontSize: '14px' }} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#64748b] mb-2" style={{ fontSize: '14px' }}>Inspector Name</label>
                    <input type="text" value={formData.generalInfo.inspectorName} readOnly className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 bg-gray-50 text-gray-600 cursor-not-allowed" style={{ fontSize: '14px' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* All Inspection Sections */}
          {renderInspectionSection(
            'bodyCondition',
            'Body Condition',
            <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>,
            handleBodyConditionChange
          )}

          {renderInspectionSection(
            'lights',
            'Lights',
            <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>,
            handleLightsChange
          )}

          {renderInspectionSection(
            'wheelsTires',
            'Wheels & Tires',
            <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>,
            handleWheelsTiresChange
          )}

          {renderInspectionSection(
            'exteriorComponents',
            'Exterior Components',
            <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>,
            handleExteriorComponentsChange
          )}

          {renderInspectionSection(
            'undercarriage',
            'Undercarriage',
            <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.55 23.55 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 4v12.75C16 17.86 15.75 18 15.375 18H9.75c-.375 0-.625-.14-.625-.25V4m12 0h-3.375c-.375 0-.625.14-.625.25v12.75C18 17.86 17.75 18 17.375 18H2.625C2.25 18 2 17.86 2 17.75V4m12 0h-3.375c-.375 0-.625.14-.625.25v12.75C15 17.86 14.75 18 14.375 18H-.625C-.25 18 0 17.86 0 17.75V4" />
            </svg>,
            handleUndercarriageChange
          )}

          {renderInspectionSection(
            'engine',
            'Engine',
            <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>,
            handleEngineChange
          )}

          {renderInspectionSection(
            'batteryAlternator',
            'Battery & Alternator',
            <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>,
            handleBatteryAlternatorChange
          )}

          {renderInspectionSection(
            'fluidInspection',
            'Fluid Inspection',
            <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>,
            handleFluidInspectionChange
          )}

          {renderInspectionSection(
            'beltsHoses',
            'Belts & Hoses',
            <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>,
            handleBeltsHosesChange
          )}

          {renderInspectionSection(
            'diagnosticTesting',
            'Diagnostic Testing',
            <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>,
            handleDiagnosticTestingChange
          )}

          {renderInspectionSection(
            'dashboardControls',
            'Dashboard & Controls',
            <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>,
            handleDashboardControlsChange
          )}

          {renderInspectionSection(
            'windowsMirrors',
            'Windows & Mirrors',
            <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>,
            handleWindowsMirrorsChange
          )}

          {renderInspectionSection(
            'safetyEquipment',
            'Safety Equipment',
            <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>,
            handleSafetyEquipmentChange
          )}

          {renderInspectionSection(
            'functionalTests',
            'Functional Tests',
            <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>,
            handleFunctionalTestsChange
          )}

          {renderInspectionSection(
            'interiorCondition',
            'Interior Condition',
            <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>,
            handleInteriorConditionChange
          )}

          {renderInspectionSection(
            'seatsUpholstery',
            'Seats & Upholstery',
            <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>,
            handleSeatsUpholsteryChange
          )}

          {renderInspectionSection(
            'drivingPerformance',
            'Driving Performance',
            <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>,
            handleDrivingPerformanceChange
          )}

          {renderInspectionSection(
            'audioEntertainment',
            'Audio/Entertainment System',
            <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>,
            handleAudioEntertainmentChange
          )}

          {renderInspectionSection(
            'emissionsEnvironmental',
            'Emissions & Environmental',
            <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>,
            handleEmissionsEnvironmentalChange
          )}

          {renderInspectionSection(
            'priceNegotiation',
            'Price Negotiation',
            <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>,
            handlePriceNegotiationChange
          )}

          {/* Summary and Recommendations */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('summary')}
              className="w-full bg-gradient-to-r from-orange-50 to-gray-50 px-6 py-4 flex items-center justify-between hover:from-orange-100 hover:to-gray-100 transition-all duration-200"
            >
              <h2 className="text-base font-bold text-[#1f2a37] flex items-center gap-2">
                <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Summary and Recommendations
              </h2>
              <svg
                className={`w-5 h-5 text-[#E54E3D] transition-transform duration-200 ${expandedSections.summary ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedSections.summary && (
              <div className="px-[30px] py-[40px] space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#64748b] mb-2" style={{ fontSize: '14px' }}>Overall Vehicle Condition</label>
                  <select
                    value={formData.summary.overallCondition}
                    onChange={(e) => setFormData(prev => ({ ...prev, summary: { ...prev.summary, overallCondition: e.target.value } }))}
                    className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                    style={{ fontSize: '14px' }}
                  >
                    <option value="">Select...</option>
                    {RATING_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#64748b] mb-2" style={{ fontSize: '14px' }}>Inspection Summary</label>
                  <textarea
                    value={formData.summary.inspectionSummary}
                    onChange={(e) => setFormData(prev => ({ ...prev, summary: { ...prev.summary, inspectionSummary: e.target.value } }))}
                    rows={6}
                    className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                    placeholder="Provide a comprehensive summary of the vehicle's condition based on inspection findings..."
                    style={{ fontSize: '14px' }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      // TODO: Implement AI summary generation
                      alert('AI summary generation will be implemented soon');
                    }}
                    className="mt-3 px-4 py-2 bg-[#E54E3D] text-white rounded-lg font-semibold hover:bg-[#d14130] transition-colors flex items-center gap-2"
                    style={{ fontSize: '14px' }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Generate Summary from Inspection Data
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#64748b] mb-2" style={{ fontSize: '14px' }}>Recommendations</label>
                  <select
                    value={formData.summary.recommendations}
                    onChange={(e) => setFormData(prev => ({ ...prev, summary: { ...prev.summary, recommendations: e.target.value } }))}
                    className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                    style={{ fontSize: '14px' }}
                  >
                    <option value="">Select...</option>
                    <option value="purchase-recommended">Purchase Recommended</option>
                    <option value="purchase-with-caution">Purchase with Caution</option>
                    <option value="negotiate-price">Negotiate Price</option>
                    <option value="major-repairs-needed">Major Repairs Needed</option>
                    <option value="not-recommended">Not Recommended</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#64748b] mb-2" style={{ fontSize: '14px' }}>Additional notes or explanations for your recommendation</label>
                  <textarea
                    value={formData.summary.recommendationNotes}
                    onChange={(e) => setFormData(prev => ({ ...prev, summary: { ...prev.summary, recommendationNotes: e.target.value } }))}
                    rows={4}
                    className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                    placeholder="Add additional notes..."
                    style={{ fontSize: '14px' }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Value Assessment */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('valueAssessment')}
              className="w-full bg-gradient-to-r from-orange-50 to-gray-50 px-6 py-4 flex items-center justify-between hover:from-orange-100 hover:to-gray-100 transition-all duration-200"
            >
              <h2 className="text-base font-bold text-[#1f2a37] flex items-center gap-2">
                <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Value Assessment
              </h2>
              <svg
                className={`w-5 h-5 text-[#E54E3D] transition-transform duration-200 ${expandedSections.valueAssessment ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedSections.valueAssessment && (
              <div className="px-[30px] py-[40px] space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#64748b] mb-2" style={{ fontSize: '14px' }}>Select value assessment</label>
                  <select
                    value={formData.valueAssessment.assessment}
                    onChange={(e) => setFormData(prev => ({ ...prev, valueAssessment: { ...prev.valueAssessment, assessment: e.target.value } }))}
                    className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                    style={{ fontSize: '14px' }}
                  >
                    <option value="">Select...</option>
                    <option value="excellent-value">Excellent Value</option>
                    <option value="good-value">Good Value</option>
                    <option value="fair-value">Fair Value</option>
                    <option value="overpriced">Overpriced</option>
                    <option value="undervalued">Undervalued</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#64748b] mb-2" style={{ fontSize: '14px' }}>Additional notes on vehicle value and price considerations</label>
                  <textarea
                    value={formData.valueAssessment.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, valueAssessment: { ...prev.valueAssessment, notes: e.target.value } }))}
                    rows={6}
                    className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
                    placeholder="Add notes on value assessment..."
                    style={{ fontSize: '14px' }}
                  />
                </div>
              </div>
            )}
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
