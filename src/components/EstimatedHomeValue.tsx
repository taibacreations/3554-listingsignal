import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

interface EstimatedHomeValueProps {
  value: string;
  rangeLow: string;
  rangeHigh: string;
  confidence: number; // 0-100
  trendLabel?: string;
  trendChangePct?: number;
}

export default function EstimatedHomeValue({
  value = "$509,000",
  rangeLow = "$476K",
  rangeHigh = "$542K",
  confidence = 97.5,
  trendLabel = "Today's market",
  trendChangePct = 2.4,
}: Partial<EstimatedHomeValueProps>) {
  // percentage position of the value marker along the range bar
  const fillPct = 65;

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-6 xl:px-10 -mt-10 sm:-mt-52 relative z-20">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row">
        {/* Left: value details */}
        <div className="flex-1 p-5 sm:p-7">
          <div className="flex items-center justify-between mb-5">
            <span
              className={`${inter.className} text-[#0B1E33]/50 text-xs font-semibold tracking-wide uppercase`}
            >
              Estimated Home Value
            </span>
            <span
              className={`${inter.className} text-[#1FAE9F] text-xs font-medium bg-[#1FAE9F]/10 rounded-full px-3 py-1`}
            >
              {trendLabel}
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#1FAE9F] flex items-center justify-center shrink-0">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1FAE9F" strokeWidth="2">
                <path d="M3 11.5L12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className={`${inter.className} text-[#0B1E33] text-3xl sm:text-4xl font-bold leading-none`}>
                {value}
              </p>
              <p className={`${inter.className} text-[#0B1E33]/50 text-sm mt-2`}>
                Value range: {rangeLow} – {rangeHigh}
              </p>
            </div>
          </div>

          {/* Range bar */}
          <div className="mt-6">
            <div className="h-2 w-full rounded-full bg-[#E7EAEE] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#1FAE9F]"
                style={{ width: `${fillPct}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className={`${inter.className} text-[#0B1E33]/50 text-xs`}>{rangeLow}</span>
              <span
                className={`${inter.className} text-[#1FAE9F] text-xs font-medium bg-[#1FAE9F]/10 rounded-full px-3 py-1 inline-flex items-center gap-1`}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {confidence}% Confidence
              </span>
              <span className={`${inter.className} text-[#0B1E33]/50 text-xs`}>{rangeHigh}</span>
            </div>
          </div>
        </div>

        {/* Right: market trend panel */}
        <div className="bg-[#0B1E33] p-5 sm:p-7 flex flex-col justify-between md:w-[260px] shrink-0">
          <svg viewBox="0 0 220 90" className="w-full h-20" fill="none">
            <path
              d="M0 65 Q 30 30 55 50 T 110 40 T 165 15 T 220 20"
              stroke="#1FAE9F"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="0" cy="65" r="4" fill="#1FAE9F" />
            <circle cx="220" cy="20" r="4" fill="#1FAE9F" />
          </svg>
          <div className="mt-4">
            <p className={`${inter.className} text-white text-sm font-semibold`}>Market trend</p>
            <p className={`${inter.className} text-white/60 text-xs mt-1`}>
              Up {trendChangePct}% in the last 30 days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}