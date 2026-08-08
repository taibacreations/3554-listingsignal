"use client";

import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });

export default function ComparableSale() {
  return (
    <section className="mx-auto mt-6 w-full max-w-[1200px] px-4 pb-0 md:px-6 xl:px-10">
      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-[#0B1E33]/[0.06] shadow-[0_15px_40px_-20px_rgba(11,30,51,0.2)]">

        {/* Header row */}
        <div className="flex items-center justify-between border-b border-[#0B1E33]/[0.06] px-5 py-3.5 sm:px-6">
          <span
            className={`${inter.className} text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0B1E33]/45`}
          >
            Featured Comparable Sale
          </span>
          <span
            className={`${inter.className} inline-flex items-center gap-1.5 rounded-full bg-[#EAF6F4] px-3 py-1 text-[11px] font-semibold text-[#178F82]`}
          >
            Nearest to your home
          </span>
        </div>

        {/* Main content */}
        <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6">

          {/* Left — address + details */}
          <div className="flex flex-col gap-2">
            <div>
              <h3
                className={`${inter.className} text-lg font-bold text-[#0B1E33] sm:text-xl`}
              >
                10271 Headrick Dr
              </h3>
              <p
                className={`${inter.className} mt-0.5 text-sm text-[#0B1E33]/50`}
              >
                0.18 mi away · 4/3 · 1,913 sqft
              </p>
            </div>

            {/* Sold badge */}
            <span
              className={`${inter.className} inline-flex w-fit items-center rounded-full bg-[#EAF6F4] px-3 py-1 text-[12px] font-semibold text-[#178F82]`}
            >
              Sold Aug 2025
            </span>
          </div>

          {/* Right — price */}
          <div className="text-left sm:text-right">
            <p
              className={`${inter.className} text-[32px] font-bold leading-none text-[#0B1E33] sm:text-[38px]`}
            >
              $449,999
            </p>
            <p
              className={`${inter.className} mt-1.5 text-sm font-semibold text-[#1FAE9F]`}
            >
              +3% vs list
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}