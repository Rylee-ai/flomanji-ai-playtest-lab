
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
      {/* Added IDs for anchor link targets */}
      <section id="overview"><GameOverviewSection /></section>
      <section id="features"><KeyFeaturesSection /></section>
      <section id="gameplay">
        {/* Replaced DesignPillarsSection with a link to /gameplay page for Gameplay section */}
        <a
          href="/gameplay"
          className="block text-amber-400 hover:underline hover-scale transition cursor-pointer text-lg py-4 text-center"
          aria-label="Go to the Gameplay page"
        >
          Explore Gameplay Details &rarr;
        </a>
      </section>
      <CallToActionSection scrollToWaitlist={scrollToWaitlist} />
      <section id="faq"><GameSpecificationsSection /></section>
      <PreOrderSection />
      <WaitlistSignupSection ref={waitlistRef} />
      <FooterSection />
    </div>
  );
};

export default HomePage;
