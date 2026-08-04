import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

type Stat = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

const stats: Stat[] = [
  {
    label: "EST. VALUE",
    value: "$509K",
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
        <rect x="4" y="14" width="3" height="6" />
        <rect x="10.5" y="10" width="3" height="10" />
        <rect x="17" y="6" width="3" height="14" />
      </>
    ),
  },
  {
    label: "CONFIDENCE",
    value: "97.5%",
    icon: (
      <>
        <path
          d="M12 2L4.5 5V10.5C4.5 15.2 7.6 19.5 12 21.5C16.4 19.5 19.5 15.2 19.5 10.5V5L12 2Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8.5 12L11 14.5L15.8 9.7" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

interface ResultsHeroProps {
  location?: string;
}

export default function ResultsHero({ location = "casc, Las Vegas, NV" }: ResultsHeroProps) {
  return (
    <section className="relative w-full h-[70vh] bg-[#F3F5F7] px-4 sm:px-6 md:px-10 pt-10 sm:pt-14 pb-8 overflow-hidden">
      {/* Background image + overlay */}
      <div
        className="absolute inset-0 bg-[url('/home/bg1.png')] bg-cover bg-center"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-white/90" aria-hidden="true" />

      <div className="relative z-10 max-w-[1024px] mx-auto flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#1FAE9F]/10 rounded-full px-4 py-1.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1FAE9F]" aria-hidden="true" />
          <span
            className={`${inter.className} text-[#1FAE9F] text-xs font-semibold tracking-wide uppercase`}
          >
            Your Home Value Is Ready
          </span>
        </div>

        {/* Heading */}
        <h1
          className={`${playfair.className} text-[#0B1E33] text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight px-2`}
        >
          We found 4 recent sales <span className="text-[#1FAE9F]">near your home.</span>
        </h1>
        <p className={`${inter.className} text-[#0B1E33]/60 text-sm mt-3 max-w-md px-2`}>
          Enter your details to see what your home could sell for right now.
        </p>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8 w-full max-w-lg">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl shadow-sm px-3 sm:px-4 py-4 sm:py-5 flex flex-col items-center gap-2"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#1FAE9F] flex items-center justify-center shrink-0">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1FAE9F"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  {s.icon}
                </svg>
              </div>
              <span
                className={`${inter.className} text-[#0B1E33] text-sm sm:text-base font-semibold`}
              >
                {s.value}
              </span>
              <span className={`${inter.className} text-[#0B1E33]/40 text-[10px] tracking-wide`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Location pill */}
        <div className="bg-[#0B1E33] rounded-full inline-flex items-center gap-2 px-4 py-2 mt-6 shadow-sm max-w-full">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1FAE9F"
            strokeWidth="2"
            className="shrink-0"
            aria-hidden="true"
          >
            <path d="M3 11.5L12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={`${inter.className} text-white text-sm font-medium truncate`}>
            {location}
          </span>
        </div>
      </div>
    </section>
  );
}