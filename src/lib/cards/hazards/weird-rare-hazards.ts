
import { HazardCard } from '@/types/cards/hazard';

export const WEIRD_RARE_HAZARDS: HazardCard[] = [
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
  {
    id: "lost-keys-wallet",
    name: "Lost Keys / Wallet",
    type: "hazard",
    subType: "weird",
    icons: [
      { symbol: "🎒", meaning: "Social" },
      { symbol: "🏘️", meaning: "Suburb" }
    ],
    keywords: ["Misfortune", "Delay", "Social"],
    rules: [
      "Luck Check DC 9 or Moxie Check DC 9 → Failure: Lose 1 Action and Discard 1 Random Card"
    ],
    difficultyClasses: {
      // Using grit since "luck" isn't in the difficulty class type
      grit: 9,
      moxie: 9
    },
    onFailure: "Lose 1 Action and Discard 1 Random Card",
    flavor: "Pockets empty—panic rising.",
    imagePrompt: "Overhead view of frantic hands patting empty pockets, a lone key and wallet corner just out of reach"
  },
  {
    id: "cb-static-dead-zone",
    name: "CB Static Dead Zone",
    type: "hazard",
    subType: "weird",
    icons: [
      { symbol: "📡", meaning: "Tech" },
      { symbol: "🌳", meaning: "Forest" }
    ],
    keywords: ["Isolation", "Radio Static", "Weirdness"],
    rules: [
      "Until your next turn: any attempt to use CB or other two-way radios Lose 1 Action instead",
      "On your turn start, Gain +1 Weirdness as the static hum worms in"
    ],
    difficultyClasses: {},
    onFailure: "Lose 1 Action when using radios, Gain +1 Weirdness on turn start",
    flavor: "The static's more maddening than the silence.",
    imagePrompt: "A tangled forest with moonlight filtering through pines, a lone CB antenna sprouting from swamp water"
  },
  {
    id: "ghost-orchid-fever",
    name: "Ghost Orchid Fever",
    type: "hazard",
    subType: "weird",
    icons: [
      { symbol: "🌱", meaning: "Environmental" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Toxin", "Botanical", "Hallucinations"],
    rules: [
      "On your turn start: Weirdness Check DC 10 → Failure: Gain +2 Weirdness; Success: Reduce 1 Weirdness"
    ],
    difficultyClasses: {
      weirdSense: 10
    },
    onFailure: "Gain +2 Weirdness",
    onSuccess: "Reduce 1 Weirdness",
    flavor: "One sniff—and reality wilts.",
    imagePrompt: "A ghostly white orchid in full bloom dripping luminescent spores; thick outlines and a sickly neon-green mist"
  },
  {
    id: "strange-carvings",
    name: "Strange Carvings",
    type: "hazard",
    subType: "weird",
    icons: [
      { symbol: "💀", meaning: "Event" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Mystery", "Unease", "Occult"],
    rules: [
      "All players here make Weirdness Check DC 9 → Failure: Gain +1 Weirdness and Lose 1 Luck Token; Success: nothing"
    ],
    difficultyClasses: {
      weirdSense: 9
    },
    onFailure: "Gain +1 Weirdness and Lose 1 Luck Token",
    flavor: "Ancient symbols twist your mind's edges.",
    imagePrompt: "Moss-covered stone slab etched with glowing runes, half-submerged in marsh water"
  },
  {
    id: "swamp-witchs-curse",
    name: "Swamp Witch's Curse",
    type: "hazard",
    subType: "weird",
    icons: [
      { symbol: "🧙", meaning: "NPC" },
      { symbol: "🔮", meaning: "Weird" },
      { symbol: "🐊", meaning: "Swamp" }
    ],
    keywords: ["NPC", "Curse", "Magic"],
    rules: [
      "Charm Check DC 11 → Failure: Gain +2 Weirdness and Discard 1 Gear; Success: Gain 1 Treasure Card"
    ],
    difficultyClasses: {
      charm: 11
    },
    onFailure: "Gain +2 Weirdness and Discard 1 Gear",
    onSuccess: "Gain 1 Treasure Card",
    flavor: "She offers help—at a price your soul might pay.",
    imagePrompt: "A hunched, swamp-mire witch draped in moss and bones, crooked staff pointing; neon-purple eyes pierce the gloom"
  },
  {
    id: "radioactive-alligator",
    name: "Radioactive Alligator",
    type: "hazard",
    subType: "weird",
    icons: [
      { symbol: "☢️", meaning: "Event" },
      { symbol: "🐊", meaning: "Creature" },
      { symbol: "⚠️", meaning: "Toxic" }
    ],
    keywords: ["Mutation", "Creature", "Hazard"],
    rules: [
      "All here make Grit Check DC 11 → Failure: Take 2 Damage and Gain +1 Weirdness; Success: Take 1 Damage"
    ],
    difficultyClasses: {
      grit: 11
    },
    onFailure: "Take 2 Damage and Gain +1 Weirdness",
    onSuccess: "Take 1 Damage",
    flavor: "Nature's fury—glowing and hungry.",
    imagePrompt: "A massive gator with neon-green radioactive pustules, eyes glowing, tail whipping water"
  },
  {
    id: "meteor-shower",
    name: "Meteor Shower",
    type: "hazard",
    subType: "weird",
    icons: [
      { symbol: "☄️", meaning: "Event" },
      { symbol: "🔮", meaning: "Weird" },
      { symbol: "🌌", meaning: "Cosmic" }
    ],
    keywords: ["Cosmic", "Environmental", "Unpredictable"],
    rules: [
      "Everyone here makes Moxie Check DC 11 → Failure: Take 1 Damage, Lose 1 Action, and Gain +1 Heat; Success: Gain 1 Luck"
    ],
    difficultyClasses: {
      moxie: 11
    },
    onFailure: "Take 1 Damage, Lose 1 Action, and Gain +1 Heat",
    onSuccess: "Gain 1 Luck",
    flavor: "Fire from the sky—who saw that coming?",
    imagePrompt: "Flaming meteors streaking through a violet-tinged sky, crashing into swamp and highway"
  },
  {
    id: "reality-tear",
    name: "Reality Tear",
    type: "hazard",
    subType: "weird",
    icons: [
      { symbol: "🔮", meaning: "Weird" },
      { symbol: "💀", meaning: "Event" }
    ],
    keywords: ["Cosmic", "Distortion", "Mind-Bend"],
    rules: [
      "Weirdness Check DC 13 → Failure: Gain +3 Weirdness and Lose All Luck Tokens; Success: Discard 1 Event Card in play"
    ],
    difficultyClasses: {
      weirdSense: 13
    },
    onFailure: "Gain +3 Weirdness and Lose All Luck Tokens",
    onSuccess: "Discard 1 Event Card in play",
    flavor: "The veil shreds—what shouldn't be real now is.",
    imagePrompt: "A jagged rift in the sky, swirling neon-pink and green energies leaking through, bizarre shapes floating forth"
  },
  {
    id: "flomanjified-resurrection",
    name: "Flomanjified Resurrection",
    type: "hazard",
    subType: "weird",
    icons: [
      { symbol: "🦴", meaning: "Lair" },
      { symbol: "💀", meaning: "Event" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Lair", "Betrayal", "Endgame"],
    rules: [
      "If any player died this turn, at end of turn they instead become a Flomanjified Role (draw Flomanjified card) and join Chaos Phase",
      "Surviving players make Grit Check DC 11 → Failure: Lose 1 Action this turn, Gain +1 Heat"
    ],
    difficultyClasses: {
      grit: 11
    },
    onFailure: "Lose 1 Action this turn, Gain +1 Heat",
    bossHazard: true,
    flavor: "Death isn't the end—only a new beginning of horror.",
    imagePrompt: "A broken tombstone in murky water, skeletal hand reaching up, neon-purple mist swirling"
  }
];
