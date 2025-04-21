
import React from "react";
import { GameSpecificationsSection } from "./sections/GameSpecificationsSection";

const FAQPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <GameSpecificationsSection />
      </div>
    </div>
  );
};

export default FAQPage;
