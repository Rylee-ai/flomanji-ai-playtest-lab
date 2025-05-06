
import { PlayerCharacterCard } from "@/types/cards/player-character";

export const THEME_PARK_EMPLOYEE: PlayerCharacterCard = {
  id: "darryl-jones",
  name: "Darryl \"Pixel\" Jones",
  type: "player-character",
  role: "Disgruntled Theme Park Employee",
  stats: {
    brawn: 2,
    moxie: 4,
    charm: 1,
    grit: 5,
    weirdSense: 1
  },
  ability: {
    name: "Crowd Control & I Quit!",
    description: "Darryl gains +1 on Moxie or Grit checks made to navigate or endure Hazards involving 'Crowds', 'Mobs', or 'Tourists'. Also, once per game, when facing an overwhelming situation, Darryl may declare \"I Quit!\". He ignores all Hazards in his current region for this turn but suffers -1 Charm permanently."
  },
  health: 5,
  weirdness: 0,
  luck: 2,
  starterGear: [
    {
      name: "Stained Character Suit Head",
      type: "Equipment",
      effect: "+2 intimidation against children, -1 against adults"
    },
    {
      name: "Spill-Proof Tumbler (Empty)",
      type: "Container",
      effect: "Can store one liquid safely"
    },
    {
      name: "Park Map (Secret Shortcuts)",
      type: "Tool",
      effect: "+1 to Navigation checks in theme park-like areas"
    },
    {
      name: "Employee ID Badge (Revoked)",
      type: "Tool",
      effect: "May attempt to bluff employee status (Charm check)"
    },
    {
      name: "Smile Muscles (Overused)",
      type: "Special",
      effect: "+1 to resist intimidation, -1 to genuine charm"
    }
  ],
  icons: [
    { symbol: "🎪", meaning: "Entertainment Worker" },
    { symbol: "😒", meaning: "Burnout Expert" }
  ],
  keywords: ["employee", "service worker", "disgruntled", "crowd control"],
  rules: [
    "Start with 5 Health cards in hand",
    "Discard lowest card per damage",
    "Track Weirdness on a d10, starting at 0",
    "Gain 2 Luck tokens"
  ],
  flavor: "Smile! Wave! Pretend that giant mosquito isn't draining your life force! After dealing with tourists all day, Flomanji is almost relaxing.",
  imagePrompt: "Photorealistic portrait of a tired-looking person (Darryl) in a partially removed, goofy theme park costume. Their expression is a mix of exhaustion and simmering rage. Background is a stylized, slightly nightmarish theme park setting. Focus on burnout."
};
