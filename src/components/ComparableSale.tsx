"use client";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

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
            Nearest to you
          </span>
        </div>

        {/* Main content */}
        <div className="px-5 pt-5 sm:px-6 sm:pt-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">

            {/* Left — address + details */}
            <div className="flex flex-col gap-2">
              <div>
                <h3
                  className={`${inter.className} text-lg font-bold text-[#153B5F] sm:text-xl`}
                >
                  4821 Sunset Ridge Dr
                </h3>
                <p
                  className={`${inter.className} mt-0.5 text-sm text-[#153B5F]/50`}
                >
                  0.18 mi away · 4 bed · 3 bath · 2,050 sqft
                </p>
              </div>

              {/* Sold badge */}
              <span
                className={`${inter.className} inline-flex w-fit items-center rounded-full bg-[#EAF6F4] px-3 py-1 text-[12px] font-semibold text-[#178F82]`}
              >
                Sold 18 days ago
              </span>
            </div>

            {/* Right — price */}
            <div className="mt-3 text-left sm:mt-0 sm:text-right">
              <p
                className={`${inter.className} text-[32px] font-bold leading-none text-[#153B5F] sm:text-[38px]`}
              >
                $495,000
              </p>
              <p
                className={`${inter.className} mt-1.5 text-sm font-semibold text-[#1FAE9F]`}
              >
                +3% vs list
              </p>
            </div>
          </div>

          {/* Similarity bar — Image 2 jaisa */}
          <div className="mt-5 rounded-xl bg-[#F5F7F8] px-4 py-4 mb-5 sm:px-5">
            <div className="mb-2 flex items-center justify-between">
              <span
                className={`${inter.className} text-sm font-medium text-[#0B1E33]/60`}
              >
                Similarity to your home
              </span>
              <span
                className={`${inter.className} text-sm font-bold text-[#1FAE9F]`}
              >
                91%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#E0E5E9]">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#1FAE9F,#2CC7B7)]"
                style={{ width: "91%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}