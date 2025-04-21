
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export const DesignPillarsSection = () => (
  <section className="py-16 bg-gray-950">
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="flex items-center mb-8">
        <Badge variant="outline" className="mr-2 bg-amber-500/10 text-amber-400 border-amber-500/20">3</Badge>
        <h2 className="text-2xl font-bold">Design Pillars</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h3 className="text-xl font-bold mb-3">1. Narrative-Driven Design</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="bg-gray-800 text-amber-400 rounded-full p-1 mr-2 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-gray-400 text-sm">Immersive storytelling that reacts to player decisions</span>
            </li>
            <li className="flex items-start">
              <span className="bg-gray-800 text-amber-400 rounded-full p-1 mr-2 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-gray-400 text-sm">Characters with unique backgrounds and motivations</span>
            </li>
            <li className="flex items-start">
              <span className="bg-gray-800 text-amber-400 rounded-full p-1 mr-2 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-gray-400 text-sm">Branching scenarios with meaningful consequences</span>
            </li>
            <li className="flex items-start">
              <span className="bg-gray-800 text-amber-400 rounded-full p-1 mr-2 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-gray-400 text-sm">AI-enhanced Game Master experience</span>
            </li>
          </ul>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h3 className="text-xl font-bold mb-3">2. Tactical Resource Management</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="bg-gray-800 text-amber-400 rounded-full p-1 mr-2 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-gray-400 text-sm">Heat system creates escalating challenge</span>
            </li>
            <li className="flex items-start">
              <span className="bg-gray-800 text-amber-400 rounded-full p-1 mr-2 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-gray-400 text-sm">Strategic deck building and card management</span>
            </li>
            <li className="flex items-start">
              <span className="bg-gray-800 text-amber-400 rounded-full p-1 mr-2 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-gray-400 text-sm">Cooperation and competition mechanics</span>
            </li>
            <li className="flex items-start">
              <span className="bg-gray-800 text-amber-400 rounded-full p-1 mr-2 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-gray-400 text-sm">Risk vs. reward decision making</span>
            </li>
          </ul>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h3 className="text-xl font-bold mb-3">3. Paradise Meets Fantasy</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="bg-gray-800 text-amber-400 rounded-full p-1 mr-2 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-gray-400 text-sm">Authentic paradise environments and hazards</span>
            </li>
            <li className="flex items-start">
              <span className="bg-gray-800 text-amber-400 rounded-full p-1 mr-2 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-gray-400 text-sm">Surreal, magical realism with tropical flair</span>
            </li>
            <li className="flex items-start">
              <span className="bg-gray-800 text-amber-400 rounded-full p-1 mr-2 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-gray-400 text-sm">Character-driven humor and absurd situations</span>
            </li>
            <li className="flex items-start">
              <span className="bg-gray-800 text-amber-400 rounded-full p-1 mr-2 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-gray-400 text-sm">Unique "Flomanjified" game elements</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);
