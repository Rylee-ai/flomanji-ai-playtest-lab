
import { MissionSheet } from '@/types/cards/mission';

export const MISSION_CARDS: MissionSheet[] = [
  {
    id: "gator-aid-on-i95",
    name: "Gator-Aid on I-95",
    type: "mission",
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
    estimatedDuration: 6,
    difficultyRating: 6
  },
  {
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
    estimatedDuration: 5,
    difficultyRating: 7
  },
  {
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
    estimatedDuration: 6,
    difficultyRating: 6
  },
  {
    id: "cypress-canal-siege",
    name: "Cypress Canal Siege",
    type: "mission",
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
    estimatedDuration: 5,
    difficultyRating: 5
  },
  {
    id: "storm-surge-at-shipwreck-cove",
    name: "Storm Surge at Shipwreck Cove",
    type: "mission",
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
    estimatedDuration: 6,
    difficultyRating: 8
  }
];
