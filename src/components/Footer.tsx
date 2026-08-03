"use client";

import { useEffect, useRef } from "react";
import { Playfair_Display, Inter } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });
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
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="w-full bg-[#0B1E33] py-10 border-t border-white/[0.06]">
      <div className="max-w-[1440px] px-4 md:px-6 xl:px-10 mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand + social */}
        <div className="footer-col flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-white rounded-md p-1.5 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B1E33" strokeWidth="2.5">
                <path d="M3 11.5L12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className={`${playfair.className} text-white text-base font-semibold`}>
              Listing Signal<sup className="text-xs align-super text-[#1FAE9F]">®</sup>
            </span>
          </div>
          <p className={`${inter.className} text-white/50 text-xs leading-relaxed max-w-xs`}>
            Real-time home value insights, powered by live data and AI.
          </p>
          <div className="flex items-center gap-3">
            <span className={`${inter.className} text-white/50 text-xs`}>Follow us</span>
            <div className="flex items-center gap-2">
              {[
                <path key="fb" d="M14 9h2V6h-2c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V9.5c0-.3.2-.5.5-.5H16" />,
                <path
                  key="tw"
                  d="M20 6.3c-.6.3-1.3.5-2 .6.7-.4 1.3-1.1 1.5-2-.7.4-1.5.7-2.3.9A3.6 3.6 0 0011.5 9c0 .3 0 .6.1.8-3-.1-5.6-1.6-7.4-3.8-.3.6-.5 1.2-.5 1.9 0 1.3.7 2.5 1.7 3.1-.6 0-1.2-.2-1.7-.5v.1c0 1.8 1.3 3.3 3 3.7-.3.1-.6.1-1 .1-.2 0-.5 0-.7-.1.5 1.5 1.9 2.6 3.6 2.6A7.2 7.2 0 014 18.5 10.1 10.1 0 0010 20c6.3 0 9.7-5.2 9.7-9.7v-.4c.7-.5 1.3-1.1 1.7-1.8"
                />,
                <path
                  key="in"
                  d="M6.5 9H4v10h2.5V9zM5.3 4.5A1.5 1.5 0 105.3 7.5 1.5 1.5 0 005.3 4.5zM20 13.4c0-3-1.6-4.4-3.7-4.4-1.7 0-2.5 1-2.9 1.6V9H10.9c0 .7 0 10 0 10h2.5v-5.6c0-.3 0-.6.1-.8.2-.6.8-1.3 1.7-1.3 1.2 0 1.7 1 1.7 2.3V19H20v-5.6z"
                />,
              ].map((path, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-7 h-7 rounded-full bg-white/[0.06] hover:bg-[#1FAE9F]/20 flex items-center justify-center transition-colors"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                    {path}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Data security note */}
        <div className="footer-col flex flex-col gap-2 md:justify-self-center">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1FAE9F" strokeWidth="2" className="shrink-0">
              <path d="M12 2L4.5 5V10.5C4.5 15.2 7.6 19.5 12 21.5C16.4 19.5 19.5 15.2 19.5 10.5V5L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={`${inter.className} text-white text-sm font-semibold`}>Your data is secure</span>
          </div>
          <p className={`${inter.className} text-white/50 text-xs leading-relaxed max-w-xs`}>
            We use bank-level encryption to protect your information.
          </p>
        </div>

        {/* Email signup */}
        <div className="footer-col bg-white/[0.04] border border-white/10 rounded-2xl p-5 flex flex-col gap-3">
          <span className={`${inter.className} text-white text-sm font-semibold`}>Stay Updated</span>
          <p className={`${inter.className} text-white/50 text-xs leading-relaxed`}>
            Get local market updates and tips straight to your inbox.
          </p>
          <div className="flex items-center bg-white rounded-full p-1 gap-1">
            <input
              type="email"
              placeholder="Enter your email"
              className={`${inter.className} flex-1 min-w-0 outline-none text-xs text-[#0B1E33] placeholder:text-gray-400 px-3 py-1.5`}
            />
            <button className="bg-[#1FAE9F] hover:bg-[#189184] text-white rounded-full w-7 h-7 flex items-center justify-center shrink-0 transition-colors">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-col max-w-[1440px] mx-auto border-t border-white/[0.06] mt-8 pt-5 px-4 md:px-6 xl:px-10">
        <p className={`${inter.className} text-white/30 text-xs text-center`}>
          © 2026 Listing Signal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}