import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { BodyConditionItem } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface GeneralInfo {
  clientName: string;
  email: string;
  phone: string;
  appointmentDate: string;
  inspectionTime: string;
  inspectorName: string;
}

interface Summary {
  overallCondition: string;
  inspectionSummary: string;
  recommendations: string;
  recommendationNotes: string;
}

interface ValueAssessment {
  assessment: string;
  notes: string;
}

interface UseInspectionFormOptions {
  bookingId: string;
  defaultInspectionType: string;
  initialFormData: any;
  sectionKeys: string[];
  initialExpandedSections?: Record<string, boolean>;
  onFormDataInit?: (booking: any) => any;
}

export function useInspectionForm({
  bookingId,
  defaultInspectionType,
  initialFormData,
  sectionKeys,
  initialExpandedSections,
  onFormDataInit,
}: UseInspectionFormOptions) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string | null>(null);
  const [booking, setBooking] = useState<any>(null);
  const [selectedInspectionType, setSelectedInspectionType] = useState<string>(defaultInspectionType);
  const [formData, setFormData] = useState(initialFormData);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    initialExpandedSections || {
      generalInfo: true,
      summary: false,
      valueAssessment: false,
    }
  );

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
      setSelectedInspectionType(bookingData.booking.inspectionDetails?.type || defaultInspectionType);

      const initializedFormData = onFormDataInit
        ? onFormDataInit(bookingData.booking)
        : initialFormData;

      setFormData(initializedFormData);

      if (reportRes && reportRes.ok) {
        const reportData = await reportRes.json();
        if (reportData.report) {
          setFormData((prev: any) => {
            const updated = { ...prev };
            updated.generalInfo = { ...prev.generalInfo, ...reportData.report.generalInfo };
            
            sectionKeys.forEach((key) => {
              if (reportData.report[key]?.length > 0) {
                updated[key] = reportData.report[key];
              }
            });

            if (reportData.report.summary) {
              updated.summary = reportData.report.summary;
            }
            if (reportData.report.valueAssessment) {
              updated.valueAssessment = reportData.report.valueAssessment;
            }

            return updated;
          });
        }
      }
    } catch (error: any) {
      setError(error.message || 'Failed to load booking');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleInspectionTypeChange = (type: string) => {
    router.replace(`/mechanic/report/${bookingId}/${type}`);
  };

  const createSectionHandler = (section: string) => {
    return (index: number, field: 'rating' | 'notes', value: string) => {
      setFormData((prev: any) => {
        const sectionData = prev[section] as BodyConditionItem[];
        const newSectionData = [...sectionData];
        newSectionData[index] = { ...newSectionData[index], [field]: value };
        return { ...prev, [section]: newSectionData };
      });
    };
  };

  const calculateFormProgress = (): number => {
    let totalFields = 0;
    let filledFields = 0;

    const generalInfoRequired = ['clientName', 'email', 'phone', 'appointmentDate', 'inspectionTime', 'inspectorName'];
    totalFields += generalInfoRequired.length;
    generalInfoRequired.forEach((field) => {
      if (formData.generalInfo[field as keyof GeneralInfo]?.toString().trim()) {
        filledFields++;
      }
    });

    sectionKeys.forEach((section) => {
      const sectionData = formData[section] as BodyConditionItem[];
      sectionData.forEach((item) => {
        totalFields++;
        if (item.rating && item.rating.trim() !== '') {
          filledFields++;
        }
      });
    });

    return totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
  };

  const validateForm = (): string[] => {
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

    const frontendErrors = validateForm();
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

  return {
    isLoading,
    isSaving,
    isSubmitting,
    error,
    validationErrors,
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
  };
}

