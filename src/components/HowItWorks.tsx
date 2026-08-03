"use client";

import { useEffect, useRef } from "react";
import { Playfair_Display, Inter } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const steps = [
  {
    number: "01",
    icon: (
      <path
        d="M3 11.5L12 4l9 7.5M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    title: "Enter Your Address",
    description:
      "We pull real market data specific to your home and neighborhood.",
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
    description:
      "Your estimated value, Signal Score, and how your home compares to what's selling right now.",
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
    description:
      "Find out if now is the right moment — based on real buyer demand and inventory in your area.",
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
        },
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
        },
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
        },
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
          },
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
          },
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
        },
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
        },
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
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-24 md:py-28 rounded-t-[2.5rem] relative z-10"
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 xl:px-10">
        {/* Eyebrow + Heading */}
        <div className="max-w-2xl mx-auto text-center mb-16 md:mb-20">
          <div className="how-eyebrow flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-8 bg-[#1FAE9F]/40" />
            <span
              className={`${inter.className} text-[#1FAE9F] text-xs font-semibold tracking-[0.18em] uppercase`}
            >
              How It Works
            </span>
            <span className="h-px w-8 bg-[#1FAE9F]/40" />
          </div>
          <h2
            className={`${playfair.className} how-heading text-[#0B1E33] text-3xl md:text-[2.75rem] font-semibold leading-[1.15] mb-4`}
          >
            Get Your Home Value in 3 Simple Steps
          </h2>
          <p
            className={`${inter.className} how-subtext text-[#6B7280] text-sm md:text-base leading-relaxed`}
          >
            No agents, no pressure — just a clear, data-backed picture of where
            your home stands today.
          </p>
        </div>

        {/* Sticky intro + vertical timeline */}
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 mb-20 md:mb-24">
          {/* Left: sticky supporting column */}
          <div ref={introRef} className="lg:sticky lg:top-32 lg:self-start">
            <div className="intro-item relative">
              {/* Subtle background accent */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#1FAE9F]/5 rounded-full blur-3xl pointer-events-none" />

              <span
                className={`${inter.className} text-[#1FAE9F] text-xs font-semibold tracking-[0.18em] uppercase mb-4 block relative z-10`}
              >
                From Address To Answer
              </span>
              <h3
                className={`${playfair.className} text-[#0B1E33] text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug mb-5 max-w-sm relative z-10`}
              >
                Everything you need to know, in under sixty seconds.
              </h3>
              <p
                className={`${inter.className} text-[#6B7280] text-base leading-relaxed max-w-sm relative z-10`}
              >
                We built this to feel less like a lead form and more like a
                second opinion — grounded in the same data your agent would
                pull, minus the sales pitch.
              </p>
            </div>
          </div>

          {/* Right: vertical timeline of steps */}
          <div ref={timelineRef} className="relative">
            {/* Enhanced rail with gradient */}
            <div className="absolute top-0 bottom-0 left-7 sm:left-7 hidden sm:flex justify-center">
              <div className="timeline-rail w-0.5 bg-gradient-to-b from-[#1FAE9F]/40 via-[#1FAE9F]/20 to-transparent h-full" />
            </div>

            <div className="space-y-6 md:space-y-8">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="step-row relative flex gap-4 sm:gap-7"
                  data-step={index}
                >
                  {/* Timeline Node (Visible on all screens now) */}
                  <div className="relative shrink-0 flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 z-10">
                    <span className="step-dot absolute inset-0 rounded-full bg-[#1FAE9F]/10 sm:bg-white sm:border sm:border-[#1FAE9F]/20 sm:shadow-sm" />
                    <div className="absolute inset-[2px] sm:inset-[3px] rounded-full bg-gradient-to-br from-[#1FAE9F] to-[#148f82] flex items-center justify-center">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2.5"
                        className="relative z-10"
                      >
                        {step.icon}
                      </svg>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 pb-2">
                    <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-7 ring-1 ring-[#0B1E33]/5 transition-all duration-300 hover:ring-[#1FAE9F]/20 hover:shadow-sm">
                      <div className="flex items-start gap-4">
                        <span
                          className={`${playfair.className} text-[#1FAE9F]/30 text-3xl sm:text-4xl font-bold leading-none mt-0.5 hidden sm:block`}
                        >
                          {step.number}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 sm:hidden mb-1">
                            <span
                              className={`${playfair.className} text-[#1FAE9F] text-lg font-bold`}
                            >
                              {step.number}
                            </span>
                            <span className="w-4 h-px bg-[#0B1E33]/10"></span>
                          </div>
                          <h4
                            className={`${playfair.className} text-[#0B1E33] text-lg sm:text-xl font-semibold mb-2`}
                          >
                            {step.title}
                          </h4>
                          <p
                            className={`${inter.className} text-[#6B7280] text-sm md:text-[15px] leading-relaxed`}
                          >
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights: light bento-style market snapshot */}
        <div ref={insightRef} className="grid lg:grid-cols-12 gap-4 md:gap-6">
          {/* Left: standalone image tile */}
          <div className="insight-image relative lg:col-span-5 min-h-[340px] rounded-[2rem] overflow-hidden group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[1400ms] ease-out group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1684575571081-d6abda485519?q=80&w=1600&auto=format&fit=crop')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E33]/90 via-[#0B1E33]/25 to-[#0B1E33]/10" />

            {/* live badge */}
            <div className="absolute top-5 left-5 flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full pl-3 pr-4 py-2 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1FAE9F] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1FAE9F]" />
              </span>
              <span
                className={`${inter.className} text-[#0B1E33] text-[11px] font-semibold tracking-[0.14em] uppercase`}
              >
                Live Market Pulse
              </span>
            </div>

            {/* bottom overlay: big stat + sparkline */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
              <div className="flex items-end gap-4">
                <div
                  className={`${playfair.className} text-white text-5xl font-semibold leading-none`}
                >
                  +12<span className="text-[#1FAE9F]">%</span>
                </div>
                <div className="pb-0.5">
                  <p
                    className={`${inter.className} text-white/85 text-xs leading-snug mb-0.5`}
                  >
                    Increase in home values over the last 6 months
                  </p>
                  <span
                    className={`${inter.className} text-white/50 text-[11px]`}
                  >
                    Las Vegas Market Update
                  </span>
                </div>
              </div>
              <svg
                viewBox="0 0 200 40"
                preserveAspectRatio="none"
                className="w-full h-10 mt-4"
                fill="none"
              >
                <path
                  d="M0 32 C 20 30, 30 26, 45 27 S 75 20, 95 21 S 130 12, 150 13 S 185 6, 200 4"
                  stroke="#1FAE9F"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M0 32 C 20 30, 30 26, 45 27 S 75 20, 95 21 S 130 12, 150 13 S 185 6, 200 4 L 200 40 L 0 40 Z"
                  fill="url(#sparkFill)"
                  opacity="0.25"
                />
                <defs>
                  <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1FAE9F" />
                    <stop offset="100%" stopColor="#1FAE9F" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Right: stacked light cards */}
          <div className="lg:col-span-7 flex flex-col gap-4 md:gap-6">
            {/* Heading card */}
            <div className="insight-panel relative bg-[#F5F7F8] rounded-[2rem] p-7 md:p-10 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full border-[24px] border-[#1FAE9F]/10 pointer-events-none" />
              <div className="relative z-10 flex items-start gap-5">
                <div className="hidden md:flex shrink-0 w-12 h-12 rounded-2xl bg-[#0B1E33] items-center justify-center shadow-md">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1FAE9F"
                    strokeWidth="2"
                  >
                    <path
                      d="M3 17l5-5 4 4 8-8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 8h6v6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <span
                    className={`${inter.className} text-[#1FAE9F] text-xs font-semibold tracking-[0.18em] uppercase mb-3 block`}
                  >
                    Real Data. Real Results.
                  </span>
                  <h3
                    className={`${playfair.className} text-[#0B1E33] text-2xl md:text-[2rem] font-semibold mb-3 leading-snug`}
                  >
                    Smarter Insights. Better Decisions.
                  </h3>
                  <p
                    className={`${inter.className} text-[#6B7280] text-sm md:text-[15px] leading-relaxed max-w-lg`}
                  >
                    We analyze thousands of data points in real time so you can
                    make confident, profitable decisions about your home.
                  </p>
                </div>
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
              {[
                { value: "21", label: "days avg. to sell" },
                { value: "60s", label: "to your Signal Score" },
                { value: "100%", label: "free, no obligation" },
              ].map((stat) => (
                <div key={stat.label} className="insight-stat">
                  <div className="h-full bg-white rounded-2xl p-5 md:p-6 ring-1 ring-[#0B1E33]/5 transition-all duration-300 hover:ring-[#1FAE9F]/25 hover:shadow-lg hover:-translate-y-1">
                    <div
                      className={`${playfair.className} text-[#0B1E33] text-3xl font-semibold leading-none mb-1.5`}
                    >
                      {stat.value}
                    </div>
                    <div
                      className={`${inter.className} text-[#6B7280] text-[11px] leading-tight mb-4`}
                    >
                      {stat.label}
                    </div>
                    <div className="h-1 w-8 rounded-full bg-gradient-to-r from-[#1FAE9F] to-[#1FAE9F]/20" />
                  </div>
                </div>
              ))}
            </div>

            {/* Feature check strip */}
            <div className="insight-stat bg-white rounded-2xl ring-1 ring-[#0B1E33]/5 px-6 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-3">
              {[
                "Live MLS & market data",
                "AI-powered pricing model",
                "Local market trends",
                "Neighborhood-level accuracy",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-[#1FAE9F]/10 flex items-center justify-center">
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1FAE9F"
                      strokeWidth="3"
                    >
                      <path
                        d="M5 12l4 4L19 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span
                    className={`${inter.className} text-[#0B1E33]/70 text-xs font-medium leading-snug`}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
