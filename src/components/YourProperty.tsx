"use client";

import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

interface PropertyDetail {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

interface YourPropertyProps {
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  yearBuilt?: number;
  imageSrc?: string;
}

export default function YourProperty({
  bedrooms = 4,
  bathrooms = 3,
  sqft = 2110,
  yearBuilt = 2014,
  imageSrc = "/bgg.png",
}: Partial<YourPropertyProps>) {
  const details: PropertyDetail[] = [
    {
      label: "Bedrooms",
      value: bedrooms,
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
      value: bathrooms,
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
      value: `${sqft.toLocaleString()} sq ft`,
      icon: (
        <>
          <rect x="3.5" y="3.5" width="17" height="17" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.5 9.5h17M9.5 20.5v-11" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ),
    },
    {
      label: "Year Built",
      value: yearBuilt,
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
        {/* ========================================================
            HEADER
            ======================================================== */}
        <div className="mb-6 border-b border-[#0B1E33]/[0.06] pb-4">
          <span className={`${inter.className} text-xs font-semibold uppercase tracking-[0.14em] text-[#0B1E33]/50`}>
            Your Property
          </span>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1.05fr_1fr] md:gap-10">
          {/* ======================================================
              DETAILS LIST
              ====================================================== */}
          <ul className="divide-y divide-[#0B1E33]/[0.06]">
            {details.map((d) => (
              <li key={d.label} className="flex items-center justify-between gap-4 py-[15px] first:pt-1 last:pb-1">
                <span className={`${inter.className} inline-flex min-w-0 items-center gap-3 text-sm text-[#0B1E33]/60`}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1FAE9F" strokeWidth="1.8" className="shrink-0" aria-hidden="true">
                    {d.icon}
                  </svg>
                  {d.label}
                </span>
                <span className={`${inter.className} shrink-0 whitespace-nowrap text-sm font-bold text-[#0B1E33]`}>
                  {d.value}
                </span>
              </li>
            ))}
          </ul>

          {/* ======================================================
              PROPERTY IMAGE
              ====================================================== */}
          <div className="relative h-[220px] w-full overflow-hidden rounded-xl ring-1 ring-[#0B1E33]/[0.06] sm:h-[250px] md:h-full md:min-h-[250px]">
            <Image src={imageSrc} alt="Exterior view of the property" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}