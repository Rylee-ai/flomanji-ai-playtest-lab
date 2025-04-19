import { RegionCard } from '@/types/cards/region';

export const REGION_CARDS: RegionCard[] = [
  {
    id: "everglades-marsh",
    name: "Everglades Marsh",
    type: "region",
    biomeTags: ["🐊"],
    icons: [{ symbol: "🐊", meaning: "Swamp Biome" }],
    keywords: ["Swamp", "Marsh", "Dangerous"],
    onEnter: "Draw 1 Hazard (creature or environmental)",
    action: "Spend 1 Luck → Draw 1 Gear",
    rest: "Reduce 1 Weirdness",
    bonusZone: "Clue Token (counts as 1 Clue toward Mission objectives)",
    rules: ["The longer you stay, the less solid the ground feels"],
    flavor: "The longer you stay, the less solid the ground feels.",
    imagePrompt: "Vast sawgrass flats reflected in still water, cypress knees poking up, mist curling in neon-green dawn light"
  },
  {
    id: "cypress-bayou",
    name: "Cypress Bayou",
    type: "region",
    biomeTags: ["🐊", "🌳"],
    icons: [
      { symbol: "🐊", meaning: "Swamp Biome" },
      { symbol: "🌳", meaning: "Forest Biome" }
    ],
    keywords: ["Swamp", "Forest", "Mystic"],
    onEnter: "Moxie DC 9 → Success: avoid next Hazard; Failure: gain 1 Heat",
    action: "Sacrifice 1 Gear → auto-succeed next Grit check",
    rest: "Heal 1 Health (you find fresh water)",
    bonusZone: "Bayou Shrine: Spend 1 Luck to gain 1 Weirdness reduction",
    rules: ["Whispers drift through hanging vines… and sometimes replies"],
    flavor: "Whispers drift through hanging vines… and sometimes replies.",
    imagePrompt: "Ancient cypress trees draped with Spanish moss, waterlogged path winding through murky green shadows"
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
  },
  {
    id: "alligator-farm",
    name: "Alligator Farm",
    type: "region", 
    biomeTags: ["🐊"],
    icons: [{ symbol: "🐊", meaning: "Swamp Biome" }],
    keywords: ["Swamp", "Tourist", "Dangerous"],
    onEnter: "Draw 1 NPC (Gator Wrangler or Surprise Hazard)",
    action: "Pay 1 Food → Draw 1 Treasure",
    rest: "Take no action → Heal 1 Health but gain 1 Heat (stifling humidity)",
    bonusZone: "Expert Keeper (once/game): auto-avoid one creature Hazard",
    rules: ["Tourists take selfies… and the gators take souvenirs"],
    flavor: "Tourists take selfies… and the gators take souvenirs.",
    imagePrompt: "Rusty cages and feeding platforms by a muddy pond, neon-pastel warning signs, lurking jaws"
  }
];
