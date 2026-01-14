'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import SiteHeader from '../../components/layout/SiteHeader';
import SiteFooter from '../../components/layout/SiteFooter';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface BookingDetails {
  personalInfo: {
    fullName: string;
    email: string;
  };
  vehicleInfo: {
    year: number;
    make: string;
    model: string;
  };
  inspectionDetails: {
    type: string;
  };
  appointmentDetails: {
    preferredDate: string;
  };
  assignedMechanic?: {
    mechanicId?: {
      firstName?: string;
      lastName?: string;
    };
  };
}

interface FeedbackFormData {
  ratings: {
    overallExperience: number;
    mechanicProfessionalism: number;
    inspectionThoroughness: number;
    reportClarity: number;
    communication: number;
  };
  recommendation: 'yes' | 'maybe' | 'no' | null;
  detailedFeedback: string;
}

const NumberRating = ({ 
  value, 
  onChange, 
  label, 
  icon 
}: { 
  value: number; 
  onChange: (value: number) => void; 
  label: string; 
  icon: string;
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-[#1f2a37] mb-3">
        <span className="mr-2">{icon}</span>
        {label}
      </label>
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(rating)}
            className={`w-10 h-10 rounded-md font-semibold text-base transition-all ${
              value === rating
                ? 'bg-[#1f2a37] text-white scale-105'
                : 'bg-gray-200 text-[#1f2a37] hover:bg-gray-300'
            }`}
            aria-label={`Rate ${rating} out of 5`}
          >
            {rating}
          </button>
        ))}
        <span className="ml-4 text-sm text-gray-600">
          1 = Poor • 5 = Excellent
        </span>
      </div>
    </div>
  );
};

export default function FeedbackPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.bookingId as string;

  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedbackExists, setFeedbackExists] = useState(false);

  const [formData, setFormData] = useState<FeedbackFormData>({
    ratings: {
      overallExperience: 0,
      mechanicProfessionalism: 0,
      inspectionThoroughness: 0,
      reportClarity: 0,
      communication: 0,
    },
    recommendation: null,
    detailedFeedback: '',
  });

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`${API_URL}/api/bookings/${bookingId}`);
        if (!response.ok) {
          throw new Error('Booking not found');
        }
        const data = await response.json();
        setBooking(data.booking);

        // Check if feedback already exists
        const feedbackCheck = await fetch(`${API_URL}/api/feedback/booking/${bookingId}`);
        if (feedbackCheck.ok) {
          const feedbackData = await feedbackCheck.json();
          if (feedbackData.exists) {
            setFeedbackExists(true);
          }
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load booking details');
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  // Scroll to top when feedback is successfully submitted
  useEffect(() => {
    if (submitSuccess) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [submitSuccess]);

  const handleRatingChange = (category: keyof FeedbackFormData['ratings'], value: number) => {
    setFormData(prev => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [category]: value,
      },
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    // Validate all ratings are filled
    const allRatingsFilled = Object.values(formData.ratings).every(rating => rating > 0);
    if (!allRatingsFilled) {
      setError('Please rate all categories');
      setSubmitting(false);
      return;
    }

    if (!formData.recommendation) {
      setError('Please select a recommendation');
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId,
          ratings: formData.ratings,
          recommendation: formData.recommendation,
          detailedFeedback: formData.detailedFeedback.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit feedback');
      }

      setSubmitSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f9fc]">
        <SiteHeader />
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center">Loading...</div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  if (error && !booking) {
    return (
      <div className="min-h-screen bg-[#f7f9fc]">
        <SiteHeader />
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-[#1f2a37] mb-4">Error</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link
              href="/"
              className="inline-block bg-[#E54E3D] text-white px-6 py-3 rounded-lg hover:bg-[#D43E2D] transition-colors"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  if (feedbackExists) {
    return (
      <div className="min-h-screen bg-[#f7f9fc]">
        <SiteHeader />
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-[#1f2a37] mb-4">Feedback Already Submitted</h1>
            <p className="text-gray-600 mb-6">
              Thank you! You have already submitted feedback for this inspection.
            </p>
            <Link
              href="/"
              className="inline-block bg-[#E54E3D] text-white px-6 py-3 rounded-lg hover:bg-[#D43E2D] transition-colors"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-[#f7f9fc]">
        <SiteHeader />
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-2xl font-bold text-[#1f2a37] mb-4">Thank You for Your Feedback!</h1>
            <p className="text-gray-600">
              Your feedback helps us maintain the highest standards and ensures our mechanics continue to deliver exceptional service.
            </p>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const formatInspectionType = (type: string) => {
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const mechanicName = booking?.assignedMechanic?.mechanicId
    ? `${booking.assignedMechanic.mechanicId.firstName || ''} ${booking.assignedMechanic.mechanicId.lastName || ''}`.trim()
    : 'Not assigned';

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <SiteHeader />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#E54E3D] to-[#D43E2D] px-8 py-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              How was your experience?
            </h1>
            <p className="text-white/90 text-sm sm:text-base">
              Your feedback helps us maintain the highest standards and ensures our mechanics continue to deliver exceptional service. Please take a moment to rate your recent inspection.
            </p>
          </div>

          {/* Booking Details */}
          <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-[#1f2a37] mb-4">Inspection Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-sm text-gray-600">Inspection Type</span>
                <p className="font-semibold text-[#1f2a37]">
                  {booking ? formatInspectionType(booking.inspectionDetails.type) : 'N/A'}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Date</span>
                <p className="font-semibold text-[#1f2a37]">
                  {booking ? formatDate(booking.appointmentDetails.preferredDate) : 'N/A'}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Your Mechanic</span>
                <p className="font-semibold text-[#1f2a37]">{mechanicName}</p>
              </div>
            </div>
          </div>

          {/* Feedback Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#1f2a37] mb-6">Rate Your Experience</h2>
              
              <NumberRating
                value={formData.ratings.overallExperience}
                onChange={(value) => handleRatingChange('overallExperience', value)}
                label="Overall Experience"
                icon="⭐"
              />
              
              <NumberRating
                value={formData.ratings.mechanicProfessionalism}
                onChange={(value) => handleRatingChange('mechanicProfessionalism', value)}
                label="Mechanic Professionalism"
                icon="🧰"
              />
              
              <NumberRating
                value={formData.ratings.inspectionThoroughness}
                onChange={(value) => handleRatingChange('inspectionThoroughness', value)}
                label="Inspection Thoroughness"
                icon="🔍"
              />
              
              <NumberRating
                value={formData.ratings.reportClarity}
                onChange={(value) => handleRatingChange('reportClarity', value)}
                label="Report Clarity & Quality"
                icon="📘"
              />
              
              <NumberRating
                value={formData.ratings.communication}
                onChange={(value) => handleRatingChange('communication', value)}
                label="Communication & Responsiveness"
                icon="💬"
              />
            </div>

            {/* Recommendation */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-[#1f2a37] mb-4">
                Would you recommend CheckMyRide?
              </label>
              <div className="flex flex-wrap gap-4">
                {[
                  { value: 'yes' as const, label: '👍 Yes, Definitely!', bgColor: 'bg-green-500', hoverBgColor: 'hover:bg-green-600', selectedBgColor: 'bg-green-600', borderColor: 'border-green-700' },
                  { value: 'maybe' as const, label: '🤔 Maybe', bgColor: 'bg-orange-500', hoverBgColor: 'hover:bg-orange-600', selectedBgColor: 'bg-orange-600', borderColor: 'border-orange-700' },
                  { value: 'no' as const, label: '👎 No', bgColor: 'bg-red-500', hoverBgColor: 'hover:bg-red-600', selectedBgColor: 'bg-red-600', borderColor: 'border-red-700' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, recommendation: option.value }))}
                    className={`px-6 py-3 rounded-lg font-semibold text-white transition-all ${
                      formData.recommendation === option.value
                        ? `${option.selectedBgColor} border-4 ${option.borderColor} scale-105 shadow-lg`
                        : `${option.bgColor} ${option.hoverBgColor} border-4 border-transparent opacity-75`
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Feedback */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-[#1f2a37] mb-2">
                Have more to share?
              </label>
              <p className="text-sm text-gray-600 mb-4">
                We'd love to hear your detailed feedback and any suggestions for improvement.
              </p>
              <textarea
                value={formData.detailedFeedback}
                onChange={(e) => setFormData(prev => ({ ...prev, detailedFeedback: e.target.value }))}
                maxLength={5000}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E54E3D] focus:border-transparent resize-none"
                placeholder="Leave detailed feedback..."
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {formData.detailedFeedback.length}/5000 characters
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#E54E3D] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#D43E2D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
