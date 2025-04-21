
import { MissionSheet } from "@/types/cards/mission";

const bleachedCitrusRun: MissionSheet = {
  id: "bleached-citrus-run",
  name: "Bleached Citrus Run",
  type: "mission",
  icons: [{ symbol: "🍊", meaning: "Citrus" }, { symbol: "☀️", meaning: "Extreme Heat" }],
  keywords: ["Escort", "Rescue", "Time-Pressure"],
  hook: "Mid-July, 1987 – A sudden heatwave scorches the Citrus Grove to bone-white flats. Survivors must race to rescue stranded pickers before dehydration claims them.",
  mapLayout: "Highway Branch: Start at Mile-Long Bridge → Rest-Stop Diner → Sun-baked Citrus Grove → Ancient Citrus Packing House (Extraction)",
  startingHeat: 3,
  objectives: [
    {
      description: "Reach the Packing House before end of Round 5",
      required: true,
      difficultyLevel: 3,
      completionCheck: "At least one Survivor must reach the Ancient Citrus Packing House by the end of Round 5"
    },
    {
      description: "Escort 2 Survivor Tokens (Citrus Pickers) to Extraction",
      required: true,
      difficultyLevel: 4,
      completionCheck: "Rescue and bring 2 Citrus Picker tokens to the Ancient Citrus Packing House"
    },
    {
      description: "Retrieve Cooler Crate from Diner",
      required: false,
      reward: "+2 Health to all when used",
      difficultyLevel: 2,
      regionId: "rest-stop-diner",
      completionCheck: "Find and collect the Cooler Crate from the Rest-Stop Diner"
    },
    {
      description: "Collect 2 Clue tokens hidden in Grove",
      required: false,
      reward: "+1 Luck Token",
      difficultyLevel: 2,
      regionId: "sun-baked-citrus-grove",
      completionCheck: "Find and collect 2 Clue tokens from the Sun-baked Citrus Grove"
    }
  ],
  challenges: [
    {
      description: "Dehydration - Enter any Exposed tile → immediate Weirdness check DC 9 or gain 1 Weirdness",
      frequency: "triggered",
      trigger: "When entering an Exposed tile",
      weirdnessEffect: 1
    },
    {
      description: "Dust Devil - Flip Sun-baked Citrus Grove → draw Event \"Dust Devil\"",
      frequency: "once",
      trigger: "When Sun-baked Citrus Grove is flipped",
      heatEffect: 1
    }
  ],
  extractionRegion: "Ancient Citrus Packing House",
  specialRules: [
    "Picker Tokens: Tokens move with Survivors; if left behind when fleeing, they're lost",
    "Wandering Foreman (NPC): Charm DC 9 → gain 1 Fuel Token",
    "Mission-Unique Hazards: Include \"Sunstroke\" and \"Poison Ivy Thicket\" in first two flips"
  ],
  rules: ["Rescue the pickers and reach extraction before the deadly heat takes its toll"],
  flavor: "No shade in sight, only the white glare of despair.",
  imagePrompt: "Barren citrus trees under a cruel neon sun.",
  scaling: {
    small: "2-3 players: Start Heat +2; 1 Picker Token; objective time reduced to 4 rounds",
    large: "4-6 players: Start Heat +3; 3 Pickers; heat tick +2 per End Phase"
  },
  recommendedPlayerCount: [2, 3, 4, 5, 6],
  estimatedDuration: 8,
  difficultyRating: 7
};

export default bleachedCitrusRun;
