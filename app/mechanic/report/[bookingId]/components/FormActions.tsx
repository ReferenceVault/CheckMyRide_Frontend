interface FormActionsProps {
  onSaveDraft: (e: React.FormEvent) => void;
  isSaving: boolean;
  isSubmitting: boolean;
}

export default function FormActions({ onSaveDraft, isSaving, isSubmitting }: FormActionsProps) {
  return (
    <div className="flex items-center justify-end gap-4 pb-6">
      <button
        type="button"
        onClick={onSaveDraft}
        disabled={isSaving}
        className="px-6 py-3 rounded-lg bg-[#f97362] text-white font-semibold hover:bg-[#E54E3D] transition-colors disabled:opacity-50"
      >
        {isSaving ? 'Saving...' : 'Save Draft'}
      </button>
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-3 rounded-lg bg-[#E54E3D] text-white font-semibold hover:bg-[#d14130] transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Report'}
      </button>
    </div>
  );
}

