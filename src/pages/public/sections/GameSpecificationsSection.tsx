
import React from "react";
import { CardCategoryShowcase } from "./CardCategoryShowcase";
import { REGION_CARDS } from "@/lib/cards/region-cards";
import { FLOMANJIFIED_CARDS } from "@/lib/cards/flomanjified-cards";
import { CHAOS_CARDS } from "@/lib/cards/chaos-cards";
import { PLAYER_CHARACTER_CARDS } from "@/lib/cards/player-character-cards";
import { GEAR_CARDS } from "@/lib/cards/gear-cards";
import { HAZARD_CARDS } from "@/lib/cards/hazard-cards";
import { TREASURE_CARDS } from "@/lib/cards/treasure-cards";
import { NPC_CARDS } from "@/lib/cards/npc-cards";
import { MISSION_CARDS } from "@/lib/cards/mission-cards";

// Only use icons from the allowed set
import {
  MapPin,
  User,
  ChevronRight,
  Gear,
  AlertTriangle,
  Calendar,
  Treasure,
  List,
  Card as CardIcon
} from "lucide-react";

const CATEGORIES = [
  {
    icon: <MapPin size={18} className="opacity-70" />,
    category: "Region Cards",
    count: REGION_CARDS.length,
    description: "Unique locations across Flomanji with distinct challenges and effects."
  },
  {
    icon: <User size={18} className="opacity-70" />,
    category: "Flomanjified Roles",
    count: FLOMANJIFIED_CARDS.length,
    description: "Chaotic roles for eliminated players to continue the mayhem."
  },
  {
    icon: <ChevronRight size={18} className="opacity-70" />,
    category: "Core Chaos Cards",
    count: CHAOS_CARDS.length,
    description: "Global events that increase Heat and challenge all players."
  },
  {
    icon: <List size={18} className="opacity-70" />,
    category: "Character Types",
    count: PLAYER_CHARACTER_CARDS.length,
    description: "Unique archetypes with special abilities and starting stats."
  },
  {
    icon: <Gear size={18} className="opacity-70" />,
    category: "Starting Gear",
    count: 25, // Update to your actual count if available
    description: "Essential equipment to begin your escape from paradise."
  },
  {
    icon: <Gear size={18} className="opacity-70" />,
    category: "General Gear",
    count: GEAR_CARDS.length,
    description: "Tools, weapons and items to aid survival in Flomanji."
  },
  {
    icon: <AlertTriangle size={18} className="opacity-70" />,
    category: "Hazard Cards",
    count: HAZARD_CARDS.length,
    description: "Dangerous threats that test your survival skills."
  },
  {
    icon: <Calendar size={18} className="opacity-70" />,
    category: "Event Cards",
    count: 30, // Update to your actual count if available
    description: "Unexpected occurrences that shift the game dynamics."
  },
  {
    icon: <Treasure size={18} className="opacity-70" />,
    category: "Treasure Cards",
    count: TREASURE_CARDS.length,
    description: "Valuable artifacts with powerful effects and victory points."
  },
  {
    icon: <User size={18} className="opacity-70" />,
    category: "NPC Cards",
    count: NPC_CARDS.length,
    description: "Characters that help, hinder, or add bizarre twists to your journey."
  },
  {
    icon: <CardIcon size={18} className="opacity-70" />,
    category: "Mission Types",
    count: MISSION_CARDS.length,
    description: "Core adventure scenarios with unique objectives and gameplay."
  },
  {
    icon: <List size={18} className="opacity-70" />,
    category: "Total Cards",
    count: 271, // Sum of totals as seen in the screenshot; update if needed
    description: "A massive, modular deck for endless adventure possibilities."
  },
];

export const GameSpecificationsSection = () => {
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
          {CATEGORIES.map((card) => (
            <CardCategoryShowcase
              key={card.category}
              icon={card.icon}
              category={card.category}
              count={card.count}
              description={card.description}
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

