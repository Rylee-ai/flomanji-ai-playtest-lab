
import { MissionSheet } from '@/types/cards/mission';

export const MISSION_CARDS: MissionSheet[] = [
  {
    id: "everglades-escape",
    name: "Everglades Escape",
    type: "escape", // Changed from "mission" to "escape" to match valid types
    icons: [
      { symbol: "🏃", meaning: "Escape" },
      { symbol: "🌿", meaning: "Swamp" }
    ],
    keywords: ["Escape", "Swamp", "Timed"],
    rules: [
      "Players start with Heat 2 and Weirdness 0",
      "Extraction point is 6 spaces from starting location",
      "Game ends after 10 rounds or when all players are eliminated"
    ],
    specialRules: [
      "Swamp regions require Athletics checks to traverse",
      "Night brings increased Weirdness checks",
      "Finding hidden caches reduces Heat level"
    ],
    flavor: "The swamp doesn't care if you live or die—and time is running out.",
    imagePrompt: "Aerial view of a vast, misty Everglades swamp with a small extraction helicopter visible in the distance",
    hook: "Your airboat has crashed deep in the Everglades. Night is falling, and strange sounds echo through the cypress trees. You must reach the extraction point before darkness consumes you.",
    mapLayout: "6x6 grid with central water feature",
    startingHeat: 2,
    objectives: [
      {
        description: "Reach the extraction point",
        required: true,
        completionCheck: "At least one player must reach the extraction zone",
        difficultyLevel: 3
      },
      {
        description: "Recover the crashed airboat's cargo",
        required: false,
        reward: "Gain 3 Treasure Cards",
        difficultyLevel: 2
      }
    ],
    extractionRegion: "Northeast corner",
    scaling: {
      small: "Reduce map size to 5x5, reduce rounds to 8",
      large: "Increase map size to 7x7, add 2 additional hazards"
    }
  }
];
