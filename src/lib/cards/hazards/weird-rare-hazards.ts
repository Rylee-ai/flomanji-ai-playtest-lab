
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
  // ... Adding remaining weird & rare hazards 32-40
];
