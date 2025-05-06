
import { GearCard } from "@/types/cards/gear";

export const SPECIAL_GEAR_CARDS: GearCard[] = [
  {
    id: "gear-special-001",
    name: "Lucky Charm",
    type: "gear",
    icons: [{ symbol: "🍀", meaning: "Luck" }],
    keywords: ["luck", "charm", "accessory"],
    rules: ["Once per game, reroll any single die roll."],
    flavor: "It's not scientifically proven, but it sure makes you feel better.",
    imagePrompt: "A small silver charm bracelet with various lucky symbols.",
    category: "tool",
    passive: "Provides a sense of confidence in uncertain situations."
  },
  // Additional special gear would be here
];
