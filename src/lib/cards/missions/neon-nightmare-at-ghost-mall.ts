
import { MissionSheet } from "@/types/cards/mission";

const neonNightmareAtGhostMall: MissionSheet = {
  id: "neon-nightmare-at-ghost-mall",
  name: "Neon Nightmare at Ghost Mall",
  type: "mission",
  icons: [{ symbol: "🏬", meaning: "Mall" }, { symbol: "👻", meaning: "Haunted" }],
  keywords: ["Exploration", "Rescue", "Supernatural"],
  hook: "Late September, 1987 – An abandoned mall's neon signs flicker to life as specters roam its halls. Investigate missing teens before they vanish forever.",
  mapLayout: "3×3 Grid: A1 Mall Entrance (Start) · A2 Food Court · A3 Shuttered Arcade · B1 Dept. Store · B2 Empty Atrium · B3 Cinema Ruins · C1 Parking Deck · C2 Haunted Hallway · C3 Maintenance Tunnel (Extraction)",
  startingHeat: 2,
  objectives: [
    {
      description: "Find and rescue 3 Teen Tokens hidden in random Region flips",
      required: true,
      difficultyLevel: 3,
      completionCheck: "Locate and rescue 3 Teen Tokens and bring them to the Extraction point"
    },
    {
      description: "Reach Maintenance Tunnel to extract",
      required: true,
      difficultyLevel: 2,
      completionCheck: "At least one Survivor must reach the Maintenance Tunnel"
    },
    {
      description: "Trigger Arcade (Special Zone)",
      required: false,
      reward: "Each player reduces 1 Weirdness",
      difficultyLevel: 1,
      regionId: "shuttered-arcade",
      completionCheck: "Enter and activate the Shuttered Arcade special zone"
    },
    {
      description: "Disable flickering neon inverter",
      required: false,
      reward: "Draw 1 Artifact",
      difficultyLevel: 3,
      completionCheck: "Find and disable the flickering neon inverter (Tech check DC 10)"
    }
  ],
  challenges: [
    {
      description: "Spectral Entry - Flip Ghost Mall Entrance → draw \"Ethereal Wail\" Hazard immediately",
      frequency: "once",
      trigger: "When Ghost Mall Entrance is flipped"
    },
    {
      description: "Haunted Echo - Enter any Malfunctioning Sign tile → pass Weirdness check DC 11 or gain 1 Weirdness",
      frequency: "triggered",
      trigger: "When entering a Malfunctioning Sign tile",
      weirdnessEffect: 1
    }
  ],
  extractionRegion: "Maintenance Tunnel",
  specialRules: [
    "Arcade Special Zone: Acts as Video Game Arcade module; no action to enter; once per visit you may Play Arcade effects",
    "Lost Security Guard (NPC): Negotiation DC 11 → gain 1 Clue and 1 Heat",
    "Mission-Unique Hazards: Include \"Cave Echo Terror\" and \"Ghost Mall Panic\" in first four flips"
  ],
  rules: ["Find all missing teens and escape through the maintenance tunnel"],
  flavor: "Flickering neon never felt so cold.",
  imagePrompt: "Graffiti-tagged mall corridor bathed in strobing neon.",
  scaling: {
    small: "2-3 players: Start Heat +1; teens required = 2",
    large: "4-6 players: Heat ticks +2; teens required = 4"
  },
  recommendedPlayerCount: [2, 3, 4, 5, 6],
  estimatedDuration: 9,
  difficultyRating: 6
};

export default neonNightmareAtGhostMall;
