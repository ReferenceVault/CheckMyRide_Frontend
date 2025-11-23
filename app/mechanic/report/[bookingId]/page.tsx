'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function InspectionReportRouter() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params?.bookingId as string;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBookingAndRedirect();
  }, [bookingId]);

  const fetchBookingAndRedirect = async () => {
    try {
      const bookingRes = await fetch(`${API_URL}/api/bookings/${bookingId}`);
      
      if (!bookingRes.ok) {
        throw new Error('Booking not found');
      }

      const bookingData = await bookingRes.json();
      const inspectionType = bookingData.booking.inspectionDetails?.type || 'standard';

      // Redirect to the appropriate inspection type page
      router.replace(`/mechanic/report/${bookingId}/${inspectionType}`);
    } catch (error: any) {
      setError(error.message || 'Failed to load booking');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E54E3D] mx-auto mb-4"></div>
          <p className="text-[#64748b]">Redirecting to inspection page...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-[#1f2a37] mb-2">Error</h2>
          <p className="text-[#64748b] mb-6">{error}</p>
          <Link href="/" className="text-[#E54E3D] hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  return null;
}
