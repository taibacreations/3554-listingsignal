"use client";

import { useEffect, useRef } from "react";
import { Playfair_Display, Inter } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface CtaBannerProps {
  onCtaClick?: () => void;
}

export default function CtaBanner({ onCtaClick }: CtaBannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      tl.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.97,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
        },
      )
        .fromTo(
          ".cta-icon",
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
          },
          "-=0.5",
        )
        .fromTo(
          ".cta-eyebrow",
          {
            opacity: 0,
            y: 12,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.4",
        )
        .fromTo(
          ".cta-headline span",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
          },
          "-=0.4",
        )
        .fromTo(
          ".cta-subtext",
          {
            opacity: 0,
            y: 14,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.4",
        )
        .fromTo(
          ".cta-features",
          {
            opacity: 0,
            y: 14,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.35",
        )
        .fromTo(
          buttonRef.current,
          {
            opacity: 0,
            y: 16,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: "back.out(1.7)",
          },
          "-=0.4",
        )
        .fromTo(
          ".cta-trust",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.5,
          },
          "-=0.3",
        );

      // Subtle icon pulse
      gsap.to(".cta-icon-glow", {
        scale: 1.12,
        opacity: 0.65,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-[50px] md:py-[80px] lg:py-[100px]"
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 xl:px-10">
        <div
          ref={cardRef}
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            md:rounded-[2.5rem]
            bg-[#0B1E33]
            shadow-[0_40px_80px_-30px_rgba(11,30,51,0.5)]
          "
        >
          {/* Background gradients */}
          <div
            className="
              absolute inset-0
              pointer-events-none
              bg-[radial-gradient(ellipse_70%_70%_at_50%_30%,rgba(31,174,159,0.16),transparent_70%)]
            "
          />

          <div
            className="
              absolute inset-0
              pointer-events-none
              bg-[radial-gradient(ellipse_50%_60%_at_50%_100%,rgba(31,174,159,0.08),transparent_65%)]
            "
          />

          {/* Decorative glow */}
          <div
            className="
              absolute
              top-[-120px]
              left-1/2
              -translate-x-1/2
              w-[300px]
              h-[300px]
              rounded-full
              bg-[#1FAE9F]/10
              blur-[100px]
              pointer-events-none
            "
          />

          {/* Main content */}
          <div className="relative z-10 px-5 md:px-8 lg:px-12 py-9 md:py-12 lg:py-14">
            <div className="max-w-[700px] mx-auto text-center">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div
                  className="
          cta-icon-glow
          cta-icon
          relative
          w-9 h-9
          rounded-full
          bg-[#1FAE9F]/15
          flex items-center justify-center
          ring-2 ring-[#1FAE9F]/20
        "
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1FAE9F"
                    strokeWidth="2"
                  >
                    <path
                      d="M3 11.5L12 4l9 7.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Eyebrow */}
              <div
                className={`${inter.className} cta-eyebrow text-[#1FAE9F] text-[10px] md:text-xs font-semibold tracking-[0.16em] uppercase mb-3`}
              >
                Free Home Valuation
              </div>

              {/* Headline */}
              <h2
                className={`${playfair.className} cta-headline text-white text-2xl sm:text-3xl md:text-4xl font-semibold leading-[1.1] mb-4`}
              >
                <span className="inline-block">Ready to See What</span>{" "}
                <span className="inline-block">Your Home Is</span>{" "}
                <span className="inline-block text-[#1FAE9F]">
                  Really Worth?
                </span>
              </h2>

              {/* Description */}
              <p
                className={`${inter.className} cta-subtext text-white/60 text-sm md:text-base leading-relaxed max-w-[560px] mx-auto mb-5`}
              >
                Get your free, data-backed home value estimate in under 60
                seconds. No agents, no pressure — just clear insights for
                confident decisions.
              </p>

              {/* Benefits */}
              <div className="cta-features flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-6">
                <div
                  className={`${inter.className} flex items-center gap-1.5 text-white/70 text-xs`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1FAE9F"
                    strokeWidth="2.5"
                  >
                    <path
                      d="M5 12l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  100% Free & Confidential
                </div>

                <div
                  className={`${inter.className} flex items-center gap-1.5 text-white/70 text-xs`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1FAE9F"
                    strokeWidth="2.5"
                  >
                    <path
                      d="M5 12l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Results in 60 Seconds
                </div>

                <div
                  className={`${inter.className} flex items-center gap-1.5 text-white/70 text-xs`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1FAE9F"
                    strokeWidth="2.5"
                  >
                    <path
                      d="M5 12l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  No Obligation
                </div>
              </div>

              {/* CTA */}
              <div className="flex justify-center">
                {onCtaClick ? (
                  <button
                    type="button"
                    ref={buttonRef}
                    onClick={onCtaClick}
                    className={`
    ${inter.className}
    group
    bg-[#1FAE9F]
    hover:bg-[#189184]
    text-white
    text-xs md:text-sm
    font-semibold
    rounded-full
    px-6 md:px-7
    py-3
    inline-flex
    items-center
    justify-center
    gap-2
    transition-all
    hover:shadow-[0_10px_30px_-8px_rgba(31,174,159,0.5)]
    hover:-translate-y-0.5
  `}
                  >
                    Get My Free Home Value
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href="/#home"
                    ref={buttonRef}
                    className={`
    ${inter.className}
    group
    bg-[#1FAE9F]
    hover:bg-[#189184]
    text-white
    text-xs md:text-sm
    font-semibold
    rounded-full
    px-6 md:px-7
    py-3
    inline-flex
    items-center
    justify-center
    gap-2
    transition-all
    hover:shadow-[0_10px_30px_-8px_rgba(31,174,159,0.5)]
    hover:-translate-y-0.5
  `}
                  >
                    Get My Free Home Value
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                )}
              </div>

              {/* Trust */}
              <p
                className={`${inter.className} cta-trust text-white/40 text-[10px] mt-3`}
              >
                Trusted by homeowners
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}