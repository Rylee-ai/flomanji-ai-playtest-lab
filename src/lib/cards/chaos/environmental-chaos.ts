import { ChaosCard } from '@/types/cards/chaos';

export const ENVIRONMENTAL_CHAOS: ChaosCard[] = [
  {
    id: "heat-wave",
    name: "Heat Wave",
    type: "chaos",
    icons: [
      { symbol: "☀️", meaning: "Weather" },
      { symbol: "🌡️", meaning: "Environmental" }
    ],
    keywords: ["Environmental", "Heat", "Increase"],
    globalEffect: "Increase Heat +1. All players: Grit DC 7 → Failure: Take 1 Damage; suffer -1 penalty if in Urban or Highway Regions.",
    heatEffect: 1,
    rules: [
      "Heat penalty applies to all Urban/Highway regions",
      "Damage taken on failed Grit checks",
      "Stacks with other Heat effects"
    ],
    flavor: "The sun's fury turns pavement into lava.",
    imagePrompt: "A blistering white sun overhead, heat haze warping palm-lined streets; neon-orange mirages dance off melting asphalt"
  },
  {
    id: "flash-flood-warning",
    name: "Flash Flood Warning",
    type: "chaos",
    icons: [
      { symbol: "🌧️", meaning: "Weather" },
      { symbol: "🌊", meaning: "Coastal" },
      { symbol: "💧", meaning: "River" }
    ],
    keywords: ["Environmental", "Flood", "Heat Increase"],
    globalEffect: "Increase Heat +1. Players in Swamp, Coastal, or River (or adjacent Urban/Residential): Grit DC 7 → Failure: Lose 1 non-Vehicle Gear or Take 1 Damage.",
    heatEffect: 1,
    rules: [
      "Flood damage affects coastal and river regions",
      "Gear loss on failed Grit checks",
      "Heat increase stacks with other effects"
    ],
    flavor: "The earth wasn't ready for this deluge.",
    imagePrompt: "Torrential water surging over curbs, half-submerged cars, swirling debris under dark clouds; neon reflections on rising floodwaters"
  },
  {
    id: "sinkhole-swarm",
    name: "Sinkhole Swarm",
    type: "chaos",
    icons: [
      { symbol: "🌍", meaning: "Unstable Ground" },
      { symbol: "🏘️", meaning: "Suburb" },
      { symbol: "🛣️", meaning: "Highway" }
    ],
    keywords: ["Environmental", "Hazard Trigger", "Heat Increase"],
    globalEffect: "Increase Heat +1. Each player rolls d6: on 1–2 (1–3 if Heat ≥ 7) immediately trigger the Sinkhole Surprise Hazard in their Region.",
    heatEffect: 1,
    rules: [
      "Sinkholes trigger hazard events",
      "Higher heat increases sinkhole frequency",
      "Dice roll determines hazard activation"
    ],
    flavor: "The ground gives way—everywhere at once.",
    imagePrompt: "Pockmarked landscapes with gaping sinkholes swallowing roads, lawns, and sidewalks; dust clouds swirl at each rim"
  },
  {
    id: "red-tide-alert",
    name: "Red Tide Alert",
    type: "chaos",
    icons: [
      { symbol: "🏖️", meaning: "Coastal" },
      { symbol: "☣️", meaning: "Toxic" },
      { symbol: "🌡️", meaning: "Environmental" }
    ],
    keywords: ["Environmental", "Coastal", "Resource Penalty"],
    globalEffect: "Increase Heat +1. Players in Coastal: Grit DC 7 → Failure: Take 1 Damage and Gain 1 Weirdness. Until next Chaos card, Interact actions in Coastal Regions cannot find Food/Water.",
    heatEffect: 1,
    rules: [
      "Red tide affects coastal regions",
      "Resource penalty on failed Grit checks",
      "Weirdness gain on failed checks"
    ],
    flavor: "Waves of death wash ashore.",
    imagePrompt: "Blood-red water lapping onto toxic foam-lined beach, dead fish dotting sand; eerie neon-red glow under stormy sky"
  },
  {
    id: "sudden-fog-bank",
    name: "Sudden Fog Bank",
    type: "chaos",
    icons: [
      { symbol: "🌧️", meaning: "Weather" },
      { symbol: "🌫️", meaning: "Environmental" }
    ],
    keywords: ["Environmental", "Movement", "Persistent"],
    globalEffect: "Increase Heat +1. Persistent: Until next Chaos card, all Move actions cost +1 Action and Ranged/Spot checks suffer -1 penalty. Discard when next Chaos is drawn.",
    heatEffect: 1,
    duration: "ongoing",
    rules: [
      "Fog bank increases movement cost",
      "Ranged and spot checks suffer penalties",
      "Persistent effect until next chaos card"
    ],
    flavor: "You can't see your hand in front of your face.",
    imagePrompt: "Dense white fog rolling across a swamp boardwalk, obscuring all but the closest shapes; neon-pastel orbs of light barely glowing through mist"
  },
  {
    id: "rolling-blackout",
    name: "Rolling Blackout",
    type: "chaos",
    icons: [
      { symbol: "🏙️", meaning: "Urban" },
      { symbol: "⚡", meaning: "Tech" },
      { symbol: "🌡️", meaning: "Environmental" }
    ],
    keywords: ["Environmental", "Tech Penalty", "Persistent"],
    globalEffect: "Increase Heat +1. Persistent: Until next Chaos card, Electronic Gear cannot be used; players in Urban/Residential must Moxie DC 7 → Failure: Lose 1 Action. Discard on next Chaos.",
    heatEffect: 1,
    duration: "ongoing",
    rules: [
      "Blackout disables electronic gear",
      "Moxie checks required in urban areas",
      "Action loss on failed checks"
    ],
    flavor: "First the lights go, then the noise, then hope.",
    imagePrompt: "A city street plunged into darkness, neon signs dead, only moonlight and car headlights piercing shadows; thick outlines emphasize blackout"
  },
  {
    id: "bridge-closed-unexpectedly",
    name: "Bridge Closed Unexpectedly",
    type: "chaos",
    icons: [
      { symbol: "🛣️", meaning: "Highway" },
      { symbol: "🌊", meaning: "Water" },
      { symbol: "🌍", meaning: "Environmental" }
    ],
    keywords: ["Environmental", "Movement", "Heat Increase"],
    globalEffect: "Increase Heat +1. The next time a player tries to Move across water or between Coastal/Swamp/Highway/Urban, the path is blocked: either spend +1 Action detour or Grit DC 7 → Failure: Take 1 Damage. Applies once.",
    heatEffect: 1,
    rules: [
      "Bridge closure blocks movement",
      "Detour requires extra action",
      "Damage taken on failed Grit checks"
    ],
    flavor: "That bridge seemed safe yesterday…",
    imagePrompt: "A battered overpass crumbled in mid-span, 'CLOSED' barricades in harsh neon paint blocking one lane; broken girders jut into the sky"
  },
  {
    id: "alligator-migration",
    name: "Alligator Migration",
    type: "chaos",
    icons: [
      { symbol: "🐊", meaning: "Creature" },
      { symbol: "🐊", meaning: "Swamp" },
      { symbol: "🏖️", meaning: "Coastal" },
      { symbol: "💧", meaning: "River" }
    ],
    keywords: ["Creature", "Hazard Trigger", "Heat Increase"],
    globalEffect: "Increase Heat +1. Spawn one Alligator Ambush! Hazard in each occupied Swamp/River/Coastal Region, plus one in a random adjacent empty such Region.",
    heatEffect: 1,
    rules: [
      "Alligator migration spawns hazards",
      "Hazards appear in swamp, river, and coastal regions",
      "Additional hazard in adjacent empty region"
    ],
    flavor: "They're on the move—and you're in their path.",
    imagePrompt: "Dozens of gators slithering across swamp, beach, and canal toward civilization; neon-green eyes and scales glint in fading light"
  },
  {
    id: "invasive-species-bloom",
    name: "Invasive Species Bloom",
    type: "chaos",
    icons: [
      { symbol: "🐍", meaning: "Creature" },
      { symbol: "🌿", meaning: "Environmental" }
    ],
    keywords: ["Environmental", "Hazard Trigger", "Heat Increase"],
    globalEffect: "Increase Heat +1. For each occupied Swamp or Coastal Region, draw and place one random Hazard card there (e.g. Python Constrictor, Fire Ant Swarm).",
    heatEffect: 1,
    rules: [
      "Invasive species trigger hazards",
      "Hazards appear in swamp and coastal regions",
      "Random hazard card drawn for each region"
    ],
    flavor: "Nature's invaders don't care who signed treaties.",
    imagePrompt: "Overgrown foliage bursting with alien pythons, giant snails, walking catfish; neon pastel flora tangled with dangerous fauna"
  }
];
