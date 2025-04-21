
import React from "react";
import { GameSpecificationsSection } from "./sections/GameSpecificationsSection";
import { FooterSection } from "./sections/FooterSection";
import { Link } from "react-router-dom";

const FAQPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 pt-16">
        <Link to="/" className="text-amber-400 hover:underline mb-8 inline-flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
        <GameSpecificationsSection />
      </div>
      <FooterSection />
    </div>
  );
};

export default FAQPage;
