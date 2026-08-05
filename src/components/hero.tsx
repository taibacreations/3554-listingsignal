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

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

type SelectedPlace = {
  address: string;
  lat: number | null;
  lng: number | null;
};

export default function Hero() {
  const router = useRouter();

  const heroRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const trustRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const scrollCueRef = useRef<HTMLDivElement | null>(null);

  const addressInputRef = useRef<HTMLInputElement | null>(null);

  const autocompleteContainerRef =
    useRef<HTMLDivElement | null>(null);

  const placeAutocompleteRef =
    useRef<HTMLElement | null>(null);

  const [address, setAddress] = useState("");

  const [selectedPlace, setSelectedPlace] =
    useState<SelectedPlace | null>(null);

  const [showValidation, setShowValidation] =
    useState(false);

  const [isSearching, setIsSearching] =
    useState(false);

  const [pendingParams, setPendingParams] =
    useState<URLSearchParams | null>(null);

  const apiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

  const mapsLoaded = useGoogleMapsScript(apiKey);

  /* ============================================================
     SUBMIT
  ============================================================ */

  const handleSubmit = () => {
    const trimmed = address.trim();

    if (!trimmed) {
      setShowValidation(true);
      return;
    }

    const place = selectedPlace ?? {
      address: trimmed,
      lat: null,
      lng: null,
    };

    const params = new URLSearchParams({
      address: place.address,
      ...(place.lat != null && {
        lat: String(place.lat),
      }),
      ...(place.lng != null && {
        lng: String(place.lng),
      }),
    });

    setPendingParams(params);
    setIsSearching(true);
  };

  const handleLoadingComplete = () => {
    if (!pendingParams) return;

    router.push(
      `/results?${pendingParams.toString()}`
    );
  };

  /* ============================================================
     GOOGLE PLACES AUTOCOMPLETE
  ============================================================ */

  useEffect(() => {
    if (
      !apiKey ||
      !mapsLoaded ||
      !autocompleteContainerRef.current
    ) {
      return;
    }

    const places = window.google?.maps?.places;

    if (!places) {
      console.warn(
        "Google Maps Places library is not available."
      );
      return;
    }

    /* ============================================================
       NEW PLACE AUTOCOMPLETE ELEMENT
    ============================================================ */

    if (places.PlaceAutocompleteElement) {
      const autocompleteEl =
        new places.PlaceAutocompleteElement({}) as HTMLElement;

      /*
       * IMPORTANT:
       * Do not restrict the predictions yet.
       *
       * This allows Google to return normal address/place
       * suggestions while we verify the autocomplete works.
       */

      autocompleteEl.setAttribute(
        "placeholder",
        "Enter your home address..."
      );

      /*
       * Visual styling
       */

      autocompleteEl.style.width = "100%";
      autocompleteEl.style.display = "block";
      autocompleteEl.style.backgroundColor =
        "transparent";
      autocompleteEl.style.color = "#0B1E33";
      autocompleteEl.style.colorScheme = "light";
      autocompleteEl.style.border = "none";
      autocompleteEl.style.outline = "none";
      autocompleteEl.style.boxShadow = "none";

      /*
       * Save reference
       */

      placeAutocompleteRef.current =
        autocompleteEl;

      /*
       * Clear old element before mounting.
       */

      autocompleteContainerRef.current.innerHTML =
        "";

      autocompleteContainerRef.current.appendChild(
        autocompleteEl
      );

      /* ============================================================
         GOOGLE PLACE SELECTION

         CURRENT API:
         gmp-select

         NOT:
         gmp-placeselect
      ============================================================ */

      const handlePlaceSelect = async (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<{
            placePrediction?: google.maps.places.PlacePrediction;
          }>;

        const placePrediction =
          customEvent.detail?.placePrediction;

        if (!placePrediction) {
          console.warn(
            "Google Places: no placePrediction found."
          );
          return;
        }

        try {
          /*
           * Convert prediction to Place.
           */
          const place =
            placePrediction.toPlace();

          /*
           * Fetch only what we need.
           */
          await place.fetchFields({
            fields: [
              "formattedAddress",
              "location",
            ],
          });

          const formatted =
            place.formattedAddress ?? "";

          const location =
            place.location;

          const lat =
            location?.lat() ?? null;

          const lng =
            location?.lng() ?? null;

          setAddress(formatted);

          setSelectedPlace({
            address: formatted,
            lat,
            lng,
          });

          setShowValidation(false);
        } catch (error) {
          console.error(
            "Google Places selection error:",
            error
          );
        }
      };

      /*
       * Listen to the CURRENT Google event.
       */
      autocompleteEl.addEventListener(
        "gmp-select",
        handlePlaceSelect
      );

      /* ============================================================
         INPUT EVENT
      ============================================================ */

      const handleInput = (event: Event) => {
        /*
         * The new Google element is a web component.
         * The event target may be the component itself,
         * so don't depend on target.value.
         *
         * We only use this event to invalidate a previous
         * selected place when the user starts typing again.
         */

        if (selectedPlace) {
          setSelectedPlace(null);
        }

        if (showValidation) {
          setShowValidation(false);
        }
      };

      autocompleteEl.addEventListener(
        "input",
        handleInput
      );

      /* ============================================================
         CLEANUP
      ============================================================ */

      return () => {
        autocompleteEl.removeEventListener(
          "gmp-select",
          handlePlaceSelect
        );

        autocompleteEl.removeEventListener(
          "input",
          handleInput
        );

        if (
          autocompleteContainerRef.current
        ) {
          autocompleteContainerRef.current.innerHTML =
            "";
        }

        placeAutocompleteRef.current = null;
      };
    }

    /* ============================================================
       LEGACY AUTOCOMPLETE FALLBACK
    ============================================================ */

    if (
      places.Autocomplete &&
      addressInputRef.current
    ) {
      const input =
        addressInputRef.current;

      const autocomplete =
        new places.Autocomplete(
          input,
          {
            types: ["address"],
            fields: [
              "formatted_address",
              "geometry",
            ],
          }
        );

      const listener =
        autocomplete.addListener(
          "place_changed",
          () => {
            const place =
              autocomplete.getPlace();

            const formatted =
              place.formatted_address ?? "";

            const lat =
              place.geometry?.location?.lat() ??
              null;

            const lng =
              place.geometry?.location?.lng() ??
              null;

            setAddress(formatted);

            setSelectedPlace({
              address: formatted,
              lat,
              lng,
            });

            setShowValidation(false);
          }
        );

      return () => {
        google.maps.event.removeListener(
          listener
        );

        document
          .querySelectorAll(".pac-container")
          .forEach((el) => el.remove());
      };
    }
  }, [apiKey, mapsLoaded]);

  /* ============================================================
     LEGACY INPUT CHANGE
  ============================================================ */

  const handleAddressChange = (
    value: string
  ) => {
    setAddress(value);

    if (
      selectedPlace &&
      value !== selectedPlace.address
    ) {
      setSelectedPlace(null);
    }

    if (showValidation) {
      setShowValidation(false);
    }
  };

  /* ============================================================
     GSAP
  ============================================================ */

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current;

      if (path) {
        const length =
          path.getTotalLength();

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      }

      const lines =
        headlineRef.current?.querySelectorAll(
          ".line-inner"
        );

      const trustItems =
        trustRef.current?.querySelectorAll(
          ".trust-item"
        );

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.fromTo(
        bgRef.current,
        { scale: 1.1 },
        {
          scale: 1,
          duration: 1.4,
          ease: "power2.out",
        },
        0
      )
        .fromTo(
          badgeRef.current,
          {
            opacity: 0,
            y: -8,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
          },
          0.15
        )
        .fromTo(
          lines ?? [],
          {
            yPercent: 115,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=0.1"
        )
        .to(
          path ?? [],
          {
            strokeDashoffset: 0,
            duration: 0.9,
            ease: "power2.inOut",
          },
          "-=0.55"
        )
        .fromTo(
          subRef.current,
          {
            opacity: 0,
            y: 10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
          },
          "-=0.45"
        )
        .fromTo(
          searchRef.current,
          {
            opacity: 0,
            y: 14,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
          },
          "-=0.15"
        )
        .fromTo(
          trustItems ?? [],
          {
            opacity: 0,
            y: 10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.06,
          },
          "-=0.2"
        )
        .fromTo(
          scrollCueRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.4,
          },
          "-=0.1"
        );

      if (scrollCueRef.current) {
        gsap.to(
          scrollCueRef.current,
          {
            y: 7,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.4,
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /* ============================================================
     DETECT NEW API
  ============================================================ */

  const hasNewAPI =
    typeof window !== "undefined" &&
    mapsLoaded &&
    !!window.google?.maps?.places
      ?.PlaceAutocompleteElement;

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[85vh] w-full overflow-hidden"
    >
      {/* ========================================================
          BACKGROUND
      ======================================================== */}

      <div
        ref={bgRef}
        className="absolute inset-0 z-0 scale-[1.01] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/bgg.png')",
        }}
      />

      {/* LEFT OVERLAY */}

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(100deg,rgba(11,30,51,0.94)_0%,rgba(11,30,51,0.88)_28%,rgba(11,30,51,0.55)_50%,rgba(11,30,51,0.18)_68%,rgba(11,30,51,0.08)_100%)]" />

      {/* VERTICAL GRADIENT */}

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,rgba(11,30,51,0.20),transparent_30%,transparent_65%,rgba(11,30,51,0.55)_100%)]" />

      {/* TEAL ATMOSPHERE */}

      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_55%_60%_at_20%_35%,rgba(31,174,159,0.12),transparent_65%)]" />

      {/* SIGNAL WAVE */}

      <svg
        className="pointer-events-none absolute right-[6%] top-[16%] z-[3] hidden h-[46%] w-[42%] max-w-2xl opacity-[0.55] lg:block"
        viewBox="0 0 700 500"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
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

      {/* MAIN CONTENT */}

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 items-center px-4 pb-10 pt-[5vh] xs:px-5 sm:px-6 sm:pb-11 sm:pt-20 md:px-6 md:pb-12 md:pt-16 xl:px-10">
        <div className="w-full max-w-[620px] text-left">

          {/* BADGE */}

          <div
            ref={badgeRef}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.16] bg-[#0B1E33]/45 px-3.5 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-md sm:mb-5 sm:px-4"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1FAE9F] shadow-[0_0_12px_rgba(31,174,159,0.75)]" />

            <span
              className={`${inter.className} text-[10.5px] font-medium tracking-wide text-white/90 sm:text-[12px]`}
            >
              Trusted by homeowners
            </span>
          </div>

          {/* HEADLINE */}

          <h1
            ref={headlineRef}
            className={`${playfair.className} mb-4 font-semibold text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)] sm:mb-5`}
            style={{
              fontSize:
                "clamp(1.65rem, 5.6vw, 2.9rem)",
              lineHeight: 1.16,
              letterSpacing: "-0.01em",
            }}
          >
            <span className="block overflow-hidden">
              <span className="line-inner block">
                What Would You Walk Away With
              </span>
            </span>

            <span className="mt-0.5 block overflow-hidden">
              <span className="line-inner block text-[#1FAE9F]">
                If You Sold Your Home Today?
              </span>
            </span>
          </h1>

          {/* SUBTEXT */}

          <p
            ref={subRef}
            className={`${inter.className} mb-6 max-w-md text-[14px] leading-relaxed text-white/75 drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] sm:mb-7 sm:text-[15px] md:text-base`}
          >
            Real-time home value insights —
            fast, free, and built for
            today&apos;s market.
          </p>

          {/* SEARCH */}

          <div
            ref={searchRef}
            className="relative z-30 mb-7 w-full max-w-xl sm:mb-8"
          >
            <div
              className="
                search-shell
                group/search
                relative
                w-full
                rounded-[18px]
                border
                border-white/[0.22]
                bg-[#FBFCFB]
                p-1.5
                shadow-[0_20px_50px_-18px_rgba(0,0,0,0.65)]
                ring-1
                ring-black/[0.04]
                transition-all
                duration-300
                focus-within:border-[#C9A96E]/60
                focus-within:shadow-[0_25px_60px_-20px_rgba(0,0,0,0.65),0_0_0_3px_rgba(201,169,110,0.10)]
                sm:rounded-[22px]
                sm:p-2
                sm:shadow-[0_35px_90px_-28px_rgba(0,0,0,0.75)]
                md:rounded-full
              "
            >
              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-2">

                {/* INPUT */}

                <div className="flex min-w-0 flex-1 items-center">

                  {/* HOME ICON */}

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#0B1E33] text-[#1FAE9F] shadow-[0_8px_20px_rgba(11,30,51,0.2)] transition-colors duration-300 group-focus-within/search:text-[#C9A96E] sm:h-12 sm:w-12 sm:rounded-[16px] md:rounded-full">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                      className="sm:h-5 sm:w-5"
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

                  {/* GOOGLE NEW API */}

                  {hasNewAPI ? (
                    <div
                      ref={
                        autocompleteContainerRef
                      }
                      className="google-autocomplete-container min-w-0 flex-1 px-2.5 sm:px-3.5 md:pl-4"
                      aria-label="Home address autocomplete"
                    />
                  ) : (
                    /* LEGACY FALLBACK */

                    <input
                      ref={addressInputRef}
                      type="text"
                      value={address}
                      onChange={(e) =>
                        handleAddressChange(
                          e.target.value
                        )
                      }
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter"
                        ) {
                          e.preventDefault();
                          handleSubmit();
                        }
                      }}
                      placeholder="Enter your home address..."
                      autoComplete="off"
                      className={`${inter.className} min-w-0 w-full bg-transparent px-2.5 py-3 text-left text-[13.5px] font-medium tracking-[-0.005em] text-[#0B1E33] outline-none focus:outline-none focus:ring-0 placeholder:font-normal placeholder:text-[#8A96A3] sm:px-3.5 sm:py-3.5 sm:text-[15px] md:pl-4 md:text-[16px]`}
                    />
                  )}
                </div>

                {/* BUTTON */}

                <button
                  type="button"
                  onClick={handleSubmit}
                  className={`${inter.className} group relative z-10 flex w-full shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-[13px] bg-[#1FAE9F] px-4 py-3 text-[12.5px] font-semibold text-white shadow-[0_10px_22px_-8px_rgba(31,174,174,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#189184] hover:shadow-[0_18px_34px_-10px_rgba(31,174,159,0.85)] active:translate-y-0 sm:w-auto sm:gap-2 sm:rounded-[16px] sm:px-6 sm:py-3.5 sm:text-[14px] md:rounded-full`}
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.32)_50%,transparent_65%)] transition-transform duration-700 ease-out group-hover:translate-x-full" />

                  <span className="relative whitespace-nowrap">
                    See My Home Value
                  </span>

                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="relative shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 sm:h-[15px] sm:w-[15px]"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* VALIDATION */}

            {showValidation && (
              <p
                className={`${inter.className} mt-2 text-center text-[11px] font-medium text-[#ffb2a3] sm:mt-2.5 sm:text-xs`}
              >
                Please enter your home address.
              </p>
            )}
          </div>

          {/* TRUST ITEMS */}

          <div
            ref={trustRef}
            className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-x-7 sm:gap-y-3.5"
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
                  <rect
                    x="4"
                    y="10"
                    width="16"
                    height="11"
                    rx="2"
                  />

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
                  <circle
                    cx="12"
                    cy="13"
                    r="8"
                  />

                  <path
                    d="M12 2V5"
                    strokeLinecap="round"
                  />

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

      {/* SCROLL */}

      <div
        ref={scrollCueRef}
        className="relative z-10 hidden justify-center pb-6 md:flex md:pb-7"
      >
        <div className="flex flex-col items-center gap-1.5 text-white/45">
          <span
            className={`${inter.className} text-[9px] uppercase tracking-[0.22em]`}
          >
            Scroll
          </span>

          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              d="M5 9l7 7 7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* LOADING */}

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

/* ===============================================================
   TRUST ITEM
=============================================================== */

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
    <div className="trust-item flex items-center gap-2.5">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.15] bg-white/[0.06] text-[#1FAE9F] backdrop-blur-sm sm:h-8 sm:w-8">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          {icon}
        </svg>
      </div>

      <div>
        <div
          className={`${inter.className} text-[11px] font-semibold text-white sm:text-[12px] md:text-sm`}
        >
          {title}
        </div>

        <div
          className={`${inter.className} mt-0.5 text-[9.5px] text-white/55 sm:text-[10px] md:text-xs`}
        >
          {subtitle}
        </div>
      </div>
    </div>
  );
}