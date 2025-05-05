
import { HazardCard } from '@/types/cards/hazard';

export const WEIRD_RARE_HAZARDS: HazardCard[] = [
  {
    id: "encounter-with-flomanji-man",
    name: "Encounter with Flomanji Man",
    type: "hazard",
    subType: "weird",
    icons: [
      { symbol: "🚹", meaning: "Social" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Social", "Weird", "Unpredictable"],
    rules: [
      "Weirdness Check DC 11 → Failure: Gain +2 Weirdness and Lose 1 Action",
      "Success: Gain +1 Luck"
    ],
    difficultyClasses: {
      weirdSense: 11
    },
    onFailure: "Gain +2 Weirdness and Lose 1 Action",
    onSuccess: "Gain +1 Luck",
    flavor: "Smile, nod, back away—this one's off the rails.",
    imagePrompt: "A wild-eyed Florida Man in a stained tank top, mismatched shorts, holding a rubber chicken and a road sign"
  },
  // More weird hazards...
  {
    id: "ghost-orchid-fever",
    name: "Ghost Orchid Fever",
    type: "hazard",
    subType: "weird",
    icons: [
      { symbol: "🌱", meaning: "Environmental" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Toxin", "Botanical", "Hallucinations"],
    rules: [
      "On your turn start: Weirdness Check DC 10 → Failure: Gain +2 Weirdness; Success: Reduce 1 Weirdness"
    ],
    difficultyClasses: {
      weirdSense: 10
    },
    onFailure: "Gain +2 Weirdness",
    onSuccess: "Reduce 1 Weirdness",
    flavor: "One sniff—and reality wilts.",
    imagePrompt: "A ghostly white orchid in full bloom dripping luminescent spores; thick outlines and a sickly neon-green mist"
  }
];
