
import { TreasureCard } from "@/types/cards/treasure";

// Cards that provide special tools and abilities
export const specialTools: TreasureCard[] = [
  {
    id: "fortune-compass",
    name: "Fortune Compass",
    type: "artifact",
    icons: [
      { symbol: "🧭", meaning: "Navigation" },
      { symbol: "🍀", meaning: "Luck" }
    ],
    keywords: ["Navigation", "Luck", "Decision"],
    rules: [
      "When used for decisions: Reroll any one die",
      "When used for navigation: Choose movement outcome",
      "Limit: Can be used once per round"
    ],
    value: 2,
    consumable: false,
    passiveEffect: "+1 Luck while carried",
    useEffect: "Reroll any one die OR choose your outcome when moving between regions",
    flavor: "The needle doesn't point north—it points toward fortune.",
    imagePrompt: "An antique brass compass whose needle glows with shifting neon colors and never points north"
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
  },
  {
    id: "ritual-mask",
    name: "Ritual Mask",
    type: "artifact",
    icons: [
      { symbol: "🎭", meaning: "Disguise" },
      { symbol: "🔮", meaning: "Magic" }
    ],
    keywords: ["Ritual", "Disguise", "Protection"],
    rules: [
      "When worn: Gain immunity to one specific hazard type",
      "Side effect: Weirdness checks suffer -1 penalty",
      "Attunement: Must spend 1 Action to attune to new hazard type"
    ],
    value: 2,
    consumable: false,
    passiveEffect: "Provides immunity to one attuned hazard type",
    useEffect: "Spend 1 Action to attune the mask to a new hazard type",
    flavor: "The eyes see beyond this world—wear it and you will too.",
    imagePrompt: "A wooden tribal mask with asymmetrical features, feathers, and glowing painted symbols"
  },
  {
    id: "swamp-map",
    name: "Smuggler's Swamp Map",
    type: "treasure",
    icons: [
      { symbol: "🗺️", meaning: "Navigation" },
      { symbol: "🐊", meaning: "Swamp" }
    ],
    keywords: ["Navigation", "Secret", "Information"],
    rules: [
      "When used for movement: Choose path instead of random",
      "When used for search: +2 to find hidden paths or caches",
      "Consumable: Mark off after 3 uses"
    ],
    value: 1,
    consumable: true,
    useEffect: "Choose your path instead of random draw, or gain +2 to Search checks in swamp regions",
    flavor: "Smugglers don't share their routes—this map came at great cost.",
    imagePrompt: "A weathered, stained map on parchment showing hidden waterways and secret caches marked in faded ink"
  },
  {
    id: "spirit-whistle",
    name: "Spirit Whistle",
    type: "artifact",
    icons: [
      { symbol: "👻", meaning: "Spirit" },
      { symbol: "🎵", meaning: "Sound" }
    ],
    keywords: ["Magical", "Communication", "Sound"],
    rules: [
      "When used: Draw 1 Chaos Card and see effect before playing",
      "Can discard to negate one Chaos Card",
      "Consumable: Discard after negating a card"
    ],
    value: 2,
    consumable: true,
    useEffect: "Preview the next Chaos Card before it takes effect, or discard this to negate one Chaos Card completely",
    flavor: "Its haunting tone stretches across the veil between worlds.",
    imagePrompt: "A small bone whistle carved with spirit faces that seem to shift when not directly observed"
  }
];
