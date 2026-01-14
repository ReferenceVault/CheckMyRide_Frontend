'use client';

import { useParams } from 'next/navigation';
import {
  BodyConditionItem,
  ROUTINE_BODY_GLASS_ITEMS,
  ROUTINE_LIGHTS_ITEMS,
  ROUTINE_TIRES_ITEMS,
  ROUTINE_FLUID_LEVELS_ITEMS,
  ROUTINE_BATTERY_ITEMS,
  ROUTINE_BELTS_HOSES_ITEMS,
  ROUTINE_ENGINE_COMPONENTS_ITEMS,
  ROUTINE_BRAKES_ITEMS,
  ROUTINE_ENGINE_ITEMS,
  ROUTINE_STEERING_SUSPENSION_ITEMS,
  ROUTINE_COMPUTER_DIAGNOSIS_ITEMS,
  ROUTINE_CONTROLS_ITEMS,
  ROUTINE_SAFETY_SYSTEMS_ITEMS,
  ROUTINE_ROAD_TEST_RESULTS_ITEMS,
  ROUTINE_CUSTOMER_CONCERNS_ITEMS,
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
    key: 'bodyGlass',
    title: 'Body & Glass',
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
    key: 'tires',
    title: 'Tires',
    icon: (
      <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    key: 'fluidLevels',
    title: 'Fluid Levels',
    icon: (
      <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
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
    key: 'beltsHoses',
    title: 'Belts & Hoses',
    icon: (
      <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    key: 'engineComponents',
    title: 'Engine Components',
    icon: (
      <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    key: 'brakes',
    title: 'Brakes',
    icon: (
      <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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
    key: 'steeringSuspension',
    title: 'Steering & Suspension',
    icon: (
      <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    key: 'computerDiagnosis',
    title: 'Computer Diagnosis',
    icon: (
      <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    key: 'controls',
    title: 'Controls',
    icon: (
      <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  },
  {
    key: 'safetySystems',
    title: 'Safety Systems',
    icon: (
      <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    key: 'roadTestResults',
    title: 'Road Test Results',
    icon: (
      <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    key: 'customerConcerns',
    title: 'Customer Concerns',
    icon: (
      <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
];

const SECTION_KEYS = SECTION_CONFIG.map(s => s.key);

export default function RoutineInspectionPage() {
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
    bodyGlass: ROUTINE_BODY_GLASS_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
    lights: ROUTINE_LIGHTS_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
    tires: ROUTINE_TIRES_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
    fluidLevels: ROUTINE_FLUID_LEVELS_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
    battery: ROUTINE_BATTERY_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
    beltsHoses: ROUTINE_BELTS_HOSES_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
    engineComponents: ROUTINE_ENGINE_COMPONENTS_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
    brakes: ROUTINE_BRAKES_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
    engine: ROUTINE_ENGINE_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
    steeringSuspension: ROUTINE_STEERING_SUSPENSION_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
    computerDiagnosis: ROUTINE_COMPUTER_DIAGNOSIS_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
    controls: ROUTINE_CONTROLS_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
    safetySystems: ROUTINE_SAFETY_SYSTEMS_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
    roadTestResults: ROUTINE_ROAD_TEST_RESULTS_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
    customerConcerns: ROUTINE_CUSTOMER_CONCERNS_ITEMS.map(item => ({ item, rating: '' as const, notes: '' })),
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
    bodyGlass: false,
    lights: false,
    tires: false,
    fluidLevels: false,
    battery: false,
    beltsHoses: false,
    engineComponents: false,
    brakes: false,
    engine: false,
    steeringSuspension: false,
    computerDiagnosis: false,
    controls: false,
    safetySystems: false,
    roadTestResults: false,
    customerConcerns: false,
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
    defaultInspectionType: 'routine',
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
        inspectionTypeLabel={INSPECTION_TYPES.find(t => t.value === selectedInspectionType)?.label || 'Routine Check-Up'}
        reportStatus={reportStatus}
        onInspectionTypeChange={handleInspectionTypeChange}
        availableTypes={INSPECTION_TYPES}
      />

      <ProgressIndicator progress={calculateFormProgress()} />

      <div className="max-w-7xl mx-auto p-6">
        <ErrorMessage error={error} validationErrors={validationErrors} />
        <SuccessMessage success={success} isAdmin={isAdmin} />

        <form onSubmit={handleSubmit} className={`space-y-6 ${(reportStatus === 'complete' && !isAdmin) ? 'opacity-50 pointer-events-none' : ''}`}>
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
            showRecommendations={false}
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
