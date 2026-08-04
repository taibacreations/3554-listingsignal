// src/lib/useGoogleMapsScript.ts
"use client";

import { useEffect, useState } from "react";

let isLoading = false;
let isLoaded = false;
const callbacks: (() => void)[] = [];

export function useGoogleMapsScript(apiKey: string) {
  const [loaded, setLoaded] = useState(isLoaded);

  useEffect(() => {
    if (isLoaded) {
      setLoaded(true);
      return;
    }

    callbacks.push(() => setLoaded(true));
    if (isLoading) return;
    isLoading = true;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`;
    script.async = true;
    script.onload = () => {
      isLoaded = true;
      callbacks.forEach((cb) => cb());
    };
    document.head.appendChild(script);
  }, [apiKey]);

  return loaded;
}