"use client";

import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });

interface LockedBookingCTAProps {
  onUnlock?: () => void;
}

export default function LockedBookingCTA({ onUnlock }: LockedBookingCTAProps) {
  return (
    <section className="mx-auto mt-8 w-full max-w-[1200px] px-4 pb-[30vh] md:px-6 xl:px-10 md:mt-10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl bg-[#EAF6F4] px-6 py-7 sm:px-8 sm:py-8 ring-1 ring-[#1FAE9F]/20">

        {/* LEFT — Icon + Text */}
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start text-center md:text-start gap-5">

          {/* Calendar icon ring — same style as image */}
          <div className="relative h-[72px] w-[72px] shrink-0">
            {/* Outer thin ring with 4 dots */}
            <div className="absolute inset-0 rounded-full border border-[#1FAE9F]/30" />
            <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1FAE9F]/50" />
            <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#1FAE9F]/50" />
            <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1FAE9F]/50" />
            <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#1FAE9F]/50" />
            {/* Inner circle */}
            <div className="absolute inset-[8px] flex items-center justify-center rounded-full border-2 border-[#1FAE9F] bg-white text-[#1FAE9F]">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <rect x="3.5" y="4" width="17" height="17" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3.5 9h17M8 2v4M16 2v4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Text */}
          <div className="max-w-lg">
            <h3
              className={`${playfair.className} text-xl font-semibold leading-snug text-[#0B1E33] sm:text-2xl`}
            >
              What would your home{" "}
              <span className="text-[#1FAE9F]">actually sell</span> for?
            </h3>
            <p className={`${inter.className} mt-2 text-sm leading-relaxed text-[#0B1E33]/60`}>
              The numbers above reflect your neighborhood. A free home visit
              tells you what buyers would actually pay for your{" "}
              <strong className="font-semibold text-[#0B1E33]/80">
                specific
              </strong>{" "}
              home — condition, updates, and presentation included.
            </p>
            <p
              className={`${inter.className} mt-2 text-sm font-semibold text-[#1FAE9F]`}
            >
              Most homeowners are surprised by what we find.
            </p>
          </div>
        </div>

        {/* RIGHT — Button + trust pills */}
        <div className="flex shrink-0 flex-col items-center gap-3 sm:items-end">
          <button
            type="button"
            onClick={onUnlock}
            className={`${inter.className} group inline-flex items-center justify-center gap-2 rounded-full bg-[#1FAE9F] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(31,174,159,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#189184] hover:shadow-[0_14px_32px_-10px_rgba(31,174,159,0.75)] whitespace-nowrap`}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <rect x="3.5" y="4" width="17" height="17" rx="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3.5 9h17M8 2v4M16 2v4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Unlock with a Free Home Visit
          </button>

          {/* Trust pills */}
          <div className="flex items-center gap-4">
            {["No commitment", "20 minutes", "We come to you"].map((item) => (
              <div
                key={item}
                className={`${inter.className} flex items-center gap-1 text-xs text-[#0B1E33]/55`}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1FAE9F"
                  strokeWidth="3"
                  aria-hidden="true"
                >
                  <path d="M5 12l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}