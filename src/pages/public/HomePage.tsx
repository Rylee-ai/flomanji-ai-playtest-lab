
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
import { VideoShowcaseSection } from "./sections/VideoShowcaseSection";
import { GameCardGallery } from "./sections/GameCardGallery";

/**
 * HomePage Component - Now with improved spacing and readability
 * while maintaining 1987 arcade aesthetics
 */
const HomePage = () => {
  const waitlistRef = useRef<HTMLDivElement>(null);

  const scrollToWaitlist = () => {
    waitlistRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Hero Section */}
      <HeroSection scrollToWaitlist={scrollToWaitlist} />
      
      {/* Main Content - Added IDs for anchor links with better spacing between sections */}
      <section id="overview" className="border-t border-gray-800"><GameOverviewSection /></section>
      <section id="features" className="border-t border-gray-800"><KeyFeaturesSection /></section>
      <section id="design-pillars" className="border-t border-gray-800"><DesignPillarsSection /></section>
      
      {/* 1987 Arcade-themed sections */}
      <VideoShowcaseSection />
      <GameCardGallery />
      
      {/* Gameplay Link - More visible */}
      <section id="gameplay" className="py-6 bg-gray-900 border-t border-b border-gray-800">
        <a
          href="/gameplay"
          className="block text-cyan-300 hover:underline hover:text-cyan-400 hover-scale transition cursor-pointer text-lg py-4 text-center font-retro"
          aria-label="Go to the Gameplay page"
        >
          EXPLORE GAMEPLAY DETAILS &rarr;
        </a>
      </section>
      
      {/* Call to Action and Info Sections */}
      <CallToActionSection scrollToWaitlist={scrollToWaitlist} />
      <section id="faq" className="border-t border-gray-800"><GameSpecificationsSection /></section>
      <PreOrderSection />
      <WaitlistSignupSection ref={waitlistRef} />
      <FooterSection />
    </div>
  );
};

export default HomePage;
