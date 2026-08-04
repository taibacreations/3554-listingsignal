import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

interface SignalToSellProps {
  score: number; // 0-100
  badgeLabel?: string;
  message?: string;
}

function scoreTier(score: number) {
  if (score < 60) return { label: "Opportunity 0-59", color: "#F97316" };
  if (score < 80) return { label: "Steady 60-79", color: "#0B1E33" };
  return { label: "Strong 80-100", color: "#1FAE9F" };
}

export default function SignalToSell({
  score = 25,
  badgeLabel = "Opportunity Signal",
  message = "Buyer activity is building in your neighborhood. Homeowners who position early often see stronger offers than those who wait.",
}: Partial<SignalToSellProps>) {
  const tier = scoreTier(score);
  const fillPct = Math.min(Math.max(score, 0), 100);

  return (
    <div className="max-w-[1024px] mx-auto px-4 sm:px-6 mt-6">
      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-7">
        <div className="flex items-center justify-between mb-6">
          <span
            className={`${inter.className} text-[#F97316] text-xs font-bold tracking-wide uppercase`}
          >
            Signal to Sell™
          </span>
          <span
            className={`${inter.className} text-[#F97316] text-xs font-medium bg-[#F97316]/10 rounded-full px-3 py-1`}
          >
            {badgeLabel}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-6 items-center">
          {/* Score + bar */}
          <div>
            <p className={`${inter.className} text-[#0B1E33] text-4xl sm:text-5xl font-bold`}>
              {score}
              <span className="text-[#0B1E33]/40 text-xl font-medium">/100</span>
            </p>
            <div className="h-2 w-full rounded-full bg-[#E7EAEE] overflow-hidden mt-4">
              <div
                className="h-full rounded-full"
                style={{ width: `${fillPct}%`, backgroundColor: tier.color }}
              />
            </div>
            <div className="flex items-center justify-between mt-3 flex-wrap gap-y-1">
              <span className={`${inter.className} text-[#F97316] text-xs font-medium`}>
                Opportunity 0-59
              </span>
              <span className={`${inter.className} text-[#0B1E33]/50 text-xs font-medium`}>
                Steady 60-79
              </span>
              <span className={`${inter.className} text-[#1FAE9F] text-xs font-medium`}>
                Strong 80-100
              </span>
            </div>
          </div>

          {/* Explanation card */}
          <div className="bg-[#FDEEE3] rounded-xl p-4 sm:p-5 flex gap-4">
            <div className="w-9 h-9 rounded-full bg-[#F97316] flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M3 17l6-6 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 7h7v7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className={`${inter.className} text-[#0B1E33] text-sm font-semibold mb-1`}>
                What this means for you
              </p>
              <p className={`${inter.className} text-[#0B1E33]/60 text-sm leading-relaxed`}>
                {message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}