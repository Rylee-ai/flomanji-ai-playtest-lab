
import { PlayerCharacterCard } from "@/types/cards/player-character";

export const SPRING_BREAKER: PlayerCharacterCard = {
  id: "chad-brogan",
  name: "Chadwick \"Chad\" Brogan III",
  type: "player-character",
  role: "The Spring Breaker",
  stats: {
    brawn: 2,
    moxie: 2,
    charm: 4, 
    grit: 1,
    weirdSense: 2
  },
  ability: {
    name: "Party Foul Insurance & Can I Crash Here?",
    description: "Once per game, after failing a Luck check prompted by the Goblet, Chad may declare \"My Bad!\" to reroll it. Also, once per game, when entering a Suburban or Coastal region, Chad may make a Charm check (DC 4). Success allows him to immediately Rest (Heal 1 Damage or Reduce Weirdness by 1) for free, even if Hazards are present."
  },
  health: 5,
  weirdness: 0,
  luck: 5,
  starterGear: [
    {
      name: "Leaking Beer Koozie",
      type: "Tool",
      effect: "+1 to Social checks with other Spring Breakers"
    },
    {
      name: "Cracked Sunglasses (Designer Knockoff)",
      type: "Equipment",
      effect: "Reduce sunlight penalties by 1"
    },
    {
      name: "Dad's Credit Card (Declined)",
      type: "Tool",
      effect: "Once per game, attempt to make a purchase (Luck DC 5)"
    },
    {
      name: "Single Flip-Flop (Left)",
      type: "Equipment",
      effect: "-1 to Movement checks but +1 on Beach-related checks"
    },
    {
      name: "Faded Wristband (VIP Access?)",
      type: "Tool",
      effect: "May attempt to bluff access into restricted areas (Charm check)"
    }
  ],
  icons: [
    { symbol: "🏄", meaning: "Beach Culture" },
    { symbol: "🍺", meaning: "Party Animal" }
  ],
  keywords: ["spring break", "social", "charm", "beach"],
  rules: [
    "Start with 5 Health cards in hand",
    "Discard lowest card per damage",
    "Track Weirdness on a d10, starting at 0",
    "Gain 5 Luck tokens"
  ],
  flavor: "Dude! Flomanji! Totally epic waves... wait, this is a swamp? And that gator's got my cooler? Bogus!",
  imagePrompt: "Photorealistic portrait of a young man (Chad), sunburnt, wearing board shorts and a slightly bewildered expression. Background is a mix of beach party remnants and encroaching swamp vines. Focus on misplaced confidence."
};
