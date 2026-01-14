interface InspectionHeaderProps {
  bookingId: string;
  inspectionType: string;
  inspectionTypeLabel: string;
  reportStatus?: string | null;
  onInspectionTypeChange?: (type: string) => void;
  availableTypes?: Array<{ value: string; label: string }>;
}

const getStatusBadge = (status: string | null | undefined) => {
  if (!status) return null;
  
  const statusConfig: { [key: string]: { label: string; bgColor: string; textColor: string } } = {
    draft: {
      label: 'Draft',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
    },
    complete: {
      label: 'Completed',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
    },
    cancelled: {
      label: 'Cancelled',
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
    },
  };

  const config = statusConfig[status] || {
    label: status.charAt(0).toUpperCase() + status.slice(1),
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-800',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bgColor} ${config.textColor}`}>
      {config.label}
    </span>
  );
};

export default function InspectionHeader({
  bookingId,
  inspectionType,
  inspectionTypeLabel,
  reportStatus,
  onInspectionTypeChange,
  availableTypes = [],
}: InspectionHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 py-3 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="inline-flex items-center">
          <img src="/images/reportlogo.JPG" alt="Report Logo" className="h-[72px] w-auto object-contain sm:h-[92px]" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-xl font-bold text-[#1f2a37]">
            Vehicle Inspection Report
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-xs text-[#64748b]">Booking ID: {bookingId}</p>
             <span className="text-xs text-[#64748b]"><b>Status:</b> {getStatusBadge(reportStatus)}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#E54E3D] text-white px-6 py-2.5 rounded-lg font-semibold shadow-lg border-2 border-[#E54E3D]/20 min-w-[240px] text-center">
            {inspectionTypeLabel}
          </div>
        </div>
      </div>
    </div>
  );
}

