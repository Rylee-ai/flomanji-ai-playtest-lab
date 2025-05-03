
import { TreasureCard } from "@/types/cards";

export const TREASURE_CARDS: TreasureCard[] = [
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
  }
];
