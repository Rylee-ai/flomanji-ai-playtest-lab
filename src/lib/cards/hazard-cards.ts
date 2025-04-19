
import { HazardCard } from '@/types/cards/hazard';

// Environmental & Terrain Hazards (1-10)
const ENVIRONMENTAL_HAZARDS: HazardCard[] = [
  {
    id: "sudden-downpour",
    name: "Sudden Downpour",
    type: "hazard",
    subType: "environmental",
    icons: [
      { symbol: "🌧️", meaning: "Weather" },
      { symbol: "🌳", meaning: "Forest" },
      { symbol: "🏖️", meaning: "Coastal" },
      { symbol: "🏙️", meaning: "Urban" }
    ],
    keywords: ["Environmental", "Wet"],
    rules: [
      "Grit Check DC 7 → Failure: Choose to Lose 1 Action or Gain 1 Weirdness",
      "Rain Poncho: Auto-Success"
    ],
    difficultyClasses: {
      grit: 7
    },
    onFailure: "Choose: Lose 1 Action OR Gain 1 Weirdness",
    gearBonuses: [
      {
        itemName: "Rain Poncho",
        effect: "autoSuccess"
      }
    ],
    flavor: "Blue skies, then sheets of rain—welcome to Flomanji.",
    imagePrompt: "Thick sheets of rain slamming into a palm-lined street, harsh backlighting creating heavy silhouettes; neon pastel reflections on wet asphalt"
  },
  {
    id: "heat-stroke-risk",
    name: "Heat Stroke Risk",
    type: "hazard",
    subType: "environmental",
    icons: [
      { symbol: "☀️", meaning: "Weather" },
      { symbol: "🏜️", meaning: "Exposed" }
    ],
    keywords: ["Environmental", "Heat"],
    rules: [
      "Grit Check DC 7 (DC 9 if you lack Drink Gear) → Failure: Take 1 Damage",
      "Bottled Water: Auto-Success",
      "Sturdy Hat: +1 Bonus"
    ],
    difficultyClasses: {
      grit: 7
    },
    onFailure: "Take 1 Damage",
    gearBonuses: [
      {
        itemName: "Bottled Water",
        effect: "autoSuccess"
      },
      {
        itemName: "Sturdy Hat",
        effect: "bonus",
        bonusValue: 1
      }
    ],
    flavor: "The sun feels like a lead weight.",
    imagePrompt: "A lone figure clutching their head under a blistering sun, heat haze shimmering off cracked pavement; vibrant neon-yellow sky"
  },
  // ... Adding the next 38 hazard cards following the same structure
];

// Creature Hazards (11-20)
const CREATURE_HAZARDS: HazardCard[] = [
  {
    id: "water-moccasin-ambush",
    name: "Water Moccasin Ambush",
    type: "hazard",
    subType: "creature",
    icons: [
      { symbol: "🐍", meaning: "Creature" },
      { symbol: "🐊", meaning: "Swamp" }
    ],
    keywords: ["Creature", "Hazard", "Poison"],
    rules: [
      "Grit Check DC 9 → Failure: Take 1 Damage and gain Poison (1 persistent token)",
      "Boots or Gloves: +1 Bonus on this check"
    ],
    difficultyClasses: {
      grit: 9
    },
    onFailure: "Take 1 Damage and gain 1 Poison token",
    gearBonuses: [
      {
        itemName: "Boots",
        effect: "bonus",
        bonusValue: 1
      },
      {
        itemName: "Gloves",
        effect: "bonus",
        bonusValue: 1
      }
    ],
    flavor: "Cottonmouth bites first, asks questions later.",
    imagePrompt: "A venomous snake lunging from murky swamp water at ankle level, fangs bared, ripples spreading; neon-green highlights in the water"
  },
  // ... Continue with remaining creature hazards
];

// Social & Vehicle Hazards (21-30)
const SOCIAL_VEHICLE_HAZARDS: HazardCard[] = [
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
  // ... Continue with remaining social & vehicle hazards
];

// Weird & Rare Hazards (31-40)
const WEIRD_RARE_HAZARDS: HazardCard[] = [
  {
    id: "encounter-with-flomanji-man",
    name: "Encounter with Flomanji Man",
    type: "hazard",
    subType: "weird",
    icons: [
      { symbol: "🚹", meaning: "Social" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Social", "Weird", "Unpredictable"],
    rules: [
      "Weirdness Check DC 11 → Failure: Gain +2 Weirdness and Lose 1 Action",
      "Success: Gain +1 Luck"
    ],
    difficultyClasses: {
      weirdSense: 11
    },
    onFailure: "Gain +2 Weirdness and Lose 1 Action",
    onSuccess: "Gain +1 Luck",
    flavor: "Smile, nod, back away—this one's off the rails.",
    imagePrompt: "A wild-eyed Florida Man in a stained tank top, mismatched shorts, holding a rubber chicken and a road sign"
  },
  // ... Continue with remaining weird & rare hazards
];

// Combine all hazard categories
export const HAZARD_CARDS: HazardCard[] = [
  ...ENVIRONMENTAL_HAZARDS,
  ...CREATURE_HAZARDS,
  ...SOCIAL_VEHICLE_HAZARDS,
  ...WEIRD_RARE_HAZARDS
];
