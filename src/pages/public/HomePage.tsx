
import React, { useRef, useEffect } from "react";
import { HeroSection } from "./sections/HeroSection";
import { GameOverviewSection } from "./sections/GameOverviewSection";
import { KeyFeaturesSection } from "./sections/KeyFeaturesSection";
import { DesignPillarsSection } from "./sections/DesignPillarsSection";
import { CallToActionSection } from "./sections/CallToActionSection";
import { PreOrderSection } from "./sections/PreOrderSection";
import { WaitlistSignupSection } from "./sections/WaitlistSignupSection";
import { FooterSection } from "./sections/FooterSection";

const HomePage = () => {
  // Add debugging to confirm correct rendering
  console.log("HomePage rendering");
  
  useEffect(() => {
    // Additional debug logs to verify rendering and component loading
    console.log("HomePage mounted");
    console.log("Card component status:", typeof Card !== 'undefined' ? 'loaded' : 'not loaded');
  }, []);
  
  const waitlistRef = useRef<HTMLDivElement>(null);

  const scrollToWaitlist = () => {
    waitlistRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <HeroSection scrollToWaitlist={scrollToWaitlist} />
      <section id="overview"><GameOverviewSection /></section>
      <section id="features"><KeyFeaturesSection /></section>
      <section id="design-pillars"><DesignPillarsSection /></section>
      <section id="gameplay">
        <a
          href="/gameplay"
          className="block text-amber-400 hover:underline hover-scale transition cursor-pointer text-lg py-4 text-center"
          aria-label="Go to the Gameplay page"
        >
          Explore Gameplay Details &rarr;
        </a>
      </section>
      <CallToActionSection scrollToWaitlist={scrollToWaitlist} />
      <PreOrderSection />
      <WaitlistSignupSection ref={waitlistRef} />
      <FooterSection />
    </div>
  );
};

export default HomePage;
