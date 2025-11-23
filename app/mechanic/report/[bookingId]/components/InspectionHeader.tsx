import Link from 'next/link';

interface InspectionHeaderProps {
  bookingId: string;
  inspectionType: string;
  inspectionTypeLabel: string;
  onInspectionTypeChange?: (type: string) => void;
  availableTypes?: Array<{ value: string; label: string }>;
}

export default function InspectionHeader({
  bookingId,
  inspectionType,
  inspectionTypeLabel,
  onInspectionTypeChange,
  availableTypes = [],
}: InspectionHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-orange-50 via-gray-50 to-orange-50 border-b border-orange-200 py-3 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="inline-flex items-center hover:opacity-80 transition-opacity">
          <div className="relative -ml-[18px] -mt-4 flex h-[72px] w-[72px] items-center justify-center sm:-ml-[18px] sm:-mt-4 sm:h-[92px] sm:w-[92px]">
            <img src="/images/logofooter1.png" alt="CheckMyRide" className="h-full w-full object-contain" />
          </div>
          <span className="-ml-[25px] -mt-4 text-2xl font-bold tracking-tight text-[#152032]">
            Check<span className="text-[#E54E3D]">MyRide</span>
          </span>
        </Link>

        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-xl font-bold text-[#1f2a37]">
            Vehicle Inspection Report
          </h1>
          <p className="text-xs text-[#64748b]">Booking ID: {bookingId}</p>
        </div>

        {onInspectionTypeChange && availableTypes.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={inspectionType}
                onChange={(e) => onInspectionTypeChange(e.target.value)}
                className="bg-[#E54E3D] text-white px-6 py-2.5 rounded-lg font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E54E3D]/50 hover:bg-[#d14130] transition-all duration-200 shadow-lg border-2 border-[#E54E3D]/20 min-w-[240px]"
              >
                {availableTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

