"use client";

import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });

interface LockedBookingCTAProps {
  onUnlock?: () => void;
}

export default function LockedBookingCTA({ onUnlock }: LockedBookingCTAProps) {
  return (
    <section className="mx-auto mt-6 w-full max-w-[1200px] px-4 pb-10 md:px-6 md:mt-8 xl:px-10">

      {/* ── MOBILE: centered card (same as before) ── */}
      <div className="md:hidden overflow-hidden rounded-2xl bg-[#F0EDE8] px-6 py-10 text-center">

        <div className="mx-auto mb-6 flex h-[68px] w-[68px] items-center justify-center rounded-2xl bg-white shadow-[0_4px_20px_-6px_rgba(11,30,51,0.15)]">
          <span className="text-[36px] leading-none">🔒</span>
        </div>

        <h2 className={`${playfair.className} mx-auto max-w-sm text-[22px] font-bold leading-snug text-[#0B1E33]`}>
          What would your home actually sell for?
        </h2>

        <p className={`${inter.className} mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[#0B1E33]/55`}>
          The numbers above reflect your neighborhood. A free home visit tells
          you what buyers would actually pay for your{" "}
          <em className="font-medium not-italic text-[#0B1E33]/70">specific home</em>{" "}
          — condition, updates, and presentation included.
        </p>

        <p className={`${inter.className} mt-4 md:text-[15px] text-[12px] font-semibold text-[#D97706]`}>
          Most homeowners are surprised by what we find.
        </p>

        <div className="relative mx-auto mt-7 w-full max-w-md">
          <div className="absolute inset-0 animate-pulse rounded-xl bg-[#1FAE9F]/30 blur-md" />
          <button
            type="button"
            onClick={onUnlock}
            className={`${inter.className} relative z-10 flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#1FAE9F] px-6 py-4 text-[15px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(31,174,159,0.6)] transition-all duration-300 hover:bg-[#189184] hover:-translate-y-0.5 active:translate-y-0`}
          >
            <span className="text-xl leading-none">📅</span>
            Unlock with a Free Home Visit
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-4">
          {["No commitment", "20 minutes", "We come to you"].map((item) => (
            <span key={item} className={`${inter.className} flex items-center gap-1 text-xs text-[#0B1E33]/45`}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1FAE9F" strokeWidth="3">
                <path d="M5 12l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── DESKTOP/TABLET: two-column layout ── */}
      <div className="hidden md:block overflow-hidden rounded-3xl bg-[#F0EDE8] shadow-[0_20px_60px_-20px_rgba(11,30,51,0.15)]">
        <div className="grid grid-cols-[1fr_1.1fr]">

          {/* Left col — context + what's inside */}
          <div className="flex flex-col justify-center border-r border-[#0B1E33]/[0.07] px-10 py-12 lg:px-14 lg:py-16">

            {/* Lock icon */}
            <div className="mb-6 flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-white shadow-[0_4px_16px_-4px_rgba(11,30,51,0.12)]">
              <span className="text-[30px] leading-none">🔒</span>
            </div>

            {/* Headline */}
            <h2
              className={`${playfair.className} mb-4 text-[24px] font-bold leading-snug text-[#0B1E33] lg:text-[28px]`}
            >
              What would your home actually sell for?
            </h2>

            {/* Body */}
            <p className={`${inter.className} mb-4 text-[15px] leading-relaxed text-[#0B1E33]/55`}>
              The numbers above reflect your neighborhood. A free home visit
              tells you what buyers would actually pay for your{" "}
              <em className="font-medium not-italic text-[#0B1E33]/70">
                specific home
              </em>{" "}
              — condition, updates, and presentation included.
            </p>

            <p className={`${inter.className} mb-8 text-[14px] font-semibold text-[#D97706]`}>
              Most homeowners are surprised by what we find.
            </p>

            {/* What's included list */}
            <div>
              <p className={`${inter.className} mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0B1E33]/35`}>
                What's included
              </p>
              <ul className="flex flex-col gap-2.5">
                {[
                  "6 additional comparable sales",
                  "Full neighborhood price trends",
                  "List-to-sale ratio for your area",
                  "Average days on market (local)",
                  "Pricing strategy recommendation",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1FAE9F]/15">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1FAE9F" strokeWidth="3">
                        <path d="M5 12l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className={`${inter.className} text-[13px] text-[#0B1E33]/60`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right col — CTA */}
          <div className="flex flex-col items-center justify-center px-10 py-12 lg:px-14 lg:py-16">

            {/* Social proof chip */}
            <div className={`${inter.className} mb-8 inline-flex items-center gap-2 rounded-full border border-[#0B1E33]/10 bg-white px-4 py-2 text-xs font-medium text-[#0B1E33]/50 shadow-sm`}>
              <span className="flex h-2 w-2 rounded-full bg-[#1FAE9F]" />
              2,847 homeowners checked this month
            </div>

            {/* Big stat */}
            <div className="mb-8 text-center">
              <p className={`${inter.className} text-[13px] font-semibold uppercase tracking-[0.14em] text-[#0B1E33]/35 mb-2`}>
                Average time to close
              </p>
              <p className={`${playfair.className} text-[52px] font-bold leading-none text-[#0B1E33]`}>
                21
                <span className={`${inter.className} text-[22px] font-semibold text-[#0B1E33]/50`}>
                  {" "}days
                </span>
              </p>
              <p className={`${inter.className} mt-1.5 text-sm text-[#0B1E33]/45`}>
                for homeowners who acted within 30 days
              </p>
            </div>

            {/* Divider */}
            <div className="mb-8 h-px w-full bg-[#0B1E33]/[0.07]" />

            {/* CTA Button with pulse glow */}
            <div className="relative w-full">
              <div className="absolute inset-0 animate-pulse rounded-xl bg-[#1FAE9F]/25 blur-lg" />
              <button
                type="button"
                onClick={onUnlock}
                className={`${inter.className} relative z-10 flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#1FAE9F] px-6 py-4 text-[15px] font-semibold text-white shadow-[0_8px_28px_-8px_rgba(31,174,159,0.65)] transition-all duration-300 hover:bg-[#189184] hover:shadow-[0_16px_40px_-8px_rgba(31,174,159,0.85)] hover:-translate-y-0.5 active:translate-y-0`}
              >
                <span className="text-xl leading-none">📅</span>
                Unlock with a Free Home Visit
              </button>
            </div>

            {/* Trust pills */}
            <div className="mt-4 flex items-center justify-center gap-5">
              {["No commitment", "20 minutes", "We come to you"].map((item) => (
                <span key={item} className={`${inter.className} flex items-center gap-1.5 text-xs text-[#0B1E33]/45`}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1FAE9F" strokeWidth="3">
                    <path d="M5 12l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>

            {/* Privacy note */}
            <p className={`${inter.className} mt-5 flex items-center gap-1.5 text-[11px] text-[#0B1E33]/30`}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L4.5 5V10.5C4.5 15.2 7.6 19.5 12 21.5C16.4 19.5 19.5 15.2 19.5 10.5V5L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Your information is private and never shared
            </p>
          </div>
        </div>
      </div>

      {/* Footer disclaimer — both screens */}
      <p className={`${inter.className} mt-5 text-center text-xs text-[#0B1E33]/35`}>
        Not a formal appraisal. Automated estimate based on comparable sales & public data.
        <br />
        <span className="mt-0.5 inline-block">© 2025 Listing Signal™</span>
      </p>
    </section>
  );
}