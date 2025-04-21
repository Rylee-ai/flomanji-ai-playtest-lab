
import { MissionSheet } from "@/types/cards/mission";

const cypressCanalSiege: MissionSheet = {
  id: "cypress-canal-siege",
  name: "Cypress Canal Siege",
  type: "escape", // Updated to a valid type from SimulationConfig
  icons: [{ symbol: "🌊", meaning: "Flood" }, { symbol: "🌳", meaning: "Swamp" }],
  keywords: ["Engineering", "Time-Pressure", "Environmental"],
  hook: "Early October, 1987 – The canal's locks have failed, flooding run amok. Survivors must seal gates before the rising tide drowns them.",
  mapLayout: "Highway Branch: Start at Abandoned Airboat Dock → Mangrove Tangle → Cypress Bayou Locks (Extraction)",
  startingHeat: 1,
  objectives: [
    {
      description: "Repair three Canal Gate tokens (placed on Mangrove, Tangle, and Dock)",
      required: true,
      difficultyLevel: 4,
      completionCheck: "Successfully repair all three Canal Gate tokens with Tool Gear (Repair check DC 11)"
    },
    {
      description: "Extract at Cypress Bayou Locks",
      required: true,
      difficultyLevel: 2,
      completionCheck: "Reach the Cypress Bayou Locks extraction point"
    },
    {
      description: "Salvage Engineer's Toolkit at Dock",
      required: false,
      reward: "+1 Repair bonus permanently",
      difficultyLevel: 2,
      regionId: "abandoned-airboat-dock",
      completionCheck: "Find and salvage the Engineer's Toolkit at the Abandoned Airboat Dock"
    },
    {
      description: "Destroy one Hazard card by resource dump",
      required: false,
      reward: "Remove a Boss Hazard from deck",
      difficultyLevel: 3,
      completionCheck: "Spend resources to destroy a Hazard card (specifics determined by GM)"
    }
  ],
  challenges: [
    {
      description: "Flood Rise - At end of each Round, move Water hazard token 1 tile closer to Extraction",
      frequency: "recurring",
      heatEffect: 1
    },
    {
      description: "Swamp Witch's Curse - Flip Mangrove Tangle → Shuffle \"Swamp Witch's Curse\" into Chaos deck",
      frequency: "once",
      trigger: "When Mangrove Tangle is flipped",
      weirdnessEffect: 2
    }
  ],
  extractionRegion: "Cypress Bayou Locks",
  specialRules: [
    "Gate Repairs: Each Repair check DC 11 consumes 1 Tool Gear use",
    "Retired Engineer (NPC): Grit DC 9 → grant 2 Repair uses",
    "Mission-Unique Hazards: Include \"Toxic Spill\" and \"Quicksand Pit\" in canal tiles"
  ],
  rules: ["Fix the canals and escape before the flood consumes everything"],
  flavor: "Water rises, hope sinks.",
  imagePrompt: "Rusted canal locks under swelling neon-green floodwaters.",
  scaling: {
    small: "2-3 players: Start Heat = 0; one gate requires DC 9",
    large: "4-6 players: Heat ticks +2; add one extra gate repair task"
  },
  recommendedPlayerCount: [2, 3, 4, 5, 6],
  estimatedDuration: 8,
  difficultyRating: 5
};

export default cypressCanalSiege;
