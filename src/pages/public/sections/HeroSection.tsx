
import React from "react";
import { Button } from "@/components/ui/button";
import { Clock, Users, Info } from "lucide-react";

/**
 * Flomanji "HeroSection"
 * - Striking and impactful hero section design
 * - Bold typography with custom gradient effects
 * - High-contrast visual elements for maximum impact
 * - Professional, award-caliber UI with dynamic elements
 */
export const HeroSection = ({
  scrollToWaitlist,
}: {
  scrollToWaitlist: () => void;
}) => (
  <section
    className="relative min-h-[75vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden"
    style={{
      backgroundImage:
        "linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.6) 80%), url('/lovable-uploads/941dbf15-8a90-44c4-b925-13fbe867b360.png')",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }}
  >
    {/* Ambient glow effect */}
    <div 
      className="absolute bottom-0 right-0 w-1/2 h-1/2 rounded-full blur-3xl" 
      style={{ background: "radial-gradient(circle, rgba(251,191,36,0.1) 0%, rgba(251,191,36,0) 70%)" }}
    ></div>
    
    <div className="absolute top-0 left-0 w-full h-full bg-black/20 backdrop-blur-[2px]"></div>
    
    {/* Main content */}
    <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-6xl">
      <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 leading-tight">
          <span className="block text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]">FLOMANJI:</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 drop-shadow-[0_2px_5px_rgba(251,191,36,0.5)]">
            Can You Escape Paradise?
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl max-w-3xl mb-10 text-white/90 font-medium drop-shadow-md leading-relaxed">
          A deck-building survival adventure where paradise and chaos collide in an unforgettable journey of strategy and suspense.
        </p>
        
        <div className="flex flex-wrap gap-6 mb-10">
          <Button
            size="lg"
            onClick={scrollToWaitlist}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold px-8 py-6 text-lg md:text-xl rounded-xl shadow-[0_4px_20px_rgba(251,191,36,0.4)] transition-all duration-300 hover:shadow-[0_4px_25px_rgba(251,191,36,0.6)] hover:scale-105"
          >
            Join Beta Waitlist
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-6 md:gap-10 text-base md:text-lg text-white/80">
          <div className="flex items-center">
            <div className="bg-amber-500/10 p-2 rounded-full mr-3">
              <Clock className="h-5 w-5 text-amber-400" />
            </div>
            <span>30-60 min</span>
          </div>
          <div className="flex items-center">
            <div className="bg-amber-500/10 p-2 rounded-full mr-3">
              <Users className="h-5 w-5 text-amber-400" />
            </div>
            <span>2-6 players</span>
          </div>
          <div className="flex items-center">
            <div className="bg-amber-500/10 p-2 rounded-full mr-3">
              <Info className="h-5 w-5 text-amber-400" />
            </div>
            <span>Ages 12+</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);
