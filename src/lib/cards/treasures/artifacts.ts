
import { TreasureCard } from "@/types/cards/treasure";

// Cards that are mystical artifacts with special powers or effects
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
      "At the start of their next turn, they discard this card, return to the Starting Region with 1 Health, and gain 3 Weirdness."
    ],
    value: 3,
    consumable: true,
    passiveEffect: "",
    useEffect: "Return from elimination with 1 Health in the Starting Region, but gain 3 Weirdness",
    flavor: "Goblet: 'Drink deep... or don't. The effect is the same. Welcome back... mostly.'",
    imagePrompt: "A tarnished, perhaps slightly glowing chalice that vaguely resembles the main Flomanji Goblet centerpiece, possibly filled with murky liquid"
  },
  {
    id: "crystal-skull",
    name: "Crystal Skull",
    type: "artifact",
    icons: [
      { symbol: "💎", meaning: "Valuable" },
      { symbol: "💀", meaning: "Magic" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Ancient", "Magical", "Crystalline"],
    rules: [
      "When held: +1 to all Weird Sense checks",
      "When used: Reduce Weirdness by 2, but Heat +1",
      "Can be used once per round"
    ],
    value: 2,
    consumable: false,
    passiveEffect: "+1 to Weird Sense checks while in possession",
    useEffect: "Reduce Weirdness by 2, but increase Heat by 1",
    flavor: "Voices whisper from the translucent depths—some say from other worlds.",
    imagePrompt: "A perfectly carved crystal skull with mysterious inner facets that catch light unnaturally"
  },
  {
    id: "flomanji-amulet",
    name: "Flomanji Amulet",
    type: "artifact",
    icons: [
      { symbol: "🔮", meaning: "Magic" },
      { symbol: "🌿", meaning: "Nature" }
    ],
    keywords: ["Protective", "Ritual", "Ancient"],
    rules: [
      "When activated: Prevent next Weirdness gain",
      "If Heat ≥ 7: Also reduce Heat by 1 when used",
      "Can be used once per round"
    ],
    value: 2,
    consumable: false,
    passiveEffect: "Glow warns of nearby high-Weirdness hazards",
    useEffect: "Prevent the next Weirdness gain this round; if Heat ≥ 7, also reduce Heat by 1",
    flavor: "Jungle vines form an ancient sigil that pulses with soft green light.",
    imagePrompt: "A wooden amulet with intricate vine carvings that glow with soft emerald light"
  },
  {
    id: "sentient-severed-mermaid-hand",
    name: "Sentient Severed Mermaid Hand",
    type: "artifact",
    icons: [
      { symbol: "✋", meaning: "Hand" },
      { symbol: "💧", meaning: "Water" },
      { symbol: "🌀", meaning: "Weirdness" }
    ],
    keywords: ["Guidance", "Weirdness Gain", "Cursed?"],
    rules: [
      "While equipped (takes 1 Gear slot): Once per game, spend 1 Action to ask the Hand for guidance.",
      "The Goblet whispers a cryptic clue pointing towards the Mission Objective or the nearest Treasure/Artifact.",
      "Gain 1 Weirdness each time you use this ability."
    ],
    value: 2,
    consumable: false,
    passiveEffect: "",
    useEffect: "Receive a cryptic clue about the Mission Objective or nearest Treasure/Artifact, but gain 1 Weirdness",
    flavor: "Goblet: 'It points... sometimes helpfully, sometimes towards more trouble.'",
    imagePrompt: "A realistic but unsettling severed hand with scales and webbed fingers, perhaps twitching slightly or pointing"
  },
  {
    id: "everglades-triangle-compass",
    name: "The Everglades Triangle Compass",
    type: "artifact",
    icons: [
      { symbol: "🗺️", meaning: "Map" },
      { symbol: "❓", meaning: "Mystery" },
      { symbol: "⚡", meaning: "Glitch" }
    ],
    keywords: ["Risky Travel", "Teleportation", "Unreliable"],
    rules: [
      "Once per game, spend 1 Action to use the compass. Declare \"Spinning the Needle!\"",
      "The Goblet announces a random unexplored Region card on the map.",
      "Immediately move your character to that Region, flipping it face-up."
    ],
    value: 2,
    consumable: true,
    passiveEffect: "",
    useEffect: "Teleport to a random unexplored Region on the map",
    flavor: "Goblet: 'Points north? South? Sometimes... sideways through reality.'",
    imagePrompt: "A strange, triangular compass whose needle spins erratically or points to bizarre symbols instead of directions"
  },
  {
    id: "conch-of-calling",
    name: "The Conch of Calling",
    type: "artifact",
    icons: [
      { symbol: "🐚", meaning: "Shell" },
      { symbol: "🔊", meaning: "Sound" },
      { symbol: "🏖️", meaning: "Coastal" }
    ],
    keywords: ["Summoning", "Risk/Reward", "Coastal Lore"],
    rules: [
      "Once per game, spend 1 Action to blow the Conch. The Goblet plays a deep horn sound and prompts: \"The sound echoes... Who answers?\" Shake Luck (DC 4).",
      "Success = Draw 1 helpful NPC card. Failure = Draw 1 dangerous Hazard card (Animal or Environmental)."
    ],
    value: 2,
    consumable: true,
    passiveEffect: "",
    useEffect: "Summon either help or trouble depending on a Luck check",
    flavor: "Goblet: 'Summons something from the deep... hope it's friendly.'",
    imagePrompt: "A large, beautiful conch shell, perhaps with strange carvings or a faint glow."
  },
  {
    id: "mothman-discarded-contact-lens",
    name: "Mothman's Discarded Contact Lens",
    type: "artifact",
    icons: [
      { symbol: "👁️", meaning: "Vision" },
      { symbol: "🦋", meaning: "Bug" },
      { symbol: "❓", meaning: "Mystery" }
    ],
    keywords: ["Enhanced Perception", "Weirdness Gain", "Fragile"],
    rules: [
      "While equipped (takes 1 Gear slot): You can look at the top card of any deck (Hazard, Gear, Chaos, etc.) once per turn as a free action.",
      "Each time you use this, gain 1 Weirdness.",
      "If you take 2 or more Damage from a single source, discard this Artifact (Goblet: \"It cracked!\")."
    ],
    value: 2,
    consumable: false,
    passiveEffect: "",
    useEffect: "Look at the top card of any deck as a free action, but gain 1 Weirdness",
    flavor: "Goblet: 'Sees things man was not meant to see... like the expiration date on that gas station taquito.'",
    imagePrompt: "An oversized, slightly iridescent contact lens resting on a leaf, seeming to reflect more than just the surrounding light"
  },
  {
    id: "cursed-tiki-mug",
    name: "The Cursed Tiki Mug",
    type: "artifact",
    icons: [
      { symbol: "🥤", meaning: "Cup" },
      { symbol: "⚰️", meaning: "Curse" },
      { symbol: "🌀", meaning: "Weirdness" }
    ],
    keywords: ["Buff", "Curse", "Weirdness Gain"],
    rules: [
      "While equipped (takes 1 Gear slot): Gain +1 to a Stat of your choice (declare at start of turn, lasts until your next turn).",
      "However, at the end of your turn, gain 1 Weirdness.",
      "Cannot be unequipped voluntarily."
    ],
    value: 2,
    consumable: false,
    passiveEffect: "+1 to a chosen Stat, changed at the start of each turn",
    useEffect: "Gain 1 Weirdness at the end of each turn while equipped",
    flavor: "Goblet: 'Grants power... demands sanity. Fair trade?'",
    imagePrompt: "A kitschy but menacing-looking Tiki mug with glowing red eyes"
  },
  {
    id: "swamp-apes-lucky-loincloth",
    name: "Swamp Ape's Lucky Loincloth",
    type: "artifact",
    icons: [
      { symbol: "👔", meaning: "Fashion" },
      { symbol: "🐒", meaning: "Animal" },
      { symbol: "🍀", meaning: "Luck" }
    ],
    keywords: ["Luck Buff", "Social Penalty", "Cursed?"],
    rules: [
      "While equipped (takes 1 Gear slot): Gain +2 Luck on all relevant Stat Checks.",
      "Suffer -2 Charm on all relevant Stat Checks.",
      "Cannot be unequipped voluntarily. The Goblet makes disgusted noises occasionally."
    ],
    value: 2,
    consumable: false,
    passiveEffect: "+2 Luck, -2 Charm on all relevant Stat Checks",
    useEffect: "",
    flavor: "Goblet: 'Smells like victory... and wet fur. Mostly wet fur.'",
    imagePrompt: "A ragged piece of hide fashioned into a crude garment, looking surprisingly durable but unpleasant"
  },
  {
    id: "ring-of-the-snowbird-king",
    name: "Ring of the Snowbird King",
    type: "artifact",
    icons: [
      { symbol: "💍", meaning: "Jewelry" },
      { symbol: "👑", meaning: "Authority" },
      { symbol: "👥", meaning: "Social" }
    ],
    keywords: ["NPC Control (Situational)", "Charm Buff", "Cursed?"],
    rules: [
      "While equipped (takes 1 Gear slot): Once per game, target one 'Retiree' or 'Snowbird' NPC.",
      "Declare \"By the power of shuffleboard, I command you!\" Shake Charm (DC 5).",
      "Success = Control the NPC for one action (e.g., make them give you Gear, mislead another player).",
      "Failure = The NPC rallies others against you; gain -1 Charm permanently."
    ],
    value: 3,
    consumable: false,
    passiveEffect: "",
    useEffect: "Attempt to control a 'Retiree' or 'Snowbird' NPC for one action (Charm DC 5)",
    flavor: "Goblet: 'Smells faintly of Ben-Gay and early bird specials.'",
    imagePrompt: "A large, gaudy gold ring with a shuffleboard court design instead of a gemstone"
  },
  {
    id: "flomanji-goblet-forgotten-cousin",
    name: "The Flomanji Goblet's Forgotten Cousin (Travel Mug)",
    type: "artifact",
    icons: [
      { symbol: "🏆", meaning: "Goblet" },
      { symbol: "✈️", meaning: "Travel" },
      { symbol: "❓", meaning: "Mystery" }
    ],
    keywords: ["Goblet Interaction", "Minor Buff", "Weirdness Gain"],
    rules: [
      "While equipped (takes 1 Gear slot): Once per game, spend 1 Action to \"Consult the Cousin.\"",
      "Hold this card near the main Flomanji Goblet.",
      "The main Goblet will offer a choice of two minor boons (e.g., Heal 1 Damage, +1 on next check, reveal adjacent region).",
      "Gain 1 Weirdness after receiving the boon."
    ],
    value: 2,
    consumable: false,
    passiveEffect: "",
    useEffect: "Consult with the Goblet for a choice of minor boons",
    flavor: "Goblet: 'Oh... him. Less powerful, arguably more annoying. Fine, ask your question.'",
    imagePrompt: "A slightly smaller, travel-mug version of the main Flomanji Goblet, perhaps made of stainless steel with similar weird carvings, looking slightly less impressive"
  }
];
