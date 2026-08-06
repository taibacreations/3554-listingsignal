"use client";

import { useState } from "react";
import Hero from "@/components/hero";
import HowItWorks from "@/components/HowItWorks";
import CtaBanner from "@/components/cta";
import ResultsSection from "@/components/ResultsSection"

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

  if (screen === "results" && place) {
    return (
      <ResultsSection place={place} onEditAddress={handleEditAddress} />
    );
  }

  return (
    <div>
      <Hero onAddressSubmit={handleAddressSubmit} />
      <HowItWorks />
      <CtaBanner />
    </div>
  );
};

export default Page;