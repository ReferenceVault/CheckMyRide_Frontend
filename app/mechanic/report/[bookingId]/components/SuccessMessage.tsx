interface SuccessMessageProps {
  success: string | null;
}

export default function SuccessMessage({ success }: SuccessMessageProps) {
  if (!success) return null;

  return (
    <div id="success-message" className="mb-6 rounded-lg bg-green-50 border-2 border-green-200 p-6 text-center">
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Success!</h3>
        <p className="text-lg text-green-700 mb-4">{success}</p>
        {success.includes('submitted') && (
          <p className="text-sm text-green-600">You will be redirected to the home page in a few seconds...</p>
        )}
      </div>
    </div>
  );
}

