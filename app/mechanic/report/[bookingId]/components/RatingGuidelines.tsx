'use client';

export default function RatingGuidelines() {
  const guidelines = [
    {
      rating: 'Excellent',
      icon: '✓',
      iconColor: 'text-green-600',
      description: 'Component is in like-new condition with no visible wear or issues.',
      recommendation: 'No action required.',
    },
    {
      rating: 'Good',
      icon: '✓',
      iconColor: 'text-green-600',
      description: 'Component is in good working condition with minimal wear.',
      recommendation: 'No immediate action required.',
    },
    {
      rating: 'Fair',
      icon: '⚠',
      iconColor: 'text-orange-600',
      description: 'Component shows signs of wear but is still functional.',
      recommendation: 'Monitor and plan for future replacement.',
    },
    {
      rating: 'Needs Attention',
      icon: '⚠',
      iconColor: 'text-orange-600',
      description: 'Component requires repair or replacement soon.',
      recommendation: 'Address within 30-90 days.',
    },
    {
      rating: 'Critical Issue',
      icon: '✗',
      iconColor: 'text-red-600',
      description: 'Component has serious defects affecting safety or operation.',
      recommendation: 'Immediate attention required.',
    },
  ];

  return (
    <div className="bg-white rounded-lg border-2 border-[#e2e8f0] shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-bold text-[#1f2a37] mb-4">Rating Guidelines</h2>
        <div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-700">
                  <th className="border border-[#e2e8f0] px-4 py-3 text-left text-sm font-semibold text-white">
                    Rating
                  </th>
                  <th className="border border-[#e2e8f0] px-4 py-3 text-left text-sm font-semibold text-white">
                    Description
                  </th>
                  <th className="border border-[#e2e8f0] px-4 py-3 text-left text-sm font-semibold text-white">
                    Recommendation
                  </th>
                </tr>
              </thead>
              <tbody>
                {guidelines.map((guideline, index) => (
                  <tr key={index} className="hover:bg-[#f8fafc]">
                    <td className="border border-[#e2e8f0] px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-lg font-bold ${guideline.iconColor}`}>
                          {guideline.icon}
                        </span>
                        <span className={`text-sm font-bold ${guideline.iconColor}`}>
                          {guideline.rating}
                        </span>
                      </div>
                    </td>
                    <td className="border border-[#e2e8f0] px-4 py-3 text-sm text-[#64748b]">
                      {guideline.description}
                    </td>
                    <td className="border border-[#e2e8f0] px-4 py-3 text-sm text-[#1f2a37]">
                      {guideline.recommendation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

