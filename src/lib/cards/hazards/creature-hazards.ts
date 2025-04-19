
import { HazardCard } from '@/types/cards/hazard';

export const CREATURE_HAZARDS: HazardCard[] = [
  {
    id: "water-moccasin-ambush",
    name: "Water Moccasin Ambush",
    type: "hazard",
    subType: "creature",
    icons: [
      { symbol: "🐍", meaning: "Creature" },
      { symbol: "🐊", meaning: "Swamp" }
    ],
    keywords: ["Creature", "Hazard", "Poison"],
    rules: [
      "Grit Check DC 9 → Failure: Take 1 Damage and gain Poison (1 persistent token)",
      "Boots or Gloves: +1 Bonus on this check"
    ],
    difficultyClasses: {
      grit: 9
    },
    onFailure: "Take 1 Damage and gain 1 Poison token",
    gearBonuses: [
      {
        itemName: "Boots",
        effect: "bonus",
        bonusValue: 1
      },
      {
        itemName: "Gloves",
        effect: "bonus",
        bonusValue: 1
      }
    ],
    flavor: "Cottonmouth bites first, asks questions later.",
    imagePrompt: "A venomous snake lunging from murky swamp water at ankle level, fangs bared, ripples spreading; neon-green highlights in the water"
  },
  // ... Adding remaining creature hazards 12-20
];
