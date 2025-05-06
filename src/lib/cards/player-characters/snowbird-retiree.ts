
import { PlayerCharacterCard } from "@/types/cards/player-character";

export const SNOWBIRD_RETIREE: PlayerCharacterCard = {
  id: "sheldon-goldstein",
  name: "Sheldon \"Shelly\" Goldstein",
  type: "player-character",
  role: "Snowbird Retiree",
  stats: {
    brawn: 1,
    moxie: 1,
    charm: 4,
    grit: 2,
    weirdSense: 2
  },
  ability: {
    name: "I Know People & Kvetch for Relief",
    description: "Once per game, Shelly may automatically succeed on one Charm Check (DC 5 or lower) against an NPC in an Urban or Suburban region. Also, once per game, Shelly may spend 1 Action to complain loudly about the situation. The Goblet sighs and reduces the global Heat track by 1, but Shelly gains 1 Weirdness from the stress."
  },
  health: 5,
  weirdness: 0,
  luck: 5,
  starterGear: [
    {
      name: "Slightly Damp Bingo Card (Lucky Dauber)",
      type: "Tool",
      effect: "+1 to Luck checks in social situations"
    },
    {
      name: "Reading Glasses (Prescription Strength)",
      type: "Equipment",
      effect: "+1 to perception checks for small details"
    },
    {
      name: "Coupon Clippers (Extreme Saver Edition)",
      type: "Tool",
      effect: "Reduce cost of one purchase by 1"
    },
    {
      name: "Portable Oxygen Tank (Personal Reserve)",
      type: "Equipment",
      effect: "+1 to Grit checks involving exertion or air quality"
    },
    {
      name: "Early Bird Dinner Reservation (Still Honored?!)",
      type: "Tool",
      effect: "Once per game, reduce Heat by 1 in suburban regions"
    }
  ],
  icons: [
    { symbol: "👴", meaning: "Senior Wisdom" },
    { symbol: "🏖️", meaning: "Snowbird" }
  ],
  keywords: ["retiree", "social", "snowbird", "complainer"],
  rules: [
    "Start with 5 Health cards in hand",
    "Discard lowest card per damage",
    "Track Weirdness on a d10, starting at 0",
    "Gain 5 Luck tokens"
  ],
  flavor: "Left New York for sunshine and early bird specials. Found... this Flomanji chaos instead. Oy vey. Where's the shuffleboard court?",
  imagePrompt: "Photorealistic portrait of an elderly man (Shelly), maybe in a slightly-too-loud Flomanji shirt and khaki shorts. He looks exasperated but shrewd, perhaps adjusting his glasses. Background is a sunny but slightly chaotic Flomanji suburban scene. Focus on his personality."
};
