
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Check, Flag, Shield, Sparkles } from "lucide-react";

export const DesignPillarsSection = () => (
  <section className="py-16 bg-gradient-to-b from-black to-gray-950 relative">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_60%,rgba(29,78,216,0.08),transparent_60%)]"></div>
    <div className="container mx-auto px-4 max-w-6xl relative z-10">
      <div className="flex items-center mb-12">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-green-500/20 blur-lg"></div>
          <Badge variant="outline" className="relative z-10 h-8 w-8 flex items-center justify-center p-0 text-lg font-bold border-green-500/30 bg-green-500/10 text-green-400">3</Badge>
        </div>
        <h2 className="text-2xl font-bold ml-4 bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-green-400">Design Pillars</h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 p-8 rounded-lg border border-gray-800 shadow-xl relative group hover:border-amber-700/30 transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute top-0 left-0 h-1 w-full bg-amber-600/70"></div>
          <div className="flex items-center space-x-3 mb-5">
            <div className="bg-amber-900/30 p-2 rounded-lg">
              <Flag className="h-6 w-6 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold">Narrative-Driven Design</h3>
          </div>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="bg-amber-900/30 text-amber-400 rounded-full p-1.5 mr-3 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-gray-300 text-sm">Immersive storytelling that reacts to player decisions</span>
            </li>
            <li className="flex items-start">
              <span className="bg-amber-900/30 text-amber-400 rounded-full p-1.5 mr-3 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-gray-300 text-sm">Characters with unique backgrounds and motivations</span>
            </li>
            <li className="flex items-start">
              <span className="bg-amber-900/30 text-amber-400 rounded-full p-1.5 mr-3 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-gray-300 text-sm">Branching scenarios with meaningful consequences</span>
            </li>
            <li className="flex items-start">
              <span className="bg-amber-900/30 text-amber-400 rounded-full p-1.5 mr-3 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-gray-300 text-sm">AI-enhanced Game Master experience</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 p-8 rounded-lg border border-gray-800 shadow-xl relative group hover:border-blue-700/30 transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute top-0 left-0 h-1 w-full bg-blue-600/70"></div>
          <div className="flex items-center space-x-3 mb-5">
            <div className="bg-blue-900/30 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold">Tactical Resource Management</h3>
          </div>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="bg-blue-900/30 text-blue-400 rounded-full p-1.5 mr-3 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-gray-300 text-sm">Heat system creates escalating challenge</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-900/30 text-blue-400 rounded-full p-1.5 mr-3 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-gray-300 text-sm">Strategic deck building and card management</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-900/30 text-blue-400 rounded-full p-1.5 mr-3 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-gray-300 text-sm">Cooperation and competition mechanics</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-900/30 text-blue-400 rounded-full p-1.5 mr-3 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-gray-300 text-sm">Risk vs. reward decision making</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 p-8 rounded-lg border border-gray-800 shadow-xl relative group hover:border-green-700/30 transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute top-0 left-0 h-1 w-full bg-green-600/70"></div>
          <div className="flex items-center space-x-3 mb-5">
            <div className="bg-green-900/30 p-2 rounded-lg">
              <Sparkles className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="text-xl font-bold">Paradise Meets Fantasy</h3>
          </div>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="bg-green-900/30 text-green-400 rounded-full p-1.5 mr-3 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-gray-300 text-sm">Authentic paradise environments and hazards</span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-900/30 text-green-400 rounded-full p-1.5 mr-3 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-gray-300 text-sm">Surreal, magical realism with tropical flair</span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-900/30 text-green-400 rounded-full p-1.5 mr-3 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-gray-300 text-sm">Character-driven humor and absurd situations</span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-900/30 text-green-400 rounded-full p-1.5 mr-3 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-gray-300 text-sm">Unique "Flomanjified" game elements</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);
