
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Map, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionBadge } from "@/components/sections/SectionBadge";

export const GameOverviewSection = () => (
  <section
    className="py-20 bg-gradient-to-b from-black to-gray-950 relative"
    style={{ minHeight: 500 }}
    data-section="1"
  >
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="grid grid-cols-12 gap-6">
        {/* Left side with badge and line */}
        <div className="col-span-12 md:col-span-1 flex flex-col items-center">
          <SectionBadge number={1} color="amber" />
          
          {/* Vertical line that connects to the next section */}
          <div className="h-full w-px bg-gradient-to-b from-amber-400 via-blue-400 to-blue-400 mt-2 opacity-30"></div>
        </div>

        {/* Content area */}
        <div className="col-span-12 md:col-span-11">
          <h2 className="text-3xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-400 drop-shadow-md animate-fade-in">
            Game Overview
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-amber-950/30 to-amber-900/10 p-5 rounded-lg border border-amber-800/30 hover:border-amber-700/50 transition-all shadow-lg group hover:-translate-y-1 duration-300">
              <CardContent className="p-0">
                <div className="flex items-center justify-center h-12 w-12 bg-amber-900/40 rounded-md mb-4 group-hover:bg-amber-800/60 transition-colors">
                  <Zap className="h-6 w-6 text-amber-400" />
                </div>
                <h4 className="font-bold mb-3 text-xl text-amber-300">Deck Building</h4>
                <Badge className="bg-amber-600/80 hover:bg-amber-600 mb-4">Core Mechanic</Badge>
                <p className="text-gray-300 mb-4">
                  Build your survival deck from a mix of Gear, Treasures, and Character cards. Each card has unique effects that can combo with others.
                </p>
                <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                  <li>Start with basic gear cards</li>
                  <li>Find treasures during exploration</li>
                  <li>Unlock character-specific abilities</li>
                  <li>Create powerful card combinations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-950/30 to-blue-900/10 p-5 rounded-lg border border-blue-800/30 hover:border-blue-700/50 transition-all shadow-lg group hover:-translate-y-1 duration-300">
              <CardContent className="p-0">
                <div className="flex items-center justify-center h-12 w-12 bg-blue-900/40 rounded-md mb-4 group-hover:bg-blue-800/60 transition-colors">
                  <Map className="h-6 w-6 text-blue-400" />
                </div>
                <h4 className="font-bold mb-3 text-xl text-blue-300">Heat System</h4>
                <Badge className="bg-blue-600/80 hover:bg-blue-600 mb-4">Core Mechanic</Badge>
                <p className="text-gray-300 mb-4">
                  Manage your Heat level as you explore. Higher Heat increases both risks and rewards, making each decision crucial.
                </p>
                <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                  <li>Heat rises from hazards & actions</li>
                  <li>Max Heat level of 10</li>
                  <li>Special abilities unlock at high Heat</li>
                  <li>Find ways to reduce Heat levels</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-950/30 to-green-900/10 p-5 rounded-lg border border-green-800/30 hover:border-green-700/50 transition-all shadow-lg group hover:-translate-y-1 duration-300">
              <CardContent className="p-0">
                <div className="flex items-center justify-center h-12 w-12 bg-green-900/40 rounded-md mb-4 group-hover:bg-green-800/60 transition-colors">
                  <Sparkles className="h-6 w-6 text-green-400" />
                </div>
                <h4 className="font-bold mb-3 text-xl text-green-300">Character Abilities</h4>
                <Badge className="bg-green-600/80 hover:bg-green-600 mb-4">Core Mechanic</Badge>
                <p className="text-gray-300 mb-4">
                  Each character has unique abilities that shape their playstyle and offer different strategies for survival.
                </p>
                <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                  <li>Unique starting abilities</li>
                  <li>Unlock more as you level up</li>
                  <li>Synergize with specific cards</li>
                  <li>Transform at max Weirdness</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </section>
);
