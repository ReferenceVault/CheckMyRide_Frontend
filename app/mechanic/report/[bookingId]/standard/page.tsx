'use client';

import { useParams } from 'next/navigation';
import {
  BodyConditionItem,
  BODY_CONDITION_ITEMS,
  LIGHTS_ITEMS,
  STANDARD_WHEELS_TIRES_ITEMS,
  EXTERIOR_COMPONENTS_ITEMS,
  UNDERCARRIAGE_ITEMS,
  ENGINE_ITEMS,
  BATTERY_ITEMS,
  FLUID_INSPECTION_ITEMS,
  DASHBOARD_CONTROLS_ITEMS,
  WINDOWS_MIRRORS_ITEMS,
  SAFETY_EQUIPMENT_ITEMS,
  FUNCTIONAL_TESTS_ITEMS,
  INTERIOR_CONDITION_ITEMS,
  ROAD_TEST_RESULTS_ITEMS,
} from '../types';
import { useInspectionForm } from '../hooks/useInspectionForm';
import InspectionHeader from '../components/InspectionHeader';
import ProgressIndicator from '../components/ProgressIndicator';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';
import GeneralInfoSection from '../components/GeneralInfoSection';
import RatingGuidelines from '../components/RatingGuidelines';
import InspectionSection from '../components/InspectionSection';
import SummarySection from '../components/SummarySection';
import VehiclePhotos from '../components/VehiclePhotos';
import Disclaimer from '../components/Disclaimer';
import FormActions from '../components/FormActions';
import ReportSubmittedMessage from '../components/ReportSubmittedMessage';

const INSPECTION_TYPES = [
  { value: 'standard', label: 'Standard Inspection' },
  { value: 'enhanced', label: 'Enhanced Inspection' },
  { value: 'full-spectrum', label: 'Full-Spectrum Inspection' },
  { value: 'routine', label: 'Routine Check-Up' },
];

const SECTION_CONFIG = [
  {
    key: 'bodyCondition',
    title: 'Body Condition',
    icon: (
      <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    key: 'lights',
    title: 'Lights',
    icon: (
      <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    key: 'wheelsTires',
    title: 'Wheels & Tires',
    icon: (
      <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.55 23.55 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 4v12.75C16 17.86 15.75 18 15.375 18H9.75c-.375 0-.625-.14-.625-.25V4m12 0h-3.375c-.375 0-.625.14-.625.25v12.75C18 17.86 17.75 18 17.375 18H2.625C2.25 18 2 17.86 2 17.75V4m12 0h-3.375c-.375 0-.625.14-.625.25v12.75C15 17.86 14.75 18 14.375 18H-.625C-.25 18 0 17.86 0 17.75V4" />
      </svg>
    ),
  },
  {
    key: 'exteriorComponents',
    title: 'Exterior Components',
    icon: (
      <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    key: 'undercarriage',
    title: 'Undercarriage',
    icon: (
      <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.55 23.55 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 4v12.75C16 17.86 15.75 18 15.375 18H9.75c-.375 0-.625-.14-.625-.25V4m12 0h-3.375c-.375 0-.625.14-.625.25v12.75C18 17.86 17.75 18 17.375 18H2.625C2.25 18 2 17.86 2 17.75V4m12 0h-3.375c-.375 0-.625.14-.625.25v12.75C15 17.86 14.75 18 14.375 18H-.625C-.25 18 0 17.86 0 17.75V4" />
      </svg>
    ),
  },
  {
    key: 'engine',
    title: 'Engine',
    icon: (
      <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    key: 'battery',
    title: 'Battery',
    icon: (
      <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    key: 'fluidInspection',
    title: 'Fluid Inspection',
    icon: (
      <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    key: 'dashboardControls',
    title: 'Dashboard & Controls',
    icon: (
      <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    key: 'windowsMirrors',
    title: 'Windows & Mirrors',
    icon: (
      <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    key: 'safetyEquipment',
    title: 'Safety Equipment',
    icon: (
      <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    key: 'functionalTests',
    title: 'Functional Tests',
    icon: (
      <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    key: 'interiorCondition',
    title: 'Interior Condition',
    icon: (
      <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    key: 'drivingPerformance',
    title: 'Road Test Results',
    icon: (
      <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const SECTION_KEYS = SECTION_CONFIG.map(s => s.key);

export default function StandardInspectionPage() {
  const params = useParams();
  const bookingId = params?.bookingId as string;

  const initialFormData = {
    generalInfo: {
      clientName: '',
      email: '',
      phone: '',
      appointmentDate: '',
      inspectionTime: '',
      inspectorName: '',
        },
        bodyCondition: BODY_CONDITION_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        lights: LIGHTS_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        wheelsTires: STANDARD_WHEELS_TIRES_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        exteriorComponents: EXTERIOR_COMPONENTS_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        undercarriage: UNDERCARRIAGE_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        engine: ENGINE_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        battery: BATTERY_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        fluidInspection: FLUID_INSPECTION_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        dashboardControls: DASHBOARD_CONTROLS_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        windowsMirrors: WINDOWS_MIRRORS_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        safetyEquipment: SAFETY_EQUIPMENT_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        functionalTests: FUNCTIONAL_TESTS_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        interiorCondition: INTERIOR_CONDITION_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        drivingPerformance: ROAD_TEST_RESULTS_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
        summary: {
          overallCondition: '',
          inspectionSummary: '',
          recommendations: '',
          recommendationNotes: '',
        },
        photos: Array(12).fill(''),
  };

  const onFormDataInit = (booking: any) => ({
    ...initialFormData,
          generalInfo: {
      clientName: booking.personalInfo?.fullName || '',
      email: booking.personalInfo?.email || '',
      phone: booking.personalInfo?.phone || '',
      appointmentDate: booking.appointmentDetails?.preferredDate
        ? new Date(booking.appointmentDetails.preferredDate).toISOString().split('T')[0]
        : '',
      inspectionTime: booking.appointmentDetails?.preferredTime || '',
      inspectorName: booking.assignedMechanic?.mechanicId?.firstName && booking.assignedMechanic?.mechanicId?.lastName
        ? `${booking.assignedMechanic.mechanicId.firstName} ${booking.assignedMechanic.mechanicId.lastName}`
        : '',
    },
  });

  const initialExpandedSections: Record<string, boolean> = {
    generalInfo: true,
    bodyCondition: false,
    lights: false,
    wheelsTires: false,
    exteriorComponents: false,
    undercarriage: false,
    engine: false,
    battery: false,
    fluidInspection: false,
    dashboardControls: false,
    windowsMirrors: false,
    safetyEquipment: false,
    functionalTests: false,
    interiorCondition: false,
    drivingPerformance: false,
    summary: false,
    vehiclePhotos: false,
  };

  const {
    isLoading,
    isSaving,
    isSubmitting,
    error,
    validationErrors,
    fieldErrors,
    success,
    booking,
    selectedInspectionType,
    formData,
    setFormData,
    expandedSections,
    toggleSection,
    handleInspectionTypeChange,
    createSectionHandler,
    calculateFormProgress,
    handleSaveDraft,
    handleSubmit,
    reportStatus,
    isAdmin,
  } = useInspectionForm({
    bookingId,
    defaultInspectionType: 'standard',
    initialFormData,
    sectionKeys: SECTION_KEYS,
    initialExpandedSections,
    onFormDataInit,
  });

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

  // Show message if report is already submitted (only for normal users)
  if (reportStatus === 'complete' && !isAdmin) {
    return <ReportSubmittedMessage bookingId={bookingId} />;
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <InspectionHeader
        bookingId={bookingId}
        inspectionType={selectedInspectionType}
        inspectionTypeLabel={INSPECTION_TYPES.find(t => t.value === selectedInspectionType)?.label || 'Standard Inspection'}
        onInspectionTypeChange={handleInspectionTypeChange}
        availableTypes={INSPECTION_TYPES}
      />

      <ProgressIndicator progress={calculateFormProgress()} />

      <div className="max-w-7xl mx-auto p-6">
        <ErrorMessage error={error} validationErrors={validationErrors} />
        <SuccessMessage success={success} />

        <form onSubmit={handleSubmit} className={`space-y-6 ${success || (reportStatus === 'complete' && !isAdmin) ? 'opacity-50 pointer-events-none' : ''}`}>
          <GeneralInfoSection
            generalInfo={formData.generalInfo}
            isExpanded={expandedSections.generalInfo || false}
            onToggle={() => toggleSection('generalInfo')}
            fieldErrors={fieldErrors.generalInfo || []}
          />

          <RatingGuidelines />

          {SECTION_CONFIG.map((section) => {
            const handler = createSectionHandler(section.key);
            return (
              <InspectionSection
                key={section.key}
                sectionKey={section.key}
                title={section.title}
                icon={section.icon}
                sectionData={formData[section.key] as BodyConditionItem[]}
                isExpanded={expandedSections[section.key] || false}
                onToggle={() => toggleSection(section.key)}
                onChange={handler}
              />
            );
          })}

          <SummarySection
            summary={formData.summary}
            isExpanded={expandedSections.summary || false}
            onToggle={() => toggleSection('summary')}
            onSummaryChange={(field, value) => {
              setFormData((prev: any) => ({
                ...prev,
                summary: { ...prev.summary, [field]: value },
              }));
            }}
            errors={fieldErrors.summary || []}
          />

          <VehiclePhotos
            photos={formData.photos || []}
            reportType={selectedInspectionType}
            onPhotosChange={(photos) => {
              setFormData((prev: any) => ({
                ...prev,
                photos,
              }));
            }}
            isExpanded={expandedSections.vehiclePhotos || false}
            onToggle={() => toggleSection('vehiclePhotos')}
            isReadOnly={reportStatus === 'complete' && !isAdmin}
          />

          <Disclaimer />

          <FormActions
            onSaveDraft={handleSaveDraft}
            isSaving={isSaving}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
}
