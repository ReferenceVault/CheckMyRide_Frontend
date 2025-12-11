'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface VehiclePhotosProps {
  photos: string[];
  reportType: string;
  onPhotosChange: (photos: string[]) => void;
  isExpanded: boolean;
  onToggle: () => void;
  isReadOnly?: boolean;
}

const PHOTO_LABELS = [
  'Front View',
  'Rear View',
  'Left Side',
  'Right Side',
  'Interior',
  'Dashboard',
  'Engine Bay',
  'Undercarriage',
  'Odometer',
  'VIN Plate',
  'Additional 1',
  'Additional 2',
];

export default function VehiclePhotos({
  photos,
  reportType,
  onPhotosChange,
  isExpanded,
  onToggle,
  isReadOnly = false,
}: VehiclePhotosProps) {
  const params = useParams();
  const bookingId = params?.bookingId as string;
  const [uploading, setUploading] = useState<boolean[]>(new Array(12).fill(false));
  const [deleting, setDeleting] = useState<boolean[]>(new Array(12).fill(false));
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Ensure photos array has 12 slots
  const photosArray = Array.from({ length: 12 }, (_, i) => photos[i] || '');

  const getAuthToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) return adminToken;
    return localStorage.getItem('token');
  };

  const handleFileSelect = async (index: number, file: File | null) => {
    if (!file || isReadOnly) return;

    setUploading((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });

    try {
      const formData = new FormData();
      formData.append('photos', file);
      formData.append('reportType', reportType);

      const token = getAuthToken();
      const headers: HeadersInit = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_URL}/api/reports/booking/${bookingId}/photos`, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload photo');
      }

      const data = await response.json();
      if (data.urls && data.urls.length > 0) {
        const newPhotos = [...photosArray];
        newPhotos[index] = data.urls[0];
        onPhotosChange(newPhotos);
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Failed to upload photo. Please try again.');
    } finally {
      setUploading((prev) => {
        const newState = [...prev];
        newState[index] = false;
        return newState;
      });
    }
  };

  const handleDelete = async (index: number) => {
    if (isReadOnly || !photos[index]) return;

    setDeleting((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });

    try {
      const token = getAuthToken();
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_URL}/api/reports/booking/${bookingId}/photos`, {
        method: 'DELETE',
        headers,
        body: JSON.stringify({
          reportType,
          photoUrl: photos[index],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete photo');
      }

      const newPhotos = [...photosArray];
      newPhotos[index] = '';
      onPhotosChange(newPhotos);
    } catch (error) {
      console.error('Error deleting photo:', error);
      alert('Failed to delete photo. Please try again.');
    } finally {
      setDeleting((prev) => {
        const newState = [...prev];
        newState[index] = false;
        return newState;
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full bg-gradient-to-r from-orange-50 to-gray-50 px-6 py-4 flex items-center justify-between hover:from-orange-100 hover:to-gray-100 transition-all duration-200"
      >
        <h2 className="text-base font-bold text-[#1f2a37] flex items-center gap-2">
          <svg className="w-5 h-5 text-[#E54E3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Vehicle Photos
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {PHOTO_LABELS.map((label, index) => (
              <div key={index} className="relative">
                <div
                  className={`relative border-2 border-dashed rounded-lg overflow-hidden ${
                    photosArray[index]
                      ? 'border-[#E54E3D]'
                      : 'border-gray-300 hover:border-[#E54E3D] transition-colors'
                  }`}
                  style={{ aspectRatio: '4/3' }}
                >
                  {photosArray[index] ? (
                    <>
                      <img
                        src={photosArray[index]}
                        alt={label}
                        className="w-full h-full object-cover"
                      />
                      {!isReadOnly && (
                        <button
                          type="button"
                          onClick={() => handleDelete(index)}
                          disabled={deleting[index]}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors disabled:opacity-50"
                        >
                          {deleting[index] ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          ) : (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                        </button>
                      )}
                    </>
                  ) : (
                    <label
                      className={`flex flex-col items-center justify-center w-full h-full cursor-pointer ${
                        isReadOnly ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                    >
                      <input
                        ref={(el) => (fileInputRefs.current[index] = el)}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileSelect(index, file);
                          }
                        }}
                        className="hidden"
                        disabled={isReadOnly || uploading[index]}
                      />
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        {uploading[index] ? (
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E54E3D] mb-2"></div>
                        ) : (
                          <svg className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        )}
                        <span className="text-xs text-center px-2">{label}</span>
                      </div>
                    </label>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

