"use client";

import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

interface CtaBannerProps {
  onUnlock?: () => void;
}

const perks = ["No commitment", "20 minutes", "We come to you"];

function CalendarIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 14h3M8 17h5" strokeLinecap="round" />
    </svg>
  );
}

export default function CtaBanner({ onUnlock }: CtaBannerProps) {
  return (
    <section className="mx-auto mt-8 w-full max-w-[1200px] px-4 pb-4 md:px-6 xl:px-10 md:mt-10">
      {/* ========================================================
          LIGHT CTA CARD
          ======================================================== */}
      <div className="rounded-2xl bg-[#E9F1F0] px-6 py-8 ring-1 ring-[#0B1E33]/[0.05] sm:px-9 sm:py-10">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-10">
          {/* Decorated calendar icon */}
          <div className="relative h-[88px] w-[88px] shrink-0">
            <div className="absolute inset-0 rounded-full border border-[#1FAE9F]/25" aria-hidden="true" />
            <span className="absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1FAE9F]/60" aria-hidden="true" />
            <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#1FAE9F]/60" aria-hidden="true" />
            <span className="absolute left-0 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1FAE9F]/60" aria-hidden="true" />
            <span className="absolute right-0 top-1/2 h-1 w-1 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#1FAE9F]/60" aria-hidden="true" />
            <div className="absolute inset-[8px] flex items-center justify-center rounded-full bg-white text-[#1FAE9F] shadow-[0_12px_28px_-12px_rgba(11,30,51,0.25)]">
              <CalendarIcon size={30} />
            </div>
          </div>

          {/* Headline + copy */}
          <div className="min-w-0 flex-1 text-center lg:text-left">
            <h3 className={`${playfair.className} text-[24px] font-semibold leading-tight text-[#0B1E33] sm:text-[28px]`}>
              What would your home
              <br className="hidden sm:block" /> <span className="text-[#1FAE9F]">actually sell</span> for?
            </h3>
            <p className={`${inter.className} mt-3 max-w-md text-[13px] leading-relaxed text-[#0B1E33]/55 lg:max-w-none`}>
              The numbers above reflect your neighborhood. A free home visit tells you what buyers would
              actually pay for your <em className="not-italic font-semibold text-[#0B1E33]/70">specific</em> home —
              condition, updates, and presentation included.
            </p>
          </div>

          {/* Button + perks + tagline */}
          <div className="flex shrink-0 flex-col items-center gap-4">
            <button
              type="button"
              onClick={onUnlock}
              className={`${inter.className} inline-flex items-center gap-2.5 whitespace-nowrap rounded-xl bg-[linear-gradient(100deg,#1FAE9F,#14988B)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_38px_-14px_rgba(31,174,159,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_46px_-14px_rgba(31,174,159,0.8)]`}
            >
              <CalendarIcon size={16} />
              Unlock with a Free Home Visit
            </button>

            <div className={`${inter.className} flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] font-medium text-[#0B1E33]/55`}>
              {perks.map((p) => (
                <span key={p} className="inline-flex items-center gap-1.5">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1FAE9F" strokeWidth="3" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {p}
                </span>
              ))}
            </div>

            <p className={`${inter.className} text-xs font-bold text-[#178F82]`}>
              Most homeowners are surprised by what we find.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================
          DISCLAIMER
          ======================================================== */}
      <p className={`${inter.className} mt-6 flex w-full items-center justify-center gap-1.5 text-center text-xs text-[#0B1E33]/40`}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 2L4.5 5V10.5C4.5 15.2 7.6 19.5 12 21.5C16.4 19.5 19.5 15.2 19.5 10.5V5L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Not a formal appraisal. Automated estimate based on comparable sales &amp; public data.
      </p>
    </section>
  );
}