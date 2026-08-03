"use client";

import { useEffect, useRef } from "react";
import { Playfair_Display } from "next/font/google";
import gsap from "gsap";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });

export default function Header() {
  const barRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(barRef.current, { yPercent: -100 }, { yPercent: 0, duration: 0.7 })
        .fromTo(logoRef.current, { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.6 }, "-=0.35")
        .fromTo(infoRef.current, { opacity: 0, x: 14 }, { opacity: 1, x: 0, duration: 0.6 }, "<");
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={barRef}
      className="bg-[#0B1E33]/95 backdrop-blur-md border-b border-white/[0.06] py-4 fixed top-0 left-0 z-50 w-full"
    >
      <header className="w-full px-4 md:px-6 xl:px-10 max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <div ref={logoRef} className="flex items-center gap-2.5">
          <div className="relative bg-white rounded-md p-1.5 flex items-center justify-center shadow-[0_0_0_1px_rgba(31,174,159,0.25)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B1E33" strokeWidth="2.5">
              <path d="M3 11.5L12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className={`${playfair.className} text-white text-lg md:text-xl font-semibold tracking-tight`}>
            Listing Signal<sup className="text-[10px] align-super text-[#1FAE9F] ml-0.5">®</sup>
          </span>
        </div>

        {/* Right side info */}
        <div ref={infoRef} className="flex items-center gap-4 md:gap-6 text-white text-xs">
          {/* Live data */}
          <div className="flex items-center gap-2 border border-white/10 rounded-full px-3 py-1.5 bg-white/[0.03]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1FAE9F] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1FAE9F]" />
            </span>
            <span className="tracking-widest font-semibold whitespace-nowrap hidden xs:inline text-white/90">
              LIVE DATA
            </span>
          </div>

          {/* Homeowners checked - hidden on smallest screens */}
          <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-white/10">
            <svg className="shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L4.5 5V10.5C4.5 15.2 7.6 19.5 12 21.5C16.4 19.5 19.5 15.2 19.5 10.5V5L12 2Z"
                stroke="#1FAE9F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M8.5 12L11 14.5L15.8 9.7" stroke="#1FAE9F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="leading-tight whitespace-nowrap">
              <div className="font-semibold text-white">2,847 homeowners</div>
              <div className="text-white/50">checked this month</div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}