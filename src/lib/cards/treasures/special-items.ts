
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
    id: "blackbeards-sunscreen",
    name: "Blackbeard's Lost Sunscreen (SPF 1715)",
    type: "treasure",
    icons: [
      { symbol: "☀️", meaning: "Sun" },
      { symbol: "🏛️", meaning: "History" },
      { symbol: "🛡️", meaning: "Defense" }
    ],
    keywords: ["Heat Immunity", "Passive", "Coastal Find"],
    rules: [
      "While equipped (takes 1 Gear slot): You are immune to gaining Heat from environmental sources (Sun, Heatwaves, etc.). Does not protect against Heat gained from exertion or specific card effects."
    ],
    value: 3,
    consumable: false,
    passiveEffect: "Immunity to environmental Heat gain",
    useEffect: "",
    flavor: "Goblet: 'Protected the fiercest pirate from UV rays... probably.'",
    imagePrompt: "An old, barnacle-encrusted bottle with a faded label showing a skull wearing sunglasses."
  },
  {
    id: "hurricane-shutter-shield",
    name: "Hurricane Shutter Shield",
    type: "treasure",
    icons: [
      { symbol: "🛡️", meaning: "Defense" },
      { symbol: "🌪️", meaning: "Weather" },
      { symbol: "🔧", meaning: "Improv" }
    ],
    keywords: ["Damage Block", "Heavy", "Situational Defense"],
    rules: [
      "While equipped (takes 2 Gear slots): You may ignore the damage from one Hazard per round. Suffer -1 Movement due to its bulk."
    ],
    value: 2,
    consumable: false,
    passiveEffect: "Block one Hazard damage per round, but -1 Movement",
    useEffect: "",
    flavor: "Goblet: 'Rated for Cat 5 winds... probably okay against angry raccoons too.'",
    imagePrompt: "A large piece of corrugated metal hurricane shutter, strapped to a player's arm like a makeshift shield, dented and scratched."
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
    useEffect: "Chance to find a random Gear card or trigger a Hazard",
    flavor: "Goblet: 'Contains everything... lip balm, expired coupons, existential dread, maybe a small gator.'",
    imagePrompt: "A large, garishly patterned purse overflowing with an impossible amount of random objects."
  },
  {
    id: "swamp-ape-loincloth",
    name: "Swamp Ape's Lucky Loincloth",
    type: "artifact",
    icons: [
      { symbol: "👘", meaning: "Fashion" },
      { symbol: "🐒", meaning: "Animal" },
      { symbol: "🍀", meaning: "Luck" }
    ],
    keywords: ["Luck Buff", "Social Penalty", "Cursed?"],
    rules: [
      "While equipped (takes 1 Gear slot): Gain +2 Luck on all relevant Stat Checks. Suffer -2 Charm on all relevant Stat Checks. Cannot be unequipped voluntarily. The Goblet makes disgusted noises occasionally."
    ],
    value: 2,
    consumable: false,
    passiveEffect: "+2 Luck, -2 Charm, cannot be unequipped",
    useEffect: "",
    flavor: "Goblet: 'Smells like victory... and wet fur. Mostly wet fur.'",
    imagePrompt: "A ragged piece of hide fashioned into a crude garment, looking surprisingly durable but unpleasant."
  },
  {
    id: "snowbird-king-ring",
    name: "Ring of the Snowbird King",
    type: "artifact",
    icons: [
      { symbol: "💍", meaning: "Jewelry" },
      { symbol: "👑", meaning: "Authority" },
      { symbol: "👥", meaning: "Social" }
    ],
    keywords: ["NPC Control (Situational)", "Charm Buff", "Cursed?"],
    rules: [
      "While equipped (takes 1 Gear slot): Once per game, target one 'Retiree' or 'Snowbird' NPC. Declare \"By the power of shuffleboard, I command you!\" Shake Charm (DC 5).",
      "Success = Control the NPC for one action (e.g., make them give you Gear, mislead another player). Failure = The NPC rallies others against you; gain -1 Charm permanently."
    ],
    value: 2,
    consumable: false,
    passiveEffect: "",
    useEffect: "Attempt to control a Retiree NPC, with risk of permanent Charm penalty",
    flavor: "Goblet: 'Smells faintly of Ben-Gay and early bird specials.'",
    imagePrompt: "A large, gaudy gold ring with a shuffleboard court design instead of a gemstone."
  },
  {
    id: "flomanji-travel-mug",
    name: "The Flomanji Goblet's Forgotten Cousin (Travel Mug)",
    type: "artifact",
    icons: [
      { symbol: "🏆", meaning: "Goblet" },
      { symbol: "✈️", meaning: "Travel" },
      { symbol: "❓", meaning: "Mystery" }
    ],
    keywords: ["Goblet Interaction", "Minor Buff", "Weirdness Gain"],
    rules: [
      "While equipped (takes 1 Gear slot): Once per game, spend 1 Action to \"Consult the Cousin.\" Hold this card near the main Flomanji Goblet.",
      "The main Goblet will offer a choice of two minor boons (e.g., Heal 1 Damage, +1 on next check, reveal adjacent region). Gain 1 Weirdness after receiving the boon."
    ],
    value: 2,
    consumable: false,
    passiveEffect: "",
    useEffect: "Consult with the Goblet for a choice of minor boons",
    flavor: "Goblet: 'Oh... him. Less powerful, arguably more annoying. Fine, ask your question.'",
    imagePrompt: "A slightly smaller, travel-mug version of the main Flomanji Goblet, perhaps made of stainless steel with similar weird carvings, looking slightly less impressive."
  }
]
