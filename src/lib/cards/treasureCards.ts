import { TreasureCard } from '@/types/cards/treasure';

export const TREASURE_CARDS: TreasureCard[] = [
  {
    id: "spanish-doubloons",
    name: "Bag of Spanish Doubloons",
    type: "treasure",
    icons: [
      { symbol: "🪙", meaning: "Value" },
      { symbol: "🤝", meaning: "Trade" }
    ],
    keywords: ["Valuable", "Coastal", "Trade"],
    rules: [
      "Discard (0 Actions) before a bribe or trade Charm check → Gain +3 Bonus",
      "Discard (1 Action) → Reduce Heat by 2"
    ],
    flavor: "Shiny gold. Still spends… sort of.",
    imagePrompt: "Photorealistic close‑up of a rough burlap sack overflowing with tarnished gold doubloons",
    value: 3
  },
]
