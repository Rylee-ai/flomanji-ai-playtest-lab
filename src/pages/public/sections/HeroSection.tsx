
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Users, Info } from "lucide-react";

export const HeroSection = ({ scrollToWaitlist }: { scrollToWaitlist: () => void }) => (
  <section className="relative bg-[url('/lovable-uploads/ce75a97c-6836-41ee-b39b-1719726cb097.png')] bg-cover bg-center py-32">
    <div className="absolute inset-0 bg-black/60"></div>
    <div className="container relative mx-auto px-4 flex flex-col items-start max-w-5xl">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        FLOMANJI:<br />
        <span className="text-amber-400">Can You Escape Paradise?</span>
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-300">
        A deck-building survival adventure where paradise and chaos collide
      </p>
      <div className="flex gap-4 mb-8">
        <Button size="lg" onClick={scrollToWaitlist} className="bg-amber-500 hover:bg-amber-600 text-black">
          Join Beta Waitlist
        </Button>
      </div>
      <div className="flex gap-4 text-sm text-gray-400">
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
    </div>
  </section>
);
