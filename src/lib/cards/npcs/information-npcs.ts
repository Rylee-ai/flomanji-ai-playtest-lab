
import { NPCCard } from '@/types/cards/npc';

export const INFORMATION_NPC_CARDS: NPCCard[] = [
  {
    id: "helpful-librarian",
    name: "Helpful Librarian",
    type: "npc",
    icons: [
      { symbol: "ℹ️", meaning: "Info" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Calm", "Urban/Suburb", "Information"],
    checkDC: 7,
    actions: [
      {
        description: "Research",
        cost: 1,
        effect: "Luck DC 9 → Success: Gain Info (view adjacent Hazard) or draw 1 basic Gear; Failure: no effect"
      },
      {
        description: "Quiet Respite",
        cost: 2,
        effect: "Reduce Weirdness by 1"
      }
    ],
    rules: ["Initial Charm DC 7 check required to interact", "Failure of initial Charm: Lose 1 Action"],
    flavor: "Shhh! Even during the apocalypse, fines still apply.",
    imagePrompt: "Stern librarian in glasses, finger to lips, amidst tall bookshelves"
  },
  {
    id: "stressed-park-ranger",
    name: "Stressed Park Ranger",
    type: "npc",
    icons: [
      { symbol: "ℹ️", meaning: "Info" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Forest/Swamp/Coastal", "Information"],
    actions: [
      {
        description: "Area Intel",
        cost: 1,
        effect: "Charm DC 9 or Moxie DC 11 → Success: Gain Info (adjacent Hazard) or negate next Hazard here; Failure: Gain 1 Weirdness"
      },
      {
        description: "Offer Help",
        cost: 1,
        effect: "Grit DC 11 → Success: Reduce Heat 1; Failure: Take 1 Damage"
      }
    ],
    rules: ["Choose one action per turn"],
    flavor: "Used to worry about tourists feeding gators. Now…",
    imagePrompt: "Exhausted ranger in uniform, wide‑eyed and twitchy in a dense swamp"
  },
  {
    id: "conspiracy-theorist",
    name: "Conspiracy Theorist",
    type: "npc",
    icons: [
      { symbol: "🗣️", meaning: "Social" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Dubious Intel", "Heat Increase"],
    checkDC: 9,
    actions: [
      {
        description: "Listen to Theories",
        cost: 1,
        effect: "Charm DC 9 → Success: Look at top 2 Chaos cards, reorder them as you like; Failure: Gain 2 Heat and Lose 1 Luck"
      }
    ],
    rules: ["Severe Heat penalty on failure"],
    flavor: "They're always watching… especially in the swamp.",
    imagePrompt: "Disheveled person surrounded by scrawled notes, maps, and strange diagrams"
  }
];
