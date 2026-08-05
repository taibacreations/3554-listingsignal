"use client";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

interface SignalToSellProps {
  score?: number; // 0-100
  badgeLabel?: string;
  message?: string;
}

function scoreTier(score: number) {
  if (score < 60)
    return { label: "Opportunity", color: "#F27A0F", bg: "#FDF0E3", border: "#F27A0F2E" };
  if (score < 80)
    return { label: "Steady", color: "#5B6B7C", bg: "#EEF1F4", border: "#0B1E3320" };
  return { label: "Strong", color: "#1FAE9F", bg: "#EAF6F4", border: "#1FAE9F33" };
}

export default function SignalToSell({
  score = 25,
  badgeLabel = "Opportunity Signal",
  message = "Buyer activity is building in your neighborhood. Homeowners who position early often see stronger offers than those who wait.",
}: Partial<SignalToSellProps>) {
  const tier = scoreTier(score);
  const fillPct = Math.min(Math.max(score, 0), 100);

  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 pb-4 md:px-6 xl:px-10">
      <div className="rounded-2xl bg-white p-6 shadow-[0_30px_70px_-40px_rgba(11,30,51,0.35)] ring-1 ring-[#0B1E33]/[0.06] sm:p-8">
        {/* ========================================================
            HEADER ROW
            ======================================================== */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-[#0B1E33]/[0.06] pb-4">
          <span
            className={`${inter.className} text-[11px] font-bold uppercase tracking-[0.18em]`}
            style={{ color: tier.color }}
          >
            Signal to Sell™
          </span>
          <span
            className={`${inter.className} rounded-full px-3.5 py-1 text-xs font-semibold`}
            style={{ color: tier.color, backgroundColor: `${tier.color}1A` }}
          >
            {badgeLabel}
          </span>
        </div>

        <div className="grid grid-cols-1 items-center gap-9 md:grid-cols-[0.95fr_1.15fr] md:gap-10">
          {/* ======================================================
              SCORE + BAR
              ====================================================== */}
          <div>
            <div className="flex items-end gap-2">
              <p className={`${inter.className} text-[52px] font-bold leading-none tracking-tight text-[#0B1E33] sm:text-[60px]`}>
                {score}
              </p>
              <span className={`${inter.className} mb-1 text-lg font-medium text-[#0B1E33]/35`}>/100</span>
            </div>

            <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-[#E7EAEE]">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${fillPct}%`, backgroundColor: tier.color }}
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-2">
              <span className={`${inter.className} text-[11px] font-semibold text-[#F27A0F]`}>
                Opportunity 0–59
              </span>
              <span className={`${inter.className} text-[11px] font-semibold text-[#0B1E33]/40`}>
                Steady 60–79
              </span>
              <span className={`${inter.className} text-[11px] font-semibold text-[#1FAE9F]`}>
                Strong 80–100
              </span>
            </div>
          </div>

          {/* ======================================================
              EXPLANATION CARD
              ====================================================== */}
          <div
            className="flex gap-4 rounded-xl border p-5 sm:p-6"
            style={{ backgroundColor: tier.bg, borderColor: tier.border }}
          >
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
              style={{
                backgroundColor: tier.color,
                boxShadow: `0 0 0 5px ${tier.color}1F, 0 10px 20px -8px ${tier.color}B3`,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" aria-hidden="true">
                <path d="M3 17l6-6 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 7h7v7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div>
              <p className={`${inter.className} mb-1.5 text-sm font-bold text-[#0B1E33]`}>
                What this means for you
              </p>
              <p className={`${inter.className} text-[13.5px] leading-relaxed text-[#0B1E33]/60`}>
                {message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}