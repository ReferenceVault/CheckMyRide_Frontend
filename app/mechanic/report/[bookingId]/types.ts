export interface BodyConditionItem {
  item: string;
  rating: 'excellent' | 'good' | 'fair' | 'needs-attention' | 'critical' | 'n/a' | '';
  notes: string;
}

export const RATING_OPTIONS = [
  { value: 'excellent', label: 'Excellent', color: 'bg-green-500' },
  { value: 'good', label: 'Good', color: 'bg-green-400' },
  { value: 'fair', label: 'Fair', color: 'bg-yellow-400' },
  { value: 'needs-attention', label: 'Needs attention', color: 'bg-orange-400' },
  { value: 'critical', label: 'Critical', color: 'bg-red-500' },
  { value: 'n/a', label: 'N/A', color: 'bg-gray-400' },
];

export const BODY_CONDITION_ITEMS = [
  'Dents, scratches, rust on panels',
  'Body panel gap consistency',
  'Presence of aftermarket body parts',
  'Alignment of doors, fenders, trunk',
  'Cracks/chips on windshield/windows',
];

export const LIGHTS_ITEMS = [
  'Headlamps/daytime running lights',
  'Parking lamps',
  'Turn signals',
  'Brake lights',
  'Hazard lights',
  'Light housings for cracks or moisture',
];

export const STANDARD_WHEELS_TIRES_ITEMS = [
  'Tires: Sidewalls inspected for cracks/bulges',
  'Tires: Uniform tire size',
  'Wheels/Rims: No cracks/damage',
  'Wheels/Rims: No corrosion',
  'Spare tire condition',
];

export const EXTERIOR_COMPONENTS_ITEMS = [
  'Doors: Smooth opening/closing',
  'Hood/trunk release operational',
  'Door seals intact',
  'Water leakage signs around seals',
  'Hinge condition',
  'Lock mechanisms',
  'Safety latches operation',
];

export const UNDERCARRIAGE_ITEMS = [
  'Undercarriage visible rust/damage',
  'Exhaust System: Visible leaks or damage',
  'Exhaust System: Secure mounting',
  'Exhaust System: Excessive smoke/emissions',
];

export const ENGINE_ITEMS = [
  'Oil level/condition',
  'Air filter condition',
  'No unusual sounds during operation',
];

export const BATTERY_ITEMS = [
  'Corrosion-free, securely mounted',
];

export const FLUID_INSPECTION_ITEMS = [
  'Coolant level and condition',
  'Brake fluid level',
  'Power steering fluid (if applicable)',
  'Windshield washer fluid',
];

export const DASHBOARD_CONTROLS_ITEMS = [
  'Warning light check (when engine started)',
  'Gauge functionality',
  'Horn operational',
  'Buttons/knobs functioning',
  'Dashboard/steering wheel wear',
  'Climate control functionality',
  'Entertainment system basic operation',
];

export const WINDOWS_MIRRORS_ITEMS = [
  'Window operation (all doors)',
  'Side mirrors adjustable',
  'Rear-view mirror condition',
];

export const SAFETY_EQUIPMENT_ITEMS = [
  'Seat belt condition and operation',
  'Airbag warning lights',
  'Child safety locks (if applicable)',
  'Emergency brake functionality',
];

export const FUNCTIONAL_TESTS_ITEMS = [
  'Transmission: Gear shift operation',
  'Wipers: Operational',
  'AC Cooling System: Proper cooling',
  'Odometer: Mileage verified',
];

export const INTERIOR_CONDITION_ITEMS = [
  'Seat condition and functionality',
  'Floor mats and carpeting',
  'Headliner condition',
  'Interior odours or water damage signs',
  'Interior lights',
];

export const ROAD_TEST_RESULTS_ITEMS = [
  'Acceleration',
  'Braking performance',
  'Handling and stability',
  'Steering response',
  'Transmission shifting',
  'Suspension comfort',
  'Noise level',
  'Vibration',
  'Warning lights during operation',
  'Parking brake operation',
  'Engine performace',
  'Climate control operation',
  'Overall driving experience',
];

// Enhanced Inspection Items
export const ENHANCED_BODY_CONDITION_ITEMS = [
  'Paint finish consistency (check for evidence of repainting)',
  'Dents, scratches, rust on panels',
  'Body panel gap consistency',
  'Presence of aftermarket body parts',
  'Alignment of doors, fenders, trunk',
  'Cracks/chips on windshield/windows',
];

export const WHEELS_TIRES_ITEMS = [
  'Tires: Sidewalls inspected for cracks/bulges',
  'Tires: Uniform tire size',
  'Wheels/Rims: No cracks/damage',
  'Wheels/Rims: No corrosion',
  'Spare tire condition',
  'Tread depth even, wear uniform',
];

export const ENHANCED_EXTERIOR_COMPONENTS_ITEMS = [
  'Doors: Smooth opening/closing',
  'Hood/trunk release operational',
  'Door seals intact',
  'Water leakage signs around seals',
  'Hinge condition',
  'Lock mechanisms',
  'Safety latches operation',
  'Roof: No sagging, leaks',
  'Sunroof/moonroof operational (if equipped)',
];

export const ENHANCED_UNDERCARRIAGE_ITEMS = [
  'Undercarriage visible rust/damage',
  'Exhaust System: Visible leaks or damage',
  'Exhaust System: Secure mounting',
  'Exhaust System: Excessive smoke/emissions',
  'Exhaust System: Rust-free, no noise',
  'Chassis: No rust, cracks, or damage',
];

export const ENHANCED_FLUID_INSPECTION_ITEMS = [
  'Coolant level and condition',
  'Brake fluid level',
  'Power steering fluid (if applicable)',
  'Windshield washer fluid',
  'Transmission fluid level/condition',
];

export const BELTS_HOSES_ITEMS = [
  'Drive Belt: No cracks/fraying',
  'Belts & Hoses: Hoses intact, no leaks',
];

export const ENHANCED_DASHBOARD_CONTROLS_ITEMS = [
  'Warning light check (when engine started)',
  'Gauge functionality',
  'Horn operational',
  'Buttons/knobs functioning',
  'Dashboard/steering wheel wear',
  'Climate control functionality',
  'Entertainment system basic operation',
  'Electronic Systems: Key fob operation',
  'Electronic Systems: Seat heaters operational (if equipped)',
];

export const ENHANCED_FUNCTIONAL_TESTS_ITEMS = [
  'Transmission: Gear shift operation',
  'Wipers: Operational',
  'Wipers: Wiper blades condition',
  'Wipers: Washer fluid spray pattern',
  'AC Cooling System: Proper cooling',
  'Odometer: Mileage verified',
];

export const SEATS_UPHOLSTERY_ITEMS = [
  'Stains, tears, wear',
  'Seat adjustment operation (all functions)',
  'Seatbelts functional (all positions)',
];

export const ENHANCED_DRIVING_PERFORMANCE_ITEMS = [
  'Steering & Suspension: Shock absorbers intact',
  'Steering & Suspension: Smooth steering, no noise',
  'Braking System: Parking brake operational',
  'Braking System: Brake pads/shoes inspection',
  'Braking System: Rotors, calipers, drums inspected',
  'Handling: Stable cornering/turns',
  'Extended test drive (minimum 5 miles)',
  'Acceleration and shifting smoothness',
  'Braking performance at various speeds',
];

export const DIAGNOSTIC_TESTING_ITEMS = [
  'OBD computer scan for error codes',
  'Battery load test',
  'Alternator output test',
  'Cooling system pressure test',
];

// Full-Spectrum Inspection Items
export const FULL_SPECTRUM_BODY_CONDITION_ITEMS = [
  'Paint finish consistency (check for evidence of repainting)',
  'Dents, scratches, rust on panels',
  'Body panel gap consistency',
  'Presence of aftermarket body parts',
  'Alignment of doors, fenders, trunk',
  'Cracks/chips on windshield/windows',
  'Signs of repainting (with paint thickness gauge)',
  'Frame inspection for signs of structural damage or repair',
];

export const FULL_SPECTRUM_LIGHTS_ITEMS = [
  'Headlamps/daytime running lights',
  'Parking lamps',
  'Turn signals',
  'Brake lights',
  'Hazard lights',
  'Light housings for cracks or moisture',
  'Light output measurement',
  'Lens clarity and condition',
];

export const FULL_SPECTRUM_WHEELS_TIRES_ITEMS = [
  'Tires: Sidewalls inspected for cracks/bulges',
  'Tires: Uniform tire size',
  'Wheels/Rims: No cracks/damage',
  'Wheels/Rims: No corrosion',
  'Spare tire condition',
  'Tread depth even, wear uniform',
  'Tire age verification (DOT code)',
  'Wheel alignment check',
  'Tire pressure monitoring system operation',
];

export const FULL_SPECTRUM_EXTERIOR_COMPONENTS_ITEMS = [
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
];

export const FULL_SPECTRUM_UNDERCARRIAGE_ITEMS = [
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
];

export const FULL_SPECTRUM_ENGINE_ITEMS = [
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
];

export const BATTERY_ALTERNATOR_ITEMS = [
  'Corrosion-free, securely mounted',
  'Battery load test',
  'Terminal condition',
  'Battery age verification',
  'Alternator output ensures proper battery charging',
  'Belt tension and condition',
];

export const FULL_SPECTRUM_FLUID_INSPECTION_ITEMS = [
  'Coolant level and condition',
  'Brake fluid level',
  'Power steering fluid (if applicable)',
  'Windshield washer fluid',
  'Transmission fluid level/condition',
  'Differential fluid (if applicable)',
  'Transfer case fluid (if applicable)',
  'Power steering pump operation',
];

export const FULL_SPECTRUM_BELTS_HOSES_ITEMS = [
  'Drive Belt: No cracks/fraying',
  'Belts & Hoses: Hoses intact, no leaks',
  'Tensioner operation',
  'Belt routing verification',
];

export const FULL_SPECTRUM_ROAD_TEST_RESULTS_ITEMS = [
  'Acceleration',
  'Braking performance at various speeds',
  'Handling and stability',
  'Steering response and alignment',
  'Transmission shifting smoothness',
  'Transmission shift points',
  'Clutch engagement (manual transmissions)',
  'Suspension comfort',
  'Suspension noise during varied terrain',
  'Noise level',
  'Vibration',
  'Warning lights during operation',
  'Parking brake operation',
  'Engine performance under load',
  'Climate control operation',
  'High-speed stability',
  'Overall driving experience',
];

export const FULL_SPECTRUM_DIAGNOSTIC_TESTING_ITEMS = [
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
];

export const FULL_SPECTRUM_DASHBOARD_CONTROLS_ITEMS = [
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
];

export const FULL_SPECTRUM_WINDOWS_MIRRORS_ITEMS = [
  'Window operation (all doors)',
  'Side mirrors adjustable',
  'Rear-view mirror condition',
  'Window tint condition and legality',
  'Window regulator operation',
  'Defrost functionality',
];

export const FULL_SPECTRUM_SAFETY_EQUIPMENT_ITEMS = [
  'Seat belt condition and operation',
  'Airbag warning lights',
  'Child safety locks (if applicable)',
  'Emergency brake functionality',
  'Safety system warning light check',
  'Anti-lock brake system functionality',
  'Stability control system functionality',
];

export const FULL_SPECTRUM_FUNCTIONAL_TESTS_ITEMS = [
  'Transmission: Gear shift operation',
  'Wipers: Operational',
  'Wipers: Wiper blades condition',
  'Wipers: Washer fluid spray pattern',
  'AC Cooling System: Proper cooling',
  'AC Cooling System: Compressor/refrigerant levels inspected',
  'Odometer: Mileage verified',
  'Cruise control functionality',
  'Auxiliary systems operation',
];

export const FULL_SPECTRUM_INTERIOR_CONDITION_ITEMS = [
  'Seat condition and functionality',
  'Floor mats and carpeting',
  'Headliner condition',
  'Interior odours or water damage signs',
  'Interior lights',
  'Interior trim condition',
  'Console functionality',
  'Glovebox operation',
  'Storage compartment condition',
];

export const FULL_SPECTRUM_SEATS_UPHOLSTERY_ITEMS = [
  'Stains, tears, wear (detailed inspection)',
  'Seat adjustment operation (all functions)',
  'Seatbelts functional (all positions)',
  'Seat heater operation',
  'Seat material condition',
];

export const FULL_SPECTRUM_DRIVING_PERFORMANCE_ITEMS = [
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
];

export const AUDIO_ENTERTAINMENT_SYSTEM_ITEMS = [
  'Speaker functionality (all positions)',
  'Audio quality assessment',
  'Bluetooth connectivity',
  'USB/auxiliary port functionality',
];

export const EMISSIONS_ENVIRONMENTAL_ITEMS = [
  'Smoke analysis',
  'Emissions test readiness',
  'Catalytic converter condition',
  'Evaporative system integrity',
  'Air injection system operation',
];

export const PRICE_NEGOTIATION_ITEMS = [
  'Price Negotiation Assistance: Inspector negotiates with seller',
];

// Routine Check-Up Items
export const ROUTINE_BODY_GLASS_ITEMS = [
  'Visible body damage assessment',
  'Windshield and window condition',
  'Wiper blade condition',
];

export const ROUTINE_LIGHTS_ITEMS = [
  'Headlights (low/high beam)',
  'Brake lights',
  'Turn signals',
  'Hazard lights',
];

export const ROUTINE_TIRES_ITEMS = [
  'Tire pressure check',
  'Visual tread inspection',
  'Sidewall condition check',
  'Unusual wear patterns',
];

export const ROUTINE_FLUID_LEVELS_ITEMS = [
  'Engine oil level and condition',
  'Coolant level and condition',
  'Brake fluid level',
  'Power steering fluid (if applicable)',
  'Windshield washer fluid',
];

export const ROUTINE_BATTERY_ITEMS = [
  'Terminal condition',
  'Visual corrosion check',
  'Secure mounting',
];

export const ROUTINE_BELTS_HOSES_ITEMS = [
  'Basic visual inspection for cracks/wear',
  'Belt tension check',
  'Visible leaks',
];

export const ROUTINE_ENGINE_COMPONENTS_ITEMS = [
  'Spark plug inspection (accessible plugs)',
  'Air filter condition',
  'Visible fuel system components',
];

export const ROUTINE_BRAKES_ITEMS = [
  'Brake pedal feel',
  'Parking brake operation',
  'Visual brake pad thickness check',
  'Rotor disk surface condition',
];

export const ROUTINE_ENGINE_ITEMS = [
  'Cold start observation',
  'Unusual noises check',
  'Visible leaks inspection',
];

export const ROUTINE_STEERING_SUSPENSION_ITEMS = [
  'Basic suspension check',
  'Steering wheel play',
  'Turning effort assessment',
];

export const ROUTINE_COMPUTER_DIAGNOSIS_ITEMS = [
  'OBD-II error codes reviewed',
  'Warning light verification',
  'Sensor functionality check',
];

export const ROUTINE_CONTROLS_ITEMS = [
  'Horn operation',
  'Wipers and washers',
  'Basic dashboard functions',
  'Air conditioning/heating output',
];

export const ROUTINE_SAFETY_SYSTEMS_ITEMS = [
  'Seat belt operation',
  'Warning light check',
  'Mirror condition and adjustment',
];

export const ROUTINE_ROAD_TEST_RESULTS_ITEMS = [
  'Acceleration',
  'Braking',
  'Handling',
  'Noise level',
  'Vibration',
  'Warning lights',
];

export const ROUTINE_CUSTOMER_CONCERNS_ITEMS = [
  'Specific issues identified by vehicle owner',
  'Diagnostic assessment of reported symptoms',
  'Examination of customer identified issues',
];

