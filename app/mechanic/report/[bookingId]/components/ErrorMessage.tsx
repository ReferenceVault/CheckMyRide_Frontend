interface ErrorMessageProps {
  error: string | null;
  validationErrors: string[];
}

export default function ErrorMessage({ error, validationErrors }: ErrorMessageProps) {
  if (!error && validationErrors.length === 0) return null;

  // Format error messages to be more user-friendly
  const formatError = (err: string): string => {
    // Remove technical prefixes and make messages user-friendly
    return err
      .replace(/Path `[^`]+` /g, '')
      .replace(/generalInfo\./g, '')
      .replace(/summary\./g, '')
      .replace(/valueAssessment\./g, '')
      .replace(/is required\.?/gi, 'is required')
      .trim();
  };

  return (
    <>
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border-2 border-red-200 p-4">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <p className="font-semibold text-red-800 mb-2">{error}</p>
              {validationErrors.length > 0 && (
                <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
                  {validationErrors.map((err, idx) => (
                    <li key={idx}>{formatError(err)}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {validationErrors.length > 0 && !error && (
        <div className="mb-6 rounded-lg bg-red-50 border-2 border-red-200 p-4">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <p className="font-semibold text-red-800 mb-2">Please fix the following errors:</p>
              <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
                {validationErrors.map((err, idx) => (
                  <li key={idx}>{formatError(err)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

