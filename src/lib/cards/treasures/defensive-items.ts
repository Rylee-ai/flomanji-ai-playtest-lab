
import { TreasureCard } from "@/types/cards/treasure";

// Cards that provide protection or defensive capabilities
export const defensiveItems: TreasureCard[] = [
  {
    id: "blackbeards-lost-sunscreen",
    name: "Blackbeard's Lost Sunscreen (SPF 1715)",
    type: "treasure",
    icons: [
      { symbol: "☀️", meaning: "Sun" },
      { symbol: "🏛️", meaning: "History" },
      { symbol: "🛡️", meaning: "Defense" }
    ],
    keywords: ["Heat Immunity", "Passive", "Coastal Find"],
    rules: [
      "While equipped (takes 1 Gear slot): You are immune to gaining Heat from environmental sources (Sun, Heatwaves, etc.).",
      "Does not protect against Heat gained from exertion or specific card effects."
    ],
    value: 2,
    consumable: false,
    passiveEffect: "Immunity to Heat gain from environmental sources",
    useEffect: "",
    flavor: "Goblet: 'Protected the fiercest pirate from UV rays... probably.'",
    imagePrompt: "An old, barnacle-encrusted bottle with a faded label showing a skull wearing sunglasses"
  },
  {
    id: "hurricane-shutter-shield",
    name: "Hurricane Shutter Shield",
    type: "treasure",
    icons: [
      { symbol: "🛡️", meaning: "Defense" },
      { symbol: "🌪️", meaning: "Weather" },
      { symbol: "🎭", meaning: "Improv" }
    ],
    keywords: ["Damage Block", "Heavy", "Situational Defense"],
    rules: [
      "While equipped (takes 2 Gear slots): You may ignore the damage from one Hazard per round.",
      "Suffer -1 Movement due to its bulk."
    ],
    value: 2,
    consumable: false,
    passiveEffect: "Ignore damage from one Hazard per round, but suffer -1 Movement",
    useEffect: "",
    flavor: "Goblet: 'Rated for Cat 5 winds... probably okay against angry raccoons too.'",
    imagePrompt: "A large piece of corrugated metal hurricane shutter, strapped to a player's arm like a makeshift shield, dented and scratched"
  }
];
