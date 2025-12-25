"use client";

import { useState, type ReactNode } from 'react';
import { CalendarCheck, MapPin, Wrench, FileText } from 'lucide-react';
import SiteFooter from './components/layout/SiteFooter';
import SiteHeader from './components/layout/SiteHeader';
import Link from 'next/link';

export default function Home() {
  const heroSocialLinks = [
    {
      label: 'Facebook',
      href: '#',
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M22 12.07C22 6.55 17.52 2 12 2S2 6.55 2 12.07C2 17 5.66 21.12 10.44 21.9v-6.89H7.9V12h2.54V9.79c0-2.5 1.48-3.89 3.76-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.25 0-1.64.78-1.64 1.58V12h2.79l-.45 3.01h-2.34v6.89C18.34 21.12 22 17 22 12.07Z" />
        </svg>
      ),
    },
    {
      label: 'Instagram',
      href: '#',
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.51 4.51 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5.75-2.75a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
        </svg>
      ),
    },
    {
      label: 'X',
      href: '#',
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4 3h4.38l3.24 4.86L15.98 3H20l-6.22 8.1L20.67 21h-4.31l-3.68-5.33L8.54 21H4.1l6.5-8.57Z" />
        </svg>
      ),
    },
    {
      label: 'YouTube',
      href: '#',
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 5 12 5 12 5s-6 0-7.7.3a2.7 2.7 0 0 0-1.9 1.9C2 9 2 12 2 12s0 3 .4 4.8a2.7 2.7 0 0 0 1.9 1.9C5.9 19 12 19 12 19s6 0 7.7-.3a2.7 2.7 0 0 0 1.9-1.9C22 15 22 12 22 12s0-3-.4-4.8ZM10 15.5v-7l6 3.5Z" />
        </svg>
      ),
    },
  ];

  type ChecklistType = 'standard' | 'enhanced' | 'full-spectrum' | 'routine';
  type ChecklistSection = { title: string; items: string[] };

  const standardChecklistSections: ChecklistSection[] = [
    {
      title: 'Body Condition',
      items: [
        'Dents, scratches, rust on panels',
        'Body panel gap consistency',
        'Presence of aftermarket body parts',
        'Alignment of doors, fenders, trunk',
        'Cracks/chips on windshield/windows',
      ],
    },
    {
      title: 'Lights',
      items: [
        'Headlamps/daytime running lights',
        'Parking lamps',
        'Turn signals',
        'Brake lights',
        'Hazard lights',
        'Light housings for cracks or moisture',
      ],
    },
    {
      title: 'Wheels & Tires',
      items: [
        'Sidewalls inspected for cracks/bulges',
        'Uniform tire size',
        'Wheels/Rims: No cracks/damage',
        'Wheels/Rims: No corrosion',
        'Spare tire condition',
      ],
    },
    {
      title: 'Exterior Components',
      items: [
        'Doors: Smooth opening/closing',
        'Hood/trunk release operational',
        'Door seals intact',
        'Water leakage signs around seals',
        'Hinge condition',
        'Lock mechanisms',
        'Safety latches operation',
      ],
    },
    {
      title: 'Undercarriage',
      items: [
        'Undercarriage visible rust/damage',
        'Exhaust System: Visible leaks or damage',
        'Exhaust System: Secure mounting',
        'Exhaust System: Excessive smoke/emissions',
      ],
    },
    {
      title: 'Engine',
      items: ['Oil level/condition', 'Air filter condition', 'No unusual sounds during operation'],
    },
    {
      title: 'Battery',
      items: ['Corrosion-free, securely mounted'],
    },
    {
      title: 'Fluid Inspection',
      items: [
        'Coolant level and condition',
        'Brake fluid level',
        'Power steering fluid (if applicable)',
        'Windshield washer fluid',
      ],
    },
    {
      title: 'Dashboard & Controls',
      items: [
        'Warning light check (when engine started)',
        'Gauge functionality',
        'Horn operational',
        'Buttons/knobs functioning',
        'Dashboard/steering wheel wear',
        'Climate control functionality',
        'Entertainment system basic operation',
      ],
    },
    {
      title: 'Windows & Mirrors',
      items: [
        'Window operation (all doors)',
        'Side mirrors adjustable',
        'Rear-view mirror condition',
      ],
    },
    {
      title: 'Safety Equipment',
      items: [
        'Seat belt condition and operation',
        'Airbag warning lights',
        'Child safety locks (if applicable)',
        'Emergency brake functionality',
      ],
    },
    {
      title: 'Functional Tests',
      items: [
        'Transmission: Gear shift operation',
        'Wipers: Operational',
        'AC Cooling System: Proper cooling',
        'Odometer: Mileage verified',
      ],
    },
    {
      title: 'Interior Condition',
      items: [
        'Seat condition and functionality',
        'Floor mats and carpeting',
        'Headliner condition',
        'Interior odours or water damage signs',
        'Interior lights',
      ],
    },
    {
      title: 'Driving Performance',
      items: [
        'Steering & Suspension: Shock absorbers intact',
        'Steering & Suspension: Smooth steering, no noise',
        'Braking System: Parking brake operational',
        'Braking System: Brake pads/shoes inspection',
        'Handling: Stable cornering/turns',
      ],
    },
  ];

  const enhancedChecklistSections: ChecklistSection[] = [
    {
      title: 'Body Condition',
      items: [
        'Paint finish consistency (check for evidence of repainting)',
        'Dents, scratches, rust on panels',
        'Body panel gap consistency',
        'Presence of aftermarket body parts',
        'Alignment of doors, fenders, trunk',
        'Cracks/chips on windshield/windows',
      ],
    },
    {
      title: 'Lights',
      items: [
        'Headlamps/daytime running lights',
        'Parking lamps',
        'Turn signals',
        'Brake lights',
        'Hazard lights',
        'Light housings for cracks or moisture',
      ],
    },
    {
      title: 'Wheels & Tires',
      items: [
        'Sidewalls inspected for cracks/bulges',
        'Uniform tire size',
        'Wheels/Rims: No cracks/damage',
        'Wheels/Rims: No corrosion',
        'Spare tire condition',
        'Tread depth even, wear uniform',
      ],
    },
    {
      title: 'Exterior Components',
      items: [
        'Doors: Smooth opening/closing',
        'Hood/trunk release operational',
        'Door seals intact',
        'Water leakage signs around seals',
        'Hinge condition',
        'Lock mechanisms',
        'Safety latches operation',
        'Roof: No sagging, leaks',
        'Sunroof/moonroof operational (if equipped)',
      ],
    },
    {
      title: 'Undercarriage',
      items: [
        'Undercarriage visible rust/damage',
        'Exhaust System: Visible leaks or damage',
        'Exhaust System: Secure mounting',
        'Exhaust System: Excessive smoke/emissions',
        'Exhaust System: Rust-free, no noise',
        'Chassis: No rust, cracks, or damage',
      ],
    },
    {
      title: 'Engine',
      items: ['Oil level/condition', 'Air filter condition', 'No unusual sounds during operation'],
    },
    {
      title: 'Battery',
      items: ['Corrosion-free, securely mounted'],
    },
    {
      title: 'Fluid Inspection',
      items: [
        'Coolant level and condition',
        'Brake fluid level',
        'Power steering fluid (if applicable)',
        'Windshield washer fluid',
        'Transmission fluid level/condition',
      ],
    },
    {
      title: 'Belts & Hoses',
      items: ['Drive Belt: No cracks/fraying', 'Belts & Hoses: Hoses intact, no leaks'],
    },
    {
      title: 'Dashboard & Controls',
      items: [
        'Warning light check (when engine started)',
        'Gauge functionality',
        'Horn operational',
        'Buttons/knobs functioning',
        'Dashboard/steering wheel wear',
        'Climate control functionality',
        'Entertainment system basic operation',
        'Electronic Systems: Key fob operation',
        'Electronic Systems: Seat heaters operational (if equipped)',
      ],
    },
    {
      title: 'Windows & Mirrors',
      items: [
        'Window operation (all doors)',
        'Side mirrors adjustable',
        'Rear-view mirror condition',
      ],
    },
    {
      title: 'Safety Equipment',
      items: [
        'Seat belt condition and operation',
        'Airbag warning lights',
        'Child safety locks (if applicable)',
        'Emergency brake functionality',
      ],
    },
    {
      title: 'Functional Tests',
      items: [
        'Transmission: Gear shift operation',
        'Wipers: Operational',
        'Wipers: Wiper blades condition',
        'Wipers: Washer fluid spray pattern',
        'AC Cooling System: Proper cooling',
        'Odometer: Mileage verified',
      ],
    },
    {
      title: 'Interior Condition',
      items: [
        'Seat condition and functionality',
        'Floor mats and carpeting',
        'Headliner condition',
        'Interior odours or water damage signs',
        'Interior lights',
      ],
    },
    {
      title: 'Seats & Upholstery',
      items: ['Stains, tears, wear', 'Seat adjustment operation (all functions)', 'Seatbelts functional (all positions)'],
    },
    {
      title: 'Driving Performance',
      items: [
        'Steering & Suspension: Shock absorbers intact',
        'Steering & Suspension: Smooth steering, no noise',
        'Braking System: Parking brake operational',
        'Braking System: Brake pads/shoes inspection',
        'Braking System: Rotors, calipers, drums inspected',
        'Handling: Stable cornering/turns',
        'Extended test drive (minimum 5 miles)',
        'Acceleration and shifting smoothness',
        'Braking performance at various speeds',
      ],
    },
    {
      title: 'Diagnostic Testing',
      items: [
        'OBD computer scan for error codes',
        'Battery load test',
        'Alternator output test',
        'Cooling system pressure test',
      ],
    },
  ];

  const fullSpectrumChecklistSections: ChecklistSection[] = [
    {
      title: 'Body Condition',
      items: [
        'Paint finish consistency (check for evidence of repainting)',
        'Dents, scratches, rust on panels',
        'Body panel gap consistency',
        'Presence of aftermarket body parts',
        'Alignment of doors, fenders, trunk',
        'Cracks/chips on windshield/windows',
        'Signs of repainting (with paint thickness gauge)',
        'Frame inspection for signs of structural damage or repair',
      ],
    },
    {
      title: 'Lights',
      items: [
        'Headlamps/daytime running lights',
        'Parking lamps',
        'Turn signals',
        'Brake lights',
        'Hazard lights',
        'Light housings for cracks or moisture',
        'Light output measurement',
        'Lens clarity and condition',
      ],
    },
    {
      title: 'Wheels & Tires',
      items: [
        'Sidewalls inspected for cracks/bulges',
        'Uniform tire size',
        'Wheels/Rims: No cracks/damage',
        'Wheels/Rims: No corrosion',
        'Spare tire condition',
        'Tread depth even, wear uniform',
        'Tire age verification (DOT code)',
        'Wheel alignment check',
        'Tire pressure monitoring system operation',
      ],
    },
    {
      title: 'Exterior Components',
      items: [
        'Doors: Smooth opening/closing',
        'Hood/trunk release operational',
        'Door seals intact',
        'Water leakage signs around seals',
        'Hinge condition',
        'Lock mechanisms',
        'Safety latches operation',
        'Roof: No sagging, leaks',
        'Sunroof/moonroof operational (if equipped)',
        'Weather stripping condition',
        'External trim and moulding condition',
      ],
    },
    {
      title: 'Undercarriage',
      items: [
        'Undercarriage visible rust/damage',
        'Exhaust System: Visible leaks or damage',
        'Exhaust System: Secure mounting',
        'Exhaust System: Excessive smoke/emissions',
        'Exhaust System: Rust-free, no noise',
        'Chassis: No rust, cracks, or damage',
        'Underbody Inspection: check for rust, leaks, or damage',
        'Suspension components inspection',
        'Brake line condition',
        'Fuel line condition',
      ],
    },
    {
      title: 'Engine',
      items: [
        'Oil level/condition',
        'Air filter condition',
        'No unusual sounds during operation',
        'Valve cover/cylinder head gasket condition',
        'Spark plugs checked',
        'Compression test',
        'Vacuum test',
        'Cooling system pressure test',
        'Fuel system operation',
        'Engine mounts condition',
      ],
    },
    {
      title: 'Battery & Alternator',
      items: [
        'Corrosion-free, securely mounted',
        'Battery load test',
        'Terminal condition',
        'Battery age verification',
        'Alternator output ensures proper battery charging',
        'Belt tension and condition',
      ],
    },
    {
      title: 'Fluid Inspection',
      items: [
        'Coolant level and condition',
        'Brake fluid level',
        'Power steering fluid (if applicable)',
        'Windshield washer fluid',
        'Transmission fluid level/condition',
        'Differential fluid (if applicable)',
        'Transfer case fluid (if applicable)',
        'Power steering pump operation',
      ],
    },
    {
      title: 'Belts & Hoses',
      items: ['Drive Belt: No cracks/fraying', 'Belts & Hoses: Hoses intact, no leaks', 'Tensioner operation', 'Belt routing verification'],
    },
    {
      title: 'Diagnostic Testing',
      items: [
        'OBD-II error codes reviewed',
        'VIN Check',
        'Emission system test',
        'Battery voltage drop test',
        'Parasitic draw test',
        'Power balance test',
        'Fuel pressure test',
        'Timing check',
        'Ignition system operation',
        'Sensor operation verification',
      ],
    },
    {
      title: 'Dashboard & Controls',
      items: [
        'Warning light check (when engine started)',
        'Gauge functionality',
        'Horn operational',
        'Buttons/knobs functioning',
        'Dashboard/steering wheel wear',
        'Climate control functionality',
        'Entertainment system basic operation',
        'Electronic Systems: Key fob operation',
        'Electronic Systems: Infotainment system full functionality',
        'Electronic Systems: Seat heaters operational (if equipped)',
        'Back camera functionality (if equipped)',
        'Parking sensors operation (if equipped)',
      ],
    },
    {
      title: 'Windows & Mirrors',
      items: [
        'Window operation (all doors)',
        'Side mirrors adjustable',
        'Rear-view mirror condition',
        'Window tint condition and legality',
        'Window regulator operation',
        'Defrost functionality',
      ],
    },
    {
      title: 'Safety Equipment',
      items: [
        'Seat belt condition and operation',
        'Airbag warning lights',
        'Child safety locks (if applicable)',
        'Emergency brake functionality',
        'Safety system warning light check',
        'Anti-lock brake system functionality',
        'Stability control system functionality',
      ],
    },
    {
      title: 'Functional Tests',
      items: [
        'Transmission: Gear shift operation',
        'Wipers: Operational',
        'Wipers: Wiper blades condition',
        'Wipers: Washer fluid spray pattern',
        'AC Cooling System: Proper cooling',
        'AC Cooling System: Compressor/refrigerant levels inspected',
        'Odometer: Mileage verified',
        'Cruise control functionality',
        'Auxiliary systems operation',
      ],
    },
    {
      title: 'Interior Condition',
      items: [
        'Seat condition and functionality',
        'Floor mats and carpeting',
        'Headliner condition',
        'Interior odours or water damage signs',
        'Interior lights',
        'Interior trim condition',
        'Console functionality',
        'Glovebox operation',
        'Storage compartment condition',
      ],
    },
    {
      title: 'Seats & Upholstery',
      items: [
        'Stains, tears, wear (detailed inspection)',
        'Seat adjustment operation (all functions)',
        'Seatbelts functional (all positions)',
        'Seat heater operation',
        'Seat material condition',
      ],
    },
    {
      title: 'Driving Performance',
      items: [
        'Steering & Suspension: Shock absorbers intact',
        'Steering & Suspension: Power steering fluid level',
        'Steering & Suspension: Smooth steering, no noise',
        'Braking System: Parking brake operational',
        'Braking System: Brake pads/shoes inspection',
        'Braking System: Rotors, calipers, drums inspected',
        'Braking System: Brake fluid level/condition',
        'Handling: Stable cornering/turns',
        'Acceleration and shifting smoothness',
        'Braking performance at various speeds',
        'Steering wheel alignment',
        'Engine performance under load',
        'Transmission shift points',
        'Clutch engagement (manual transmissions)',
        'Suspension noise during varied terrain',
        'High-speed stability',
      ],
    },
    {
      title: 'Audio/Entertainment System',
      items: ['Speaker functionality (all positions)', 'Audio quality assessment', 'Bluetooth connectivity', 'USB/auxiliary port functionality'],
    },
    {
      title: 'Emissions & Environmental',
      items: ['Smoke analysis', 'Emissions test readiness', 'Catalytic converter condition', 'Evaporative system integrity', 'Air injection system operation'],
    },
    {
      title: 'Price Negotiation',
      items: ['Price Negotiation Assistance: Inspector negotiates with seller'],
    },
  ];

  const checklistContent: Record<ChecklistType, { title: string; price: string; sections: ChecklistSection[] }> = {
    standard: { title: 'Standard Inspection Checklist', price: '$150', sections: standardChecklistSections },
    enhanced: { title: 'Enhanced Inspection Checklist', price: '$200', sections: enhancedChecklistSections },
    'full-spectrum': { title: 'Full-Spectrum Inspection Checklist', price: '$300', sections: fullSpectrumChecklistSections },
    routine: {
      title: 'Routine Check-Up Inspection Checklist',
      price: '$100',
      sections: [
        {
          title: 'Body & Glass',
          items: ['Visible body damage assessment', 'Windshield and window condition', 'Wiper blade condition'],
        },
        {
          title: 'Lights',
          items: ['Headlights (low/high beam)', 'Brake lights', 'Turn signals', 'Hazard lights'],
        },
        {
          title: 'Tires',
          items: ['Tire pressure check', 'Visual tread inspection', 'Sidewall condition check', 'Unusual wear patterns'],
        },
        {
          title: 'Fluid Levels',
          items: [
            'Engine oil level and condition',
            'Coolant level and condition',
            'Brake fluid level',
            'Power steering fluid (if applicable)',
            'Windshield washer fluid',
          ],
        },
        {
          title: 'Battery',
          items: ['Terminal condition', 'Visual corrosion check', 'Secure mounting'],
        },
        {
          title: 'Belts & Hoses',
          items: ['Basic visual inspection for cracks/wear', 'Belt tension check', 'Visible leaks'],
        },
        {
          title: 'Engine Components',
          items: ['Spark plug inspection (accessible plugs)', 'Air filter condition', 'Visible fuel system components'],
        },
        {
          title: 'Brakes',
          items: ['Brake pedal feel', 'Parking brake operation', 'Visual brake pad thickness check', 'Rotor disk surface condition'],
        },
        {
          title: 'Engine',
          items: ['Cold start observation', 'Unusual noises check', 'Visible leaks inspection'],
        },
        {
          title: 'Steering & Suspension',
          items: ['Basic suspension check', 'Steering wheel play', 'Turning effort assessment'],
        },
        {
          title: 'Computer Diagnosis',
          items: ['OBD-II error codes reviewed', 'Warning light verification', 'Sensor functionality check'],
        },
        {
          title: 'Controls',
          items: ['Horn operation', 'Wipers and washers', 'Basic dashboard functions', 'Air conditioning/heating output'],
        },
        {
          title: 'Safety Systems',
          items: ['Seat belt operation', 'Warning light check', 'Mirror condition and adjustment'],
        },
        {
          title: 'Customer Concerns',
          items: [
            'Specific issues identified by vehicle owner',
            'Diagnostic assessment of reported symptoms',
            'Examination of customer identified issues',
          ],
        },
      ],
    },
  };

  const [activeChecklist, setActiveChecklist] = useState<null | ChecklistType>(null);
  const checklist = activeChecklist ? checklistContent[activeChecklist] : null;
  let checklistHeadingId: string | undefined;
  if (checklist && activeChecklist) {
    checklistHeadingId = activeChecklist + '-checklist-title';
  }

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

      {/* Hero Section - Hero Mechanic Image with Overlay */}
      <section
        id="home"
        className="relative overflow-hidden h-[656px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-mechanic.jpg')" }}
      >
        <div className="relative z-10 h-full px-[10%] flex items-center">
          <div className="mx-auto max-w-7xl w-full relative">
            {/* Vector Frame - Partial Outline (Left + Bottom + 75% Top, No Right) */}
            <svg
              width="343"
              height="500"
              viewBox="0 0 343 500"
              className="absolute pointer-events-none"
              style={{ left: '-30px', top: '-40px' }}
            >
              {/* Define a mask to hide right side and last portion of top */}
              <defs>
                <mask id="vectorMask">
                  <rect width="343" height="500" fill="white" />
                  {/* Hide right side */}
                  <rect x="255" y="0" width="100" height="500" fill="black" />
                  {/* Hide top border after ~180px */}
                  <rect x="180" y="0" width="100" height="20" fill="black" />
                </mask>
              </defs>
              
              {/* Draw full rounded rectangle border */}
              <rect
                x="2"
                y="2"
                width="339"
                height="496"
                rx="14"
                ry="14"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="4"
                mask="url(#vectorMask)"
              />
              {/* Dot at the end of top border */}
              <circle
                cx="190"
                cy="2.5"
                r="2.6"
                fill="#FFFFFF"
              />
              {/* Line at the bottom border */}
              <line
                x1="265"
                y1="498"
                x2="310"
                y2="498"
                stroke="#FFFFFF"
                strokeWidth="4"
                strokeLinecap="butt"
              />
            </svg>

            <div className="mb-5">
              <span 
                className="inline-flex items-center justify-center opacity-80"
                style={{
                  width: '209.92px',
                  height: '48.64px',
                  borderRadius: '100px',
                  backgroundColor: 'rgba(0, 0, 0, 0.45)',
                  backdropFilter: 'blur(106.8px)',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '12.8px',
                  lineHeight: '43.52px',
                  letterSpacing: '-2%',
                  color: '#FFFFFF',
                  textTransform: 'none'
                }}
              >
                Welcome to CheckMyRide
              </span>
            </div>
            <h1 
              className="font-bold text-white mb-4 sm:mb-6 text-xl sm:text-4xl lg:text-[51px] leading-tight sm:leading-[58px] w-full max-w-full sm:w-[496px]"
              style={{
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '-0.02em',
                fontWeight: 700,
                color: '#FFFFFF'
              }}
            >
              Professional Vehicle Inspections Before You Buy
            </h1>
            <p 
              className="text-white mb-5 sm:mb-8 text-xs sm:text-[15px] leading-relaxed sm:leading-[18px] w-full max-w-full sm:w-[641px]"
              style={{
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0%',
                fontWeight: 500,
                color: '#FFFFFF'
              }}
            >
              Don't risk buying a lemon. Our certified mechanics will<br className="hidden sm:block" />thoroughly inspect any vehicle before you purchase, giving you peace of mind<br className="hidden sm:block" />and confidence in your decision.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/book-appointment#booking-form"
                className="group inline-flex items-center justify-center rounded-[30px] bg-[#E54E3D] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#D43E2D] hover:shadow-xl"
                style={{
                  width: '198.4px',
                  height: '48px'
                }}
              >
                <span>Book Inspection</span>
                <span 
                  className="ml-3 flex items-center justify-center rounded-full bg-white"
                  style={{
                    width: '25.6px',
                    height: '25.6px'
                  }}
                >
                  <svg 
                    className="text-black" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{
                      width: '12.8px',
                      height: '12.8px'
                    }}
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
              </Link>
              <button 
                className="hidden sm:inline-flex items-center justify-center font-semibold"
                style={{
                  width: '195px',
                  height: '48px',
                  borderRadius: '30px',
                  backgroundColor: '#FFFFFF',
                  color: '#000000'
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Inspection Services Section */}
      <section id="features" className="relative bg-white px-4 sm:px-[10%] pt-[40px] pb-[30px] sm:pt-[40px] sm:pb-[30px] overflow-x-hidden">
        <div className="mx-auto max-w-7xl relative">
          {/* Header Section */}
          <div className="mb-8">
            <div>
              {/* Services Badge */}
              <div className="inline-flex items-center gap-2 bg-[#E54E3D] rounded-lg px-2 py-1 mb-4">
                <span className="flex items-center justify-center w-4 h-4 bg-white rounded">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="2" fill="#E54E3D" />
                    <rect x="6" y="6" width="4" height="4" fill="#C43E2D" />
                    <rect x="14" y="6" width="4" height="4" fill="#C43E2D" />
                    <rect x="6" y="14" width="4" height="4" fill="#C43E2D" />
                    <rect x="14" y="14" width="4" height="4" fill="#C43E2D" />
                  </svg>
                </span>
                <span className="text-white font-semibold text-sm">Services</span>
              </div>
              
              {/* Main Heading */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight text-[#0f172a] mb-4">
                Our Inspection Services
              </h2>
              
              {/* Intro Paragraph */}
              <p className="text-[0.94rem] sm:text-[1.01rem] leading-[1.6] text-[#3a4a61] max-w-2xl">
                Choose the inspection level that fits your needs. Whether it&apos;s a Routine Check-Up or our <span className="sm:whitespace-nowrap">comprehensive Full-Spectrum Inspection, we provide detailed findings to help you buy with confidence.</span>
              </p>
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Standard Inspection Card */}
            <div className="relative overflow-visible pb-44 sm:pb-44">
              {/* Image Container */}
              <div className="relative h-48 w-full rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/images/inspection1.png" 
                  alt="Standard Inspection" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Content Container */}
              <div className="absolute right-0" style={{ width: '90%', top: '159px' }}>
                <div className="relative rounded-tl-lg rounded-br-lg overflow-hidden shadow-lg" style={{ width: 'fit-content', height: '175px' }}>
                  {/* Red Banner */}
                  <div className="relative bg-[#E54E3D] py-2 rounded-tl-lg" style={{ width: 'fit-content', paddingLeft: '1rem', paddingRight: '1rem' }}>
                    <h3 className="text-white font-bold uppercase tracking-wide" style={{ fontSize: '0.7rem' }}>Standard Inspection</h3>
                  </div>
                  
                  {/* White Content Section */}
                  <div className="relative bg-white px-4 py-3 rounded-br-lg rounded-bl-none flex flex-col justify-between" style={{ minHeight: '120px', paddingBottom: '4px' }}>
                    <p className="text-[#3a4a61] leading-relaxed" style={{ fontSize: '0.77rem' }}>
                      Ideal for newer or low-mileage vehicles. A 50+ point inspection covering essential systems with attention to safety and performance.
                    </p>
                    <Link href="/services/standard-inspection" className="text-[#E54E3D] font-semibold hover:text-[#d14130] transition-colors underline" style={{ fontSize: '0.7rem' }}>
                      Explore Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Inspection Card */}
            <div className="relative overflow-visible pb-44 sm:pb-44">
              {/* Image Container */}
              <div className="relative h-48 w-full rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/images/inspection2.png" 
                  alt="Enhanced Inspection" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Content Container */}
              <div className="absolute right-0" style={{ width: '90%', top: '159px' }}>
                <div className="relative rounded-tl-lg rounded-br-lg overflow-hidden shadow-lg" style={{ width: 'fit-content', height: '175px' }}>
                  {/* Red Banner */}
                  <div className="relative bg-[#E54E3D] py-2 rounded-tl-lg" style={{ width: 'fit-content', paddingLeft: '1rem', paddingRight: '1rem' }}>
                    <h3 className="text-white font-bold uppercase tracking-wide" style={{ fontSize: '0.7rem' }}>Enhanced Inspection</h3>
                  </div>
                  
                  {/* White Content Section */}
                  <div className="relative bg-white px-4 py-3 rounded-br-lg rounded-bl-none flex flex-col justify-between" style={{ minHeight: '120px', paddingBottom: '4px' }}>
                    <p className="text-[#3a4a61] leading-relaxed" style={{ fontSize: '0.77rem' }}>
                      Our most popular 75+ point diagnostic inspection. Great for vehicles 5-10 years old or with moderate mileage needing detailed system analysis.
                    </p>
                    <Link href="/services/enhanced-inspection" className="text-[#E54E3D] font-semibold hover:text-[#d14130] transition-colors underline" style={{ fontSize: '0.7rem' }}>
                      Explore Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Routine Check-Up Card */}
            <div className="relative overflow-visible pb-44 sm:pb-44">
              {/* Image Container */}
              <div className="relative h-48 w-full rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/images/inspection3.jpg" 
                  alt="Routine Check-Up" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Content Container */}
              <div className="absolute right-0" style={{ width: '90%', top: '159px' }}>
                <div className="relative rounded-tl-lg rounded-br-lg overflow-hidden shadow-lg" style={{ width: 'fit-content', height: '175px' }}>
                  {/* Red Banner */}
                  <div className="relative bg-[#E54E3D] py-2 rounded-tl-lg" style={{ width: 'fit-content', paddingLeft: '1rem', paddingRight: '1rem' }}>
                    <h3 className="text-white font-bold uppercase tracking-wide" style={{ fontSize: '0.7rem' }}>Routine Check-Up</h3>
                  </div>
                  
                  {/* White Content Section */}
                  <div className="relative bg-white px-4 py-3 rounded-br-lg rounded-bl-none flex flex-col justify-between" style={{ minHeight: '120px', paddingBottom: '4px' }}>
                    <p className="text-[#3a4a61] leading-relaxed" style={{ fontSize: '0.77rem' }}>
                      For ongoing maintenance—helps car owners monitor health, prevent issues, and prepare vehicles for long journeys.
                    </p>
                    <Link href="/services/routine-check-up" className="text-[#E54E3D] font-semibold hover:text-[#d14130] transition-colors underline" style={{ fontSize: '0.7rem' }}>
                      Explore Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Spectrum Inspection Card */}
            <div className="relative overflow-visible pb-44 sm:pb-44">
              {/* Image Container */}
              <div className="relative h-48 w-full rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/images/inspection4.png" 
                  alt="Full-Spectrum Inspection" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Content Container */}
              <div className="absolute right-0" style={{ width: '90%', top: '159px' }}>
                <div className="relative rounded-tl-lg rounded-br-lg overflow-hidden shadow-lg" style={{ width: 'fit-content', height: '175px' }}>
                  {/* Red Banner */}
                  <div className="relative bg-[#E54E3D] py-2 rounded-tl-lg" style={{ width: 'fit-content', paddingLeft: '1rem', paddingRight: '1rem' }}>
                    <h3 className="text-white font-bold uppercase tracking-wide" style={{ fontSize: '0.7rem' }}>Full-Spectrum Inspection</h3>
                  </div>
                  
                  {/* White Content Section */}
                  <div className="relative bg-white px-4 py-3 rounded-br-lg rounded-bl-none flex flex-col justify-between" style={{ minHeight: '120px', paddingBottom: '4px' }}>
                    <p className="text-[#3a4a61] leading-relaxed" style={{ fontSize: '0.77rem' }}>
                      A premium 100+ point comprehensive evaluation with compression testing, frame analysis, and emissions checks for complete peace of mind.
                    </p>
                    <Link href="/services/full-spectrum-inspection" className="text-[#E54E3D] font-semibold hover:text-[#d14130] transition-colors underline" style={{ fontSize: '0.7rem' }}>
                      Explore Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Book Inspection CTA */}
          <div className="mt-24 sm:mt-48 flex flex-col items-center gap-1 sm:gap-2">
            <Link
              href="/book-appointment#booking-form"
              className="inline-flex items-center justify-center rounded-full bg-[#E54E3D] px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-[#d14130] hover:shadow-xl"
            >
              Book an Inspection Now
            </Link>
            <p className="text-sm font-medium text-[#34495E]">Call (613) 981-5498 for expert guidance.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="relative overflow-hidden bg-[linear-gradient(180deg,#162F45_0%,#1C3A54_45%,#213F5D_75%,#0B1F31_100%)] px-[10%] pt-[40px] pb-[53px] text-white sm:pt-[40px] sm:pb-[53px]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(23,50,76,0.35),transparent_65%),radial-gradient(circle_at_bottom_right,rgba(14,33,52,0.4),transparent_70%)]" />
        <div className="pointer-events-none absolute -left-56 top-[-6rem] hidden h-[640px] w-[360px] lg:block">
          <div className="hero-wave" />
        </div>
        <div className="pointer-events-none absolute -right-56 bottom-[-6rem] hidden h-[640px] w-[360px] lg:block">
          <div className="hero-wave rotate-180" />
        </div>
        <div className="mx-auto max-w-6xl relative">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight text-white">
                How <span className="text-[#E54E3D]">It Works</span> 
              </h2>
            <p className="mt-4 text-lg sm:text-xl leading-relaxed text-white/80 max-w-2xl mx-auto">
              Our inspection process is designed for speed, convenience, and confidence. Here's what to expect when you book with CheckMyRide.
              </p>
            </div>

          <ol className="mt-12 grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-4">
            <Step
              index={1}
              icon={<CalendarCheck className="h-6 w-6" />}
              title="Book Online"
              text="Schedule your inspection in minutes through our easy booking system. Input your preferred inspection location or choose a CheckMyRide location."
            />
            <Step
              index={2}
              icon={<MapPin className="h-6 w-6" />}
              title="Coordination"
              text="We coordinate with you or the seller to confirm location and time, managing any proposed changes quickly and efficiently."
            />
            <Step
              index={3}
              icon={<Wrench className="h-6 w-6" />}
              title="Inspection"
              text="Our certified mechanic conducts a full inspection of the vehicle. Ensure the vehicle is accessible and ready at the scheduled time and place."
            />
            <Step
              index={4}
              icon={<FileText className="h-6 w-6" />}
              title="Detailed Report"
              text="Within hours after the inspection and payment, you'll receive a detailed report with our findings and expert recommendations."
            />
          </ol>

          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/book-appointment#booking-form"
              className="inline-flex items-center justify-center rounded-[30px] bg-[#E54E3D] h-[60px] px-8 font-bold text-white shadow-lg shadow-[#E54E3D]/35 transition hover:-translate-y-0.5 hover:bg-[#d14130]"
            >
              <span>Book Inspection</span>
              <span className="ml-3 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <svg className="h-4 w-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </Link>
            <Link
              href="/report-sample"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_12px_28px_rgba(5,15,27,0.45)] transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              View Sample Report
            </Link>
                </div>

          <p className="mt-6 text-center text-sm text-white/70">Serving Ottawa, Gatineau, Kanata & Orleans</p>
              </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative overflow-hidden bg-[#fdf5f3] px-[10%] pt-[40px] pb-[60px] sm:pt-[40px] sm:pb-[60px]">
        <div className="mx-auto max-w-6xl relative">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight text-[#0f172a]">
                Our <span className="text-[#E54E3D]">Pricing</span> 
              </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#3a4a61] max-w-2xl mx-auto">
                Transparent and competitive pricing for our professional inspection services.
              </p>
                  </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[{
              name: 'Standard',
              price: '$150',
              bgColor: 'bg-white',
              textColor: 'text-[#0f172a]',
              priceColor: 'text-[#0f172a]',
              badge: null,
              detailsHref: '/services/standard-inspection',
              bookingValue: 'standard',
              checklistType: 'standard',
              features: ['50+ Point Inspection', 'Detailed Report', 'Professional Mechanic', "Service at Seller's Location"],
            },
            {
              name: 'Enhanced',
              price: '$200',
              bgColor: 'bg-[#1f2937]',
              textColor: 'text-white',
              priceColor: 'text-white',
              badge: 'Most Popular',
              detailsHref: '/services/enhanced-inspection',
              bookingValue: 'enhanced',
              checklistType: 'enhanced',
              features: ['75+ Point Inspection', 'Comprehensive Report', 'Professional Mechanic', "Service at Seller's Location"],
            },
            {
              name: 'Full-Spectrum',
              price: '$300',
              bgColor: 'bg-white',
              textColor: 'text-[#0f172a]',
              priceColor: 'text-[#0f172a]',
              badge: null,
              detailsHref: '/services/full-spectrum-inspection',
              bookingValue: 'full-spectrum',
              checklistType: 'full-spectrum',
              features: ['100+ Point Inspection', 'Elite Detailed Report', 'Professional Mechanic', "Service at Seller's Location"],
            },
            {
              name: 'Routine Check-Up',
              price: '$100',
              bgColor: 'bg-white',
              textColor: 'text-[#0f172a]',
              priceColor: 'text-[#0f172a]',
              badge: null,
              detailsHref: '/services/routine-check-up',
              bookingValue: 'routine',
              checklistType: 'routine',
              features: ['Multi-Point Inspection', 'Fluid Levels Check', 'Tire & Brake Assessment', 'Battery Health Evaluation'],
            }].map((plan) => (
              <article
                key={plan.name}
                className={`group relative flex flex-col border border-gray-200 ${plan.bgColor} p-8 shadow-lg transition-all duration-300 hover:shadow-xl rounded-tl-[2rem] rounded-br-[2rem]`}
              >
                {plan.badge && (
                  <span className="absolute right-4 -top-2 rounded-full bg-[#E54E3D] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    {plan.badge}
                  </span>
                )}

                <header className="flex flex-col gap-4 mb-6 items-start text-left">
                  <div className="w-full">
                    <h3 className={`text-xl font-bold ${plan.textColor}`}>{plan.name}</h3>
                    <div className="mt-2 h-0.5 w-[40%] bg-[#E54E3D]"></div>
                  </div>
                  <div className={`text-4xl font-semibold ${plan.priceColor}`}>{plan.price}</div>
                </header>

                <ul className="flex-1 space-y-4 mb-6">
                  {plan.features.map((item) => (
                    <li key={item} className={`flex items-center justify-between gap-3 text-sm ${plan.textColor}`}>
                      <span className="flex-1">{item}</span>
                      <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#E54E3D] text-white flex-shrink-0">
                        <svg className="h-2 w-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-7.071 7.071a1 1 0 0 1-1.414 0L5.293 11.95a1 1 0 1 1 1.414-1.414l1.828 1.829 6.364-6.364a1 1 0 0 1 1.414 0Z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.checklistType === 'standard' ? (
                  <button
                    type="button"
                    onClick={() => setActiveChecklist('standard')}
                    className="mb-4 inline-flex items-center justify-start gap-2 text-sm font-semibold text-[#E54E3D] transition-colors hover:text-[#c63a2c]"
                  >
                    View Full Checklist
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m13 6 6 6-6 6" />
                    </svg>
                  </button>
                ) : (
                  plan.checklistType ? (
                    <button
                      type="button"
                      onClick={() => setActiveChecklist(plan.checklistType as ChecklistType)}
                      className="mb-4 inline-flex items-center justify-start gap-2 text-sm font-semibold text-[#E54E3D] transition-colors hover:text-[#c63a2c]"
                    >
                      View Full Checklist
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="m13 6 6 6-6 6" />
                      </svg>
                    </button>
                  ) : (
                    plan.detailsHref && (
                      <Link
                        href={plan.detailsHref}
                        className="mb-4 inline-flex items-center justify-start gap-2 text-sm font-semibold text-[#E54E3D] transition-colors hover:text-[#c63a2c]"
                      >
                        View Full Checklist
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14" />
                          <path d="m13 6 6 6-6 6" />
                        </svg>
                      </Link>
                    )
                  )
                )}

                <Link
                  href={`/book-appointment?service=${plan.bookingValue}#booking-form`}
                  className="mt-auto inline-flex w-full items-center justify-center gap-2 border-2 border-black bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-black transition-all duration-300 hover:bg-[#E54E3D] hover:border-[#E54E3D] hover:text-white hover:shadow-lg hover:scale-105 rounded-tl-lg rounded-br-lg"
                >
                  BOOK NOW
                  <svg className="h-4 w-4 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </Link>
              </article>
            ))}
                  </div>
                </div>
      </section>

      {/* Why Choose Section */}
      <section id="why-choose" className="relative overflow-hidden bg-[#f7f9fc] px-[10%] pt-[40px] pb-[65px] sm:pt-[40px] sm:pb-[65px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,78,61,0.1),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.08),transparent_60%),radial-gradient(circle_at_center,rgba(16,185,129,0.08),transparent_55%)]" />
        <div className="mx-auto max-w-6xl relative">
          <div className="text-center mb-14">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#fde9e4] px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#E54E3D]">
              Performance. Precision. Peace of Mind.
                </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight text-[#0f172a]">
              Why Choose <span className="text-[#E54E3D]">CheckMyRide?</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#3a4a61] max-w-3xl mx-auto">
              At CheckMyRide, we merge technology, expertise, and transparency to deliver top-tier vehicle inspections designed for modern drivers.
                    </p>
                  </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[{
              title: 'Certified Mechanics',
              desc: 'Our certified experts use professional-grade tools and digital diagnostics to ensure accurate, reliable inspections.',
              iconBg: 'bg-gradient-to-br from-[#E64B37] to-[#f97362]',
              icon: '🧰',
            }, {
              title: 'Mobile Service',
              desc: 'Whether at your home, a dealership, or a private seller\'s location—we bring the full inspection experience to you.',
              iconBg: 'bg-[#E64B37]',
              icon: '🚐',
            }, {
              title: 'Comprehensive Reports',
              desc: 'Comprehensive inspection summaries that provide clear ratings for every component tested, along with detailed inspector notes, professional comments, and tailored maintenance or repair recommendations.',
              iconBg: 'bg-[#E64B37]',
              icon: '📘',
            }, {
              title: 'Fast Turnaround',
              desc: 'Receive your vehicle\'s full inspection report within 24 hours, helping you make quick, confident decisions.',
              iconBg: 'bg-[#E64B37]',
              icon: '⏱️',
            }, {
              title: 'Save Money',
              desc: 'Our inspections prevent costly surprises by identifying hidden problems before purchase—saving you time and money.',
              iconBg: 'bg-[#E64B37]',
              icon: '💵',
            }, {
              title: 'Satisfaction Guaranteed',
              desc: 'Your confidence is our priority. We guarantee every inspection meets our exacting quality standards.',
              iconBg: 'bg-[#E64B37]',
              icon: '🏁',
            }].map((feature) => (
              <div key={feature.title} className="group relative flex flex-col gap-4 rounded-[24px] border border-[#e2e8f0] bg-white p-7 pt-12 pb-8 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <span className={`absolute -top-6 left-6 flex h-14 w-14 items-center justify-center rounded-full text-2xl shadow-lg shadow-[#E54E3D]/15 ${feature.iconBg}`}>
                  <span className="transition-transform duration-300 group-hover:-rotate-6">{feature.icon}</span>
                </span>
                <div className="space-y-1.5">
                  <h3 className="text-[1.05rem] font-semibold text-[#152032]">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-[#3f4756]">{feature.desc}</p>
                </div>
                </div>
              ))}
              </div>

          <div className="mt-16 flex flex-col items-center gap-2">
            <Link
              href="/book-appointment#booking-form"
              className="inline-flex items-center justify-center rounded-[30px] bg-[#E54E3D] h-[60px] px-8 font-bold text-white shadow-[0_10px_25px_rgba(229,78,55,0.35)] transition hover:-translate-y-0.5 hover:bg-[#d14130]"
            >
              <span>Book Inspection</span>
              <span className="ml-3 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <svg className="h-4 w-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </Link>
            <p className="text-sm font-medium text-[#2f3a4c]">Trusted by used vehicle buyers and sellers.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative overflow-hidden bg-[#f7f9fc] px-[10%] pt-[40px] pb-20 sm:pt-[40px] sm:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,78,61,0.12),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_55%),radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_60%)]" />
        <div className="pointer-events-none absolute -left-40 top-[-5rem] hidden h-[520px] w-[280px] lg:block">
          <div className="hero-wave" />
              </div>
        <div className="pointer-events-none absolute -right-40 bottom-[-5rem] hidden h-[520px] w-[280px] lg:block">
          <div className="hero-wave rotate-180" />
            </div>

        <div className="mx-auto max-w-6xl relative">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight text-[#0f172a]">
                What <span className="text-[#E54E3D]">Our Customers Say</span> 
              </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#3a4a61] max-w-2xl mx-auto">
                Don't just take our word for it. Here's what some of our satisfied customers have to say about our services.
              </p>
              </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[{
              quote: 'CheckMyRide saved me from buying a car with hidden transmission issues. The inspection was thorough and the mechanic explained everything clearly. Worth every penny!',
              name: 'Michael Johnson',
              location: 'Kanata, ON',
            },
            {
              quote: "The convenience of having someone go to the seller's location made the whole process so easy. Professional service and detailed report helped me negotiate a better price.",
              name: 'Sarah Williams',
              location: 'Orleans, ON',
            },
            {
              quote: "As someone who knows nothing about cars, CheckMyRide gave me the confidence to make my purchase. Their inspector was knowledgeable and patient with all my questions.",
              name: 'David Chen',
              location: 'Barrhaven, ON',
            }].map((testimonial, index) => (
              <article
                key={testimonial.name}
                className="group relative flex h-full flex-col rounded-3xl border border-white/60 bg-white/95 p-8 shadow-xl shadow-slate-300/40 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:border-[#E54E3D]/40"
              >
                <div className="absolute -top-10 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-[#E54E3D] text-white shadow-xl shadow-[#E54E3D]/30">
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h3.983v10h-9.983z" />
                  </svg>
              </div>

                <p className="mt-10 text-sm sm:text-base leading-relaxed text-[#132032]/90">"{testimonial.quote}"</p>

                <footer className="mt-8 border-t border-white/60 pt-6">
                  <p className="text-lg font-semibold text-[#152032]">{testimonial.name}</p>
                  <p className="text-sm text-[#5c6574]">{testimonial.location}</p>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#E54E3D]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#E54E3D]">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd" />
                  </svg>
                    Verified Inspection
                </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Inspect CTA Section */}
      <section className="relative overflow-hidden bg-white px-4 sm:px-[10%] pt-[50px] pb-[50px]">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-8" style={{ minHeight: '170px' }}>
            {/* Left Section - Promotional Text */}
            <div className="relative bg-[#E54E3D] rounded-tl-[3rem] rounded-br-[3rem] px-4 lg:px-5 flex flex-col w-full lg:w-[70%]" style={{ minHeight: '170px' }}>
              {/* Decorative Icon Background */}
              <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                <svg className="w-44 h-44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 10 L60 40 L90 40 L68 58 L78 88 L50 70 L22 88 L32 58 L10 40 L40 40 Z" stroke="white" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              
              <div className="relative z-10 flex-1 flex flex-col justify-center pt-[20px] pb-[20px]">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight mb-1">
                  Ready to Inspect Your<br className="hidden sm:block" />Next Ride?
                </h2>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-1.5">
                  Don't take chances with one of the biggest purchases you'll make.<br className="hidden sm:block" />Let our experts inspect the vehicle and give you peace of mind.
                </p>
              </div>
              <Link
                href="/book-appointment#booking-form"
                className="absolute bottom-[20px] right-[20px] sm:bottom-auto sm:top-[20px] z-20 inline-flex items-center justify-center bg-white text-black font-bold px-2.5 sm:px-5 py-1.5 sm:py-[7.26px] rounded-tl-lg rounded-br-lg hover:bg-gray-100 transition-colors text-[9px] sm:text-[12.75px]"
              >
                BOOK AN INSPECTION NOW
              </Link>
            </div>

            {/* Right Section - Car Inspection Image */}
            <div className="hidden lg:block rounded-tl-3xl rounded-bl-3xl overflow-hidden" style={{ width: '30%', height: '170px' }}>
              <img 
                src="/images/abovefoot.jpg" 
                alt="Professional vehicle inspection" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />

      {checklist && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 py-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby={checklistHeadingId}
          onClick={() => setActiveChecklist(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl bg-white text-[#0f172a] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveChecklist(null)}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#E64B37]/10 text-[#E64B37] transition hover:bg-[#E64B37]/20"
              aria-label="Close checklist"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>

            <header className="border-b border-[#e2e8f0] px-6 py-5 sm:px-8">
              <h2 id={checklistHeadingId} className="text-xl font-bold text-[#0f172a] sm:text-2xl">
                {checklist.title}
                <span className="text-[#E64B37]"> &nbsp;– {checklist.price}</span>
              </h2>
            </header>

            <div className="max-h-[70vh] overflow-y-auto px-6 py-6 sm:px-8">
              <div className="space-y-6 pr-1">
                {checklist.sections.map((section) => (
                  <section key={section.title} className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-5 py-4 shadow-sm">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-[#0f172a]">{section.title}</h3>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[#1f2937]">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                  ))}
                </ul>
                  </section>
                ))}
          </div>
        </div>
        
            <div className="flex flex-col items-center gap-3 border-t border-[#e2e8f0] px-6 py-5 sm:flex-row sm:justify-between sm:px-8">
              <p className="text-xs text-[#475569] sm:text-sm">
                Need more coverage? Explore the other inspection packages to find your perfect fit.
              </p>
              <button
                type="button"
                onClick={() => setActiveChecklist(null)}
                className="inline-flex items-center gap-2 rounded-full bg-[#E64B37] px-6 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#d14130]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Step({ index, icon, title, text }: { index: number; icon: ReactNode; title: string; text: string }) {
  return (
    <li className="relative">
      <div className="group h-full rounded-[32px] bg-[#334E65] p-7 shadow-[0_18px_44px_rgba(5,15,27,0.55)] transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_26px_58px_rgba(5,15,27,0.65)]">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E64B37] text-sm font-semibold text-white shadow-lg shadow-[#E64B37]/35">
            {index}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/12 text-white shadow-inner shadow-black/10">
            {icon}
          </span>
          <h3 className="flex-1 text-[15px] font-semibold leading-tight text-white">{title}</h3>
        </div>
        <p className="mt-5 text-[13px] leading-6 text-white/80 sm:text-sm sm:leading-6">{text}</p>
      </div>
    </li>
  );
}


