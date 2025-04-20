import { ChaosCard } from '@/types/cards/chaos';

export const CREATURE_CHAOS: ChaosCard[] = [
  {
    id: "alligator-ambush",
    name: "Alligator Ambush!",
    type: "chaos",
    icons: [
      { symbol: "🐊", meaning: "Creature" },
      { symbol: "🐊", meaning: "Swamp" }
    ],
    keywords: ["Creature", "Boss Trigger", "Heat Increase"],
    globalEffect: "Increase Heat +1. Spawn the Meth Gator Boss (HP = 3×players) in the nearest Swamp Region.",
    heatEffect: 1,
    rules: [
      "Alligator ambush spawns boss",
      "Meth Gator boss appears in swamp",
      "Boss health scales with player count"
    ],
    flavor: "Jaws snap—can you even fight this?",
    imagePrompt: "A colossal chemically-mutated alligator lunging from swamp water, glowing eyes, dripping neon-green ichor"
  },
  {
    id: "python-constrictor-strike",
    name: "Python Constrictor Strike",
    type: "chaos",
    icons: [
      { symbol: "🐍", meaning: "Creature" },
      { symbol: "🐊", meaning: "Swamp" }
    ],
    keywords: ["Creature", "Hazard Trigger", "Heat Increase"],
    globalEffect: "Increase Heat +1. Trigger a Python Constrictor Hazard in each occupied Swamp Region.",
    heatEffect: 1,
    rules: [
      "Python strike triggers hazard",
      "Python constrictor hazard appears in swamp",
      "Hazard affects occupied regions"
    ],
    flavor: "Muscle and scale squeeze the life out of you.",
    imagePrompt: "A thick python wrapped around a timber piling, squeezing with deadly intent, neon stripes on its skin"
  },
  {
    id: "fire-ant-frenzy",
    name: "Fire Ant Frenzy",
    type: "chaos",
    icons: [
      { symbol: "🐜", meaning: "Creature" },
      { symbol: "🌱", meaning: "Environmental" }
    ],
    keywords: ["Creature", "Toxin", "Heat Increase"],
    globalEffect: "Increase Heat +1. All players: Grit DC 8 → Failure: Take 1 Damage and Lose 1 Luck.",
    heatEffect: 1,
    rules: [
      "Fire ant frenzy increases heat",
      "Grit checks required for all players",
      "Damage and luck loss on failed checks"
    ],
    flavor: "Tiny devils sting your every nerve.",
    imagePrompt: "A writhing mound of crimson ants swarming up a boot, bites glowing red on pale skin; neon highlights on each insect"
  },
  {
    id: "swamp-boar-stampede",
    name: "Swamp Boar Stampede",
    type: "chaos",
    icons: [
      { symbol: "🐗", meaning: "Creature" },
      { symbol: "🐊", meaning: "Swamp" }
    ],
    keywords: ["Creature", "Stampede", "Heat Increase"],
    globalEffect: "Increase Heat +1. All here: Moxie DC 9 → Failure: Lose 1 Action and Take 1 Damage.",
    heatEffect: 1,
    rules: [
      "Boar stampede increases heat",
      "Moxie checks required for all players",
      "Action loss and damage on failed checks"
    ],
    flavor: "Hooves thunder—dodge or be trampled.",
    imagePrompt: "A pack of tusked boars charging through shallow water, mud spray in neon-pastel arcs"
  },
  {
    id: "stray-dog-pack",
    name: "Stray Dog Pack",
    type: "chaos",
    icons: [
      { symbol: "🐕", meaning: "Creature" },
      { symbol: "🏙️", meaning: "Urban" }
    ],
    keywords: ["Creature", "Pack", "Heat Increase"],
    globalEffect: "Increase Heat +1. Fight DC 9 → Failure: Take 1 Damage and Discard 1 non-Weapon Gear.",
    heatEffect: 1,
    rules: [
      "Dog pack increases heat",
      "Fight checks required",
      "Damage and gear loss on failed checks"
    ],
    flavor: "Hungry strays turn deadly in the alleys.",
    imagePrompt: "Mangy dogs snarling under flickering streetlights, pastel graffiti walls behind, tension crackling in neon outlines"
  },
];
