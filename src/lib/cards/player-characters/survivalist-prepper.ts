
import { PlayerCharacterCard } from "@/types/cards/player-character";

export const SURVIVALIST_PREPPER: PlayerCharacterCard = {
  id: "rexford-grimes",
  name: "Rexford \"Rex\" Grimes",
  type: "player-character",
  role: "Survivalist Prepper",
  stats: {
    brawn: 2,
    moxie: 3,
    charm: 1,
    grit: 5,
    weirdSense: 1
  },
  ability: {
    name: "Always Prepared & Field Crafting",
    description: "Rex starts the game with one additional random Gear card. Also, once per game, Rex may spend 1 Action and discard 2 Gear cards to immediately draw 1 Treasure & Artifact card."
  },
  health: 5,
  weirdness: 0,
  luck: 3,
  starterGear: [
    {
      name: "Spork (Tactical Titanium)",
      type: "Tool",
      effect: "Multipurpose eating utensil, minor digging tool"
    },
    {
      name: "Water Purification Tablets (Expired?)",
      type: "Consumable",
      effect: "3 uses: Purify water source (50% chance of working)"
    },
    {
      name: "Paracord Bracelet (50ft)",
      type: "Tool",
      effect: "Can be unwound for 50ft of strong cord"
    },
    {
      name: "Camo Bandana",
      type: "Equipment",
      effect: "+1 to stealth checks in wilderness"
    },
    {
      name: "Survival Manual (Waterlogged)",
      type: "Tool",
      effect: "+1 to wilderness survival knowledge checks"
    }
  ],
  icons: [
    { symbol: "🧰", meaning: "Survivalist" },
    { symbol: "🔧", meaning: "Crafting Expert" }
  ],
  keywords: ["prepper", "survivalist", "prepared", "crafting"],
  rules: [
    "Start with 5 Health cards in hand",
    "Discard lowest card per damage",
    "Track Weirdness on a d10, starting at 0",
    "Gain 3 Luck tokens"
  ],
  flavor: "Knew it! Knew this day would come! Flomanji Rising! Good thing I buried those MREs... now where did I put that shovel?",
  imagePrompt: "Photorealistic portrait of a rugged individual (Rex) wearing practical gear, maybe a bit paranoid-looking. Background is a cluttered garage or bunker filled with survival supplies. Focus on preparedness."
};
