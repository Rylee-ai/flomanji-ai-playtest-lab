import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Rocket, BrainCircuit } from "lucide-react";

export const DesignPillarsSection = () => {
  return (
    <section 
      className="py-20 bg-gradient-to-b from-black to-gray-950 relative"
      style={{ minHeight: 520 }}
      data-section="3"
    >
      {/* Vertical connecting line */}
      <div className="container mx-auto px-4 max-w-6xl relative">
        <div className="absolute left-0 md:left-16 top-0 bottom-0 w-px bg-gradient-to-b from-green-400 via-emerald-400 to-emerald-400 opacity-30" />
        
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left header: step marker */}
          <div className="flex flex-col items-center w-full md:w-32 relative">
            <div className="relative group animate-fade-in">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-lg group-hover:bg-emerald-500/30 transition-colors" />
              <Badge
                variant="outline"
                className="relative z-10 h-12 w-12 text-2xl flex items-center justify-center p-0 font-bold border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-lg group-hover:scale-110 transition-transform"
              >
                3
              </Badge>
            </div>
          </div>

          {/* Section content */}
          <div className="flex-1">
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
