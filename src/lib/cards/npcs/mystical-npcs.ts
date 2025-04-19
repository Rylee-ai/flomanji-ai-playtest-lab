
import { NPCCard } from '@/types/cards/npc';

export const MYSTICAL_NPC_CARDS: NPCCard[] = [
  {
    id: "street-preacher",
    name: "Street Preacher",
    type: "npc",
    icons: [
      { symbol: "🗣️", meaning: "Social" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Urban", "Dubious Information"],
    actions: [
      {
        description: "Listen to Sermon",
        cost: 1,
        effect: "Weirdness DC 9 → Success: Draw 1 Event or Look at top Chaos card; Failure: Gain 1 Weirdness and Lose 1 Luck"
      }
    ],
    rules: ["Uses Weirdness stat for check"],
    flavor: "Repent now… or you'll be Flomanjified!",
    imagePrompt: "Fervent preacher with raised Bible, neon‑pastel aura around him"
  },
  {
    id: "voodoo-priestess",
    name: "Voodoo Priestess",
    type: "npc",
    icons: [
      { symbol: "🔮", meaning: "Weird" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Occult", "Swamp"],
    checkDC: 9,
    actions: [
      {
        description: "Seek Blessing",
        cost: 1,
        effect: "Charm DC 9 → Success: Choose one: Reduce 1 Weirdness or Gain 1 Luck; Failure: Gain 2 Weirdness and Lose 1 Action"
      }
    ],
    rules: ["Failure has severe Weirdness penalty"],
    flavor: "Would you like a blessing… or a curse?",
    imagePrompt: "Hooded figure chanting over a misty bayou with glowing talismans"
  }
];
