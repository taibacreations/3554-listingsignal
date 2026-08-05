"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    google?: typeof google;
  }
}

let googleMapsPromise: Promise<void> | null = null;

export function useGoogleMapsScript(apiKey: string) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!apiKey) {
      console.warn("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is missing.");
      return;
    }

    // Already loaded — check for the new PlaceAutocompleteElement
    if (window.google?.maps?.places?.PlaceAutocompleteElement) {
      setLoaded(true);
      return;
    }

    if (!googleMapsPromise) {
      googleMapsPromise = new Promise<void>((resolve, reject) => {
        const existingScript = document.querySelector(
          'script[data-google-maps="true"]',
        ) as HTMLScriptElement | null;

        if (existingScript) {
          existingScript.addEventListener("load", () => resolve());
          existingScript.addEventListener("error", () =>
            reject(new Error("Google Maps failed to load.")),
          );
          return;
        }

        const script = document.createElement("script");

        // Use the new "place" library (singular) required for PlaceAutocompleteElement
        script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
          apiKey,
        )}&libraries=places,marker&loading=async&v=weekly`;

        script.async = true;
        script.defer = true;
        script.dataset.googleMaps = "true";

        script.onload = () => {
          const checkPlaces = () => {
            if (window.google?.maps?.places?.PlaceAutocompleteElement) {
              resolve();
              return;
            }
            // Fall back to legacy Autocomplete if new API not yet available
            if (window.google?.maps?.places?.Autocomplete) {
              resolve();
              return;
            }
            window.setTimeout(checkPlaces, 50);
          };
          checkPlaces();
        };

        script.onerror = () => {
          googleMapsPromise = null;
          reject(new Error("Google Maps JavaScript API failed to load."));
        };

        document.head.appendChild(script);
      });
    }

    googleMapsPromise
      .then(() => setLoaded(true))
      .catch((error) => {
        console.error("Google Maps loading error:", error);
        setLoaded(false);
      });
  }, [apiKey]);

  return loaded;
}