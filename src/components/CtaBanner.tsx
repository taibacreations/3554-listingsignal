import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

interface CtaBannerProps {
  onUnlock?: () => void;
}

const perks = ["No commitment", "20 minutes", "We come to you"];

export default function CtaBanner({ onUnlock }: CtaBannerProps) {
  return (
    <div className="max-w-[1024px] mx-auto px-4 sm:px-6 mt-6">
      <div className="bg-[#EAF4F2] rounded-2xl p-5 sm:p-8 flex flex-col md:flex-row items-center gap-6">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shrink-0">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1FAE9F" strokeWidth="2">
            <rect x="3" y="5" width="18" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Copy */}
        <div className="flex-1 text-center md:text-left">
          <h3 className={`${playfair.className} text-[#0B1E33] text-xl sm:text-2xl font-semibold`}>
            What would your home <span className="text-[#1FAE9F]">actually sell</span> for?
          </h3>
          <p className={`${inter.className} text-[#0B1E33]/60 text-sm mt-2 max-w-lg`}>
            The numbers above reflect your neighborhood. A free home visit tells you what buyers
            would actually pay for your specific home — condition, updates, and presentation
            included.
          </p>
        </div>

        {/* Action */}
        <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onUnlock}
            className={`${inter.className} bg-[#1FAE9F] hover:bg-[#1a9c8f] transition-colors text-white text-sm font-semibold rounded-full px-6 py-3 inline-flex items-center gap-2 whitespace-nowrap`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="3" y="5" width="18" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Unlock with a Free Home Visit
          </button>

          <div className={`${inter.className} flex items-center gap-3 text-[#0B1E33]/50 text-xs flex-wrap justify-center`}>
            {perks.map((p) => (
              <span key={p} className="inline-flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {p}
              </span>
            ))}
          </div>
          <p className={`${inter.className} text-[#1FAE9F] text-xs font-medium`}>
            Most homeowners are surprised by what we find.
          </p>
        </div>
      </div>

      <p className={`${inter.className} text-[#0B1E33]/40 text-xs text-center mt-5 inline-flex items-center gap-1.5 justify-center w-full`}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path
            d="M12 2L4.5 5V10.5C4.5 15.2 7.6 19.5 12 21.5C16.4 19.5 19.5 15.2 19.5 10.5V5L12 2Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Not a formal appraisal. Automated estimate based on comparable sales & public data.
      </p>
    </div>
  );
}