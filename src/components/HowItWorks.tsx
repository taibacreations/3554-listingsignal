"use client";

import { useEffect, useRef } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const steps = [
  {
    emoji: "🏠",
    title: "Enter your address",
    description:
      "We pull live market data specific to your home and neighborhood — not a generic estimate.",
  },
  {
    emoji: "📊",
    title: "See your home value",
    description:
      "Your estimated value, Signal Score, and how your home compares to what's actually selling right now.",
  },
  {
    emoji: "⏱️",
    title: "Know your timing",
    description:
      "Find out if now is the right moment — based on real buyer demand and inventory in your area.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      // Eyebrow
      tl.fromTo(
        ".hiw-eyebrow",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
      );

      // Mobile stacked rows — fade up one by one
      tl.fromTo(
        ".hiw-mobile-row",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 },
        "-=0.25",
      );

      // Desktop cards — fade up with stagger
      tl.fromTo(
        ".hiw-desktop-card",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.14 },
        "<", // same start time as mobile rows (only one set visible at a time)
      );

      // Connector arrows pop in after cards
      tl.fromTo(
        ".hiw-arrow",
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.35, stagger: 0.1, ease: "back.out(2)" },
        "-=0.3",
      );

      // Stat card slides up last
      tl.fromTo(
        ".hiw-stat",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.55 },
        "-=0.2",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-12.5 md:py-20 lg:py-25"
    >
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 xl:px-10">

        {/* Eyebrow */}
        <p
          className={`hiw-eyebrow ${inter.className} mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0B1E33]/40 md:mb-10`}
        >
          How It Works
        </p>

        {/* ── MOBILE: stacked card ── */}
        <div className="overflow-hidden rounded-2xl border border-[#0B1E33]/[0.07] bg-white shadow-[0_4px_24px_-8px_rgba(11,30,51,0.10)] md:hidden">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`hiw-mobile-row flex items-start gap-4 px-5 py-5 ${
                i !== steps.length - 1 ? "border-b border-[#0B1E33]/[0.06]" : ""
              }`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EAF6F4] text-2xl">
                {step.emoji}
              </div>
              <div className="min-w-0 pt-0.5">
                <h3
                  className={`${inter.className} text-[15px] font-semibold text-[#0B1E33]`}
                >
                  {step.title}
                </h3>
                <p
                  className={`${inter.className} mt-1 text-sm leading-relaxed text-[#0B1E33]/55`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── DESKTOP: 3 columns ── */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="hiw-desktop-card relative flex flex-col items-start rounded-2xl border border-[#0B1E33]/[0.07] bg-white p-7 shadow-[0_4px_24px_-8px_rgba(11,30,51,0.10)] lg:p-8"
            >
              {/* Emoji icon */}
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#EAF6F4] text-3xl">
                {step.emoji}
              </div>

              {/* Connector arrow */}
              {i !== steps.length - 1 && (
                <div className="hiw-arrow absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 md:flex">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#0B1E33]/[0.08] bg-white shadow-sm">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1FAE9F"
                      strokeWidth="2.5"
                    >
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              )}

              <h3
                className={`${inter.className} mb-2 text-[16px] font-semibold text-[#0B1E33]`}
              >
                {step.title}
              </h3>
              <p
                className={`${inter.className} text-sm leading-relaxed text-[#0B1E33]/55`}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── Bottom stat card ── */}
        <div className="hiw-stat mt-4 flex items-center gap-4 rounded-2xl bg-[#13385F] px-5 py-5 sm:px-7 sm:py-6 md:mt-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#1B4F6B] text-2xl">
            📈
          </div>
          <div>
            <p
              className={`${inter.className} text-[28px] font-bold leading-none text-[#1FAE9F] sm:text-[32px]`}
            >
              21 days
            </p>
            <p
              className={`${inter.className} mt-1 text-sm font-semibold text-white`}
            >
              Average time to sell
            </p>
            <p
              className={`${inter.className} mt-0.5 text-xs leading-snug text-[#6E88A1]`}
            >
              For Las Vegas homeowners who acted within 30 days of their Signal
              Score
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}