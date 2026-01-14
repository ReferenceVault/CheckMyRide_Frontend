'use client';

import Link from 'next/link';
import SiteFooter from '../components/layout/SiteFooter';
import SiteHeader from '../components/layout/SiteHeader';

const faqSections = [
  {
    title: 'General Questions',
    items: [
      {
        question: 'What is CheckMyRide?',
        answer:
          'CheckMyRide is a professional vehicle inspection service that helps you make informed decisions when purchasing pre-owned vehicles. We provide thorough, unbiased inspections to identify potential issues before you buy.',
      },
      {
        question: 'Where are you located?',
        answer:
          "We're based in Ottawa, and we serve Ottawa, its adjoining communities, and Gatineau. Our inspectors can come to you for mobile inspections, or you can bring the vehicle to our CheckMyRide location.",
      },
      {
        question: "Is CheckMyRide's inspection the same as a Safety Standard Certificate?",
        answer:
          'No. CheckMyRide is not licensed to offer a Safety Standard Certificate or conduct safety inspection reports. Our services help you identify potential issues before purchase but do not replace the requirement for a Safety Standard Certificate, which is mandatory for registering a vehicle in Ontario.',
      },
    ],
  },
  {
    title: 'Our Services',
    items: [
      {
        question: 'What types of inspection packages do you offer?',
        answer:
          'We offer four inspection packages: Standard Inspection (50+ points), Enhanced Inspection (75+ points), Full-Spectrum Inspection (100+ points with negotiation assistance), and Routine Check-Up (maintenance-focused assessment).',
      },
      {
        question: "What's the difference between your inspection packages?",
        answer:
          'Each tier includes additional inspection points and services. Standard covers essential systems, Enhanced adds deeper mechanical checks, Full-Spectrum is our most comprehensive option with price negotiation assistance, and Routine Check-Up focuses on maintenance for vehicles you already own.',
      },
      {
        question: 'How much do your inspections cost?',
        answer:
          'Our inspection packages start at $180 for Standard, $200 for Enhanced, $300 for Full-Spectrum, and $120 for Routine Check-Up.',
      },
      {
        question: 'What are the limitations of your inspections?',
        answer:
          "Our inspections are non-invasive and based on visual and functional checks of the vehicle's components. While thorough, they are not equivalent to a full mechanical diagnosis and may not uncover all potential issues. The inspection reflects the vehicle's condition at the time of assessment.",
      },
    ],
  },
  {
    title: 'Booking & Payment',
    items: [
      {
        question: 'How do I schedule an inspection?',
        answer:
          'You can book an inspection through our website by completing the booking form. Choose the package, share vehicle details, and pick a convenient time.',
      },
      {
        question: "What's your cancellation policy?",
        answer:
          'If you need to reschedule, please provide at least 5 hours’ notice. A cancellation fee of $50 applies if appointments are canceled with less than 5 hours’ notice.',
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept payments by cash or e-transfer only. Payment is due upon completion of the inspection, unless otherwise agreed.',
      },
    ],
  },
  {
    title: 'Inspection Process',
    items: [
      {
        question: 'How long does an inspection take?',
        answer:
          'Standard inspections take 45-60 minutes, Enhanced takes 60-90 minutes, Full-Spectrum takes 90-120 minutes, and Routine Check-Ups take approximately 30-45 minutes.',
      },
      {
        question: 'What are my responsibilities for the inspection?',
        answer:
          'Ensure the vehicle is available and accessible at the agreed time and location. For mobile inspections, provide a safe and appropriate area for the inspection to take place.',
      },
      {
        question: 'Should I be present during the inspection?',
        answer:
          'While not required, we recommend attending if possible. It allows you to see potential issues firsthand and ask questions directly.',
      },
      {
        question: 'Do I get a written report?',
        answer:
          'Yes. You receive a comprehensive digital inspection report documenting all findings, delivered upon completion of the inspection.',
      },
    ],
  },
  {
    title: 'After the Inspection',
    items: [
      {
        question: 'What is the purpose of your inspection report?',
        answer:
          "The report is for informational purposes only and is not a warranty or guarantee of the vehicle's condition. It helps you make an informed purchase decision but does not exempt you from obtaining a Safety Standard Certificate for registration.",
      },
      {
        question: "Does CheckMyRide guarantee the vehicle's condition after purchase?",
        answer:
          'No. We are not liable for losses, damages, or issues discovered after the inspection. Our inspection reflects the vehicle’s condition at the time of assessment and cannot guarantee future performance or reliability.',
      },
      {
        question: 'Can you help me negotiate the price based on inspection findings?',
        answer:
          'Yes. Our Full-Spectrum Inspection package includes price negotiation assistance based on the issues found during the inspection.',
      },
      {
        question: 'What happens if I decide not to buy the vehicle after the inspection?',
        answer:
          'That’s completely fine. Our goal is to help you make an informed decision, whether that means proceeding with the purchase or walking away. The inspection fee covers our professional service regardless of your final decision.',
      },
    ],
  },
  {
    title: 'Privacy & Legal',
    items: [
      {
        question: 'How do you handle my personal information?',
        answer:
          'We are committed to protecting your personal information. Data collected during booking and inspection is used solely to provide our services and is not shared with third parties without consent, except where required by law.',
      },
      {
        question: 'What is the scope of your contractual relationship with clients?',
        answer:
          'Our contractual relationship concludes once the inspection is complete, the report is delivered, and payment is received. Any additional interactions with the assigned mechanic outside the appointment are at your own risk.',
      },
    ],
  },
  {
    title: 'Contact Information',
    items: [
      {
        question: 'How can I contact CheckMyRide?',
        answer:
          'Phone: (613)-981-5498. Email: info@checkmyride.ca. Website: www.checkmyride.ca.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f9fc] text-[#0f172a]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,78,61,0.12),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_55%),radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_60%)]" />

      <SiteHeader />

      <section className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 sm:px-10 sm:py-20 lg:py-24">
        <header className="space-y-5 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#E54E3D]">
            Frequently Asked Questions
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-[#1f2a37]">Answers to Your</span>{' '}
            <span className="text-[#E54E3D]">CheckMyRide Questions</span>
          </h1>
          <p className="mx-auto max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed text-[#3f4756]">
            From what we inspect to how we protect your information, this page covers the details our clients ask about most. Need something you don’t see here? Reach out and we’ll be happy to help.
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

        <div className="space-y-10">
          {faqSections.map((section) => (
            <section key={section.title} className="rounded-[2.5rem] bg-white/95 p-8 sm:p-10 shadow-xl shadow-slate-200/60 ring-1 ring-slate-100">
              <h2 className="text-2xl font-semibold text-[#152032]">{section.title}</h2>
              <div className="mt-6 space-y-6">
                {section.items.map((item) => (
                  <div key={item.question} className="rounded-2xl bg-[#f8fafc] p-6 text-sm sm:text-base text-[#3f4756] shadow-inner shadow-slate-200/40">
                    <h3 className="text-lg font-semibold text-[#1f2a37]">{item.question}</h3>
                    <p className="mt-2 leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="rounded-[2.25rem] bg-[#0f172a] px-8 py-10 text-white shadow-xl shadow-[#0f172a]/40 text-center">
          <h2 className="text-2xl font-semibold">Still have questions?</h2>
          <p className="mt-3 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed text-white/80">
            Reach out to our team at{' '}
            <Link href="mailto:info@checkmyride.ca" className="underline decoration-white/60 underline-offset-4 transition hover:decoration-white">
              info@checkmyride.ca
            </Link>{' '}
            or call{' '}
            <Link href="tel:6139815498" className="underline decoration-white/60 underline-offset-4 transition hover:decoration-white">
              (613) 981-5498
            </Link>
            . We can guide you through any detail of our inspection services.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
