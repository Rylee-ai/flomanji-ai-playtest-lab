
import { PlayerCharacterCard } from "@/types/cards/player-character";

export const GATOR_WRANGLER: PlayerCharacterCard = {
  id: "swamp-mama-jolene",
  name: "\"Swamp Mama\" Jolene",
  type: "player-character",
  role: "Gator Wrangler & Herbalist",
  stats: {
    brawn: 3,
    moxie: 5,
    charm: 2,
    grit: 4,
    weirdSense: 1
  },
  ability: {
    name: "Gator Grip & Swamp Remedy",
    description: "Jolene gains +1 on all Moxie or Grit checks involving 'Gator' or 'Animal Handling' Hazards. Also, once per game, Jolene may spend 1 Action and discard 1 Gear card with a 'Plant' or 'Natural' keyword to allow herself or another player in her Region to Heal 2 Damage OR remove one 'Poisoned' or 'Sick' status effect."
  },
  health: 5,
  weirdness: 0,
  luck: 2,
  starterGear: [
    {
      name: "Wranglin' Rope (Frayed)",
      type: "Tool",
      effect: "+1 to Animal Handling checks, especially with gators"
    },
    {
      name: "Herbal Poultice (Smells Funny)",
      type: "Consumable",
      effect: "Heal 1 damage or neutralize minor poison"
    },
    {
      name: "Sturdy Waders (Patched)",
      type: "Equipment",
      effect: "Move through swampy terrain without penalty"
    },
    {
      name: "Gator Tooth (Lucky Charm)",
      type: "Artifact",
      effect: "+1 to Luck checks involving animals or swamp hazards"
    },
    {
      name: "Wide-Brimmed Hat (Sweat-Stained)",
      type: "Equipment",
      effect: "+1 resistance to sun-related hazards"
    }
  ],
  icons: [
    { symbol: "🐊", meaning: "Gator Handler" },
    { symbol: "🌿", meaning: "Herbalist" }
  ],
  keywords: ["swamp", "healer", "animal handler", "survivalist"],
  rules: [
    "Start with 5 Health cards in hand",
    "Discard lowest card per damage",
    "Track Weirdness on a d10, starting at 0",
    "Gain 2 Luck tokens"
  ],
  flavor: "Ain't nothin' in this swamp scares me more'n tax season. Now, hold still while I wrassle this here reptile... or brew ya somethin' for that rash.",
  imagePrompt: "Photorealistic portrait of a tough, weathered woman (Jolene) with determined eyes, perhaps with a coil of rope over her shoulder or holding herbs. Background is a dense swamp environment. Focus on resilience."
};
