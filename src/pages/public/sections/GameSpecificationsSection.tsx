import React from "react";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin,            // Region Cards
  Users,             // Flomanjified Roles
  ChevronsRight,     // Core Chaos Cards
  User,              // Character Types
  Box,               // Starting Gear
  Wrench,            // General Gear (replacing Tools)
  Triangle,          // Hazard Cards
  Calendar,          // Event Cards
  Gem,               // Treasure Cards (replacing Treasure)
  List,              // Mission Types
  Database           // Total Cards
} from "lucide-react";

import { TREASURE_CARDS } from "@/lib/cards/treasures";
import { HAZARD_CARDS } from "@/lib/cards/hazard-cards";
import { NPC_CARDS } from "@/lib/cards/npcs";
import { GEAR_CARDS } from "@/lib/cards/gear-cards";
import { CHAOS_CARDS } from "@/lib/cards/chaos-cards";
import { FLOMANJIFIED_CARDS } from "@/lib/cards/flomanjified-cards";
import { REGION_CARDS } from "@/lib/cards/region-cards";
import { PLAYER_CHARACTER_CARDS } from "@/lib/cards/player-character-cards";
import { MISSION_CARDS } from "@/lib/cards/mission-cards";
// There isn't a clear "Starting Gear" or "Event" array, so use placeholders/counts as needed.

const CARD_BREAKDOWN = [
  {
    id: "region",
    label: "REGION CARDS",
    icon: <MapPin className="h-5 w-5 text-muted-foreground" />,
    description: "Unique locations across Flomanji, with distinct challenges and effects.",
    count: REGION_CARDS.length,
  },
  {
    id: "flomanjified",
    label: "FLOMANJIFIED ROLES",
    icon: <Users className="h-5 w-5 text-muted-foreground" />,
    description: "Chaotic roles for eliminated players to continue the mayhem.",
    count: FLOMANJIFIED_CARDS.length,
  },
  {
    id: "chaos",
    label: "CORE CHAOS CARDS",
    icon: <ChevronsRight className="h-5 w-5 text-muted-foreground" />,
    description: "Global events that increase Heat and challenge all players.",
    count: CHAOS_CARDS.length,
  },
  {
    id: "player-character",
    label: "CHARACTER TYPES",
    icon: <User className="h-5 w-5 text-muted-foreground" />,
    description: "Unique archetypes with special abilities and starting stats.",
    count: PLAYER_CHARACTER_CARDS.length,
  },
  {
    id: "gear-starter",
    label: "STARTING GEAR",
    icon: <Box className="h-5 w-5 text-muted-foreground" />,
    description: "Essential equipment to begin your escape from paradise.",
    // For now, use a placeholder or count from player character starter gear?
    count: 25, // Placeholder: update with actual logic if your data supports it
  },
  {
    id: "gear",
    label: "GENERAL GEAR",
    icon: <Wrench className="h-5 w-5 text-muted-foreground" />,
    description: "Tools, weapons and items to aid survival in Flomanji.",
    count: GEAR_CARDS.length,
  },
  {
    id: "hazard",
    label: "HAZARD CARDS",
    icon: <Triangle className="h-5 w-5 text-muted-foreground" />,
    description: "Dangerous threats that test your survival skills.",
    count: HAZARD_CARDS.length,
  },
  {
    id: "event",
    label: "EVENT CARDS",
    icon: <Calendar className="h-5 w-5 text-muted-foreground" />,
    description: "Unexpected occurrences that shift the game dynamics.",
    count: 30, // Placeholder: update with actual data array if present
  },
  {
    id: "treasure",
    label: "TREASURE CARDS",
    icon: <Gem className="h-5 w-5 text-muted-foreground" />,
    description: "Valuable artifacts with powerful effects and victory points.",
    count: TREASURE_CARDS.length,
  },
  {
    id: "npc",
    label: "NPC CARDS",
    icon: <Users className="h-5 w-5 text-muted-foreground" />,
    description: "Characters that help, hinder, or add bizarre twists to your journey.",
    count: NPC_CARDS.length,
  },
  {
    id: "mission",
    label: "MISSION TYPES",
    icon: <List className="h-5 w-5 text-muted-foreground" />,
    description: "Core adventure scenarios with unique objectives and gameplay.",
    count: MISSION_CARDS.length,
  },
  {
    id: "total",
    label: "TOTAL CARDS",
    icon: <Database className="h-5 w-5 text-muted-foreground" />,
    description: "A massive, modular deck for endless adventure possibilities.",
    count: REGION_CARDS.length + FLOMANJIFIED_CARDS.length + CHAOS_CARDS.length + PLAYER_CHARACTER_CARDS.length + GEAR_CARDS.length + HAZARD_CARDS.length + TREASURE_CARDS.length + NPC_CARDS.length + MISSION_CARDS.length + 25 + 30,
  }
];

export const GameSpecificationsSection = () => {
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {CARD_BREAKDOWN.map((cat, i) => (
            <div key={cat.id} className="bg-gray-900 aspect-card rounded-lg border border-gray-800 flex flex-col shadow">
              <div className="flex-1 flex items-center justify-center p-4">
                {/* Placeholder card image area for future upload/edit */}
                <div className="w-full h-full aspect-[2.5/3.5] bg-gray-800/70 rounded-md border border-gray-800 flex items-center justify-center">
                  {/* Could replace with actual upload area/edit for admin in the future */}
                  <span className="text-gray-700 text-5xl"><svg width="48" height="68" viewBox="0 0 48 68" fill="none"><rect x="2" y="2" width="44" height="64" rx="6" stroke="#393939" strokeWidth="4" fill="#232323"/></svg></span>
                </div>
              </div>
              <div className="p-3 border-t border-gray-800 min-h-[78px] flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  {cat.icon}
                  <span className="text-xs font-semibold tracking-widest text-gray-300">{cat.label}</span>
                  <span className="ml-auto text-xs font-bold text-gray-400">{cat.count}</span>
                </div>
                <div className="text-xs text-muted-foreground opacity-80">{cat.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
