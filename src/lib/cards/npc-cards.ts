
import { NPCCard } from '@/types/cards/npc';

export const NPC_CARDS: NPCCard[] = [
  {
    id: "swamp-guide",
    name: "Swamp Guide",
    type: "npc",
    icons: [
      { symbol: "👤", meaning: "Character" },
      { symbol: "🐊", meaning: "Swamp" }
    ],
    keywords: ["Ally", "Guide", "Local"],
    rules: [
      "Can be hired for 2 Resources",
      "While in your group: +2 to Navigation rolls in Swamp regions",
      "Knows shortcuts: Reduce movement cost in difficult terrain by 1"
    ],
    checkDC: 8,
    actions: [
      {
        description: "Ask for guidance",
        cost: 1,
        effect: "Reveal one hidden hazard in connected regions"
      },
      {
        description: "Request emergency evacuation",
        cost: 2,
        effect: "Move your group to the nearest safe zone"
      }
    ],
    flavor: "Born and raised in these waters—knows every gator by name.",
    imagePrompt: "A weathered local guide with sun-damaged skin, wearing a wide-brimmed hat and waders, holding a wooden pole for navigating the swamp"
  }
];
