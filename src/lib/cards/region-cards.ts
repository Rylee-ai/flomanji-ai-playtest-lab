import { RegionCard } from '@/types/cards/region';

export const REGION_CARDS: RegionCard[] = [
  {
    id: "galaxy-bar",
    name: "Galaxy Bar",
    type: "region",
    icons: [
      { symbol: "🎮", meaning: "Arcade" },
      { symbol: "🌴", meaning: "Tourist Trap" }
    ],
    keywords: ["Chill Zone", "Tourist Trap", "Nightlife", "Weird"],
    biomeTags: ["🏙️"],
    onEnter: "You've discovered the Galaxy Bar! You may use Fast Travel once during your visit.",
    action: "PLAY ARCADE (1 Action): Reduce Heat by 1, then roll d6 on the Galaxy Bar Mini-Table.\nTALK TO BARTENDER (1 Action): Spend 1 Gear to draw 1 Chaos or Artifact card.",
    rest: "LOUNGE & CHILL (no Action, once per turn): If you take no other actions this round, heal 1 Weirdness",
    rules: [
      "Roll d6 when using PLAY ARCADE:",
      "1: Psychic Backlash – Gain 1 Weirdness",
      "2: Classic Glitch – Next Region you enter acts as unvisited",
      "3-4: Heat Sink – Reduce Heat by 2 (instead of 1)",
      "5: Snack Spill – Gain 1 minor Gear card",
      "6: Jackpot – Draw 1 Gear card and heal 1 Weirdness"
    ],
    flavor: "Cool neon, cryptid cocktails, and one working joystick. That's heaven around here.",
    imagePrompt: "A retro-futuristic arcade bar bathed in neon pink and teal, palm fronds casting silhouettes on rain-slick pavement; a lone glowing arcade cabinet stands by a polished bar, shadowy patrons clutch cryptid-shaped drinks—thick outlines and pastel highlights evoke humid Florida nights"
  },
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
