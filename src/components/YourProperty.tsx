"use client";

import { Inter } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

interface PropertyDetail {
  label: string;
  value: string | number;
  icon: ReactNode;
}

interface YourPropertyProps {
  bedrooms?: number | null;
  bathrooms?: number | null;
  sqft?: number | null;
  yearBuilt?: number | null;
  estimated?: boolean;
}

function displayValue(value: number | null | undefined, suffix = ""): string {
  if (value === null || value === undefined) return "N/A";
  return `${value.toLocaleString()}${suffix}`;
}

export default function YourProperty({
  bedrooms = 4,
  bathrooms = 3,
  sqft = 2110,
  yearBuilt = 2014,
  estimated = false,
}: Partial<YourPropertyProps>) {
  const details: PropertyDetail[] = [
    {
      label: "Bedrooms",
      value: displayValue(bedrooms),
      icon: (
        <>
          <path d="M3 18v-5a2 2 0 012-2h14a2 2 0 012 2v5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 18h18M3 18v2M21 18v2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 11V7a2 2 0 012-2h3a2 2 0 012 2v4" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ),
    },
    {
      label: "Bathrooms",
      value: displayValue(bathrooms),
      icon: (
        <>
          <path d="M4 12h16v2a5 5 0 01-5 5H9a5 5 0 01-5-5v-2z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 12V5a2 2 0 012-2h1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 19.5L6 21.5M17 19.5l1 2" strokeLinecap="round" />
        </>
      ),
    },
    {
      label: "Square Footage",
      value: sqft != null ? `${sqft.toLocaleString()} sq ft` : "N/A",
      icon: (
        <>
          <rect x="3.5" y="3.5" width="17" height="17" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.5 9.5h17M9.5 20.5v-11" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ),
    },
    {
      label: "Year Built",
      value: displayValue(yearBuilt),
      icon: (
        <>
          <rect x="3.5" y="5" width="17" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.5 10h17M8 3v4M16 3v4" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ),
    },
  ];

  return (
    <section className="mx-auto mt-8 w-full max-w-[1200px] px-4 pb-4 md:px-6 xl:px-10 md:mt-10">
      <div className="rounded-2xl bg-white p-6 shadow-[0_30px_70px_-40px_rgba(11,30,51,0.35)] ring-1 ring-[#0B1E33]/[0.06] sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-[#0B1E33]/[0.06] pb-4">
          <span className={`${inter.className} text-xs font-semibold uppercase tracking-[0.14em] text-[#0B1E33]/50`}>
            Your Property
          </span>
          <span className={`${inter.className} inline-flex items-center gap-1.5 rounded-full bg-[#1FAE9F]/10 px-3 py-1 text-[11px] font-semibold text-[#0E8F82]`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L4.5 5V10.5C4.5 15.2 7.6 19.5 12 21.5C16.4 19.5 19.5 15.2 19.5 10.5V5L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.5 12L11 14.5L15.8 9.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {estimated ? "Estimated" : "Public records"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {details.map((d) => (
            <div
              key={d.label}
              className="group flex flex-col gap-4 rounded-xl bg-[#F7F9FA] px-4 py-5 ring-1 ring-[#0B1E33]/[0.05] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_40px_-24px_rgba(11,30,51,0.35)] hover:ring-[#1FAE9F]/30 sm:px-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#1FAE9F] shadow-[0_0_0_1px_rgba(31,174,159,0.2)] transition-colors duration-300 group-hover:bg-[#1FAE9F] group-hover:text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  {d.icon}
                </svg>
              </span>
              <div>
                <div className={`${inter.className} text-xl font-bold tracking-tight text-[#0B1E33] sm:text-2xl`}>
                  {d.value}
                </div>
                <div className={`${inter.className} mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0B1E33]/45 sm:text-[11px]`}>
                  {d.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-[#0B1E33]/[0.06] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className={`${inter.className} inline-flex items-center gap-2 text-xs text-[#0B1E33]/50`}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1FAE9F" strokeWidth="2" className="shrink-0">
              <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 11v5M12 8v.01" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {estimated
              ? "Public records unavailable for this address — details estimated from the nearest comparable home."
              : "Details sourced from public records & MLS data."}
          </p>
        </div>
      </div>
    </section>
  );
}