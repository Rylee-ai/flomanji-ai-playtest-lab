
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Users, Info } from "lucide-react";

/**
 * Flomanji "HeroSection" (Award-Grade Visual and Usability)
 * - Dramatic, clear bottom-aligned Gator & Sunset background
 * - Enhanced text contrast & pop with blur/glassmorphism, drop-shadows, and subtle glow
 * - Animated ambient effects for energy
 * - Fully accessible and responsive professional hero layout
 */
export const HeroSection = ({
  scrollToWaitlist,
}: {
  scrollToWaitlist: () => void;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Updated path with the newly uploaded image
  const bgImageUrl = "/lovable-uploads/fa04ed1d-8476-43c3-8002-651032803227.png";
  
  // Check if image loads properly
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      console.log("Background image loaded successfully");
      setImageLoaded(true);
    };
    img.onerror = (e) => {
      console.error("Background image failed to load:", bgImageUrl, e);
      setImageError(true);
    };
    img.src = bgImageUrl;
  }, [bgImageUrl]);

  return (
    <section
      className="relative min-h-[75vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden bg-black"
      style={{
        backgroundImage: imageLoaded ? `url('${bgImageUrl}')` : "none",
        backgroundPosition: "center bottom",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      aria-label="Flomanji - Gator sunset hero background"
    >
      {/* Apply a gradient overlay for text readability */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(to top, rgba(10,10,20,0.86) 8%, rgba(10,10,20,0.60) 45%, rgba(10,10,20,0.13) 90%, rgba(0,0,0,0.00) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Ambient animated orange glow (subtle, loops) */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[16vw] max-w-4xl rounded-full blur-3xl opacity-60 animate-pulse"
        style={{
          background: "radial-gradient(ellipse at center, rgba(252,174,38,0.37) 0%, rgba(252,174,38,0.09) 70%, rgba(252,174,38,0) 100%)"
        }}
        aria-hidden="true"
      />
      {/* Extra orange sunset reflection shimmer */}
      <div
        className="pointer-events-none absolute bottom-[14%] left-1/2 -translate-x-1/2 w-[40vw] h-[4vw] max-w-xl rounded-full blur-2xl opacity-40 animate-fade-in"
        style={{
          background: "radial-gradient(ellipse at center, rgba(251,191,36,0.29) 0%, rgba(251,191,36,0.03) 80%)"
        }}
        aria-hidden="true"
      />

      {/* Dim overall dark veil for text contrast (gentler, topmost) */}
      <div className="absolute inset-0 bg-black/[0.15] md:bg-black/[0.19] pointer-events-none z-10"
           aria-hidden="true"
      />

      {/* Debug message for image loading issues - only visible during development */}
      {imageError && (
        <div className="absolute top-4 left-4 bg-red-500 text-white p-2 z-50 rounded text-sm">
          Background image failed to load. Path: {bgImageUrl}
        </div>
      )}

      {/* Main content */}
      <div className="relative z-20 container mx-auto px-4 md:px-8 max-w-6xl">
        <div
          className="
            bg-black/60 shadow-[0_2px_48px_0_rgba(0,0,0,0.4)]
            backdrop-blur-2xl border border-white/10 rounded-2xl
            p-7 md:p-12
            flex flex-col items-center
            animate-fade-in
          "
          style={{
            boxShadow: '0 6px 32px 0 rgba(252,174,38,0.15), 0 4px 40px 0 rgba(0,0,0,0.55)',
          }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-tight drop-shadow-[0_2px_10px_rgba(249,220,94,0.30)] text-center">
            <span className="block text-white animate-[fade-in_0.57s_ease-in] drop-shadow-[0_2px_10px_rgba(255,255,255,0.20)]">FLOMANJI:</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-500 drop-shadow-[0_2px_9px_rgba(252,174,38,0.38)] animate-[fade-in_1.2s_ease-in]">
              Can You Escape Paradise?
            </span>
          </h1>

          <p className="text-center text-xl md:text-2xl max-w-3xl mb-10 text-white/90 font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.36)] leading-relaxed animate-fade-in">
            A deck-building survival adventure where paradise and chaos collide in an unforgettable journey of strategy and suspense.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <Button
              size="lg"
              onClick={scrollToWaitlist}
              className="
                bg-gradient-to-r from-amber-500 to-amber-600 pointer-events-auto
                hover:from-amber-400 hover:to-amber-500 text-black font-extrabold
                px-8 py-6 text-lg md:text-xl rounded-xl
                shadow-[0_4px_22px_rgba(251,191,36,0.44)]
                transition-all duration-300 hover:shadow-[0_4px_32px_rgba(251,191,36,0.66)] hover:scale-105
                animate-fade-in
              "
              aria-label="Join Beta Waitlist"
            >
              Join Beta Waitlist
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 md:gap-10 text-base md:text-lg text-white/85 justify-center animate-fade-in">
            <div className="flex items-center">
              <div className="bg-amber-400/10 p-2 rounded-full mr-3">
                <Clock className="h-5 w-5 text-amber-300" />
              </div>
              <span>30-60 min</span>
            </div>
            <div className="flex items-center">
              <div className="bg-amber-400/10 p-2 rounded-full mr-3">
                <Users className="h-5 w-5 text-amber-300" />
              </div>
              <span>2-6 players</span>
            </div>
            <div className="flex items-center">
              <div className="bg-amber-400/10 p-2 rounded-full mr-3">
                <Info className="h-5 w-5 text-amber-300" />
              </div>
              <span>Ages 12+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
