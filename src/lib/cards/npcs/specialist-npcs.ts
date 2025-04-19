
import { NPCCard } from '@/types/cards/npc';

export const SPECIALIST_NPC_CARDS: NPCCard[] = [
  {
    id: "gator-wrangler",
    name: "Gator Wrangler",
    type: "npc",
    icons: [
      { symbol: "🐊", meaning: "Creature" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Swamp", "Creature Handling", "Gear Source"],
    actions: [
      {
        description: "Get Info",
        cost: 1,
        effect: "Charm DC 9 or Moxie DC 11 → Success: Gain Info (nearby Hazard/Treasure); Failure: Gain 1 Weirdness"
      },
      {
        description: "Trade",
        cost: 1,
        effect: "Offer 1 Food/Tool → Grit DC 9: Success: Gain 'Gator Hide' or 'Alligator Tooth Necklace' Gear; Failure: nothing"
      },
      {
        description: "Hire Help",
        cost: 1,
        effect: "Discard 1 Treasure or 2 valuable Gear → Bypass one Gator Hazard this turn"
      }
    ],
    rules: ["Must have appropriate items for Trade and Hire actions"],
    flavor: "Respect the gator, respect the wrangler.",
    imagePrompt: "Rugged swamp‑attired individual holding a lasso, confident and intimidating"
  },
  {
    id: "diy-mechanic",
    name: "DIY Mechanic",
    type: "npc",
    icons: [
      { symbol: "🛠️", meaning: "Tool" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Vehicle Repair", "Jury‑Rig"],
    checkDC: 9,
    actions: [
      {
        description: "Request Repairs",
        cost: 1,
        effect: "Grit DC 9 → Success: Repair one damaged Vehicle Gear (restore 1 Use) or gain +2 Bonus on next Repair check; Failure: Take 1 Heat"
      }
    ],
    rules: ["Must have damaged Vehicle Gear to repair"],
    flavor: "She'll run again… eventually.",
    imagePrompt: "Greasy overalls, makeshift workbench with car parts strewn about"
  }
];
