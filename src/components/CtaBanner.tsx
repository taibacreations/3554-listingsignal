// CtaBanner.tsx
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

interface CtaBannerProps {
  onUnlock?: () => void;
}

const perks = ["No commitment", "20 minutes", "We come to you"];

export default function CtaBanner({ onUnlock }: CtaBannerProps) {
  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-6 xl:px-10 mt-8 md:mt-10 mb-4">
      <div className="relative bg-[#0B1E33] rounded-2xl overflow-hidden px-6 py-9 sm:px-10 sm:py-12">
        {/* signature signal-wave accent, echoing the hero */}
        <svg
          className="absolute right-[-10%] top-[-15%] h-[160%] w-[55%] opacity-[0.18] pointer-events-none hidden sm:block"
          viewBox="0 0 700 500"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 380 L120 380 L150 260 L190 440 L230 120 L270 380 L340 380 L370 300 L410 380 L700 380"
            stroke="#1FAE9F"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_15%_10%,rgba(31,174,159,0.14),transparent_65%)] pointer-events-none" />

        <div className="relative flex flex-col items-center text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-white/10 border border-white/15 flex items-center justify-center mb-6">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1FAE9F" strokeWidth="2">
              <rect x="3" y="5" width="18" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="inline-flex items-center gap-2.5 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1FAE9F] shrink-0" />
            <span className={`${inter.className} text-[#1FAE9F] text-[11px] font-bold tracking-[0.2em] uppercase`}>
              Free Home Visit
            </span>
          </div>

          <h3 className={`${playfair.className} text-white text-2xl sm:text-[32px] font-semibold leading-tight max-w-xl`}>
            What would your home <span className="text-[#1FAE9F]">actually sell</span> for?
          </h3>
          <p className={`${inter.className} text-white/60 text-sm sm:text-[15px] mt-4 max-w-lg leading-relaxed`}>
            The numbers above reflect your neighborhood. A free home visit tells you what buyers
            would actually pay for your specific home — condition, updates, and presentation
            included.
          </p>

          <button
            type="button"
            onClick={onUnlock}
            className={`${inter.className} mt-8 bg-[#1FAE9F] hover:bg-[#189184] transition-all text-white text-sm font-semibold rounded-full px-8 py-4 inline-flex items-center gap-2.5 whitespace-nowrap shadow-[0_20px_45px_-15px_rgba(31,174,159,0.6)] hover:shadow-[0_25px_50px_-15px_rgba(31,174,159,0.7)] hover:-translate-y-0.5`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="3" y="5" width="18" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Unlock with a Free Home Visit
          </button>

          <div className={`${inter.className} flex items-center gap-4 sm:gap-6 text-white/55 text-xs mt-6 flex-wrap justify-center`}>
            {perks.map((p) => (
              <span key={p} className="inline-flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-[#1FAE9F]/20 flex items-center justify-center shrink-0">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#1FAE9F" strokeWidth="4">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {p}
              </span>
            ))}
          </div>
          <p className={`${inter.className} text-[#1FAE9F] text-xs font-semibold mt-3`}>
            Most homeowners are surprised by what we find.
          </p>
        </div>
      </div>

      <p className={`${inter.className} text-[#0B1E33]/40 text-xs text-center mt-6 inline-flex items-center gap-1.5 justify-center w-full`}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path
            d="M12 2L4.5 5V10.5C4.5 15.2 7.6 19.5 12 21.5C16.4 19.5 19.5 15.2 19.5 10.5V5L12 2Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Not a formal appraisal. Automated estimate based on comparable sales & public data.
      </p>
    </section>
  );
}