'use client';

import { useState } from 'react';
import Link from 'next/link';

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

interface ItemRequiringAttention {
  priority: 'High' | 'Medium' | 'Low';
  item: string;
  recommendation: string;
  estimatedCost: string;
}

interface RoadTestResult {
  category: string;
  rating: string;
}

interface RoadTestData {
  results: RoadTestResult[];
  testRoute: string;
  notes: string;
}

interface ServiceHistoryData {
  recordsReviewed: string;
  lastService: string;
  majorServices: string[];
}

interface InspectorComments {
  overallAssessment: string;
  strengths: string[];
  areasOfNote: string[];
  purchaseRecommendation: {
    status: string;
    text: string;
  };
}

interface ReportMetadata {
  reportGenerated: string;
  reportId: string;
}

interface ReportData {
  generalInfo: {
    clientName: string;
    email: string;
    phone: string;
    appointmentDate: string;
    inspectionTime: string;
    inspectorName: string;
    sellerType: string;
    sellerName: string;
    inspectionLocation: string;
  };
  vehicleInfo: {
    year: number;
    make: string;
    model: string;
    trim: string;
    vin: string;
    mileage: number;
    color: string;
    transmission: string;
    drivetrain: string;
    bodyStyle: string;
    fuelType: string;
  };
  bodyCondition: BodyConditionItem[];
  summary: {
    overallCondition: string;
    inspectionSummary: string;
    recommendations: string;
    recommendationNotes: string;
    overallRating?: number;
    criticalIssues?: number;
    itemsNeedingAttention?: number;
    overallConditionDescription?: string;
  };
  detailedInspection?: InspectionCategory[];
  itemsRequiringAttention?: ItemRequiringAttention[];
  roadTest?: RoadTestData;
  serviceHistory?: ServiceHistoryData;
  inspectorComments?: InspectorComments;
  reportMetadata?: ReportMetadata;
  valueAssessment: {
    assessment: string;
    notes: string;
  };
}

const RATING_COLORS: { [key: string]: string } = {
  'excellent': 'bg-green-500',
  'good': 'bg-green-400',
  'fair': 'bg-yellow-400',
  'needs-attention': 'bg-orange-400',
  'critical': 'bg-red-500',
  'n/a': 'bg-gray-400',
};

const RATING_LABELS: { [key: string]: string } = {
  'excellent': 'Excellent',
  'good': 'Good',
  'fair': 'Fair',
  'needs-attention': 'Needs Attention',
  'critical': 'Critical',
  'n/a': 'N/A',
};

// Hardcoded sample report data
const SAMPLE_REPORT: ReportData = {
  generalInfo: {
    clientName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(416) 555-0123',
    appointmentDate: '2024-11-22',
    inspectionTime: '10:00 AM',
    inspectorName: 'Michael Johnson',
    sellerType: 'private',
    sellerName: 'Sarah Williams',
    inspectionLocation: 'Mobile Inspection - Seller Location',
  },
  vehicleInfo: {
    year: 2020,
    make: 'Honda',
    model: 'Civic',
    trim: 'EX',
    vin: '19XFC2F59LE123456',
    mileage: 45000,
    color: 'Silver',
    transmission: 'automatic',
    drivetrain: 'fwd',
    bodyStyle: 'sedan',
    fuelType: 'gasoline',
  },
  bodyCondition: [
    {
      item: 'Dents, scratches, rust on panels',
      rating: 'good',
      notes: 'Minor scratches on rear bumper, no rust detected',
    },
    {
      item: 'Paint condition and finish quality',
      rating: 'excellent',
      notes: 'Paint is in excellent condition with no fading',
    },
    {
      item: 'Glass condition (windshield, windows)',
      rating: 'good',
      notes: 'All glass is clear with minor chips on windshield',
    },
    {
      item: 'Lights and electrical components',
      rating: 'excellent',
      notes: 'All lights functioning properly',
    },
    {
      item: 'Tires and wheels condition',
      rating: 'fair',
      notes: 'Tires have 60% tread remaining, wheels show minor curb rash',
    },
    {
      item: 'Interior condition and wear',
      rating: 'good',
      notes: 'Interior is well-maintained with minimal wear',
    },
  ],
  summary: {
    overallCondition: 'good',
    inspectionSummary: 'This 2020 Honda Civic EX with 45,000 km was inspected on November 22, 2024. Overall vehicle condition is rated as good. The vehicle shows signs of normal wear and may require some maintenance in the near future. Vehicle specifications: Color: Silver, Transmission: automatic, Drivetrain: FWD, Body Style: sedan, Fuel Type: gasoline, VIN: 19XFC2F59LE123456. Inspection was conducted at Mobile Inspection - Seller Location. Vehicle is being sold by a private seller: Sarah Williams. The vehicle appears to be well-maintained and in good overall condition.',
    recommendations: 'purchase-recommended',
    recommendationNotes: 'This vehicle is in good condition and represents a solid value. Minor maintenance items such as tire replacement should be planned for within the next 6-12 months. The vehicle has been well-maintained and shows no signs of major mechanical issues.',
  },
  reportMetadata: {
    reportGenerated: 'November 14, 2025',
    reportId: 'CMR-2025-11-0421',
  },
  valueAssessment: {
    assessment: 'at-market',
    notes: 'The asking price is consistent with current market values for similar vehicles in the area. The vehicle\'s condition and mileage are appropriate for its age, making it a fair purchase at the listed price.',
  },
};

export default function InspectionReportViewPage() {
  const [report] = useState<ReportData>(SAMPLE_REPORT);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    // TODO: Implement PDF export functionality
    window.print();
  };

  const handleSaveDraft = () => {
    // TODO: Implement save draft functionality
    console.log('Save draft clicked');
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
      'purchase-with-conditions': 'Purchase with Conditions',
      'negotiate-price': 'Negotiate Price',
      'do-not-purchase': 'Do Not Purchase',
    };
    return labels[rec] || rec;
  };

  const formatValueAssessment = (assessment: string) => {
    const labels: { [key: string]: string } = {
      'above-market': 'Above Market Value',
      'at-market': 'At Market Value',
      'below-market': 'Below Market Value',
      'significantly-below': 'Significantly Below Market Value',
    };
    return labels[assessment] || assessment;
  };

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
                <p className="text-[#1f2a37] text-sm"><span className="font-semibold">Location:</span> {report.generalInfo.inspectionLocation}</p>
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="px-[30px] py-[40px] border-b border-gray-200">
            <h2 className="text-lg font-bold text-[#1f2a37] mb-4">Vehicle Information</h2>
            <hr className="border-gray-300 mb-6" />
            <div className="bg-[#f8fafc] p-4 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-[#64748b]">Year</p>
                  <p className="font-semibold text-[#1f2a37] text-sm">{report.vehicleInfo.year}</p>
              </div>
              <div>
                <p className="text-sm text-[#64748b]">Make</p>
                  <p className="font-semibold text-[#1f2a37] text-sm">{report.vehicleInfo.make}</p>
              </div>
              <div>
                <p className="text-sm text-[#64748b]">Model</p>
                  <p className="font-semibold text-[#1f2a37] text-sm">{report.vehicleInfo.model}</p>
              </div>
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

          {/* Overall Assessment */}
          <div className="px-[30px] py-[40px] border-b border-gray-200">
            <h2 className="text-lg font-bold text-[#1f2a37] mb-4">Overall Assessment</h2>
            <hr className="border-gray-300 mb-6" />
            
            {/* Overall Condition Box */}
            <div className="bg-blue-50 border-l-4 border-red-500 p-6 mb-6 rounded-r-lg">
              <h3 className="text-sm font-bold text-[#1f2a37] mb-3">
                Overall Condition: <span className="uppercase">{RATING_LABELS[report.summary.overallCondition] || report.summary.overallCondition}</span>
              </h3>
              <p className="text-[#64748b] leading-relaxed text-sm">
                {report.summary.overallConditionDescription || report.summary.inspectionSummary}
              </p>
            </div>

            {/* Summary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm uppercase tracking-wide text-[#64748b] mb-2">OVERALL RATING</p>
                <p className="text-sm font-bold text-green-600">
                  {report.summary.overallRating?.toFixed(1) || 'N/A'}/10
                </p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wide text-[#64748b] mb-2">CRITICAL ISSUES</p>
                <p className="text-sm font-bold text-[#1f2a37]">
                  {report.summary.criticalIssues ?? 0}
                </p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wide text-[#64748b] mb-2">ITEMS NEEDING ATTENTION</p>
                <p className="text-sm font-bold text-[#1f2a37]">
                  {report.summary.itemsNeedingAttention ?? 0}
                </p>
              </div>
            </div>
          </div>

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

              {/* Items Requiring Attention */}
              {report.itemsRequiringAttention && report.itemsRequiringAttention.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-bold text-[#1f2a37] mb-4" style={{ fontSize: '15px' }}>Items Requiring Attention</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-orange-50">
                          <th className="px-4 py-3 text-left text-sm font-semibold text-orange-600">Priority</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-orange-600">Item</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-orange-600">Recommendation</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-orange-600">Est. Cost</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {report.itemsRequiringAttention.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-[#f8fafc]'}>
                            <td className="px-4 py-3">
                              <span className={`inline-block px-2 py-1 rounded text-sm font-semibold ${
                                item.priority === 'High' ? 'bg-red-100 text-red-800' :
                                item.priority === 'Medium' ? 'bg-orange-100 text-orange-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {item.priority}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-medium text-[#1f2a37] text-sm">{item.item}</td>
                            <td className="px-4 py-3 text-sm text-[#64748b]">{item.recommendation}</td>
                            <td className="px-4 py-3 text-sm font-semibold text-[#1f2a37]">{item.estimatedCost}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Road Test Results */}
          {report.roadTest && (
            <div className="px-[30px] py-[40px] border-b border-gray-200">
              <h2 className="font-bold text-[#1f2a37] mb-4" style={{ fontSize: '15px' }}>Road Test Results</h2>
              <hr className="border-gray-300 mb-6" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {report.roadTest.results.map((result, index) => (
                  <div key={index} className="bg-[#f8fafc] p-4 rounded-lg">
                    <p className="text-sm uppercase tracking-wide text-[#64748b] mb-2">{result.category}</p>
                    <p className="text-sm font-bold text-[#1f2a37]">{result.rating}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-[#64748b] mb-1">Test Route:</p>
                  <p className="text-[#1f2a37] text-sm">{report.roadTest.testRoute}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#64748b] mb-1">Notes:</p>
                  <p className="text-[#64748b] leading-relaxed text-sm">{report.roadTest.notes}</p>
                </div>
              </div>
            </div>
          )}

          {/* Service History Review */}
          {report.serviceHistory && (
            <div className="px-[30px] py-[40px] border-b border-gray-200">
              <h2 className="font-bold text-[#1f2a37] mb-4" style={{ fontSize: '15px' }}>Service History Review</h2>
              <hr className="border-gray-300 mb-6" />
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-[#64748b] mb-1">Records Reviewed:</p>
                  <p className="text-[#1f2a37] text-sm">{report.serviceHistory.recordsReviewed}</p>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-[#64748b] mb-1">Last Service:</p>
                  <p className="text-[#1f2a37] text-sm">{report.serviceHistory.lastService}</p>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-[#64748b] mb-3">Major Services Completed:</p>
                  <ul className="space-y-2">
                    {report.serviceHistory.majorServices.map((service, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#E54E3D] mr-2 mt-1">•</span>
                        <span className="text-[#1f2a37] text-sm">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Inspector's Comments & Recommendations */}
          {report.inspectorComments && (
            <div className="px-[30px] py-[40px] border-b border-gray-200">
              <h2 className="font-bold text-[#1f2a37] mb-4" style={{ fontSize: '15px' }}>Inspector's Comments & Recommendations</h2>
              <hr className="border-gray-300 mb-6" />
              
              <div className="bg-blue-50 border-l-4 border-red-500 p-6 rounded-r-lg space-y-6">
                {/* Overall Assessment */}
                <div>
                  <h3 className="text-sm font-bold text-[#1f2a37] mb-3">Overall Assessment:</h3>
                  <p className="text-[#64748b] leading-relaxed text-sm">{report.inspectorComments.overallAssessment}</p>
                </div>

                {/* Strengths */}
                <div>
                  <h3 className="text-sm font-bold text-[#1f2a37] mb-3">Strengths:</h3>
                  <ul className="space-y-2">
                    {report.inspectorComments.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#E54E3D] mr-2 mt-1">•</span>
                        <span className="text-[#1f2a37] text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Areas of Note */}
                <div>
                  <h3 className="text-sm font-bold text-[#1f2a37] mb-3">Areas of Note:</h3>
                  <ul className="space-y-2">
                    {report.inspectorComments.areasOfNote.map((area, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#E54E3D] mr-2 mt-1">•</span>
                        <span className="text-[#1f2a37] text-sm">{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Purchase Recommendation */}
                <div>
                  <h3 className="text-sm font-bold text-[#1f2a37] mb-3">Purchase Recommendation:</h3>
                  <p className="text-sm font-bold text-green-600 mb-2">{report.inspectorComments.purchaseRecommendation.status}</p>
                  <p className="text-[#64748b] leading-relaxed text-sm">{report.inspectorComments.purchaseRecommendation.text}</p>
                </div>
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

      {/* Action Buttons - Bottom Middle - Hidden when printing */}
      <div className="flex justify-center items-center gap-4 py-6 print:hidden">
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
        <button
          onClick={handleSaveDraft}
          className="flex items-center gap-2 px-6 py-3 bg-white text-[#1f2a37] border-2 border-[#1f2a37] rounded-lg font-semibold hover:bg-[#f7f9fc] transition-colors shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Save Draft
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

