import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { BodyConditionItem } from '../types';
import { isAdminUser } from '../utils/auth';

// Helper function to get auth token
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  // Try admin token first
  const adminToken = localStorage.getItem('adminToken');
  if (adminToken) return adminToken;
  // Fallback to regular token
  return localStorage.getItem('token');
};

// Helper function to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

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
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string[] }>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [booking, setBooking] = useState<any>(null);
  const [selectedInspectionType, setSelectedInspectionType] = useState<string>(defaultInspectionType);
  const [formData, setFormData] = useState(initialFormData);
  const [reportStatus, setReportStatus] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    initialExpandedSections || {
      generalInfo: true,
      summary: false,
      valueAssessment: false,
    }
  );

  // Check if user is admin on mount
  useEffect(() => {
    setIsAdmin(isAdminUser());
  }, []);

  useEffect(() => {
    fetchBookingAndReport();
  }, [bookingId]);

  const fetchBookingAndReport = async () => {
    try {
      // Use the defaultInspectionType from URL path, not from booking
      const currentReportType = defaultInspectionType;
      
      const [bookingRes, reportRes] = await Promise.all([
        fetch(`${API_URL}/api/bookings/${bookingId}`),
        fetch(`${API_URL}/api/reports/booking/${bookingId}?reportType=${currentReportType}`).catch(() => null),
      ]);

      if (!bookingRes.ok) {
        throw new Error('Booking not found');
      }

      const bookingData = await bookingRes.json();
      setBooking(bookingData.booking);
      setSelectedInspectionType(currentReportType);

      const initializedFormData = onFormDataInit
        ? onFormDataInit(bookingData.booking)
        : initialFormData;

      setFormData(initializedFormData);

      if (reportRes && reportRes.ok) {
        const reportData = await reportRes.json();
        if (reportData.report) {
          // Set report status
          setReportStatus(reportData.report.status || null);
          
          const userIsAdmin = isAdminUser();
          
          // Admin users: always populate form data and allow editing, regardless of status
          // Normal users: only populate and allow editing when status is 'draft'
          if (!userIsAdmin && reportData.report.status === 'complete') {
            // Normal user with completed report - don't populate, form will be disabled
            return;
          }
          
          // Populate the form with existing data (for both admin and normal users with draft)
          setFormData((prev: any) => {
            const updated = { ...prev };
            
            // Update generalInfo
            if (reportData.report.generalInfo) {
              updated.generalInfo = {
                ...prev.generalInfo,
                ...reportData.report.generalInfo,
                appointmentDate: reportData.report.generalInfo.appointmentDate
                  ? new Date(reportData.report.generalInfo.appointmentDate).toISOString().split('T')[0]
                  : prev.generalInfo.appointmentDate,
              };
            }
            
            // Update sections from the sections object or directly from report
            sectionKeys.forEach((key) => {
              if (reportData.report.sections?.[key]?.length > 0) {
                updated[key] = reportData.report.sections[key];
              } else if (reportData.report[key]?.length > 0) {
                // Fallback for old structure
                updated[key] = reportData.report[key];
              }
            });

            // Update summary
            if (reportData.report.summary) {
              updated.summary = reportData.report.summary;
            }
            
            // Update valueAssessment
            if (reportData.report.valueAssessment) {
              updated.valueAssessment = reportData.report.valueAssessment;
            }

            // Update priceNegotiation (object structure, not array)
            if (reportData.report.priceNegotiation) {
              updated.priceNegotiation = reportData.report.priceNegotiation;
            } else if (reportData.report.sections?.priceNegotiation) {
              updated.priceNegotiation = reportData.report.sections.priceNegotiation;
            }

            // Update photos
            if (reportData.report.photos && Array.isArray(reportData.report.photos)) {
              updated.photos = reportData.report.photos;
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
      // Skip priceNegotiation as it's an object, not an array
      if (section === 'priceNegotiation') {
        return;
      }
      const sectionData = formData[section] as BodyConditionItem[];
      if (Array.isArray(sectionData)) {
      sectionData.forEach((item) => {
        totalFields++;
        if (item.rating && item.rating.trim() !== '') {
          filledFields++;
        }
      });
      }
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
      // Extract sections from formData
      const { generalInfo, summary, valueAssessment, priceNegotiation, photos, ...sections } = formData;
      
      // Build sections object (only include arrays that are sections)
      const sectionsData: { [key: string]: any[] } = {};
      sectionKeys.forEach((key) => {
        if (sections[key] && Array.isArray(sections[key])) {
          sectionsData[key] = sections[key];
        }
      });

      const response = await fetch(`${API_URL}/api/reports/booking/${bookingId}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          reportType: defaultInspectionType,
          status: 'draft',
          generalInfo: {
            ...generalInfo,
            appointmentDate: new Date(generalInfo.appointmentDate).toISOString(),
          },
          summary,
          valueAssessment,
          priceNegotiation,
          photos: photos || [],
          ...sectionsData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors && Array.isArray(errorData.errors)) {
          // Parse and format error messages for better UX
          const formattedErrors = errorData.errors.map((err: string) => {
            // Remove technical prefixes like "Path `field`" and make it user-friendly
            return err.replace(/Path `[^`]+` /g, '').replace(/generalInfo\./g, '').replace(/summary\./g, '').replace(/valueAssessment\./g, '');
          });
          setValidationErrors(formattedErrors);
          
          // Also map errors to specific fields for field-level display
          const mappedFieldErrors: { [key: string]: string[] } = {};
          errorData.errors.forEach((err: string) => {
            // Extract field name from error message
            if (err.includes('generalInfo.inspectorName')) {
              if (!mappedFieldErrors.generalInfo) mappedFieldErrors.generalInfo = [];
              mappedFieldErrors.generalInfo.push('Inspector Name is required');
            } else if (err.includes('generalInfo.clientName')) {
              if (!mappedFieldErrors.generalInfo) mappedFieldErrors.generalInfo = [];
              mappedFieldErrors.generalInfo.push('Client Name is required');
            } else if (err.includes('generalInfo.email')) {
              if (!mappedFieldErrors.generalInfo) mappedFieldErrors.generalInfo = [];
              mappedFieldErrors.generalInfo.push('Email is required');
            } else if (err.includes('generalInfo.phone')) {
              if (!mappedFieldErrors.generalInfo) mappedFieldErrors.generalInfo = [];
              mappedFieldErrors.generalInfo.push('Phone is required');
            } else if (err.includes('generalInfo.appointmentDate')) {
              if (!mappedFieldErrors.generalInfo) mappedFieldErrors.generalInfo = [];
              mappedFieldErrors.generalInfo.push('Appointment Date is required');
            } else if (err.includes('generalInfo.inspectionTime')) {
              if (!mappedFieldErrors.generalInfo) mappedFieldErrors.generalInfo = [];
              mappedFieldErrors.generalInfo.push('Inspection Time is required');
            } else if (err.includes('summary.overallCondition')) {
              if (!mappedFieldErrors.summary) mappedFieldErrors.summary = [];
              mappedFieldErrors.summary.push('Overall Vehicle Condition is required');
            } else if (err.includes('summary.inspectionSummary')) {
              if (!mappedFieldErrors.summary) mappedFieldErrors.summary = [];
              mappedFieldErrors.summary.push('Inspection Summary is required');
            } else if (err.includes('summary.recommendations')) {
              if (!mappedFieldErrors.summary) mappedFieldErrors.summary = [];
              mappedFieldErrors.summary.push('Recommendations is required');
            } else if (err.includes('valueAssessment.assessment')) {
              if (!mappedFieldErrors.valueAssessment) mappedFieldErrors.valueAssessment = [];
              mappedFieldErrors.valueAssessment.push('Value Assessment is required');
            }
          });
          
          if (Object.keys(mappedFieldErrors).length > 0) {
            setFieldErrors(mappedFieldErrors);
            // Auto-expand sections with errors
            setExpandedSections((prev) => {
              const updated = { ...prev };
              Object.keys(mappedFieldErrors).forEach((section) => {
                updated[section] = true;
              });
              return updated;
            });
          }
          
          // Scroll to error message after state updates
          setTimeout(() => {
            const errorElement = document.getElementById('error-message');
            if (errorElement) {
              errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 100);
          
          throw new Error('Please fix the validation errors below');
        }
        throw new Error(errorData.message || 'Failed to save draft');
      }

      setSuccess('Draft saved successfully!');
      // Scroll to success message after state updates
      setTimeout(() => {
        const successElement = document.getElementById('success-message');
        if (successElement) {
          successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      // Keep message visible for 10 seconds
      setTimeout(() => setSuccess(null), 10000);
    } catch (error: any) {
      setError(error.message || 'Failed to save draft');
      // Scroll to error message after state updates
      setTimeout(() => {
        const errorElement = document.getElementById('error-message');
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setValidationErrors([]);
    setFieldErrors({});

    const frontendErrors = validateForm();
    if (frontendErrors.length > 0) {
      setValidationErrors(frontendErrors);
      setIsSubmitting(false);
      // Scroll to error message after state updates
      setTimeout(() => {
        const errorElement = document.getElementById('error-message');
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      return;
    }

    try {
      // Extract sections from formData
      const { generalInfo, summary, valueAssessment, priceNegotiation, photos, ...sections } = formData;
      
      // Build sections object (only include arrays that are sections)
      const sectionsData: { [key: string]: any[] } = {};
      sectionKeys.forEach((key) => {
        if (sections[key] && Array.isArray(sections[key])) {
          sectionsData[key] = sections[key];
        }
      });

      // Call submit API directly (it will save and validate)
      const submitResponse = await fetch(`${API_URL}/api/reports/booking/${bookingId}/submit`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          reportType: defaultInspectionType,
          status: 'draft',
          generalInfo: {
            ...generalInfo,
            appointmentDate: new Date(generalInfo.appointmentDate).toISOString(),
          },
          summary,
          valueAssessment,
          priceNegotiation,
          photos: photos || [],
          ...sectionsData,
        }),
      });

      if (!submitResponse.ok) {
        const errorData = await submitResponse.json();
        if (errorData.errors && Array.isArray(errorData.errors)) {
          setValidationErrors(errorData.errors);
          
          // Map errors to specific sections/fields
          const mappedErrors: { [key: string]: string[] } = {};
          const sectionsToExpand: string[] = [];
          
          errorData.errors.forEach((err: string) => {
            if (err.includes('Overall Vehicle Condition') || err.includes('Inspection Summary') || err.includes('Recommendations')) {
              if (!mappedErrors.summary) mappedErrors.summary = [];
              mappedErrors.summary.push(err);
              if (!sectionsToExpand.includes('summary')) sectionsToExpand.push('summary');
            } else if (err.includes('Value Assessment')) {
              if (!mappedErrors.valueAssessment) mappedErrors.valueAssessment = [];
              mappedErrors.valueAssessment.push(err);
              if (!sectionsToExpand.includes('valueAssessment')) sectionsToExpand.push('valueAssessment');
            } else if (err.includes('Client Name') || err.includes('Email') || err.includes('Phone') || err.includes('Appointment') || err.includes('Inspector Name')) {
              if (!mappedErrors.generalInfo) mappedErrors.generalInfo = [];
              mappedErrors.generalInfo.push(err);
              if (!sectionsToExpand.includes('generalInfo')) sectionsToExpand.push('generalInfo');
            }
          });
          
          setFieldErrors(mappedErrors);
          
          // Auto-expand sections with errors
          sectionsToExpand.forEach(section => {
            if (!expandedSections[section]) {
              toggleSection(section);
            }
          });
          
          // Scroll to error message after state updates
          setTimeout(() => {
            const errorElement = document.getElementById('error-message');
            if (errorElement) {
              errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 100);
          
          throw new Error(errorData.message || 'Validation failed');
        }
        throw new Error(errorData.message || 'Failed to submit report');
      }

      setSuccess('Report submitted successfully!');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Only redirect normal users, admins stay on the page
      if (!isAdmin) {
        setTimeout(() => {
          router.push('/');
        }, 5000);
      }
    } catch (error: any) {
      setError(error.message || 'Failed to submit report');
      // Scroll to error message after state updates
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

  return {
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
  };
}

