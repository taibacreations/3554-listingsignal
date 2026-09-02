"use client";

import { useState, useEffect, useCallback } from "react";
import { Playfair_Display, Inter } from "next/font/google";

import ResultsHero from "@/components/ResultsHero";
import EstimatedHomeValue from "@/components/EstimatedHomeValue";
import SignalToSell from "@/components/SignalToTell";
import YourProperty from "@/components/YourProperty";
import ComparableSale from "./ComparableSale";
import LockedComparables from "./LockedComparables";
import LockedBookingCTA from "./LockedBookingCTA";
import {
  formatCurrency,
  formatCurrencyShort,
  estimateConfidence,
  formatConfidence,
} from "@/lib/format";
import type { SignalLabel } from "@/lib/signal-score";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

const stats = [
  { value: "$•••,•••", label: "EST. VALUE", icon: "trend" as const },
  { value: "••", label: "SIGNAL SCORE", icon: "bars" as const },
  { value: "••••••", label: "CONFIDENCE", icon: "shield" as const },
];

const trustItems = [
  {
    title: "100% Secure",
    desc: "Bank-level encryption",
    icon: (
      <>
        <rect
          x="4"
          y="10"
          width="16"
          height="11"
          rx="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 10V7.5C8 5.3 9.8 3.5 12 3.5C14.2 3.5 16 5.3 16 7.5V10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    title: "Accurate Data",
    desc: "Live MLS & market insights",
    icon: (
      <>
        <path
          d="M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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

interface ResultsSectionProps {
  place: {
    address: string;
    lat: number | null;
    lng: number | null;
  };
  onEditAddress: () => void;
}

/* =====================================================================
   SHAPE OF /api/property-report RESPONSE (see src/app/api/property-report/route.ts)
   ===================================================================== */
interface PropertyReportResponse {
  leadId: string;
  reportId: string;
  address: string;
  estimate: { price: number; priceRangeLow: number; priceRangeHigh: number };
  subjectProperty: {
    bedrooms?: number;
    bathrooms?: number;
    squareFootage?: number;
    yearBuilt?: number;
  };
  propertyDetails: {
    bedrooms: number | null;
    bathrooms: number | null;
    squareFootage: number | null;
    yearBuilt: number | null;
    estimated: boolean;
  };
  comparables: Array<{
    formattedAddress: string;
    distance: number;
    bedrooms: number | null;
    bathrooms: number | null;
    squareFootage: number | null;
    price: number | null;
    status?: string;
    daysOnMarket?: number;
    correlation: number;
  }>;
  marketStats: {
    medianPrice?: number;
    medianPricePerSquareFoot?: number;
  } | null;
  signal: {
    score: number;
    label: SignalLabel;
    raw: { momentumPct: number | null };
  };
}

function messageForLabel(label: SignalLabel): string {
  if (label === "Strong Signal") {
    return "Buyer demand is high and homes are moving fast in your neighborhood. This is a strong window to list.";
  }
  if (label === "Steady Signal") {
    return "Your neighborhood market is active and stable. Well-positioned homes are selling at a healthy pace.";
  }
  return "Buyer activity is building in your neighborhood. Homeowners who position early often see stronger offers than those who wait.";
}

export default function ResultsSection({
  place,
  onEditAddress,
}: ResultsSectionProps) {
  const address = place.address;
  const lat = place.lat;
  const lng = place.lng;

  const [form, setForm] = useState<FormState>({
    firstName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [showReport, setShowReport] = useState(false);
  const [report, setReport] = useState<PropertyReportResponse | null>(null);
  const [bookingStatus, setBookingStatus] = useState<"pending" | "confirmed">(
    "pending",
  );
  const [isCheckingBooking, setIsCheckingBooking] = useState(false);

  // Restore an in-progress report from the URL (?leadId=...) so refreshing
  // the page, or coming back from the GHL booking tab, doesn't lose it.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const leadId = params.get("leadId");
    if (!leadId || showReport) return;

    fetch(`/api/reports/${leadId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        setReport({
          leadId: data.leadId,
          reportId: data.leadId,
          address: data.address,
          estimate: data.estimate,
          subjectProperty: {},
          propertyDetails: data.propertyDetails,
          comparables: data.comparables,
          marketStats: data.marketStats,
          signal: { ...data.signal, raw: { momentumPct: null } },
        });
        setBookingStatus(
          data.bookingStatus === "confirmed" ? "confirmed" : "pending",
        );
        setShowReport(true);
      })
      .catch((error) =>
        console.error("Failed to restore report from URL:", error),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // While the report is showing and still locked, re-check booking status
  // whenever the tab regains focus (e.g. user comes back from the GHL
  // booking tab) — no manual refresh needed.
  const checkBookingStatusSilently = useCallback(async () => {
    if (!report || bookingStatus === "confirmed") return;
    try {
      const res = await fetch(`/api/reports/${report.leadId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.bookingStatus === "confirmed") setBookingStatus("confirmed");
      }
    } catch (error) {
      console.error("Silent booking status check failed:", error);
    }
  }, [report, bookingStatus]);

  useEffect(() => {
    if (!showReport) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkBookingStatusSilently();
      }
    };

    window.addEventListener("focus", checkBookingStatusSilently);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", checkBookingStatusSilently);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [showReport, checkBookingStatusSilently]);

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
    setSubmitError(null);

    try {
      const res = await fetch("/api/property-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          latitude: lat,
          longitude: lng,
          firstName: form.firstName,
          email: form.email,
          phone: form.phone,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          body.error ?? "Could not generate your report. Please try again.",
        );
      }

      const data: PropertyReportResponse = await res.json();

      setReport(data);
      setBookingStatus("pending");
      setShowReport(true);

      const url = new URL(window.location.href);
      url.searchParams.set("leadId", data.leadId);
      window.history.replaceState({}, "", url.toString());

      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckBookingStatus = async () => {
    setIsCheckingBooking(true);
    await checkBookingStatusSilently();
    setIsCheckingBooking(false);
  };

  if (showReport && report) {
    const topComp = report.comparables?.[0];
    const remainingComps = report.comparables?.slice(1) ?? [];
    const isUnlocked = bookingStatus === "confirmed";

    const confidencePct = estimateConfidence(
      report.estimate.price,
      report.estimate.priceRangeLow,
      report.estimate.priceRangeHigh,
    );

    return (
      <main className="min-h-screen bg-[#F3F5F7]">
        <div className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/bgg.png')" }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(243,245,247,0.55)_0%,rgba(243,245,247,0.25)_30%,rgba(243,245,247,0.6)_72%,#F3F5F7_100%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_48%_at_50%_16%,rgba(243,245,247,0.92)_0%,rgba(243,245,247,0.5)_55%,rgba(243,245,247,0)_100%)]"
            aria-hidden="true"
          />
          <ResultsHero
            location={report.address || address || "Las Vegas, NV"}
            reportMode={true}
            realEstValue={formatCurrency(report.estimate.price)}
            realSignalScore={`${report.signal.score}/100`}
            realConfidence={formatConfidence(confidencePct)}
          />
          <EstimatedHomeValue
            value={formatCurrency(report.estimate.price)}
            rangeLow={formatCurrency(report.estimate.priceRangeLow)}
            rangeHigh={formatCurrency(report.estimate.priceRangeHigh)}
            rangeLowShort={formatCurrencyShort(report.estimate.priceRangeLow)}
            rangeHighShort={formatCurrencyShort(report.estimate.priceRangeHigh)}
            confidenceLabel={formatConfidence(confidencePct)}
            trendChangePct={
              report.signal.raw.momentumPct != null
                ? Math.round(report.signal.raw.momentumPct * 10) / 10
                : 2.4
            }
            fillPct={Math.round(
              ((report.estimate.price - report.estimate.priceRangeLow) /
                (report.estimate.priceRangeHigh -
                  report.estimate.priceRangeLow || 1)) *
                100,
            )}
          />
        </div>

        <SignalToSell
          score={report.signal.score}
          badgeLabel={report.signal.label}
          message={messageForLabel(report.signal.label)}
        />

        <YourProperty
          bedrooms={report.propertyDetails.bedrooms}
          bathrooms={report.propertyDetails.bathrooms}
          sqft={report.propertyDetails.squareFootage}
          yearBuilt={report.propertyDetails.yearBuilt}
          estimated={report.propertyDetails.estimated}
        />

        {topComp && (
          <ComparableSale
            address={topComp.formattedAddress}
            distanceMi={topComp.distance}
            beds={topComp.bedrooms}
            baths={topComp.bathrooms}
            sqft={topComp.squareFootage}
            price={topComp.price}
            status={topComp.status}
            daysOnMarket={topComp.daysOnMarket ?? null}
            similarityPct={Math.round((topComp.correlation ?? 0) * 100)}
          />
        )}

        {isUnlocked ? (
          remainingComps.length > 0 && (
            <section className="mx-auto mt-6 w-full max-w-[1200px] px-4 pb-8 md:px-6 xl:px-10">
              <div className="rounded-2xl bg-white p-6 ring-1 ring-[#0B1E33]/[0.06] shadow-[0_15px_40px_-20px_rgba(11,30,51,0.2)] sm:p-8">
                <div className="mb-5 flex items-center justify-between border-b border-[#0B1E33]/[0.06] pb-4">
                  <span
                    className={`${inter.className} text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0B1E33]/45`}
                  >
                    All Comparable Sales ({remainingComps.length + 1})
                  </span>
                  <span
                    className={`${inter.className} inline-flex items-center gap-1.5 rounded-full bg-[#1FAE9F]/10 px-3 py-1 text-[11px] font-semibold text-[#0E8F82]`}
                  >
                    Unlocked
                  </span>
                </div>
                <div className="divide-y divide-[#0B1E33]/[0.06]">
                  {remainingComps.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-3"
                    >
                      <div>
                        <p
                          className={`${inter.className} text-sm font-semibold text-[#153B5F]`}
                        >
                          {c.formattedAddress}
                        </p>
                        <p
                          className={`${inter.className} text-xs text-[#153B5F]/50`}
                        >
                          {c.bedrooms ?? "N/A"} bed · {c.bathrooms ?? "N/A"} bath ·{" "}
                          {c.squareFootage != null
                            ? `${c.squareFootage.toLocaleString()} sqft`
                            : "N/A sqft"}
                        </p>
                      </div>
                      <p
                        className={`${inter.className} text-base font-bold text-[#153B5F]`}
                      >
                        {formatCurrency(c.price)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )
        ) : (
          <>
            {remainingComps.length > 0 && (
              <LockedComparables
                comparables={remainingComps.map((c) => ({
                  address: c.formattedAddress,
                  distanceMi: c.distance,
                  beds: c.bedrooms,
                  baths: c.bathrooms,
                  sqft: c.squareFootage,
                  price: c.price,
                  status: c.status,
                }))}
                medianPrice={report.marketStats?.medianPrice}
                medianPricePerSqft={
                  report.marketStats?.medianPricePerSquareFoot
                }
              />
            )}

            <LockedBookingCTA
              bookingUrl={`${process.env.NEXT_PUBLIC_GHL_BOOKING_URL}?email=${encodeURIComponent(form.email)}&name=${encodeURIComponent(form.firstName)}`}
            />

            <div className="mx-auto max-w-[1200px] px-4 pb-10 text-center md:px-6 xl:px-10">
              <button
                type="button"
                onClick={handleCheckBookingStatus}
                disabled={isCheckingBooking}
                className={`${inter.className} text-sm font-medium text-[#1FAE9F] underline disabled:opacity-60`}
              >
                {isCheckingBooking
                  ? "Checking..."
                  : "Already booked? Refresh to unlock"}
              </button>
            </div>
          </>
        )}
      </main>
    );
  }

  return (
    <div className="relative w-full bg-[#F3F5F7] overflow-hidden min-h-screen flex justify-center items-center md:py-0 pt-[15vh] pb-[10vh]">
      <div className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-white/95" />

      <div className="relative z-10 max-w-[1200px] px-4 md:px-6 xl:px-10 mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div
            className="relative bg-[#0B1E33] px-6 sm:px-8 py-8 sm:py-10 flex flex-col bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(11,30,51,0.75), rgba(11,30,51,0.95)), url('/bg.png')",
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1FAE9F] inline-block" />
              <span
                className={`${inter.className} text-[#1FAE9F] text-xs font-semibold tracking-wide uppercase`}
              >
                Your Home Value Is Ready
              </span>
            </div>

            <h2
              className={`${playfair.className} text-white text-2xl sm:text-3xl font-bold leading-snug mb-4`}
            >
              We found your property.
              <br />
              <span className="text-[#1FAE9F]">Unlock your report.</span>
            </h2>

            <p className={`${inter.className} text-white/60 text-sm mb-8`}>
              Enter your details below to see your instant home value, Signal
              Score, and comparable sales.
            </p>

            <div className="mt-auto grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-start gap-2 rounded-xl bg-white/[0.04] border border-white/10 px-3 py-3"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1FAE9F"
                    strokeWidth="1.8"
                  >
                    {s.icon === "trend" && (
                      <path
                        d="M3 11.5L12 4l9 7.5M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9M10 20v-6h4v6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
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
                  <span
                    className={`${inter.className} text-white text-sm sm:text-base font-semibold tracking-widest select-none opacity-70`}
                    style={{ filter: "blur(2px)" }}
                  >
                    {s.value}
                  </span>
                  <span
                    className={`${inter.className} text-white/50 text-[10px] tracking-wide`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 sm:px-8 py-8 sm:py-10 flex flex-col">
            <div>
              <label
                className={`${inter.className} text-[#0B1E33] text-sm font-medium block mb-2`}
              >
                Property location
              </label>
              <div className="flex items-center justify-between bg-[#F3F5F7] rounded-xl px-4 py-3 mb-5">
                <div className="flex items-center gap-2 min-w-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#E85D75"
                    className="shrink-0"
                  >
                    <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
                  </svg>
                  <span
                    className={`${inter.className} text-[#0B1E33] text-sm truncate`}
                  >
                    {address || "No address provided"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onEditAddress}
                  className={`${inter.className} text-[#1FAE9F] text-sm font-medium shrink-0`}
                >
                  Edit
                </button>
              </div>

              <label
                className={`${inter.className} text-[#0B1E33] text-sm font-medium block mb-2`}
              >
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
                <p className={`${inter.className} text-[#E85D75] text-xs mb-4`}>
                  {errors.firstName}
                </p>
              )}
              {!errors.firstName && <div className="mb-4" />}

              <label
                className={`${inter.className} text-[#0B1E33] text-sm font-medium block mb-2`}
              >
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
                <p className={`${inter.className} text-[#E85D75] text-xs mb-4`}>
                  {errors.email}
                </p>
              )}
              {!errors.email && <div className="mb-4" />}

              <label
                className={`${inter.className} text-[#0B1E33] text-sm font-medium block mb-2`}
              >
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
                <p className={`${inter.className} text-[#E85D75] text-xs mb-4`}>
                  {errors.phone}
                </p>
              )}
              {!errors.phone && <div className="mb-6" />}

              {submitError && (
                <p
                  className={`${inter.className} text-[#E85D75] text-xs mb-4 text-center`}
                >
                  {submitError}
                </p>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`${inter.className} w-full bg-[#1FAE9F] hover:bg-[#1a9a8c] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl py-3.5 flex items-center justify-center gap-2 transition-colors`}
              >
                {isSubmitting
                  ? "Generating your report..."
                  : "Unlock My Report"}
                {!isSubmitting && (
                  <svg
                    width="14"
                    height="14"
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
                  <path
                    d="M8.5 12L11 14.5L15.8 9.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className={`${inter.className} text-[#0B1E33]/50 text-xs text-center`}
                >
                  We never sell your data. No spam — ever.
                </span>
              </div>
            </div>

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
                    <div
                      className={`${inter.className} text-[#0B1E33] text-xs font-semibold leading-tight`}
                    >
                      {t.title}
                    </div>
                    <div
                      className={`${inter.className} text-[#0B1E33]/40 text-[10px] leading-snug mt-0.5`}
                    >
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