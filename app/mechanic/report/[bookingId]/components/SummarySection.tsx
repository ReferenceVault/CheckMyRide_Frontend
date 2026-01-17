import { RATING_OPTIONS } from '../types';
import toast from 'react-hot-toast';

interface SummarySectionProps {
  summary: {
    notesAndComments: string;
  };
  isExpanded: boolean;
  onToggle: () => void;
  onSummaryChange: (field: keyof SummarySectionProps['summary'], value: string) => void;
  errors?: string[];
  showRecommendations?: boolean;
}

export default function SummarySection({
  summary,
  isExpanded,
  onToggle,
  onSummaryChange,
  errors = [],
  showRecommendations = true,
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
          Notes & Comments
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
          {errors.length > 0 && (
            <div className="mb-4 rounded-lg bg-red-50 border-2 border-red-200 p-3">
              <p className="font-semibold text-red-800 mb-2 text-sm">Please fix the following:</p>
              <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
                {errors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-[#64748b] mb-2" style={{ fontSize: '14px' }}>
              Notes & Comments
              {errors.some(e => e.includes('Notes & Comments') || e.includes('Notes and Comments')) && (
                <span className="text-red-600 ml-1">*</span>
              )}
            </label>
            <textarea
              value={summary.notesAndComments}
              onChange={(e) => onSummaryChange('notesAndComments', e.target.value)}
              rows={8}
              className={`w-full rounded-lg border-2 px-4 py-2 focus:outline-none ${
                errors.some(e => e.includes('Notes & Comments') || e.includes('Notes and Comments'))
                  ? 'border-red-500 focus:border-red-600'
                  : 'border-[#e2e8f0] focus:border-[#E54E3D]'
              }`}
              placeholder="Enter your notes and comments about the vehicle inspection..."
              style={{ fontSize: '14px' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

