"use client";

import { useEffect, useRef } from "react";
import { Playfair_Display, Inter } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function CtaBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        cardRef.current,
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1 }
      )
        .fromTo(
          ".cta-eyebrow",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.5"
        )
        .fromTo(
          ".cta-headline span",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.4"
        )
        .fromTo(
          ".cta-subtext",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".cta-features",
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.6 },
          "-=0.35"
        )
        .fromTo(
          buttonRef.current,
          { opacity: 0, y: 16, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "back.out(1.7)" },
          "-=0.4"
        )
        .fromTo(
          ".cta-trust",
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          ".cta-stat-item",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        );

      // Subtle pulse on the icon
      gsap.to(".cta-icon-glow", {
        scale: 1.15,
        opacity: 0.6,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 xl:px-10">
        <div
          ref={cardRef}
          className="relative bg-[#0B1E33] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-30px_rgba(11,30,51,0.5)]"
        >
          {/* Background radial gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_80%_50%,rgba(31,174,159,0.18),transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_80%,rgba(31,174,159,0.08),transparent_60%)] pointer-events-none" />

          {/* Content wrapper */}
          <div ref={contentRef} className="relative z-10 px-6 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-center">
              {/* Left: Main CTA content */}
              <div>
                {/* Icon and eyebrow */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="cta-icon-glow relative w-11 h-11 rounded-full bg-[#1FAE9F]/15 flex items-center justify-center ring-2 ring-[#1FAE9F]/20">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1FAE9F" strokeWidth="2" className="relative z-10">
                      <path d="M3 11.5L12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="cta-eyebrow text-[#1FAE9F] text-xs font-semibold tracking-[0.18em] uppercase">
                    Free Home Valuation
                  </span>
                </div>

                {/* Headline */}
                <h2 className={`${playfair.className} cta-headline text-white text-3xl md:text-4xl lg:text-[2.75rem] font-semibold leading-[1.12] mb-5`}>
                  <span className="inline-block">Ready to See What</span>{" "}
                  <span className="inline-block">Your Home Is</span>{" "}
                  <span className="inline-block text-[#1FAE9F]">Really Worth?</span>
                </h2>

                {/* Subtext */}
                <p className="cta-subtext text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                  Get your free, data-backed home value estimate in under 60 seconds.
                  No agents, no pressure — just clear insights for confident decisions.
                </p>

                {/* Feature list */}
                <div className="cta-features flex flex-wrap gap-x-6 gap-y-3 mb-8">
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1FAE9F" strokeWidth="2.5" className="shrink-0">
                      <path d="M5 12l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    100% Free & Confidential
                  </div>
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1FAE9F" strokeWidth="2.5" className="shrink-0">
                      <path d="M5 12l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Results in 60 Seconds
                  </div>
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1FAE9F" strokeWidth="2.5" className="shrink-0">
                      <path d="M5 12l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    No Obligation
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                href="/#home"
                  ref={buttonRef}
                  className={`${inter.className} bg-[#1FAE9F] hover:bg-[#189184] text-white text-sm md:text-base font-semibold rounded-full px-8 py-4 inline-flex items-center gap-2 whitespace-nowrap transition-all hover:shadow-[0_12px_40px_-8px_rgba(31,174,159,0.5)] hover:-translate-y-0.5 active:translate-y-0 w-full md:w-auto  justify-center`}
                >
                  Get My Free Home Value
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>

                {/* Trust text */}
                <p className="cta-trust text-white/40 text-xs mt-4 text-center md:text-left">
                  Trusted by homeowners across Las Vegas
                </p>
              </div>

              {/* Right: Stats panel */}
              <div ref={statsRef} className="bg-white/[0.04] border border-white/10 backdrop-blur-md rounded-2xl p-8 lg:p-10">
                <div className="flex items-center justify-between mb-6">
                  <span className={`${inter.className} text-white/60 text-[11px] font-semibold tracking-[0.15em] uppercase`}>
                    Market Snapshot
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#1FAE9F]" />
                </div>

                {/* Stats */}
                <div className="space-y-6">
                  <div className="cta-stat-item">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className={`${playfair.className} text-white text-4xl md:text-5xl font-semibold leading-none`}>82</span>
                      <span className={`${inter.className} text-white/50 text-sm`}>/ 100</span>
                    </div>
                    <div className={`${inter.className} text-white/50 text-xs mb-2`}>Signal Score</div>
                    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full w-[82%] rounded-full bg-[#1FAE9F]" />
                    </div>
                    <p className={`${inter.className} text-white/50 text-xs mt-2 leading-relaxed`}>
                      Strong seller conditions in your ZIP right now
                    </p>
                  </div>

                  <div className="cta-stat-item pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                    <div>
                      <div className={`${playfair.className} text-white text-2xl font-semibold mb-1`}>21</div>
                      <div className={`${inter.className} text-white/45 text-[11px]`}>days avg. to sell</div>
                    </div>
                    <div>
                      <div className={`${playfair.className} text-white text-2xl font-semibold mb-1`}>+12%</div>
                      <div className={`${inter.className} text-white/45 text-[11px]`}>6-month growth</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}