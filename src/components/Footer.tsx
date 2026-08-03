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
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-col",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
        },
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-full bg-[#0B1E33] relative overflow-hidden"
    >
      {/* Subtle background accents */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#1FAE9F]/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#1FAE9F]/5 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />

      <div className="max-w-[1440px] px-4 md:px-6 xl:px-10 mx-auto py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand + social */}
          <div className="footer-col flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <div className="bg-white rounded-lg p-2 flex items-center justify-center shrink-0">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0B1E33"
                  strokeWidth="2.5"
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
              <span
                className={`${playfair.className} text-white text-lg font-semibold`}
              >
                Listing Signal
                <sup className="text-xs align-super text-[#1FAE9F]">®</sup>
              </span>
            </div>
            <p
              className={`${inter.className} text-white/60 text-sm leading-relaxed max-w-xs`}
            >
              Real-time home value insights, powered by live data and AI.
            </p>
            <div>
              <span
                className={`${inter.className} text-white/40 text-xs font-medium tracking-wide uppercase mb-3 block`}
              >
                Follow us
              </span>
              <div className="flex items-center gap-2.5">
                {[
                  {
                    name: "Facebook",
                    path: "M14 9h2V6h-2c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V9.5c0-.3.2-.5.5-.5H16",
                  },
                  {
                    name: "Twitter",
                    path: "M20 6.3c-.6.3-1.3.5-2 .6.7-.4 1.3-1.1 1.5-2-.7.4-1.5.7-2.3.9A3.6 3.6 0 0011.5 9c0 .3 0 .6.1.8-3-.1-5.6-1.6-7.4-3.8-.3.6-.5 1.2-.5 1.9 0 1.3.7 2.5 1.7 3.1-.6 0-1.2-.2-1.7-.5v.1c0 1.8 1.3 3.3 3 3.7-.3.1-.6.1-1 .1-.2 0-.5 0-.7-.1.5 1.5 1.9 2.6 3.6 2.6A7.2 7.2 0 014 18.5 10.1 10.1 0 0010 20c6.3 0 9.7-5.2 9.7-9.7v-.4c.7-.5 1.3-1.1 1.7-1.8",
                  },
                  {
                    name: "LinkedIn",
                    path: "M6.5 9H4v10h2.5V9zM5.3 4.5A1.5 1.5 0 105.3 7.5 1.5 1.5 0 005.3 4.5zM20 13.4c0-3-1.6-4.4-3.7-4.4-1.7 0-2.5 1-2.9 1.6V9H10.9c0 .7 0 10 0 10h2.5v-5.6c0-.3 0-.6.1-.8.2-.6.8-1.3 1.7-1.3 1.2 0 1.7 1 1.7 2.3V19H20v-5.6z",
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    aria-label={social.name}
                    className="group w-9 h-9 rounded-lg bg-white/[0.06] hover:bg-[#1FAE9F]/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    {/* ✅ FIX: render the string as a real <path> element */}
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="white"
                      className="transition-colors group-hover:fill-[#1FAE9F]"
                    >
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Data security note */}
          <div className="footer-col flex flex-col gap-3 md:justify-self-center">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-[#1FAE9F]/10 flex items-center justify-center mt-0.5">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1FAE9F"
                  strokeWidth="2"
                >
                  <path
                    d="M12 2L4.5 5V10.5C4.5 15.2 7.6 19.5 12 21.5C16.4 19.5 19.5 15.2 19.5 10.5V5L12 2Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 12l2 2 4-4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <span
                  className={`${inter.className} text-white text-sm font-semibold block mb-1`}
                >
                  Your data is secure
                </span>
                <p
                  className={`${inter.className} text-white/50 text-xs leading-relaxed`}
                >
                  Bank-level encryption protects your information. We never sell
                  your data.
                </p>
              </div>
            </div>
          </div>

          {/* Email signup */}
          <div className="footer-col">
            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.08] rounded-2xl p-5 relative overflow-hidden">
              {/* Subtle accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1FAE9F]/10 rounded-full blur-2xl pointer-events-none translate-x-1/3 -translate-y-1/3" />

              <div className="relative z-10 flex flex-col gap-3">
                <div>
                  <span
                    className={`${inter.className} text-white text-sm font-semibold block mb-1.5`}
                  >
                    Stay Updated
                  </span>
                  <p
                    className={`${inter.className} text-white/60 text-xs leading-relaxed`}
                  >
                    Get local market updates and tips straight to your inbox.
                  </p>
                </div>
                <div className="flex items-center bg-white rounded-full p-1 gap-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`${inter.className} flex-1 min-w-0 outline-none text-sm text-[#0B1E33] placeholder:text-gray-400 px-4 py-2`}
                  />
                  <button className="bg-[#1FAE9F] hover:bg-[#189184] text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#1FAE9F]/20">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <p className={`${inter.className} text-white/40 text-[11px]`}>
                  No spam, unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-col border-t border-white/[0.06] mt-10 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className={`${inter.className} text-white/40 text-xs`}>
              © 2026 Listing Signal. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className={`${inter.className} text-white/40 text-xs hover:text-[#1FAE9F] transition-colors`}
              >
                Privacy
              </a>
              <a
                href="#"
                className={`${inter.className} text-white/40 text-xs hover:text-[#1FAE9F] transition-colors`}
              >
                Terms
              </a>
              <a
                href="#"
                className={`${inter.className} text-white/40 text-xs hover:text-[#1FAE9F] transition-colors`}
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
