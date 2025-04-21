
import React from "react";
import { CardCategoryShowcase } from "./CardCategoryShowcase";
import { REGION_CARDS } from "@/lib/cards/region-cards";
import { FLOMANJIFIED_CARDS } from "@/lib/cards/flomanjified-cards";
import { CHAOS_CARDS } from "@/lib/cards/chaos-cards";
import { PLAYER_CHARACTER_CARDS } from "@/lib/cards/player-character-cards";
import { square, card, squareCheck, squareX, rectangleVertical } from "lucide-react";

const cardBg = "/lovable-uploads/b36d25ce-1de9-4d8a-bea8-c9b40cfee954.png";

export const GameSpecificationsSection = () => {
  // Prepare info for each category of card
  const breakdown = [
    {
      icon: <rectangleVertical size={18} className="opacity-70" />,
      category: "Region Cards",
      count: REGION_CARDS.length ?? 38,
      description: "Unique locations across Flomanji with distinct challenges and effects.",
    },
    {
      icon: <card size={18} className="opacity-70" />,
      category: "Flomanjified Roles",
      count: FLOMANJIFIED_CARDS.length ?? 4,
      description: "Chaotic roles for eliminated players to continue the mayhem.",
    },
    {
      icon: <squareCheck size={18} className="opacity-70" />,
      category: "Core Chaos Cards",
      count: CHAOS_CARDS.length ?? 15,
      description: "Global events that increase Heat and challenge all players.",
    },
    {
      icon: <square size={18} className="opacity-70" />,
      category: "Character Types",
      count: PLAYER_CHARACTER_CARDS.length ?? 5,
      description: "Unique archetypes with special abilities and starting stats.",
    },
  ];

  return (
    <section className="py-16 bg-gray-950">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-2xl font-bold mb-10">Game Specifications</h2>
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
        <h3 className="text-xl font-bold mb-8">Card Breakdown</h3>
        {/* Simulated card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7 mb-10">
          {breakdown.map((data, i) => (
            <CardCategoryShowcase
              key={data.category}
              bgImage={cardBg}
              icon={data.icon}
              category={data.category}
              count={data.count}
              description={data.description}
            />
          ))}
        </div>
        <div className="text-gray-400 text-xs">
          <span className="font-semibold">Note:</span> Dozens of additional cards, categories, events, gear, and missions await discovery—every game feels new!
        </div>
      </div>
    </section>
  );
};
