
import { TreasureCard } from "@/types/cards/treasure";

// Cards primarily related to valuable items that aren't specifically artifacts
export const valuableItems: TreasureCard[] = [
  {
    id: "bag-of-spanish-doubloons",
    name: "Bag of Spanish Doubloons",
    type: "treasure",
    icons: [
      { symbol: "💰", meaning: "Coin" },
      { symbol: "💎", meaning: "Value" },
      { symbol: "🏛️", meaning: "History" }
    ],
    keywords: ["Valuable", "Coastal", "Trade Aid", "Consumable Option"],
    rules: [
      "While holding this, you may choose one effect ONCE per game:",
      "A) Bribe: Before making a Charm check to bribe or trade with an NPC, discard this card. The Goblet announces: \"A flash of gold! They're distracted...\" Gain +3 Charm for that check.",
      "B) Buy Comfort: Spend 1 Action and discard this card. Declare \"Spending the loot!\" The Goblet confirms: \"Temporary relief purchased! Reduce global Heat by 2.\""
    ],
    value: 3,
    consumable: true,
    passiveEffect: "",
    useEffect: "Choose one: +3 Charm for a bribe/trade check OR Reduce global Heat by 2",
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
      "Once per game, when attempting to enter a restricted Urban region or bypass an 'Authority' NPC, discard this card and declare \"Official Business!\" Shake Charm (DC 5). Success = Gain access / Bypass the NPC. Failure = Trigger a \"Bureaucracy\" Hazard immediately."
    ],
    value: 2,
    consumable: true,
    passiveEffect: "",
    useEffect: "Attempt to gain access to restricted areas or bypass authority figures (Charm DC 5)",
    flavor: "Goblet: 'Might open the front door... might just be for his golf cart.'",
    imagePrompt: "A large, ornate, slightly rusty key on a keychain featuring the state seal."
  },
  {
    id: "toilet-paper-roll",
    name: "The Last Roll of Toilet Paper (2-PLY)",
    type: "treasure",
    icons: [
      { symbol: "🧻", meaning: "Comfort" },
      { symbol: "💎", meaning: "Value" },
      { symbol: "🏕️", meaning: "Survival" }
    ],
    keywords: ["Ultimate Barter Item", "Morale Boost", "Highly Valuable"],
    rules: [
      "Can be discarded during any NPC interaction to automatically succeed on any single Charm or Barter check, regardless of DC.",
      "Alternatively, discard at any time to allow every player in your region (including yourself) to Heal 1 Damage (Goblet: \"A moment of pure comfort.\")."
    ],
    value: 4,
    consumable: true,
    passiveEffect: "",
    useEffect: "Auto-succeed on a Charm/Barter check OR Heal 1 Damage for all players in your region",
    flavor: "Goblet: 'More precious than diamonds in the apocalypse.'",
    imagePrompt: "A single, pristine roll of toilet paper, perhaps glowing softly, presented almost like a holy relic."
  },
  {
    id: "ice-machine-map",
    name: "Map to the Nearest Functioning Ice Machine",
    type: "treasure",
    icons: [
      { symbol: "🗺️", meaning: "Map" },
      { symbol: "❄️", meaning: "Cooling" },
      { symbol: "🏙️", meaning: "Urban" }
    ],
    keywords: ["Heat Reduction", "Quest Item", "Valuable"],
    rules: [
      "Reveals the location of a special \"Ice Machine\" Bonus Zone (place token on a specific Urban/Highway Region). If you reach that zone and spend 1 Action, discard this card to reduce the global Heat track by 3."
    ],
    value: 2,
    consumable: true,
    passiveEffect: "",
    useEffect: "Locate and activate an Ice Machine to reduce global Heat by 3",
    flavor: "Goblet: 'More valuable than gold in the Flomanji heat.'",
    imagePrompt: "A hand-drawn map on a napkin, leading through familiar landmarks to a circled \"ICE!\" spot."
  },
  {
    id: "ancient-coin",
    name: "Ancient Dubloons",
    type: "treasure",
    icons: [
      { symbol: "💰", meaning: "Valuable" },
      { symbol: "⚓", meaning: "Naval" }
    ],
    keywords: ["Currency", "Historical", "Trading"],
    rules: [
      "Spend 1: Gain +2 to any Charm check with natives",
      "Spend 2: Avoid one Heat increase from trading/social",
      "Value: Worth 1 point per coin remaining at end"
    ],
    value: 1,
    consumable: true,
    useEffect: "Spend to gain significant advantage in social interactions or trading",
    flavor: "Spanish gold, pirate plunder—wealth transcends language.",
    imagePrompt: "A handful of gold coins with worn Spanish markings, reflecting neon highlights despite their age"
  }
];
