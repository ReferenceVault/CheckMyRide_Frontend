interface PriceNegotiationSectionProps {
  priceNegotiation: {
    priceReductionRequested: string;
    amountRequested: string;
    negotiationOutcome: string;
    finalOutcomeDetails: string;
    originalAskingPrice: string;
    originalAskingPriceNotes: string;
    finalNegotiatedPrice: string;
    savingsAmount: string;
    estimatedSavingsAchieved: string;
    estimatedSavingsDetails: string;
  };
  isExpanded: boolean;
  onToggle: () => void;
  onPriceNegotiationChange: (field: keyof PriceNegotiationSectionProps['priceNegotiation'], value: string) => void;
  errors?: string[];
}

export default function PriceNegotiationSection({
  priceNegotiation,
  isExpanded,
  onToggle,
  onPriceNegotiationChange,
  errors = [],
}: PriceNegotiationSectionProps) {
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
          Price Negotiation
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
                  <th className="px-4 py-3 text-left text-sm font-semibold text-orange-600">Field Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-orange-600">Field</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-orange-600">Notes/Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {/* Negotiation Outcome */}
                <tr className="bg-[#f8fafc]">
                  <td className="px-4 py-3 font-semibold text-[#1f2a37]" style={{ fontSize: '14px' }}>
                    Negotiation Outcome
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={priceNegotiation.negotiationOutcome}
                      onChange={(e) => onPriceNegotiationChange('negotiationOutcome', e.target.value)}
                      className="w-full rounded-lg border-2 border-[#e2e8f0] px-3 py-2 focus:border-[#E54E3D] focus:outline-none"
                      style={{ fontSize: '14px' }}
                    >
                      <option value="">Select...</option>
                      <option value="Price Reduced">Price Reduced</option>
                      <option value="Partial Reduction">Partial Reduction</option>
                      <option value="Counter-Offer">Counter-Offer</option>
                      <option value="Declined">Declined</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <textarea
                      value={priceNegotiation.finalOutcomeDetails}
                      onChange={(e) => onPriceNegotiationChange('finalOutcomeDetails', e.target.value)}
                      rows={2}
                      className="w-full rounded-lg border-2 border-[#e2e8f0] px-3 py-2 focus:border-[#E54E3D] focus:outline-none"
                      placeholder="Enter final outcome details"
                      style={{ fontSize: '14px' }}
                    />
                  </td>
                </tr>

                {/* Estimated Savings Achieved */}
                <tr className="bg-white">
                  <td className="px-4 py-3 font-semibold text-[#1f2a37]" style={{ fontSize: '14px' }}>
                    Estimated Savings Achieved
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <span className="text-[#64748b] mr-2" style={{ fontSize: '14px' }}>$</span>
                      <input
                        type="number"
                        value={priceNegotiation.estimatedSavingsAchieved}
                        onChange={(e) => onPriceNegotiationChange('estimatedSavingsAchieved', e.target.value)}
                        className="w-full rounded-lg border-2 border-[#e2e8f0] px-3 py-2 focus:border-[#E54E3D] focus:outline-none"
                        placeholder="Enter amount"
                        style={{ fontSize: '14px' }}
                        step="0.01"
                        min="0"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <textarea
                      value={priceNegotiation.estimatedSavingsDetails}
                      onChange={(e) => onPriceNegotiationChange('estimatedSavingsDetails', e.target.value)}
                      rows={2}
                      className="w-full rounded-lg border-2 border-[#e2e8f0] px-3 py-2 focus:border-[#E54E3D] focus:outline-none"
                      placeholder="Enter details"
                      style={{ fontSize: '14px' }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

