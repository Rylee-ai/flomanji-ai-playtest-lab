
import { TreasureCard } from "@/types/cards/treasure";

// Cards that are valuable treasures
export const valuableItems: TreasureCard[] = [
  {
    id: "spanish-doubloons",
    name: "Bag of Spanish Doubloons",
    type: "treasure",
    icons: [
      { symbol: "💰", meaning: "Coin" },
      { symbol: "💎", meaning: "Value" },
      { symbol: "📜", meaning: "History" }
    ],
    keywords: ["Valuable", "Coastal", "Trade Aid", "Consumable Option"],
    rules: [
      "While holding this, you may choose one effect ONCE per game:",
      "A) Bribe: Before making a Charm check to bribe or trade with an NPC, discard this card. The Goblet announces: \"A flash of gold! They're distracted...\" Gain +3 Charm for that check.",
      "B) Buy Comfort: Spend 1 Action and discard this card. Declare \"Spending the loot!\" The Goblet confirms: \"Temporary relief purchased! Reduce global Heat by 2.\""
    ],
    value: 3,
    consumable: true,
    useEffect: "Use for +3 Charm on a bribe/trade check OR reduce global Heat by 2",
    flavor: "Goblet: 'Shiny history... still spends, if you find the right sucker.'",
    imagePrompt: "Photorealistic close-up of a small, rough burlap sack overflowing with tarnished gold doubloons, some spilling onto sand or weathered wood."
  },
  {
    id: "last-roll-toilet-paper",
    name: "The Last Roll of Toilet Paper (2-Ply)",
    type: "treasure",
    icons: [
      { symbol: "🧻", meaning: "Comfort" },
      { symbol: "💎", meaning: "Value" },
      { symbol: "🛡️", meaning: "Survival" }
    ],
    keywords: ["Ultimate Barter Item", "Morale Boost", "Highly Valuable"],
    rules: [
      "Can be discarded during any NPC interaction to automatically succeed on any single Charm or Barter check, regardless of DC.",
      "Alternatively, discard at any time to allow every player in your region (including yourself) to Heal 1 Damage (Goblet: \"A moment of pure comfort.\")."
    ],
    value: 3,
    consumable: true,
    useEffect: "Auto-succeed on any Charm/Barter check OR heal all players in your region by 1",
    flavor: "Goblet: 'More precious than diamonds in the apocalypse.'",
    imagePrompt: "A single, pristine roll of toilet paper, perhaps glowing softly, presented almost like a holy relic."
  }
];
