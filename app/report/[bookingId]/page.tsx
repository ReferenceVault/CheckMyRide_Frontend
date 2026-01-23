'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface BodyConditionItem {
  item: string;
  rating: 'excellent' | 'good' | 'fair' | 'needs-attention' | 'critical' | 'n/a' | '';
  notes: string;
}

interface InspectionItem {
  component: string;
  condition: string;
  notes: string;
}

interface InspectionCategory {
  category: string;
  items: InspectionItem[];
}

interface ReportData {
  generalInfo: {
    clientName: string;
    email: string;
    phone: string;
    appointmentDate: string;
    inspectionTime: string;
    inspectorName: string;
    sellerType?: string;
    sellerName?: string;
    inspectionLocation?: string;
  };
  vehicleInfo: {
    year: number;
    make: string;
    model: string;
    trim?: string;
    vin?: string;
    mileage?: number;
    color?: string;
    transmission?: string;
    drivetrain?: string;
    bodyStyle?: string;
    fuelType?: string;
  };
  bodyCondition?: BodyConditionItem[];
  summary: {
    notesAndComments?: string;
    // Legacy fields for backward compatibility (deprecated - calculated automatically)
    overallCondition?: string;
    inspectionSummary?: string;
    recommendations?: string;
    recommendationNotes?: string;
  };
  detailedInspection?: InspectionCategory[];
  valueAssessment?: {
    assessment: string;
    notes?: string;
  };
  photos?: string[];
  reportMetadata?: {
    reportGenerated: string;
    reportId: string;
  };
}

const RATING_LABELS: { [key: string]: string } = {
  'excellent': 'Excellent',
  'good': 'Good',
  'fair': 'Fair',
  'needs-attention': 'Needs Attention',
  'critical': 'Critical',
  'n/a': 'N/A',
};

const SECTION_TITLES: { [key: string]: string } = {
  'bodyCondition': 'Body Condition',
  'lights': 'Lights',
  'tires': 'Tires & Wheels',
  'wheelsTires': 'Tires & Wheels',
  'exteriorComponents': 'Exterior Components',
  'fluidInspection': 'Fluid Inspection',
  'dashboardControls': 'Dashboard Controls',
  'windowsMirrors': 'Windows Mirrors',
  'safetyEquipment': 'Safety Equipment',
  'functionalTests': 'Functional Tests',
  'interiorCondition': 'Interior Condition',
  'drivingPerformance': 'Driving Performance',
  'interior': 'Interior',
  'engine': 'Engine',
  'transmission': 'Transmission',
  'brakes': 'Brakes',
  'suspension': 'Suspension & Steering',
  'electrical': 'Electrical Systems',
  'bodyGlass': 'Body & Glass',
  'underHood': 'Under the Hood',
  'underCarriage': 'Undercarriage',
};

// Section order matching mechanic report order
const SECTION_ORDER = [
  'bodyCondition',
  'lights',
  'wheelsTires',
  'tires',
  'exteriorComponents',
  'undercarriage',
  'underCarriage',
  'engine',
  'battery',
  'fluidInspection',
  'fluidLevels',
  'dashboardControls',
  'windowsMirrors',
  'safetyEquipment',
  'functionalTests',
  'interiorCondition',
  'interior',
  'drivingPerformance',
  'transmission',
  'brakes',
  'suspension',
  'electrical',
  'bodyGlass',
  'underHood',
  'engineComponents',
  'beltsHoses',
  'computerDiagnosis',
  'roadTestResults',
  'customerConcerns',
  'seatsUpholstery',
  'diagnosticTesting',
];

// Function to format category names by adding spaces
const formatCategoryName = (categoryName: string): string => {
  if (!categoryName) return categoryName;
  
  // Mapping for specific category names that need spacing
  const categoryMapping: { [key: string]: string } = {
    'FLUIDLEVELS': 'FLUID LEVELS',
    'BELTSHOSES': 'BELTS HOSES',
    'ENGINECOMPONENTS': 'ENGINE COMPONENTS',
    'STEERINGSUSPENSION': 'STEERING SUSPENSION',
    'COMPUTERDIAGNOSIS': 'COMPUTER DIAGNOSIS',
    'SAFETYSYSTEMS': 'SAFETY SYSTEMS',
    'ROADTESTRESULTS': 'ROAD TEST RESULTS',
    'CUSTOMERCONCERNS': 'CUSTOMER CONCERNS',
    'SEATSUPHOLSTERY': 'SEATS UPHOLSTERY',
    'DIAGNOSTICTESTING': 'DIAGNOSTIC TESTING',
    'BATTERYALTERNATOR': 'BATTERY ALTERNATOR',
    'AUDIOENTERTAINMENT': 'AUDIO ENTERTAINMENT',
    'EMISSIONSENVIRONMENTAL': 'EMISSIONS ENVIRONMENTAL',
    'PRICENEGOTIATION': 'PRICE NEGOTIATION',
  };
  
  // Check if the category name (uppercase) is in our mapping
  const upperName = categoryName.toUpperCase();
  if (categoryMapping[upperName]) {
    return categoryMapping[upperName];
  }
  
  // If not in mapping, return as-is (already formatted)
  return categoryName;
};

// Function to render condition badge with color coding
const ConditionBadge = ({ condition }: { condition: string }) => {
  if (!condition) return <span>-</span>;
  
  const conditionLower = condition.toLowerCase();
  let bgColor = '';
  let textColor = '';
  let icon = null;
  let displayText = condition;

  // Determine badge style based on condition
  if (conditionLower.includes('excellent')) {
    bgColor = 'bg-green-100';
    textColor = 'text-green-800';
    icon = (
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    );
    displayText = 'Excellent';
  } else if (conditionLower.includes('good')) {
    bgColor = 'bg-green-100';
    textColor = 'text-green-800';
    icon = (
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    );
    displayText = 'Good';
  } else if (conditionLower.includes('fair')) {
    bgColor = 'bg-yellow-100';
    textColor = 'text-yellow-800';
    icon = (
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="3" />
      </svg>
    );
    displayText = 'Fair';
  } else if (conditionLower.includes('needs attention') || conditionLower.includes('attention') || conditionLower.includes('needs')) {
    bgColor = 'bg-orange-100';
    textColor = 'text-orange-800';
    icon = (
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    );
    displayText = 'Needs Attention';
  } else if (conditionLower.includes('critical')) {
    bgColor = 'bg-red-100';
    textColor = 'text-red-800';
    icon = (
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    );
    displayText = 'Critical';
  } else {
    // Default styling for unknown conditions
    bgColor = 'bg-gray-100';
    textColor = 'text-gray-800';
    displayText = condition;
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${bgColor} ${textColor}`}>
      {icon}
      {displayText}
    </span>
  );
};

export default function InspectionReportViewPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params?.bookingId as string;
  
  const [report, setReport] = useState<ReportData | null>(null);
  const [reportType, setReportType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is admin - only run on client side
    if (typeof window === 'undefined') {
      setIsAdmin(false);
      return;
    }
    
    const checkAdminStatus = () => {
      // Check admin token first (preferred method)
      const adminToken = localStorage.getItem('adminToken');
      const adminUserStr = localStorage.getItem('adminUser');
      
      if (adminToken && adminUserStr) {
        try {
          const adminUser = JSON.parse(adminUserStr);
          // Strictly check if user has admin role - must be exactly 'admin'
          if (
            adminUser && 
            typeof adminUser === 'object' && 
            adminUser.role === 'admin' &&
            adminUser.role !== 'user' &&
            adminUser.role !== 'mechanic'
          ) {
            console.log('Admin detected via adminToken:', adminUser);
            return true;
          } else {
            console.log('Not admin - adminUser role:', adminUser?.role);
          }
        } catch (error) {
          console.error('Error parsing admin user data:', error);
        }
      } else {
        console.log('No adminToken or adminUserStr found');
      }
      
      // Also check regular user token (in case admin uses regular login)
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          if (
            user && 
            typeof user === 'object' && 
            user.role === 'admin' &&
            user.role !== 'user' &&
            user.role !== 'mechanic'
          ) {
            console.log('Admin detected via regular token:', user);
            return true;
          } else {
            console.log('Not admin - user role:', user?.role);
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      } else {
        console.log('No token or userStr found');
      }
      
      return false;
    };
    
    const adminFound = checkAdminStatus();
    console.log('Final admin check result:', adminFound);
    setIsAdmin(adminFound);
  }, []);

  useEffect(() => {
    console.log('bookingId:', bookingId);
    if (!bookingId) return;

    const fetchReport = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch report
        const reportResponse = await fetch(`${API_URL}/api/reports/booking/${bookingId}`);
        if (!reportResponse.ok) {
          throw new Error('Failed to fetch report');
        }

        const reportData = await reportResponse.json();
        console.log('reportData:', reportData);
        if (!reportData.report) {
          setError('The inspection report for this booking is not available yet.');
          setLoading(false);
          return;
        }

        // Fetch booking for vehicle info
        const bookingResponse = await fetch(`${API_URL}/api/bookings/${bookingId}`);
        if (!bookingResponse.ok) {
          throw new Error('Failed to fetch booking');
        }
        const bookingData = await bookingResponse.json();

        // Transform API data to ReportData format
        const apiReport = reportData.report;
        const booking = bookingData.booking;
        
        // Store report type for edit functionality
        if (apiReport.reportType) {
          setReportType(apiReport.reportType);
        }

        // Transform sections
        const sections = apiReport.sections || {};
        const bodyCondition: BodyConditionItem[] = sections.bodyCondition || [];
        const detailedInspection: InspectionCategory[] = [];

        // Get all section keys except bodyCondition, sorted by SECTION_ORDER
        const sectionKeys = Object.keys(sections).filter(key => key !== 'bodyCondition');
        
        // Sort sections according to SECTION_ORDER
        const sortedSectionKeys = sectionKeys.sort((a, b) => {
          const indexA = SECTION_ORDER.indexOf(a);
          const indexB = SECTION_ORDER.indexOf(b);
          
          // If both are in the order array, sort by their position
          if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
          }
          // If only A is in the order array, A comes first
          if (indexA !== -1) {
            return -1;
          }
          // If only B is in the order array, B comes first
          if (indexB !== -1) {
            return 1;
          }
          // If neither is in the order array, maintain original order
          return 0;
        });

        // Convert other sections to detailedInspection format in sorted order
        sortedSectionKeys.forEach((key) => {
          if (Array.isArray(sections[key]) && sections[key].length > 0) {
            const sectionTitle = SECTION_TITLES[key] || key.charAt(0).toUpperCase() + key.slice(1);
            detailedInspection.push({
              category: sectionTitle.toUpperCase(),
              items: sections[key].map((item: any) => ({
                component: item.item || item.component || '',
                condition: item.rating ? RATING_LABELS[item.rating] || item.rating : item.condition || '',
                notes: item.notes || '',
              })),
            });
          }
        });

        const transformedReport: ReportData = {
          generalInfo: {
            clientName: apiReport.generalInfo?.clientName || '',
            email: apiReport.generalInfo?.email || '',
            phone: apiReport.generalInfo?.phone || '',
            appointmentDate: apiReport.generalInfo?.appointmentDate || '',
            inspectionTime: apiReport.generalInfo?.inspectionTime || '',
            inspectorName: apiReport.generalInfo?.inspectorName || '',
            inspectionLocation: booking?.appointmentDetails?.location || 'Mobile Inspection',
          },
          vehicleInfo: {
            year: booking?.vehicleInfo?.year || 0,
            make: booking?.vehicleInfo?.make || '',
            model: booking?.vehicleInfo?.model || '',
            trim: booking?.vehicleInfo?.trim,
            vin: booking?.vehicleInfo?.vin,
            mileage: booking?.vehicleInfo?.mileage,
            color: booking?.vehicleInfo?.color,
            transmission: booking?.vehicleInfo?.transmission,
            drivetrain: booking?.vehicleInfo?.drivetrain,
            bodyStyle: booking?.vehicleInfo?.bodyStyle,
            fuelType: booking?.vehicleInfo?.fuelType,
          },
          bodyCondition: bodyCondition.length > 0 ? bodyCondition : undefined,
          summary: {
            notesAndComments: apiReport.summary?.notesAndComments || '',
            // Legacy fields for backward compatibility
            overallCondition: apiReport.summary?.overallCondition,
            inspectionSummary: apiReport.summary?.inspectionSummary,
            recommendations: apiReport.summary?.recommendations,
            recommendationNotes: apiReport.summary?.recommendationNotes,
          },
          detailedInspection: detailedInspection.length > 0 ? detailedInspection : undefined,
          valueAssessment: apiReport.valueAssessment ? {
            assessment: apiReport.valueAssessment.assessment || '',
            notes: apiReport.valueAssessment.notes,
          } : undefined,
          photos: apiReport.photos && Array.isArray(apiReport.photos) ? apiReport.photos : undefined,
          reportMetadata: {
            reportGenerated: apiReport.createdAt 
              ? new Date(apiReport.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })
              : new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }),
            reportId: apiReport._id || '',
          },
        };

        setReport(transformedReport);
      } catch (err: any) {
        setError(err.message || 'Failed to load report');
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [bookingId]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    window.print();
  };

  const handleSendToCustomer = async () => {
    if (!bookingId) return;
    
    setIsSending(true);
    setSendError(null);
    setSendSuccess(false);
    
    try {
      // Get token from localStorage (check both adminToken and token)
      const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required. Please login again.');
      }
      
      const response = await fetch(`${API_URL}/api/reports/booking/${bookingId}/send-to-customer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send report to customer');
      }
      
      setSendSuccess(true);
      setTimeout(() => setSendSuccess(false), 5000);
    } catch (err: any) {
      setSendError(err.message || 'Failed to send report to customer');
      setTimeout(() => setSendError(null), 5000);
    } finally {
      setIsSending(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long',
      day: 'numeric' 
    });
  };

  const formatReportType = (type: string | null) => {
    if (!type) return 'INSPECTION REPORT';
    const typeMap: { [key: string]: string } = {
      'standard': 'Standard Inspection',
      'enhanced': 'Enhanced Inspection',
      'full-spectrum': 'Full-Spectrum Inspection',
      'routine': 'Routine Inspection',
    };
    return typeMap[type] || type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + ' Inspection';
  };

  const formatRecommendation = (rec: string) => {
    const labels: { [key: string]: string } = {
      'purchase-with-caution': 'Purchase with Caution',
      'do-not-purchase': 'Do Not Purchase',
      'not-recommended': 'Not Recommended',
      'recommended-with-minor-repairs': 'Recommended with Minor Repairs',
      'recommended': 'Recommended',
      'highly-recommended': 'Highly Recommended',
    };
    return labels[rec] || rec;
  };

  const formatValueAssessment = (assessment: string) => {
    const labels: { [key: string]: string } = {
      'excellent-value': 'Excellent Value',
      'good-value': 'Good Value',
      'fair-value': 'Fair Value',
      'overpriced': 'Overpriced',
      'undervalued': 'Undervalued',
    };
    return labels[assessment] || assessment;
  };

  const toRatingFromCondition = (condition: string): 'excellent' | 'good' | 'fair' | 'needs-attention' | 'critical' | null => {
    const lower = condition.toLowerCase();
    if (lower.includes('excellent')) return 'excellent';
    if (lower.includes('good')) return 'good';
    if (lower.includes('fair')) return 'fair';
    if (lower.includes('attention') || lower.includes('needs')) return 'needs-attention';
    if (lower.includes('critical')) return 'critical';
    return null;
  };

  // Helper function to convert rating to numeric score
  const ratingToScore = (rating: string): number => {
    const scoreMap: { [key: string]: number } = {
      'excellent': 100,
      'good': 80,
      'fair': 60,
      'needs-attention': 40,
      'critical': 20,
    };
    return scoreMap[rating.toLowerCase()] || 0;
  };

  const isSafetyCriticalItem = (category: string, item: string) => {
    const text = `${category} ${item}`.toLowerCase();
    const keywords = [
      'brake',
      'steering',
      'airbag',
      'air bag',
      'seat belt',
      'seatbelt',
      'srs',
      'safety equipment',
    ];
    return keywords.some((keyword) => text.includes(keyword));
  };

  const isSafetyRelatedItem = (category: string, item: string) => {
    const text = `${category} ${item}`.toLowerCase();
    const keywords = [
      'light',
      'headlight',
      'taillight',
      'signal',
      'indicator',
      'lamp',
      'tire',
      'tyre',
      'wheel',
      'rim',
    ];
    return keywords.some((keyword) => text.includes(keyword));
  };

  // Helper function to get worst rating from an array of ratings
  const getWorstRating = (ratings: string[]): string => {
    const priority = ['critical', 'needs-attention', 'fair', 'good', 'excellent'];
    for (const rating of priority) {
      if (ratings.some(r => r.toLowerCase() === rating)) {
        return rating;
      }
    }
    return 'fair';
  };

  const getConditionFromScore = (score: number): 'excellent' | 'good' | 'fair' | 'needs-attention' | 'critical' => {
    if (score >= 85) return 'excellent';
    if (score >= 70) return 'good';
    if (score >= 45) return 'fair';
    if (score >= 30) return 'needs-attention';
    return 'critical';
  };

  const getRecommendationFromMetrics = (
    overallScore: number,
    safetyScore: number,
    safetyCriticalIssueCount: number,
    safetyAttentionCount: number,
    safetyRelatedCriticalCount: number,
    nonSafetyCriticalCount: number,
    hasMinorIssues: boolean,
    safetyMinorWear: boolean
  ) => {
    if (safetyCriticalIssueCount > 0 || safetyAttentionCount >= 3) {
      return 'do-not-purchase';
    }
    if (safetyRelatedCriticalCount >= 2 || safetyScore < 30 || overallScore < 30) {
      return 'not-recommended';
    }
    if (
      safetyRelatedCriticalCount === 1 ||
      safetyAttentionCount >= 2 ||
      (overallScore >= 30 && overallScore <= 45) ||
      (safetyScore >= 30 && safetyScore <= 45) ||
      nonSafetyCriticalCount >= 2
    ) {
      return 'purchase-with-caution';
    }
    if (overallScore >= 85 && safetyScore >= 80) {
      return 'highly-recommended';
    }
    if (overallScore >= 70 && safetyScore >= 70 && !hasMinorIssues && !safetyMinorWear) {
      return 'recommended';
    }
    if (overallScore >= 70 && (hasMinorIssues || safetyMinorWear)) {
      return 'recommended-with-minor-repairs';
    }
    if (overallScore >= 70 && safetyScore >= 70) {
      return 'recommended';
    }
    return 'purchase-with-caution';
  };

  const getReportRatings = () => {
    if (!report) return [];
    const ratings: Array<{
      category: string;
      item: string;
      rating: 'excellent' | 'good' | 'fair' | 'needs-attention' | 'critical';
      notes?: string;
      group: 'safety-critical' | 'safety-related' | 'non-safety';
    }> = [];

    if (report.bodyCondition && report.bodyCondition.length > 0) {
      report.bodyCondition.forEach((item) => {
        const rating = item.rating;
        if (rating && rating !== 'n/a' && rating !== '') {
          const categoryName = 'Body Condition';
          const group = isSafetyCriticalItem(categoryName, item.item)
            ? 'safety-critical'
            : isSafetyRelatedItem(categoryName, item.item)
              ? 'safety-related'
              : 'non-safety';
          ratings.push({
            category: categoryName,
            item: item.item,
            rating: rating as 'excellent' | 'good' | 'fair' | 'needs-attention' | 'critical',
            notes: item.notes,
            group,
          });
        }
      });
    }

    if (report.detailedInspection && report.detailedInspection.length > 0) {
      report.detailedInspection.forEach((category) => {
        const categoryName = formatCategoryName(category.category);
        category.items.forEach((item) => {
          const rating = toRatingFromCondition(item.condition);
          if (rating) {
            const group = isSafetyCriticalItem(categoryName, item.component)
              ? 'safety-critical'
              : isSafetyRelatedItem(categoryName, item.component)
                ? 'safety-related'
                : 'non-safety';
            ratings.push({
              category: categoryName,
              item: item.component,
              rating,
              notes: item.notes,
              group,
            });
          }
        });
      });
    }

    return ratings;
  };

  const getReportMetrics = () => {
    const ratings = getReportRatings();
    const totalInspected = ratings.length;
    const overallScore = totalInspected > 0
      ? ratings.reduce((sum, r) => sum + ratingToScore(r.rating), 0) / totalInspected
      : 0;
    const safetyRatings = ratings.filter((r) => r.group !== 'non-safety');
    const safetyScore = safetyRatings.length > 0
      ? safetyRatings.reduce((sum, r) => sum + ratingToScore(r.rating), 0) / safetyRatings.length
      : 0;

    const safetyCriticalIssueCount = ratings.filter(
      (r) => r.group === 'safety-critical' && r.rating === 'critical'
    ).length;
    const safetyRelatedCriticalCount = ratings.filter(
      (r) => r.group === 'safety-related' && r.rating === 'critical'
    ).length;
    const safetyAttentionCount = ratings.filter(
      (r) => r.group !== 'non-safety' && r.rating === 'needs-attention'
    ).length;
    const nonSafetyCriticalCount = ratings.filter(
      (r) => r.group === 'non-safety' && r.rating === 'critical'
    ).length;
    const hasMinorIssues = ratings.some(
      (r) => r.rating === 'fair' || r.rating === 'needs-attention'
    );
    const safetyMinorWear = ratings.some(
      (r) =>
        r.group !== 'non-safety' &&
        (r.rating === 'fair' || r.rating === 'needs-attention')
    );

    return {
      ratings,
      totalInspected,
      overallScore,
      safetyScore,
      safetyCriticalIssueCount,
      safetyRelatedCriticalCount,
      safetyAttentionCount,
      nonSafetyCriticalCount,
      hasMinorIssues,
      safetyMinorWear,
    };
  };

  // Calculate category scores from report data
  const calculateCategoryScores = () => {
    if (!report) return [];
    const categories: Array<{ name: string; score: number; worstRating: string }> = [];

    // Process bodyCondition
    if (report.bodyCondition && report.bodyCondition.length > 0) {
      const ratings = report.bodyCondition
        .map(item => item.rating)
        .filter((rating): rating is 'excellent' | 'good' | 'fair' | 'needs-attention' | 'critical' => 
          Boolean(rating) && rating !== 'n/a' && rating !== ''
        );
      if (ratings.length > 0) {
        const scores = ratings.map(ratingToScore);
        const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        categories.push({
          name: 'Body Condition',
          score: Math.round(avgScore * 10) / 10,
          worstRating: getWorstRating(ratings),
        });
      }
    }

    // Process detailedInspection
    if (report.detailedInspection && report.detailedInspection.length > 0) {
      report.detailedInspection.forEach((category) => {
        const ratings = category.items
          .map(item => {
            // Convert condition text back to rating if possible
            const condition = item.condition.toLowerCase();
            if (condition.includes('excellent')) return 'excellent';
            if (condition.includes('good')) return 'good';
            if (condition.includes('fair')) return 'fair';
            if (condition.includes('attention') || condition.includes('needs')) return 'needs-attention';
            if (condition.includes('critical')) return 'critical';
            return null;
          })
          .filter((rating): rating is 'excellent' | 'good' | 'fair' | 'needs-attention' | 'critical' => 
            rating !== null
          );

        if (ratings.length > 0) {
          const scores = ratings.map(ratingToScore);
          const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
          categories.push({
            name: formatCategoryName(category.category),
            score: Math.round(avgScore * 10) / 10,
            worstRating: getWorstRating(ratings),
          });
        }
      });
    }

    return categories;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E54E3D] mx-auto mb-4"></div>
          <p className="text-[#64748b]">Loading report...</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-800 mb-2">Report Not Available</h2>
            <p className="text-red-700 mb-4">{error || 'The inspection report for this booking is not available yet.'}</p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2 bg-[#E54E3D] text-white rounded-lg font-semibold hover:bg-[#d14130] transition-colors"
            >
              Go Back Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* Report Content */}
      <div className="max-w-5xl mx-auto px-6 pb-12">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 py-2 px-[30px] print:py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src="/images/reportlogo.JPG" alt="Report Logo" className="h-[72px] w-auto object-contain sm:h-[92px]" />
              </div>
              <button className="bg-[#E54E3D] text-white px-6 py-3 rounded-full font-semibold uppercase tracking-wide hover:bg-[#d14130] transition-colors">
                {formatReportType(reportType)}
              </button>
            </div>
          </div>

          {/* Client Information and Inspection Details */}
          <div className="pt-6 px-[0.5px] print-section">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-t-lg overflow-hidden">
                <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                  <h3 className="text-sm font-bold text-[#1f2a37]">Client Information</h3>
                </div>
                <div className="px-4 py-3">
                  <p className="text-sm mb-2"><span className="text-[#64748b]">Name:</span> <span className="font-bold text-[#1f2a37]">{report.generalInfo.clientName}</span></p>
                  <p className="text-sm mb-2"><span className="text-[#64748b]">Email:</span> <span className="font-bold text-[#1f2a37]">{report.generalInfo.email}</span></p>
                  <p className="text-sm"><span className="text-[#64748b]">Phone:</span> <span className="font-bold text-[#1f2a37]">{report.generalInfo.phone}</span></p>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-t-lg overflow-hidden">
                <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                  <h3 className="text-sm font-bold text-[#1f2a37]">Inspection Details</h3>
                </div>
                <div className="px-4 py-3">
                  <p className="text-sm mb-2"><span className="text-[#64748b]">Date:</span> <span className="font-bold text-[#1f2a37]">{formatDate(report.generalInfo.appointmentDate)}</span></p>
                  <p className="text-sm mb-2"><span className="text-[#64748b]">Inspector:</span> <span className="font-bold text-[#1f2a37]">{report.generalInfo.inspectorName}</span></p>
                  {report.generalInfo.inspectionLocation && (
                    <p className="text-sm"><span className="text-[#64748b]">Location:</span> <span className="font-bold text-[#1f2a37]">{report.generalInfo.inspectionLocation}</span></p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          {report.vehicleInfo.make && (
            <div className="pt-6 px-[0.5px] print-section">
              <div className="bg-white border border-gray-200 rounded-t-lg overflow-hidden">
                <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                  <h3 className="text-sm font-bold text-[#1f2a37]">Vehicle Information</h3>
                </div>
                <div className="px-4 py-3">
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {report.vehicleInfo.year && (
                      <p className="text-sm"><span className="text-[#64748b]">Year:</span> <span className="font-bold text-[#1f2a37]">{report.vehicleInfo.year}</span></p>
                    )}
                    {report.vehicleInfo.make && (
                      <p className="text-sm"><span className="text-[#64748b]">Make:</span> <span className="font-bold text-[#1f2a37]">{report.vehicleInfo.make}</span></p>
                    )}
                    {report.vehicleInfo.model && (
                      <p className="text-sm"><span className="text-[#64748b]">Model:</span> <span className="font-bold text-[#1f2a37]">{report.vehicleInfo.model}</span></p>
                    )}
                    {report.vehicleInfo.vin && (
                      <p className="text-sm"><span className="text-[#64748b]">VIN:</span> <span className="font-bold text-[#1f2a37] font-mono">{report.vehicleInfo.vin}</span></p>
                    )}
                    {(report.vehicleInfo.mileage !== undefined && report.vehicleInfo.mileage !== null) && (
                      <p className="text-sm"><span className="text-[#64748b]">Mileage:</span> <span className="font-bold text-[#1f2a37]">{report.vehicleInfo.mileage.toLocaleString()} km</span></p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Overall Assessment */}
          {report.summary && (() => {
            const categoryScores = calculateCategoryScores();
            
            const {
              overallScore,
              safetyScore,
              safetyCriticalIssueCount,
              safetyRelatedCriticalCount,
              safetyAttentionCount,
              nonSafetyCriticalCount,
              hasMinorIssues,
              safetyMinorWear,
            } = getReportMetrics();

            const overallConditionValue = getConditionFromScore(overallScore);
            const purchaseRecommendation = getRecommendationFromMetrics(
              overallScore,
              safetyScore,
              safetyCriticalIssueCount,
              safetyAttentionCount,
              safetyRelatedCriticalCount,
              nonSafetyCriticalCount,
              hasMinorIssues,
              safetyMinorWear
            );
            let conditionAngle = 0;
            
            // Get unified color for all three elements (gauge needle, condition text, recommendation button)
            const getConditionColor = (condition: string) => {
              switch (condition) {
                case 'excellent':
                  return {
                    gaugeStroke: '#10b981', // green-500
                    textColor: 'text-green-600',
                    bgColor: 'bg-green-100',
                    textColorButton: 'text-green-800',
                    borderColor: 'border-green-300',
                  };
                case 'good':
                  return {
                    gaugeStroke: '#3b82f6', // blue-500
                    textColor: 'text-blue-600',
                    bgColor: 'bg-blue-100',
                    textColorButton: 'text-blue-800',
                    borderColor: 'border-blue-300',
                  };
                case 'fair':
                  return {
                    gaugeStroke: '#eab308', // yellow-500
                    textColor: 'text-yellow-600',
                    bgColor: 'bg-yellow-100',
                    textColorButton: 'text-yellow-800',
                    borderColor: 'border-yellow-300',
                  };
                case 'needs-attention':
                  return {
                    gaugeStroke: '#f97316', // orange-500
                    textColor: 'text-orange-600',
                    bgColor: 'bg-orange-100',
                    textColorButton: 'text-orange-800',
                    borderColor: 'border-orange-300',
                  };
                case 'critical':
                  return {
                    gaugeStroke: '#ef4444', // red-500
                    textColor: 'text-red-600',
                    bgColor: 'bg-red-100',
                    textColorButton: 'text-red-800',
                    borderColor: 'border-red-300',
                  };
                default:
                  return {
                    gaugeStroke: '#eab308', // yellow-500
                    textColor: 'text-yellow-600',
                    bgColor: 'bg-yellow-100',
                    textColorButton: 'text-yellow-800',
                    borderColor: 'border-yellow-300',
                  };
              }
            };
            
            const conditionColors = getConditionColor(overallConditionValue);

            const recommendationSteps = [
              { id: 'do-not-purchase', color: '#ef4444' },
              { id: 'not-recommended', color: '#f97316' },
              { id: 'purchase-with-caution', color: '#eab308' },
              { id: 'recommended-with-minor-repairs', color: '#86efac' },
              { id: 'recommended', color: '#22c55e' },
              { id: 'highly-recommended', color: '#16a34a' },
            ];

            const activeRecommendationIndex = Math.max(
              recommendationSteps.findIndex((step) => step.id === purchaseRecommendation),
              0
            );

            const gaugeCenterX = 100;
            const gaugeCenterY = 100;
            const gaugeRadius = 75;
            const gaugeStartAngle = 180;
            const gaugeEndAngle = 360;
            const segmentAngle = (gaugeEndAngle - gaugeStartAngle) / recommendationSteps.length;
            const activeSegmentColor = recommendationSteps[activeRecommendationIndex]?.color || conditionColors.gaugeStroke;
            conditionAngle = gaugeStartAngle + (activeRecommendationIndex + 0.5) * segmentAngle;

            const polarToCartesian = (cx: number, cy: number, radius: number, angle: number) => {
              const rad = angle * Math.PI / 180;
              return {
                x: cx + radius * Math.cos(rad),
                y: cy + radius * Math.sin(rad),
              };
            };

            const describeArc = (cx: number, cy: number, radius: number, startAngle: number, endAngle: number) => {
              const start = polarToCartesian(cx, cy, radius, startAngle);
              const end = polarToCartesian(cx, cy, radius, endAngle);
              return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
            };
            
            // Get icon for rating
            const getRatingIcon = (rating: string) => {
              const r = rating.toLowerCase();
              if (r === 'excellent') return '⭐'; // Green star
              if (r === 'good') return '✓'; // Green checkmark
              if (r === 'fair') return '●'; // Yellow circle
              if (r === 'needs-attention') return '⚠'; // Orange triangle
              if (r === 'critical') return '✗'; // Red X
              return '●';
            };

            // Get progress bar color
            const getProgressColor = (score: number) => {
              if (score >= 70) return 'bg-green-500';
              if (score >= 50) return 'bg-yellow-500';
              if (score >= 40) return 'bg-orange-500';
              return 'bg-red-500';
            };

            return (
              <div className="pt-6 px-[0.5px] print-section">
                {/* Header Bar */}
                <div className="bg-[#1e293b] text-white px-6 py-3 text-center font-bold text-base">
                  ◆ OVERALL ASSESSMENT
                </div>

                {/* Content Area */}
                <div className="bg-white border-x border-b border-gray-200 p-6">
                  {/* 4-Column Layout: 1 for Graph, 3 for Scorecard */}
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 print:grid-cols-4">
                    {/* Column 1 - Gauge Component */}
                    <div className="lg:col-span-1 print:col-span-1 pl-2 pr-10" style={{ overflow: 'visible', minWidth: 0 }}>
                      <div className="flex flex-col items-center print:items-center w-full" style={{ overflow: 'visible' }}>
                        <svg width="200" height="120" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet" className="mb-4 print:w-full print:max-w-[180px] print:h-auto" style={{ width: '100%', maxWidth: '200px', height: 'auto', overflow: 'visible', display: 'block' }}>
                          {recommendationSteps.map((step, index) => {
                            const start = gaugeStartAngle + (index * segmentAngle);
                            const end = gaugeStartAngle + ((index + 1) * segmentAngle);
                            const strokeColor = index <= activeRecommendationIndex ? step.color : '#e5e7eb';
                            return (
                              <path
                                key={step.id}
                                d={describeArc(gaugeCenterX, gaugeCenterY, gaugeRadius, start, end)}
                                fill="none"
                                stroke={strokeColor}
                                strokeWidth="20"
                                strokeLinecap="round"
                              />
                            );
                          })}
                          {/* Needle */}
                          <line
                            x1="100"
                            y1="100"
                            x2={100 + 70 * Math.cos((conditionAngle) * Math.PI / 180)}
                            y2={100 + 70 * Math.sin((conditionAngle) * Math.PI / 180)}
                            stroke={activeSegmentColor}
                            strokeWidth="3"
                            strokeLinecap="round"
                            style={{ overflow: 'visible' }}
                          />
                          {/* Center Circle */}
                          <circle cx="100" cy="100" r="6" fill={activeSegmentColor} style={{ overflow: 'visible' }} />
                        </svg>
                        
                        <div className="text-center">
                          <p className="text-xs text-gray-500 mb-1">Vehicle Condition</p>
                          <p className={`text-xl font-bold ${conditionColors.textColor}`}>
                            {RATING_LABELS[overallConditionValue] || overallConditionValue}
                          </p>
                        </div>
                      </div>

                      {/* Purchase Recommendation */}
                      <div className="mt-4">
                        <div className="space-y-2">
                          <p className="text-xs text-gray-500 text-center">Purchase Recommendation</p>
                          <div className={`px-4 py-2 rounded-lg border-2 font-bold text-center text-sm ${conditionColors.bgColor} ${conditionColors.textColorButton} ${conditionColors.borderColor}`}>
                            {formatRecommendation(purchaseRecommendation)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Columns 2-4 - Scorecard */}
                    <div className="lg:col-span-3 print:col-span-3">
                      <h3 className="text-sm font-bold text-gray-800 mb-4 print:text-xs">
                        Inspection Scorecard ({categoryScores.length} Categories)
                      </h3>
                      <div className="space-y-3">
                        {categoryScores.map((category, index) => (
                          <div key={index} className="space-y-1 print:break-inside-avoid">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-base print:text-sm">{getRatingIcon(category.worstRating)}</span>
                                <span className="text-xs font-medium text-gray-700 print:text-[10px]">{category.name}</span>
                              </div>
                              <span className="text-xs font-bold text-gray-800 print:text-[10px]">{category.score.toFixed(1)}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 print:h-1.5">
                              <div
                                className={`h-2 rounded-full ${getProgressColor(category.score)} print:h-1.5`}
                                style={{ width: `${Math.min(category.score, 100)}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Safety Assessment */}
          {report.summary && (() => {
            const {
              ratings,
              totalInspected,
              safetyScore,
            } = getReportMetrics();

            const excellentCount = ratings.filter(r => r.rating === 'excellent').length;
            const goodCount = ratings.filter(r => r.rating === 'good').length;
            const fairCount = ratings.filter(r => r.rating === 'fair').length;
            const attentionCount = ratings.filter(r => r.rating === 'needs-attention').length;
            const criticalCount = ratings.filter(r => r.rating === 'critical').length;

            const safetyIssues = ratings.filter(r =>
              r.group !== 'non-safety' && (r.rating === 'needs-attention' || r.rating === 'critical')
            );

            const criticalSafetyCount = ratings.filter(
              (r) => r.group !== 'non-safety' && r.rating === 'critical'
            ).length;

            const safetyAttentionCount = ratings.filter(
              (r) => r.group !== 'non-safety' && r.rating === 'needs-attention'
            ).length;

            const otherConcernsCount = fairCount;

            return (
              <div className="pt-2 px-[0.5px] print-section">
                {/* Header Bar */}
                <div className="px-5 py-2.5 text-left font-bold text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Safety Assessment
                </div>

                {/* Content Area - Single Box */}
                <div className="bg-white border-x border-b border-gray-200 px-5 pt-0 pb-[5px]">
                  {/* Safety Metrics in Middle - Number First */}
                  <div className="grid grid-cols-4 gap-3.5 mb-5">
                    {/* Safety Score */}
                    <div className="bg-gray-100 p-2.5 rounded-lg text-center flex flex-col justify-center items-center">
                      <p className="text-[17px] font-bold text-gray-800">{safetyScore.toFixed(1)}</p>
                      <p className="text-xs text-gray-500">Safety Score</p>
                    </div>
                    {/* Critical Safety */}
                    <div className="bg-green-100 p-2.5 rounded-lg border-2 border-green-300 text-center flex flex-col justify-center items-center">
                      <p className="text-[17px] font-bold text-green-800">{criticalSafetyCount}</p>
                      <p className="text-xs text-gray-600">Critical Safety</p>
                    </div>
                    {/* Safety Attention */}
                    <div className="bg-orange-50 p-2.5 rounded-lg border-2 border-orange-200 text-center flex flex-col justify-center items-center">
                      <p className="text-[17px] font-bold text-gray-900">{safetyAttentionCount}</p>
                      <p className="text-xs text-gray-600">Safety Attention</p>
                    </div>
                    {/* Other Concerns */}
                    <div className="bg-green-100 p-2.5 rounded-lg border-2 border-green-300 text-center flex flex-col justify-center items-center">
                      <p className="text-[17px] font-bold text-gray-900">{otherConcernsCount}</p>
                      <p className="text-xs text-gray-600">Other Concerns</p>
                    </div>
                  </div>

                  {/* Safety Issues Section */}
                  {safetyIssues.length > 0 && (
                    <div className="bg-amber-100 border-l-4 border-amber-300 p-3.5 rounded-r-lg mb-5">
                      <h3 className="text-xs font-bold text-gray-900 mb-2.5 flex items-center gap-2">
                        <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Safety Issues:
                      </h3>
                      <div className="space-y-1.5">
                        {safetyIssues.map((issue, index) => (
                          <div key={index} className="text-xs text-gray-900">
                            <span className="font-bold">{issue.category}:</span> {issue.item}
                            {issue.notes && <span> — {issue.notes}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Detailed Safety Metrics */}
                  <div className="mb-5">
                    {/* Legend */}
                    <div className="bg-gray-100 px-4 py-3 rounded-lg mb-4">
                      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-800">
                        <span className="font-semibold">Safety:</span>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Critical</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-red-500 text-lg">⚡</span>
                          <span>Related</span>
                        </div>
                        <span className="text-gray-400">|</span>
                        <div className="flex items-center gap-1">
                          <span className="text-green-500 text-lg">⭐</span>
                          <span>Excellent</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-green-500 text-lg">✓</span>
                          <span>Good</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500 text-lg">●</span>
                          <span>Fair</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-orange-500 text-lg">⚠</span>
                          <span>Attention</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-red-500 text-lg">✗</span>
                          <span>Critical</span>
                        </div>
                      </div>
                    </div>

                    {/* Metric Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 print:grid-cols-6 print:gap-2">
                      <div className="bg-white border border-gray-200 p-4 rounded-lg text-center print:p-2 print:break-inside-avoid">
                        <p className="text-xs text-gray-500 mb-1 print:text-[10px]">Inspected</p>
                        <p className="text-lg font-bold text-gray-800 print:text-base">{totalInspected}</p>
                      </div>
                      <div className="bg-white border border-gray-200 p-4 rounded-lg text-center print:p-2 print:break-inside-avoid">
                        <p className="text-xs text-gray-500 mb-1 print:text-[10px]">Excellent</p>
                        <p className="text-lg font-bold text-green-600 print:text-base">{excellentCount}</p>
                      </div>
                      <div className="bg-white border border-gray-200 p-4 rounded-lg text-center print:p-2 print:break-inside-avoid">
                        <p className="text-xs text-gray-500 mb-1 print:text-[10px]">Good</p>
                        <p className="text-lg font-bold text-green-600 print:text-base">{goodCount}</p>
                      </div>
                      <div className="bg-white border border-gray-200 p-4 rounded-lg text-center print:p-2 print:break-inside-avoid">
                        <p className="text-xs text-gray-500 mb-1 print:text-[10px]">Fair</p>
                        <p className="text-lg font-bold text-orange-600 print:text-base">{fairCount}</p>
                      </div>
                      <div className="bg-white border border-gray-200 p-4 rounded-lg text-center print:p-2 print:break-inside-avoid">
                        <p className="text-xs text-gray-500 mb-1 print:text-[10px]">Attention</p>
                        <p className="text-lg font-bold text-red-600 print:text-base">{attentionCount}</p>
                      </div>
                      <div className="bg-white border border-gray-200 p-4 rounded-lg text-center print:p-2 print:break-inside-avoid">
                        <p className="text-xs text-gray-500 mb-1 print:text-[10px]">Critical</p>
                        <p className="text-lg font-bold text-red-600 print:text-base">{criticalCount}</p>
                      </div>
                    </div>
                  </div>

                  {/* Inspector's Notes & Comments */}
                  {report.summary.notesAndComments && (
                    <div className="bg-white border border-gray-200 p-4 rounded-lg">
                      <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <span>►</span>
                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        Inspector&apos;s Notes & Comments
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">{report.summary.notesAndComments}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {/* Detailed Inspection Results */}
          {((report.bodyCondition && report.bodyCondition.length > 0) || (report.detailedInspection && report.detailedInspection.length > 0)) && (
            <div className="pt-6 px-[0.5px] print-section">
              {/* Header Bar */}
              <div className="bg-[#1e293b] text-white px-[0.5px] py-3 text-center font-bold text-sm">
                ◆ DETAILED INSPECTION RESULTS ({((report.bodyCondition?.length || 0) + (report.detailedInspection?.reduce((total, category) => total + (category.items?.length || 0), 0) || 0))} Items)
              </div>

              {/* Content Area */}
              <div className="bg-white border-x border-gray-200 px-[0.5px] py-6">
                <div className="space-y-8">
                {/* Body Condition - First Section */}
                {report.bodyCondition && report.bodyCondition.length > 0 && (
                  <div className="mb-8 print-section bg-white border border-gray-200 rounded-t-lg overflow-hidden">
                    <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                      <h3 className="text-xs font-bold text-[#1f2a37]">BODY CONDITION</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full table-fixed">
                        <colgroup>
                          <col className="w-[40%]" />
                          <col className="w-[20%]" />
                          <col className="w-[40%]" />
                        </colgroup>
                        <thead>
                          <tr className="bg-orange-50">
                            <th className="px-4 py-3 text-left text-xs font-semibold text-orange-600">Component</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-orange-600">Condition</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-orange-600">Notes</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {report.bodyCondition.map((item, itemIndex) => (
                            <tr key={itemIndex} className={itemIndex % 2 === 0 ? 'bg-white' : 'bg-[#f8fafc]'}>
                              <td className="px-4 py-3 font-medium text-[#1f2a37] text-xs">{item.item || '-'}</td>
                              <td className="px-4 py-3">
                                <ConditionBadge condition={item.rating ? RATING_LABELS[item.rating] || item.rating : ''} />
                              </td>
                              <td className="px-4 py-3 text-xs text-[#64748b]">{item.notes || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {/* Other Detailed Inspection Categories */}
                {report.detailedInspection && report.detailedInspection.map((category, catIndex) => (
                  <div key={catIndex} className="mb-8 print-section bg-white border border-gray-200 rounded-t-lg overflow-hidden">
                    <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                      <h3 className="text-xs font-bold text-[#1f2a37]">{formatCategoryName(category.category)}</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full table-fixed">
                        <colgroup>
                          <col className="w-[40%]" />
                          <col className="w-[20%]" />
                          <col className="w-[40%]" />
                        </colgroup>
                        <thead>
                          <tr className="bg-orange-50">
                            <th className="px-4 py-3 text-left text-xs font-semibold text-orange-600">Component</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-orange-600">Condition</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-orange-600">Notes</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {category.items && category.items.length > 0 ? category.items.map((item, itemIndex) => (
                            <tr key={itemIndex} className={itemIndex % 2 === 0 ? 'bg-white' : 'bg-[#f8fafc]'}>
                              <td className="px-4 py-3 font-medium text-[#1f2a37] text-xs">{item.component || '-'}</td>
                              <td className="px-4 py-3">
                                <ConditionBadge condition={item.condition} />
                              </td>
                              <td className="px-4 py-3 text-xs text-[#64748b]">{item.notes || '-'}</td>
                            </tr>
                          )) : (
                            <tr>
                              <td colSpan={3} className="px-4 py-3 text-center text-xs text-gray-500">No items found</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </div>
          )}

          {/* Value Assessment */}
          {report.valueAssessment && (
            <div className="px-[30px] py-[40px] border-b border-gray-200 print-section">
              <h2 className="text-lg font-bold text-[#1f2a37] mb-4">Value Assessment</h2>
              <hr className="border-gray-300 mb-6" />
              <div className="bg-[#f8fafc] p-4 rounded-lg">
                <p className="text-sm font-semibold text-[#1f2a37] mb-2">
                  {formatValueAssessment(report.valueAssessment.assessment)}
                </p>
                {report.valueAssessment.notes && (
                  <p className="text-sm text-[#64748b]">{report.valueAssessment.notes}</p>
                )}
              </div>
            </div>
          )}

          {/* Vehicle Photos */}
          {report.photos && report.photos.length > 0 && report.photos.some((photo: string) => photo) && (
            <div className="px-[30px] py-[40px]">
              <h2 className="text-lg font-bold text-[#1f2a37] mb-4">Vehicle Photos</h2>
              <hr className="border-gray-300 mb-6" />
              <div className="grid grid-cols-3 gap-4">
                {report.photos.filter((photo: string) => photo).map((photo: string, index: number) => (
                  <div key={index} className="relative" style={{ aspectRatio: '4/3' }}>
                    <img
                      src={photo}
                      alt={`Vehicle photo ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* How We Determine Purchase Recommendations - Hidden for Routine Checkup */}
          {reportType !== 'routine' && (
          <div className="pt-0 px-[0.5px] print-section">
            <div className="border border-gray-200 bg-white">
              {/* Header Bar */}
              <div className="px-5 py-2.5 text-left font-bold text-[12.6px] flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                How We Determine Purchase Recommendations
              </div>

              {/* Content Area */}
              <div className="bg-white px-[0.5px] pt-2 pb-6">
              <div className="px-6">
                <p className="text-[12.6px] text-gray-700 mb-6">
                  Our recommendations prioritize your safety while being realistic about cosmetic and minor issues. Safety-critical systems (brakes, steering, seat belts, airbags) are weighted most heavily. Non-safety issues like paint or interior condition affect the overall score but won't alone prevent a purchase recommendation.
                </p>

                <div className="bg-white border border-gray-200 rounded-t-lg overflow-hidden">
                  <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                    <div className="grid grid-cols-2 gap-4">
                      <span className="text-xs font-bold text-[#1f2a37]">Recommendation</span>
                      <span className="text-xs font-bold text-[#1f2a37]">Conditions</span>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <tbody>
                      <tr className="bg-red-50">
                        <td className="px-4 py-3 text-xs font-semibold text-gray-800 border-b border-gray-200">Do Not Purchase</td>
                        <td className="px-4 py-3 text-xs text-gray-700 border-b border-gray-200">Critical issue in safety-critical system (brakes, steering, airbags), OR 3+ safety systems need attention</td>
                      </tr>
                      <tr className="bg-red-100">
                        <td className="px-4 py-3 text-xs font-semibold text-gray-800 border-b border-gray-200">Not Recommended</td>
                        <td className="px-4 py-3 text-xs text-gray-700 border-b border-gray-200">Multiple critical issues in lights/tires, OR safety score below 30, OR overall score below 30</td>
                      </tr>
                      <tr className="bg-yellow-50">
                        <td className="px-4 py-3 text-xs font-semibold text-gray-800 border-b border-gray-200">Purchase with Caution</td>
                        <td className="px-4 py-3 text-xs text-gray-700 border-b border-gray-200">Single critical in lights/tires, OR 2+ safety attention items, OR overall/safety score 30-45, OR multiple non-safety critical issues</td>
                      </tr>
                      <tr className="bg-green-50">
                        <td className="px-4 py-3 text-xs font-semibold text-gray-800 border-b border-gray-200">Recommended with Minor Repairs</td>
                        <td className="px-4 py-3 text-xs text-gray-700 border-b border-gray-200">Good overall (70+) with minor issues to address, OR good overall with safety showing minor wear</td>
                      </tr>
                      <tr className="bg-green-100">
                        <td className="px-4 py-3 text-xs font-semibold text-gray-800 border-b border-gray-200">Recommended</td>
                        <td className="px-4 py-3 text-xs text-gray-700 border-b border-gray-200">Good overall (70+) with good safety (70+), minimal issues</td>
                      </tr>
                      <tr className="bg-green-200">
                        <td className="px-4 py-3 text-xs font-semibold text-gray-800">Highly Recommended</td>
                        <td className="px-4 py-3 text-xs text-gray-700">Excellent overall (85+) with strong safety (80+)</td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          )}

          {/* Important Disclaimer */}
          <div className="pt-6 px-[0.5px] print-section">
            <div className="bg-yellow-50 border-l-4 border-orange-500 p-6 rounded-lg">
              <h3 className="text-sm font-bold text-[#E54E3D] mb-4">Important Disclaimer</h3>
              <div className="text-[#1f2a37] space-y-3" style={{ fontSize: '11px' }}>
                <p>
                  This inspection report is provided for informational purposes only and represents the vehicle&apos;s condition at the time of inspection. CheckMyRide does not guarantee future reliability, cannot detect all potential issues, and recommends buyers conduct their own due diligence. This is a visual and functional inspection; we do not disassemble components. Purchase recommendations are advisory only and do not constitute a guarantee of vehicle quality or safety. Buyers should factor in their own risk tolerance, intended use, and budget for potential repairs when making purchase decisions.
                </p>
              </div>
            </div>
          </div>

          {/* Report Footer */}
          <div className="px-[30px] py-[40px]">
            <hr className="border-gray-300 mb-6" />
            <div className="text-center space-y-2">
              <p className="font-bold text-[#1f2a37] text-sm">CheckMyRide Vehicle Inspection Services</p>
              <p className="text-[#64748b] text-sm">
                For questions about this report, please contact us at{' '}
                <a href="mailto:info@checkmyride.com" className="text-[#E54E3D] hover:underline">info@checkmyride.com</a>
                {' '}or (613) 555-RIDE
              </p>
              {report.reportMetadata && (
                <p className="text-[#64748b] text-sm">
                  Report Generated: {report.reportMetadata.reportGenerated} | Report ID: {report.reportMetadata.reportId}
                </p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Success/Error Messages */}
      {sendSuccess && (
        <div className="fixed top-4 right-4 bg-green-50 border-2 border-green-200 rounded-lg p-4 shadow-lg z-50 max-w-md">
          <div className="flex items-center gap-3">
            <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-semibold text-green-800">Report sent to customer successfully!</p>
          </div>
        </div>
      )}
      {sendError && (
        <div className="fixed top-4 right-4 bg-red-50 border-2 border-red-200 rounded-lg p-4 shadow-lg z-50 max-w-md">
          <div className="flex items-center gap-3">
            <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-semibold text-red-800">{sendError}</p>
          </div>
        </div>
      )}

      {/* Action Buttons - Bottom Middle - Hidden when printing */}
      <div className="flex justify-center items-center gap-3 pt-2 pb-4 print:hidden">
        {/* Only show admin buttons if isAdmin is explicitly true */}
        {isAdmin === true ? (
          <>
            {reportType && (
              <Link
                href={`/mechanic/report/${bookingId}/${reportType}`}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Report
              </Link>
            )}
          <button
            onClick={handleSendToCustomer}
            disabled={isSending}
            className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Sending...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Report to Customer
              </>
            )}
          </button>
          </>
        ) : null}
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#E54E3D] text-white rounded-lg text-sm font-semibold hover:bg-[#d14130] transition-colors shadow-lg"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export to PDF
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#1f2a37] text-white rounded-lg text-sm font-semibold hover:bg-[#0f172a] transition-colors shadow-lg"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print Report
        </button>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          body {
            background: white;
            margin: 0;
            padding: 0;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none;
          }
          .print\\:py-2 {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
          }
          .print\\:break-inside-avoid {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
            -webkit-page-break-inside: avoid !important;
          }
          .print\\:grid-cols-4 {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          }
          .print\\:grid-cols-6 {
            grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
          }
          .print\\:col-span-1 {
            grid-column: span 1 / span 1 !important;
          }
          .print\\:col-span-3 {
            grid-column: span 3 / span 3 !important;
          }
          .print\\:gap-2 {
            gap: 0.5rem !important;
          }
          .print\\:p-2 {
            padding: 0.5rem !important;
          }
          .print\\:text-\\[10px\\] {
            font-size: 10px !important;
          }
          .print\\:text-base {
            font-size: 1rem !important;
          }
          .print\\:items-center {
            align-items: center !important;
          }
          .print\\:max-w-\\[180px\\] {
            max-width: 180px !important;
          }
          .print\\:w-full {
            width: 100% !important;
          }
          .print\\:h-auto {
            height: auto !important;
          }
          .print\\:h-1\\.5 {
            height: 0.375rem !important;
          }
          /* Ensure SVG graphics print correctly */
          svg {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          /* Ensure gradient fills print */
          svg defs linearGradient,
          svg defs stop {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print-section {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            -webkit-page-break-inside: avoid !important;
          }
          /* Prevent grid items from breaking */
          .grid > * {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
          @page {
            margin-top: 20mm;
            margin-right: 0;
            margin-bottom: 0;
            margin-left: 0;
            size: A4;
          }
        }
      `}</style>
    </div>
  );
}
