
import { GearCard } from '@/types/cards/gear';

export const GEAR_CARDS: GearCard[] = [
  {
    id: "machete",
    name: "Machete",
    type: "gear",
    icons: [
      { symbol: "⚔️", meaning: "Fight" },
      { symbol: "🛠️", meaning: "Tool" }
    ],
    keywords: ["Weapon", "Tool", "Melee"],
    rules: [
      "Passive: +2 to Fight checks",
      "Use (1 Action): Clear dense vegetation in Swamp or Forest regions"
    ],
    flavor: "Jungle ready, tourist tested.",
    imagePrompt: "Weathered machete with neon-tinted rust spots on the blade, worn handle wrapped in electrical tape",
    statBonus: {
      stat: "brawn",
      value: 2
    }
  },
  {
    id: "first-aid-kit",
    name: "First Aid Kit",
    type: "gear",
    icons: [
      { symbol: "🧨", meaning: "Consumable" },
      { symbol: "🛍️", meaning: "Supply" }
    ],
    keywords: ["Healing", "Consumable", "Supply"],
    rules: [
      "Use (1 Action): Heal 2 Health OR reduce 1 Weirdness",
      "Elimination: Discard after use"
    ],
    flavor: "Red cross, green hope.",
    imagePrompt: "Small white box with red cross, slightly bloodstained, contents partially visible through cracked plastic",
    actionCost: 1,
    consumable: true
  },
  {
    id: "bug-spray",
    name: "Bug Spray (Half Empty)",
    type: "gear",
    icons: [
      { symbol: "🧨", meaning: "Consumable" },
      { symbol: "🛡️", meaning: "Defense" }
    ],
    keywords: ["Protection", "Consumable", "Insect"],
    rules: [
      "Use (0 Actions): When facing Insect Hazards, gain +2 to all checks",
      "Use (1 Action): Reduce Heat by 1 in Swamp regions",
      "Elimination: Roll d6 after use; on 1-3, discard"
    ],
    flavor: "Smells like childhood trauma and victory.",
    imagePrompt: "Aerosol can with faded label, pressure gauge showing half-empty, surrounded by fleeing mosquitoes",
    consumable: true
  }
];
