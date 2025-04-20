
import { RegionCard } from '@/types/cards/region';

export const REGION_CARDS: RegionCard[] = [
  {
    id: "murky-bayou",
    name: "Murky Bayou",
    type: "region",
    icons: [
      { symbol: "🐊", meaning: "Swamp" },
      { symbol: "⚠️", meaning: "Hazard" }
    ],
    keywords: ["Swamp", "Difficult Terrain"],
    biomeTags: ["🐊"],
    onEnter: "Make a Grit check (DC 7) or gain 1 Heat",
    action: "Search the waters (costs 2 Actions): Draw 1 Treasure card",
    rest: "Heal 1 Health but gain 1 Weirdness",
    rules: ["Counts as difficult terrain (2 Actions to enter)"],
    flavor: "The water's not the only thing that's thick here...",
    imagePrompt: "Murky swamp waters under neon moonlight, mysterious ripples disturbing the surface"
  }
];
