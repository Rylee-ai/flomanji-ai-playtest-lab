
import React from "react";
import { Button } from "@/components/ui/button";
import { Clock, Users, Info, CupSoda } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

/**
 * Flomanji "HeroSection" featuring the Goblet as a central element
 * - Highlights the Goblet AI game master as the heart of the game experience
 * - Maintains responsive hero that always fills the viewport
 * - Enhanced text contrast & visual hierarchy
 */
export const HeroSection = ({
  scrollToWaitlist,
}: {
  scrollToWaitlist: () => void;
}) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  // Background image
  const bgImageUrl = "/lovable-uploads/a8353376-c4a1-4f22-b62b-9f2145532f1a.png";

  React.useEffect(() => {
    const img = new window.Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
    img.src = bgImageUrl;
  }, [bgImageUrl]);

  return (
    // FULL HEIGHT HERO: fills the screen always.
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black"
      aria-label="Flomanji - Game with Goblet AI game master"
    >
      {/* Background with all the original styling */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: imageLoaded ? `url('${bgImageUrl}')` : "none",
            backgroundPosition: "center bottom",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            opacity: imageLoaded ? 1 : 0,
            transition: "opacity 0.7s",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,20,0.85) 10%, rgba(10,10,20,0.60) 50%, rgba(10,10,20,0.20) 80%, rgba(0,0,0,0) 100%)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[70vw] h-[14vw] max-w-3xl rounded-full blur-3xl opacity-60 pulse z-20"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(252,174,38,0.35) 0%, rgba(252,174,38,0.07) 70%, rgba(252,174,38,0) 100%)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-[12%] left-1/2 -translate-x-1/2 w-[35vw] h-[3.5vw] max-w-lg rounded-full blur-2xl opacity-40 animate-fade-in z-20"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(251,191,36,0.28) 0%, rgba(251,191,36,0.02) 80%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-black/[0.14] md:bg-black/[0.20] pointer-events-none z-30"
          aria-hidden="true"
        />
      </div>

      {/* Debug for image error */}
      {imageError && (
        <div className="absolute top-4 left-4 bg-red-500 text-white p-2 z-50 rounded text-sm">
          Background image failed to load. Path: {bgImageUrl}
        </div>
      )}

      {/* Main Hero Content - Two-Column Layout for Desktop */}
      <div className="relative z-40 container mx-auto px-4 md:px-8 max-w-6xl flex flex-col md:flex-row items-center justify-center h-full gap-8 py-12">
        {/* Left Column: Game Info */}
        <div className="md:w-1/2 flex flex-col items-center md:items-start">
          <div
            className="
              bg-black/65 
              shadow-[0_2px_44px_0_rgba(0,0,0,0.33)]
              backdrop-blur-2xl border border-white/10 rounded-2xl
              flex flex-col items-center md:items-start justify-center
              w-full max-w-2xl
              pb-8 pt-10 px-8 md:pb-12 md:pt-14 md:px-12
              animate-fade-in
            "
            style={{
              boxShadow:
                "0 6px 32px 0 rgba(252,174,38,0.08), 0 4px 40px 0 rgba(0,0,0,0.44)",
            }}
          >
            {/* Logo / Title */}
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 md:mb-2 leading-tight drop-shadow-[0_2px_10px_rgba(249,220,94,0.18)] text-center md:text-left max-w-full break-words">
              <span className="block text-white animate-[fade-in_0.67s_ease-in] drop-shadow-[0_2px_10px_rgba(255,255,255,0.17)]">
                FLOMANJI:
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-500 drop-shadow-[0_2px_8.5px_rgba(252,174,38,0.25)] animate-[fade-in_1.15s_ease-in]">
                Twin-Timer Survival
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-center md:text-left text-base md:text-xl max-w-xl mb-8 text-white/95 font-medium drop-shadow-[0_2px_9px_rgba(0,0,0,0.25)] leading-relaxed animate-fade-in">
              Balance Heat and Weirdness as you navigate through a dangerous paradise, where character transformation and strategic action management are essential for survival.
            </p>
            
            {/* CTA Button */}
            <div className="w-full flex justify-center md:justify-start mb-8">
              <Button
                size="lg"
                onClick={scrollToWaitlist}
                className="
                  bg-gradient-to-r from-amber-500 to-amber-600 pointer-events-auto
                  hover:from-amber-400 hover:to-amber-500 text-black font-extrabold
                  px-8 py-6 text-lg md:text-xl rounded-xl
                  shadow-[0_4px_22px_rgba(251,191,36,0.40)]
                  transition-all duration-300 hover:shadow-[0_4px_32px_rgba(251,191,36,0.60)] hover:scale-105
                  animate-fade-in
                "
                aria-label="Join Beta Waitlist"
              >
                Join Beta Waitlist
              </Button>
            </div>
            
            {/* Info/Stats Row */}
            <div className="w-full flex flex-row justify-center md:justify-start items-stretch gap-2 md:gap-8 mt-2 animate-fade-in max-w-md">
              <div className="flex flex-col items-center flex-1 min-w-0">
                <div className="bg-amber-400/10 p-2 rounded-full mb-1">
                  <Clock className="h-5 w-5 md:h-6 md:w-6 text-amber-300" />
                </div>
                <div className="text-xs md:text-base text-white/90 font-medium leading-tight">
                  <div>30–60</div>
                  <div className="text-[11px] md:text-xs text-white/60 font-normal mt-[-3px]">min</div>
                </div>
              </div>
              <div className="flex flex-col items-center flex-1 min-w-0">
                <div className="bg-amber-400/10 p-2 rounded-full mb-1">
                  <Users className="h-5 w-5 md:h-6 md:w-6 text-amber-300" />
                </div>
                <div className="text-xs md:text-base text-white/90 font-medium leading-tight">
                  <div>2–6</div>
                  <div className="text-[11px] md:text-xs text-white/60 font-normal mt-[-3px]">players</div>
                </div>
              </div>
              <div className="flex flex-col items-center flex-1 min-w-0">
                <div className="bg-amber-400/10 p-2 rounded-full mb-1">
                  <Info className="h-5 w-5 md:h-6 md:w-6 text-amber-300" />
                </div>
                <div className="text-xs md:text-base text-white/90 font-medium leading-tight">
                  <div>Ages</div>
                  <div className="text-[11px] md:text-xs text-white/60 font-normal mt-[-3px]">12+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column: Goblet Feature */}
        <div className="md:w-1/2 mt-8 md:mt-0 max-w-md mx-auto">
          <div 
            className="
              bg-gradient-to-b from-emerald-900/40 via-teal-800/30 to-amber-900/40
              backdrop-blur-sm border border-emerald-700/20 rounded-2xl overflow-hidden
              p-6 md:p-8
              shadow-[0_8px_32px_0_rgba(5,150,105,0.2)]
              animate-fade-in
            "
          >
            {/* Goblet Header */}
            <div className="flex items-center justify-center md:justify-start mb-4">
              <CupSoda className="h-8 w-8 md:h-10 md:w-10 text-emerald-500 mr-3 animate-pulse" />
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-300">
                Meet The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-200 to-teal-300">Goblet</span>
              </h2>
            </div>

            {/* Goblet Illustration */}
            <div className="mb-4 relative">
              <div className="rounded-lg overflow-hidden border-2 border-emerald-900/60">
                <AspectRatio ratio={4/3} className="bg-black/30 w-full">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/10 to-black/40">
                    <div className="text-center text-white text-sm">
                      [Goblet Illustration Here]
                    </div>
                  </div>
                </AspectRatio>
              </div>
              <div className="absolute -bottom-3 -right-3 bg-emerald-700/80 text-white text-xs px-3 py-1 rounded-full border border-emerald-600 shadow-lg">
                AI Powered
              </div>
            </div>

            {/* Goblet Description */}
            <div className="space-y-3 text-sm md:text-base mb-4">
              <p className="text-white/90 leading-relaxed">
                Carved from ancient cypress wood, <span className="text-emerald-300 font-medium">Goblet</span> is your AI Game Master, storyteller, and guide through the swampy chaos of Flomanji.
              </p>
              <p className="text-white/80 leading-relaxed">
                With intricate carvings depicting Florida's finest weirdness and an attitude to match, this isn't just a game piece—it's the beating heart of your Flomanji experience.
              </p>
            </div>
            
            {/* Goblet Quote */}
            <div className="bg-black/40 border-l-4 border-emerald-500 italic p-4 text-sm md:text-base text-white/90 mb-4">
              "Stein? STEIN?! Heavens no! I am a meticulously crafted narrative vessel! A conduit of Floridian chaos!"
            </div>

            {/* Learn More Button */}
            <div className="flex justify-center md:justify-start">
              <Button 
                variant="outline" 
                className="text-emerald-300 border-emerald-700/60 hover:bg-emerald-900/40 hover:text-emerald-200"
              >
                Discover Goblet's Story
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
