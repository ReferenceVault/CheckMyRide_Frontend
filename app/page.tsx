'use client';

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
  const checklistHeadingId = checklist ? `${activeChecklist}-checklist-title` : undefined;

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

      {/* Hero Section - Dark Background */}
      <section
        id="home"
        className="relative overflow-hidden bg-[#2B333B] px-[10%] pt-24 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-[1.25rem]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,78,61,0.2),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.18),transparent_50%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.22),transparent_45%)]" />
        <div className="pointer-events-none absolute -left-64 top-[-6rem] hidden h-[760px] w-[420px] lg:block">
          <div className="hero-wave" />
              </div>
        <div className="pointer-events-none absolute -right-64 bottom-[-6rem] hidden h-[760px] w-[420px] lg:block">
          <div className="hero-wave rotate-180" />
            </div>
        <div className="pointer-events-none absolute -right-24 -top-24 hidden h-96 w-96 rotate-12 rounded-full border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent lg:block">
          <div className="absolute inset-8 rounded-full border border-white/15" />
          <div className="absolute inset-0 flex items-center justify-center text-5xl text-white/20">
            🛠️
            </div>
          </div>
        <div className="pointer-events-none hidden lg:block">
          <div className="fixed left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
            <span className="block h-16 w-px bg-white/25" />
            {heroSocialLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#E54E3D] hover:border-[#E54E3D]"
              >
                {item.icon}
              </Link>
            ))}
            <span className="block h-16 w-px bg-white/25" />
          </div>
        </div>

        <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:items-center">
          <div className="-mt-14 lg:-mt-20">
            <div className="mb-5 flex items-center gap-4 text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/70 text-lg">
                🛠️
              </span>
              <span className="text-sm font-semibold uppercase tracking-[0.35em] text-white/80">
                Welcome to CheckMyRide
              </span>
            </div>
            <h1 className="text-[1.55rem] sm:text-[2.1rem] md:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-4 sm:mb-6">
              <span className="block whitespace-nowrap">Professional Vehicle Inspections</span>
              <span className="block text-[#E54E3D]">Before You Buy</span>
              </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-5 sm:mb-8">
                Don't risk buying a lemon. Our certified mechanics will thoroughly inspect any vehicle before you purchase, giving you peace of mind and confidence in your decision.
              </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/book-appointment#booking-form"
                className="group inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-[#E54E3D] px-4 sm:px-8 py-2 sm:py-4 text-xs sm:text-lg font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#D43E2D] hover:shadow-xl"
                >
                <span>Book An Inspection</span>
              </Link>
              <button className="hidden sm:inline-flex px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white border-2 border-gray-400 rounded-lg hover:border-gray-300 transition-all text-sm sm:text-lg font-semibold">
                  Learn More
                </button>
              </div>
            </div>

          <div className="hidden lg:flex justify-center lg:justify-end">
            <figure className="relative flex w-full max-w-[500px] items-center justify-center overflow-hidden rounded-3xl p-0 lg:-mt-[1.25rem]">
              <img
                src="/images/hero-vehicle.png"
                alt="Certified mechanic inspecting a vehicle"
                className="h-[580px] w-full rounded-3xl object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* Our Inspection Services Section */}
      <section id="features" className="relative bg-white px-[10%] pt-[40px] pb-[53px] sm:pt-[40px] sm:pb-[53px]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#fdf5f3] via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-y-10 left-10 hidden w-32 rounded-full bg-gradient-to-b from-[#fde8e2] via-transparent to-transparent blur-xl sm:block" />
        <div className="pointer-events-none absolute inset-y-24 right-6 hidden w-40 rounded-full bg-gradient-to-t from-[#fde0d6] via-transparent to-transparent blur-2xl lg:block" />
        <div className="mx-auto max-w-7xl relative">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight text-[#0f172a]">
                Our <span className="text-[#E54E3D]">Inspection</span> <span className="text-[#E54E3D]">Services</span>
              </h2>
            </div>

          <div className="relative grid gap-12 lg:grid-cols-[0.35fr_0.65fr] lg:items-start">
            <div className="relative hidden lg:block pt-[60px]">
              <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-tr from-[#0f172a] via-[#1f2937] to-[#0ea5e9] p-1 shadow-2xl">
                <div className="h-[620px] w-full rounded-[2.3rem] bg-cover bg-center" style={{ backgroundImage: "url('/images/service-driver.png')" }} />
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-transparent via-[#0ea5e9]/15 to-[#0f172a]/70 mix-blend-screen" />
                    </div>
                  </div>

            <div>
              <div className="mb-5 text-left">
                <p className="text-[0.95rem] sm:text-[1.02rem] leading-[1.6] text-[#3a4a61]">
                  Choose the inspection level that fits your needs. Whether it&apos;s a Routine Check-Up or our comprehensive Full-Spectrum Inspection, we provide detailed findings to help you buy with confidence.
              </p>
            </div>

              <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
                {/* Standard Inspection Card */}
                <div className="relative">
                  <div className="relative max-w-[540px] overflow-hidden rounded-3xl border border-[#dde2f0] bg-white/95 p-6 sm:p-7 shadow-xl shadow-slate-200/50">
                    <span className="pointer-events-none absolute inset-x-3 top-0 h-2 rounded-b-full bg-[#0d2a4a]" />
                    <div
                      className="absolute inset-0 opacity-90"
                      style={{ backgroundImage: 'radial-gradient(circle, #d9e2f1 1.2px, transparent 1.2px)', backgroundSize: '22px 22px' }}
                    />
                    <div className="relative flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f8b7ab] bg-[#fde4de] text-[#E64B37]">
                          <svg className="h-[14px] w-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="9" />
                            <circle cx="12" cy="12" r="3" />
                    </svg>
                        </span>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#13203a]">Standard Inspection</h3>
                    </div>
                      <p className="text-sm leading-relaxed text-[#3f4756]">
                        Ideal for newer or low-mileage vehicles. A 50+ point inspection covering essential systems with attention to safety and performance.
                      </p>
                      <ul className="space-y-2 text-sm text-[#334155]">
                        {["Exterior, lighting, tires & undercarriage checks", 'Engine, fluids, and dashboard control tests', 'Test drive evaluation and digital report', '45–60 minutes duration'].map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-2 block h-2 w-2 rounded-full bg-[#E64B37]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Link href="/services/standard-inspection" className="inline-flex items-center gap-1 text-sm font-semibold text-[#E64B37] transition hover:text-[#c63a2c]">
                        Explore details
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14" />
                          <path d="m13 6 6 6-6 6" />
                        </svg>
                      </Link>
            </div>
          </div>
        </div>

                {/* Enhanced Inspection Card */}
                <div className="relative">
                  <div className="relative max-w-[540px] overflow-hidden rounded-3xl border border-[#fbd4cb] bg-white/95 p-6 sm:p-7 shadow-xl shadow-[#f97362]/20">
                    <span className="pointer-events-none absolute inset-x-3 top-0 h-2 rounded-b-full bg-gradient-to-r from-[#f97362] via-[#E64B37] to-[#f97362]" />
                    <div
                      className="absolute inset-0 opacity-95"
                      style={{ backgroundImage: 'radial-gradient(circle, #f3dcd6 1.4px, transparent 1.4px)', backgroundSize: '24px 24px' }}
                    />
                    <div className="relative flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f8b7ab] bg-[#fde4de] text-[#E64B37]">
                          <svg className="h-[14px] w-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="4" y="5" width="16" height="14" rx="3" />
                            <path d="M8 9h8" />
                            <path d="M8 13h5" />
                      </svg>
                        </span>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#13203a]">Enhanced Inspection</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-[#324056]">
                        Our most popular 75+ point diagnostic inspection. Great for vehicles 5–10 years old or with moderate mileage needing detailed system analysis.
                      </p>
                      <ul className="space-y-2 text-sm text-[#2f3a4c]">
                        {["Includes OBD-II scan and electrical diagnostics", 'Transmission and suspension assessments', 'Cooling system and battery performance test', '60–90 minutes duration'].map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-2 block h-2 w-2 rounded-full bg-[#E64B37]" />
                            <span>{item}</span>
                    </li>
                        ))}
                  </ul>
                      <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <Link href="/services/enhanced-inspection" className="inline-flex items-center gap-1 text-sm font-semibold text-[#E64B37] transition hover:text-[#c63a2c]">
                          Explore details
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" />
                            <path d="m13 6 6 6-6 6" />
                          </svg>
                        </Link>
                        <span className="inline-flex w-fit items-center justify-center rounded-full bg-[#fde4de] px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#E64B37]">
                          Most Popular
                        </span>
                </div>
              </div>
                </div>
                </div>

                {/* Full-Spectrum Inspection Card */}
                <div className="relative">
                  <div className="relative max-w-[540px] overflow-hidden rounded-3xl border border-[#fbd4cb] bg-white/95 p-6 sm:p-7 shadow-xl shadow-[#f97362]/20">
                    <span className="pointer-events-none absolute inset-x-3 top-0 h-2 rounded-b-full bg-gradient-to-r from-[#f97362] via-[#E64B37] to-[#f97362]" />
                    <div
                      className="absolute inset-0 opacity-95"
                      style={{ backgroundImage: 'radial-gradient(circle, #f3dcd6 1.4px, transparent 1.4px)', backgroundSize: '24px 24px' }}
                    />
                    <div className="relative flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f8b7ab] bg-[#fde4de] text-[#E64B37]">
                          <svg className="h-[14px] w-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="5" y="4" width="14" height="16" rx="3" />
                            <path d="M9 8h6" />
                            <path d="M9 12h6" />
                            <path d="M9 16h4" />
                      </svg>
                        </span>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#13203a]">Full-Spectrum Inspection</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-[#324056]">
                        A premium 100+ point comprehensive evaluation with compression testing, frame analysis, and emissions checks for complete peace of mind.
                      </p>
                      <ul className="space-y-2 text-sm text-[#2f3a4c]">
                        {["Advanced engine diagnostics and performance scan", 'Frame, paint depth, and emissions evaluation', 'Negotiation insights for vehicle purchase', '90–120 minutes duration'].map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-2 block h-2 w-2 rounded-full bg-[#E64B37]" />
                            <span>{item}</span>
                    </li>
                        ))}
                  </ul>
                      <Link href="/services/full-spectrum-inspection" className="inline-flex items-center gap-1 text-sm font-semibold text-[#E64B37] transition hover:text-[#c63a2c]">
                        Explore details
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14" />
                          <path d="m13 6 6 6-6 6" />
                        </svg>
                      </Link>
                </div>
              </div>
                </div>

                {/* Routine Check-Up Card */}
                <div className="relative">
                  <div className="relative max-w-[540px] overflow-hidden rounded-3xl border border-[#dde2f0] bg-white/95 p-6 sm:p-7 shadow-xl shadow-slate-200/50">
                    <span className="pointer-events-none absolute inset-x-3 top-0 h-2 rounded-b-full bg-[#0d2a4a]" />
                    <div
                      className="absolute inset-0 opacity-90"
                      style={{ backgroundImage: 'radial-gradient(circle, #d9e2f1 1.2px, transparent 1.2px)', backgroundSize: '22px 22px' }}
                    />
                    <div className="relative flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f8b7ab] bg-[#fde4de] text-[#E64B37]">
                          <svg className="h-[14px] w-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 6v6l3 3" />
                      </svg>
                        </span>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#13203a]">Routine Check-Up</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-[#3f4756]">
                        For ongoing maintenance—helps car owners monitor health, prevent issues, and prepare vehicles for long journeys.
                      </p>
                      <ul className="space-y-2 text-sm text-[#334155]">
                        {[
                          'Fluid level checks and visual wear assessment',
                          'Tire health and battery life review',
                          'Personalized maintenance recommendation report',
                          '30–45 minutes duration',
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-2 block h-2 w-2 rounded-full bg-[#E64B37]" />
                            <span>{item}</span>
                    </li>
                        ))}
                  </ul>
                      <Link href="/services/routine-check-up" className="inline-flex items-center gap-1 text-sm font-semibold text-[#E64B37] transition hover:text-[#c63a2c]">
                        Explore details
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14" />
                          <path d="m13 6 6 6-6 6" />
                        </svg>
                      </Link>
                </div>
              </div>
                </div>
                </div>
            </div>
            
          </div>
          <div className="mt-16 flex flex-col items-center gap-2">
              <Link
                href="/book-appointment#booking-form"
                className="inline-flex items-center justify-center rounded-full bg-[#E64B37] px-12 py-4 text-base font-semibold text-white shadow-[0_10px_25px_rgba(229,78,55,0.35)] transition hover:-translate-y-0.5 hover:bg-[#d14130]"
              >
                Book an Inspection Now
              </Link>
              <p className="text-sm font-medium text-[#2f3a4c]">Call (613) 981-5498 for expert guidance.</p>
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
              className="inline-flex items-center gap-2 rounded-full bg-[#E54E3D] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[#E54E3D]/35 transition hover:-translate-y-0.5 hover:bg-[#d14130]"
            >
              Book an Inspection
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
                  </svg>
            </Link>
            <Link
              href="#sample-report"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_12px_28px_rgba(5,15,27,0.45)] transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              View Sample Report
            </Link>
                </div>

          <p className="mt-6 text-center text-sm text-white/70">Serving Ottawa, Gatineau, Kanata & Orleans</p>
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
              className="inline-flex items-center justify-center rounded-full bg-[#E64B37] px-12 py-4 text-base font-semibold text-white shadow-[0_10px_25px_rgba(229,78,55,0.35)] transition hover:-translate-y-0.5 hover:bg-[#d14130]"
            >
              Book an Inspection Now
            </Link>
            <p className="text-sm font-medium text-[#2f3a4c]">Trusted by used vehicle buyers and sellers.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative overflow-hidden bg-white px-[10%] pt-[40px] pb-[60px] sm:pt-[40px] sm:pb-[60px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,78,61,0.14),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(249,115,98,0.12),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(252,165,143,0.12),transparent_60%)]" />
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
              accent: 'from-[#E54E3D] via-[#f97362] to-[#E54E3D]',
              border: 'border-[#fbd1ca]',
              shadow: 'shadow-[#e54e3d]/18',
              badge: null,
              button: 'bg-[#E54E3D] text-white hover:bg-[#d14130]',
              detailsHref: '/services/standard-inspection',
              bookingValue: 'standard',
              checklistType: 'standard',
              features: ['50+ Point Inspection', 'Detailed Report', 'Professional Mechanic', "Service at Seller's Location"],
            },
            {
              name: 'Enhanced',
              price: '$200',
              accent: 'from-[#0f172a] via-[#1f2937] to-[#0f172a]',
              border: 'border-[#0f172a]/40',
              shadow: 'shadow-[#0f172a]/20',
              badge: 'MOST POPULAR',
              button: 'bg-[#E54E3D] text-white hover:bg-[#d14130]',
              detailsHref: '/services/enhanced-inspection',
              bookingValue: 'enhanced',
              checklistType: 'enhanced',
              features: ['75+ Point Inspection', 'Comprehensive Report', 'Professional Mechanic', "Service at Seller's Location"],
            },
            {
              name: 'Full-Spectrum',
              price: '$300',
              accent: 'from-[#0ea5e9] via-[#38bdf8] to-[#2563eb]',
              border: 'border-[#bae6fd]',
              shadow: 'shadow-[#0ea5e9]/20',
              badge: null,
              button: 'bg-[#E54E3D] text-white hover:bg-[#d14130]',
              detailsHref: '/services/full-spectrum-inspection',
              bookingValue: 'full-spectrum',
              checklistType: 'full-spectrum',
              features: ['100+ Point Inspection', 'Elite Detailed Report', 'Professional Mechanic', "Service at Seller's Location"],
            },
            {
              name: 'Routine Check-Up',
              price: '$100',
              accent: 'from-[#16a34a] via-[#22c55e] to-[#16a34a]',
              border: 'border-[#bbf7d0]',
              shadow: 'shadow-[#16a34a]/18',
              badge: null,
              button: 'bg-[#E54E3D] text-white hover:bg-[#d14130]',
              detailsHref: '/services/routine-check-up',
              bookingValue: 'routine',
              checklistType: 'routine',
              features: ['Multi-Point Inspection', 'Fluid Levels Check', 'Tire & Brake Assessment', 'Battery Health Evaluation'],
            }].map((plan) => (
              <article
                key={plan.name}
                className={`group relative flex flex-col rounded-3xl border ${plan.border} bg-white/95 p-8 shadow-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl ${plan.shadow}`}
              >
                {plan.badge && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#E54E3D] px-5 py-1 text-xs font-semibold tracking-[0.32em] uppercase text-white shadow-lg">
                    {plan.badge}
                  </span>
                )}

                <header className="flex flex-col items-center gap-5 text-center">
                  <div className={`relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br ${plan.accent} shadow-inner shadow-black/10`}>
                    <div className="flex h-[92px] w-[92px] items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                      <span className="text-3xl font-extrabold tracking-tight text-white">{plan.price}</span>
                </div>
              </div>
                  <h3 className="text-xl font-bold text-[#152032]">{plan.name}</h3>
                </header>

                <ul className="mt-6 flex-1 space-y-4 text-left">
                  {plan.features.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-[#3f4756]">
                      <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#E54E3D]/10 text-[#E54E3D]">
                        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-7.071 7.071a1 1 0 0 1-1.414 0L5.293 11.95a1 1 0 1 1 1.414-1.414l1.828 1.829 6.364-6.364a1 1 0 0 1 1.414 0Z" clipRule="evenodd" />
                  </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                  </ul>

                {plan.checklistType === 'standard' ? (
                  <button
                    type="button"
                    onClick={() => setActiveChecklist('standard')}
                    className="mt-6 inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#E54E3D] transition-colors hover:text-[#c63a2c]"
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
                      className="mt-6 inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#E54E3D] transition-colors hover:text-[#c63a2c]"
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
                        className="mt-6 inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#E54E3D] transition-colors hover:text-[#c63a2c]"
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
                  className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-all ${plan.button}`}
                >
                  Book Now
                </Link>
              </article>
            ))}
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

      {/* Call to Action Section */}
      <section id="cta" className="relative overflow-hidden bg-[#0f172a] px-[10%] py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,78,61,0.22),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(249,115,98,0.18),transparent_60%),radial-gradient(circle_at_center,rgba(252,165,143,0.14),transparent_65%)]" />
        <div className="pointer-events-none absolute -left-32 top-[-6rem] hidden h-[520px] w-[320px] lg:block">
          <div className="hero-wave" />
        </div>
        <div className="pointer-events-none absolute -right-32 bottom-[-6rem] hidden h-[520px] w-[320px] lg:block">
          <div className="hero-wave rotate-180" />
        </div>

        <div className="mx-auto max-w-5xl relative text-center text-white">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
            Instant Booking
          </span>
          <h2 className="mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] font-bold leading-tight">
              Ready to Inspect Your Next Ride?
            </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-white/85 max-w-2xl mx-auto">
              Don't take chances with one of the biggest purchases you'll make. Let our experts inspect the vehicle and give you peace of mind.
            </p>

          <div className="mt-16 flex flex-col items-center gap-2">
            <Link
              href="/book-appointment#booking-form"
              className="inline-flex items-center justify-center rounded-full bg-[#E64B37] px-12 py-4 text-base font-semibold text-white shadow-[0_10px_25px_rgba(229,78,55,0.35)] transition hover:-translate-y-0.5 hover:bg-[#d14130]"
            >
              Book an Inspection Now
            </Link>
            <p className="text-sm font-medium text-[#2f3a4c]">Call (613) 981-5498 for expert guidance.</p>
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
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-[#0f172a]/70">{section.title}</h3>
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


