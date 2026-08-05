"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    google?: typeof google;
  }
}

let googleMapsPromise: Promise<void> | null = null;

export function useGoogleMapsScript(
  apiKey: string
) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!apiKey) {
      console.warn(
        "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is missing."
      );

      return;
    }

    /* ============================================================
       ALREADY LOADED
    ============================================================ */

    if (
      window.google?.maps?.places
        ?.PlaceAutocompleteElement ||
      window.google?.maps?.places?.Autocomplete
    ) {
      setLoaded(true);
      return;
    }

    /* ============================================================
       CREATE / REUSE SCRIPT PROMISE
    ============================================================ */

    if (!googleMapsPromise) {
      googleMapsPromise = new Promise<void>(
        (resolve, reject) => {
          /* ========================================================
             EXISTING SCRIPT
          ======================================================== */

          const existingScript =
            document.querySelector(
              'script[data-google-maps="true"]'
            ) as HTMLScriptElement | null;

          if (existingScript) {
            /*
             * The script may already have loaded
             * before this hook ran.
             */

            if (
              window.google?.maps?.places
                ?.PlaceAutocompleteElement ||
              window.google?.maps?.places
                ?.Autocomplete
            ) {
              resolve();
              return;
            }

            existingScript.addEventListener(
              "load",
              () => resolve(),
              { once: true }
            );

            existingScript.addEventListener(
              "error",
              () =>
                reject(
                  new Error(
                    "Google Maps failed to load."
                  )
                ),
              { once: true }
            );

            return;
          }

          /* ========================================================
             CREATE SCRIPT
          ======================================================== */

          const script =
            document.createElement("script");

          script.src =
            `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
              apiKey
            )}&libraries=places&loading=async&v=weekly`;

          script.async = true;
          script.defer = true;

          script.dataset.googleMaps =
            "true";

          /* ========================================================
             SCRIPT LOAD
          ======================================================== */

          script.onload = () => {
            const checkPlaces = () => {
              /*
               * New Places Autocomplete API
               */

              if (
                window.google?.maps?.places
                  ?.PlaceAutocompleteElement
              ) {
                resolve();
                return;
              }

              /*
               * Legacy API fallback
               */

              if (
                window.google?.maps?.places
                  ?.Autocomplete
              ) {
                resolve();
                return;
              }

              /*
               * Google may finish initializing
               * slightly after script.onload.
               */

              window.setTimeout(
                checkPlaces,
                50
              );
            };

            checkPlaces();
          };

          /* ========================================================
             SCRIPT ERROR
          ======================================================== */

          script.onerror = () => {
            googleMapsPromise = null;

            reject(
              new Error(
                "Google Maps JavaScript API failed to load."
              )
            );
          };

          document.head.appendChild(script);
        }
      );
    }

    /* ============================================================
       HANDLE PROMISE
    ============================================================ */

    googleMapsPromise
      .then(() => {
        setLoaded(true);
      })
      .catch((error) => {
        console.error(
          "Google Maps loading error:",
          error
        );

        setLoaded(false);
      });
  }, [apiKey]);

  return loaded;
}