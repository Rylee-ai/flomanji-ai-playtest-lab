
import { MissionSheet } from '@/types/cards/mission';

export const MISSION_CARDS: MissionSheet[] = [
  {
    id: "blood-tide",
    name: "Blood Tide",
    type: "mission",
    icons: [{ symbol: "🏖️", meaning: "Coastal" }, { symbol: "☣️", meaning: "Toxic" }],
    keywords: ["Escape", "Toxic", "Urgent"],
    hook: "Red tide turns deadly as something rises from the deep.",
    mapLayout: "3x3 grid",
    startingHeat: 3,
    objectives: [
      {
        description: "Collect 3 water samples",
        required: true,
        reward: "Draw 1 Treasure"
      },
      {
        description: "Save all survivors",
        required: false,
        reward: "Reduce Heat by 2"
      }
    ],
    extractionRegion: "Research Lab",
    specialRules: ["Water contact causes +1 Weirdness", "Heat increases by 2 each round"],
    rules: ["Complete all required objectives and reach extraction"],
    flavor: "The waves glow an unnatural red under the setting sun.",
    imagePrompt: "Beach at sunset with crimson waves and dark shapes beneath the surface",
    scaling: {
      small: "Reduce required samples to 2",
      large: "Add 1 extra survivor to save"
    }
  }
];
