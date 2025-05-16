
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Users, Info, CupSoda, Zap, Video } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

/**
 * Flomanji "HeroSection" featuring the Goblet as a central element
 * - Highlights the Goblet AI game master as the heart of the 1987-themed game experience
 * - Maintains responsive hero that always fills the viewport
 * - Enhanced text contrast & visual hierarchy with 80s-inspired neon effects
 */
export const HeroSection = ({
  scrollToWaitlist,
}: {
  scrollToWaitlist: () => void;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [scanlineActive, setScanlineActive] = useState(true);

  // Background image
  const bgImageUrl = "/lovable-uploads/a8353376-c4a1-4f22-b62b-9f2145532f1a.png";

  // VHS effect for hero section
  useEffect(() => {
    const interval = setInterval(() => {
      // Random glitch effect
      if (Math.random() > 0.7) {
        setScanlineActive(false);
        setTimeout(() => setScanlineActive(true), 150);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Load background image
  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
    img.src = bgImageUrl;
  }, [bgImageUrl]);

  return (
    // FULL HEIGHT HERO: fills the screen always.
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black"
      aria-label="Flomanji - Game with Goblet AI game master set in 1987 Florida"
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

        {/* 80s-inspired scanlines effect */}
        {scanlineActive && (
          <div 
            className="absolute inset-0 z-15 pointer-events-none opacity-10 mix-blend-overlay"
            style={{
              backgroundImage: "linear-gradient(0deg, rgba(0,0,0,0.2) 50%, transparent 50%)",
              backgroundSize: "100% 4px",
              animation: "noise 0.2s infinite",
            }}
            aria-hidden="true"
          />
        )}

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

        {/* 80s grid horizon effect */}
        <div 
          className="absolute bottom-0 w-full h-[30vh] z-5 perspective-500 opacity-10"
          style={{
            background: "linear-gradient(to top, rgba(0,224,255,0.2) 0%, transparent 100%)",
            transform: "rotateX(75deg)",
            backgroundImage: "repeating-linear-gradient(to right, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(to bottom, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 1px, transparent 1px, transparent 20px)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Debug for image error */}
      {imageError && (
        <div className="absolute top-4 left-4 bg-red-500 text-white p-2 z-50 rounded text-sm">
          Background image failed to load. Path: {bgImageUrl}
        </div>
      )}

      {/* "1987" timestamp in corner */}
      <div className="absolute top-4 right-4 z-40 bg-black/50 text-white px-2 py-1 text-xs font-mono border border-white/20 rounded">
        REC 1987-05-16
      </div>

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
            {/* Logo / Title with 80s-inspired styling */}
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 md:mb-2 leading-tight drop-shadow-[0_2px_10px_rgba(249,220,94,0.18)] text-center md:text-left max-w-full break-words font-playfair">
              <span className="block text-white animate-[fade-in_0.67s_ease-in] drop-shadow-[0_2px_10px_rgba(255,255,255,0.17)]" style={{textShadow: "0 0 10px rgba(255,105,180,0.5), 0 0 20px rgba(255,105,180,0.3)"}}>
                FLOMANJI
              </span>
              <span 
                className="block text-transparent bg-clip-text animate-[fade-in_1.15s_ease-in]"
                style={{
                  backgroundImage: "linear-gradient(to right, #ff6ec4, #7873f5)",
                  textShadow: "0 0 10px rgba(120,115,245,0.8), 0 0 20px rgba(120,115,245,0.4)",
                }}
              >
                THE GOBLET'S REALM
              </span>
              <span className="text-xs md:text-sm font-light block mt-1 text-amber-300/70">FLORIDA 1987</span>
            </h1>

            {/* Subheading */}
            <p className="text-center md:text-left text-base md:text-xl max-w-xl mb-8 text-white/95 font-medium drop-shadow-[0_2px_9px_rgba(0,0,0,0.25)] leading-relaxed animate-fade-in">
              Experience the thrill of adventure through the eyes of Goblet - your ornately carved AI game master who brings the wild world of 1987 Florida to life, where neon meets the supernatural.
            </p>
            
            {/* 80s-inspired CTA Button */}
            <div className="w-full flex justify-center md:justify-start mb-8">
              <Button
                size="lg"
                onClick={scrollToWaitlist}
                className="
                  bg-gradient-to-r from-fuchsia-600 to-blue-600 pointer-events-auto
                  hover:from-fuchsia-500 hover:to-blue-500 text-white font-extrabold
                  px-8 py-6 text-lg md:text-xl rounded-xl
                  shadow-[0_4px_22px_rgba(255,105,180,0.40)]
                  transition-all duration-300 hover:shadow-[0_4px_32px_rgba(255,105,180,0.60)] hover:scale-105
                  animate-fade-in relative overflow-hidden group
                "
                aria-label="Join Beta Waitlist"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                Join Beta Waitlist
                <Zap className="h-5 w-5 ml-1 text-yellow-300 animate-pulse" />
              </Button>
            </div>
            
            {/* Info/Stats Row - 80s video game stats styling */}
            <div className="w-full flex flex-row justify-center md:justify-start items-stretch gap-2 md:gap-8 mt-2 animate-fade-in max-w-md">
              <div className="flex flex-col items-center flex-1 min-w-0 bg-gradient-to-b from-blue-900/20 to-blue-900/10 p-2 rounded border border-blue-500/20">
                <div className="bg-blue-900/30 p-2 rounded-full mb-1">
                  <Clock className="h-5 w-5 md:h-6 md:w-6 text-blue-300" />
                </div>
                <div className="text-xs md:text-base text-white/90 font-medium leading-tight font-mono">
                  <div>30–60</div>
                  <div className="text-[11px] md:text-xs text-blue-300 font-normal mt-[-3px]">min</div>
                </div>
              </div>
              <div className="flex flex-col items-center flex-1 min-w-0 bg-gradient-to-b from-fuchsia-900/20 to-fuchsia-900/10 p-2 rounded border border-fuchsia-500/20">
                <div className="bg-fuchsia-900/30 p-2 rounded-full mb-1">
                  <Users className="h-5 w-5 md:h-6 md:w-6 text-fuchsia-300" />
                </div>
                <div className="text-xs md:text-base text-white/90 font-medium leading-tight font-mono">
                  <div>2–6</div>
                  <div className="text-[11px] md:text-xs text-fuchsia-300 font-normal mt-[-3px]">players</div>
                </div>
              </div>
              <div className="flex flex-col items-center flex-1 min-w-0 bg-gradient-to-b from-cyan-900/20 to-cyan-900/10 p-2 rounded border border-cyan-500/20">
                <div className="bg-cyan-900/30 p-2 rounded-full mb-1">
                  <Info className="h-5 w-5 md:h-6 md:w-6 text-cyan-300" />
                </div>
                <div className="text-xs md:text-base text-white/90 font-medium leading-tight font-mono">
                  <div>Ages</div>
                  <div className="text-[11px] md:text-xs text-cyan-300 font-normal mt-[-3px]">12+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column: Goblet Feature - 80s CRT Monitor style */}
        <div className="md:w-1/2 mt-8 md:mt-0 max-w-md mx-auto">
          <div 
            className="
              relative
              bg-gradient-to-b from-gray-900 to-black
              rounded-2xl overflow-hidden
              p-1
              shadow-[0_0px_32px_0_rgba(0,224,255,0.3)]
              animate-fade-in
              border-4 border-gray-800
            "
            style={{
              boxShadow: "inset 0 0 20px rgba(0,224,255,0.2)"
            }}
          >
            {/* CRT Monitor frame */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 rounded-lg" style={{
                boxShadow: "inset 0 0 20px rgba(0,0,0,0.6)",
                background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%)"
              }}></div>
            </div>

            {/* Monitor power button */}
            <div className="absolute -bottom-2 right-8 w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-700 flex items-center justify-center z-10">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
            
            {/* Goblet Header - like a CRT display title */}
            <div className="flex items-center justify-center md:justify-start mb-2 bg-gray-900 p-3 border-b border-gray-700">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1 absolute top-0 left-0 right-0"></div>
              <CupSoda className="h-8 w-8 md:h-10 md:w-10 text-cyan-400 mr-3 animate-pulse" />
              <h2 className="text-2xl md:text-3xl font-bold" style={{
                color: "#00e0ff",
                textShadow: "0 0 5px #00e0ff, 0 0 20px #00e0ff"
              }}>
                <span className="font-mono">GOBLET</span>
                <span className="text-cyan-300 font-mono text-xs block">AI TERMINAL v1.987</span>
              </h2>
            </div>

            {/* Goblet Illustration - CRT terminal style */}
            <div className="relative bg-black p-4">
              <div className="rounded-lg overflow-hidden border border-cyan-900/60">
                <AspectRatio ratio={4/3} className="bg-black w-full">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/10 to-black/40">
                    <div className="text-center">
                      <div className="w-28 h-28 md:w-36 md:h-36 mx-auto bg-gray-800 rounded-full mb-2 p-2 border border-cyan-900/30">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-900 to-blue-900 flex items-center justify-center">
                          <CupSoda className="w-14 h-14 md:w-20 md:h-20 text-cyan-300" />
                        </div>
                      </div>
                      <div className="font-mono text-cyan-300 mt-2 text-lg tracking-widest">THE GOBLET</div>
                      <div className="font-mono text-cyan-500/50 text-xs">INITIALIZING FLORIDA.SYS...</div>
                    </div>
                  </div>
                  
                  {/* VHS scan lines */}
                  <div className="absolute inset-0 bg-gradient-to-b pointer-events-none" style={{
                    backgroundImage: "repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 1px, rgba(0,0,0,0.1) 1px, rgba(0,0,0,0.1) 2px)",
                    backgroundSize: "100% 4px",
                    opacity: 0.3,
                    mixBlendMode: "overlay"
                  }}></div>
                </AspectRatio>
              </div>
              <div className="absolute -bottom-3 -right-3 bg-cyan-700/80 text-white text-xs px-3 py-1 rounded-full border border-cyan-600 shadow-lg">
                AI Powered
              </div>
            </div>

            {/* Goblet Description - Terminal text style */}
            <div className="space-y-3 text-sm md:text-base p-4 bg-gray-900/70">
              <p className="text-cyan-100 leading-relaxed font-mono text-sm">
                <span className="text-cyan-300 font-medium inline-block w-3">&gt;</span> Carved from ancient cypress wood, <span className="text-cyan-300 font-semibold">Goblet</span> is your AI Game Master, storyteller, and guide through the swampy chaos of <span className="text-pink-300">1987 Florida</span>.
              </p>
              <p className="text-cyan-100/80 leading-relaxed font-mono text-sm">
                <span className="text-cyan-300 font-medium inline-block w-3">&gt;</span> With intricate carvings depicting Florida's finest weirdness and an attitude to match, this isn't just a game piece—it's the beating heart of your Flomanji experience.
              </p>
            </div>
            
            {/* Goblet Quote - 80s computer dialog box */}
            <div className="bg-black border border-cyan-700 font-mono p-4 text-sm md:text-base text-green-400 m-4">
              <div className="border-b border-cyan-900/50 pb-1 mb-2 text-xs text-cyan-500">GOBLET.EXE:</div>
              "Stein? STEIN?! Heavens no! I am a meticulously crafted narrative vessel! A conduit of Floridian chaos!"
            </div>

            {/* Learn More Button - 80s style button */}
            <div className="flex justify-center md:justify-start p-4">
              <Button 
                variant="outline" 
                className="text-cyan-300 border-cyan-700/60 hover:bg-cyan-900/40 hover:text-cyan-200 font-mono"
              >
                <span className="mr-1">&gt;</span> ACCESS GOBLET DATA
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
