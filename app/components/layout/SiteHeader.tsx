'use client';

import Link from 'next/link';
import { useState } from 'react';

type NavLink = {
  label: string;
  href: string;
};

interface SiteHeaderProps {
  navLinks: NavLink[];
  onBookInspection: () => void;
}

export default function SiteHeader({ navLinks, onBookInspection }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-[0_8px_24px_-20px_rgba(15,23,42,0.35)]">
      <div className="px-4 sm:px-[8%] lg:px-[15%]">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between py-4">
          <Link href="/" className="relative flex items-center gap-2 sm:gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-white via-white/90 to-white/70 shadow-lg shadow-[#E54E3D]/20">
              <img src="/images/logo.png" alt="CheckMyRide" className="h-10 w-10 object-contain" />
            </div>
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1f2a37]">
              Check<span className="text-[#E54E3D]">MyRide</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group relative inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-[#374151] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E54E3D]/12 hover:text-[#E54E3D]"
                >
                  <span>{item.label}</span>
                  <span className="absolute inset-0 rounded-full border border-transparent transition-all duration-300 group-hover:border-[#E54E3D]/40" />
                </Link>
              ))}
            </div>
            <button
              onClick={onBookInspection}
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-[#E54E3D] px-5 sm:px-6 py-2.5 text-sm sm:text-base font-semibold uppercase tracking-wide text-white shadow-lg shadow-[#E54E3D]/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d14130]"
            >
              Book Inspection
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation"
              aria-expanded={isMenuOpen}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E54E3D]/20 bg-white text-[#1f2937] shadow-sm transition-all duration-200 hover:border-[#E54E3D]/50 md:hidden"
            >
              <span className="sr-only">Menu</span>
              <span className="flex flex-col items-center justify-center gap-1.5">
                <span className={`block h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`} />
                <span className={`block h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`block h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
              </span>
            </button>
          </div>

          {isMenuOpen && (
            <div className="absolute left-0 right-0 top-full mt-3 rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-lg shadow-slate-400/15 md:hidden">
              <nav className="flex flex-col gap-2">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="inline-flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-[#1f2a37] transition-colors hover:bg-[#E54E3D]/10 hover:text-[#E54E3D]"
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onBookInspection();
                  }}
                  className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#E54E3D] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-md shadow-[#E54E3D]/30"
                >
                  Book Inspection
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
