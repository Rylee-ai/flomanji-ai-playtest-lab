
import { TreasureCard } from "@/types/cards";

export const MINOR_TREASURES: TreasureCard[] = [
  {
    id: "case-of-runoff-rum",
    name: "Case of Runoff Rum",
    type: "treasure",
    icons: [
      { symbol: "🍹", meaning: "Drink" },
      { symbol: "🪙", meaning: "Value" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Trade Value", "Consumable", "Weirdness", "Grit"],
    rules: [
      "Choose one:",
      "Discard (1 Action) → Gain +2 Grit this turn and Gain 2 Weirdness.",
      "Discard (0 Actions) when trading → Counts as 2 basic Gear for value."
    ],
    flavor: "Smells like molasses, gasoline, bad decisions.",
    imagePrompt: "Waterlogged wooden crate, slightly ajar, revealing unmarked dark glass bottles",
    consumable: true
  },
  {
    id: "jewelry-box-empty",
    name: "Jewelry Box (Empty)",
    type: "treasure",
    icons: [
      { symbol: "🍀", meaning: "Luck" },
      { symbol: "🪙", meaning: "Value" }
    ],
    keywords: ["Luck", "Trade (Minor)"],
    rules: [
      "Choose one:",
      "Discard (0 Actions) before a Luck check → Gain +2 Bonus.",
      "Discard when trading → Counts as 1 basic Gear."
    ],
    flavor: "Someone got here first. Or disappointment was the treasure.",
    imagePrompt: "Ornate velvet‑lined box lying open but empty"
  },
  {
    id: "pile-of-scrap-metal",
    name: "Pile of Scrap Metal",
    type: "treasure",
    icons: [
      { symbol: "🛠️", meaning: "Tool" },
      { symbol: "🔧", meaning: "Resource" }
    ],
    keywords: ["Trade Value", "Resource", "Repair"],
    rules: [
      "Choose one:",
      "Discard when trading with a Mechanic or Pawn Shop NPC → Counts as 1 basic Gear.",
      "Discard (0 Actions) with a \"Duct Tape\" use before a Repair check → Gain +2 Bonus."
    ],
    flavor: "One man's trash is another's treasure… maybe.",
    imagePrompt: "Heap of rusty pipes, bent rebar, and old car parts"
  }
];
