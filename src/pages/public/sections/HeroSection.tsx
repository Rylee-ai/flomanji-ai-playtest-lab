
import React from "react";
import { Button } from "@/components/ui/button";
import { Clock, Users, Info } from "lucide-react";

export const HeroSection = ({ scrollToWaitlist }: { scrollToWaitlist: () => void }) => (
  <section
    className="relative min-h-[480px] md:min-h-[600px] flex items-center justify-center overflow-hidden"
    style={{
      // Responsive hero image
      backgroundImage: `
        linear-gradient(110deg, rgba(0,0,0,0.75) 60%, rgba(255,133,0,0.30) 100%),
        url('/lovable-uploads/b6b8be6e-6e41-4e0b-a938-eddc6ecf98ea.png')
      `,
      backgroundSize: "cover",
      backgroundPosition: "center 53%",
      backgroundRepeat: "no-repeat",
    }}
    data-testid="flomanji-hero"
  >
    {/* Animated orange glow pulse behind headline for extra drama */}
    <div className="absolute -top-12 left-0 right-0 mx-auto w-full h-80 flex items-center justify-center pointer-events-none select-none z-0">
      <div className="w-60 h-60 rounded-full bg-amber-400/30 blur-3xl animate-pulse-slow opacity-70"></div>
    </div>
    {/* Deeper overlay for text legibility */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#1a1103dd] via-[#fff2] to-black/95 z-0"></div>
    {/* Main hero content */}
    <div className="container relative mx-auto px-4 flex flex-col gap-8 items-center justify-center max-w-3xl text-center z-10 py-12 md:py-20">
      <h1 className="text-5xl md:text-7xl font-black drop-shadow-2xl leading-tight mb-4 relative bg-gradient-to-r from-amber-200 via-yellow-400 to-orange-500 bg-clip-text text-transparent animate-fade-in" style={{ textShadow: "0 4px 32px #c56a06cc" }}>
        FLOMANJI
        <span className="block text-3xl md:text-5xl font-extrabold tracking-tight text-amber-400 drop-shadow-glow animate-fade-in mt-2">
          Can You Escape Paradise?
        </span>
      </h1>
      <p className="text-lg md:text-2xl font-medium text-white/90 max-w-2xl mb-6 mx-auto animate-fade-in">
        A deck-building survival adventure where paradise and chaos collide.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full items-center justify-center mb-8 animate-fade-in">
        <Button
          size="lg"
          onClick={scrollToWaitlist}
          className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8 shadow-2xl rounded-xl focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          Join Beta Waitlist
        </Button>
      </div>
      <div className="flex flex-wrap gap-4 justify-center items-center text-base font-semibold z-10 animate-fade-in">
        <span className="flex items-center bg-black/50 rounded-full px-4 py-2 text-amber-300 shadow-md backdrop-blur-md gap-2">
          <Clock className="h-5 w-5" /> 30-60 min
        </span>
        <span className="flex items-center bg-black/50 rounded-full px-4 py-2 text-amber-300 shadow-md backdrop-blur-md gap-2">
          <Users className="h-5 w-5" /> 2-6 players
        </span>
        <span className="flex items-center bg-black/50 rounded-full px-4 py-2 text-amber-300 shadow-md backdrop-blur-md gap-2">
          <Info className="h-5 w-5" /> Ages 12+
        </span>
      </div>
    </div>
    <style>{`
      @media (max-width: 640px) {
        [data-testid="flomanji-hero"] .container {
          padding-top: 3rem;
          padding-bottom: 3rem;
        }
        [data-testid="flomanji-hero"] h1 {
          font-size: 2rem;
        }
      }
      .drop-shadow-glow {
        text-shadow: 0 0 12px #ffc107ee, 0 4px 36px #c56a0677;
      }
      .animate-pulse-slow {
        animation: pulse-slow 2.4s cubic-bezier(0.4,0,0.6,1) infinite;
      }
      @keyframes pulse-slow {
        0%, 100% { opacity: 0.50; transform: scale(1);}
        50% { opacity: 0.95; transform: scale(1.18);}
      }
    `}</style>
  </section>
);
