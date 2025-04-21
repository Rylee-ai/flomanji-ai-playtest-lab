
import React from "react";
import { Button } from "@/components/ui/button";
import { Clock, Users, Info } from "lucide-react";

/**
 * Flomanji "HeroSection" (Award-Grade Visual and Usability)
 * - Responsive 16:9 layout enforced via Tailwind aspect ratio utility
 * - Dramatic, clear bottom-aligned Gator & Sunset background
 * - Enhanced text contrast & pop with blur/glassmorphism and strong glow
 * - Centered, balanced, and harmonious internal spacing
 * - Responsive + accessible
 */
export const HeroSection = ({
  scrollToWaitlist,
}: {
  scrollToWaitlist: () => void;
}) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  // Fixed background image
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
      style={{ minHeight: "100svh" }}
    >
      {/* 16:9 aspect ratio block */}
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
            transition: "opacity 0.7s cubic-bezier(.4,0,.2,1)",
          }}
          aria-hidden="true"
        />

        {/* Gradient overlay for readability */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,20,0.88) 30%, rgba(10,10,20,0.44) 80%, rgba(0,0,0,0.17) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Subtle orange glow at bottom */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[75vw] h-[14vw] max-w-4xl rounded-full blur-3xl opacity-60 pulse z-20"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(252,174,38,0.38) 0%, rgba(252,174,38,0.11) 76%, rgba(252,174,38,0.01) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Extra shimmer */}
        <div
          className="pointer-events-none absolute bottom-[17%] left-1/2 -translate-x-1/2 w-[37vw] h-[4vw] max-w-lg rounded-full blur-2xl opacity-50 animate-fade-in z-20"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(251,191,36,0.34) 0%, rgba(251,191,36,0.01) 80%)",
          }}
          aria-hidden="true"
        />

        {/* Black veil for contrast */}
        <div
          className="absolute inset-0 bg-black/20 md:bg-black/30 pointer-events-none z-30"
          aria-hidden="true"
        />

        {/* Debug for image error */}
        {imageError && (
          <div className="absolute top-4 left-4 bg-red-500 text-white p-2 z-50 rounded text-sm">
            Background image failed to load. Path: {bgImageUrl}
          </div>
        )}

        {/* Main Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center z-40">
          <div
            className={`
              bg-gradient-to-br from-black/80 via-black/88 to-black/92
              shadow-[0_4px_80px_0_rgba(252,174,38,0.33),0_0px_0px_8px_rgba(0,0,0,0.6)]
              border border-white/15 backdrop-blur-2xl rounded-3xl
              flex flex-col items-center
              min-w-[320px]
              w-full max-w-[490px]
              px-7 md:px-12 py-10 md:py-16
              mx-auto
              transition-all
              animate-fade-in
              relative
              ring-4 ring-amber-400/25 ring-inset
              after:absolute after:inset-0 after:rounded-3xl after:ring-2 after:ring-amber-400/40 after:pointer-events-none
            `}
            style={{
              boxShadow:
                "0 0 80px 15px rgba(255,205,72,0.10), 0 2px 32px 0 rgba(252,174,38,0.10), 0 0px 0px 2.5px rgba(246,215,108,0.18)",
              backdropFilter: "blur(11px)"
            }}
          >
            {/* Logo / Title */}
            <h1 className="text-center font-extrabold mb-1 animate-fade-in">
              <span
                className="
                  block text-white text-3xl md:text-4xl lg:text-5xl leading-tight 
                  tracking-tight drop-shadow-[0_2px_6px_rgba(255,255,255,0.23)]
                "
                style={{ textShadow: "2px 2px 18px #fff9,0px 2px 5.5px #fbea80" }}
              >
                FLOMANJI:
              </span>
              <span
                className="
                  block text-2xl md:text-3xl lg:text-4xl 
                  bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent
                  font-black drop-shadow-[0_3px_17px_rgba(252,220,38,0.96)]
                  mt-1 mb-2 md:mb-3
                "
                style={{
                  textShadow: "0 0 25px #fbc02d55,0px 2px 7px #ffe176,0px 1.5px 5.5px #ffeeb0",
                }}
              >
                Can You Escape Paradise?
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-center text-base md:text-lg max-w-[90%] mx-auto mb-7 md:mb-9 text-neutral-50/90 font-medium drop-shadow-[0_2px_11px_rgba(0,0,0,0.30)] leading-relaxed animate-fade-in">
              A deck-building survival adventure where paradise and chaos collide in an unforgettable journey of strategy and suspense.
            </p>
            
            {/* CTA Button */}
            <div className="w-full flex justify-center mb-7 md:mb-10">
              <Button
                size="lg"
                onClick={scrollToWaitlist}
                className="
                  bg-gradient-to-r from-amber-400 to-amber-500 hover:from-yellow-300 hover:to-yellow-400
                  text-black font-extrabold py-4 px-10 text-lg md:text-xl rounded-xl
                  shadow-[0_6px_36px_rgba(251,191,36,0.65)]
                  transition-all duration-300 hover:shadow-[0_8px_42px_rgba(251,191,36,0.92)] hover:scale-105
                  focus-visible:ring-4 focus-visible:ring-yellow-300
                  animate-fade-in
                  min-w-[212px]
                  border-none
                "
                aria-label="Join Beta Waitlist"
                style={{
                  boxShadow: "0 6px 36px 0 rgba(251,191,36,0.65), 0 1px 12px 0 rgba(255,220,70,0.22)",
                  fontSize: "1.22rem"
                }}
              >
                Join Beta Waitlist
              </Button>
            </div>

            {/* Info/Stats */}
            <div className="
              flex flex-wrap gap-x-9 gap-y-5 md:gap-x-14 md:gap-y-7 text-sm md:text-base text-white justify-center
              animate-fade-in max-w-xs mx-auto
            ">
              <div className="flex items-center gap-2">
                <div className="bg-neutral-900 border border-yellow-400/60 p-2 rounded-full flex items-center justify-center shadow-[0_2px_9px_rgba(251,191,36,0.11)]">
                  <Clock className="h-5 w-5 text-amber-300" />
                </div>
                <span className="text-neutral-100 font-semibold">30–60 min</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-neutral-900 border border-yellow-400/60 p-2 rounded-full flex items-center justify-center shadow-[0_2px_9px_rgba(251,191,36,0.11)]">
                  <Users className="h-5 w-5 text-amber-300" />
                </div>
                <span className="text-neutral-100 font-semibold">2–6 players</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-neutral-900 border border-yellow-400/60 p-2 rounded-full flex items-center justify-center shadow-[0_2px_9px_rgba(251,191,36,0.11)]">
                  <Info className="h-5 w-5 text-amber-300" />
                </div>
                <span className="text-neutral-100 font-semibold">Ages 12+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
