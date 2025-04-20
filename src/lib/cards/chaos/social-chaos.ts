import { ChaosCard } from '@/types/cards/chaos';

export const SOCIAL_CHAOS: ChaosCard[] = [
  {
    id: "political-meltdown",
    name: "Political Meltdown",
    type: "chaos",
    icons: [
      { symbol: "🗳️", meaning: "Social" }
    ],
    keywords: ["Social", "Heat Increase", "Discard"],
    globalEffect: "Increase Heat +1 (instead +2 if Heat ≥ 5). All players: Discard 1 random card from hand.",
    heatEffect: 1,
    rules: [
      "Political chaos increases heat",
      "Higher heat intensifies the effect",
      "Players discard random cards"
    ],
    flavor: "Everybody's screaming—and nobody's listening.",
    imagePrompt: "Flickering TV screens show shouting candidates over glitchy static; a pile of discarded ballots smolders in foreground"
  },
  {
    id: "flomanji-lottery-fever",
    name: "Flomanji Lottery Fever",
    type: "chaos",
    icons: [
      { symbol: "🤑", meaning: "Social" },
      { symbol: "🍀", meaning: "Luck" }
    ],
    keywords: ["Social", "Luck", "Heat Increase"],
    globalEffect: "Increase Heat +1. All players: Luck DC 9 → Success: Draw 1 Gear; Failure: Lose next Action.",
    heatEffect: 1,
    rules: [
      "Lottery fever increases heat",
      "Luck checks determine gear gain or action loss",
      "Gear drawn on successful checks"
    ],
    flavor: "Dreams of riches, nightmares of lines.",
    imagePrompt: "A crowded convenience store, patrons furiously scratching tickets, neon signs promising \"$1 Million!\" glowing overhead"
  },
  {
    id: "governor-signs-weird-law",
    name: "Governor Signs Weird Law",
    type: "chaos",
    icons: [
      { symbol: "🏛️", meaning: "Social" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Social", "Weirdness", "Choice"],
    globalEffect: "Increase Heat +1. All players choose: Lose 1 Luck or Gain 1 Weirdness.",
    heatEffect: 1,
    rules: [
      "Weird law increases heat",
      "Players choose between luck loss or weirdness gain",
      "Choice affects individual stats"
    ],
    flavor: "Bureaucracy meets lunacy in Tallahassee.",
    imagePrompt: "A governor's desk piled with bizarre decrees, an official signing a neon-pink parchment under flickering fluorescent lights"
  },
  {
    id: "rolling-black-market-shutdown",
    name: "Rolling Black Market Shutdown",
    type: "chaos",
    icons: [
      { symbol: "🏘️", meaning: "Suburb" },
      { symbol: "🏙️", meaning: "Urban" }
    ],
    keywords: ["Social", "Resource", "Heat Increase"],
    globalEffect: "Increase Heat +1. All players in Urban or Residential must discard 1 Gear (non-Weapon).",
    heatEffect: 1,
    rules: [
      "Black market shutdown increases heat",
      "Gear loss in urban and residential areas",
      "Non-weapon gear discarded"
    ],
    flavor: "What you can't buy legally fuels desperation here.",
    imagePrompt: "Shadowy figures dashing from a shuttered shop, underground stalls torn down, neon flicker from broken signs"
  },
  {
    id: "national-guard-deployment",
    name: "National Guard Deployment",
    type: "chaos",
    icons: [
      { symbol: "🛡️", meaning: "Social" },
      { symbol: "🚁", meaning: "Vehicle" }
    ],
    keywords: ["Social", "Movement Penalty", "Heat Increase"],
    globalEffect: "Increase Heat +1. Persistent: Until next Chaos card, Move into/out of Urban Regions requires Charm DC 9 → Failure: Lose 1 Action. Discard on next Chaos.",
    heatEffect: 1,
    duration: "ongoing",
    rules: [
      "National guard deployment increases heat",
      "Charm checks required for urban movement",
      "Action loss on failed checks"
    ],
    flavor: "Soldiers block your path in fatigues and sidearms.",
    imagePrompt: "Humvees rumbling down urban avenues, soldiers at checkpoints; neon-green flares mark roadblocks"
  },
  {
    id: "infrastructure-strike",
    name: "Infrastructure Strike",
    type: "chaos",
    icons: [
      { symbol: "🏗️", meaning: "Environmental" },
      { symbol: "🏭", meaning: "Industrial" }
    ],
    keywords: ["Social", "Environmental", "Heat Increase"],
    globalEffect: "Increase Heat +1. All players: Grit DC 9 → Failure: Lose 1 Action and Gain 1 Heat.",
    heatEffect: 1,
    rules: [
      "Infrastructure strike increases heat",
      "Grit checks required for all players",
      "Action loss and heat gain on failed checks"
    ],
    flavor: "The pipes burst when no one's there to fix them.",
    imagePrompt: "Broken water main flooding an industrial lot, steam rising through grates, riot-taped barricades fluttering"
  },
  {
    id: "tourist-season-surge",
    name: "Tourist Season Surge",
    type: "chaos",
    icons: [
      { symbol: "🏖️", meaning: "Coastal" },
      { symbol: "🏙️", meaning: "Urban" }
    ],
    keywords: ["Social", "Movement Penalty", "Persistent"],
    globalEffect: "Increase Heat +1. Persistent: Until next Chaos, Move into or out of Urban/Tourist Regions requires Moxie DC 7 → Failure: Lose Move Action. NPC checks there suffer –1 penalty. Discard on next Chaos.",
    heatEffect: 1,
    duration: "ongoing",
    rules: [
      "Tourist surge increases heat",
      "Moxie checks required for urban movement",
      "NPC checks suffer penalties"
    ],
    flavor: "Selfies block your path; \"Excuse me?\" she shouts.",
    imagePrompt: "Teeming boardwalk clogged with pastel-shirted tourists and flashing cameras; thick black outlines enforce the swarm."
  }
];
