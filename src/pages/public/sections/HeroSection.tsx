
import React from "react";
import { Button } from "@/components/ui/button";
import { Clock, Users, Info } from "lucide-react";

/**
 * Flomanji Hero Section
 * - Professionally styled for contrast & impact
 * - Background image stored in /public/lovable-uploads
 * - Strong overlay for sunset background, responsive, animated headline
 * - Accessible, legible text and button design per best UI practices
 */
export const HeroSection = ({ scrollToWaitlist }: { scrollToWaitlist: () => void }) => (
  <section
    className="relative min-h-[500px] md:min-h-[620px] flex items-center"
    style={{
      backgroundImage: "url('/lovable-uploads/f57e2c5d-6d50-4028-8801-9257b1fc3405.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
    aria-label="Flomanji introductory section"
  >
    {/* High-contrast multi-layered overlay for text clarity */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-amber-950/70 z-0"></div>
    <div className="absolute inset-0 bg-black/40 z-0"></div>
    {/* Content */}
    <div className="container relative z-10 mx-auto px-4 max-w-4xl flex flex-col items-start">
      <h1
        className="text-white text-4xl md:text-6xl font-black mb-4 leading-tight drop-shadow-xl animate-fade-in"
        style={{
          textShadow: "0 4px 24px rgba(0,0,0,0.72), 1px 1px 8px #000",
        }}
      >
        <span
          className="bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent animate-gradient-x"
          style={{
            WebkitTextStroke: "2px #000A",
          }}
        >
          FLOMANJI:
        </span>
        <br />
        <span
          className="font-bold text-amber-300"
          style={{
            textShadow: "0 3px 14px #0009, 0 1px 0 #fff8",
            letterSpacing: "1px",
          }}
        >
          Can You Escape Paradise?
        </span>
      </h1>
      <p className="text-lg md:text-2xl max-w-2xl mb-8 text-white/90 font-semibold drop-shadow-md animate-fade-in" style={{ textShadow: "0 1px 10px #000a" }}>
        A deck-building survival adventure where paradise and chaos collide.
      </p>
      <div className="flex gap-4 mb-8 animate-fade-in-slow">
        <Button
          size="lg"
          onClick={scrollToWaitlist}
          className="bg-amber-400 hover:bg-amber-300 text-black shadow-lg border-2 border-amber-500/60 transition-transform hover:scale-105 focus:ring-4 focus:ring-amber-500/40"
          aria-label="Join Beta Waitlist"
        >
          Join Beta Waitlist
        </Button>
      </div>
      <div className="flex gap-5 text-base text-white/90 font-medium drop-shadow-sm animate-fade-in-slow">
        <div className="flex items-center">
          <Clock className="h-5 w-5 mr-2 text-amber-200" aria-hidden="true" /> 30–60 min
        </div>
        <div className="flex items-center">
          <Users className="h-5 w-5 mr-2 text-amber-200" aria-hidden="true" /> 2–6 players
        </div>
        <div className="flex items-center">
          <Info className="h-5 w-5 mr-2 text-amber-200" aria-hidden="true" /> Ages 12+
        </div>
      </div>
    </div>
    {/* Decorative overlay for expert polish */}
    <div className="absolute inset-0 pointer-events-none z-5">
      <div className="h-full w-full bg-gradient-radial from-amber-500/5 to-transparent"></div>
    </div>
  </section>
);

