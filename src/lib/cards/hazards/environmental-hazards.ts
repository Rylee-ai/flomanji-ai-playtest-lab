
import { HazardCard } from '@/types/cards/hazard';

export const ENVIRONMENTAL_HAZARDS: HazardCard[] = [
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
  {
    id: "sinkhole-surprise",
    name: "Sinkhole Surprise",
    type: "hazard",
    subType: "environmental",
    icons: [
      { symbol: "🌍", meaning: "Unstable Ground" },
      { symbol: "🏘️", meaning: "Suburb" },
      { symbol: "🛣️", meaning: "Highway" }
    ],
    keywords: ["Environmental", "Collapse"],
    rules: [
      "Grit Check DC 9 → Failure: Discard 1 non-Vehicle Gear & Lose Next Action; on a 1, also Take 1 Damage"
    ],
    difficultyClasses: {
      grit: 9
    },
    onFailure: "Discard 1 non-Vehicle Gear & Lose Next Action; on a 1, also Take 1 Damage",
    flavor: "One misstep, and the earth swallows you.",
    imagePrompt: "Jagged asphalt cracking open beneath an oblivious car's tire, dark shadows yawning below; dust and debris in a neon-orange swirl"
  },
  // ... Adding remaining environmental hazards 4-10
];
