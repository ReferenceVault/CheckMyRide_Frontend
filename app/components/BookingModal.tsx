'use client';

import { useState } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    preferredDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col relative z-[101]">
        {/* Header - Fixed */}
        <div className="bg-[#E54E3D] text-white p-6 rounded-t-2xl flex items-center justify-between flex-shrink-0">
          <h2 className="text-2xl sm:text-3xl font-bold">Book Your Inspection</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form - Scrollable Input Area */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 custom-scrollbar">
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[#1F1F1F] mb-2">
                  Full Name <span className="text-[#E54E3D]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#E54E3D] focus:outline-none transition-colors text-[#1F1F1F]"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#1F1F1F] mb-2">
                  Email Address <span className="text-[#E54E3D]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#E54E3D] focus:outline-none transition-colors text-[#1F1F1F]"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-[#1F1F1F] mb-2">
                  Phone Number <span className="text-[#E54E3D]">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#E54E3D] focus:outline-none transition-colors text-[#1F1F1F]"
                  placeholder="(613) 123-4567"
                />
              </div>

              {/* Vehicle Field */}
              <div>
                <label htmlFor="vehicle" className="block text-sm font-semibold text-[#1F1F1F] mb-2">
                  Vehicle Make & Model <span className="text-[#E54E3D]">*</span>
                </label>
                <input
                  type="text"
                  id="vehicle"
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#E54E3D] focus:outline-none transition-colors text-[#1F1F1F]"
                  placeholder="e.g., Honda Civic 2020"
                />
              </div>

              {/* Preferred Date Field */}
              <div>
                <label htmlFor="preferredDate" className="block text-sm font-semibold text-[#1F1F1F] mb-2">
                  Preferred Inspection Date <span className="text-[#E54E3D]">*</span>
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#E54E3D] focus:outline-none transition-colors text-[#1F1F1F]"
                />
              </div>
            </div>
          </div>

          {/* Form Actions - Fixed at Bottom */}
          <div className="p-6 sm:p-8 pt-0 border-t border-gray-200 flex-shrink-0">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-[#1F1F1F] rounded-lg hover:bg-gray-50 transition-all font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-[#E54E3D] text-white rounded-lg hover:bg-[#D43E2D] transition-all font-bold shadow-lg hover:shadow-xl"
              >
                Submit Booking
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

