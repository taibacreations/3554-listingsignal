"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/hero";
import HowItWorks from "@/components/HowItWorks";
import ResultsSection from "@/components/ResultsSection";

type SelectedPlace = {
  address: string;
  lat: number | null;
  lng: number | null;
};

const Page = () => {
  const [screen, setScreen] = useState<"home" | "results">("home");
  const [place, setPlace] = useState<SelectedPlace | null>(null);
  const [isCheckingUrl, setIsCheckingUrl] = useState(true);

  // If the URL has ?leadId=... (from an email link, or a report the user
  // bookmarked), skip straight to the results screen instead of the
  // address-entry home screen. ResultsSection itself fetches the report
  // data using this same leadId.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const leadId = params.get("leadId");
    if (leadId) {
      setPlace({ address: "", lat: null, lng: null });
      setScreen("results");
    }
    setIsCheckingUrl(false);
  }, []);

  const handleAddressSubmit = (p: SelectedPlace) => {
    setPlace(p);
    setScreen("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditAddress = () => {
    setScreen("home");
    setPlace(null);
    window.history.replaceState({}, "", window.location.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [screen]);

  if (isCheckingUrl) {
    return null;
  }

  if (screen === "results" && place) {
    return <ResultsSection place={place} onEditAddress={handleEditAddress} />;
  }

  return (
    <div>
      <Hero onAddressSubmit={handleAddressSubmit} />
      <HowItWorks />
    </div>
  );
};

export default Page;