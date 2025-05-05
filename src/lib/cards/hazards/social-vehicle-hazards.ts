
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
  }
];
