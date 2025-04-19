
import { NPCCard } from '@/types/cards/npc';

export const NPC_CARDS: NPCCard[] = [
  {
    id: "voodoo-priestess",
    name: "Voodoo Priestess",
    type: "npc",
    icons: [{ symbol: "🗣️", meaning: "Social" }, { symbol: "🔮", meaning: "Weirdness" }],
    keywords: ["Mystic", "Helper", "Trade"],
    checkDC: 11,
    actions: [
      {
        description: "Trade herbs for healing",
        cost: 1,
        effect: "Discard 1 Gear → Heal 2 Health"
      },
      {
        description: "Seek guidance",
        cost: 1,
        effect: "Reduce 1 Weirdness"
      }
    ],
    rules: ["Must pass Charm DC 11 to interact", "Leaves if Heat reaches 8"],
    flavor: "Her eyes hold ancient secrets of the swamp.",
    imagePrompt: "Elderly woman in colorful robes surrounded by mystical trinkets"
  }
];
