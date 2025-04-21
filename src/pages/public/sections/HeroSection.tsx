
import React from "react";
import { Button } from "@/components/ui/button";
import { Clock, Users, Info } from "lucide-react";

/**
 * Flomanji "HeroSection" (Award-Grade Visual and Usability)
 * - Responsive 16:9 layout enforced via Tailwind aspect ratio utility
 * - Dramatic, clear bottom-aligned Gator & Sunset background
 * - Enhanced text contrast & pop with blur/glassmorphism and subtle glow
 * - Balanced and harmonious internal spacing
 * - Responsive + accessible
 */
export const HeroSection = ({
  scrollToWaitlist,
}: {
  scrollToWaitlist: () => void;
}) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  // Use the user's newly uploaded image
  const bgImageUrl = "/lovable-uploads/a8353376-c4a1-4f22-b62b-9f2145532f1a.png";

  React.useEffect(() => {
    const img = new window.Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
    img.src = bgImageUrl;
  }, [bgImageUrl]);

  return (
    <section
      className="relative w-full flex justify-center items-center overflow-hidden bg-black"
      aria-label="Flomanji - Gator sunset hero background"
    >
      {/* 16:9 aspect ratio - always enforced with aspect-[16/9], fills width on all screens */}
      <div className="relative w-full aspect-[16/9] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 z-0 transition-opacity duration-700"
          style={{
            backgroundImage: imageLoaded ? `url('${bgImageUrl}')` : "none",
            backgroundPosition: "center bottom",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            opacity: imageLoaded ? 1 : 0,
          }}
          aria-hidden="true"
        />

        {/* Gradient overlay for better readability */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,20,0.85) 10%, rgba(10,10,20,0.60) 50%, rgba(10,10,20,0.20) 80%, rgba(0,0,0,0) 100%)",
          }}
          aria-hidden="true"
        />
        {/* Subtle orange glow */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[70vw] h-[14vw] max-w-3xl rounded-full blur-3xl opacity-60 pulse z-20"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(252,174,38,0.35) 0%, rgba(252,174,38,0.07) 70%, rgba(252,174,38,0) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Extra orange shimmer */}
        <div
          className="pointer-events-none absolute bottom-[12%] left-1/2 -translate-x-1/2 w-[35vw] h-[3.5vw] max-w-lg rounded-full blur-2xl opacity-40 animate-fade-in z-20"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(251,191,36,0.28) 0%, rgba(251,191,36,0.02) 80%)",
          }}
          aria-hidden="true"
        />

        {/* Slight veil for text contrast */}
        <div
          className="absolute inset-0 bg-black/[0.14] md:bg-black/[0.20] pointer-events-none z-30"
          aria-hidden="true"
        />

        {/* Debug for image error */}
        {imageError && (
          <div className="absolute top-4 left-4 bg-red-500 text-white p-2 z-50 rounded text-sm">
            Background image failed to load. Path: {bgImageUrl}
          </div>
        )}

        {/* Main Hero Content */}
        <div className="relative z-40 container mx-auto px-4 md:px-8 max-w-5xl flex flex-col items-center justify-center h-full">
          <div
            className="
              bg-black/65 
              shadow-[0_2px_44px_0_rgba(0,0,0,0.33)]
              backdrop-blur-2xl border border-white/10 rounded-2xl
              flex flex-col items-center justify-center
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
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 md:mb-6 leading-tight drop-shadow-[0_2px_10px_rgba(249,220,94,0.18)] text-center max-w-full break-words">
              <span className="block text-white animate-[fade-in_0.67s_ease-in] drop-shadow-[0_2px_10px_rgba(255,255,255,0.17)]">
                FLOMANJI:
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-500 drop-shadow-[0_2px_8.5px_rgba(252,174,38,0.25)] animate-[fade-in_1.15s_ease-in]">
                Can You Escape Paradise?
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-center text-base md:text-xl max-w-xl mb-8 text-white/95 font-medium drop-shadow-[0_2px_9px_rgba(0,0,0,0.25)] leading-relaxed animate-fade-in">
              A deck-building survival adventure where paradise and chaos collide in an unforgettable journey of strategy and suspense.
            </p>
            
            {/* CTA Button */}
            <div className="w-full flex justify-center mb-8">
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

            {/* Info/Stats */}
            <div className="w-full flex flex-row justify-center items-stretch gap-2 md:gap-8 mt-2 animate-fade-in max-w-md mx-auto">
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
      </div>
    </section>
  );
};

