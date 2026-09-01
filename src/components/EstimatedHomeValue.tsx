"use client";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

interface EstimatedHomeValueProps {
  value?: string;
  rangeLow?: string;
  rangeHigh?: string;
  rangeLowShort?: string;
  rangeHighShort?: string;
  /** Preformatted confidence string, e.g. "82.0% (Medium)" */
  confidenceLabel?: string;
  trendLabel?: string;
  trendChangePct?: number;
  /** 0–100 position of the fill on the range bar */
  fillPct?: number;
}

/* ===============================================================
   DECORATED ICON RING (thin outer ring + 4 dots, like mockup)
   =============================================================== */
function IconRing({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-[76px] w-[76px] shrink-0 sm:h-20 sm:w-20">
      {/* outer thin ring */}
      <div className="absolute inset-0 rounded-full border border-[#1FAE9F]/25" aria-hidden="true" />
      {/* 4 dots on the ring */}
      <span className="absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1FAE9F]/60" aria-hidden="true" />
      <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#1FAE9F]/60" aria-hidden="true" />
      <span className="absolute left-0 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1FAE9F]/60" aria-hidden="true" />
      <span className="absolute right-0 top-1/2 h-1 w-1 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#1FAE9F]/60" aria-hidden="true" />
      {/* inner circle */}
      <div className="absolute inset-[7px] flex items-center justify-center rounded-full border-2 border-[#1FAE9F] bg-white text-[#1FAE9F]">
        {children}
      </div>
    </div>
  );
}

export default function EstimatedHomeValue({
  value = "$509,000",
  rangeLow = "$476,000",
  rangeHigh = "$542,000",
  rangeLowShort = "$476K",
  rangeHighShort = "$542K",
  confidenceLabel = "97.5% (High)",
  trendLabel = "Today's market",
  trendChangePct = 2.4,
  fillPct = 62,
}: Partial<EstimatedHomeValueProps>) {
  return (
    <section className="relative z-10 mx-auto w-full max-w-[1200px] px-4 pb-4 md:px-6 xl:px-10 pb-8 pt-8 md:pt-10">
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_30px_70px_-40px_rgba(11,30,51,0.4)] ring-1 ring-[#0B1E33]/[0.05]">
        <div className="flex flex-col md:flex-row">
          {/* ======================================================
              LEFT — VALUE DETAILS
              ====================================================== */}
          <div className="flex-1 p-5 sm:p-7">
            {/* Header row */}
            <div className="mb-6 flex items-center justify-between gap-3 border-b border-[#0B1E33]/[0.06] pb-4">
              <span className={`${inter.className} text-xs font-semibold uppercase tracking-[0.14em] text-[#0B1E33]/50`}>
                Estimated Home Value
              </span>
              <span className={`${inter.className} rounded-full bg-[#1FAE9F]/10 px-3 py-1 text-xs font-medium text-[#178F82]`}>
                {trendLabel}
              </span>
            </div>

            {/* Icon + value */}
            <div className="flex items-center gap-4 sm:gap-5">
              <IconRing>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M3 11.5L12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 20v-6h4v6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </IconRing>

              <div className="min-w-0">
                <p className={`${inter.className} text-[34px] font-bold leading-none tracking-tight text-[#0B1E33] sm:text-[42px]`}>
                  {value}
                </p>
                <p className={`${inter.className} mt-2.5 text-sm text-[#0B1E33]/55`}>
                  Value range:{" "}
                  <span className="font-semibold text-[#0B1E33]">
                    {rangeLow} – {rangeHigh}
                  </span>
                </p>
              </div>
            </div>

            {/* Range bar */}
            <div className="mt-7">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E7EAEE]">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#1FAE9F,#2CC7B7)]"
                  style={{ width: `${fillPct}%` }}
                />
              </div>

              <div className="mt-3 grid grid-cols-3 items-center">
                <span className={`${inter.className} text-left text-xs font-medium text-[#0B1E33]/45`}>
                  {rangeLowShort}
                </span>

                <span
                  className={`${inter.className} mx-auto inline-flex items-center gap-1.5 rounded-full bg-[#1FAE9F]/10 px-3 py-1 text-xs font-semibold text-[#178F82]`}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {confidenceLabel} Confidence
                </span>

                <span className={`${inter.className} text-right text-xs font-medium text-[#0B1E33]/45`}>
                  {rangeHighShort}
                </span>
              </div>
            </div>
          </div>

          {/* ======================================================
              RIGHT — MARKET TREND PANEL
              ====================================================== */}
          <div className="flex shrink-0 flex-col justify-between bg-[#0B1E33] p-5 sm:p-6 md:w-[270px]">
            <svg viewBox="0 0 220 100" className="mt-2 h-24 w-full" fill="none" preserveAspectRatio="none" aria-hidden="true">
              {/* faint gridlines */}
              <path d="M0 30H220" stroke="white" strokeOpacity="0.06" />
              <path d="M0 60H220" stroke="white" strokeOpacity="0.06" />
              <path d="M0 90H220" stroke="white" strokeOpacity="0.06" />
              {/* trend line */}
              <path
                d="M0 78 C25 70 35 42 55 46 C75 50 85 64 105 60 C130 55 140 32 165 28 C185 25 202 14 220 10"
                stroke="#2CC7B7"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="55" cy="46" r="4" fill="#2CC7B7" stroke="#0B1E33" strokeWidth="1.5" />
              <circle cx="165" cy="28" r="4" fill="#2CC7B7" stroke="#0B1E33" strokeWidth="1.5" />
            </svg>

            <div className="mt-5">
              <p className={`${inter.className} text-sm font-semibold text-white`}>Market trend</p>
              <p className={`${inter.className} mt-1 text-xs text-white/60`}>
                Up {trendChangePct}% in the last 30 days
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}