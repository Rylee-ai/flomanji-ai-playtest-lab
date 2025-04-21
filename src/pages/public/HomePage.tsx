
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HeroSection } from "./sections/HeroSection";
import { GameOverviewSection } from "./sections/GameOverviewSection";
import { KeyFeaturesSection } from "./sections/KeyFeaturesSection";
import { DesignPillarsSection } from "./sections/DesignPillarsSection";
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
