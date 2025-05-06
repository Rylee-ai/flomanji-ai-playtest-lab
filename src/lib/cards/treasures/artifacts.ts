
import { TreasureCard } from "@/types/cards/treasure";

// Cards that are powerful, mystical artifacts with special properties
export const artifacts: TreasureCard[] = [
  {
    id: "goblet-of-questionable-rehydration",
    name: "The Goblet of Questionable Rehydration",
    type: "artifact",
    icons: [
      { symbol: "🏆", meaning: "Goblet" },
      { symbol: "❤️", meaning: "Health" },
      { symbol: "❓", meaning: "Mystery" }
    ],
    keywords: ["Revival", "Cursed?", "Unique"],
    rules: [
      "This card is not drawn normally. It is gained only when a player is Eliminated (reaches 0 Health) for the first time.",
      "The Goblet announces: \"Not yet... Flomanji offers a drink...\" The player gains this card.",
      "At the start of their next turn, they discard this card, return to the Starting Region with 1 Health, and gain 3 Weirdness. (This replaces the standard 'Goblet's Mercy' rule if desired, making it card-based)."
    ],
    value: 5,
    consumable: true,
    passiveEffect: "",
    useEffect: "Resurrect with 1 Health at the Starting Region when eliminated (at the cost of 3 Weirdness)",
    flavor: "Goblet: 'Drink deep... or don't. The effect is the same. Welcome back... mostly.'",
    imagePrompt: "A tarnished, perhaps slightly glowing chalice that vaguely resembles the main Flomanji Goblet centerpiece, possibly filled with murky liquid."
  },
  {
    id: "everglades-triangle-compass",
    name: "The Everglades Triangle Compass",
    type: "artifact",
    icons: [
      { symbol: "🧭", meaning: "Map" },
      { symbol: "❓", meaning: "Mystery" },
      { symbol: "⚡", meaning: "Glitch" }
    ],
    keywords: ["Risky Travel", "Teleportation", "Unreliable"],
    rules: [
      "Once per game, spend 1 Action to use the compass. Declare \"Spinning the Needle!\" The Goblet announces a random unexplored Region card on the map. Immediately move your character to that Region, flipping it face-up."
    ],
    value: 3,
    consumable: false,
    passiveEffect: "",
    useEffect: "Instantly teleport to a random unexplored Region",
    flavor: "Goblet: 'Points north? South? Sometimes... sideways through reality.'",
    imagePrompt: "A strange, triangular compass whose needle spins erratically or points to bizarre symbols instead of directions."
  },
  {
    id: "cursed-tiki-mug",
    name: "The Cursed Tiki Mug",
    type: "artifact",
    icons: [
      { symbol: "🍹", meaning: "Cup" },
      { symbol: "👻", meaning: "Curse" },
      { symbol: "🌀", meaning: "Weirdness" }
    ],
    keywords: ["Buff", "Curse", "Weirdness Gain"],
    rules: [
      "While equipped (takes 1 Gear slot): Gain +1 to a Stat of your choice (declare at start of turn, lasts until your next turn).",
      "However, at the end of your turn, gain 1 Weirdness. Cannot be unequipped voluntarily."
    ],
    value: 3,
    consumable: false,
    passiveEffect: "+1 to a stat of your choice, changes each turn",
    useEffect: "",
    flavor: "Goblet: 'Grants power... demands sanity. Fair trade?'",
    imagePrompt: "A kitschy but menacing-looking Tiki mug with glowing red eyes."
  },
  {
    id: "sentient-mermaid-hand",
    name: "Sentient Severed Mermaid Hand",
    type: "artifact",
    icons: [
      { symbol: "✋", meaning: "Hand" },
      { symbol: "💧", meaning: "Water" },
      { symbol: "🌀", meaning: "Weirdness" }
    ],
    keywords: ["Guidance", "Weirdness Gain", "Cursed?"],
    rules: [
      "While equipped (takes 1 Gear slot): Once per game, spend 1 Action to ask the Hand for guidance. The Goblet whispers a cryptic clue pointing towards the Mission Objective or the nearest Treasure/Artifact. Gain 1 Weirdness each time you use this ability."
    ],
    value: 3,
    consumable: false,
    passiveEffect: "",
    useEffect: "Receive a cryptic clue about objectives or treasures (costs 1 Weirdness)",
    flavor: "Goblet: 'It points... sometimes helpfully, sometimes towards more trouble.'",
    imagePrompt: "A realistic but unsettling severed hand with scales and webbed fingers, perhaps twitching slightly or pointing."
  },
  {
    id: "mothman-contact-lens",
    name: "Mothman's Discarded Contact Lens",
    type: "artifact",
    icons: [
      { symbol: "👁️", meaning: "Vision" },
      { symbol: "🐛", meaning: "Bug" },
      { symbol: "❓", meaning: "Mystery" }
    ],
    keywords: ["Enhanced Perception", "Weirdness Gain", "Fragile"],
    rules: [
      "While equipped (takes 1 Gear slot, maybe head?): You can look at the top card of any deck (Hazard, Gear, Chaos, etc.) once per turn as a free action.",
      "Each time you use this, gain 1 Weirdness. If you take 2 or more Damage from a single source, discard this Artifact (Goblet: \"It cracked!\")."
    ],
    value: 3,
    consumable: false,
    passiveEffect: "Look at the top card of any deck once per turn",
    useEffect: "",
    flavor: "Goblet: 'Sees things man was not meant to see... like the expiration date on that gas station taquito.'",
    imagePrompt: "An oversized, slightly iridescent contact lens resting on a leaf, seeming to reflect more than just the surrounding light."
  }
]
