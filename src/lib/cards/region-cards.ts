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
  },
  {
    id: "galaxy-bar",
    name: "Galaxy Bar",
    type: "region",
    biomeTags: ["🏙️"],
    icons: [{ symbol: "🏙️", meaning: "Urban Biome" }],
    keywords: ["Tourist Trap", "Nightlife", "Weird"],
    onEnter: "None",
    action: "PLAY ARCADE (1 Action): Reduce Heat by 1, then roll d6 on Galaxy Bar Mini-Table",
    rest: "LOUNGE & CHILL (no Action): If you take no other actions this round, heal 1 Weirdness",
    bonusZone: "TALK TO BARTENDER (1 Action): Spend 1 Gear → Draw 1 Chaos or Artifact",
    rules: [
      "FAST TRAVEL (once per visit): Move to any Region you've previously visited (free)",
      "Special zone that only appears via specific triggers"
    ],
    flavor: "Cool neon, cryptid cocktails, and one working joystick. That's heaven around here.",
    imagePrompt: "A retro-futuristic arcade bar bathed in neon pink and teal, palm fronds casting silhouettes on rain-slick pavement"
  }
];
