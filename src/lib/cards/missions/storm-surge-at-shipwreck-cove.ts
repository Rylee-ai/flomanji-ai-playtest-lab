import { MissionSheet } from "@/types/cards/mission";

const stormSurgeAtShipwreckCove: MissionSheet = {
  id: "storm-surge-at-shipwreck-cove",
  name: "Storm Surge at Shipwreck Cove",
  type: "exploration",
  icons: [{ symbol: "🌀", meaning: "Hurricane" }, { symbol: "🚢", meaning: "Shipwreck" }],
  keywords: ["Exploration", "Collection", "Time-Pressure"],
  hook: "November 1987 – A late hurricane lashes the coast, unearthing a sunken wreck. Dive in, secure relics, and escape before the storm's eye returns.",
  mapLayout: "3×3 Grid: A1 Cliffside Watchtower (Start) · A2 Rocky Shore · A3 Shipwreck Cove (face-up) · B1 Coastal Village · B2 Underwater Ruins · B3 Flooded Jetty · C1 Storm-Tossed Beach · C2 Lighthouse Ruins · C3 Lifeboat Dock (Extraction)",
  startingHeat: 4,
  objectives: [
    {
      description: "Salvage 2 Artifact Relics from Underwater Ruins and Shipwreck Cove",
      required: true,
      difficultyLevel: 4,
      completionCheck: "Find and collect 2 Artifact Relics from the specified locations",
      regionId: "underwater-ruins"
    },
    {
      description: "Reach Lifeboat Dock before end of Round 6",
      required: true,
      difficultyLevel: 3,
      completionCheck: "Successfully reach the Lifeboat Dock before the end of Round 6"
    },
    {
      description: "Light the Watchtower Beacon",
      required: false,
      reward: "Draw 1 Chaos card to discard",
      difficultyLevel: 2,
      regionId: "cliffside-watchtower",
      completionCheck: "Activate the Watchtower Beacon (Tech check DC 10)"
    },
    {
      description: "Rescue Village Elder (NPC)",
      required: false,
      reward: "Gain 2 Clue tokens",
      difficultyLevel: 3,
      regionId: "coastal-village",
      completionCheck: "Find and rescue the Village Elder from the Coastal Village"
    }
  ],
  challenges: [
    {
      description: "Diving Checks - Enter Underwater Ruins → Moxie DC 11 or take 1 Damage",
      frequency: "triggered",
      trigger: "When entering Underwater Ruins"
    },
    {
      description: "Storm Wind - Each Chaos Phase add +1 Heat and push all Survivors one tile toward Extraction",
      frequency: "recurring",
      heatEffect: 1
    }
  ],
  extractionRegion: "Lifeboat Dock",
  specialRules: [
    "Flip Coastal Village → draw NPC \"Local Fisherman\"",
    "Local Fisherman (NPC): Brawn DC 9 → grant 1 Artifact draw",
    "Mission-Unique Hazards: Include \"Shark Fighter\" and \"Toxic Spill\" near water tiles"
  ],
  rules: ["Collect the artifacts and escape before the hurricane's eye returns"],
  flavor: "Dive deep... but don't drown in madness.",
  imagePrompt: "Gnarled wreck half-submerged under thrashing neon waves.",
  scaling: {
    small: "2-3 players: Start Heat +3; one Relic required",
    large: "4-6 players: Start Heat +5; three Relics required; storm wind +2 Heat per Chaos"
  },
  recommendedPlayerCount: [2, 3, 4, 5, 6],
  estimatedDuration: 10,
  difficultyRating: 8
};

export default stormSurgeAtShipwreckCove;
