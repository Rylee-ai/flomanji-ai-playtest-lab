import { GearCard } from "@/types/cards/gear";

export const STANDARD_GEAR_CARDS: GearCard[] = [
  {
    id: "gear-001",
    name: "Standard Backpack",
    type: "gear",
    icons: [{ symbol: "🎒", meaning: "Backpack" }],
    keywords: ["storage", "equipment"],
    rules: ["Increases your carrying capacity by 3 items."],
    flavor: "Every adventurer needs a reliable backpack.",
    imagePrompt: "A sturdy canvas backpack with leather straps, well-worn.",
    category: "supply"
  },
  {
    id: "gear-002",
    name: "First Aid Kit",
    type: "gear",
    icons: [{ symbol: "🩹", meaning: "Healing" }],
    keywords: ["medical", "healing", "consumable"],
    rules: ["Use to heal 2 damage on any character."],
    flavor: "Basic medical supplies for patching up wounds.",
    imagePrompt: "A compact red medical kit with white cross symbol.",
    category: "consumable",
    consumable: true,
    uses: 3
  }
];
