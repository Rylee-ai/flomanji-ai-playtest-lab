
import React from "react";
import { Button } from "@/components/ui/button";
import { Clock, Users, Info } from "lucide-react";

/**
 * HeroSection component with a clean, dark design matching the Flomanji branding.
 * Features minimal UI with focused typography and clear call-to-action.
 */
export const HeroSection = ({ scrollToWaitlist }: { scrollToWaitlist: () => void }) => (
  <section
    className="relative bg-black py-32"
    style={{
      backgroundImage: "url('/lovable-uploads/f18d36ef-86da-4cd5-b934-11c435cb4fd7.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundBlendMode: "darken"
    }}
  >
    {/* Simple dark overlay for text readability */}
    <div className="absolute inset-0 bg-black/70"></div>
    
    <div className="container relative mx-auto px-4 flex flex-col items-start max-w-5xl">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
        FLOMANJI:
        <br />
        <span className="text-amber-300">
          Can You Escape Paradise?
        </span>
      </h1>
      
      <p className="text-lg md:text-xl max-w-2xl mb-8 text-white/90">
        A deck-building survival adventure where paradise and chaos collide
      </p>
      
      <div className="flex gap-4 mb-8">
        <Button
          size="lg"
          onClick={scrollToWaitlist}
          className="bg-amber-400 hover:bg-amber-500 text-black font-semibold"
        >
          Join Beta Waitlist
        </Button>
      </div>
      
      <div className="flex gap-8 text-sm text-white/80">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2" /> 30-60 min
        </div>
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-2" /> 2-6 players
        </div>
        <div className="flex items-center">
          <Info className="h-4 w-4 mr-2" /> Ages 12+
        </div>
      </div>
    </div>
  </section>
);
