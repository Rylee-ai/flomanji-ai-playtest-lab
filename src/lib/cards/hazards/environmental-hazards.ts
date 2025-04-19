
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
  {
    id: "sudden-downburst-microburst",
    name: "Sudden Downburst (Microburst)",
    type: "hazard",
    subType: "environmental",
    icons: [
      { symbol: "🌬️", meaning: "Weather" },
      { symbol: "🏖️", meaning: "Coastal" },
      { symbol: "🌳", meaning: "Forest" },
      { symbol: "🏙️", meaning: "Urban" }
    ],
    keywords: ["Environmental", "Gust"],
    rules: [
      "Moxie Check DC 9 → Failure: Lose 1 Action & Discard 1 Gear (any)"
    ],
    difficultyClasses: {
      moxie: 9
    },
    onFailure: "Lose 1 Action & Discard 1 Gear (any)",
    flavor: "A wall of wind flattens everything in its path.",
    imagePrompt: "Palms bending horizontal under a forceful gust, debris tumbling through the air; dramatic contrast of bright and shadow"
  },
  {
    id: "quicksand-pit",
    name: "Quicksand Pit",
    type: "hazard",
    subType: "environmental",
    icons: [
      { symbol: "🌍", meaning: "Unstable Ground" },
      { symbol: "🐊", meaning: "Swamp" },
      { symbol: "🌳", meaning: "Forest" }
    ],
    keywords: ["Environmental", "Trap"],
    rules: [
      "Moxie Check DC 9 → Failure: Become Immobilized this turn (freeing self requires spending 1 Action)"
    ],
    difficultyClasses: {
      moxie: 9
    },
    onFailure: "Become Immobilized this turn (freeing self requires spending 1 Action)",
    flavor: "The swamp pretends it's just water—until it isn't.",
    imagePrompt: "Murky pool rimmed by reeds, a leg sinking mid-stride, ripples spreading in neon-green water; heavy black outlines"
  },
  {
    id: "rip-current",
    name: "Rip Current",
    type: "hazard",
    subType: "environmental",
    icons: [
      { symbol: "🌊", meaning: "Coastal" },
      { symbol: "🌧️", meaning: "Weather" }
    ],
    keywords: ["Environmental", "Movement"],
    rules: [
      "Moxie Check DC 9 → Failure: Forced Move 1 adjacent Coastal Region + Take 1 Damage",
      "Surfboard: Discard to auto-succeed and ignore forced move"
    ],
    difficultyClasses: {
      moxie: 9
    },
    onFailure: "Forced Move 1 adjacent Coastal Region + Take 1 Damage",
    gearBonuses: [
      {
        itemName: "Surfboard",
        effect: "autoSuccess"
      }
    ],
    flavor: "The ocean tugs you out—and won't let go.",
    imagePrompt: "Churning turquoise waves pulling a lone swimmer seaward; sandy shore shrinking on the horizon; dynamic splashes"
  },
  {
    id: "heat-wave",
    name: "Heat Wave",
    type: "hazard",
    subType: "environmental",
    icons: [
      { symbol: "☀️", meaning: "Weather" },
      { symbol: "🏜️", meaning: "Exposed" }
    ],
    keywords: ["Environmental", "Endurance"],
    rules: [
      "All players here (if Heat ≥ 5) make Grit Check DC 9 → Failure: Gain 1 Weirdness"
    ],
    difficultyClasses: {
      grit: 9
    },
    onFailure: "Gain 1 Weirdness",
    flavor: "Each breath tastes like molten metal.",
    imagePrompt: "Wavy heat haze rising off a sun-bleached road, survivors fanning themselves desperately; intense neon-orange glare"
  },
  {
    id: "drainage-flood",
    name: "Sudden Downburst (Drainage Flood)",
    type: "hazard",
    subType: "environmental",
    icons: [
      { symbol: "🌧️", meaning: "Weather" },
      { symbol: "🛣️", meaning: "Highway" },
      { symbol: "🏘️", meaning: "Suburb" }
    ],
    keywords: ["Environmental", "Flood"],
    rules: [
      "On entry or at start of turn if water level rising: Lose 1 Action unless you pass Moxie DC 9 (gain +1 if you have Vehicle-Airboat)"
    ],
    difficultyClasses: {
      moxie: 9
    },
    onFailure: "Lose 1 Action",
    gearBonuses: [
      {
        itemName: "Vehicle-Airboat",
        effect: "bonus",
        bonusValue: 1
      }
    ],
    flavor: "Storm drains choke—and then overflow.",
    imagePrompt: "Torrential water sluicing over curbs into streets, cars half-submerged; neon reflections on rippling currents"
  },
  {
    id: "fungal-bloom",
    name: "Fungal Bloom",
    type: "hazard",
    subType: "environmental",
    icons: [
      { symbol: "🌱", meaning: "Mold" },
      { symbol: "🐊", meaning: "Swamp" },
      { symbol: "🌳", meaning: "Forest" }
    ],
    keywords: ["Environmental", "Toxin"],
    rules: [
      "On your turn start: Take 1 Damage unless you succeed on Grit Check DC 9",
      "Gas Mask / Respirator: Auto-Success"
    ],
    difficultyClasses: {
      grit: 9
    },
    onFailure: "Take 1 Damage",
    gearBonuses: [
      {
        itemName: "Gas Mask",
        effect: "autoSuccess"
      },
      {
        itemName: "Respirator",
        effect: "autoSuccess"
      }
    ],
    flavor: "Invisible spores choke the unwary.",
    imagePrompt: "White, ghostly fungal tendrils creeping along a swamp log, spores puffing into the air; muted neon-green glow"
  },
  {
    id: "ground-tremor",
    name: "Ground Tremor",
    type: "hazard",
    subType: "environmental",
    icons: [
      { symbol: "🌍", meaning: "Unstable Ground" },
      { symbol: "🏗️", meaning: "Urban" },
      { symbol: "🏭", meaning: "Industrial" }
    ],
    keywords: ["Environmental", "Shake"],
    rules: [
      "Grit Check DC 7 → Failure: Lose 1 Action. If you're in an Unstable Ground Region, also Gain 1 Weirdness"
    ],
    difficultyClasses: {
      grit: 7
    },
    onFailure: "Lose 1 Action. If you're in an Unstable Ground Region, also Gain 1 Weirdness",
    flavor: "The earth grumbles like an angry beast.",
    imagePrompt: "Cracks spiderwebbing across concrete beneath a shaking streetlight, dust in the neon air; motion blur at the edges"
  }
];
