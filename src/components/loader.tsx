"use client";

import { useEffect, useState } from "react";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

const stepDefs = [
  {
    number: 1,
    title: "Locating recent sales near your home",
    desc: "Analyzing comparable properties and recent sales in your neighborhood.",
  },
  {
    number: 2,
    title: "Checking what buyers are paying in your area",
    desc: "Reviewing current market trends and buyer behavior in your area.",
  },
  {
    number: 3,
    title: "Building your personalized home report",
    desc: "Putting it all together to create your detailed home value report.",
  },
];

const features = [
  {
    title: "100% Secure & Private",
    desc: "Your information is encrypted and never shared.",
    icon: (
      <>
        <path d="M12 2L4.5 5V10.5C4.5 15.2 7.6 19.5 12 21.5C16.4 19.5 19.5 15.2 19.5 10.5V5L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.5 12L11 14.5L15.8 9.7" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Fast & Accurate",
    desc: "Results in under 60 seconds",
    icon: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: "No Commitment",
    desc: "Zero obligation 100% free",
    icon: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 10V7.5C8 5.3 9.8 3.5 12 3.5C14.2 3.5 16 5.3 16 7.5V10" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="14.5" r="1.3" fill="#1FAE9F" stroke="none" />
        <path d="M12 15.8V17.5" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Updated Daily",
    desc: "Our data is refreshed every 24 hours",
    icon: <path d="M4 12a8 8 0 0114-5.3M20 12a8 8 0 01-14 5.3M4 4v5h5M20 20v-5h-5" strokeLinecap="round" strokeLinejoin="round" />,
  },
];

interface HomeDataLoadingProps {
  address: string;
  duration?: number; // total ms, default 4000
  onComplete: () => void;
}

export default function HomeDataLoading({
  address,
  duration = 4000,
  onComplete,
}: HomeDataLoadingProps) {
  const [activeStep, setActiveStep] = useState(0); // index of the step currently "in-progress"

  useEffect(() => {
    const stepDuration = duration / stepDefs.length;

    const timers: ReturnType<typeof setTimeout>[] = [];

    // advance to next step every stepDuration
    stepDefs.forEach((_, i) => {
      if (i === 0) return; // step 0 starts active immediately
      timers.push(
        setTimeout(() => setActiveStep(i), stepDuration * i)
      );
    });

    // fire completion callback after full duration
    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration);
    timers.push(completeTimer);

    return () => timers.forEach(clearTimeout);
  }, [duration, onComplete]);

  const steps = stepDefs.map((s, i) => ({
    ...s,
    status:
      i < activeStep ? ("completed" as const)
      : i === activeStep ? ("in-progress" as const)
      : ("pending" as const),
  }));

  return (
    <div className="fixed inset-0 z-[100] w-full h-full bg-[#F3F5F7] overflow-y-auto animate-[fadeIn_0.35s_ease-out]">
      <div className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-white/95" />
      <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col items-center py-16 px-4">
        {/* Pulse icon */}
        <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-[#0B1E33]/10" />
          <div className="absolute inset-0 rounded-full border-4 border-[#1FAE9F] border-r-transparent border-b-transparent animate-spin" />
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1FAE9F" strokeWidth="2">
            <path d="M3 12h4l2-7 4 14 2-7h6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className={`${playfair.className} text-[#0B1E33] text-[24px] md:text-3xl font-semibold text-center`}>
          Pulling your <span className="text-[#1FAE9F]">home data</span>...
        </h1>
        <p className={`${inter.className} text-[#0B1E33]/60 text-[14px] text-center mt-3 max-w-lg`}>
          We&apos;re collecting the most accurate and up-to-date information to give you the best home value estimate.
        </p>

        {/* Address pill — now dynamic */}
        <div className="bg-white rounded-full flex items-center gap-2 px-4 py-2 mt-5 shadow-sm max-w-[90%]">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1FAE9F" strokeWidth="2" className="shrink-0">
            <path d="M3 11.5L12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={`${inter.className} text-[#0B1E33] text-sm font-medium truncate`}>
            {address || "Locating your address..."}
          </span>
        </div>

        {/* Steps card */}
        <div className="w-full max-w-[70%] lg:max-w-3xl bg-white rounded-2xl shadow-sm mt-8 overflow-hidden">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`flex items-center justify-between gap-4 px-5 lg:px-6 py-5 flex-col md:flex-row transition-colors duration-300 ${
                step.status === "in-progress" ? "bg-[#1FAE9F]/5" : "bg-white"
              } ${i !== steps.length - 1 ? "border-b border-[#0B1E33]/5" : ""}`}
            >
              <div className="flex items-start gap-4 min-w-0">
                <div className="relative shrink-0">
                  {step.status === "completed" && (
                    <div className="size-8 sm:size-9 lg:size-10 xl:size-11 rounded-full bg-[#1FAE9F] flex items-center justify-center">
                      <svg className="size-4 sm:size-5 lg:size-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <path d="M5 12l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                  {step.status === "in-progress" && (
                    <div className="size-8 sm:size-9 lg:size-10 xl:size-11 rounded-full bg-[#1FAE9F] flex items-center justify-center">
                      <div className="size-5 sm:size-4 lg:size-7 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    </div>
                  )}
                  {step.status === "pending" && (
                    <div className="size-8 sm:size-9 lg:size-10 xl:size-11 rounded-full bg-[#0B1E33]/10 flex items-center justify-center">
                      <span className={`${inter.className} text-sm sm:text-base lg:text-lg xl:text-xl font-semibold text-[#0B1E33]/50`}>
                        {step.number}
                      </span>
                    </div>
                  )}
                  {i !== steps.length - 1 && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-8 sm:top-9 lg:top-10 xl:top-11 w-0.5 h-8 sm:h-10 lg:h-12 border-l-2 border-dashed border-[#0B1E33]/10" />
                  )}
                </div>
                <div>
                  <h3 className={`${playfair.className} text-[#0B1E33] text-sm md:text-[14px] lg:text-[16px] font-semibold`}>
                    {step.title}
                  </h3>
                  <p className={`${inter.className} text-[#0B1E33]/60 text-xs md:text-[12px] lg:text-[14px] mt-1 max-w-sm`}>
                    {step.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {step.status === "completed" && (
                  <>
                    <span className={`${inter.className} bg-[#1FAE9F]/10 text-[#1FAE9F] text-xs font-medium rounded-full px-3 py-1`}>
                      Completed
                    </span>
                    <span className="flex items-center justify-center rounded-full bg-[#1FAE9F]/10 p-1">
                      <svg className="size-5 lg:size-6" viewBox="0 0 24 24" fill="none" stroke="#1FAE9F" strokeWidth={3}>
                        <path d="M5 12l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </>
                )}
                {step.status === "in-progress" && (
                  <>
                    <span className={`${inter.className} bg-[#1FAE9F]/10 text-[#1FAE9F] text-xs font-medium rounded-full px-3 py-1`}>
                      In Progress
                    </span>
                    <div className="size-5 lg:size-6 rounded-full border-2 border-[#1FAE9F] border-t-transparent animate-spin" />
                  </>
                )}
                {step.status === "pending" && (
                  <>
                    <span className={`${inter.className} bg-[#0B1E33]/5 text-[#0B1E33]/50 text-xs font-medium rounded-full px-3 py-1`}>
                      Pending
                    </span>
                    <svg className="size-5 lg:size-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#0B1E33" strokeOpacity="0.4" strokeWidth={2}>
                      <rect x="4" y="10" width="16" height="11" rx="3" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8 10V7.5C8 5.3 9.8 3.5 12 3.5C14.2 3.5 16 5.3 16 7.5V10" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="14.5" r="1.3" fill="#1FAE9F" stroke="none" />
                      <path d="M12 15.8V17.5" strokeLinecap="round" />
                    </svg>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Feature strip */}
        <div className="w-full max-w-[90%] xl:max-w-[1050px] bg-white rounded-2xl shadow-sm mt-6 px-4 py-6 lg:px-8 lg:py-10 xl:py-12 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 lg:gap-5 xl:gap-6">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-1 lg:gap-2 xl:gap-3">
              <svg className="size-10 sm:size-10 lg:size-12 xl:size-[50px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="#1FAE9F" strokeWidth={1.5}>
                {f.icon}
              </svg>
              <div>
                <h4 className={`${inter.className} text-[#0B1E33] text-[10px] lg:text-[12px] xl:text-[14px] font-semibold`}>{f.title}</h4>
                <p className={`${inter.className} text-[#0B1E33]/50 text-[9px] lg:text-[10px] xl:text-[12px] mt-0.5 leading-snug`}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}