
import { RegionCard } from '@/types/cards/region';

export const REGION_CARDS: RegionCard[] = [
  {
    id: "everglades-marsh",
    name: "Everglades Marsh",
    type: "region",
    biomeTags: ["🐊"],
    icons: [{ symbol: "🐊", meaning: "Swamp Biome" }],
    keywords: ["Swamp", "Marsh", "Dangerous"],
    onEnter: "Draw 1 Hazard card",
    rest: "Heal 1 Health",
    bonusZone: "Find rare herbs: Draw 1 Gear",
    rules: ["Entering costs +1 Action unless you have Swamp Gear"],
    flavor: "The heart of old Florida, where gators rule supreme.",
    imagePrompt: "Misty marshland with tall grass and cypress knees breaking the surface"
  },
  {
    id: "ghost-mall",
    name: "Ghost Mall",
    type: "region",
    biomeTags: ["🏙️"],
    icons: [{ symbol: "🏙️", meaning: "Urban Biome" }],
    keywords: ["Urban", "Abandoned", "Shelter"],
    onEnter: "Roll Weird check DC 9",
    rest: "Reduce 1 Weirdness",
    bonusZone: "Loot stores: Draw 1 Treasure",
    rules: ["Safe haven: No Hazard draws while resting"],
    flavor: "Once packed with shoppers, now only echoes remain.",
    imagePrompt: "Abandoned mall interior with broken skylights and overgrown plants"
  }
];
