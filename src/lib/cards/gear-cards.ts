
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
  // Weapons
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
    flavor: "Great for vines... or villains.",
    imagePrompt: "Long, blood-spattered blade against dense foliage.",
    actionCost: 1,
    statBonus: {
      stat: "brawn",
      value: 2
    }
  },
  // Vehicles
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
  }
];

