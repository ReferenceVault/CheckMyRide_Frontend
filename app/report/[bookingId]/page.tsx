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
    overallCondition: string;
    inspectionSummary: string;
    recommendations: string;
    recommendationNotes?: string;
  };
  detailedInspection?: InspectionCategory[];
  valueAssessment?: {
    assessment: string;
    notes?: string;
  };
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

export default function InspectionReportViewPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params?.bookingId as string;
  
  const [report, setReport] = useState<ReportData | null>(null);
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
        
        if (!reportData.report) {
          setError('Report not found');
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

        // Transform sections
        const sections = apiReport.sections || {};
        const bodyCondition: BodyConditionItem[] = sections.bodyCondition || [];
        const detailedInspection: InspectionCategory[] = [];

        // Convert other sections to detailedInspection format
        Object.keys(sections).forEach((key) => {
          if (key !== 'bodyCondition' && Array.isArray(sections[key]) && sections[key].length > 0) {
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
            overallCondition: apiReport.summary?.overallCondition || '',
            inspectionSummary: apiReport.summary?.inspectionSummary || '',
            recommendations: apiReport.summary?.recommendations || '',
            recommendationNotes: apiReport.summary?.recommendationNotes,
          },
          detailedInspection: detailedInspection.length > 0 ? detailedInspection : undefined,
          valueAssessment: apiReport.valueAssessment ? {
            assessment: apiReport.valueAssessment.assessment || '',
            notes: apiReport.valueAssessment.notes,
          } : undefined,
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

  const formatRecommendation = (rec: string) => {
    const labels: { [key: string]: string } = {
      'purchase-recommended': 'Purchase Recommended',
      'purchase-with-caution': 'Purchase with Caution',
      'negotiate-price': 'Negotiate Price',
      'major-repairs-needed': 'Major Repairs Needed',
      'not-recommended': 'Not Recommended',
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
            <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Report</h2>
            <p className="text-red-700 mb-4">{error || 'Report not found'}</p>
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
          <div className="bg-gradient-to-r from-orange-50 via-gray-50 to-orange-50 border-b border-orange-200 py-2 px-[30px] print:py-2">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                <div className="relative -ml-[18px] -mt-4 flex h-[72px] w-[72px] items-center justify-center sm:-ml-[18px] sm:-mt-4 sm:h-[92px] sm:w-[92px] mr-4">
                  <img src="/images/logofooter1.png" alt="CheckMyRide" className="h-full w-full object-contain" />
                </div>
                <span className="-ml-[25px] -mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-[#1f2a37]">
                  Check<span className="text-[#E54E3D]">MyRide</span>
                </span>
              </Link>
              <button className="bg-[#E54E3D] text-white px-6 py-3 rounded-full font-semibold uppercase tracking-wide hover:bg-[#d14130] transition-colors">
                INSPECTION REPORT
              </button>
            </div>
          </div>

          {/* General Information */}
          <div className="px-[30px] py-[40px] border-b border-gray-200">
            <h2 className="text-lg font-bold text-[#1f2a37] mb-4">General Information</h2>
            <hr className="border-gray-300 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#f8fafc] p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-[#64748b] mb-2">Client Information</h3>
                <p className="text-[#1f2a37] font-medium text-sm mb-1">{report.generalInfo.clientName}</p>
                <p className="text-[#64748b] text-sm mb-1">{report.generalInfo.email}</p>
                <p className="text-[#64748b] text-sm">{report.generalInfo.phone}</p>
              </div>
              <div className="bg-[#f8fafc] p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-[#64748b] mb-2">Inspection Details</h3>
                <p className="text-[#1f2a37] text-sm mb-1"><span className="font-semibold">Date:</span> {formatDate(report.generalInfo.appointmentDate)}</p>
                <p className="text-[#1f2a37] text-sm mb-1"><span className="font-semibold">Time:</span> {report.generalInfo.inspectionTime}</p>
                <p className="text-[#1f2a37] text-sm mb-1"><span className="font-semibold">Inspector:</span> {report.generalInfo.inspectorName}</p>
                {report.generalInfo.inspectionLocation && (
                  <p className="text-[#1f2a37] text-sm"><span className="font-semibold">Location:</span> {report.generalInfo.inspectionLocation}</p>
                )}
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          {report.vehicleInfo.make && (
            <div className="px-[30px] py-[40px] border-b border-gray-200">
              <h2 className="text-lg font-bold text-[#1f2a37] mb-4">Vehicle Information</h2>
              <hr className="border-gray-300 mb-6" />
              <div className="bg-[#f8fafc] p-4 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {report.vehicleInfo.year && (
                    <div>
                      <p className="text-sm text-[#64748b]">Year</p>
                      <p className="font-semibold text-[#1f2a37] text-sm">{report.vehicleInfo.year}</p>
                    </div>
                  )}
                  {report.vehicleInfo.make && (
                    <div>
                      <p className="text-sm text-[#64748b]">Make</p>
                      <p className="font-semibold text-[#1f2a37] text-sm">{report.vehicleInfo.make}</p>
                    </div>
                  )}
                  {report.vehicleInfo.model && (
                    <div>
                      <p className="text-sm text-[#64748b]">Model</p>
                      <p className="font-semibold text-[#1f2a37] text-sm">{report.vehicleInfo.model}</p>
                    </div>
                  )}
                  {report.vehicleInfo.trim && (
                    <div>
                      <p className="text-sm text-[#64748b]">Trim</p>
                      <p className="font-semibold text-[#1f2a37] text-sm">{report.vehicleInfo.trim}</p>
                    </div>
                  )}
                  {report.vehicleInfo.vin && (
                    <div>
                      <p className="text-sm text-[#64748b]">VIN</p>
                      <p className="font-semibold text-[#1f2a37] font-mono text-sm">{report.vehicleInfo.vin}</p>
                    </div>
                  )}
                  {report.vehicleInfo.mileage && (
                    <div>
                      <p className="text-sm text-[#64748b]">Mileage</p>
                      <p className="font-semibold text-[#1f2a37] text-sm">{report.vehicleInfo.mileage.toLocaleString()} km</p>
                    </div>
                  )}
                  {report.vehicleInfo.color && (
                    <div>
                      <p className="text-sm text-[#64748b]">Color</p>
                      <p className="font-semibold text-[#1f2a37] text-sm">{report.vehicleInfo.color}</p>
                    </div>
                  )}
                  {report.vehicleInfo.transmission && (
                    <div>
                      <p className="text-sm text-[#64748b]">Transmission</p>
                      <p className="font-semibold text-[#1f2a37] capitalize text-sm">{report.vehicleInfo.transmission}</p>
                    </div>
                  )}
                  {report.vehicleInfo.drivetrain && (
                    <div>
                      <p className="text-sm text-[#64748b]">Drivetrain</p>
                      <p className="font-semibold text-[#1f2a37] uppercase text-sm">{report.vehicleInfo.drivetrain}</p>
                    </div>
                  )}
                  {report.vehicleInfo.bodyStyle && (
                    <div>
                      <p className="text-sm text-[#64748b]">Body Style</p>
                      <p className="font-semibold text-[#1f2a37] capitalize text-sm">{report.vehicleInfo.bodyStyle}</p>
                    </div>
                  )}
                  {report.vehicleInfo.fuelType && (
                    <div>
                      <p className="text-sm text-[#64748b]">Fuel Type</p>
                      <p className="font-semibold text-[#1f2a37] capitalize text-sm">{report.vehicleInfo.fuelType}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Overall Assessment */}
          {report.summary && (
            <div className="px-[30px] py-[40px] border-b border-gray-200">
              <h2 className="text-lg font-bold text-[#1f2a37] mb-4">Overall Assessment</h2>
              <hr className="border-gray-300 mb-6" />
              
              {/* Overall Condition Box */}
              {report.summary.overallCondition && (
                <div className="bg-blue-50 border-l-4 border-red-500 p-6 mb-6 rounded-r-lg">
                  <h3 className="text-sm font-bold text-[#1f2a37] mb-3">
                    Overall Condition: <span className="uppercase">{RATING_LABELS[report.summary.overallCondition] || report.summary.overallCondition}</span>
                  </h3>
                  {report.summary.inspectionSummary && (
                    <p className="text-[#64748b] leading-relaxed text-sm">
                      {report.summary.inspectionSummary}
                    </p>
                  )}
                </div>
              )}

              {/* Recommendations */}
              {report.summary.recommendations && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-[#64748b] mb-2">Recommendation:</p>
                  <p className="text-sm font-bold text-[#1f2a37]">{formatRecommendation(report.summary.recommendations)}</p>
                  {report.summary.recommendationNotes && (
                    <p className="text-sm text-[#64748b] mt-2">{report.summary.recommendationNotes}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Body Condition */}
          {report.bodyCondition && report.bodyCondition.length > 0 && (
            <div className="px-[30px] py-[40px] border-b border-gray-200">
              <h2 className="text-lg font-bold text-[#1f2a37] mb-4">Body Condition</h2>
              <hr className="border-gray-300 mb-6" />
              <div className="space-y-4">
                {report.bodyCondition.map((item, index) => (
                  <div key={index} className="bg-[#f8fafc] p-4 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-semibold text-[#1f2a37] text-sm">{item.item}</p>
                      {item.rating && (
                        <span className="px-3 py-1 rounded text-xs font-semibold bg-orange-100 text-orange-800">
                          {RATING_LABELS[item.rating] || item.rating}
                        </span>
                      )}
                    </div>
                    {item.notes && (
                      <p className="text-sm text-[#64748b]">{item.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Inspection Results */}
          {report.detailedInspection && report.detailedInspection.length > 0 && (
            <div className="px-[30px] py-[40px] border-b border-gray-200">
              <h2 className="text-lg font-bold text-[#1f2a37] mb-4">Detailed Inspection Results</h2>
              <hr className="border-gray-300 mb-6" />
              
              <div className="space-y-8">
                {report.detailedInspection.map((category, catIndex) => (
                  <div key={catIndex} className="mb-8">
                    <h3 className="font-bold text-[#1f2a37] mb-4 uppercase" style={{ fontSize: '15px' }}>{category.category}</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-orange-50">
                            <th className="px-4 py-3 text-left text-sm font-semibold text-orange-600">Component</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-orange-600">Condition</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-orange-600">Notes</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {category.items.map((item, itemIndex) => (
                            <tr key={itemIndex} className={itemIndex % 2 === 0 ? 'bg-white' : 'bg-[#f8fafc]'}>
                              <td className="px-4 py-3 font-medium text-[#1f2a37] text-sm">{item.component}</td>
                              <td className="px-4 py-3">
                                <span className="font-semibold text-[#1f2a37] text-sm">{item.condition}</span>
                              </td>
                              <td className="px-4 py-3 text-sm text-[#64748b]">{item.notes}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Value Assessment */}
          {report.valueAssessment && (
            <div className="px-[30px] py-[40px] border-b border-gray-200">
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

          {/* Important Disclaimer */}
          <div className="px-[30px] py-[40px] border-b border-gray-200">
            <div className="bg-yellow-50 border-l-4 border-orange-500 p-6 rounded-lg">
              <h3 className="text-sm font-bold text-[#1f2a37] mb-4">IMPORTANT DISCLAIMER:</h3>
              <div className="text-[#1f2a37] space-y-3" style={{ fontSize: '11px' }}>
                <p>
                  This inspection report is provided for informational purposes only and represents the vehicle's condition at the time of inspection on the date specified. CheckMyRide and its inspectors:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="list-disc">Do not guarantee the future reliability or performance of this vehicle</li>
                  <li className="list-disc">Cannot detect all potential issues, particularly those that may be intermittent or not visible during inspection</li>
                  <li className="list-disc">Recommend that buyers conduct their own due diligence, including obtaining a vehicle history report (Carfax/AutoCheck)</li>
                  <li className="list-disc">Suggest buyers have the vehicle inspected by their own trusted mechanic if desired</li>
                  <li className="list-disc">Do not provide warranty or guarantee of any kind regarding this vehicle</li>
                </ul>
                <p>
                  This report should be used as one of several tools in making an informed purchasing decision. The final decision to purchase remains solely with the buyer.
                </p>
                <p>
                  CheckMyRide is not liable for any issues that may arise after the date of inspection.
                </p>
                <p className="font-semibold">
                  <strong>Note:</strong> This is a visual and functional inspection. We do not disassemble components or perform destructive testing. Some issues may not be detectable without specialized equipment or extended testing periods.
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
      <div className="flex justify-center items-center gap-4 py-6 print:hidden">
        {/* Only show button if isAdmin is explicitly true */}
        {isAdmin === true ? (
          <button
            onClick={handleSendToCustomer}
            disabled={isSending}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Sending...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Report to Customer
              </>
            )}
          </button>
        ) : null}
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-2 px-6 py-3 bg-[#E54E3D] text-white rounded-lg font-semibold hover:bg-[#d14130] transition-colors shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export to PDF
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-3 bg-[#1f2a37] text-white rounded-lg font-semibold hover:bg-[#0f172a] transition-colors shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            break-inside: avoid;
          }
          @page {
            margin: 0;
            size: A4;
          }
        }
      `}</style>
    </div>
  );
}
