
import React from "react";
import { Button } from "@/components/ui/button";
import { Clock, Users, Info } from "lucide-react";

export const HeroSection = ({ scrollToWaitlist }: { scrollToWaitlist: () => void }) => (
  <section
    className="relative min-h-[520px] md:min-h-[680px] flex items-center justify-center overflow-hidden"
    style={{
      // New background image with improved contrast overlay
      backgroundImage: `
        linear-gradient(110deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, rgba(77,38,0,0.7) 100%),
        url('/lovable-uploads/b6543f1a-81ad-4398-b243-4a311d527928.png')
      `,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
    data-testid="flomanji-hero"
  >
    {/* Enhanced animated orange glow pulse behind headline */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-96 flex items-center justify-center pointer-events-none select-none z-0">
      <div className="w-80 h-80 rounded-full bg-amber-500/30 blur-[100px] animate-pulse-slow opacity-70"></div>
    </div>
    
    {/* Additional subtle dark gradient for improved text legibility */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#00000099] via-transparent to-[#00000099] z-0"></div>
    
    {/* Main hero content */}
    <div className="container relative mx-auto px-4 flex flex-col gap-8 items-center justify-center max-w-3xl text-center z-10 py-16 md:py-24">
      <h1 className="text-5xl md:text-7xl font-black drop-shadow-2xl leading-tight mb-4 relative bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent animate-fade-in" style={{ textShadow: "0 4px 32px #c56a06cc, 0 2px 10px rgba(0,0,0,0.8)" }}>
        FLOMANJI
        <span className="block text-3xl md:text-5xl font-extrabold tracking-tight text-amber-400 drop-shadow-glow animate-fade-in mt-2">
          Can You Escape Paradise?
        </span>
      </h1>
      
      <p className="text-lg md:text-2xl font-medium text-white max-w-2xl mb-6 mx-auto animate-fade-in drop-shadow-lg">
        A deck-building survival adventure where paradise and chaos collide.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full items-center justify-center mb-8 animate-fade-in">
        <Button
          size="lg"
          onClick={scrollToWaitlist}
          className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8 py-6 shadow-[0_4px_20px_rgba(255,153,0,0.5)] rounded-xl focus-visible:ring-2 focus-visible:ring-amber-400 transition-all duration-300 hover:scale-105"
        >
          Join Beta Waitlist
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-center items-center text-base font-semibold z-10 animate-fade-in">
        <span className="flex items-center bg-black/60 rounded-full px-5 py-2.5 text-amber-300 shadow-md backdrop-blur-md gap-2 border border-amber-900/30 hover:border-amber-500/30 transition-colors">
          <Clock className="h-5 w-5" /> 30-60 min
        </span>
        <span className="flex items-center bg-black/60 rounded-full px-5 py-2.5 text-amber-300 shadow-md backdrop-blur-md gap-2 border border-amber-900/30 hover:border-amber-500/30 transition-colors">
          <Users className="h-5 w-5" /> 2-6 players
        </span>
        <span className="flex items-center bg-black/60 rounded-full px-5 py-2.5 text-amber-300 shadow-md backdrop-blur-md gap-2 border border-amber-900/30 hover:border-amber-500/30 transition-colors">
          <Info className="h-5 w-5" /> Ages 12+
        </span>
      </div>
    </div>
    
    {/* Enhanced animation styles */}
    <style>{`
      @media (max-width: 640px) {
        [data-testid="flomanji-hero"] .container {
          padding-top: 4rem;
          padding-bottom: 4rem;
        }
        [data-testid="flomanji-hero"] h1 {
          font-size: 3rem;
        }
      }
      .drop-shadow-glow {
        text-shadow: 0 0 20px #ffc107ee, 0 6px 40px #c56a0677, 0 2px 10px rgba(0,0,0,0.7);
      }
      .animate-pulse-slow {
        animation: pulse-slow 3s cubic-bezier(0.4,0,0.6,1) infinite;
      }
      @keyframes pulse-slow {
        0%, 100% { opacity: 0.60; transform: scale(1);}
        50% { opacity: 0.95; transform: scale(1.2);}
      }
    `}</style>
  </section>
);
