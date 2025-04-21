
import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeroSection } from "./sections/HeroSection";
import { GameOverviewSection } from "./sections/GameOverviewSection";
import { KeyFeaturesSection } from "./sections/KeyFeaturesSection";
import { CallToActionSection } from "./sections/CallToActionSection";
import { GameSpecificationsSection } from "./sections/GameSpecificationsSection";
import { PreOrderSection } from "./sections/PreOrderSection";
import { WaitlistSignupSection } from "./sections/WaitlistSignupSection";
import { FooterSection } from "./sections/FooterSection";
import { useAuth } from "@/hooks/useAuth";

const HomePage = () => {
  const waitlistRef = useRef<HTMLDivElement>(null);
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  // Debug images on mount
  useEffect(() => {
    // Log available images in public directory
    console.log("Public URL path:", import.meta.env.BASE_URL);
  }, []);

  const scrollToWaitlist = () => {
    if (user) {
      // If logged in, go to appropriate dashboard instead
      const dashboardPath = profile?.role === 'admin' ? '/dashboard' : '/player';
      navigate(dashboardPath);
    } else {
      // Scroll to waitlist for non-logged-in users
      waitlistRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <HeroSection scrollToWaitlist={scrollToWaitlist} />
      {/* Content sections with improved spacing and ID anchors */}
      <div className="space-y-16 md:space-y-24">
        <section id="overview"><GameOverviewSection /></section>
        <section id="features"><KeyFeaturesSection /></section>
        <CallToActionSection scrollToWaitlist={scrollToWaitlist} />
        <section id="faq"><GameSpecificationsSection /></section>
        <PreOrderSection />
        <WaitlistSignupSection ref={waitlistRef} />
      </div>
      <FooterSection />
    </div>
  );
};

export default HomePage;
