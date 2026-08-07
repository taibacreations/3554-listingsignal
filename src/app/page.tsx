"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/hero";
import ResultsSection from "@/components/ResultsSection";

type SelectedPlace = {
  address: string;
  lat: number | null;
  lng: number | null;
};

const Page = () => {
  const [screen, setScreen] = useState<"home" | "results">("home");
  const [place, setPlace] = useState<SelectedPlace | null>(null);

  const handleAddressSubmit = (p: SelectedPlace) => {
    setPlace(p);
    setScreen("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditAddress = () => {
    setScreen("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [screen]);

  if (screen === "results" && place) {
    return <ResultsSection place={place} onEditAddress={handleEditAddress} />;
  }

  // Sirf Hero — HowItWorks aur CtaBanner hata diye
  return <Hero onAddressSubmit={handleAddressSubmit} />;
};

export default Page;