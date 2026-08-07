"use client";

import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const stats = [
  {
    label: "EST. VALUE",
    value: "$509,000",
    icon: (
      <>
        <path d="M3 11.5L12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    label: "SIGNAL SCORE",
    value: "25/100",
    icon: (
      <>
        <rect x="4" y="14" width="3" height="6" rx="0.5" />
        <rect x="10.5" y="10" width="3" height="10" rx="0.5" />
        <rect x="17" y="6" width="3" height="14" rx="0.5" />
      </>
    ),
  },
  {
    label: "CONFIDENCE",
    value: "97.5%",
    icon: (
      <path
        d="M12 2L4.5 5V10.5C4.5 15.2 7.6 19.5 12 21.5C16.4 19.5 19.5 15.2 19.5 10.5V5L12 2Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

interface ResultsHeroProps {
  location?: string;
  salesCount?: number;
  locked?: boolean;
  reportMode?: boolean;
}

export default function ResultsHero({
  location = "casc, Las Vegas, NV",
  salesCount = 4,
  locked = true,
  reportMode = false,
}: ResultsHeroProps) {
  return (
    <section className="relative z-10 pt-[15vh]">
      <div className="mx-auto flex w-full max-w-[1440px] px-4 md:px-6 xl:px-10 flex-col items-center text-center">

        {/* ========================================================
            BADGE — dono screens pe
            ======================================================== */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#1FAE9F]/10 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#1FAE9F]" aria-hidden="true" />
          <span
            className={`${inter.className} text-[11px] font-semibold uppercase tracking-[0.14em] text-[#178F82]`}
          >
            Your Home Value Is Ready
          </span>
        </div>

        {/* ========================================================
            HEADLINE
            capture: "We found 4 recent sales near your home"
            report:  "Here's what your home could sell for today."
            ======================================================== */}
        <h1
          className={`${playfair.className} px-2 text-[30px] font-semibold leading-[1.15] text-[#0B1E33] sm:text-[38px] md:text-[44px]`}
        >
          {reportMode ? (
            <>
              Here&apos;s what your home{" "}
              <br className="hidden sm:block" />
              <span className="text-[#1FAE9F]">could sell for today.</span>
            </>
          ) : (
            <>
              We found {salesCount} recent sales
              <br className="hidden sm:block" /> near{" "}
              <span className="text-[#1FAE9F]">your home</span>.
            </>
          )}
        </h1>

        {/* ========================================================
            SUBTEXT
            capture: "Enter your details..."
            report:  "Based on recent sales and live market data..."
            ======================================================== */}
        <p className={`${inter.className} mt-3 max-w-md px-2 text-sm text-[#0B1E33]/60`}>
          {reportMode
            ? "Based on recent sales and live market data in your area."
            : "Enter your details to see what your home could sell for right now."}
        </p>

        {/* ========================================================
            STAT CARDS
            capture: blurred (locked=true, reportMode=false)
            report:  fully visible (reportMode=true → no blur)
            ======================================================== */}
        <div className="mt-8 grid w-full max-w-[700px] grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-3.5 rounded-2xl bg-white px-5 py-4 shadow-[0_15px_35px_-18px_rgba(11,30,51,0.25)] ring-1 ring-[#0B1E33]/[0.04]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#1FAE9F]/35 bg-[#1FAE9F]/[0.04] text-[#1FAE9F]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  {s.icon}
                </svg>
              </div>

              <div className="min-w-0 text-left">
                {/* reportMode=true  → blur nahi, saaf visible
                    reportMode=false → locked ho to blur lagega */}
                <div
                  className={`${inter.className} truncate text-[15px] font-bold text-[#0B1E33]/80 ${
                    locked && !reportMode ? "select-none blur-[6px]" : ""
                  }`}
                  aria-hidden={locked && !reportMode}
                >
                  {s.value}
                </div>
                <div
                  className={`${inter.className} mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0B1E33]/45`}
                >
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================
            LOCATION PILL — dono screens pe
            ======================================================== */}
        <div
          className={`mb-2 inline-flex max-w-full items-center gap-2 rounded-full bg-[#0B1E33] px-5 py-2.5 shadow-[0_14px_30px_-14px_rgba(11,30,51,0.55)] ${
            reportMode ? "mt-4" : "mt-7"
          }`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.8"
            className="shrink-0"
            aria-hidden="true"
          >
            <path
              d="M12 21s-7-5.8-7-11a7 7 0 1114 0c0 5.2-7 11-7 11z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          <span className={`${inter.className} truncate text-sm font-medium text-white`}>
            {location}
          </span>
        </div>

      </div>
    </section>
  );
}