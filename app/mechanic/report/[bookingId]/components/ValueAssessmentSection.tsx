interface ValueAssessmentSectionProps {
  valueAssessment: {
    assessment: string;
    notes: string;
  };
  isExpanded: boolean;
  onToggle: () => void;
  onValueAssessmentChange: (field: keyof ValueAssessmentSectionProps['valueAssessment'], value: string) => void;
}

export default function ValueAssessmentSection({
  valueAssessment,
  isExpanded,
  onToggle,
  onValueAssessmentChange,
}: ValueAssessmentSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full bg-gradient-to-r from-orange-50 to-gray-50 px-6 py-4 flex items-center justify-between hover:from-orange-100 hover:to-gray-100 transition-all duration-200"
      >
        <h2 className="text-base font-bold text-[#1f2a37] flex items-center gap-2">
          <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Value Assessment
        </h2>
        <svg
          className={`w-5 h-5 text-[#E54E3D] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="px-[30px] py-[40px] space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#64748b] mb-2" style={{ fontSize: '14px' }}>Select value assessment</label>
            <select
              value={valueAssessment.assessment}
              onChange={(e) => onValueAssessmentChange('assessment', e.target.value)}
              className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
              style={{ fontSize: '14px' }}
            >
              <option value="">Select...</option>
              <option value="excellent-value">Excellent Value</option>
              <option value="good-value">Good Value</option>
              <option value="fair-value">Fair Value</option>
              <option value="overpriced">Overpriced</option>
              <option value="undervalued">Undervalued</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#64748b] mb-2" style={{ fontSize: '14px' }}>Additional notes on vehicle value and price considerations</label>
            <textarea
              value={valueAssessment.notes}
              onChange={(e) => onValueAssessmentChange('notes', e.target.value)}
              rows={6}
              className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
              placeholder="Add notes on value assessment..."
              style={{ fontSize: '14px' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

