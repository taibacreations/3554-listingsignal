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
      "See your estimated value and how your home compares to what's selling right now.",
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
      "Find out if now is the right moment based on real buyer demand and inventory in your area.",
  },
];

const benefits = [
  {
    title: "Live Market Data",
    description:
      "Get insights based on current market activity around your home.",
  },
  {
    title: "Local Market Trends",
    description:
      "Understand what's happening in your neighborhood and surrounding area.",
  },
  {
    title: "Data-Backed Insights",
    description:
      "Make decisions with a clear picture of where your home stands today.",
  },
  {
    title: "No Pressure",
    description:
      "Get the information you need without agents, sales pressure, or obligation.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const insightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".how-eyebrow, .how-heading, .how-subtext",
        {
          opacity: 0,
          y: 16,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
          },
        },
      );

      // Intro animation
      gsap.fromTo(
        ".intro-item",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 78%",
          },
        },
      );

      // Timeline rail
      gsap.fromTo(
        ".timeline-rail",
        {
          scaleY: 0,
        },
        {
          scaleY: 1,
          duration: 1.2,
          ease: "power2.inOut",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
          },
        },
      );

      // Steps animation
      const rows = gsap.utils.toArray<HTMLElement>(".step-row");

      rows.forEach((row, index) => {
        gsap.fromTo(
          row,
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 75%",
            },
          },
        );

        gsap.fromTo(
          row.querySelector(".step-dot"),
          {
            scale: 0,
          },
          {
            scale: 1,
            duration: 0.5,
            delay: index * 0.15 + 0.15,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 75%",
            },
          },
        );
      });

      // Bottom section heading
      gsap.fromTo(
        ".insight-heading",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: insightRef.current,
            start: "top 82%",
          },
        },
      );

      // Benefit cards
      gsap.fromTo(
        ".benefit-card",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: insightRef.current,
            start: "top 82%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full rounded-t-[2.5rem] bg-white pt-[50px] md:pt-[80px] lg:pt-[100px]"
    >
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 xl:px-10">

        {/* =========================
            HEADER
        ========================= */}
        <div className="how-header mx-auto mb-14 max-w-2xl text-center md:mb-16">
          <div className="how-eyebrow mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#1FAE9F]/40" />

            <span
              className={`${inter.className} text-xs font-semibold uppercase tracking-[0.18em] text-[#1FAE9F]`}
            >
              How It Works
            </span>

            <span className="h-px w-8 bg-[#1FAE9F]/40" />
          </div>

          <h2
            className={`${playfair.className} how-heading mb-4 text-3xl font-semibold leading-[1.15] text-[#0B1E33] md:text-[2.75rem]`}
          >
            Get Your Home Value in 3 Simple Steps
          </h2>

          <p
            className={`${inter.className} how-subtext text-sm leading-relaxed text-[#6B7280] md:text-base`}
          >
            No obligation. No pressure. Just clarity and a data-backed picture
            of where your home stands today.
          </p>
        </div>

        {/* =========================
            STEPS SECTION
        ========================= */}
        <div className="mb-20 grid gap-12 md:mb-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">

          {/* LEFT CONTENT */}
          <div
            ref={introRef}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <div className="intro-item relative">

              {/* Decorative glow */}
              <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#1FAE9F]/5 blur-3xl" />

              <span
                className={`${inter.className} relative z-10 mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-[#1FAE9F]`}
              >
                From Address To Answer
              </span>

              <h3
                className={`${playfair.className} relative z-10 mb-5 max-w-sm text-2xl font-semibold leading-snug text-[#0B1E33] md:text-3xl lg:text-4xl`}
              >
                Everything you need to know, in under sixty seconds.
              </h3>

              <p
                className={`${inter.className} relative z-10 max-w-sm text-base leading-relaxed text-[#6B7280]`}
              >
                We built this to feel less like a lead form and more like a
                second opinion — grounded in the same data your agent would
                pull, minus the sales pitch.
              </p>
            </div>
          </div>

          {/* RIGHT TIMELINE */}
          <div ref={timelineRef} className="relative">

            {/* Timeline rail */}
            <div className="absolute bottom-0 left-7 top-0 hidden sm:flex sm:justify-center">
              <div className="timeline-rail h-full w-0.5 origin-top bg-gradient-to-b from-[#1FAE9F]/40 via-[#1FAE9F]/20 to-transparent" />
            </div>

            <div className="space-y-6 md:space-y-8">

              {steps.map((step) => (
                <div
                  key={step.number}
                  className="step-row relative flex gap-4 sm:gap-7"
                >

                  {/* STEP ICON */}
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center sm:h-14 sm:w-14">

                    <span className="step-dot absolute inset-0 rounded-full bg-[#1FAE9F]/10 sm:border sm:border-[#1FAE9F]/20 sm:bg-white sm:shadow-sm" />

                    <div className="absolute inset-[2px] flex items-center justify-center rounded-full bg-gradient-to-br from-[#1FAE9F] to-[#148f82] sm:inset-[3px]">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2.5"
                      >
                        {step.icon}
                      </svg>
                    </div>
                  </div>

                  {/* STEP CARD */}
                  <div className="flex-1 pb-2">
                    <div className="rounded-2xl bg-white p-5 ring-1 ring-[#0B1E33]/5 transition-all duration-300 hover:shadow-sm hover:ring-[#1FAE9F]/20 sm:p-6 md:p-7">

                      <div className="flex items-start gap-4">

                        {/* Number desktop */}
                        <span
                          className={`${playfair.className} mt-0.5 hidden text-3xl font-bold leading-none text-[#1FAE9F]/30 sm:block sm:text-4xl`}
                        >
                          {step.number}
                        </span>

                        <div className="flex-1">

                          {/* Number mobile */}
                          <div className="mb-1 flex items-center gap-2 sm:hidden">
                            <span
                              className={`${playfair.className} text-lg font-bold text-[#1FAE9F]`}
                            >
                              {step.number}
                            </span>

                            <span className="h-px w-4 bg-[#0B1E33]/10" />
                          </div>

                          <h4
                            className={`${playfair.className} mb-2 text-lg font-semibold text-[#0B1E33] sm:text-xl`}
                          >
                            {step.title}
                          </h4>

                          <p
                            className={`${inter.className} text-sm leading-relaxed text-[#6B7280] md:text-[15px]`}
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

        {/* =========================
            INSIGHTS / BENEFITS
            NO STATS
        ========================= */}
        <div ref={insightRef}>

          {/* Heading */}
          <div className="insight-heading mx-auto mb-10 max-w-2xl text-center md:mb-12">

            <span
              className={`${inter.className} mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-[#1FAE9F]`}
            >
              Real Data. Real Insights.
            </span>

            <h3
              className={`${playfair.className} mb-4 text-2xl font-semibold leading-tight text-[#0B1E33] md:text-[2.2rem]`}
            >
              Smarter Insights. Better Decisions.
            </h3>

            <p
              className={`${inter.className} mx-auto max-w-xl text-sm leading-relaxed text-[#6B7280] md:text-base`}
            >
              We analyze the information around your home so you can make
              confident decisions without the pressure of a traditional sales
              process.
            </p>
          </div>

          {/* BENEFIT CARDS */}
          <div className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">

            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="benefit-card group rounded-2xl bg-[#F5F7F8] p-6 ring-1 ring-[#0B1E33]/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-[#1FAE9F]/20 md:p-7"
              >

                {/* Top */}
                <div className="mb-6 flex items-center justify-between">

                  <span
                    className={`${playfair.className} text-2xl font-semibold text-[#1FAE9F]/30`}
                  >
                    0{index + 1}
                  </span>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1FAE9F]/10 transition-colors group-hover:bg-[#1FAE9F]">

                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1FAE9F"
                      strokeWidth="2.5"
                      className="transition-colors group-hover:stroke-white"
                    >
                      <path
                        d="M5 12l4 4L19 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                  </div>
                </div>

                <h4
                  className={`${playfair.className} mb-2 text-lg font-semibold text-[#0B1E33]`}
                >
                  {benefit.title}
                </h4>

                <p
                  className={`${inter.className} text-sm leading-relaxed text-[#6B7280]`}
                >
                  {benefit.description}
                </p>
              </div>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
}