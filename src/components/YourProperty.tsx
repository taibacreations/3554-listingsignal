import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

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
    <div className="max-w-[1024px] mx-auto px-4 sm:px-6 mt-6">
      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-7 grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-6 items-center">
        {/* Details list */}
        <div>
          <span
            className={`${inter.className} text-[#0B1E33]/50 text-xs font-semibold tracking-wide uppercase`}
          >
            Your Property
          </span>
          <ul className="mt-4 divide-y divide-[#EEF0F3]">
            {details.map((d) => (
              <li key={d.label} className="flex items-center justify-between py-3">
                <span className={`${inter.className} text-[#0B1E33]/60 text-sm inline-flex items-center gap-3`}>
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
                  {d.label}
                </span>
                <span className={`${inter.className} text-[#0B1E33] text-sm font-semibold`}>
                  {d.value}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Property image */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
          <Image src={imageSrc} alt="Exterior view of the property" fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}