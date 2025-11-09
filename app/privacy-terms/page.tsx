'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import SiteFooter from '../components/layout/SiteFooter';
import SiteHeader from '../components/layout/SiteHeader';

const sectionData = [
  {
    title: '1. Acceptance of Terms',
    body: [
      'By booking an appointment with CheckMyRide, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before proceeding. These terms constitute a legally binding agreement between you ("the Client") and CheckMyRide.',
    ],
  },
  {
    title: '2. Services Provided',
    body: [
      'CheckMyRide offers vehicle inspection services for used cars, helping buyers identify potential issues before making a purchasing decision. Please note that CheckMyRide is not licensed to offer a Safety Standard Certificate or conduct safety inspection reports. Our services are not intended to replace the requirement for the buyer to acquire a Safety Standard Certificate, which is mandatory for registering a vehicle in Ontario.',
      'Our services are currently available only in Ottawa, its adjoining communities, and Gatineau.',
    ],
  },
  {
    title: '3. Inspection Limitations',
    body: [
      'Our inspections are non-invasive and based on visual and functional checks of the vehicle\'s components. While we strive to offer a thorough evaluation, our inspection is not equivalent to a full mechanical diagnosis and may not uncover all potential issues. The Client acknowledges that our inspection is limited by the information available at the time of inspection.',
    ],
  },
  {
    title: '4. Appointment Scheduling and Cancellations',
    body: [
      'Clients must provide accurate information when booking an appointment, including the vehicle details and preferred location (mobile inspection or at our CheckMyRide facility).',
      'Rescheduling: If you need to reschedule, please provide at least 5 hours’ notice.',
      'Cancellation: A cancellation fee of $50 applies if appointments are canceled with less than 5 hours’ notice.',
    ],
  },
  {
    title: '5. Client Responsibilities',
    body: [
      'Ensure the vehicle is available and accessible for inspection at the agreed time and location.',
      'For mobile inspections, provide a safe and appropriate area for the inspection to take place.',
    ],
  },
  {
    title: '6. Payment Terms',
    body: [
      'Payment is due upon completion of the inspection, unless otherwise agreed. We accept payments by cash or e-transfer only. Any additional services requested after the initial booking, such as vehicle registration or number plate installation, will incur extra charges.',
      'You have certain rights under the Consumer Protection Act, 2002 (Ontario), including the right to cancel services in certain circumstances. Refunds, if applicable, will be processed in accordance with Ontario consumer protection legislation.',
    ],
  },
  {
    title: '7. Limitation of Liability',
    body: [
      'CheckMyRide provides vehicle inspection services on an “as is” basis. While we strive for accuracy and thoroughness, our inspection reflects the vehicle’s condition at the time of assessment only. We cannot guarantee future performance, reliability, or the absence of defects not discoverable through non-invasive inspection methods.',
      'To the fullest extent permitted by law, CheckMyRide shall not be liable for: (a) any indirect, incidental, consequential, or punitive damages; (b) loss of profits or revenue; (c) issues or defects discovered after the inspection; (d) mechanical failures that occur subsequent to our inspection; or (e) any claims exceeding the amount paid for our inspection services.',
      'Nothing in this section excludes or limits liability that cannot be excluded or limited under applicable law, including liability for fraud, gross negligence, or personal injury caused by our negligence. The Client acknowledges that a Safety Standard Certificate from a licensed facility is required for registering the vehicle in Ontario, and our service does not substitute for this certification.',
    ],
  },
  {
    title: '8. Use of Inspection Reports',
    body: [
      'The inspection report provided by CheckMyRide is for informational purposes only and is not a warranty or guarantee of the vehicle’s condition. It is intended to assist buyers in making informed purchasing decisions but does not exempt the buyer from obtaining a Safety Standard Certificate for vehicle registration purposes.',
    ],
  },
  {
    title: '9. Privacy and Data Protection',
    body: [
      'CheckMyRide is committed to protecting your personal information in accordance with the Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable provincial privacy legislation. This section explains how we collect, use, disclose, and protect your personal information.',
      'Information We Collect: We collect personal information necessary to provide our vehicle inspection services, including your name, contact information (email, phone number), vehicle details, appointment preferences, location information, and payment information.',
      'Use of Information: Your personal information is used solely for scheduling and conducting inspections, communicating with you about your appointment and our services, processing payments, improving our services, and complying with legal obligations.',
      'Disclosure to Third Parties: We do not sell, rent, or trade your personal information. We may share your information with service providers who assist in delivering our services, law enforcement or regulatory authorities when required by law, and professional advisors bound by confidentiality obligations. All third parties are contractually obligated to maintain confidentiality and security.',
      'Consent: By using our services, you consent to the collection, use, and disclosure of your personal information as described in this policy. You may withdraw consent at any time by contacting us, subject to legal or contractual restrictions. Withdrawal of consent may limit our ability to provide services.',
      'Data Retention: We retain personal information only as long as necessary to fulfill its purpose, typically for seven (7) years to comply with business and legal requirements. After this period, personal information is securely destroyed or anonymized.',
      'Security Measures: We implement reasonable safeguards to protect personal information from unauthorized access or disclosure. However, no method of transmission or storage is completely secure.',
      'Cookies and Tracking: Our website may use cookies and similar technologies to enhance user experience. You can control cookie settings through your browser. We do not use cookies for targeted advertising.',
    ],
  },
  {
    title: '9A. Your Privacy Rights',
    body: [
      'Under PIPEDA, you have the right to access personal information we hold, correct inaccurate information, withdraw consent subject to legal restrictions, and file complaints with the Office of the Privacy Commissioner of Canada.',
      'To exercise these rights, please contact our Privacy Officer using the details in Section 14.',
    ],
  },
  {
    title: '9B. Data Security and Breach Notification',
    body: [
      'We implement industry-standard security measures including encryption, secure storage, access controls, and regular assessments. In the event of a breach that poses a real risk of significant harm, we will notify affected individuals and the Privacy Commissioner of Canada as required by PIPEDA and will promptly mitigate potential harm.',
    ],
  },
  {
    title: '9C. Electronic Communications and Consent',
    body: [
      'By providing your email address or phone number, you consent to receive electronic communications regarding appointments, inspection results, service updates, and related information. You may opt out of non-essential communications at any time. We comply with Canada’s Anti-Spam Legislation (CASL) in all communications.',
    ],
  },
  {
    title: '10. Force Majeure',
    body: [
      'CheckMyRide will not be responsible for delays or failure to perform services due to events outside our control, such as extreme weather, accidents, or unforeseen circumstances.',
    ],
  },
  {
    title: '11. Contractual Agreement and Limitations',
    body: [
      'The contractual relationship between CheckMyRide and the Client concludes upon completion of the physical inspection, delivery of the report, and payment. Any interactions between the Client and the CheckMyRide-assigned mechanic outside of the scheduled appointment are solely at the Client’s risk. CheckMyRide assumes no liability for issues arising from such dealings.',
    ],
  },
  {
    title: '12. Amendments',
    body: [
      'CheckMyRide reserves the right to modify or update these terms and conditions at any time. Material changes will be communicated to active clients via email at least thirty (30) days before taking effect. For new bookings, the most current version posted on our website applies. Continued use of our services after changes become effective constitutes acceptance of the revised terms. The most recent update date will be displayed at the top of this page.',
    ],
  },
  {
    title: '12A. Age Restrictions and Legal Capacity',
    body: [
      'You must be at least 18 years old and have legal capacity to enter binding contracts to use our services. If you are under 18, you may only use our services with the consent of a parent or legal guardian who agrees to these terms on your behalf.',
    ],
  },
  {
    title: '13. Governing Law',
    body: [
      'These terms and conditions are governed by the laws of the Province of Ontario, Canada. Any disputes will be subject to the exclusive jurisdiction of the courts of Ontario.',
    ],
  },
  {
    title: '13A. Dispute Resolution',
    body: [
      'In the event of a dispute, both parties agree to attempt resolution through good-faith negotiations. If unresolved after thirty (30) days, either party may pursue mediation before litigation. This section does not prevent either party from seeking injunctive relief or pursuing small claims court remedies.',
    ],
  },
  {
    title: '13B. Intellectual Property',
    body: [
      'All content, materials, inspection reports, methodologies, logos, and trademarks associated with CheckMyRide are the exclusive property of CheckMyRide and protected by Canadian and international intellectual property laws. Clients receive a limited, non-transferable license to use inspection reports solely for personal decision-making. Reproduction or commercial use without written permission is prohibited.',
    ],
  },
  {
    title: '13C. Accessibility',
    body: [
      'CheckMyRide is committed to providing accessible services in accordance with the Accessibility for Ontarians with Disabilities Act (AODA). Please contact us if you require accommodation and we will work to meet your needs.',
    ],
  },
  {
    title: '13D. Electronic Signatures and Records',
    body: [
      'You agree that electronic signatures, contracts, and records have the same legal effect as physical documents. By booking services online or electronically accepting these terms, you consent to conduct business electronically.',
    ],
  },
  {
    title: '14. Contact Information',
    body: [
      'Email: info@checkmyride.com',
      'Phone: +1 613-981-5498',
    ],
  },
];

export default function PrivacyTermsPage() {
  const navLinks = useMemo(
    () => [
      { label: 'Home', href: '/#home' },
      { label: 'Services', href: '/#features' },
      { label: 'Vehicles For Sale', href: '/#about' },
      { label: 'Contact', href: '/#contact' },
    ],
    []
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f9fc] text-[#0f172a]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,78,61,0.12),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_55%),radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_60%)]" />

      <SiteHeader navLinks={navLinks} />

      <section className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 sm:px-10 sm:py-20 lg:py-24">
        <header className="space-y-5 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#E54E3D]">
            Legal
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-[#1f2a37]">Privacy Policy</span>{' '}
            <span className="text-[#E54E3D]">& Terms of Service</span>
          </h1>
          <p className="mx-auto max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed text-[#3f4756]">
            This document outlines how we deliver inspections responsibly and how we protect your personal information. Please review it carefully, as booking an inspection with CheckMyRide means you agree to the following terms.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/book-appointment#booking-form"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#E54E3D] via-[#f97362] to-[#fb9f8a] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[#E54E3D]/40 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Book an Inspection
            </Link>
            <Link
              href="tel:6139815498"
              className="inline-flex items-center justify-center rounded-full border border-[#E54E3D]/40 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#E54E3D] transition hover:border-[#E54E3D] hover:text-[#d14130]"
            >
              Call (613) 981-5498
            </Link>
          </div>
        </header>

        <div className="space-y-10 rounded-[2.75rem] bg-white/95 p-8 sm:p-12 shadow-xl shadow-slate-200/60 ring-1 ring-slate-100">
          {sectionData.map((section) => (
            <section key={section.title} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#152032]">{section.title}</h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#3f4756]">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="rounded-[2.25rem] bg-[#0f172a] px-8 py-10 text-white shadow-xl shadow-[#0f172a]/40">
          <h2 className="text-2xl font-semibold">Still have questions?</h2>
          <p className="mt-3 max-w-3xl text-sm sm:text-base leading-relaxed text-white/80">
            Reach out to our team at{' '}
            <Link href="mailto:info@checkmyride.com" className="underline decoration-white/60 underline-offset-4 transition hover:decoration-white">
              info@checkmyride.com
            </Link>{' '}
            or call{' '}
            <Link href="tel:6139815498" className="underline decoration-white/60 underline-offset-4 transition hover:decoration-white">
              (613) 981-5498
            </Link>
            . We’re happy to clarify any part of this policy.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
