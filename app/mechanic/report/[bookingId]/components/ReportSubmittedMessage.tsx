interface ReportSubmittedMessageProps {
  bookingId: string;
}

export default function ReportSubmittedMessage({ bookingId }: ReportSubmittedMessageProps) {
  return (
    <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg border-2 border-green-200 p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#1f2a37] mb-3">Report Already Submitted</h2>
          <p className="text-[#64748b] text-lg mb-6">
            This inspection report has already been submitted and completed. You cannot make further changes to this report.
          </p>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-green-800">
            <strong>Note:</strong> If you need to view this report, you can access it through the report view page.
          </p>
        </div>
        
        <div className="flex gap-4 justify-center">
          <a
            href={`/report/${bookingId}`}
            className="px-6 py-3 bg-[#E54E3D] text-white font-semibold rounded-lg hover:bg-[#d14130] transition-colors"
          >
            View Report
          </a>
          <a
            href="/"
            className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            Go to Home
          </a>
        </div>
      </div>
    </div>
  );
}

