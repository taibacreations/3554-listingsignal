"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Playfair_Display, Inter } from "next/font/google";
import gsap from "gsap";
import { useGoogleMapsScript } from "@/lib/useGoogleMapsScript";
import HomeDataLoading from "@/components/loader";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function Hero() {
  const router = useRouter();

  const bgRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);

  const [address, setAddress] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<{
    address: string;
    lat: number | null;
    lng: number | null;
  } | null>(null);
  const [showValidation, setShowValidation] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const mapsLoaded = useGoogleMapsScript(apiKey);

  const [isSearching, setIsSearching] = useState(false);
  const [pendingParams, setPendingParams] = useState<URLSearchParams | null>(
    null,
  );

  const handleSubmit = () => {
    const trimmed = address.trim();

    // TEMP BYPASS: while waiting on the Google API key, allow submitting
    // with just the typed text — no dropdown selection required.
    // Once apiKey is set, selectedPlace will be populated by the
    // autocomplete listener above and we use that (with lat/lng) instead.
    if (!trimmed) {
      setShowValidation(true);
      return;
    }

    const place = selectedPlace ?? { address: trimmed, lat: null, lng: null };

    const params = new URLSearchParams({
      address: place.address,
      ...(place.lat != null && { lat: String(place.lat) }),
      ...(place.lng != null && { lng: String(place.lng) }),
    });

    // Show the loading overlay in place instead of navigating immediately.
    setPendingParams(params);
    setIsSearching(true);
  };

  const handleLoadingComplete = () => {
    if (pendingParams) {
      router.push(`/results?${pendingParams.toString()}`);
    }
  };

  // Wire up Places Autocomplete once the script has loaded.
  // TEMP: apiKey is currently empty (waiting on client), so this effect
  // just no-ops until a real key is added to .env.local — no code changes
  // needed later, it activates automatically.
  useEffect(() => {
    if (!apiKey || !mapsLoaded || !addressInputRef.current) return;
    if (!window.google?.maps?.places) {
      console.error(
        "Google Maps Places library did not load. Check your API key and enabled APIs.",
      );
      return;
    }

    const autocomplete = new google.maps.places.Autocomplete(
      addressInputRef.current,
      {
        types: ["address"],
        fields: ["formatted_address", "geometry"],
        // componentRestrictions: { country: "us" }, // uncomment to limit to one country
      },
    );

    const listener = autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      const formatted = place.formatted_address ?? "";
      const lat = place.geometry?.location?.lat() ?? null;
      const lng = place.geometry?.location?.lng() ?? null;

      setAddress(formatted);
      setSelectedPlace({ address: formatted, lat, lng });
      setShowValidation(false);
    });

    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [apiKey, mapsLoaded]);

  const handleAddressChange = (value: string) => {
    setAddress(value);
    if (selectedPlace && value !== selectedPlace.address) {
      setSelectedPlace(null);
    }
    if (showValidation) setShowValidation(false);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // signature signal-wave line draw
      const path = pathRef.current;
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      }

      const words = headlineRef.current?.querySelectorAll(".word");
      const trustItems = trustRef.current?.querySelectorAll(".trust-item");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        bgRef.current,
        { scale: 1.15 },
        { scale: 1, duration: 2.2, ease: "power2.out" },
        0,
      )
        .fromTo(
          badgeRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.2,
        )
        .fromTo(
          words ?? [],
          { opacity: 0, y: 24, rotateX: -40 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.06 },
          "-=0.15",
        )
        .to(
          path ?? [],
          { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" },
          "-=0.9",
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=1.1",
        )
        .fromTo(
          searchRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.65 },
          "-=0.4",
        )
        .fromTo(
          trustItems ?? [],
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.3",
        )
        .fromTo(
          ".score-card",
          { opacity: 0, y: 24, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.4)" },
          "-=0.5",
        )
        .fromTo(
          scrollCueRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2",
        );

      // gentle looping breathe on the scroll cue
      gsap.to(scrollCueRef.current, {
        y: 8,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full min-h-[100svh] md:min-h-[92vh] relative overflow-hidden flex flex-col">
      {/* full-bleed background photo */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bgg.png')" }}
      />

      {/* directional overlay: deep navy on the left for copy, lets the photo breathe on the right */}
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(11,30,51,0.96)_28%,rgba(11,30,51,0.72)_55%,rgba(11,30,51,0.35)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,30,51,0.55),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_15%_0%,rgba(31,174,159,0.16),transparent_60%)]" />

      {/* signature: signal-wave line (desktop only) */}
      <svg
        className="absolute right-[2%] top-[8%] h-[45%] w-[45%] opacity-60 pointer-events-none hidden lg:block"
        viewBox="0 0 700 500"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M0 380 L120 380 L150 260 L190 440 L230 120 L270 380 L340 380 L370 300 L410 380 L700 380"
          stroke="#1FAE9F"
          strokeOpacity="0.55"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="max-w-[1440px] w-full px-4 md:px-6 xl:px-10 mx-auto flex-1 flex flex-col justify-center pt-24 md:pt-28 pb-14 md:pb-16 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-end">
          {/* Left content */}
          <div>
            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/15 rounded-full px-4 py-1.5 mb-6 md:mb-7 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1FAE9F] inline-block shrink-0" />
              <span
                className={`${inter.className} text-white/90 text-xs font-medium tracking-wide`}
              >
                Trusted by homeowners
              </span>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className={`${playfair.className} text-white text-[2.15rem] leading-[1.12] sm:text-4xl md:text-[3.6rem] md:leading-[1.08] font-semibold mb-5 md:mb-6 max-w-full md:max-w-[85%]`}
              style={{ perspective: "600px" }}
            >
              <span className="word inline-block">What</span>{" "}
              <span className="word inline-block">Would</span>{" "}
              <span className="word inline-block">You</span>{" "}
              <span className="word inline-block">Walk</span>{" "}
              <span className="word inline-block">Away</span>{" "}
              <span className="word inline-block">With</span>
              <br />
              <span className="word inline-block text-[#1FAE9F]">If</span>{" "}
              <span className="word inline-block text-[#1FAE9F]">You</span>{" "}
              <span className="word inline-block text-[#1FAE9F]">Sold</span>{" "}
              <span className="word inline-block text-[#1FAE9F]">Today?</span>
            </h1>

            {/* Subtext */}
            <p
              ref={subRef}
              className={`${inter.className} text-white/65 text-base md:text-lg mb-8 md:mb-9 max-w-full md:max-w-[80%] leading-relaxed`}
            >
              Real-time home value insights — fast, free, and built for
              today&apos;s market.
            </p>

            {/* Search bar — stacks vertically on mobile so nothing clips */}
            <div ref={searchRef} className="max-w-md mb-8 md:mb-9">
              <div className="bg-white rounded-2xl sm:rounded-xl flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 p-1.5 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-black/[0.03]">
                {/* Input track: min-w-0 + overflow-hidden guarantees it shrinks and never paints over the button */}
                <div className="flex items-center flex-1 min-w-0 overflow-hidden">
                  <span className="pl-3 sm:pl-4 pr-2 text-[#0B1E33] shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
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
                  </span>
                  <input
                    ref={addressInputRef}
                    type="text"
                    value={address}
                    onChange={(e) => handleAddressChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSubmit();
                    }}
                    placeholder="Enter your home address..."
                    autoComplete="off"
                    className={`${inter.className} flex-1 min-w-0 w-full outline-none text-base sm:text-sm text-[#0B1E33] placeholder:text-gray-400 py-2.5 pr-3`}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className={`${inter.className} relative z-10 bg-[#1FAE9F] hover:bg-[#189184] text-white text-sm font-semibold rounded-full px-5 py-3 sm:py-2.5 flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors w-full sm:w-auto shrink-0`}
                >
                  See My Home Value
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
                </button>
              </div>
              {showValidation && (
                <p
                  className={`${inter.className} text-[#ff9d8a] text-xs mt-2 pl-1`}
                >
                  Please enter your home address.
                </p>
              )}
            </div>

            {/* Trust badges — clean stack on mobile, row from sm up */}
            <div
              ref={trustRef}
              className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-x-8 sm:gap-y-4"
            >
              <TrustItem
                icon={
                  <>
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
                  </>
                }
                title="100% Free"
                subtitle="No hidden fees"
              />
              <TrustItem
                icon={
                  <>
                    <rect x="4" y="10" width="16" height="11" rx="2" />
                    <path
                      d="M8 10V7.5C8 5.3 9.8 3.5 12 3.5C14.2 3.5 16 5.3 16 7.5V10"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 13L13 15L15 16L13 17L12 19L11 17L9 16L11 15L12 13Z"
                      fill="white"
                      stroke="none"
                    />
                  </>
                }
                title="No Commitment"
                subtitle="Zero obligation"
              />
              <TrustItem
                icon={
                  <>
                    <circle cx="12" cy="13" r="8" />
                    <path d="M12 2V5" strokeLinecap="round" />
                    <rect
                      x="10"
                      y="1"
                      width="4"
                      height="2"
                      rx="1"
                      fill="#1FAE9F"
                      stroke="none"
                    />
                    <path
                      d="M13 8L10.5 13H13L11 18L15.5 11H13L15 8H13Z"
                      fill="white"
                      stroke="none"
                    />
                  </>
                }
                title="Results in 60 Secs"
                subtitle="Quick and simple"
              />
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div
        ref={scrollCueRef}
        className="relative z-10 hidden md:flex justify-center pb-8"
      >
        <div className="flex flex-col items-center gap-2 text-white/40">
          <span
            className={`${inter.className} text-[10px] tracking-[0.2em] uppercase`}
          >
            Scroll
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M5 9l7 7 7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {isSearching && (
        <HomeDataLoading
          address={address}
          duration={4000}
          onComplete={handleLoadingComplete}
        />
      )}
    </section>
  );
}

function TrustItem({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="trust-item flex items-center gap-3">
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0"
      >
        {icon}
      </svg>
      <div className="leading-tight">
        <div className={`${inter.className} text-white text-sm font-semibold`}>
          {title}
        </div>
        <div className={`${inter.className} text-white/50 text-xs`}>
          {subtitle}
        </div>
      </div>
    </div>
  );
}
