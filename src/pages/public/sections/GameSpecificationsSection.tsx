
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TREASURE_CARDS } from "@/lib/cards/treasures";
import { HAZARD_CARDS } from "@/lib/cards/hazards";
import { SECRET_OBJECTIVES } from "@/lib/cards/secret-objectives";
import { GEAR_CARDS } from "@/lib/cards/gear-cards";
import { REGION_CARDS } from "@/lib/cards/region-cards";
import { FLOMANJIFIED_CARDS } from "@/lib/cards/flomanjified-cards";
import { CHAOS_CARDS } from "@/lib/cards/chaos-cards";
import { PLAYER_CHARACTER_CARDS } from "@/lib/cards/player-character-cards";

export const GameSpecificationsSection = () => {
  // Safely pull an example from each type
  const breakdown = [
    {
      category: "Treasure",
      color: "bg-yellow-400 text-black",
      example: TREASURE_CARDS[0]?.name ?? "Treasure Card",
      flavor: "Find unexpected riches that can turn the tide—if you survive to spend them."
    },
    {
      category: "Hazard",
      color: "bg-red-500 text-white",
      example: HAZARD_CARDS[0]?.name ?? "Hazard Card",
      flavor: "Traps, dangers, and wild events—overcome deadly obstacles or pay the price."
    },
    {
      category: "Gear",
      color: "bg-green-400 text-black",
      example: GEAR_CARDS[0]?.name ?? "Gear Card",
      flavor: "Essential tools, weapons, and oddball gadgets for survival and weirdness."
    },
    {
      category: "Secret Objective",
      color: "bg-indigo-400 text-white",
      example: SECRET_OBJECTIVES[0]?.name ?? "Secret Objective",
      flavor: "Hidden goals—help the team or sabotage them. Everyone has secrets."
    },
    {
      category: "Region",
      color: "bg-blue-400 text-black",
      example: REGION_CARDS[0]?.name ?? "Region Card",
      flavor: "Every tile hides weather, dangers, or resources—no two journeys are the same."
    },
    {
      category: "Flomanjified Role",
      color: "bg-fuchsia-400 text-white",
      example: FLOMANJIFIED_CARDS[0]?.name ?? "Flomanjified Card",
      flavor: "When fate turns nasty, you become chaos incarnate and hunt your former allies."
    },
    {
      category: "Chaos Event",
      color: "bg-black text-amber-400 border border-amber-400",
      example: CHAOS_CARDS[0]?.name ?? "Chaos Card",
      flavor: "World-breaking events that shake up the game—no one is ever safe."
    },
    {
      category: "Player Character",
      color: "bg-lime-300 text-black",
      example: PLAYER_CHARACTER_CARDS[0]?.name ?? "Character Card",
      flavor: "Unique skills and wild personalities—choose yours and start the adventure."
    }
  ];

  return (
    <section className="py-16 bg-gray-950">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-2xl font-bold mb-8">Game Specifications</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
            <h3 className="text-lg font-bold mb-2">2-6</h3>
            <p className="text-gray-400">Number of players supported per game session</p>
          </div>
          <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
            <h3 className="text-lg font-bold mb-2">30-60 min</h3>
            <p className="text-gray-400">Average playtime for a full game mission</p>
          </div>
          <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
            <h3 className="text-lg font-bold mb-2">12+</h3>
            <p className="text-gray-400">Recommended player age for gameplay</p>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-6">Card Breakdown</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {breakdown.map((card, i) => (
            <div
              key={i}
              className={`rounded-lg border border-gray-800 flex flex-col h-full bg-gray-900 shadow-md overflow-hidden`}
            >
              {/* CATEGORY BADGE */}
              <div className={`px-3 py-1 flex items-center ${card.color} font-semibold uppercase tracking-wide text-xs mb-2`}>
                {card.category}
              </div>
              <div className="flex-1 flex flex-col justify-between px-4 pt-2 pb-3">
                <div>
                  <div className="text-base font-bold mb-1">{card.example}</div>
                  <div className="text-xs text-gray-400">{card.flavor}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-gray-400 text-xs">
          <span className="font-semibold">Note:</span> This deck includes dozens more cards and specialties—every game feels new!
        </div>
      </div>
    </section>
  );
};
