
import { TreasureCard } from "@/types/cards/treasure";

// Cards that are consumable items with powerful one-time effects
export const consumables: TreasureCard[] = [
  {
    id: "fountain-of-youth-jug",
    name: "Fountain of Youth Runoff Jug",
    type: "artifact",
    icons: [
      { symbol: "💧", meaning: "Water" },
      { symbol: "❤️", meaning: "Health" },
      { symbol: "⏳", meaning: "Age" }
    ],
    keywords: ["Healing", "Rejuvenation", "Risk/Reward", "Consumable"],
    rules: [
      "Discard this card. Declare \"Drinking the good stuff!\" Heal all Damage and remove all negative Status tokens.",
      "Then, shake the Goblet for a Luck check (DC 5). Failure = Gain 2 Weirdness (Goblet: \"Side effects may include... existential confusion.\")."
    ],
    value: 3,
    consumable: true,
    passiveEffect: "",
    useEffect: "Heal all Damage and remove negative Status tokens, with a risk of Weirdness gain",
    flavor: "Goblet: 'Tastes like immortality... and sulfur. Mostly sulfur.'",
    imagePrompt: "A simple plastic gallon jug filled with faintly glowing water, labeled \"Ponce's Drain Water - Do Not Drink?\" in faded marker."
  },
  {
    id: "chemtrail-collector-jar",
    name: "Chemtrail Collector Jar",
    type: "treasure",
    icons: [
      { symbol: "💨", meaning: "Gas" },
      { symbol: "❓", meaning: "Mystery" },
      { symbol: "🌀", meaning: "Weirdness" }
    ],
    keywords: ["Debuff Immunity (Situational)", "Weirdness Gain"],
    rules: [
      "While holding this: Once per game, ignore the effects of one Hazard involving 'Gas', 'Fog', or 'Airborne Toxins'. Gain 1 Weirdness after use."
    ],
    value: 1,
    consumable: true,
    passiveEffect: "",
    useEffect: "Negate one gas/fog/airborne hazard at the cost of 1 Weirdness",
    flavor: "Goblet: 'Capturing the truth... one particle at a time.'",
    imagePrompt: "A mason jar seemingly filled with faint, shimmering haze, sealed tightly, with conspiracy symbols drawn on the lid."
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
  },
  {
    id: "mermaid-tears",
    name: "Mermaid's Tears",
    type: "artifact",
    icons: [
      { symbol: "🧜‍♀️", meaning: "Mythical" },
      { symbol: "💧", meaning: "Water" },
      { symbol: "❤️", meaning: "Healing" }
    ],
    keywords: ["Magical", "Water", "Healing"],
    rules: [
      "When used: Remove 2 Weirdness from any character",
      "When used in coastal region: Also heal 2 damage",
      "Consumable: Discard after use"
    ],
    value: 2,
    consumable: true,
    useEffect: "Remove 2 Weirdness from any character; if used in a coastal region, also heal 2 damage",
    flavor: "Crystallized emotion from the depths—impossible, yet here they are.",
    imagePrompt: "A small vial of iridescent blue-green tears that seem to contain miniature ocean waves"
  },
  {
    id: "jungle-remedy",
    name: "Jungle Remedy",
    type: "treasure",
    icons: [
      { symbol: "🌿", meaning: "Herbal" },
      { symbol: "💊", meaning: "Medicinal" }
    ],
    keywords: ["Healing", "Natural", "Medicinal"],
    rules: [
      "When used: Heal 3 damage",
      "Side effect: Roll d10 - if ≤3, gain 1 Weirdness",
      "Consumable: Discard after use"
    ],
    value: 1,
    consumable: true,
    useEffect: "Heal 3 damage, but roll d10 - on 1-3, gain 1 Weirdness",
    flavor: "Bitter herbs, toxic frogs, secret ingredients—pain fades but at what cost?",
    imagePrompt: "A small pouch of vibrant colored powders and crushed leaves with a strange pulsing glow"
  }
];
