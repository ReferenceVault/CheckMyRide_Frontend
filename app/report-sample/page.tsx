'use client';

import { useState } from 'react';

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
    overallRating: 8.2,
    criticalIssues: 0,
    itemsNeedingAttention: 3,
    overallConditionDescription: 'This 2020 Honda Civic EX is in good overall condition with normal wear consistent with its age and mileage. The vehicle has been well-maintained with regular service records. Minor cosmetic issues noted. Mechanical systems are functioning properly. Recommended for purchase with attention to noted items.',
  },
  detailedInspection: [
    {
      category: 'EXTERIOR',
      items: [
        { component: 'Paint & Body', condition: 'Good', notes: 'Minor scratches on rear bumper, small door ding on driver\'s side' },
        { component: 'Glass & Windshield', condition: 'Excellent', notes: 'No chips or cracks detected' },
        { component: 'Lights & Signals', condition: 'Excellent', notes: 'All lights functioning properly' },
        { component: 'Mirrors', condition: 'Excellent', notes: 'Power mirrors operational, no cracks' },
      ],
    },
    {
      category: 'TIRES & WHEELS',
      items: [
        { component: 'Front Left Tire', condition: 'Good', notes: '7/32" tread depth, Michelin Defender, even wear' },
        { component: 'Front Right Tire', condition: 'Good', notes: '7/32" tread depth, Michelin Defender, even wear' },
        { component: 'Rear Left Tire', condition: 'Good', notes: '6/32" tread depth, Michelin Defender, even wear' },
        { component: 'Rear Right Tire', condition: 'Good', notes: '6/32" tread depth, Michelin Defender, even wear' },
        { component: 'Spare Tire', condition: 'Excellent', notes: 'Never used, properly inflated' },
        { component: 'Wheels', condition: 'Good', notes: 'Minor curb rash on front right wheel' },
      ],
    },
    {
      category: 'UNDER THE HOOD',
      items: [
        { component: 'Engine', condition: 'Excellent', notes: '2.5L 4-cylinder, clean, no leaks, runs smooth' },
        { component: 'Battery', condition: 'Good', notes: '12.6V tested, 2 years old, terminals clean' },
        { component: 'Belts & Hoses', condition: 'Excellent', notes: 'No cracks or wear, proper tension' },
        { component: 'Fluids', condition: 'Excellent', notes: 'All fluids clean and at proper levels' },
        { component: 'Air Filter', condition: 'Fair', notes: 'Moderately dirty, recommend replacement soon' },
      ],
    },
    {
      category: 'BRAKES',
      items: [
        { component: 'Front Brake Pads', condition: 'Good', notes: '6mm remaining, approximately 60% life' },
        { component: 'Rear Brake Pads', condition: 'Excellent', notes: '8mm remaining, approximately 80% life' },
        { component: 'Brake Rotors', condition: 'Excellent', notes: 'No scoring or warping detected' },
        { component: 'Brake Fluid', condition: 'Excellent', notes: 'Clean, proper level' },
      ],
    },
    {
      category: 'SUSPENSION & STEERING',
      items: [
        { component: 'Shock Absorbers', condition: 'Excellent', notes: 'No leaks, firm rebound test' },
        { component: 'Struts', condition: 'Excellent', notes: 'Functioning properly, no leaks' },
        { component: 'Ball Joints', condition: 'Excellent', notes: 'No play detected' },
        { component: 'Tie Rods', condition: 'Excellent', notes: 'Tight, no excessive play' },
        { component: 'Steering System', condition: 'Excellent', notes: 'Responsive, no unusual noises' },
      ],
    },
    {
      category: 'INTERIOR',
      items: [
        { component: 'Seats', condition: 'Good', notes: 'Fabric in good condition, driver seat shows normal wear' },
        { component: 'Dashboard', condition: 'Excellent', notes: 'No cracks, all warning lights functioning' },
        { component: 'Climate Control', condition: 'Excellent', notes: 'AC blows cold, heat works properly' },
        { component: 'Audio System', condition: 'Excellent', notes: 'All speakers functional, Bluetooth connected successfully' },
        { component: 'Power Windows', condition: 'Excellent', notes: 'All windows operate smoothly' },
        { component: 'Door Locks', condition: 'Excellent', notes: 'Power locks functioning, key fob responsive' },
      ],
    },
    {
      category: 'SAFETY SYSTEMS',
      items: [
        { component: 'Airbags', condition: 'Excellent', notes: 'SRS light off, no recalls outstanding' },
        { component: 'Seatbelts', condition: 'Excellent', notes: 'All seatbelts retract properly, no fraying' },
        { component: 'ABS System', condition: 'Excellent', notes: 'Tested during road test, functioning properly' },
      ],
    },
    {
      category: 'UNDERCARRIAGE',
      items: [
        { component: 'Frame', condition: 'Excellent', notes: 'No rust or damage, structurally sound' },
        { component: 'Exhaust System', condition: 'Excellent', notes: 'No leaks, hangers secure' },
        { component: 'Transmission', condition: 'Excellent', notes: 'Shifts smoothly, no leaks detected' },
        { component: 'Differential', condition: 'Excellent', notes: 'No leaks, fluid level good' },
      ],
    },
  ],
  itemsRequiringAttention: [
    { priority: 'Medium', item: 'Air Filter', recommendation: 'Replace within next 1,000 miles', estimatedCost: '$40-60' },
    { priority: 'Medium', item: 'Cabin Air Filter', recommendation: 'Replace at next service', estimatedCost: '$25-40' },
    { priority: 'Low', item: 'Minor Paint Touch-ups', recommendation: 'Optional cosmetic repair for scratches and ding', estimatedCost: '$150-300' },
  ],
  roadTest: {
    results: [
      { category: 'ACCELERATION', rating: 'Excellent' },
      { category: 'BRAKING', rating: 'Excellent' },
      { category: 'HANDLING', rating: 'Excellent' },
      { category: 'NOISE LEVEL', rating: 'Good' },
      { category: 'VIBRATION', rating: 'None Detected' },
      { category: 'WARNING LIGHTS', rating: 'None Active' },
    ],
    testRoute: 'City streets and highway - approximately 15 miles',
    notes: 'Vehicle performed excellently during the road test. Acceleration is smooth and responsive. Braking is straight and strong. Steering is precise with no pulling. No unusual noises or vibrations detected. Transmission shifts smoothly through all gears.',
  },
  serviceHistory: {
    recordsReviewed: 'Yes - Complete dealer service records available',
    lastService: 'October 2025 @ 47,245 miles',
    majorServices: [
      '30,000 mile service - Completed (2021)',
      'Oil changes - Every 5,000 miles (All documented)',
      'Tire rotation - Every 10,000 miles (All documented)',
      'Brake service - 40,000 miles (Front pads replaced)',
    ],
  },
  inspectorComments: {
    overallAssessment: 'This 2020 Honda Civic EX represents a solid used vehicle purchase. The car has been well-maintained by its previous owner, with complete service records from the dealer. The vehicle shows normal wear and tear consistent with its age and mileage. All major mechanical systems are functioning properly, and there are no critical safety concerns.',
    strengths: [
      'Excellent maintenance history with complete records',
      'Strong mechanical condition across all major systems',
      'No rust or structural damage',
      'Clean interior with minimal wear',
      'Reliable model with good reputation',
    ],
    areasOfNote: [
      'Minor cosmetic imperfections (scratches, small ding)',
      'Air filters should be replaced soon',
      'Front brakes at 60% - will need replacement in 12-18 months',
    ],
    purchaseRecommendation: {
      status: 'RECOMMENDED FOR PURCHASE',
      text: 'This vehicle is in good condition and represents fair value at the current market price. Budget approximately $100-150 for minor maintenance items in the near term.',
    },
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

export default function SampleReportPage() {
  
  
  const [report] = useState<ReportData>(SAMPLE_REPORT);
  

  

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    window.print();
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
      'at-market': 'At Market Value',
    };
    return labels[assessment] || assessment;
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
                INSPECTION REPORT
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
                    {report.vehicleInfo.mileage && (
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
            const overallConditionValue = report.summary.overallCondition || 'fair';
            const conditionAngle = overallConditionValue === 'excellent' ? 135 : 
                                  overallConditionValue === 'good' ? 90 : 
                                  overallConditionValue === 'fair' ? 45 : 
                                  overallConditionValue === 'needs-attention' ? 20 : 0;
            
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

            // Get recommendation badge color
            const getRecommendationColor = (rec: string) => {
              const r = rec.toLowerCase();
              if (r.includes('recommended')) return 'bg-green-100 text-green-800 border-green-300';
              if (r.includes('caution')) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
              if (r.includes('negotiate')) return 'bg-orange-100 text-orange-800 border-orange-300';
              if (r.includes('not-recommended') || r.includes('not recommended')) return 'bg-red-100 text-red-800 border-red-300';
              return 'bg-gray-100 text-gray-800 border-gray-300';
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
                    <div className="lg:col-span-1 print:col-span-1">
                      <div className="flex flex-col items-center print:items-center">
                        <svg width="200" height="120" viewBox="0 0 200 120" className="mb-4 print:w-full print:max-w-[180px] print:h-auto" style={{ maxWidth: '180px' }}>
                          <defs>
                            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#ef4444" />
                              <stop offset="50%" stopColor="#eab308" />
                              <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                          </defs>
                          {/* Background Arc */}
                          <path
                            d="M 20 100 A 80 80 0 0 1 180 100"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="20"
                            strokeLinecap="round"
                          />
                          {/* Colored Gradient Arc - Full arc visible */}
                          <path
                            d="M 20 100 A 80 80 0 0 1 180 100"
                            fill="none"
                            stroke="url(#gaugeGradient)"
                            strokeWidth="20"
                            strokeLinecap="round"
                          />
                          {/* Needle */}
                          <line
                            x1="100"
                            y1="100"
                            x2={100 + 70 * Math.cos((conditionAngle - 90) * Math.PI / 180)}
                            y2={100 + 70 * Math.sin((conditionAngle - 90) * Math.PI / 180)}
                            stroke="#000"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                          {/* Center Circle */}
                          <circle cx="100" cy="100" r="6" fill="#000" />
                        </svg>
                        
                        <div className="text-center">
                          <p className="text-xs text-gray-500 mb-1">Vehicle Condition</p>
                          <p className={`text-xl font-bold ${
                            overallConditionValue === 'excellent' ? 'text-green-600' :
                            overallConditionValue === 'good' ? 'text-green-500' :
                            overallConditionValue === 'fair' ? 'text-yellow-500' :
                            overallConditionValue === 'needs-attention' ? 'text-orange-500' :
                            'text-red-500'
                          }`}>
                            {RATING_LABELS[overallConditionValue] || overallConditionValue}
                          </p>
                        </div>
                      </div>

                      {/* Purchase Recommendation */}
                      {report.summary.recommendations && (
                        <div className="mt-4">
                          <div className="space-y-2">
                            <p className="text-xs text-gray-500 text-center">Purchase Recommendation</p>
                            <div className={`px-4 py-2 rounded-lg border-2 font-bold text-center text-sm ${getRecommendationColor(report.summary.recommendations)}`}>
                              {formatRecommendation(report.summary.recommendations)}
                            </div>
                            {report.summary.recommendationNotes && (
                              <p className="text-xs text-gray-500 mt-2 text-center">{report.summary.recommendationNotes}</p>
                            )}
                          </div>
                        </div>
                      )}
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
            // Calculate all ratings from the report
            const allRatings: Array<{ category: string; item: string; rating: string; notes?: string }> = [];

            // Collect from bodyCondition
            if (report.bodyCondition && report.bodyCondition.length > 0) {
              report.bodyCondition.forEach((item) => {
                const rating = item.rating;
                const validRatings: Array<'excellent' | 'good' | 'fair' | 'needs-attention' | 'critical'> = 
                  ['excellent', 'good', 'fair', 'needs-attention', 'critical'];
                if (rating && validRatings.includes(rating as any)) {
                  allRatings.push({
                    category: 'Body Condition',
                    item: item.item,
                    rating: rating as 'excellent' | 'good' | 'fair' | 'needs-attention' | 'critical',
                    notes: item.notes,
                  });
                }
              });
            }

            // Collect from detailedInspection
            if (report.detailedInspection && report.detailedInspection.length > 0) {
              report.detailedInspection.forEach((category) => {
                category.items.forEach((item) => {
                  // Convert condition text back to rating
                  const condition = item.condition.toLowerCase();
                  let rating: string | null = null;
                  if (condition.includes('excellent')) rating = 'excellent';
                  else if (condition.includes('good')) rating = 'good';
                  else if (condition.includes('fair')) rating = 'fair';
                  else if (condition.includes('attention') || condition.includes('needs')) rating = 'needs-attention';
                  else if (condition.includes('critical')) rating = 'critical';
                  
                  if (rating) {
                    allRatings.push({
                      category: formatCategoryName(category.category),
                      item: item.component,
                      rating: rating,
                      notes: item.notes,
                    });
                  }
                });
              });
            }

            // Calculate metrics
            const totalInspected = allRatings.length;
            const excellentCount = allRatings.filter(r => r.rating === 'excellent').length;
            const goodCount = allRatings.filter(r => r.rating === 'good').length;
            const fairCount = allRatings.filter(r => r.rating === 'fair').length;
            const attentionCount = allRatings.filter(r => r.rating === 'needs-attention').length;
            const criticalCount = allRatings.filter(r => r.rating === 'critical').length;

            // Calculate safety score (average of all ratings)
            const safetyScore = totalInspected > 0
              ? (allRatings.reduce((sum, r) => sum + ratingToScore(r.rating), 0) / totalInspected).toFixed(1)
              : '0';

            // Get safety issues (items with needs-attention or critical)
            const safetyIssues = allRatings.filter(r => 
              r.rating === 'needs-attention' || r.rating === 'critical'
            );

            // Critical Safety count (critical only)
            const criticalSafetyCount = criticalCount;

            // Safety Attention count (needs-attention only)
            const safetyAttentionCount = attentionCount;

            // Other Concerns (fair ratings)
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
                      <p className="text-[17px] font-bold text-gray-800">{safetyScore}</p>
                      <p className="text-xs text-gray-500">Safety Score</p>
                    </div>
                    {/* Critical Safety */}
                    <div className="bg-green-100 p-2.5 rounded-lg border-2 border-green-300 text-center flex flex-col justify-center items-center">
                      <p className="text-[17px] font-bold text-green-800">{criticalSafetyCount}</p>
                      <p className="text-xs text-gray-600">Critical Safety</p>
                    </div>
                    {/* Safety Attention */}
                    <div className="bg-orange-100 p-2.5 rounded-lg border-2 border-orange-300 text-center flex flex-col justify-center items-center">
                      <p className="text-[17px] font-bold text-orange-800">{safetyAttentionCount}</p>
                      <p className="text-xs text-gray-600">Safety Attention</p>
                    </div>
                    {/* Other Concerns */}
                    <div className="bg-orange-100 p-2.5 rounded-lg border-2 border-orange-300 text-center flex flex-col justify-center items-center">
                      <p className="text-[17px] font-bold text-orange-800">{otherConcernsCount}</p>
                      <p className="text-xs text-gray-600">Other Concerns</p>
                    </div>
                  </div>

                  {/* Safety Issues Section */}
                  {safetyIssues.length > 0 && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3.5 rounded-r-lg mb-5">
                      <h3 className="text-xs font-bold text-gray-800 mb-2.5 flex items-center gap-2">
                        <span>▲</span> Safety Issues:
                      </h3>
                      <div className="space-y-1.5">
                        {safetyIssues.map((issue, index) => (
                          <div key={index} className="text-xs text-gray-700">
                            <span className="font-semibold">{issue.category}:</span> {issue.item}
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
                  {report.summary.inspectionSummary && (
                    <div className="bg-white border border-gray-200 p-4 rounded-lg">
                      <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <span>►</span>
                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        Inspector&apos;s Notes & Comments
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">{report.summary.inspectionSummary}</p>
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
                      <table className="w-full">
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
                      <table className="w-full">
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

          {/* How We Determine Purchase Recommendations */}
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
                  Our recommendations prioritize your safety. Safety-critical systems (brakes, steering, seat belts, airbags) and safety-related systems (lights, tires) are weighted more heavily than cosmetic or convenience items.
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
                        <td className="px-4 py-3 text-xs text-gray-700 border-b border-gray-200">Any critical safety issue, or 2+ safety items needing attention</td>
                      </tr>
                      <tr className="bg-orange-50">
                        <td className="px-4 py-3 text-xs font-semibold text-gray-800 border-b border-gray-200">Not Recommended</td>
                        <td className="px-4 py-3 text-xs text-gray-700 border-b border-gray-200">Overall score below 45, or safety systems below threshold</td>
                      </tr>
                      <tr className="bg-yellow-50">
                        <td className="px-4 py-3 text-xs font-semibold text-gray-800 border-b border-gray-200">Purchase with Caution</td>
                        <td className="px-4 py-3 text-xs text-gray-700 border-b border-gray-200">1 safety item needs attention, OR fair overall (45-69), OR safety showing wear, OR multiple non-safety items need attention</td>
                      </tr>
                      <tr className="bg-green-50">
                        <td className="px-4 py-3 text-xs font-semibold text-gray-800 border-b border-gray-200">Recommended</td>
                        <td className="px-4 py-3 text-xs text-gray-700 border-b border-gray-200">Good overall (70+) with good safety score (70+), minimal issues</td>
                      </tr>
                      <tr className="bg-green-100">
                        <td className="px-4 py-3 text-xs font-semibold text-gray-800">Highly Recommended</td>
                        <td className="px-4 py-3 text-xs text-gray-700">Excellent overall (90+) with strong safety (70+)</td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Important Disclaimer */}
          <div className="pt-6 px-[0.5px] print-section">
            <div className="bg-yellow-50 border-l-4 border-orange-500 p-6 rounded-lg">
              <h3 className="text-sm font-bold text-[#E54E3D] mb-4">Important Disclaimer</h3>
              <div className="text-[#1f2a37] space-y-3" style={{ fontSize: '11px' }}>
                <p>
                  This inspection report is provided for informational purposes only and represents the vehicle&apos;s condition at the time of inspection. CheckMyRide does not guarantee future reliability, cannot detect all potential issues, and recommends buyers conduct their own due diligence. This is a visual and functional inspection; we do not disassemble components.
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
      <div className="flex justify-center items-center gap-3 pt-2 pb-4 print:hidden">
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
