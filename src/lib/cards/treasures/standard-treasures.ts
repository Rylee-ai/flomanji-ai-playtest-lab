
import { TreasureCard } from "@/types/cards";

export const STANDARD_TREASURES: TreasureCard[] = [
  {
    id: "spanish-doubloons",
    name: "Bag of Spanish Doubloons",
    type: "treasure",
    icons: [
      { symbol: "🪙", meaning: "Value" },
      { symbol: "🤝", meaning: "Trade" }
    ],
    keywords: ["Valuable", "Coastal", "Trade"],
    rules: [
      "Discard (0 Actions) before a bribe or trade Charm check → Gain +3 Bonus",
      "Discard (1 Action) → Reduce Heat by 2"
    ],
    flavor: "Shiny gold. Still spends... sort of.",
    imagePrompt: "Photorealistic close-up of a rough burlap sack overflowing with tarnished gold doubloons",
    value: 3
  },
  {
    id: "lost-tourist-wallet",
    name: "Lost Tourist's Wallet",
    type: "treasure",
    icons: [
      { symbol: "🪙", meaning: "Value" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Valuable (Situational)", "Social", "Gear Source"],
    rules: [
      "Discard (1 Action) → Draw 2 Gear cards and Gain 1 Heat.",
      "Discard (0 Actions) during an Interact with Police/Security/Ranger NPC → Gain +2 Bonus on that Charm check."
    ],
    flavor: "Finders keepers? Or good karma?",
    imagePrompt: "Worn leather wallet lying open on pavement or sand, old vacation photo and expired coupons spilling out"
  },
  {
    id: "bag-of-holding",
    name: "Bag of Holding (Flomanji Edition)",
    type: "treasure",
    icons: [
      { symbol: "⚙️", meaning: "Gear" },
      { symbol: "🌀", meaning: "Oddity" }
    ],
    keywords: ["Utility", "Gear Source"],
    rules: [
      "Discard (1 Action): Draw 3 Gear cards; keep one, discard the others."
    ],
    flavor: "Bigger on the inside. Rattles suspiciously.",
    imagePrompt: "Simple burlap sack—impossibly deep and bulging—with strange green glow spilling from its opening"
  },
  {
    id: "old-flomanji-postcard",
    name: "Old Flomanji Postcard",
    type: "treasure",
    icons: [
      { symbol: "ℹ️", meaning: "Info" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Information", "Weirdness", "Unique"],
    rules: [
      "Acquire: Gain +1 Weirdness.",
      "Use (0 Actions): Moxie Check DC 9 → On success: Gain a hint about a nearby Bonus Zone or hidden path; on failure: no effect."
    ],
    flavor: "\"Wish you were here!\" …Do you, though?",
    imagePrompt: "Faded postcard of a kitschy roadside attraction (giant orange or gator wrestling), cryptic message scribbled on back"
  },
  {
    id: "working-payphone",
    name: "Working Payphone?",
    type: "treasure",
    icons: [
      { symbol: "☎️", meaning: "Comm" },
      { symbol: "🔮", meaning: "Weird" },
      { symbol: "🍀", meaning: "Luck" }
    ],
    keywords: ["Communication", "Weirdness", "Luck", "Unique"],
    rules: [
      "Use (1 Action): Discard → Luck Check DC 10 → On success: choose to Reduce Heat by 2 or Draw 2 Gear cards; on failure: choose to Gain 2 Weirdness or Trigger the \"Sudden Street Closure\" Hazard."
    ],
    flavor: "Do you even remember how to use one? Got change?",
    imagePrompt: "Vandalized phone booth with dangling receiver and glowing payphone light; overgrown weeds around base"
  }
];
