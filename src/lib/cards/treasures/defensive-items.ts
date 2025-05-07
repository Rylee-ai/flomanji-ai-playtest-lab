
import { TreasureCard } from "@/types/cards/treasure";

// Cards that provide defensive capabilities
export const defensiveItems: TreasureCard[] = [
  {
    id: "skunk-ape-deodorant",
    name: "Skunk Ape's Forgotten Deodorant",
    type: "artifact",
    icons: [
      { symbol: "👃", meaning: "Odor" },
      { symbol: "🐒", meaning: "Animal" },
      { symbol: "🌀", meaning: "Weirdness" }
    ],
    keywords: ["Repellent", "Passive", "Weirdness Gain"],
    rules: [
      "While equipped (takes 1 Gear slot): Animal Hazards involving 'Smell' or 'Tracking' cannot target you.",
      "However, at the start of each of your turns, gain 1 Weirdness (Goblet: \"The other smell... it lingers...\")."
    ],
    value: 2,
    consumable: false,
    passiveEffect: "Animal Hazards involving 'Smell' or 'Tracking' cannot target you, but gain 1 Weirdness each turn",
    flavor: "Goblet: 'It doesn't smell good, but it definitely doesn't smell like you.'",
    imagePrompt: "A bizarre, oversized stick of deodorant labeled \"Swamp Musk - Extra Strength,\" covered in bits of fur and leaves."
  },
  {
    id: "governors-mansion-keys",
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
    useEffect: "Attempt to gain access to restricted areas or bypass authority NPCs with a Charm check (DC 5)",
    flavor: "Goblet: 'Might open the front door... might just be for his golf cart.'",
    imagePrompt: "A large, ornate, slightly rusty key on a keychain featuring the state seal."
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
    passiveEffect: "Increase hand size limit by 2",
    useEffect: "Rummage for a random Gear card (success) or Hazard card (failure) on Luck check (DC 4)",
    flavor: "Goblet: 'Contains everything... lip balm, expired coupons, existential dread, maybe a small gator.'",
    imagePrompt: "A large, garishly patterned purse overflowing with an impossible amount of random objects."
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
      "Reveals the location of a special \"Ice Machine\" Bonus Zone (place token on a specific Urban/Highway Region).",
      "If you reach that zone and spend 1 Action, discard this card to reduce the global Heat track by 3."
    ],
    value: 2,
    consumable: true,
    useEffect: "Reach the marked location and spend 1 Action to reduce global Heat by 3",
    flavor: "Goblet: 'More valuable than gold in the Flomanji heat.'",
    imagePrompt: "A hand-drawn map on a napkin, leading through familiar landmarks to a circled \"ICE!\" spot."
  }
];
