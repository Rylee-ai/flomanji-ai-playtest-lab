
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
  // ... Adding remaining social & vehicle hazards 22-30
];
