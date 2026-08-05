// YourProperty.tsx
import { Inter, Playfair_Display } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });

interface PropertyDetail {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

interface YourPropertyProps {
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  yearBuilt: number;
  imageSrc: string;
}

export default function YourProperty({
  bedrooms = 4,
  bathrooms = 3,
  sqft = 2110,
  yearBuilt = 2014,
  imageSrc = "/home/bg.png",
}: Partial<YourPropertyProps>) {
  const details: PropertyDetail[] = [
    {
      label: "Bedrooms",
      value: bedrooms,
      icon: (
        <>
          <path d="M3 18v-6a2 2 0 012-2h14a2 2 0 012 2v6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 18v2M21 18v2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 10V7a2 2 0 012-2h2a2 2 0 012 2v3" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ),
    },
    {
      label: "Bathrooms",
      value: bathrooms,
      icon: (
        <>
          <path d="M4 12h16v3a4 4 0 01-4 4H8a4 4 0 01-4-4v-3z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 12V6a2 2 0 012-2h1" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ),
    },
    {
      label: "Square Footage",
      value: `${sqft.toLocaleString()} sq ft`,
      icon: (
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 9h18M9 21V9" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ),
    },
    {
      label: "Year Built",
      value: yearBuilt,
      icon: (
        <>
          <rect x="3" y="5" width="18" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ),
    },
  ];

  return (
    <section className="max-w-[1100px] mx-auto px-4 sm:px-6 mt-8 md:mt-10">
      <div className="bg-white rounded-2xl border border-[#0B1E33]/[0.07] shadow-[0_30px_70px_-40px_rgba(11,30,51,0.35)] p-6 sm:p-9">
        <div className="flex items-center gap-2.5 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1FAE9F] shrink-0" />
          <span className={`${inter.className} text-[#0B1E33]/50 text-[11px] font-bold tracking-[0.2em] uppercase`}>
            Your Property
          </span>
        </div>
        <h3 className={`${playfair.className} text-[#0B1E33] text-xl sm:text-2xl font-semibold mt-2 mb-7`}>
          Property Snapshot
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-8 md:gap-10 items-stretch">
          {/* Details list */}
          <ul className="divide-y divide-[#0B1E33]/[0.06] self-center">
            {details.map((d) => (
              <li key={d.label} className="flex items-center justify-between gap-4 py-4">
                <span className={`${inter.className} text-[#0B1E33]/60 text-sm inline-flex items-center gap-3.5 min-w-0`}>
                  <span className="w-9 h-9 rounded-full bg-[#1FAE9F]/10 flex items-center justify-center shrink-0">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1FAE9F"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      {d.icon}
                    </svg>
                  </span>
                  <span className="whitespace-nowrap">{d.label}</span>
                </span>
                <span className={`${playfair.className} text-[#0B1E33] text-[15px] sm:text-base font-semibold whitespace-nowrap shrink-0`}>
                  {d.value}
                </span>
              </li>
            ))}
          </ul>

          {/* Property image */}
          <div className="relative w-full min-h-[220px] md:min-h-full rounded-xl overflow-hidden ring-1 ring-[#0B1E33]/[0.06] shadow-[0_20px_45px_-20px_rgba(11,30,51,0.4)]">
            <Image src={imageSrc} alt="Exterior view of the property" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E33]/55 via-transparent to-transparent" />
            <div className="absolute bottom-3.5 left-3.5 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1FAE9F]" />
              <span className={`${inter.className} text-[#0B1E33] text-[11px] font-semibold whitespace-nowrap`}>
                Live Property View
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}