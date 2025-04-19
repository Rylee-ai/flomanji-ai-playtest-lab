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
  },
  {
    id: "quicksand-bog",
    name: "Quicksand Bog",
    type: "region",
    biomeTags: ["🐊"],
    icons: [{ symbol: "🐊", meaning: "Swamp Biome" }],
    keywords: ["Swamp", "Hazard", "Movement"],
    onEnter: "Moxie DC 11 → Failure: become Immobilized until you spend 1 Action to free yourself",
    action: "Use Machete → +2 Bonus to free yourself or clear a path",
    rest: "Cannot rest here (bog sucks you in)",
    bonusZone: "Rope Anchor: Spend 1 Action + 1 Gear to auto-free all players",
    rules: ["What looks like solid ground is secretly your worst enemy"],
    flavor: "What looks like solid ground is secretly your worst enemy.",
    imagePrompt: "Sinking boot in golden muck, ripples spreading across luminescent green water"
  },
  {
    id: "mangrove-tangle",
    name: "Mangrove Tangle",
    type: "region",
    biomeTags: ["🐊"],
    icons: [{ symbol: "🐊", meaning: "Swamp Biome" }],
    keywords: ["Swamp", "Natural", "Resource"],
    onEnter: "Grit DC 9 → Success: +1 Luck; Failure: Lose 1 Action",
    action: "Spend 1 Action + 1 Gear → Draw 1 Clue",
    rest: "Heal 1 Weirdness (soothing shade)",
    bonusZone: "Hidden Den: Discard 1 Gear → Gain 1 Treasure Card",
    rules: ["Roots twist like serpents—twist yourself free if you can"],
    flavor: "Roots twist like serpents—twist yourself free if you can.",
    imagePrompt: "Knotted roots above dark water, shafts of neon-pastel light filtering through dense canopy"
  },
  {
    id: "abandoned-airboat-dock",
    name: "Abandoned Airboat Dock",
    type: "region",
    biomeTags: ["🐊"],
    icons: [
      { symbol: "🐊", meaning: "Swamp Biome" },
      { symbol: "🚤", meaning: "Vehicle" }
    ],
    keywords: ["Swamp", "Vehicle", "Safe"],
    onEnter: "Draw 1 Gear (vehicle or tool)",
    action: "Repair Vehicle (Grit DC 9) → Restore 1 Use to any Vehicle Gear",
    rest: "Safe (no Hazards)",
    bonusZone: "Spare Parts Cache: Search → Draw 1 Tool",
    rules: ["Engine husks creak in the breeze—if only they still ran"],
    flavor: "Engine husks creak in the breeze—if only they still ran.",
    imagePrompt: "Rusted dock boards leading to a stripped-out airboat hull, broken canopies swaying in humidity"
  },
  {
    id: "mosquito-infestation",
    name: "Mosquito Infestation Site",
    type: "region",
    biomeTags: ["🐊"],
    icons: [
      { symbol: "🐊", meaning: "Swamp Biome" },
      { symbol: "🌱", meaning: "Environmental" }
    ],
    keywords: ["Swamp", "Hazard", "Insect"],
    onEnter: "Gain 1 Weirdness (itchy bites)",
    action: "Use Bug Spray → Auto-success all Insect Hazards this turn",
    rest: "Gain 1 Heat (no cover)",
    bonusZone: "Natural Repellent: Spend 1 Action → Reduce 2 Weirdness",
    rules: ["One buzz, one bite… a hundred reminders you're not alone"],
    flavor: "One buzz, one bite… a hundred reminders you're not alone.",
    imagePrompt: "Clouds of tiny mosquitoes swirling over stagnant water, neon glow highlighting each wingbeat"
  },
  {
    id: "old-sugar-mill",
    name: "Old Sugar Mill Ruins",
    type: "region",
    biomeTags: ["🐊"],
    icons: [
      { symbol: "🐊", meaning: "Swamp Biome" },
      { symbol: "🏭", meaning: "Industrial" }
    ],
    keywords: ["Swamp", "Industrial", "Ruins"],
    onEnter: "Moxie DC 9 → Success: Draw 1 Treasure; Failure: Take 1 Damage",
    action: "Investigate (Charm DC 9) → Gain 1 Clue or reduce 1 Heat",
    rest: "Safe (solid floor)",
    bonusZone: "Crystalline Cache: Spend 1 Action + 1 Luck → Draw 1 Artifact-Proxy",
    rules: ["Once sweet, now sour—ghosts of labor hang in the air"],
    flavor: "Once sweet, now sour—ghosts of labor hang in the air.",
    imagePrompt: "Crumbling brick mill towers over reedy swamp, sugar-coated walls now cracked and moss-streaked"
  }
];
