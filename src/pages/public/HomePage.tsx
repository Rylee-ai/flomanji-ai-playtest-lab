
import React, { useRef } from "react";
import { HeroSection } from "./sections/HeroSection";
import { GameOverviewSection } from "./sections/GameOverviewSection";
import { KeyFeaturesSection } from "./sections/KeyFeaturesSection";
import { DesignPillarsSection } from "./sections/DesignPillarsSection";
import { CallToActionSection } from "./sections/CallToActionSection";
import { GameSpecificationsSection } from "./sections/GameSpecificationsSection";
import { PreOrderSection } from "./sections/PreOrderSection";
import { WaitlistSignupSection } from "./sections/WaitlistSignupSection";
import { FooterSection } from "./sections/FooterSection";

// This page now only coordinates rendering the various homepage sections, passing refs as needed for scrolling.

const HomePage = () => {
  const waitlistRef = useRef<HTMLDivElement>(null);

  const scrollToWaitlist = () => {
    waitlistRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <HeroSection scrollToWaitlist={scrollToWaitlist} />
      <GameOverviewSection />
      <KeyFeaturesSection />
      <DesignPillarsSection />
      <CallToActionSection scrollToWaitlist={scrollToWaitlist} />
      <GameSpecificationsSection />
      <PreOrderSection />
      <WaitlistSignupSection ref={waitlistRef} />
      <FooterSection />
    </div>
  );
};

export default HomePage;
