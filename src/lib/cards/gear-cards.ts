
import { GearCard } from '@/types/cards/gear';

export const GEAR_CARDS: GearCard[] = [
  // Consumables
  {
    id: "first-aid-kit",
    name: "First Aid Kit",
    type: "gear",
    category: "consumable",
    icons: [
      { symbol: "🩹", meaning: "Healing" },
      { symbol: "🛠️", meaning: "Tool" }
    ],
    keywords: ["Healing", "Supply"],
    rules: [
      "Use (1 Action): Discard → Heal 2 Damage on any one Survivor."
    ],
    flavor: "Better than Flomanji dirt.",
    imagePrompt: "Worn red first-aid box with white cross, slightly open to reveal bandages and vials; placed on cracked asphalt under hot sun.",
    consumable: true,
    actionCost: 1
  },
  {
    id: "bottled-water",
    name: "Bottled Water (Case)",
    type: "gear",
    category: "consumable",
    icons: [
      { symbol: "💧", meaning: "Drink" },
      { symbol: "📦", meaning: "Supply" }
    ],
    keywords: ["Healing", "Hydration"],
    rules: [
      "Uses 3. Spend 1 Use (1 Action) → Heal 1 Damage OR auto-succeed Grit DC 9 vs Heat Stroke."
    ],
    flavor: "Heavy, but life-saving.",
    imagePrompt: "Plastic-wrapped case of water bottles, sweat beading on the plastic, box dented from travel.",
    consumable: true,
    uses: 3,
    actionCost: 1
  },
  {
    id: "energy-drink",
    name: "Energy Drink",
    type: "gear",
    category: "consumable",
    icons: [
      { symbol: "⚡", meaning: "Action" },
      { symbol: "🍹", meaning: "Drink" }
    ],
    keywords: ["Stimulant", "Risk"],
    rules: [
      "Use (0 Actions) at start of Action Phase → +1 Action this turn; end of turn gain +1 Weirdness."
    ],
    flavor: "Tastes like regret, but hey—extra action!",
    imagePrompt: "Scuffed aluminum can with neon \"Swamp Surge\" label, condensation dripping, opened tab angled toward viewer.",
    consumable: true,
    actionCost: 0
  },
  {
    id: "pork-rinds",
    name: "Bag of Pork Rinds",
    type: "gear",
    category: "consumable",
    icons: [
      { symbol: "🍟", meaning: "Food" },
      { symbol: "🎯", meaning: "Minor Heal" }
    ],
    keywords: ["Healing (Minor)", "Grit"],
    rules: [
      "Use (1 Action): Discard → Heal 1 Damage OR +1 Grit on next Grit check."
    ],
    flavor: "Crunchy, salty… unsettling.",
    imagePrompt: "Open bag of pork rinds spilling crispy shards, neon pastel label reading \"Swamp Snack.\"",
    consumable: true,
    actionCost: 1
  },
  {
    id: "roadside-oranges",
    name: "Roadside Oranges",
    type: "gear",
    category: "consumable",
    icons: [
      { symbol: "🍊", meaning: "Food" },
      { symbol: "🍀", meaning: "Luck" }
    ],
    keywords: ["Healing", "Luck Risk"],
    rules: [
      "Use (1 Action): Discard → Luck DC 7 → Success: Heal 1 Damage; Failure: Gain 1 Weirdness."
    ],
    flavor: "Looks fine… probably.",
    imagePrompt: "Mesh bag of bright oranges resting against a weathered fence, one orange split to reveal juicy pulp.",
    consumable: true,
    actionCost: 1
  },
  {
    id: "sublix-sub",
    name: "Sublix Half-Sub",
    type: "gear",
    category: "consumable",
    icons: [
      { symbol: "🥪", meaning: "Food" },
      { symbol: "🧘", meaning: "Calm" }
    ],
    keywords: ["Healing", "Weirdness Reduction"],
    rules: [
      "Use (1 Action): Discard → Heal 2 Damage OR Reduce 1 Weirdness."
    ],
    flavor: "Half a SubSub is still a miracle out here.",
    imagePrompt: "Paper-wrapped half-sandwich oozing with meat, neon green lettuce peeking out.",
    consumable: true,
    actionCost: 1
  },
  // Tools & Oddities
  {
    id: "flashlight",
    name: "Flashlight & Batteries",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🔦", meaning: "Light" },
      { symbol: "🔋", meaning: "Battery" }
    ],
    keywords: ["Exploration", "Utility"],
    rules: [
      "Uses 4 Batteries. Use (1 Action): Spend 1 Battery → Ignore darkness penalties OR view adjacent Region's Hazard table."
    ],
    flavor: "Might keep the boogeyman away.",
    imagePrompt: "Scuffed metal flashlight, beam cutting through darkness, spare batteries at its base.",
    uses: 4,
    actionCost: 1
  },
  {
    id: "bug-spray",
    name: "Bug Spray",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🐜", meaning: "Insect" },
      { symbol: "🛡️", meaning: "Defense" }
    ],
    keywords: ["Pest Control", "Minor Weird"],
    rules: [
      "Uses 3. Use (0 Actions) before any Insect hazard → Auto-Success OR +3 Bonus on that check."
    ],
    flavor: "DEET—the perfume of Floridian nights.",
    imagePrompt: "Aerosol can with cartoon mosquito crossed out, mist cloud wilting tiny bugs.",
    uses: 3,
    actionCost: 0
  },
  {
    id: "duct-tape",
    name: "Duct Tape",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🛠️", meaning: "Tool" },
      { symbol: "🔧", meaning: "Repair" }
    ],
    keywords: ["Multi-use", "Fortify"],
    rules: [
      "Uses 3. Use (1 Action): Spend 1 Use → Auto-success Repair OR negate one non-Artifact gear loss OR +2 Fortify bonus."
    ],
    flavor: "Fixes everything—temporarily.",
    imagePrompt: "Ragged roll of silver tape, half-used, stuck to a cracked board.",
    uses: 3,
    actionCost: 1
  },
  {
    id: "crowbar",
    name: "Crowbar",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🛠️", meaning: "Tool" },
      { symbol: "🗡️", meaning: "Weapon" }
    ],
    keywords: ["Bypass", "Melee"],
    rules: [
      "Passive +1 Grit on forced-entry checks. Use (1 Action): Melee attack (Deal 1 Damage)."
    ],
    flavor: "Good for prying… or persuasion.",
    imagePrompt: "Rust-patina crowbar leaning against a shuttered door.",
    actionCost: 1,
    statBonus: {
      stat: "grit",
      value: 1
    }
  },
  {
    id: "binoculars",
    name: "Binoculars",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🔭", meaning: "Info" },
      { symbol: "👀", meaning: "Sight" }
    ],
    keywords: ["Scouting", "Insight"],
    rules: [
      "Use (1 Action): View full Hazard/Bonus text of one adjacent Region."
    ],
    flavor: "See the danger before you step in it.",
    imagePrompt: "Worn binoculars aimed at a distant swamp horizon.",
    actionCost: 1
  },
  {
    id: "compass",
    name: "Compass",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🧭", meaning: "Info" },
      { symbol: "🛤️", meaning: "Movement" }
    ],
    keywords: ["Lost-Check Aid"],
    rules: [
      "Passive +1 Moxie on \"Lost\" checks. Use (1 Action, once/game) → ignore movement penalties this turn."
    ],
    flavor: "North is… that way? Probably.",
    imagePrompt: "Antique brass compass, needle spinning erratically.",
    actionCost: 1,
    statBonus: {
      stat: "moxie",
      value: 1
    }
  },
  {
    id: "zippo-lighter",
    name: "Zippo Lighter",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🔥", meaning: "Fire" }
    ],
    keywords: ["Fire Starting", "Intimidation"],
    rules: [
      "Uses 3. Use (1 Action): Spend 1 Use → auto-ignite tinder/fuel OR Moxie DC 3 to intimidate minor threats."
    ],
    flavor: "Sparks hope—and maybe a forest fire.",
    imagePrompt: "Polished steel lighter flickering flame in the dark.",
    uses: 3,
    actionCost: 1
  },
  {
    id: "flashy-boombox",
    name: "Flashy Boombox",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "📻", meaning: "Sound" },
      { symbol: "🔊", meaning: "Distraction" }
    ],
    keywords: ["Crowd Control", "Heat Gain"],
    rules: [
      "Requires 1 Battery. Use (1 Action): Spend 1 Battery → create distraction (+2 Moxie to sneak past hazards) AND Gain 1 Heat."
    ],
    flavor: "Tunes drown out danger. Also attract it.",
    imagePrompt: "Chunky cassette boombox blaring neon speakers in an empty street.",
    actionCost: 1
  },
  // Weapons
  {
    id: "pocket-knife",
    name: "Pocket Knife",
    type: "gear",
    category: "weapon",
    icons: [
      { symbol: "🔪", meaning: "Weapon" },
      { symbol: "🛠️", meaning: "Tool" }
    ],
    keywords: ["Melee", "Utility"],
    rules: [
      "Use (1 Action): Melee attack (Deal 1 Damage) OR +1 Bonus on cutting/prying checks."
    ],
    flavor: "Never leave home without it.",
    imagePrompt: "Small folding knife half-open on a map.",
    actionCost: 1
  },
  {
    id: "machete",
    name: "Machete",
    type: "gear",
    category: "weapon",
    icons: [
      { symbol: "⚔️", meaning: "Weapon" },
      { symbol: "🌿", meaning: "Swamp" }
    ],
    keywords: ["Melee", "Constricting Vines"],
    rules: [
      "Use (1 Action): Melee attack (Deal 2 Damage). Use (0 Actions) vs Vines → Auto-Success."
    ],
    flavor: "Great for vines… or villains.",
    imagePrompt: "Long, blood-spattered blade against dense foliage.",
    actionCost: 1,
    statBonus: {
      stat: "brawn",
      value: 2
    }
  },
  {
    id: "baseball-bat",
    name: "Baseball Bat",
    type: "gear",
    category: "weapon",
    icons: [
      { symbol: "🦴", meaning: "Weapon" },
      { symbol: "🥎", meaning: "Sport" }
    ],
    keywords: ["Blunt", "Intimidation"],
    rules: [
      "Use (1 Action): Melee attack (Deal 1 Damage) PLUS +1 Grit vs Creatures/Social Hazards."
    ],
    flavor: "Home runs and horror.",
    imagePrompt: "Scuffed wooden bat with faint neon team logo.",
    actionCost: 1,
    statBonus: {
      stat: "grit",
      value: 1
    }
  },
  {
    id: "slingshot",
    name: "Slingshot",
    type: "gear",
    category: "weapon",
    icons: [
      { symbol: "🏹", meaning: "Ranged" }
    ],
    keywords: ["Ammo", "Distraction"],
    rules: [
      "Uses rocks/Ammo. Use (1 Action): Ranged attack (Deal 1 Damage) OR Moxie DC 3 distraction."
    ],
    flavor: "Cheap thrills—and bruises.",
    imagePrompt: "Simple Y-shaped slingshot with rubber band taut.",
    actionCost: 1
  },
  {
    id: "speargun",
    name: "Speargun",
    type: "gear",
    category: "weapon",
    icons: [
      { symbol: "🎯", meaning: "Ranged" },
      { symbol: "💧", meaning: "Coastal" }
    ],
    keywords: ["Aquatic", "Heavy"],
    rules: [
      "Uses 2 Spear ammo. Use (1 Action): Spend 1 Use → Ranged attack (Deal 2 Damage); +1 Bonus vs Aquatic."
    ],
    flavor: "When gators laugh at your slingshot.",
    imagePrompt: "Underwater-style speargun loaded for action.",
    uses: 2,
    actionCost: 1
  },
  {
    id: "cast-iron-skillet",
    name: "Cast-Iron Skillet",
    type: "gear",
    category: "weapon",
    icons: [
      { symbol: "🍳", meaning: "Food Prep" },
      { symbol: "🗡️", meaning: "Weapon" }
    ],
    keywords: ["Versatile", "Fortify"],
    rules: [
      "Use (1 Action): Melee attack (Deal 1 Damage). Or Use (1 Action) + Fire Starter & raw food → Heal 2 Damage cooking."
    ],
    flavor: "Perfect for frying… and fending off.",
    imagePrompt: "Heavy skillet over campfire, sizzling contents.",
    actionCost: 1
  },
  // Vehicles
  {
    id: "bicycle",
    name: "Bicycle",
    type: "gear",
    category: "vehicle",
    icons: [
      { symbol: "🚲", meaning: "Vehicle" },
      { symbol: "🚦", meaning: "Gridlock" }
    ],
    keywords: ["Urban Mobility"],
    rules: [
      "Use (1 Action): Move 1-2 Urban/Suburb Regions (Grit DC 7 for 2); discard any card to bypass Gridlock."
    ],
    flavor: "Watch for potholes—and stray gators.",
    imagePrompt: "Retro cruiser bike leaning on palm-shaded sidewalk.",
    actionCost: 1
  },
  {
    id: "golf-cart",
    name: "Golf Cart",
    type: "gear",
    category: "vehicle",
    icons: [
      { symbol: "⛳", meaning: "Resort" },
      { symbol: "🚗", meaning: "Vehicle" }
    ],
    keywords: ["Resort Transport"],
    rules: [
      "Use (1 Action): Move 1 Suburb/Resort Region; takes +1 Damage if you collide."
    ],
    flavor: "Slow—but fun.",
    imagePrompt: "White cart with basket of towels, pink flamingo sticker.",
    actionCost: 1
  },
  {
    id: "motorcycle",
    name: "Motorcycle",
    type: "gear",
    category: "vehicle",
    icons: [
      { symbol: "🏍️", meaning: "Vehicle" },
      { symbol: "🔥", meaning: "Heat" }
    ],
    keywords: ["Fast & Risky"],
    rules: [
      "Use (1 Action): Move 1-3 Highway/Urban (Grit DC 7 for >1); +1 Heat per use."
    ],
    flavor: "Feel the wind—and the burn.",
    imagePrompt: "Shiny chopper roaring down palm-lined road.",
    actionCost: 1
  },
  {
    id: "airboat",
    name: "Airboat",
    type: "gear",
    category: "vehicle",
    icons: [
      { symbol: "🚤", meaning: "Vehicle" },
      { symbol: "🐊", meaning: "Swamp" }
    ],
    keywords: ["Swamp Mastery"],
    rules: [
      "Use (0 Actions): Move 1 Swamp tile; ignore swamp movement costs."
    ],
    flavor: "Skim the muck like a pro.",
    imagePrompt: "Fan-powered boat gliding over grassy water.",
    actionCost: 0
  },
  // Supplies & Misc
  {
    id: "rope",
    name: "Rope (50 ft)",
    type: "gear",
    category: "supply",
    icons: [
      { symbol: "🪢", meaning: "Tool" },
      { symbol: "📦", meaning: "Supply" }
    ],
    keywords: ["Climbing", "Bypass"],
    rules: [
      "Uses 2. Use (1 Action): Spend 1 Use → Auto-success Grit check for climbing, restraining, crossing."
    ],
    flavor: "Never know when you'll need to tie someone up.",
    imagePrompt: "Coiled rope with frayed end, sunlight glinting on fibers.",
    uses: 2,
    actionCost: 1
  },
  {
    id: "multitool",
    name: "Multitool",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🔧", meaning: "Repair" },
      { symbol: "🛠️", meaning: "Tool" }
    ],
    keywords: ["Jack-of-all-trades"],
    rules: [
      "Passive +1 Moxie and +1 Grit on fine repair or bypass checks."
    ],
    flavor: "Because duct tape can't fix everything.",
    imagePrompt: "Compact multi-headed tool folded open.",
    statBonus: {
      stat: "grit",
      value: 1
    }
  },
  {
    id: "basic-map",
    name: "Basic Flomanji Map",
    type: "gear",
    category: "supply",
    icons: [
      { symbol: "🗺️", meaning: "Info" },
      { symbol: "🔎", meaning: "Lost" }
    ],
    keywords: ["Navigation Aid"],
    rules: [
      "Use (0 Actions): Discard before a Lost/Navigate check → Reroll once."
    ],
    flavor: "Coffee-stains and outdated landmarks.",
    imagePrompt: "Folded paper map with creases, bright roads and landmarks.",
    consumable: true,
    actionCost: 0
  },
  {
    id: "sunscreen",
    name: "Sunscreen (SPF 50)",
    type: "gear",
    category: "supply",
    icons: [
      { symbol: "🧴", meaning: "Defense" },
      { symbol: "🌞", meaning: "Environmental" }
    ],
    keywords: ["Sunburn Prevention"],
    rules: [
      "Uses 3. Spend 1 Use (1 Action) → Auto-success Sunburn checks for next 2 Rounds."
    ],
    flavor: "Greasy, coconut-scented salvation.",
    imagePrompt: "Half-used bottle of sunscreen, label peeling.",
    uses: 3,
    actionCost: 1
  },
  {
    id: "gas-can",
    name: "Gas Can (Empty/Full)",
    type: "gear",
    category: "supply",
    icons: [
      { symbol: "⛽", meaning: "Fuel" },
      { symbol: "🔧", meaning: "Vehicle" }
    ],
    keywords: ["Refueling"],
    rules: [
      "Empty: Interact @ Gas Station → becomes Full. Full: Use (1 Action): Discard → refuel vehicle or ignite fire."
    ],
    flavor: "Potential power—just add liquid courage.",
    imagePrompt: "Red plastic can with spout, cap off and empty.",
    consumable: true,
    actionCost: 1
  },
  {
    id: "flare",
    name: "Flare (x3)",
    type: "gear",
    category: "supply",
    icons: [
      { symbol: "🚨", meaning: "Signal" },
      { symbol: "🎯", meaning: "Ranged" }
    ],
    keywords: ["Signal", "Weapon"],
    rules: [
      "Uses 3. Use (1 Action): Spend 1 Use → signal (Reduce Heat 1 or auto-win one Mission check) OR make Ranged attack (Deal 1 Damage + Gain 1 Heat)."
    ],
    flavor: "Fire in the sky, hope on the ground.",
    imagePrompt: "Bright flare glowing in hand, sparks flying into the neon night.",
    uses: 3,
    actionCost: 1
  }
];
