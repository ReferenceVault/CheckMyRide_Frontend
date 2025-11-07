'use client';

import { useState } from 'react';
import BookingModal from './components/BookingModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* Navigation */}
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              {/* Beautiful Logo: Magnifying Glass with Car */}
              <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Magnifying Glass Circle */}
                <circle cx="20" cy="20" r="11" stroke="#E54E3D" strokeWidth="3" fill="rgba(229, 78, 61, 0.1)"/>
                {/* Magnifying Glass Handle */}
                <line x1="28" y1="28" x2="35" y2="35" stroke="#E54E3D" strokeWidth="3" strokeLinecap="round"/>
                {/* Car Icon Inside */}
                <g transform="translate(10, 12)">
                  <path d="M2 8h16c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2h-1.5c-.3 1.4-1.5 2.5-3 2.5s-2.7-1.1-3-2.5H6.5c-.3 1.4-1.5 2.5-3 2.5s-2.7-1.1-3-2.5H2c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2z" fill="#363636"/>
                  <circle cx="5" cy="18" r="2" fill="#363636"/>
                  <circle cx="15" cy="18" r="2" fill="#363636"/>
                </g>
              </svg>
              {/* Certified Badge */}
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#E54E3D] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#363636]">
            Check<span className="text-[#E54E3D]">MyRide</span>
            </div>
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a href="#home" className="text-[#363636] hover:text-[#E54E3D] transition-colors font-medium">Home</a>
              <a href="#features" className="text-[#363636] hover:text-[#E54E3D] transition-colors font-medium">Services</a>
              <a href="#about" className="text-[#363636] hover:text-[#E54E3D] transition-colors font-medium">Vehicles For Sale</a>
              <a href="#contact" className="text-[#363636] hover:text-[#E54E3D] transition-colors font-medium">Contact</a>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-[#E54E3D] text-white rounded-lg hover:bg-[#D43E2D] transition-all shadow-md hover:shadow-lg text-sm sm:text-base font-bold"
            >
              Book Inspection
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Dark Background */}
      <section id="home" className="bg-[#363636] py-16 sm:py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                Professional Vehicle Inspections Before You Buy
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8">
                Don't risk buying a lemon. Our certified mechanics will thoroughly inspect any vehicle before you purchase, giving you peace of mind and confidence in your decision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 sm:px-10 py-4 sm:py-5 bg-[#E54E3D] text-white rounded-lg hover:bg-[#D43E2D] transition-all shadow-lg hover:shadow-xl text-lg sm:text-xl font-bold"
                >
                  Book An Inspection
                </button>
                <button className="px-8 sm:px-10 py-4 sm:py-5 bg-transparent text-white border-2 border-gray-400 rounded-lg hover:border-gray-300 transition-all text-lg sm:text-xl font-semibold">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section - Light Background */}
      <section id="features" className="bg-white py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#1F1F1F]">
                Our <span className="text-[#E54E3D]">Inspection</span> <span className="text-[#E54E3D]">Services</span>
              </h2>
              <p className="text-xl text-[#6B6B6B] max-w-2xl mx-auto">We offer comprehensive inspection services tailored to your specific needs, ensuring you make the right decision when purchasing a vehicle.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                { title: "Standard Inspection", desc: "A thorough 50+ point inspection covering all essential systems and components of the vehicle, with a detailed report.", icon: "🚗", iconColor: "#E54E3D" },
                { title: "Enhanced Inspection", desc: "A comprehensive 75+ point inspection that builds on the Standard Inspection by including a deeper assessment of critical mechanical, electrical, and safety components.", icon: "🔍", iconColor: "#363636" },
                { title: "Full-Spectrum Inspection", desc: "Our most comprehensive inspection with 100+ check points, including advanced diagnostics and detailed examination. We offer vehicle price negotiation with seller under this package.", icon: "⚡", iconColor: "#F5A623" },
                { title: "Routine Vehicle Check-Up", desc: "A multi-point inspection designed to assess key maintenance areas, including fluid levels, tire condition, brakes, and battery health. We also offer standard mobile repair services under this package.", icon: "🔧", iconColor: "#E54E3D" },
              ].map((feature, i) => (
                <div key={i} className="group bg-white hover:bg-gray-50 p-8 sm:p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover-gradient-border hover:-translate-y-2 cursor-pointer">
                  <div className="relative inline-block mb-6">
                    <div className="relative w-16 h-16 rounded-full bg-transparent group-hover:bg-gray-100 border-2 border-transparent group-hover:border-gray-300 flex items-center justify-center transition-all">
                      <div className="text-4xl">{feature.icon}</div>
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-[#1F1F1F]">{feature.title}</h3>
                  <p className="text-[#6B6B6B] text-base sm:text-lg leading-relaxed mb-4">{feature.desc}</p>
                  <a href="#" className="mt-4 inline-flex items-center text-[#E54E3D] hover:text-[#D43E2D] font-semibold transition-colors text-sm sm:text-base group">
                    Learn more
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-gray-100 py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#1F1F1F]">
                How <span className="text-[#E54E3D]">It Works</span> 
              </h2>
              <p className="text-xl text-[#6B6B6B] max-w-2xl mx-auto">
                Our simple 4-step process makes getting your vehicle inspected easy and hassle-free.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { 
                  number: "1", 
                  title: "Book Online", 
                  desc: "Schedule an inspection through our simple online booking system." 
                },
                { 
                  number: "2", 
                  title: "Coordination", 
                  desc: "We coordinate with you/seller to arrange the location of the inspection." 
                },
                { 
                  number: "3", 
                  title: "Inspection", 
                  desc: "Our certified mechanic performs a thorough inspection of the vehicle." 
                },
                { 
                  number: "4", 
                  title: "Detailed Report", 
                  desc: "Receive a comprehensive report with our findings and recommendation." 
                },
              ].map((step, i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg border-t-4 border-[#E54E3D] p-6 sm:p-8 hover:shadow-2xl hover:-translate-y-2 hover-gradient-border transition-all duration-300 cursor-pointer">
                  <div className="text-center mb-6">
                    <div className="text-6xl sm:text-7xl font-bold text-[#E54E3D] opacity-30 mb-4">
                      {step.number}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1F1F1F] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[#6B6B6B] text-base sm:text-lg leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-white py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#1F1F1F]">
                Our <span className="text-[#E54E3D]">Pricing</span> 
              </h2>
              <p className="text-xl text-[#6B6B6B] max-w-2xl mx-auto">
                Transparent and competitive pricing for our professional inspection services.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {/* Standard Package */}
              <div className="bg-white rounded-lg shadow-xl border-2 border-gray-200 overflow-hidden hover:shadow-2xl hover:-translate-y-2 hover-gradient-border transition-all duration-300 cursor-pointer">
                <div className="bg-[#E54E3D] text-white p-6 text-center">
                  <h3 className="text-2xl font-bold">Standard</h3>
                  <div className="text-5xl font-bold mt-4">$150</div>
                </div>
                <div className="p-6">
                  <ul className="space-y-4 mb-6">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#1F1F1F]">50+ Point Inspection</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#1F1F1F]">Detailed Report</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#1F1F1F]">Professional Mechanic</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#1F1F1F]">Service at Seller's Location</span>
                    </li>
                  </ul>
                  <button className="w-full py-3 bg-[#E54E3D] text-white rounded-lg hover:bg-[#D43E2D] transition-all font-bold">
                    Select Package
                  </button>
                </div>
              </div>

              {/* Enhanced Package - Most Popular */}
              <div className="bg-white rounded-lg shadow-xl border-2 border-[#E54E3D] overflow-hidden relative hover:shadow-2xl hover:-translate-y-2 hover-gradient-border transition-all duration-300 cursor-pointer">
                <div className="absolute top-0 left-0 right-0 bg-[#E54E3D] text-white text-center py-2 text-sm font-bold">
                  MOST POPULAR
                </div>
                <div className="bg-[#1F2937] text-white p-6 text-center mt-8">
                  <h3 className="text-2xl font-bold">Enhanced</h3>
                  <div className="text-5xl font-bold mt-4">$200</div>
                </div>
                <div className="p-6">
                  <ul className="space-y-4 mb-6">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#1F1F1F]">75+ Point Inspection</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#1F1F1F]">Comprehensive Report</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#1F1F1F]">Professional Mechanic</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#1F1F1F]">Service at Seller's Location</span>
                    </li>
                  </ul>
                  <button className="w-full py-3 bg-[#E54E3D] text-white rounded-lg hover:bg-[#D43E2D] transition-all font-bold">
                    Select Package
                  </button>
                </div>
              </div>

              {/* Full-Spectrum Package */}
              <div className="bg-white rounded-lg shadow-xl border-2 border-gray-200 overflow-hidden hover:shadow-2xl hover:-translate-y-2 hover-gradient-border transition-all duration-300 cursor-pointer">
                <div className="bg-[#E54E3D] text-white p-6 text-center">
                  <h3 className="text-2xl font-bold">Full-Spectrum</h3>
                  <div className="text-5xl font-bold mt-4">$300</div>
                </div>
                <div className="p-6">
                  <ul className="space-y-4 mb-6">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#1F1F1F]">100+ Point Inspection</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#1F1F1F]">Elite Detailed Report</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#1F1F1F]">Professional Mechanic</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#1F1F1F]">Service at Seller's Location</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#1F1F1F]">Price Negotiation Support</span>
                    </li>
                  </ul>
                  <button className="w-full py-3 bg-[#E54E3D] text-white rounded-lg hover:bg-[#D43E2D] transition-all font-bold">
                    Select Plan
                  </button>
                </div>
              </div>

              {/* Routine Check-Up Package */}
              <div className="bg-white rounded-lg shadow-xl border-2 border-gray-200 overflow-hidden hover:shadow-2xl hover:-translate-y-2 hover-gradient-border hover-gradient-border-green transition-all duration-300 cursor-pointer">
                <div className="bg-green-500 text-white p-6 text-center">
                  <h3 className="text-2xl font-bold">Routine Check-Up</h3>
                  <div className="text-5xl font-bold mt-4">$100</div>
                </div>
                <div className="p-6">
                  <ul className="space-y-4 mb-6">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#1F1F1F]">Multi-Point Inspection</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#1F1F1F]">Fluid Levels Check</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#1F1F1F]">Tire & Brake Assessment</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#1F1F1F]">Battery Health Evaluation</span>
                    </li>
                  </ul>
                  <button className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all font-bold">
                    Select Package
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-gray-50 py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#1F1F1F]">
                What <span className="text-[#E54E3D]">Our Customers Say</span> 
              </h2>
              <p className="text-xl text-[#6B6B6B] max-w-2xl mx-auto">
                Don't just take our word for it. Here's what some of our satisfied customers have to say about our services.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 hover:shadow-2xl hover:-translate-y-2 hover-gradient-border border-2 border-transparent transition-all duration-300 cursor-pointer">
                <div className="flex items-start gap-2 mb-4">
                  <svg className="w-8 h-8 text-[#E54E3D] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h3.983v10h-9.983z"/>
                  </svg>
                  <svg className="w-8 h-8 text-[#E54E3D] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>
                <p className="text-[#1F1F1F] text-base sm:text-lg leading-relaxed mb-6">
                  "CheckMyRide saved me from buying a car with hidden transmission issues. The inspection was thorough and the mechanic explained everything clearly. Worth every penny!"
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-bold text-[#1F1F1F] mb-1">Michael Johnson</p>
                  <p className="text-[#6B6B6B] text-sm mb-2">Toronto, ON</p>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-500 text-sm font-medium">Custom</span>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 hover:shadow-2xl hover:-translate-y-2 hover-gradient-border border-2 border-transparent transition-all duration-300 cursor-pointer">
                <div className="flex items-start gap-2 mb-4">
                  <svg className="w-8 h-8 text-[#E54E3D] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h3.983v10h-9.983z"/>
                  </svg>
                  <svg className="w-8 h-8 text-[#E54E3D] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>
                <p className="text-[#1F1F1F] text-base sm:text-lg leading-relaxed mb-6">
                  "The convenience of having someone go to the seller's location made the whole process so easy. Professional service and detailed report helped me negotiate a better price."
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-bold text-[#1F1F1F] mb-1">Sarah Williams</p>
                  <p className="text-[#6B6B6B] text-sm mb-2">Vancouver, BC</p>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-500 text-sm font-medium">Custom</span>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 hover:shadow-2xl hover:-translate-y-2 hover-gradient-border border-2 border-transparent transition-all duration-300 cursor-pointer">
                <div className="flex items-start gap-2 mb-4">
                  <svg className="w-8 h-8 text-[#E54E3D] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h3.983v10h-9.983z"/>
                  </svg>
                  <svg className="w-8 h-8 text-[#E54E3D] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>
                <p className="text-[#1F1F1F] text-base sm:text-lg leading-relaxed mb-6">
                  "As someone who knows nothing about cars, CheckMyRide gave me the confidence to make my purchase. Their inspector was knowledgeable and patient with all my questions."
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-bold text-[#1F1F1F] mb-1">David Chen</p>
                  <p className="text-[#6B6B6B] text-sm mb-2">Calgary, AB</p>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-500 text-sm font-medium">Custom</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="bg-[#E54E3D] py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Inspect Your Next Ride?
            </h2>
            <p className="text-lg sm:text-xl text-white mb-8 max-w-2xl mx-auto leading-relaxed">
              Don't take chances with one of the biggest purchases you'll make. Let our experts inspect the vehicle and give you peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-8 sm:px-10 py-4 sm:py-5 bg-white text-[#E54E3D] rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl text-lg sm:text-xl font-bold"
              >
                Book an Inspection Now
              </button>
              <button className="px-8 sm:px-10 py-4 sm:py-5 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white/10 transition-all text-lg sm:text-xl font-bold">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#34495E] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
              {/* Column 1: CheckMyRide */}
              <div>
                <h3 className="text-xl font-bold mb-3 pb-2 border-b-2 border-[#E54E3D] inline-block">
                  CheckMyRide
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                  Professional pre-purchase vehicle inspection services across Canada. Our experts help you make informed decisions and avoid costly mistakes.
                </p>
                <div className="flex gap-3">
                  {['F', 'I', 'I', 'Y'].map((letter, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-[#E54E3D] hover:border-[#E54E3D] transition-all cursor-pointer">
                      <span className="text-white font-semibold">{letter}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Services */}
              <div>
                <h3 className="text-xl font-bold mb-3 pb-2 border-b-2 border-[#E54E3D] inline-block">
                  Services
                </h3>
                <ul className="space-y-3">
                  {[
                    'Standard Inspection',
                    'Enhanced Inspection',
                    'Full-Spectrum Inspection',
                    'Routine Check-Up',
                    'Pricing'
                  ].map((service, i) => (
                    <li key={i}>
                      <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                        {service}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Company */}
              <div>
                <h3 className="text-xl font-bold mb-3 pb-2 border-b-2 border-[#E54E3D] inline-block">
                  Company
                </h3>
                <ul className="space-y-3">
                  {[
                    'About Us',
                    'Our Team',
                    'Careers',
                    'Blog',
                    'FAQ'
                  ].map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4: Contact Us */}
              <div>
                <h3 className="text-xl font-bold mb-3 pb-2 border-b-2 border-[#E54E3D] inline-block">
                  Contact Us
                </h3>
                <ul className="space-y-3 text-gray-300 text-sm sm:text-base">
                  <li>
                    <span className="block">Email:</span>
                    <a href="mailto:info@checkmyride.ca" className="hover:text-white transition-colors">
                      info@checkmyride.ca
                    </a>
                  </li>
                  <li>
                    <span className="block">Phone:</span>
                    <a href="tel:6139815498" className="hover:text-white transition-colors">
                      (613)-981-5498
                    </a>
                  </li>
                  <li>
                    <span className="block">Hours:</span>
                    <span>Mon-Fri 9am-6pm EST</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright Bar */}
        <div className="border-t border-gray-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-7xl mx-auto text-center sm:text-left">
              <p className="text-gray-300 text-sm sm:text-base">
                © 2025 CheckMyRide. All Rights Reserved.{' '}
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                {' | '}
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

