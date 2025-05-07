
import { TreasureCard } from "@/types/cards/treasure";

// Cards that are primarily valuable items
export const valuableItems: TreasureCard[] = [
  {
    id: "golden-idol",
    name: "Golden Idol",
    type: "treasure",
    icons: [
      { symbol: "💰", meaning: "Valuable" },
      { symbol: "🏺", meaning: "Artifact" }
    ],
    keywords: ["Ancient", "Valuable", "Ritual"],
    rules: [
      "When used: Gain 2 Luck, and no Weirdness for rest of round",
      "Always worth 3 points at end of game"
    ],
    value: 3,
    consumable: false,
    passiveEffect: "Presence gives +1 to Charm checks when dealing with natives",
    useEffect: "Gain 2 Luck and immunity to Weirdness for the current round",
    flavor: "The natives worship it—the right buyer would kill for it.",
    imagePrompt: "A gleaming golden idol with jeweled eyes, depicting a jaguar-headed deity"
  },
  {
    id: "bag-of-spanish-doubloons",
    name: "Bag of Spanish Doubloons",
    type: "treasure",
    icons: [
      { symbol: "🪙", meaning: "Coin" },
      { symbol: "💰", meaning: "Value" },
      { symbol: "🏛️", meaning: "History" }
    ],
    keywords: ["Valuable", "Coastal", "Trade Aid", "Consumable Option"],
    rules: [
      "While holding this, you may choose one effect ONCE per game:",
      "A) Bribe: Before making a Charm check to bribe or trade with an NPC, discard this card. The Goblet announces: \"A flash of gold! They're distracted...\" Gain +3 Charm for that check.",
      "B) Buy Comfort: Spend 1 Action and discard this card. Declare \"Spending the loot!\" The Goblet confirms: \"Temporary relief purchased! Reduce global Heat by 2.\""
    ],
    value: 2,
    consumable: true,
    useEffect: "Either gain +3 Charm for one bribe/trade check OR reduce global Heat by 2",
    flavor: "Goblet: 'Shiny history... still spends, if you find the right sucker.'",
    imagePrompt: "Photorealistic close-up of a small, rough burlap sack overflowing with tarnished gold doubloons, some spilling onto sand or weathered wood. Focus on the tangible wealth. Dramatic lighting."
  },
  {
    id: "keys-to-governors-mansion",
    name: "Keys to the Governor's Mansion (Maybe)",
    type: "treasure",
    icons: [
      { symbol: "🔑", meaning: "Key" },
      { symbol: "👑", meaning: "Authority" },
      { symbol: "🏙️", meaning: "Urban" }
    ],
    keywords: ["Access", "Bluff Tool", "Risk/Reward"],
    rules: [
      "Once per game, when attempting to enter a restricted Urban region or bypass an 'Authority' NPC, discard this card and declare \"Official Business!\"",
      "Shake Charm (DC 5). Success = Gain access / Bypass the NPC. Failure = Trigger a \"Bureaucracy\" Hazard immediately."
    ],
    value: 2,
    consumable: true,
    useEffect: "Gain access to restricted areas or bypass Authority NPCs on success (Charm DC 5)",
    flavor: "Goblet: 'Might open the front door... might just be for his golf cart.'",
    imagePrompt: "A large, ornate, slightly rusty key on a keychain featuring the state seal"
  },
  {
    id: "map-to-nearest-ice-machine",
    name: "Map to the Nearest Functioning Ice Machine",
    type: "treasure",
    icons: [
      { symbol: "🗺️", meaning: "Map" },
      { symbol: "❄️", meaning: "Cooling" },
      { symbol: "🏙️", meaning: "Urban" }
    ],
    keywords: ["Heat Reduction", "Quest Item", "Valuable"],
    rules: [
      "Reveals the location of a special \"Ice Machine\" Bonus Zone (place token on a specific Urban/Highway Region).",
      "If you reach that zone and spend 1 Action, discard this card to reduce the global Heat track by 3."
    ],
    value: 2,
    consumable: true,
    useEffect: "Reduce global Heat by 3 when used at the specified location",
    flavor: "Goblet: 'More valuable than gold in the Flomanji heat.'",
    imagePrompt: "A hand-drawn map on a napkin, leading through familiar landmarks to a circled \"ICE!\" spot"
  },
  {
    id: "last-roll-toilet-paper",
    name: "The Last Roll of Toilet Paper (2-Ply)",
    type: "treasure",
    icons: [
      { symbol: "🧻", meaning: "Comfort" },
      { symbol: "💰", meaning: "Value" },
      { symbol: "🏕️", meaning: "Survival" }
    ],
    keywords: ["Ultimate Barter Item", "Morale Boost", "Highly Valuable"],
    rules: [
      "Can be discarded during any NPC interaction to automatically succeed on any single Charm or Barter check, regardless of DC.",
      "Alternatively, discard at any time to allow every player in your region (including yourself) to Heal 1 Damage (Goblet: \"A moment of pure comfort.\")."
    ],
    value: 3,
    consumable: true,
    useEffect: "Either auto-succeed on any Charm/Barter check OR heal 1 Damage for all players in your region",
    flavor: "Goblet: 'More precious than diamonds in the apocalypse.'",
    imagePrompt: "A single, pristine roll of toilet paper, perhaps glowing softly, presented almost like a holy relic"
  }
];
