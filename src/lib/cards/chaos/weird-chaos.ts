import { ChaosCard } from '@/types/cards/chaos';

export const WEIRD_CHAOS: ChaosCard[] = [
  {
    id: "meteor-shower",
    name: "Meteor Shower",
    type: "chaos",
    icons: [
      { symbol: "🌌", meaning: "Cosmic" },
      { symbol: "🔥", meaning: "Event" }
    ],
    keywords: ["Cosmic", "Damage", "Luck"],
    rules: [
      "All here: Moxie DC 11 → Failure: Take 1 Damage, Lose 1 Action, and Gain 1 Heat; Success: Gain 1 Luck."
    ],
    flavor: "Fire falls from the sky—God help you.",
    imagePrompt: "Flaming meteors streaking violet skies, neon orange trails, splashes of impact in swamp and highway",
    globalEffect: "All here: Moxie DC 11 → Failure: Take 1 Damage, Lose 1 Action, and Gain 1 Heat; Success: Gain 1 Luck."
  },
  {
    id: "reality-tear",
    name: "Reality Tear",
    type: "chaos",
    icons: [
      { symbol: "🔮", meaning: "Weird" },
      { symbol: "💀", meaning: "Event" }
    ],
    keywords: ["Weird", "Rule-Twist", "Heat Spike"],
    globalEffect: "Weirdness DC 13 → Failure: Gain +3 Weirdness and Lose All Luck; Success: Discard 1 Event in play.",
    heatEffect: 0,
    rules: [
      "Reality tear causes weirdness",
      "Weirdness checks determine outcome",
      "Event discard on successful checks"
    ],
    flavor: "The world rips—nothing stays real.",
    imagePrompt: "A neon-pink tear in the sky, swirling green energies leaking through, twisted forms emerging."
  },
  {
    id: "swamp-witchs-curse",
    name: "Swamp Witch's Curse",
    type: "chaos",
    icons: [
      { symbol: "🧙", meaning: "NPC" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["NPC", "Curse", "Weird Increase"],
    globalEffect: "Charm DC 11 → Failure: Gain +2 Weirdness and Discard 1 Gear; Success: Draw 1 Treasure.",
    heatEffect: 0,
    rules: [
      "Swamp witch curse causes weirdness",
      "Charm checks determine outcome",
      "Treasure gain on successful checks"
    ],
    flavor: "Her hex claws deeper than the marsh.",
    imagePrompt: "A moss-draped crone in a stilted shack, purple eyes aglow, gnarled staff cracking neon-green lightning."
  },
  {
    id: "ghost-orchid-fever",
    name: "Ghost Orchid Fever",
    type: "chaos",
    icons: [
      { symbol: "🌱", meaning: "Environmental" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Botanical", "Hallucination"],
    globalEffect: "At start of turn here: Weirdness DC 10 → Failure: Gain +2 Weirdness; Success: Reduce 1 Weirdness.",
    heatEffect: 0,
    rules: [
      "Ghost orchid causes weirdness",
      "Weirdness checks at start of turn",
      "Weirdness reduction on successful checks"
    ],
    flavor: "One sniff, and reality wilts.",
    imagePrompt: "A spectral white orchid dripping glowing spores, neon mist curling around petals."
  },
  {
    id: "radioactive-alligator",
    name: "Radioactive Alligator",
    type: "chaos",
    icons: [
      { symbol: "☢️", meaning: "Toxic" },
      { symbol: "🐊", meaning: "Creature" }
    ],
    keywords: ["Mutation", "Damage", "Weirdness"],
    globalEffect: "All here: Grit DC 11 → Failure: Take 2 Damage and Gain +1 Weirdness; Success: Take 1 Damage.",
    heatEffect: 0,
    rules: [
      "Radioactive alligator causes damage",
      "Grit checks determine outcome",
      "Damage and weirdness gain on failed checks"
    ],
    flavor: "Science's monstrosity lurks in every swamp.",
    imagePrompt: "A hulking gator streaked with neon-green radiation burns, pustules oozing toxic slime."
  },
  {
    id: "meteoric-heat-spike",
    name: "Meteoric Heat Spike",
    type: "chaos",
    icons: [
      { symbol: "☀️", meaning: "Weather" },
      { symbol: "☄️", meaning: "Event" }
    ],
    keywords: ["Heat", "Cosmic", "Persistent"],
    globalEffect: "Increase Heat +2. Persistent: Until next Chaos card, all Heat gains from Chaos/Hazards are +1 extra. Discard on next Chaos.",
    heatEffect: 2,
    duration: "ongoing",
    rules: [
      "Meteoric heat spike increases heat",
      "Persistent effect increases heat gains",
      "Discarded on next chaos card"
    ],
    flavor: "Stars fall, and the air ignites.",
    imagePrompt: "A blazing meteor impact sending a crimson fireball skyward, neon shockwave rippling through air."
  },
  {
    id: "talking-alligator-prophet",
    name: "Talking Alligator Prophet",
    type: "chaos",
    icons: [
      { symbol: "🐊", meaning: "Creature" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["NPC", "Weird", "Choice"],
    globalEffect: "All players: Choose to Lose 1 Luck or Gain 1 Weirdness. Then, draw 1 Event card.",
    heatEffect: 0,
    rules: [
      "Talking alligator offers choice",
      "Players choose luck loss or weirdness gain",
      "Event card drawn after choice"
    ],
    flavor: "It speaks… and nobody is sure they want to listen.",
    imagePrompt: "A gator with glowing eyes perched on a stump, opening its maw as if to speak, neon-pastel runes swirling around."
  },
  {
    id: "flomanji-man-encounter",
    name: "Flomanji Man Encounter",
    type: "chaos",
    icons: [
      { symbol: "🚹", meaning: "Social" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["NPC", "Unpredictable", "Weird Increase"],
    globalEffect: "Weirdness DC 11 → Failure: Gain +2 Weirdness and Lose 1 Action; Success: Gain +1 Luck.",
    heatEffect: 0,
    rules: [
      "Flomanji man encounter causes weirdness",
      "Weirdness checks determine outcome",
      "Luck gain on successful checks"
    ],
    flavor: "Smile, nod, back away—he never looks normal.",
    imagePrompt: "A disheveled man in a stained tank top waving a rubber chicken; thick lines and neon-pink haze underscore his madness."
  },
  {
    id: "flomanjified-resurrection",
    name: "Flomanjified Resurrection",
    type: "chaos",
    icons: [
      { symbol: "💀", meaning: "Event" },
      { symbol: "🦴", meaning: "Lair" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Endgame", "Betrayal", "Persistent"],
    globalEffect: "If any player died this turn, at end of turn they instead flip to a Flomanjified role. Surviving players here make Grit DC 11 → Failure: Lose 1 Action and Gain 1 Heat.",
    heatEffect: 0,
    rules: [
      "Dead players become Flomanjified instead of elimination",
      "Survivors must pass Grit checks or face consequences",
      "Triggers at end of turn phase"
    ],
    flavor: "Death isn't the end—only a new beginning of terror.",
    imagePrompt: "A broken tombstone in cursed marsh, skeletal hand bursting forth, neon-purple mist swirling around"
  }
];
