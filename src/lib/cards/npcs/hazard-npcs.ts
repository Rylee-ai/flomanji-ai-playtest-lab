
import { NPCCard } from '@/types/cards/npc';

export const HAZARD_NPC_CARDS: NPCCard[] = [
  {
    id: "confused-tourist",
    name: "Confused Tourist",
    type: "npc",
    icons: [
      { symbol: "🗣️", meaning: "Social" },
      { symbol: "⚠️", meaning: "Hazard" }
    ],
    keywords: ["Tourist", "Urban/Coastal/Suburb"],
    checkDC: 7,
    actions: [
      {
        description: "Help Tourist",
        cost: 0,
        effect: "Charm DC 7 → Failure: Lose 1 Action"
      },
      {
        description: "Brush Off",
        cost: 0,
        effect: "Moxie DC 9 → Failure: Lose 1 Action and Gain 1 Heat"
      }
    ],
    rules: ["Triggers immediately on entry (0 Actions)"],
    flavor: "Excuse me? Is this hellmouth on the map?",
    imagePrompt: "Loud‑shirted tourist holding map upside‑down, oblivious to chaos"
  },
  {
    id: "overzealous-neighborhood-watch",
    name: "Overzealous Neighborhood Watch",
    type: "npc",
    icons: [
      { symbol: "🏘️", meaning: "Suburb" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Suburbia", "Heat Interaction"],
    checkDC: 9,
    actions: [
      {
        description: "Deal with Watch",
        cost: 0,
        effect: "Charm DC 9 or Moxie DC 11 → Failure: Gain 1 Heat; if Heat ≥ 5, also Lose 1 Action"
      }
    ],
    rules: ["Triggers on entering Region (0 Actions)", "Heat ≥ 5 increases penalty"],
    flavor: "Your tent color violates subsection 4b!",
    imagePrompt: "Visor‑clad enforcer with clipboard and binoculars, frowning"
  }
];
