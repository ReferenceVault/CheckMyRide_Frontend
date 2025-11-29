interface ErrorMessageProps {
  error: string | null;
  validationErrors: string[];
}

export default function ErrorMessage({ error, validationErrors }: ErrorMessageProps) {
  if (!error && validationErrors.length === 0) return null;

  return (
    <>
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border-2 border-red-200 p-4">
          <p className="font-semibold text-red-800 mb-2">{error}</p>
          {validationErrors.length > 0 && (
            <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
              {validationErrors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {validationErrors.length > 0 && !error && (
        <div className="mb-6 rounded-lg bg-red-50 border-2 border-red-200 p-4">
          <p className="font-semibold text-red-800 mb-2">Please fix the following errors:</p>
          <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
            {validationErrors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

