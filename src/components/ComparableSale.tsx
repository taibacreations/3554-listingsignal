"use client";

import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });

export default function ComparableSale() {
  return (
    <section className="mx-auto mt-8 w-full max-w-[1200px] px-4 pb-4 md:px-6 xl:px-10 md:mt-10">
      <div className="rounded-2xl bg-white p-6 shadow-[0_30px_70px_-40px_rgba(11,30,51,0.35)] ring-1 ring-[#0B1E33]/[0.06] sm:p-8">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-[#0B1E33]/[0.06] pb-4">
          <span className={`${inter.className} text-xs font-semibold uppercase tracking-[0.14em] text-[#0B1E33]/50`}>
            Featured Comparable Sale
          </span>
          <span className={`${inter.className} inline-flex items-center gap-1.5 rounded-full bg-[#1FAE9F]/10 px-3 py-1 text-[11px] font-semibold text-[#0E8F82]`}>
            Sold Recently
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Address */}
          <div className="flex flex-col gap-1">
            <span className={`${inter.className} text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0B1E33]/45`}>Address</span>
            <span className={`${inter.className} text-base font-semibold text-[#0B1E33]`}>4821 Sunset Ridge Dr</span>
            <span className={`${inter.className} text-sm text-[#0B1E33]/55`}>Las Vegas, NV 89129</span>
          </div>

          {/* Sale Price */}
          <div className="flex flex-col gap-1">
            <span className={`${inter.className} text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0B1E33]/45`}>Sale Price</span>
            <span className={`${inter.className} text-2xl font-bold text-[#0B1E33]`}>$495,000</span>
            <span className={`${inter.className} text-sm text-[#1FAE9F] font-medium`}>Sold 18 days ago</span>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-1">
            <span className={`${inter.className} text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0B1E33]/45`}>Property Details</span>
            <span className={`${inter.className} text-base font-semibold text-[#0B1E33]`}>4 bed · 3 bath · 2,050 sq ft</span>
            <span className={`${inter.className} text-sm text-[#0B1E33]/55`}>Built 2013 · Similar layout</span>
          </div>
        </div>

        {/* Similarity bar */}
        <div className="mt-6 rounded-xl bg-[#F5F7F8] px-5 py-4">
          <div className="mb-2 flex items-center justify-between">
            <span className={`${inter.className} text-xs font-semibold text-[#0B1E33]/60`}>Similarity to your home</span>
            <span className={`${inter.className} text-xs font-bold text-[#1FAE9F]`}>91%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E7EAEE]">
            <div className="h-full w-[91%] rounded-full bg-[linear-gradient(90deg,#1FAE9F,#2CC7B7)]" />
          </div>
        </div>
      </div>
    </section>
  );
}