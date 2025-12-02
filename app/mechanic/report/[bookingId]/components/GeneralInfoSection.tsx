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
  fieldErrors?: string[];
}

export default function GeneralInfoSection({
  generalInfo,
  isExpanded,
  onToggle,
  fieldErrors = [],
}: GeneralInfoSectionProps) {
  return (
    <div className={`bg-white rounded-lg shadow-lg border overflow-hidden ${fieldErrors.length > 0 ? 'border-red-300' : 'border-gray-200'}`}>
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
          {fieldErrors.length > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs font-semibold text-red-600 bg-red-100 rounded-full">
              {fieldErrors.length} error{fieldErrors.length > 1 ? 's' : ''}
            </span>
          )}
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
          {fieldErrors.length > 0 && (
            <div className="mb-4 rounded-lg bg-red-50 border-2 border-red-200 p-3">
              <p className="text-sm font-semibold text-red-800 mb-1">Please fix the following errors:</p>
              <ul className="list-disc list-inside text-red-700 text-xs space-y-0.5">
                {fieldErrors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}
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

