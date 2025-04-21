
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Users, Info } from "lucide-react";

/**
 * HeroSection component with improved background image overlay for optimal text contrast.
 * Uses custom dark glass overlay and extra text shadow for white/yellow text to pop against the bright orange sunset.
 */
export const HeroSection = ({ scrollToWaitlist }: { scrollToWaitlist: () => void }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Use an absolute URL to ensure the image is accessible
  const bgImageUrl = "/flomanji-hero-bg.webp";
  
  // Check if image loads properly
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      console.log("Hero background image loaded successfully");
      setImageLoaded(true);
      setImageError(false);
    };
    img.onerror = (e) => {
      console.error("Failed to load hero background image:", e);
      setImageError(true);
      setImageLoaded(false);
    };
    img.src = bgImageUrl;
    
    // Log the complete attempted URL for debugging
    console.log("Attempting to load image from:", window.location.origin + bgImageUrl);
    
    return () => {
      // Clean up
      img.onload = null;
      img.onerror = null;
    };
  }, []);

  return (
    <section
      className={`relative py-32 ${!imageLoaded ? 'bg-gradient-to-b from-amber-900 to-black' : ''}`}
      style={{
        backgroundImage: imageLoaded ? `url('${bgImageUrl}')` : 'none',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Fallback color in case image doesn't load - already applied in className above */}
      
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
        
        {/* Debug info - only show if there's an actual error */}
        {imageError && (
          <div className="mt-4 p-2 bg-red-500/80 text-white rounded text-sm">
            Image failed to load - using fallback styling. Please check if the image file is in the public folder.
          </div>
        )}
      </div>
    </section>
  );
};
