
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Users, Info, Upload, ChevronDown } from "lucide-react";

/**
 * Premium HeroSection component with advanced overlay techniques and responsive design
 * Features parallax-like text animation, dynamic content scaling, and optimal readability
 */
export const HeroSection = ({ scrollToWaitlist }: { scrollToWaitlist: () => void }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Image path - using the uploaded image
  const bgImageUrl = "/lovable-uploads/97c599e5-03f2-41f1-92c1-98dd4affe648.png"; 
  
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
    
    // Add scroll listener for subtle parallax effect
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      // Clean up
      img.onload = null;
      img.onerror = null;
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      className="relative min-h-[90vh] md:min-h-[85vh] flex items-center overflow-hidden"
      style={{
        backgroundImage: imageLoaded ? `url('${bgImageUrl}')` : 'none',
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Fallback gradient in case image doesn't load */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-b from-amber-600/90 to-amber-950/90"></div>
      )}
      
      {/* Multi-layered overlay for depth and contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
      
      {/* Content container */}
      <div 
        className={`container relative mx-auto px-4 pt-16 pb-24 flex flex-col items-start max-w-5xl transition-all duration-500 ${
          scrolled ? 'translate-y-4 opacity-90' : ''
        }`}
      >
        {/* Decorative elements */}
        <div className="absolute -left-4 top-1/4 w-20 h-20 rounded-full bg-amber-500/20 blur-2xl"></div>
        <div className="absolute right-1/4 -top-10 w-32 h-32 rounded-full bg-amber-700/10 blur-3xl"></div>
        
        {/* Badge */}
        <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-amber-500/20 backdrop-blur-sm border border-amber-500/30">
          <span className="text-xs font-medium text-amber-300">NEW CARD GAME</span>
        </div>
        
        {/* Main heading with text shadow for better contrast */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white tracking-tight leading-tight">
          FLOMANJI:
          <br />
          <span className="text-amber-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            Can You Escape Paradise?
          </span>
        </h1>
        
        {/* Tagline with enhanced readability */}
        <p className="text-xl md:text-2xl max-w-2xl mb-8 text-white/90 font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          A deck-building survival adventure where paradise and chaos collide
        </p>
        
        {/* CTA area with stacked buttons for mobile, side-by-side for desktop */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto">
          <Button
            size="lg"
            onClick={scrollToWaitlist}
            className="bg-amber-500 hover:bg-amber-600 text-black font-semibold shadow-lg backdrop-blur text-base px-8 py-6 h-auto"
          >
            Join Beta Waitlist
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-amber-300/30 text-amber-300 hover:bg-amber-500/10 font-medium backdrop-blur-sm text-base px-8 py-6 h-auto"
            onClick={() => window.location.href = '/gameplay'}
          >
            Explore Gameplay
          </Button>
        </div>
        
        {/* Game specification indicators with custom styling */}
        <div className="flex flex-wrap gap-6 text-sm text-white/90">
          <div className="flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
            <Clock className="h-5 w-5 mr-2 text-amber-400" /> 30-60 min
          </div>
          <div className="flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
            <Users className="h-5 w-5 mr-2 text-amber-400" /> 2-6 players
          </div>
          <div className="flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
            <Info className="h-5 w-5 mr-2 text-amber-400" /> Ages 12+
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce opacity-80 hidden md:flex">
          <span className="text-amber-300 text-sm mb-2">Scroll to discover</span>
          <ChevronDown className="h-5 w-5 text-amber-300" />
        </div>
        
        {/* Error message with instructions if image fails to load */}
        {imageError && (
          <div className="mt-4 p-3 bg-red-500/80 text-white rounded text-sm flex items-center">
            <Upload className="h-4 w-4 mr-2" />
            <span>
              Image failed to load. Please check the file path and try again.
            </span>
          </div>
        )}
      </div>

      {/* Bottom gradient fade for smoother section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};
