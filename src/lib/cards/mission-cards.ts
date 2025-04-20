
import { MissionSheet } from '@/types/cards/mission';

export const MISSION_CARDS: MissionSheet[] = [
  {
    id: "everglades-escape",
    name: "Everglades Escape",
    type: "mission",
    icons: [{ symbol: "🐊", meaning: "Swamp" }, { symbol: "🏃", meaning: "Escape" }],
    keywords: ["Swamp", "Escape", "Time Limit"],
    rules: [
      "Players must reach extraction point before nightfall (10 rounds)",
      "At least one player must survive",
      "Water spaces require Swimming checks"
    ],
    hook: "Players must navigate through a treacherous swamp filled with natural hazards and supernatural phenomena to reach safety.",
    mapLayout: "6 spaces from start to extraction",
    startingHeat: 2,
    objectives: [
      {
        description: "Reach the extraction point",
        required: true
      },
      {
        description: "Find the hidden shrine",
        required: false,
        reward: "Heat reset for all players"
      }
    ],
    extractionRegion: "Extraction Point",
    specialRules: [
      "Night brings additional Weirdness (+1 per round after round 5)",
      "Water spaces require Swimming checks to cross"
    ],
    scaling: {
      small: "Reduce distance to 4 spaces",
      large: "Add additional optional objectives"
    },
    flavor: "The swamp holds dark secrets... and darker destinies.",
    imagePrompt: "A neon-lit swamp path leading to a distant extraction point, danger lurking in the waters"
  }
];
