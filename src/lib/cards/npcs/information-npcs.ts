
import { NPCCard } from '@/types/cards/npc';

export const INFORMATION_NPC_CARDS: NPCCard[] = [
  {
    id: "conspiracy-theorist",
    name: "Conspiracy Theorist",
    type: "npc",
    icons: [
      { symbol: "🗣️", meaning: "Social" },
      { symbol: "🔍", meaning: "Information" }
    ],
    keywords: ["Information", "Weird", "Urban"],
    checkDC: 10,
    actions: [
      {
        description: "Listen to Theories",
        cost: 1,
        effect: "Moxie DC 10 → Success: Gain information about a nearby Weird Hazard; Failure: Gain 1 Weirdness"
      },
      {
        description: "Share 'Evidence'",
        cost: 1,
        effect: "Give any Weird item → Gain 2 Resources and information about a Secret Objective"
      }
    ],
    rules: [
      "Only found in Urban or Suburb regions",
      "Will not help if player Heat level ≥ 4"
    ],
    flavor: "The truth isn't just out there—it's everywhere, man.",
    imagePrompt: "Disheveled person with wild eyes and a wall covered in newspaper clippings connected by red string"
  },
  {
    id: "retired-ranger",
    name: "Retired Ranger",
    type: "npc",
    icons: [
      { symbol: "🌲", meaning: "Nature" },
      { symbol: "🧠", meaning: "Knowledge" }
    ],
    keywords: ["Navigation", "Survival", "Rural"],
    checkDC: 8,
    actions: [
      {
        description: "Ask for Directions",
        cost: 1,
        effect: "Charm DC 8 → Success: Reveal one hidden path or shortcut on the map"
      },
      {
        description: "Seek Survival Tips",
        cost: 1,
        effect: "Gain +2 to your next Survival check in Natural regions"
      }
    ],
    rules: [
      "Only appears in Rural, Forest or Swamp regions",
      "Services are free but limited to once per game session"
    ],
    flavor: "Forty years in these woods. Seen things you wouldn't believe.",
    imagePrompt: "Weathered older person in faded ranger uniform sitting on a cabin porch with binoculars"
  }
];
