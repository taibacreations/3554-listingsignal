"use client";

import { useEffect, useRef } from "react";
import { Inter } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const inter = Inter({ subsets: ["latin"], weight: ["500", "600", "700"] });

export default function TrustedBy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".trust-logo");

      gsap.fromTo(
        ".trust-eyebrow",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        }
      );

      gsap.fromTo(
        items,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: rowRef.current, start: "top 88%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#F3F5F7] py-7 px-4 md:px-6 xl:px-10">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-5">
        <span
          className={`${inter.className} trust-eyebrow text-[#1FAE9F] text-[11px] font-semibold tracking-[0.18em] uppercase`}
        >
          Trusted by Homeowners &amp; Top Agents
        </span>
        <div ref={rowRef} className="flex flex-wrap justify-center items-center gap-x-12 gap-y-5 opacity-70">
          {/* Zillow */}
          <div className="trust-logo flex items-center gap-1.5 grayscale hover:grayscale-0 transition-all duration-300">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B1E33" strokeWidth="2">
              <path d="M3 11.5L12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={`${inter.className} text-[#0B1E33] text-lg font-bold tracking-tight`}>Zillow</span>
          </div>

          {/* realtor.com */}
          <div className="trust-logo flex items-center gap-1 grayscale hover:grayscale-0 transition-all duration-300">
            <span className={`${inter.className} text-[#0B1E33] text-lg font-semibold`}>
              realtor<span className="text-red-500">.com</span>
            </span>
          </div>

          {/* Google */}
          <span
            className={`${inter.className} trust-logo text-[#0B1E33] text-xl font-semibold tracking-tight grayscale hover:grayscale-0 transition-all duration-300`}
          >
            Google
          </span>

          {/* Yahoo Real Estate */}
          <div className="trust-logo flex items-center gap-1.5 grayscale hover:grayscale-0 transition-all duration-300">
            <span className={`${inter.className} text-[#0B1E33] text-xl font-bold italic`}>yahoo!</span>
            <span className={`${inter.className} text-[#0B1E33] text-xs font-medium`}>real estate</span>
          </div>

          {/* Homes.com */}
          <div className="trust-logo flex items-center gap-1.5 grayscale hover:grayscale-0 transition-all duration-300">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B1E33" strokeWidth="2">
              <path d="M3 11.5L12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={`${inter.className} text-[#0B1E33] text-lg font-semibold`}>Homes.com</span>
          </div>
        </div>
      </div>
    </section>
  );
}