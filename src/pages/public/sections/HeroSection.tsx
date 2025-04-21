
import React from "react";
import { Button } from "@/components/ui/button";
import { Clock, Users, Info } from "lucide-react";

/**
 * Flomanji "HeroSection"
 * - Uses attached image as striking background (cover, never repeat)
 * - Linear dark overlay + glass effect panel for max legibility and prestige
 * - Large, bold, high-contrast text and responsive layout
 * - Professional, award-caliber UI
 */
export const HeroSection = ({
  scrollToWaitlist,
}: {
  scrollToWaitlist: () => void;
}) => (
  <section
    className="relative min-h-[65vh] md:min-h-[82vh] flex items-center justify-center"
    style={{
      backgroundImage:
        "linear-gradient(120deg, rgba(20,18,30,0.84) 55%, rgba(16, 12, 12, 0.55) 80%), url('/lovable-uploads/fa5f67b9-4e09-4e5b-a492-8e94935c05d5.png')",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }}
    aria-label="Hero background alligators at sunset"
  >
    {/* Glass panel overlays */}
    <div className="relative w-full flex justify-center">
      <div className="glass-morphism max-w-3xl md:max-w-4xl xl:max-w-5xl mx-4 px-6 py-10 md:py-14 rounded-3xl shadow-xl border border-white/10 bg-black/50 backdrop-blur-xl"
        style={{
          boxShadow:
            "0 6px 32px 2px rgba(0,0,0,.77), 0 1.5px 6px 0 rgba(43,23,46,.21)",
        }}
        >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-3 text-gradient-primary drop-shadow-lg leading-tight">
          FLOMANJI:
          <br />
          <span className="text-amber-400 bg-gradient-to-tr from-amber-400 via-yellow-200/95 to-white/85 bg-clip-text text-transparent">
            Can You Escape Paradise?
          </span>
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl mb-9 text-gray-100 font-semibold leading-relaxed drop-shadow-sm">
          A deck-building survival adventure where paradise and chaos collide.
        </p>
        <div className="flex gap-4 flex-wrap mb-8">
          <Button
            size="lg"
            onClick={scrollToWaitlist}
            className="bg-amber-400 hover:bg-amber-500 text-black font-bold shadow-lg px-8 py-3 text-lg rounded-xl transition hover-scale animate-fade-in"
          >
            Join Beta Waitlist
          </Button>
        </div>
        <div className="flex gap-6 text-sm text-gray-200 mt-6">
          <div className="flex items-center drop-shadow-md">
            <Clock className="h-4 w-4 mr-2 opacity-80" /> 30-60 min
          </div>
          <div className="flex items-center drop-shadow-md">
            <Users className="h-4 w-4 mr-2 opacity-80" /> 2-6 players
          </div>
          <div className="flex items-center drop-shadow-md">
            <Info className="h-4 w-4 mr-2 opacity-80" /> Ages 12+
          </div>
        </div>
      </div>
    </div>
  </section>
);
