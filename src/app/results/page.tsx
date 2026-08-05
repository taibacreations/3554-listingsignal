"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Playfair_Display, Inter } from "next/font/google";

// 1. Import your screen components
import ResultsHero from "@/components/ResultsHero";
import EstimatedHomeValue from "@/components/EstimatedHomeValue";
import SignalToSell from "@/components/SignalToTell"
import YourProperty from "@/components/YourProperty";
import CtaBanner from "@/components/CtaBanner";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

const stats = [
  { value: "$485,000", label: "EST. VALUE", icon: "trend" as const },
  { value: "92", label: "SIGNAL SCORE", icon: "bars" as const },
  { value: "High", label: "CONFIDENCE", icon: "shield" as const },
];

const trustItems = [
  {
    title: "100% Secure",
    desc: "Bank-level encryption",
    icon: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 10V7.5C8 5.3 9.8 3.5 12 3.5C14.2 3.5 16 5.3 16 7.5V10" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Accurate Data",
    desc: "Live MLS & market insights",
    icon: (
      <>
        <path d="M3 12a9 9 0 1118 0 9 9 0 01-18 0z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 13l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Instant Results",
    desc: "See your home value in under 60 seconds",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

interface FormState {
  firstName: string;
  email: string;
  phone: string;
}

interface FormErrors {
  firstName?: string;
  email?: string;
  phone?: string;
}

export default function ResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const address = searchParams.get("address") ?? "";
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const [form, setForm] = useState<FormState>({
    firstName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State to toggle between the Form and the Report Screen
  const [showReport, setShowReport] = useState(false);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: FormErrors = {};

    if (!form.firstName.trim()) next.firstName = "First name is required.";

    if (!form.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }

    if (!form.phone.trim()) {
      next.phone = "Phone number is required.";
    } else if (!/^[\d\s()+-]{7,}$/.test(form.phone)) {
      next.phone = "Enter a valid phone number.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // TODO: replace with your actual lead-submission endpoint
      console.log("Submitting lead:", { address, lat, lng, ...form });

      // Trigger the new screen instead of navigating to a new route
      setShowReport(true);

      // Smoothly scroll to the top so the user sees the ResultsHero first
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================================
  // NEW SCREEN: Rendered after form submission
  // ==========================================
  if (showReport) {
    return (
      <main className="min-h-screen bg-[#F3F5F7]">
        {/* ================================================
            SHARED BACKGROUND WRAPPER
            The house photo flows behind the hero + value card,
            then fades into the page bg — exactly like the mockup.
            ================================================ */}
        <div className="relative overflow-hidden">
          {/* house photo */}
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/bgg.png')" }}
            aria-hidden="true"
          />
          {/* vertical fade into page bg */}
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(243,245,247,0.55)_0%,rgba(243,245,247,0.25)_30%,rgba(243,245,247,0.6)_72%,#F3F5F7_100%)]"
            aria-hidden="true"
          />
          {/* soft white glow behind the headline */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_48%_at_50%_16%,rgba(243,245,247,0.92)_0%,rgba(243,245,247,0.5)_55%,rgba(243,245,247,0)_100%)]"
            aria-hidden="true"
          />

          <ResultsHero location={address || "casc, Las Vegas, NV"} />
          <EstimatedHomeValue />
        </div>

        {/* Everything below sits on the plain page bg */}
        <SignalToSell />
        <YourProperty imageSrc="/bgg.png" />
        <CtaBanner />
      </main>
    );
  }

  // ==========================================
  // ORIGINAL SCREEN: Lead Capture Form
  // ==========================================
  return (
    <div className="relative w-full bg-[#F3F5F7] overflow-hidden min-h-[90vh] flex justify-center items-center md:py-0 py-[10vh]">
      <div className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-white/95" />

      <div className="relative z-10 max-w-[1200px] px-4 md:px-6 xl:px-10 mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* Left panel */}
          <div
            className="relative bg-[#0B1E33] px-6 sm:px-8 py-8 sm:py-10 flex flex-col bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(11,30,51,0.75), rgba(11,30,51,0.95)), url('/bg.png')",
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1FAE9F] inline-block" />
              <span className={`${inter.className} text-[#1FAE9F] text-xs font-semibold tracking-wide uppercase`}>
                Your Home Value Is Ready
              </span>
            </div>

            <h2 className={`${playfair.className} text-white text-2xl sm:text-3xl font-semibold leading-tight`}>
              We found 4 recent sales <span className="text-[#1FAE9F]">near your home.</span>
            </h2>

            <p className={`${inter.className} text-white/70 text-sm mt-4`}>
              Enter your details to see what your home could sell for right now.
            </p>

            {/* Pulse icon over house image area */}
            <div className="flex-1 min-h-[180px] flex items-center justify-center py-6">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-[#1FAE9F]/40" />
                <div className="absolute inset-0 rounded-full border-2 border-[#1FAE9F] border-r-transparent border-b-transparent animate-spin" />
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1FAE9F" strokeWidth="2">
                  <path d="M3 12h4l2-7 4 14 2-7h6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-auto">
              {stats.map((s) => (
                <div key={s.label} className="bg-white/10 rounded-xl px-2 sm:px-3 py-3 flex flex-col gap-1.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1FAE9F" strokeWidth="2">
                    {s.icon === "trend" && (
                      <path d="M3 17l6-6 4 4 8-8M15 7h6v6" strokeLinecap="round" strokeLinejoin="round" />
                    )}
                    {s.icon === "bars" && (
                      <>
                        <rect x="4" y="14" width="3" height="6" />
                        <rect x="10.5" y="10" width="3" height="10" />
                        <rect x="17" y="6" width="3" height="14" />
                      </>
                    )}
                    {s.icon === "shield" && (
                      <path
                        d="M12 2L4.5 5V10.5C4.5 15.2 7.6 19.5 12 21.5C16.4 19.5 19.5 15.2 19.5 10.5V5L12 2Z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                  </svg>
                  <span className={`${inter.className} text-white text-sm sm:text-base font-semibold`}>{s.value}</span>
                  <span className={`${inter.className} text-white/50 text-[10px] tracking-wide`}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel - form */}
          <div className="px-6 sm:px-8 py-8 sm:py-10 flex flex-col">
            <div>
              <label className={`${inter.className} text-[#0B1E33] text-sm font-medium block mb-2`}>
                Property location
              </label>
              <div className="flex items-center justify-between bg-[#F3F5F7] rounded-xl px-4 py-3 mb-5">
                <div className="flex items-center gap-2 min-w-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#E85D75" className="shrink-0">
                    <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
                  </svg>
                  <span className={`${inter.className} text-[#0B1E33] text-sm truncate`}>
                    {address || "No address provided"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className={`${inter.className} text-[#1FAE9F] text-sm font-medium shrink-0`}
                >
                  Edit
                </button>
              </div>

              <label className={`${inter.className} text-[#0B1E33] text-sm font-medium block mb-2`}>
                First Name
              </label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                placeholder="e.g. Sarah"
                className={`${inter.className} w-full bg-white border rounded-xl px-4 py-3 text-sm text-[#0B1E33] placeholder:text-gray-400 outline-none focus:border-[#1FAE9F] mb-1 ${
                  errors.firstName ? "border-[#E85D75]" : "border-[#0B1E33]/10"
                }`}
              />
              {errors.firstName && (
                <p className={`${inter.className} text-[#E85D75] text-xs mb-4`}>{errors.firstName}</p>
              )}
              {!errors.firstName && <div className="mb-4" />}

              <label className={`${inter.className} text-[#0B1E33] text-sm font-medium block mb-2`}>
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="you@email.com"
                className={`${inter.className} w-full bg-white border rounded-xl px-4 py-3 text-sm text-[#0B1E33] placeholder:text-gray-400 outline-none focus:border-[#1FAE9F] mb-1 ${
                  errors.email ? "border-[#E85D75]" : "border-[#0B1E33]/10"
                }`}
              />
              {errors.email && (
                <p className={`${inter.className} text-[#E85D75] text-xs mb-4`}>{errors.email}</p>
              )}
              {!errors.email && <div className="mb-4" />}

              <label className={`${inter.className} text-[#0B1E33] text-sm font-medium block mb-2`}>
                Phone Number
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="(702) 000-0000"
                className={`${inter.className} w-full bg-white border rounded-xl px-4 py-3 text-sm text-[#0B1E33] placeholder:text-gray-400 outline-none focus:border-[#1FAE9F] mb-1 ${
                  errors.phone ? "border-[#E85D75]" : "border-[#0B1E33]/10"
                }`}
              />
              {errors.phone && (
                <p className={`${inter.className} text-[#E85D75] text-xs mb-4`}>{errors.phone}</p>
              )}
              {!errors.phone && <div className="mb-6" />}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`${inter.className} w-full bg-[#1FAE9F] hover:bg-[#1a9a8c] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl py-3.5 flex items-center justify-center gap-2 transition-colors`}
              >
                {isSubmitting ? "Submitting..." : "Show Me My Home Value"}
                {!isSubmitting && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 mt-4">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1FAE9F"
                  strokeWidth="2"
                  className="shrink-0"
                >
                  <path
                    d="M12 2L4.5 5V10.5C4.5 15.2 7.6 19.5 12 21.5C16.4 19.5 19.5 15.2 19.5 10.5V5L12 2Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M8.5 12L11 14.5L15.8 9.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className={`${inter.className} text-[#0B1E33]/50 text-xs text-center`}>
                  We never sell your data. No spam — ever.
                </span>
              </div>
            </div>

            {/* Trust row */}
            <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-[#0B1E33]/10">
              {trustItems.map((t) => (
                <div key={t.title} className="flex items-start gap-1.5">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0B1E33"
                    strokeOpacity="0.5"
                    strokeWidth="1.8"
                    className="shrink-0 mt-0.5"
                  >
                    {t.icon}
                  </svg>
                  <div className="min-w-0">
                    <div className={`${inter.className} text-[#0B1E33] text-xs font-semibold leading-tight`}>
                      {t.title}
                    </div>
                    <div className={`${inter.className} text-[#0B1E33]/40 text-[10px] leading-snug mt-0.5`}>
                      {t.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}