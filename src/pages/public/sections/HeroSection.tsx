
import React from "react";
import { Button } from "@/components/ui/button";
import { Clock, Users, Info } from "lucide-react";

/**
 * HeroSection component with improved background image overlay for optimal text contrast.
 * Uses custom dark glass overlay and extra text shadow for white/yellow text to pop against the bright orange sunset.
 */
export const HeroSection = ({ scrollToWaitlist }: { scrollToWaitlist: () => void }) => (
  <section
    className="relative bg-cover bg-center py-32"
    style={{
      backgroundImage: "url('/lovable-uploads/52d4b7d8-3d1d-4104-965e-e075e3a270c1.png')",
    }}
  >
    {/* Strengthened overlay for max readability */}
    <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]"></div>
    <div className="container relative mx-auto px-4 flex flex-col items-start max-w-5xl">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
        FLOMANJI:
        <br />
        <span className="text-amber-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
          Can You Escape Paradise?
        </span>
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mb-8 text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
        A deck-building survival adventure where paradise and chaos collide
      </p>
      <div className="flex gap-4 mb-8">
        <Button
          size="lg"
          onClick={scrollToWaitlist}
          className="bg-amber-400 hover:bg-amber-500 text-black font-semibold shadow-lg backdrop-blur"
        >
          Join Beta Waitlist
        </Button>
      </div>
      <div className="flex gap-4 text-sm text-white/80 drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" /> 30-60 min
        </div>
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1" /> 2-6 players
        </div>
        <div className="flex items-center">
          <Info className="h-4 w-4 mr-1" /> Ages 12+
        </div>
      </div>
    </div>
  </section>
);
