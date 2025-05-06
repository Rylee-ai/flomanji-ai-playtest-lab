
import { TreasureCard } from "@/types/cards/treasure";

// Cards that provide ongoing special abilities
export const specialItems: TreasureCard[] = [
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
    passiveEffect: "Immunity to smell-based animal hazards, but gain 1 Weirdness each turn",
    useEffect: "",
    flavor: "Goblet: 'It doesn't smell good, but it definitely doesn't smell like you.'",
    imagePrompt: "A bizarre, oversized stick of deodorant labeled \"Swamp Musk - Extra Strength,\" covered in bits of fur and leaves."
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
  }
];
