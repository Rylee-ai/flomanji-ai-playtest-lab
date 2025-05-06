
import { PlayerCharacterCard } from "@/types/cards/player-character";

export const HOA_ENFORCER: PlayerCharacterCard = {
  id: "brenda-mcnulty",
  name: "Brenda McNulty",
  type: "player-character",
  role: "HOA Enforcer, Suspended",
  stats: {
    brawn: 2,
    moxie: 3,
    charm: 5,
    grit: 3,
    weirdSense: 1
  },
  ability: {
    name: "Cite Violation! & Find the Loophole",
    description: "Once per game, when facing an NPC in an Urban or Suburban region, Brenda may make a Charm check (DC 5). Success allows her to intimidate the NPC into retreating or offering a minor boon. Also, when Brenda fails a Stat Check related to a Hazard specifically labeled 'Bureaucracy' or 'Social', she may spend 1 Grit to reroll the check."
  },
  health: 5,
  weirdness: 0,
  luck: 1,
  starterGear: [
    {
      name: "Clipboard of Judgment",
      type: "Tool",
      effect: "+1 to Intimidation checks against NPCs"
    },
    {
      name: "Measuring Tape (Laser Precision)",
      type: "Tool",
      effect: "Can accurately measure distances up to 50ft"
    },
    {
      name: "Rulebook (Heavily Annotated)",
      type: "Tool",
      effect: "+1 to checks involving rules or regulations"
    },
    {
      name: "Sensible Shoes (Orthopedic)",
      type: "Equipment",
      effect: "+1 to Endurance checks related to walking"
    },
    {
      name: "Nametag ('Brenda - Compliance Officer')",
      type: "Equipment",
      effect: "+1 to Authority checks with civilians"
    }
  ],
  icons: [
    { symbol: "📋", meaning: "Bureaucracy Expert" },
    { symbol: "🏠", meaning: "Suburban Authority" }
  ],
  keywords: ["bureaucrat", "enforcer", "suburban", "authority"],
  rules: [
    "Start with 5 Health cards in hand",
    "Discard lowest card per damage",
    "Track Weirdness on a d10, starting at 0",
    "Gain 1 Luck token"
  ],
  flavor: "Regulation 7C clearly states all existential threats must be pre-approved by the architectural review board! This state is completely out of compliance!",
  imagePrompt: "Photorealistic portrait of a middle-aged woman (Brenda) with a stern expression, wearing a slightly-too-official polo shirt. She's holding a clipboard like a weapon. Background is a pristine but eerie suburban street. Focus on authority."
};
