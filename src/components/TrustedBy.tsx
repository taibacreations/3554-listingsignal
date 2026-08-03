"use client";

import { useEffect, useRef } from "react";
import { Playfair_Display, Inter } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const stats = [
  { value: "10M+", label: "Homes analyzed" },
  { value: "50+", label: "Live data sources" },
  { value: "97%", label: "Valuation accuracy" },
  { value: "4.9/5", label: "Homeowner rating" },
];

export default function TrustedBy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".trust-eyebrow, .trust-heading, .trust-subtext",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".trust-panel",
        { opacity: 0, y: 28, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: panelRef.current, start: "top 88%" },
        }
      );

      gsap.fromTo(
        ".trust-logo",
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: panelRef.current, start: "top 88%" },
        }
      );

      gsap.fromTo(
        ".trust-stat",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.25,
          ease: "power2.out",
          scrollTrigger: { trigger: panelRef.current, start: "top 88%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F5F7F8] py-20 md:py-24 px-4 md:px-6 xl:px-10 relative overflow-hidden"
    >
      {/* soft background accents */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#1FAE9F]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-[#0B1E33]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Header — matches the rhythm of your other sections */}
        <div className="text-center mb-10 md:mb-14 max-w-2xl mx-auto">
          <div className="trust-eyebrow flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#1FAE9F]/40" />
            <span className={`${inter.className} text-[#1FAE9F] text-xs font-semibold tracking-[0.18em] uppercase`}>
              Trusted Across Real Estate
            </span>
            <span className="h-px w-8 bg-[#1FAE9F]/40" />
          </div>
          <h2
            className={`${playfair.className} trust-heading text-[#0B1E33] text-3xl md:text-[2.5rem] font-semibold leading-[1.15] mb-4`}
          >
            Powered by the Names Homeowners Trust
          </h2>
          <p className={`${inter.className} trust-subtext text-[#6B7280] text-sm md:text-base leading-relaxed`}>
            Every estimate is built on live data from the platforms agents and homeowners rely on every day.
          </p>
        </div>

        {/* Logo wall — one strong panel with hairline dividers */}
        <div
          ref={panelRef}
          className="trust-panel bg-white rounded-[2rem] ring-1 ring-[#0B1E33]/5 shadow-[0_24px_70px_-24px_rgba(11,30,51,0.12)] overflow-hidden"
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-[#0B1E33]/[0.06]">
            {/* Zillow */}
            <div className="trust-logo bg-white">
              <div className="flex items-center justify-center px-4 py-10 md:py-14 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M3 10.5L12 3l9 7.5" stroke="#006AFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.5 9.5V20a1 1 0 001 1h11a1 1 0 001-1V9.5" stroke="#006AFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.5 12h5l-5 4.5h5" stroke="#006AFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className={`${inter.className} text-[#0B1E33] text-xl font-bold tracking-tight`}>Zillow</span>
                </div>
              </div>
            </div>

            {/* realtor.com */}
            <div className="trust-logo bg-white">
              <div className="flex items-center justify-center px-4 py-10 md:py-14 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <span className={`${inter.className} text-xl font-semibold tracking-tight text-[#0B1E33]`}>
                  realtor<span className="text-[#D92228]">.com</span>
                  <span className="align-super text-[8px] text-[#6B7280] ml-0.5">®</span>
                </span>
              </div>
            </div>

            {/* Google */}
            <div className="trust-logo bg-white">
              <div className="flex items-center justify-center px-4 py-10 md:py-14 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <span className={`${inter.className} text-[22px] font-semibold tracking-tight`}>
                  <span className="text-[#4285F4]">G</span>
                  <span className="text-[#EA4335]">o</span>
                  <span className="text-[#FBBC05]">o</span>
                  <span className="text-[#4285F4]">g</span>
                  <span className="text-[#34A853]">l</span>
                  <span className="text-[#EA4335]">e</span>
                </span>
              </div>
            </div>

            {/* yahoo */}
            <div className="trust-logo bg-white">
              <div className="flex flex-col items-center justify-center gap-1 px-4 py-10 md:py-14 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <span className={`${inter.className} text-xl font-bold tracking-tight text-[#6001D2] leading-none`}>
                  yahoo!
                </span>
                <span className={`${inter.className} text-[9px] font-semibold tracking-[0.22em] uppercase text-[#6B7280]`}>
                  Real Estate
                </span>
              </div>
            </div>

            {/* Homes.com */}
            <div className="trust-logo bg-white col-span-2 md:col-span-1">
              <div className="flex items-center justify-center px-4 py-10 md:py-14 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 10.5L12 3l9 7.5" stroke="#0073E6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.5 9.5V20a1 1 0 001 1h11a1 1 0 001-1V9.5" stroke="#0073E6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 21v-6h4v6" stroke="#0073E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className={`${inter.className} text-xl font-bold tracking-tight text-[#0073E6]`}>
                    homes<span className="text-[#0B1E33]">.com</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* credibility caption */}
        <p className={`${inter.className} text-center text-xs text-[#6B7280] mt-5`}>
          …plus 40+ additional MLS, public record, and market data sources.
        </p>

        {/* Stats row — gives the section real weight */}
        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 max-w-4xl mx-auto md:divide-x md:divide-[#0B1E33]/10">
          {stats.map((s) => (
            <div key={s.label} className="trust-stat text-center px-4">
              <div className={`${playfair.className} text-[#0B1E33] text-3xl md:text-[2.1rem] font-semibold leading-none mb-1.5`}>
                {s.value}
              </div>
              <div className={`${inter.className} text-[#6B7280] text-xs md:text-[13px] font-medium`}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}