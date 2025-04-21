
import React from "react";
import { CardCategoryShowcase } from "./CardCategoryShowcase";
import { REGION_CARDS } from "@/lib/cards/region-cards";
import { FLOMANJIFIED_CARDS } from "@/lib/cards/flomanjified-cards";
import { CHAOS_CARDS } from "@/lib/cards/chaos-cards";
import { PLAYER_CHARACTER_CARDS } from "@/lib/cards/player-character-cards";
import { Square, Car, SquareCheck, SquareX, RectangleVertical } from "lucide-react";

const cardBg = "/lovable-uploads/b36d25ce-1de9-4d8a-bea8-c9b40cfee954.png";

export const GameSpecificationsSection = () => {
  // Create example cards from the actual card library
  const showcaseCards = [
    {
      icon: <RectangleVertical size={18} className="opacity-70" />,
      category: "Region Cards",
      count: REGION_CARDS.length ?? 38,
      description: "Unique locations across Flomanji with distinct challenges and effects.",
      exampleName: "Mystic Springs",
      exampleText: "Weirdness +1 when entering. Any Survivor here must test Weirdness DC 10 at end of turn → Failure: gain Haunted condition.",
      exampleIcons: ["🌋", "🔮"],
      exampleKeywords: ["Weird", "Water Source"]
    },
    {
      icon: <Car size={18} className="opacity-70" />,
      category: "Flomanjified Roles",
      count: FLOMANJIFIED_CARDS.length ?? 4,
      description: "Chaotic roles for eliminated players to continue the mayhem.",
      exampleName: "Swamp Zombie",
      exampleText: "Choose a non-Flomanjified Survivor in your tile. They test Grit DC 9 → Failure: take 1 Damage.",
      exampleIcons: ["💀", "🐊"],
      exampleKeywords: ["Creature", "Undead"]
    },
    {
      icon: <SquareCheck size={18} className="opacity-70" />,
      category: "Core Chaos Cards",
      count: CHAOS_CARDS.length ?? 15,
      description: "Global events that increase Heat and challenge all players.",
      exampleName: "Sudden Downpour",
      exampleText: "Heat +2. All Survivors in Swamp or Coastal regions must test Grit DC 8 → Failure: lose 1 Action.",
      exampleIcons: ["☔", "⚠️"],
      exampleKeywords: ["Weather", "Hazard"]
    },
    {
      icon: <Square size={18} className="opacity-70" />,
      category: "Character Types",
      count: PLAYER_CHARACTER_CARDS.length ?? 5,
      description: "Unique archetypes with special abilities and starting stats.",
      exampleName: "The Tourist",
      exampleText: "Special: Once per game, may reroll any Luck check. Starts with +1 Luck and 'Disposable Camera' Gear.",
      exampleIcons: ["👨‍👩‍👧", "🍀"],
      exampleKeywords: ["Survivalist", "Lucky"]
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7 mb-10">
          {showcaseCards.map((card) => (
            <CardCategoryShowcase
              key={card.category}
              bgImage={cardBg}
              icon={card.icon}
              category={card.category}
              count={card.count}
              description={card.description}
              exampleName={card.exampleName}
              exampleText={card.exampleText}
              exampleIcons={card.exampleIcons}
              exampleKeywords={card.exampleKeywords}
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
