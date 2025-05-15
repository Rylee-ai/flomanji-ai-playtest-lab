
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Brain, CreditCard } from "lucide-react";
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
                  <Thermometer className="h-6 w-6 text-amber-400" />
                </div>
                <h4 className="font-bold mb-3 text-xl text-amber-300">Twin-Timer System</h4>
                <Badge className="bg-amber-600/80 hover:bg-amber-600 mb-4">Core Mechanic</Badge>
                <p className="text-gray-300 mb-4">
                  Balance your character's Heat and Weirdness levels, with each increasing the tension and unlocking new abilities or risks.
                </p>
                <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                  <li>Heat caps at 10, triggering mission failure</li>
                  <li>High Heat (9+) increases Weirdness</li>
                  <li>Weirdness transforms characters at max level</li>
                  <li>Risk management is key to survival</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-950/30 to-blue-900/10 p-5 rounded-lg border border-blue-800/30 hover:border-blue-700/50 transition-all shadow-lg group hover:-translate-y-1 duration-300">
              <CardContent className="p-0">
                <div className="flex items-center justify-center h-12 w-12 bg-blue-900/40 rounded-md mb-4 group-hover:bg-blue-800/60 transition-colors">
                  <CreditCard className="h-6 w-6 text-blue-400" />
                </div>
                <h4 className="font-bold mb-3 text-xl text-blue-300">Action Economy</h4>
                <Badge className="bg-blue-600/80 hover:bg-blue-600 mb-4">Core Mechanic</Badge>
                <p className="text-gray-300 mb-4">
                  Each character gets two actions per turn, choosing from six distinct action types to navigate missions.
                </p>
                <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                  <li>Move between connected regions</li>
                  <li>Use gear for powerful effects</li>
                  <li>Interact with the environment</li>
                  <li>Team-up with other characters</li>
                  <li>Rest to recover resources</li>
                  <li>Complete mission objectives</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-950/30 to-green-900/10 p-5 rounded-lg border border-green-800/30 hover:border-green-700/50 transition-all shadow-lg group hover:-translate-y-1 duration-300">
              <CardContent className="p-0">
                <div className="flex items-center justify-center h-12 w-12 bg-green-900/40 rounded-md mb-4 group-hover:bg-green-800/60 transition-colors">
                  <Brain className="h-6 w-6 text-green-400" />
                </div>
                <h4 className="font-bold mb-3 text-xl text-green-300">Character Stats</h4>
                <Badge className="bg-green-600/80 hover:bg-green-600 mb-4">Core Mechanic</Badge>
                <p className="text-gray-300 mb-4">
                  Five distinct character attributes determine your capabilities and playstyle for overcoming challenges.
                </p>
                <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                  <li>Brawn: Physical strength</li>
                  <li>Moxie: Courage and fortitude</li>
                  <li>Charm: Social influence</li>
                  <li>Grit: Mental resilience</li>
                  <li>Weird Sense: Perception of the strange</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </section>
);
