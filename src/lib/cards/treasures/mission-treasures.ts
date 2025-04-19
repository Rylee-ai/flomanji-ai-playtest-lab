
import { TreasureCard } from "@/types/cards";

export const MISSION_TREASURES: TreasureCard[] = [
  {
    id: "meth-gator-clue-map-fragment",
    name: "Meth Gator Clue – Map Fragment",
    type: "treasure",
    icons: [
      { symbol: "ℹ️", meaning: "Info" },
      { symbol: "🕵️", meaning: "Clue" },
      { symbol: "🎯", meaning: "Mission" }
    ],
    keywords: ["Information", "Clue (Meth Gator)", "Swamp"],
    rules: [
      "Mission 3 specific — Counts as 1 Clue.",
      "Use (1 Action): Discard to auto‑succeed one navigate/avoid \"Lost\" check in a Swamp Region."
    ],
    flavor: "\"X\" marks the spot… or where someone dissolved.",
    imagePrompt: "Torn piece of hand‑drawn map showing swampy terrain with ominous symbols and claw prints"
  },
  {
    id: "meth-gator-clue-strange-residue",
    name: "Meth Gator Clue – Strange Residue",
    type: "treasure",
    icons: [
      { symbol: "ℹ️", meaning: "Info" },
      { symbol: "🕵️", meaning: "Clue" },
      { symbol: "🎯", meaning: "Mission" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Information", "Clue (Meth Gator)", "Weirdness"],
    rules: [
      "Mission 3 specific — Counts as 1 Clue.",
      "Acquire: Gain +1 Weirdness."
    ],
    flavor: "Smells like bad chemicals and angry swamp.",
    imagePrompt: "Small glass vial of viscous green‑iridescent goo, bubbling faintly"
  },
  {
    id: "meth-gator-clue-witness-sketch",
    name: "Meth Gator Clue – Witness Sketch",
    type: "treasure",
    icons: [
      { symbol: "ℹ️", meaning: "Info" },
      { symbol: "🕵️", meaning: "Clue" },
      { symbol: "🎯", meaning: "Mission" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Information", "Clue (Meth Gator)", "Social"],
    rules: [
      "Mission 3 specific — Counts as 1 Clue.",
      "Use (0 Actions): Discard when Interacting with a Swamp Denizen/Cryptozoologist/Historian NPC → Gain +2 Bonus on that Charm or Moxie check."
    ],
    flavor: "\"Too many eyes… or maybe not enough?\"",
    imagePrompt: "Crumpled pencil sketch of an alligator distorted with extra teeth and odd eyes"
  },
  {
    id: "legendary-subsub-order",
    name: "Legendary SubSub Order",
    type: "treasure",
    icons: [
      { symbol: "🎯", meaning: "Mission" },
      { symbol: "🍲", meaning: "Food" },
      { symbol: "🌟", meaning: "Unique" }
    ],
    keywords: ["Mission Item", "Food", "Unique"],
    rules: [
      "Mission 6 specific — Acquire only at the Sublix Bonus Zone.",
      "Passive: While carrying, Gain +1 Heat during each Chaos Phase.",
      "Interact (1 Action) at Safe House: Deliver to auto‑win Mission 6; if you lose it, the Mission fails."
    ],
    flavor: "Chicken Tender SubSub… the order is long, specific, vital.",
    imagePrompt: "Revered crumpled receipt from \"Sublix\" with exact sandwich instructions stamped in neon‑pastel ink"
  },
  {
    id: "meth-gator-tooth",
    name: "Meth Gator Tooth",
    type: "treasure",
    icons: [
      { symbol: "🌀", meaning: "Oddity" },
      { symbol: "🔮", meaning: "Weird" },
      { symbol: "🎯", meaning: "Mission" }
    ],
    keywords: ["Unique", "Weirdness", "Grit", "Mission (Meth Gator)"],
    rules: [
      "Acquire: After defeating the Meth Gator boss. Gain +1 Weirdness.",
      "Passive: Gain +1 Grit.",
      "Chaos Phase: Weirdness Check DC 9 → Failure: Gain +1 Weirdness.",
      "Mission: Counts as proof for Mission 3 objectives.",
      "Elimination: Return to box."
    ],
    flavor: "Souvenir. Probably gives you cavities holding it.",
    imagePrompt: "Enormous, jagged alligator tooth stained neon‑green, pulsing with chemical residue"
  },
  {
    id: "hurricane-survival-guide",
    name: "Hurricane Survival Guide (Waterlogged)",
    type: "treasure",
    icons: [
      { symbol: "ℹ️", meaning: "Info" },
      { symbol: "🛍️", meaning: "Supply" },
      { symbol: "🎯", meaning: "Mission" }
    ],
    keywords: ["Information", "Mission (Hurricane)", "Supply"],
    rules: [
      "Mission 2 specific — Choose one:",
      "Discard (0 Actions) during a Hurricane Hazard check → Gain +2 Bonus on that Grit check.",
      "Discard (0 Actions) during Fortify action → Counts as 1 Supply Gear."
    ],
    flavor: "Tip #1: Evacuate. Well, that ship sailed.",
    imagePrompt: "Soggy, water‑stained government pamphlet reading \"Hurricane Survival\" on the cover"
  }
];
