
import { HazardCard } from '@/types/cards/hazard';

export const SOCIAL_VEHICLE_HAZARDS: HazardCard[] = [
  {
    id: "road-rage-incident",
    name: "Road Rage Incident",
    type: "hazard",
    subType: "social",
    icons: [
      { symbol: "🛣️", meaning: "Highway" },
      { symbol: "🚗", meaning: "Vehicle" }
    ],
    keywords: ["Social", "Vehicle", "Hazard", "Heat Interaction"],
    rules: [
      "Moxie Check DC 9 or Charm Check DC 9 → Failure: Take 1 Damage and Gain 1 Heat"
    ],
    difficultyClasses: {
      moxie: 9,
      charm: 9
    },
    onFailure: "Take 1 Damage and Gain 1 Heat",
    flavor: "He's honking, yelling about your taillight—and not letting up.",
    imagePrompt: "A garish 1980s sedan tailgating a smaller car on a sun-baked highway, driver leaning out the window"
  },
  {
    id: "overheating-engine",
    name: "Overheating Engine",
    type: "hazard",
    subType: "social",
    icons: [
      { symbol: "🚗", meaning: "Vehicle" }
    ],
    keywords: ["Vehicle", "Environmental", "Hazard", "Movement"],
    rules: [
      "If you have a Vehicle Gear: Grit Check DC 9 → Failure: Vehicle is unusable next turn and you Gain 1 Heat",
      "If you have no Vehicle Gear: Lose 1 Action"
    ],
    difficultyClasses: {
      grit: 9
    },
    onFailure: "Vehicle is unusable next turn and you Gain 1 Heat (or Lose 1 Action if no vehicle)",
    flavor: "Steam hisses from under the hood like a boiling cauldron.",
    imagePrompt: "Close-up of a vintage car's hood popping open on the roadside, steam billowing out; radiator flap bent"
  },
  {
    id: "total-gridlock",
    name: "Total Gridlock",
    type: "hazard",
    subType: "social",
    icons: [
      { symbol: "🛣️", meaning: "Highway" },
      { symbol: "🏙️", meaning: "Urban" }
    ],
    keywords: ["Environmental", "Movement", "Hazard"],
    rules: [
      "If you're in a Highway or Urban Core Region: Automatically lose your next Action",
      "Motorcycle/Bicycle Gear: Discard 1 Card → ignore this effect and move normally"
    ],
    difficultyClasses: {},
    onFailure: "Automatically lose your next Action",
    gearBonuses: [
      {
        itemName: "Motorcycle",
        effect: "autoSuccess"
      },
      {
        itemName: "Bicycle",
        effect: "autoSuccess"
      }
    ],
    flavor: "It's a parking lot as far as the eye can see.",
    imagePrompt: "Birds-eye view of miles of stalled cars bumper-to-bumper under a blazing sky, neon pastel steam rising from engines"
  },
  {
    id: "stalled-vehicle",
    name: "Stalled Vehicle Blocking Lane",
    type: "hazard",
    subType: "social",
    icons: [
      { symbol: "🛣️", meaning: "Highway" },
      { symbol: "🚗", meaning: "Vehicle" }
    ],
    keywords: ["Vehicle", "Hazard", "Movement"],
    rules: [
      "Choose one:",
      "1. Wait/Detour: Lose 1 Action",
      "2. Help Push: Grit Check DC 9 → Failure: Lose 1 Action and Gain 1 Heat"
    ],
    difficultyClasses: {
      grit: 9
    },
    onFailure: "Lose 1 Action and Gain 1 Heat",
    flavor: "Of course this heap conked out in the only lane left open.",
    imagePrompt: "A rusted station wagon with its hood up, blocking a narrow highway lane; frustrated driver leaning on the fender"
  },
  {
    id: "running-out-of-gas",
    name: "Running Out of Gas Scare",
    type: "hazard",
    subType: "social",
    icons: [
      { symbol: "🛣️", meaning: "Highway" },
      { symbol: "🚗", meaning: "Vehicle" }
    ],
    keywords: ["Vehicle", "Hazard", "Resource"],
    rules: [
      "Choose one:",
      "1. Conserve: Discard 1 Card",
      "2. Risk It: Luck Check DC 9 → Failure: With Vehicle Gear: Vehicle unusable until refueled; Without Vehicle Gear: Lose your next Action"
    ],
    difficultyClasses: {
      // Using grit because there's no luck in the difficultyClasses type
      grit: 9
    },
    onFailure: "With Vehicle Gear: Vehicle unusable until refueled; Without Vehicle Gear: Lose your next Action",
    flavor: "You swear that gauge just dipped again.",
    imagePrompt: "Dashboard view of a fuel gauge teetering on 'E,' low-fuel light glaring; through the windshield, empty highway"
  },
  {
    id: "errant-golf-ball",
    name: "Errant Golf Ball",
    type: "hazard",
    subType: "social",
    icons: [
      { symbol: "🏘️", meaning: "Suburb" }
    ],
    keywords: ["Environmental", "Hazard", "Suburb"],
    rules: [
      "Moxie Check DC 9 → Failure: Take 1 Damage",
      "Sturdy Work Boots Gear: +1 Bonus on this check"
    ],
    difficultyClasses: {
      moxie: 9
    },
    onFailure: "Take 1 Damage",
    gearBonuses: [
      {
        itemName: "Sturdy Work Boots",
        effect: "bonus",
        bonusValue: 1
      }
    ],
    flavor: "FORE! Someone's slice just cost you an earful of pain.",
    imagePrompt: "A white golf ball frozen mid-flight toward the viewer, background of a manicured lawn and palm trees"
  },
  {
    id: "poolside-scavengers",
    name: "Poolside Scavengers",
    type: "hazard",
    subType: "social",
    icons: [
      { symbol: "🏘️", meaning: "Suburb" },
      { symbol: "🏖️", meaning: "Coastal" }
    ],
    keywords: ["Social", "Hazard", "Suburb", "Heat Interaction"],
    rules: [
      "Moxie Check DC 9 → Failure: Discard 1 Consumable Gear or 1 non-Weapon Gear, and Gain 1 Heat"
    ],
    difficultyClasses: {
      moxie: 9
    },
    onFailure: "Discard 1 Consumable Gear or 1 non-Weapon Gear, and Gain 1 Heat",
    flavor: "When the snacks run out, civility dives with everyone else.",
    imagePrompt: "A snarling crowd of resort-tanned scavengers rifling through a deserted pool bar, towels and chairs askew"
  },
  {
    id: "hoa-patrol",
    name: "HOA Patrol",
    type: "hazard",
    subType: "social",
    icons: [
      { symbol: "🏘️", meaning: "Suburb" }
    ],
    keywords: ["Social", "Hazard", "Suburb", "Heat Interaction"],
    rules: [
      "Charm Check DC 9 → Failure: Gain 1 Heat",
      "Moxie Check DC 9 → Failure: Lose your next Action and Gain 1 Heat"
    ],
    difficultyClasses: {
      charm: 9,
      moxie: 9
    },
    onFailure: "Gain 1 Heat (Charm) or Lose your next Action and Gain 1 Heat (Moxie)",
    flavor: "\"Your tent color violates subsection 4b!\" Peak Flomanji bureaucracy.",
    imagePrompt: "A clipboard-wielding, visor-clad HOA enforcer frowning under a blazing sun, perfectly trimmed hedges behind"
  },
  {
    id: "gawking-spectators",
    name: "Gawking Spectators",
    type: "hazard",
    subType: "social",
    icons: [
      { symbol: "🏙️", meaning: "Urban" }
    ],
    keywords: ["Social", "Hazard", "Movement", "Heat Interaction"],
    rules: [
      "Moxie Check DC 9 → Failure: Lose 1 Action",
      "If Heat ≥ 5: also Gain 1 Heat"
    ],
    difficultyClasses: {
      moxie: 9
    },
    onFailure: "Lose 1 Action. If Heat ≥ 5: also Gain 1 Heat",
    flavor: "Everyone's live-streaming your misery—blocking the path while they do.",
    imagePrompt: "A ring of phone-wielding onlookers encircling an unseen incident, screens illuminating their eager faces"
  },
  {
    id: "panicked-driver",
    name: "Panicked Driver Swerving",
    type: "hazard",
    subType: "social",
    icons: [
      { symbol: "🛣️", meaning: "Highway" },
      { symbol: "🚗", meaning: "Vehicle" }
    ],
    keywords: ["Vehicle", "Hazard", "Movement"],
    rules: [
      "Moxie Check DC 9 → Failure: Take 1 Damage and Lose 1 Action"
    ],
    difficultyClasses: {
      moxie: 9
    },
    onFailure: "Take 1 Damage and Lose 1 Action",
    flavor: "A car veers into your lane—no time to think, only to duck.",
    imagePrompt: "A sedan fishtailing across lanes toward the viewer, tires screeching on neon-haze asphalt with dust clouds"
  }
];
