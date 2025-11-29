import { BodyConditionItem, RATING_OPTIONS } from '../types';

interface InspectionSectionProps {
  sectionKey: string;
  title: string;
  icon: JSX.Element;
  sectionData: BodyConditionItem[];
  isExpanded: boolean;
  onToggle: () => void;
  onChange: (index: number, field: 'rating' | 'notes', value: string) => void;
}

export default function InspectionSection({
  title,
  icon,
  sectionData,
  isExpanded,
  onToggle,
  onChange,
}: InspectionSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full bg-gradient-to-r from-orange-50 to-gray-50 px-6 py-4 flex items-center justify-between hover:from-orange-100 hover:to-gray-100 transition-all duration-200"
      >
        <h2 className="text-base font-bold text-[#1f2a37] flex items-center gap-2">
          {icon}
          {title}
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
        <div className="px-[30px] py-[40px]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-orange-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-orange-600">Component</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-orange-600">Condition</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-orange-600">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {sectionData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-[#f8fafc]'}>
                    <td className="px-4 py-3 font-semibold text-[#1f2a37]" style={{ fontSize: '14px' }}>{item.item}</td>
                    <td className="px-4 py-3">
                      <select
                        value={item.rating}
                        onChange={(e) => onChange(index, 'rating', e.target.value)}
                        className="w-full rounded-lg border-2 border-[#e2e8f0] px-3 py-2 focus:border-[#E54E3D] focus:outline-none"
                        style={{ fontSize: '14px' }}
                      >
                        <option value="">Select rating...</option>
                        {RATING_OPTIONS.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <textarea
                        value={item.notes}
                        onChange={(e) => onChange(index, 'notes', e.target.value)}
                        rows={2}
                        className="w-full rounded-lg border-2 border-[#e2e8f0] px-3 py-2 focus:border-[#E54E3D] focus:outline-none"
                        placeholder="Add notes..."
                        style={{ fontSize: '14px' }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

