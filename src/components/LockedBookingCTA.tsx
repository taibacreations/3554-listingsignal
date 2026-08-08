"use client";

import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });

interface LockedBookingCTAProps {
  onUnlock?: () => void;
}

export default function LockedBookingCTA({ onUnlock }: LockedBookingCTAProps) {
  return (
    <section className="mx-auto mt-8 w-full max-w-[1200px] px-4 pb-10 md:px-6 md:mt-10 xl:px-10">

      {/* ══════════════════════════════════════════════
          MOBILE  — stacked (client's exact design)
          DESKTOP — side by side in one unified card
          ══════════════════════════════════════════════ */}

      {/* ── MOBILE: two separate cards stacked ── */}
      <div className="md:hidden">

        {/* Locked teaser */}
        <div className="mb-4 overflow-hidden rounded-2xl bg-[#F4F3EF] px-6 py-10 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-white shadow-[0_4px_20px_-6px_rgba(11,30,51,0.18)]">
            <span className="text-4xl">🔒</span>
          </div>
          <h2 className={`${playfair.className} mx-auto max-w-sm text-[22px] font-bold leading-snug text-[#0B1E33]`}>
            6 more sales + full neighborhood breakdown
          </h2>
          <p className={`${inter.className} mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[#0B1E33]/55`}>
            One nearby sale gives you a hint. Your full report shows the
            complete picture — every comparable sale and what buyers are
            actually paying.
          </p>
          <p className={`${inter.className} mt-4 text-[15px] font-semibold text-[#D97706]`}>
            The data exists. A free home visit unlocks it.
          </p>
        </div>

        {/* Booking CTA */}
        <div className="overflow-hidden rounded-2xl bg-[#F6F3EE] px-6 py-7 shadow-sm">
          <h3 className={`${playfair.className} mb-2 text-center text-xl font-bold text-[#0B1E33]`}>
            What would your home actually sell for?
          </h3>
          <p className={`${inter.className} mx-auto mb-4 max-w-md text-center text-sm leading-relaxed text-[#0B1E33]/55`}>
            One nearby sale gives you a hint. Your full report shows the
            complete picture — every comparable sale, what buyers are actually
            paying, and where your home stands against all of them.
          </p>
          <p className={`${inter.className} mb-6 text-center text-sm font-semibold text-[#D97706]`}>
            The data exists. A free home visit unlocks it.
          </p>
          <button
            type="button"
            onClick={onUnlock}
            className={`${inter.className} mx-auto flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#1FAE9F] px-6 py-4 text-[15px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(31,174,159,0.55)] transition-all duration-300 hover:bg-[#189184] hover:-translate-y-0.5`}
          >
            <span className="text-xl">📅</span>
            Unlock with a Free Home Visit
          </button>
          <p className={`${inter.className} mt-3 text-center text-xs text-[#0B1E33]/40`}>
            No commitment · 20 minutes · We come to you
          </p>
          <p className={`${inter.className} mt-2 text-center text-sm font-semibold text-[#D97706]`}>
            Most homeowners are surprised by what we find.
          </p>
        </div>
      </div>

      {/* ── DESKTOP/TABLET: unified side-by-side layout ── */}
      <div className="hidden md:block">
        <div className="overflow-hidden rounded-3xl bg-[#F4F3EF] shadow-[0_20px_60px_-20px_rgba(11,30,51,0.18)]">

          {/* Top section — lock icon + headline full width */}
          <div className="border-b border-[#0B1E33]/[0.06] px-10 py-10 text-center lg:px-16 lg:py-12">
            <div className="mx-auto mb-5 flex h-[68px] w-[68px] items-center justify-center rounded-2xl bg-white shadow-[0_4px_20px_-6px_rgba(11,30,51,0.15)]">
              <span className="text-4xl">🔒</span>
            </div>
            <h2 className={`${playfair.className} text-[26px] font-bold text-[#0B1E33] lg:text-[30px]`}>
              6 more sales + full neighborhood breakdown
            </h2>
            <p className={`${inter.className} mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-[#0B1E33]/55`}>
              One nearby sale gives you a hint. Your full report shows the
              complete picture — every comparable sale and what buyers are
              actually paying.
            </p>
            <p className={`${inter.className} mt-3 text-[15px] font-semibold text-[#D97706]`}>
              The data exists. A free home visit unlocks it.
            </p>
          </div>

          {/* Bottom section — two columns */}
          <div className="grid grid-cols-2 divide-x divide-[#0B1E33]/[0.06]">

            {/* Left col — what you get */}
            <div className="px-8 py-8 lg:px-12 lg:py-10">
              <p className={`${inter.className} mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#0B1E33]/40`}>
                What's inside
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "6 additional comparable sales",
                  "Full neighborhood price trends",
                  "List-to-sale ratio for your area",
                  "Average days on market (local)",
                  "Pricing strategy recommendation",
                  "Best time to list analysis",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1FAE9F]/15">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1FAE9F" strokeWidth="3">
                        <path d="M5 12l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className={`${inter.className} text-sm text-[#0B1E33]/70`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right col — CTA */}
            <div className="flex flex-col items-center justify-center px-8 py-8 text-center lg:px-12 lg:py-10">
              <h3 className={`${playfair.className} mb-3 text-xl font-bold text-[#0B1E33] lg:text-2xl`}>
                What would your home actually sell for?
              </h3>
              <p className={`${inter.className} mb-4 max-w-xs text-sm leading-relaxed text-[#0B1E33]/55`}>
                Every comparable sale, what buyers are actually paying, and
                where your home stands against all of them.
              </p>
              <p className={`${inter.className} mb-6 text-sm font-semibold text-[#D97706]`}>
                The data exists. A free home visit unlocks it.
              </p>

              <button
                type="button"
                onClick={onUnlock}
                className={`${inter.className} inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#1FAE9F] px-6 py-4 text-[15px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(31,174,159,0.55)] transition-all duration-300 hover:bg-[#189184] hover:shadow-[0_14px_32px_-10px_rgba(31,174,159,0.7)] hover:-translate-y-0.5`}
              >
                <span className="text-xl">📅</span>
                Unlock with a Free Home Visit
              </button>

              <p className={`${inter.className} mt-3 text-xs text-[#0B1E33]/40`}>
                No commitment · 20 minutes · We come to you
              </p>
              <p className={`${inter.className} mt-2 text-sm font-semibold text-[#D97706]`}>
                Most homeowners are surprised by what we find.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer disclaimer — both screens */}
      <p className={`${inter.className} mt-6 text-center text-xs text-[#0B1E33]/35`}>
        Not a formal appraisal. Automated estimate based on comparable sales &
        public data.
      </p>
    </section>
  );
}