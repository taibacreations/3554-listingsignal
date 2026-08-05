// SignalToSell.tsx
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });

interface SignalToSellProps {
  score: number; // 0-100
  badgeLabel?: string;
  message?: string;
}

function scoreTier(score: number) {
  if (score < 60) return { label: "Opportunity", color: "#F97316", bg: "#FDEEE3", border: "#F9731633" };
  if (score < 80) return { label: "Steady", color: "#0B1E33", bg: "#EEF0F3", border: "#0B1E3320" };
  return { label: "Strong", color: "#1FAE9F", bg: "#EAF4F2", border: "#1FAE9F33" };
}

export default function SignalToSell({
  score = 25,
  badgeLabel = "Opportunity Signal",
  message = "Buyer activity is building in your neighborhood. Homeowners who position early often see stronger offers than those who wait.",
}: Partial<SignalToSellProps>) {
  const tier = scoreTier(score);
  const fillPct = Math.min(Math.max(score, 0), 100);

  return (
    <section className="max-w-[1100px] mx-auto px-4 sm:px-6 mt-8 md:mt-10">
      <div className="bg-white rounded-2xl border border-[#0B1E33]/[0.07] shadow-[0_30px_70px_-40px_rgba(11,30,51,0.35)] p-6 sm:p-9">
        {/* Header row */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: tier.color }} />
            <span
              className={`${inter.className} text-[11px] font-bold tracking-[0.2em] uppercase`}
              style={{ color: tier.color }}
            >
              Signal to Sell™
            </span>
          </div>
          <span
            className={`${inter.className} text-xs font-semibold rounded-full px-4 py-1.5`}
            style={{ color: tier.color, backgroundColor: `${tier.color}1A` }}
          >
            {badgeLabel}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[0.95fr_1.15fr] gap-8 md:gap-10 items-center">
          {/* Score + bar */}
          <div>
            <div className="flex items-end gap-2.5">
              <p className={`${playfair.className} text-[#0B1E33] text-[56px] sm:text-6xl font-bold leading-none`}>
                {score}
              </p>
              <span className={`${inter.className} text-[#0B1E33]/35 text-lg font-medium mb-1.5`}>/100</span>
            </div>

            <div className="h-2.5 w-full rounded-full bg-[#E7EAEE] overflow-visible mt-6 relative">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${fillPct}%`, backgroundColor: tier.color }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-[3px] shadow-md"
                style={{ left: `calc(${fillPct}% - 8px)`, borderColor: tier.color }}
              />
            </div>

            <div className="flex items-center justify-between mt-5 flex-wrap gap-y-1.5">
              <span className={`${inter.className} text-[#F97316] text-[11px] font-semibold`}>
                Opportunity 0–59
              </span>
              <span className={`${inter.className} text-[#0B1E33]/40 text-[11px] font-semibold`}>
                Steady 60–79
              </span>
              <span className={`${inter.className} text-[#1FAE9F] text-[11px] font-semibold`}>
                Strong 80–100
              </span>
            </div>
          </div>

          {/* Explanation card */}
          <div
            className="rounded-xl p-5 sm:p-6 flex gap-4 border"
            style={{ backgroundColor: tier.bg, borderColor: tier.border }}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: tier.color, boxShadow: `0 0 0 5px ${tier.color}1A` }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M3 17l6-6 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 7h7v7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className={`${inter.className} text-[#0B1E33] text-sm font-semibold mb-1.5`}>
                What this means for you
              </p>
              <p className={`${inter.className} text-[#0B1E33]/60 text-sm leading-relaxed`}>
                {message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}