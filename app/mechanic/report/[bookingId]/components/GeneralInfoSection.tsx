interface GeneralInfoSectionProps {
  generalInfo: {
    clientName: string;
    email: string;
    phone: string;
    appointmentDate: string;
    inspectionTime: string;
    inspectorName: string;
  };
  isExpanded: boolean;
  onToggle: () => void;
}

export default function GeneralInfoSection({
  generalInfo,
  isExpanded,
  onToggle,
}: GeneralInfoSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-[#f8fafc] to-white hover:from-[#f1f5f9] hover:to-[#f8fafc] transition-all"
      >
        <h2 className="text-base font-bold text-[#1f2a37] flex items-center gap-2">
          <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          General Information
        </h2>
        <svg
          className={`w-5 h-5 text-[#64748b] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="p-6 pt-0 transition-all duration-300 ease-in-out">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#64748b] mb-2" style={{ fontSize: '14px' }}>Client Name</label>
              <input type="text" value={generalInfo.clientName} readOnly className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 bg-gray-50 text-gray-600 cursor-not-allowed" style={{ fontSize: '14px' }} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#64748b] mb-2" style={{ fontSize: '14px' }}>Email</label>
              <input type="email" value={generalInfo.email} readOnly className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 bg-gray-50 text-gray-600 cursor-not-allowed" style={{ fontSize: '14px' }} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#64748b] mb-2" style={{ fontSize: '14px' }}>Phone</label>
              <input type="tel" value={generalInfo.phone} readOnly className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 bg-gray-50 text-gray-600 cursor-not-allowed" style={{ fontSize: '14px' }} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#64748b] mb-2" style={{ fontSize: '14px' }}>Appointment Date</label>
              <input type="date" value={generalInfo.appointmentDate} readOnly className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 bg-gray-50 text-gray-600 cursor-not-allowed" style={{ fontSize: '14px' }} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#64748b] mb-2" style={{ fontSize: '14px' }}>Inspection Time</label>
              <input type="time" value={generalInfo.inspectionTime} readOnly className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 bg-gray-50 text-gray-600 cursor-not-allowed" style={{ fontSize: '14px' }} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#64748b] mb-2" style={{ fontSize: '14px' }}>Inspector Name</label>
              <input type="text" value={generalInfo.inspectorName} readOnly className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 bg-gray-50 text-gray-600 cursor-not-allowed" style={{ fontSize: '14px' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

