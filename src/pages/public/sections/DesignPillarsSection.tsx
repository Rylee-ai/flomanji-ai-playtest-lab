
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Rocket, BrainCircuit } from "lucide-react";
import { SectionBadge } from "@/components/sections/SectionBadge";

export const DesignPillarsSection = () => {
  return (
    <section 
      className="py-20 bg-gradient-to-b from-black to-gray-950 relative"
      style={{ minHeight: 500 }}
      data-section="3"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-12 gap-6">
          {/* Left side with badge */}
          <div className="col-span-12 md:col-span-1 flex flex-col items-center">
            <SectionBadge number={3} color="emerald" />
          </div>
          
          {/* Content area */}
          <div className="col-span-12 md:col-span-11">
            <h2 className="text-3xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-emerald-200 to-emerald-400 drop-shadow-md animate-fade-in">
              Design Pillars
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800 shadow-lg overflow-hidden group hover:-translate-y-1 transition-all duration-300 h-full flex flex-col animate-scale-in">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                <CardContent className="pt-8 relative z-10">
                  <div className="bg-gray-800/80 p-3 rounded-lg inline-block mb-4 group-hover:bg-yellow-900/30 group-hover:border-yellow-700/40 transition-colors border border-gray-700/50">
                    <Sparkles className="h-6 w-6 text-yellow-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-400 transition-colors">Emergent Narrative</h3>
                  <p className="text-gray-400 text-sm">
                    AI-driven storytelling ensures every playthrough is unique, with character interactions and plot twists dynamically generated.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800 shadow-lg overflow-hidden group hover:-translate-y-1 transition-all duration-300 h-full flex flex-col animate-scale-in">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                <CardContent className="pt-8 relative z-10">
                  <div className="bg-gray-800/80 p-3 rounded-lg inline-block mb-4 group-hover:bg-green-900/30 group-hover:border-green-700/40 transition-colors border border-gray-700/50">
                    <Rocket className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-green-400 transition-colors">Strategic Depth</h3>
                  <p className="text-gray-400 text-sm">
                    Players must strategically manage resources, navigate social dynamics, and make tough decisions to survive and thrive.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800 shadow-lg overflow-hidden group hover:-translate-y-1 transition-all duration-300 h-full flex flex-col animate-scale-in">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                <CardContent className="pt-8 relative z-10">
                  <div className="bg-gray-800/80 p-3 rounded-lg inline-block mb-4 group-hover:bg-blue-900/30 group-hover:border-blue-700/40 transition-colors border border-gray-700/50">
                    <BrainCircuit className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">Thematic Immersion</h3>
                  <p className="text-gray-400 text-sm">
                    A rich, tropical world filled with unique characters, bizarre hazards, and dark humor creates a captivating and unforgettable experience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
