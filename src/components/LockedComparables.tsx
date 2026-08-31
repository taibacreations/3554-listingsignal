"use client";

import { Inter } from "next/font/google";
import { formatCurrency } from "@/lib/format";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export interface LockedComparableItem {
  address: string;
  distanceMi: number | null;
  beds: number;
  baths: number;
  sqft: number;
  price: number;
  status?: string;
}

interface LockedComparablesProps {
  comparables: LockedComparableItem[];
  medianPrice?: number | null;
  medianPricePerSqft?: number | null;
  medianYearBuilt?: number | null;
}

export default function LockedComparables({
  comparables,
  medianPrice,
  medianPricePerSqft,
  medianYearBuilt,
}: LockedComparablesProps) {
  if (!comparables.length) return null;

  return (
    <section className="mx-auto mt-6 w-full max-w-[1200px] px-4 pb-0 md:px-6 xl:px-10">
      <div className="relative overflow-hidden rounded-2xl bg-white ring-1 ring-[#0B1E33]/[0.06] shadow-[0_15px_40px_-20px_rgba(11,30,51,0.2)]">
        <div className="flex items-center justify-between border-b border-[#0B1E33]/[0.06] px-5 py-3.5 sm:px-6">
          <span className={`${inter.className} text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0B1E33]/45`}>
            More Comparable Sales ({comparables.length})
          </span>
          <span className={`${inter.className} inline-flex items-center gap-1.5 rounded-full bg-[#F0EDE8] px-3 py-1 text-[11px] font-semibold text-[#8A7A5C]`}>
            🔒 Locked
          </span>
        </div>

        {/* Blurred rows */}
        <div className="select-none px-5 py-4 sm:px-6" aria-hidden="true">
          <div className="divide-y divide-[#0B1E33]/[0.06]">
            {comparables.slice(0, 5).map((comp, i) => (
              <div key={i} className="flex items-center justify-between py-3 blur-[5px]">
                <div>
                  <p className={`${inter.className} text-sm font-semibold text-[#153B5F]`}>{comp.address}</p>
                  <p className={`${inter.className} text-xs text-[#153B5F]/50`}>
                    {comp.beds} bed · {comp.baths} bath · {comp.sqft.toLocaleString()} sqft
                  </p>
                </div>
                <p className={`${inter.className} text-base font-bold text-[#153B5F]`}>
                  {formatCurrency(comp.price)}
                </p>
              </div>
            ))}
          </div>

          {(medianPrice || medianPricePerSqft || medianYearBuilt) && (
            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-[#0B1E33]/[0.06] pt-4">
              <div>
                <p className={`${inter.className} text-[10px] uppercase tracking-wide text-[#0B1E33]/40`}>Median Price</p>
                <p className={`${inter.className} text-sm font-bold text-[#153B5F]`}>
                  {medianPrice ? formatCurrency(medianPrice) : "—"}
                </p>
              </div>
              <div>
                <p className={`${inter.className} text-[10px] uppercase tracking-wide text-[#0B1E33]/40`}>Median $/SqFt</p>
                <p className={`${inter.className} text-sm font-bold text-[#153B5F]`}>
                  {medianPricePerSqft ? `$${Math.round(medianPricePerSqft)}` : "—"}
                </p>
              </div>
              <div>
                <p className={`${inter.className} text-[10px] uppercase tracking-wide text-[#0B1E33]/40`}>Median Year Built</p>
                <p className={`${inter.className} text-sm font-bold text-[#153B5F]`}>
                  {medianYearBuilt ?? "—"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Overlay */}
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-white via-white/90 to-transparent pb-6">
          <div className={`${inter.className} pointer-events-auto rounded-full bg-[#0B1E33] px-5 py-2.5 text-sm font-semibold text-white shadow-lg`}>
            🔒 Book a free home visit to unlock all {comparables.length} comps + neighborhood summary
          </div>
        </div>
      </div>
    </section>
  );
}