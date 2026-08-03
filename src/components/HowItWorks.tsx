"use client";

import { useEffect, useRef } from "react";
import { Playfair_Display, Inter } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const steps = [
  {
    number: "01",
    icon: (
      <path d="M3 11.5L12 4l9 7.5M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9" strokeLinecap="round" strokeLinejoin="round" />
    ),
    title: "Enter Your Address",
    description: "We pull real market data specific to your home and neighborhood.",
  },
  {
    number: "02",
    icon: (
      <>
        <rect x="5" y="12" width="3" height="7" />
        <rect x="10.5" y="8" width="3" height="11" />
        <rect x="16" y="5" width="3" height="14" />
      </>
    ),
    title: "See Your Home Value",
    description: "Your estimated value, Signal Score, and how your home compares to what's selling right now.",
  },
  {
    number: "03",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    title: "Know Your Timing",
    description: "Find out if now is the right moment — based on real buyer demand and inventory in your area.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const insightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // header
      gsap.fromTo(
        ".how-eyebrow, .how-heading, .how-subtext",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        }
      );

      // sticky intro column
      gsap.fromTo(
        ".intro-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: introRef.current, start: "top 78%" },
        }
      );

      // vertical timeline rail draws downward
      gsap.fromTo(
        ".timeline-rail",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: "power2.inOut",
          transformOrigin: "top center",
          scrollTrigger: { trigger: timelineRef.current, start: "top 75%" },
        }
      );

      // each step row
      const rows = gsap.utils.toArray<HTMLElement>(".step-row");
      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: timelineRef.current, start: "top 75%" },
          }
        );
        gsap.fromTo(
          row.querySelector(".step-dot"),
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            delay: i * 0.15 + 0.15,
            ease: "back.out(2)",
            scrollTrigger: { trigger: timelineRef.current, start: "top 75%" },
          }
        );
      });

      // insight split
      gsap.fromTo(
        ".insight-image",
        { opacity: 0, x: -30, scale: 1.03 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: insightRef.current, start: "top 82%" },
        }
      );
      gsap.fromTo(
        ".insight-panel",
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: insightRef.current, start: "top 82%" },
        }
      );
      gsap.fromTo(
        ".insight-stat",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: insightRef.current, start: "top 82%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-24 md:py-28 rounded-t-[2.5rem] relative z-10">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 xl:px-10">
        {/* Eyebrow + Heading */}
        <div className="max-w-2xl mx-auto text-center mb-16 md:mb-20">
          <div className="how-eyebrow flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-8 bg-[#1FAE9F]/40" />
            <span className={`${inter.className} text-[#1FAE9F] text-xs font-semibold tracking-[0.18em] uppercase`}>
              How It Works
            </span>
            <span className="h-px w-8 bg-[#1FAE9F]/40" />
          </div>
          <h2 className={`${playfair.className} how-heading text-[#0B1E33] text-3xl md:text-[2.75rem] font-semibold leading-[1.15] mb-4`}>
            Get Your Home Value in 3 Simple Steps
          </h2>
          <p className={`${inter.className} how-subtext text-[#6B7280] text-sm md:text-base leading-relaxed`}>
            No agents, no pressure — just a clear, data-backed picture of where your home stands today.
          </p>
        </div>

        {/* Sticky intro + vertical timeline */}
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 mb-20 md:mb-24">
          {/* Left: sticky supporting column */}
          <div ref={introRef} className="lg:sticky lg:top-32 lg:self-start">
            <span className={`${inter.className} intro-item text-[#1FAE9F] text-xs font-semibold tracking-[0.18em] uppercase mb-4 block`}>
              From Address To Answer
            </span>
            <h3 className={`${playfair.className} intro-item text-[#0B1E33] text-2xl md:text-3xl font-semibold leading-snug mb-5 max-w-sm`}>
              Everything you need to know, in under sixty seconds.
            </h3>
            <p className={`${inter.className} intro-item text-[#6B7280] text-sm leading-relaxed max-w-sm mb-7`}>
              We built this to feel less like a lead form and more like a second opinion — grounded in the same
              data your agent would pull, minus the sales pitch.
            </p>
            <button
              className={`${inter.className} intro-item bg-[#0B1E33] hover:bg-[#132a45] text-white text-sm font-semibold rounded-full px-6 py-3 flex items-center gap-1.5 w-fit transition-colors`}
            >
              Start Now — It&apos;s Free
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Right: vertical timeline of steps */}
          <div ref={timelineRef} className="relative">
            {/* rail track: a w-14 column matched exactly to the icon column below it,
                so the line is guaranteed to sit centered behind the dots instead of
                being eyeballed with a fixed pixel offset */}
            <div className="absolute top-2 bottom-2 left-0 w-14 hidden sm:flex justify-center">
              <div className="timeline-rail w-px bg-[#1FAE9F]/25 h-full" />
            </div>

            <div className="space-y-10 md:space-y-12">
              {steps.map((step) => (
                <div key={step.number} className="step-row relative flex gap-5 sm:gap-7">
                  {/* dot marker on the rail */}
                  <div className="relative shrink-0 hidden sm:flex items-center justify-center w-14 h-14">
                    <span className="step-dot absolute inset-0 rounded-full bg-[#F5F7F8] ring-4 ring-white" />
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1FAE9F" strokeWidth="2" className="relative z-10">
                      {step.icon}
                    </svg>
                  </div>

                  <div className="flex-1 pb-2">
                    <div className="flex items-baseline gap-3 mb-1.5">
                      <span className={`${playfair.className} text-[#1FAE9F]/50 text-2xl font-semibold`}>{step.number}</span>
                      <h4 className={`${playfair.className} text-[#0B1E33] text-lg md:text-xl font-semibold`}>{step.title}</h4>
                    </div>
                    <p className={`${inter.className} text-[#6B7280] text-sm leading-relaxed max-w-md`}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights: photo + navy panel split */}
        <div ref={insightRef} className="grid md:grid-cols-2 rounded-[2rem] overflow-hidden ring-1 ring-[#0B1E33]/5">
          {/* Image side */}
          <div className="insight-image relative min-h-[280px] md:min-h-[420px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1684575571081-d6abda485519?q=80&w=1600&auto=format&fit=crop')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E33]/80 via-[#0B1E33]/10 to-transparent md:bg-gradient-to-r md:from-[#0B1E33]/10 md:via-transparent md:to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 md:right-auto md:max-w-[220px] bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3.5 shadow-lg">
              <div className={`${playfair.className} text-[#1FAE9F] text-xl font-semibold`}>+12%</div>
              <p className={`${inter.className} text-[#0B1E33] text-xs leading-snug mb-1`}>
                Increase in home values over the last 6 months
              </p>
              <span className={`${inter.className} text-[#6B7280] text-[11px]`}>Las Vegas Market Update</span>
            </div>
          </div>

          {/* Navy content side */}
          <div className="insight-panel bg-[#0B1E33] p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,rgba(31,174,159,0.14),transparent_60%)] pointer-events-none" />

            <span className={`${inter.className} text-[#1FAE9F] text-xs font-semibold tracking-[0.18em] uppercase mb-3 relative z-10`}>
              Real Data. Real Results.
            </span>
            <h3 className={`${playfair.className} text-white text-2xl md:text-[2rem] font-semibold mb-4 leading-snug relative z-10`}>
              Smarter Insights. Better Decisions.
            </h3>
            <p className={`${inter.className} text-white/55 text-sm mb-7 leading-relaxed max-w-md relative z-10`}>
              We analyze thousands of data points in real time so you can make confident, profitable decisions
              about your home.
            </p>

            {/* stat strip */}
            <div className="grid grid-cols-3 gap-4 mb-7 relative z-10">
              <div className="insight-stat">
                <div className={`${playfair.className} text-white text-2xl md:text-3xl font-semibold leading-none mb-1`}>21</div>
                <div className={`${inter.className} text-white/45 text-[11px] leading-tight`}>days avg. to sell</div>
              </div>
              <div className="insight-stat border-x border-white/10 pl-4">
                <div className={`${playfair.className} text-white text-2xl md:text-3xl font-semibold leading-none mb-1`}>60s</div>
                <div className={`${inter.className} text-white/45 text-[11px] leading-tight`}>to your Signal Score</div>
              </div>
              <div className="insight-stat pl-4">
                <div className={`${playfair.className} text-white text-2xl md:text-3xl font-semibold leading-none mb-1`}>100%</div>
                <div className={`${inter.className} text-white/45 text-[11px] leading-tight`}>free, no obligation</div>
              </div>
            </div>

            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 relative z-10">
              {["Live MLS & market data", "AI-powered pricing model", "Local market trends", "Neighborhood-level accuracy"].map(
                (item) => (
                  <li key={item} className={`${inter.className} flex items-center gap-2 text-white/80 text-sm`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1FAE9F" strokeWidth="2.5" className="shrink-0">
                      <path d="M5 12l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}