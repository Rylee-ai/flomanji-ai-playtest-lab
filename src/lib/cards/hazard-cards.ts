
import { HazardCard } from '@/types/cards/hazard';

export const HAZARD_CARDS: HazardCard[] = [
  {
    id: "sudden-downpour",
    name: "Sudden Downpour",
    type: "hazard",
    subType: "environmental",
    icons: [
      { symbol: "🌧️", meaning: "Weather" },
      { symbol: "🌳", meaning: "Forest" }
    ],
    keywords: ["Environmental", "Wet"],
    difficultyClasses: {
      grit: 7
    },
    rules: [
      "Grit Check DC 7 → Failure: Choose to Lose 1 Action or Gain 1 Weirdness",
      "Rain Poncho: Auto-Success"
    ],
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
    difficultyClasses: {
      grit: 7
    },
    rules: [
      "Grit Check DC 7 (DC 9 if you lack Drink Gear) → Failure: Take 1 Damage",
      "Bottled Water: Auto-Success",
      "Sturdy Hat: +1 Bonus"
    ],
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
    id: "meth-gator",
    name: "Meth Gator",
    type: "hazard",
    subType: "creature",
    icons: [
      { symbol: "🐊", meaning: "Creature" },
      { symbol: "🐊", meaning: "Swamp" },
      { symbol: "☣️", meaning: "Toxic" }
    ],
    keywords: ["Boss", "Creature", "Toxic"],
    difficultyClasses: {
      fight: 12,
      flee: 11,
      negotiate: 14,
      outsmart: 10
    },
    rules: [
      "Boss: HP = 3 × number of Survivors",
      "Toxic Bite: On failed Fight check, gain 1 Weirdness",
      "Chaos Strike: During Chaos Phase, deals 1 Damage to closest Survivor",
      "Trophy: On defeat, one player may take the Meth Gator Tooth artifact"
    ],
    onFailure: "Take 3 Damage and gain 2 Weirdness",
    bossHazard: true,
    flavor: "Chemical fury and ancient hunger in one package.",
    imagePrompt: "Massive alligator with glowing green eyes and crystalline scales, jaw agape with chemical steam rising from its mouth"
  }
];
