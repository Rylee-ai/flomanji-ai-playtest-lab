
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Sparkles, Zap, Map } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Updated GameOverviewSection to better utilize horizontal space by
 * removing the large vertical progress line and making the step marker more compact.
 */
export const GameOverviewSection = () => (
  <section
    className="py-20 bg-gradient-to-b from-black to-gray-950 relative z-10"
    style={{ minHeight: 520 }}
    data-section="1"
  >
    <div className="container mx-auto px-4 max-w-6xl relative flex flex-col md:flex-row gap-12">
      {/* Step marker compacted and placed at top-left above intro text */}
      <div className="md:w-1/12 flex md:flex-col items-center md:items-start mb-6 md:mb-0">
        <Badge
          variant="outline"
          className="h-10 w-10 text-xl flex items-center justify-center p-0 font-bold border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-lg animate-fade-in"
        >
          1
        </Badge>
        {/* Optional thin vertical line below for small visual hint */}
        <div className="hidden md:block mt-2 w-px flex-1 bg-gradient-to-b from-amber-400 via-blue-400 to-green-400 rounded opacity-40"></div>
      </div>
      {/* Main content takes most of the space */}
      <div className="md:w-11/12">
        <h2 className="text-3xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-400 drop-shadow-md animate-fade-in">
          Game Overview
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800 shadow-xl overflow-hidden relative h-full animate-scale-in">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full"></div>
            <CardContent className="pt-8 relative z-10">
              <Sparkles className="h-9 w-9 text-amber-500/70 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Paradise's Craziest Card Game</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Flomanji combines deck-building mechanics with survival storytelling as players navigate through exotic environments, encountering bizarre hazards, eccentric characters, and unexpected treasures.
              </p>
              <div className="flex justify-between text-sm text-gray-500 pt-3 border-t border-gray-800">
                <span>Now in development</span>
                <Link to="/about" className="text-amber-400 flex items-center group transition-all story-link">
                  Learn more <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-amber-900/30 to-amber-900/10 p-5 rounded-lg border border-amber-800/30 hover:border-amber-700/50 transition-all shadow-lg group hover:-translate-y-1 duration-300 h-full flex flex-col items-center">
              <div className="flex items-center justify-center h-12 w-12 bg-amber-900/40 rounded-md mb-4 group-hover:bg-amber-800/60 transition-colors">
                <Zap className="h-6 w-6 text-amber-400" />
              </div>
              <h4 className="font-medium mb-2 text-base">Deck Building</h4>
              <Badge className="bg-amber-600 hover:bg-amber-700 transition-colors">Core Mechanic</Badge>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 p-5 rounded-lg border border-blue-800/30 hover:border-blue-700/50 transition-all shadow-lg group hover:-translate-y-1 duration-300 h-full flex flex-col items-center">
              <div className="flex items-center justify-center h-12 w-12 bg-blue-900/40 rounded-md mb-4 group-hover:bg-blue-800/60 transition-colors">
                <Map className="h-6 w-6 text-blue-400" />
              </div>
              <h4 className="font-medium mb-2 text-base">Heat System</h4>
              <Badge className="bg-blue-600 hover:bg-blue-700 transition-colors">Core Mechanic</Badge>
            </div>
            <div className="bg-gradient-to-br from-green-900/30 to-green-900/10 p-5 rounded-lg border border-green-800/30 hover:border-green-700/50 transition-all shadow-lg group hover:-translate-y-1 duration-300 h-full flex flex-col items-center">
              <div className="flex items-center justify-center h-12 w-12 bg-green-900/40 rounded-md mb-4 group-hover:bg-green-800/60 transition-colors">
                <Sparkles className="h-6 w-6 text-green-400" />
              </div>
              <h4 className="font-medium mb-2 text-base">Character Abilities</h4>
              <Badge className="bg-green-600 hover:bg-green-700 transition-colors">Core Mechanic</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

