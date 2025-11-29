import { RATING_OPTIONS } from '../types';

interface SummarySectionProps {
  summary: {
    overallCondition: string;
    inspectionSummary: string;
    recommendations: string;
    recommendationNotes: string;
  };
  isExpanded: boolean;
  onToggle: () => void;
  onSummaryChange: (field: keyof SummarySectionProps['summary'], value: string) => void;
}

export default function SummarySection({
  summary,
  isExpanded,
  onToggle,
  onSummaryChange,
}: SummarySectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full bg-gradient-to-r from-orange-50 to-gray-50 px-6 py-4 flex items-center justify-between hover:from-orange-100 hover:to-gray-100 transition-all duration-200"
      >
        <h2 className="text-base font-bold text-[#1f2a37] flex items-center gap-2">
          <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Summary and Recommendations
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
            <label className="block text-sm font-semibold text-[#64748b] mb-2" style={{ fontSize: '14px' }}>Overall Vehicle Condition</label>
            <select
              value={summary.overallCondition}
              onChange={(e) => onSummaryChange('overallCondition', e.target.value)}
              className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
              style={{ fontSize: '14px' }}
            >
              <option value="">Select...</option>
              {RATING_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#64748b] mb-2" style={{ fontSize: '14px' }}>Inspection Summary</label>
            <textarea
              value={summary.inspectionSummary}
              onChange={(e) => onSummaryChange('inspectionSummary', e.target.value)}
              rows={6}
              className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
              placeholder="Provide a comprehensive summary of the vehicle's condition based on inspection findings..."
              style={{ fontSize: '14px' }}
            />
            <button
              type="button"
              onClick={() => {
                alert('AI summary generation will be implemented soon');
              }}
              className="mt-3 px-4 py-2 bg-[#E54E3D] text-white rounded-lg font-semibold hover:bg-[#d14130] transition-colors flex items-center gap-2"
              style={{ fontSize: '14px' }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate Summary from Inspection Data
            </button>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#64748b] mb-2" style={{ fontSize: '14px' }}>Recommendations</label>
            <select
              value={summary.recommendations}
              onChange={(e) => onSummaryChange('recommendations', e.target.value)}
              className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
              style={{ fontSize: '14px' }}
            >
              <option value="">Select...</option>
              <option value="purchase-recommended">Purchase Recommended</option>
              <option value="purchase-with-caution">Purchase with Caution</option>
              <option value="negotiate-price">Negotiate Price</option>
              <option value="major-repairs-needed">Major Repairs Needed</option>
              <option value="not-recommended">Not Recommended</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#64748b] mb-2" style={{ fontSize: '14px' }}>Additional notes or explanations for your recommendation</label>
            <textarea
              value={summary.recommendationNotes}
              onChange={(e) => onSummaryChange('recommendationNotes', e.target.value)}
              rows={4}
              className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2 focus:border-[#E54E3D] focus:outline-none"
              placeholder="Add additional notes..."
              style={{ fontSize: '14px' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

