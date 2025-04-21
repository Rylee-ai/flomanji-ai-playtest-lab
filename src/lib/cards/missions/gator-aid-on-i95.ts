import { MissionSheet } from "@/types/cards/mission";

const gatorAidOnI95: MissionSheet = {
  id: "gator-aid-on-i95",
  name: "Gator-Aid on I-95",
  type: "escort",
  icons: [{ symbol: "🛣️", meaning: "Highway" }, { symbol: "🐊", meaning: "Mutant Gators" }],
  keywords: ["Escort", "Urban", "Swamp"],
  hook: "August 23, 1987 – Interstate 95 grinds to a halt as an overturned tanker spills experimental \"Gator-Aid\" serum. Mutated reptiles feast on chaos.",
  mapLayout: "3×3 Grid: A1 Broken Overpass (Start) · A2 Urban · A3 Swamp · B1 Urban · B2 Abandoned Gas Station · B3 Swamp · C1 Urban · C2 Research Lab (Extraction) · C3 Swamp",
  startingHeat: 2,
  objectives: [
    {
      description: "Escort the Ambulance pawn from Broken Overpass to Research Lab",
      required: true,
      difficultyLevel: 3,
      completionCheck: "Move the Ambulance pawn to the Research Lab region"
    },
    {
      description: "Retrieve and deliver 2 Antidote Crates",
      required: true,
      difficultyLevel: 3,
      completionCheck: "Find and collect 2 Antidote Crates from the Treasure deck and deliver them to the Research Lab"
    },
    {
      description: "Escape by end of Round 6",
      required: false,
      reward: "+1 Lucky Token",
      difficultyLevel: 2,
      completionCheck: "Successfully extract before the end of Round 6"
    },
    {
      description: "Recover Morgan's Journal at Gas Station",
      required: false,
      reward: "Gain 1 Clue",
      difficultyLevel: 2,
      regionId: "abandoned-gas-station",
      completionCheck: "Pass a Weird Sense DC 9 check at the Gas Station to collect Morgan's Journal"
    }
  ],
  challenges: [
    {
      description: "Tanker Fumes - At end of each Round, Survivor with highest Weirdness gains +1 Weirdness",
      frequency: "recurring",
      weirdnessEffect: 1
    },
    {
      description: "Mutated Gators - Three boss Hazards (Gator-X, Gator Y, Gator Queen) are shuffled into the bottom 10 of the Hazard deck",
      frequency: "triggered",
      trigger: "When drawing from Hazard deck"
    }
  ],
  extractionRegion: "Research Lab",
  specialRules: [
    "Ambulance Pawn: 1 Action to push; cannot enter Swamp without Tow Strap Gear",
    "Enter Broken Overpass → draw NPC \"Highway Patrol\" card immediately",
    "Flip any Swamp tile → add 1 extra Hazard draw",
    "Highway Patrol (NPC): Negotiation DC 9 to avoid losing a Luck token",
    "Morgan's Journal (NPC): Investigate (Weird Sense DC 9) to collect an Instant Clue"
  ],
  rules: ["Complete all required objectives and reach extraction before time runs out"],
  flavor: "The chase never looked so... slippery.",
  imagePrompt: "Ambulance weaving through chaotic traffic under neon floodlights.",
  scaling: {
    small: "2-3 players: +1 starting Heat; only 1 Antidote Crate required for Primary",
    large: "4-6 players: +2 starting Heat; 3 Antidote Crates required"
  },
  recommendedPlayerCount: [2, 3, 4, 5, 6],
  estimatedDuration: 8,
  difficultyRating: 6
};

export default gatorAidOnI95;
