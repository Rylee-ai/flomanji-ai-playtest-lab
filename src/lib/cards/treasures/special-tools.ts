
import { TreasureCard } from "@/types/cards/treasure";

// Cards that function as unique tools or gadgets
export const specialTools: TreasureCard[] = [
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
    id: "florida-woman-purse",
    name: "Florida Woman's Bottomless Purse",
    type: "treasure",
    icons: [
      { symbol: "🎒", meaning: "Inventory" },
      { symbol: "🌀", meaning: "Chaos" },
      { symbol: "👥", meaning: "Social" }
    ],
    keywords: ["Storage", "Random Item Generation", "Unpredictable"],
    rules: [
      "While equipped (takes 1 Gear slot): Your hand size limit is increased by 2.",
      "Once per game, spend 1 Action to \"Rummage.\" Shake the Goblet for Luck (DC 4). Success = Draw 1 random Gear card. Failure = Draw 1 random Hazard card (Goblet: \"Found trouble instead!\")."
    ],
    value: 2,
    consumable: false,
    passiveEffect: "Hand size increased by 2",
    useEffect: "Draw 1 random Gear card on success, or 1 random Hazard card on failure (Luck DC 4)",
    flavor: "Goblet: 'Contains everything... lip balm, expired coupons, existential dread, maybe a small gator.'",
    imagePrompt: "A large, garishly patterned purse overflowing with an impossible amount of random objects"
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
    id: "self-driving-golf-cart-keys",
    name: "Self-Driving Golf Cart Keys (Beta Test)",
    type: "treasure",
    icons: [
      { symbol: "🚗", meaning: "Vehicle" },
      { symbol: "🔌", meaning: "Tech" },
      { symbol: "⚡", meaning: "Glitch" }
    ],
    keywords: ["Enhanced Movement", "Unreliable", "Risk/Reward"],
    rules: [
      "Once per game, spend 1 Action to activate. Declare \"Engage Auto-Drive!\" Move 2 Regions towards the Mission Objective (Goblet determines path).",
      "After the move, shake Luck (DC 4). Failure = The cart glitches; end movement in a random adjacent Hazard or gain 1 Weirdness."
    ],
    value: 2,
    consumable: true,
    passiveEffect: "",
    useEffect: "Move 2 regions toward objective with risk of glitching",
    flavor: "Goblet: 'It knows where you want to go... probably. Steering algorithm still learning.'",
    imagePrompt: "A futuristic-looking key fob with a golf cart icon and a small, flickering screen."
  }
];
