"use client";

import { useEffect, useRef } from "react";
import { Playfair_Display } from "next/font/google";
import gsap from "gsap";
import Link from "next/link";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function Header() {
  const barRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!logoRef.current || !infoRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Background bar stays still.
      // Only elements come from top.
      tl.fromTo(
        logoRef.current,
        { yPercent: -100, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.6 },
      ).fromTo(
        infoRef.current,
        { yPercent: -100, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.6 },
        "<0.08",
      );
    }, barRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="site-header"
      ref={barRef}
      className="fixed top-0 inset-x-0 z-50 w-full bg-[#0B1E33]/95 backdrop-blur-md border-b border-white/[0.06] py-4 overflow-hidden"
    >
      <header className="w-full px-4 md:px-6 xl:px-10 max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href={"/"} ref={logoRef} className="flex items-center gap-2.5">
          <img src="/logo.png" alt="logo" className="lg:w-[200px] w-[160px] h-auto"/>
        </Link>

        {/* Right side info */}
        <div
          ref={infoRef}
          className="flex items-center gap-4 md:gap-6 text-white text-xs"
        >
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

          {/* Homeowners checked */}
          <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-white/10">
            <svg
              className="shrink-0"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 2L4.5 5V10.5C4.5 15.2 7.6 19.5 12 21.5C16.4 19.5 19.5 15.2 19.5 10.5V5L12 2Z"
                stroke="#1FAE9F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.5 12L11 14.5L15.8 9.7"
                stroke="#1FAE9F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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