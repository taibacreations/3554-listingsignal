"use client";

import { useEffect, useRef } from "react";
import { Playfair_Display, Inter } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function CtaBanner() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 85%" },
        }
      );
      gsap.fromTo(
        ".cta-icon",
        { opacity: 0, scale: 0.6, rotate: -12 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: cardRef.current, start: "top 85%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 md:px-6 xl:px-10 py-10">
      <div
        ref={cardRef}
        className="max-w-[1440px] mx-auto bg-[#0B1E33] rounded-[1.75rem] px-6 md:px-10 py-7 md:py-8 flex flex-col md:flex-row items-center md:justify-between gap-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_100%_at_100%_50%,rgba(31,174,159,0.14),transparent_70%)] pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="cta-icon w-11 h-11 shrink-0 rounded-full bg-[#1FAE9F]/20 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1FAE9F" strokeWidth="2">
              <path d="M3 11.5L12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h3 className={`${playfair.className} text-white text-lg md:text-xl font-semibold leading-snug`}>
              Ready to See What Your Home Is Really Worth?
            </h3>
            <p className={`${inter.className} text-white/50 text-sm mt-1`}>
              Get your free home value in under 60 seconds.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2 w-full md:w-auto relative z-10">
          <button
            className={`${inter.className} bg-[#1FAE9F] hover:bg-[#189184] text-white text-sm font-semibold rounded-full px-6 py-2.5 flex items-center gap-1.5 whitespace-nowrap transition-colors w-full md:w-auto justify-center`}
          >
            Get My Free Home Value
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className={`${inter.className} text-white/40 text-xs`}>No commitment. 100% free.</span>
        </div>
      </div>
    </section>
  );
}