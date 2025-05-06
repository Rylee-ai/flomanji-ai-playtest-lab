
import { PlayerCharacterCard } from "@/types/cards/player-character";

export const CRYPTID_HUNTER: PlayerCharacterCard = {
  id: "mortimer-quigley",
  name: "Mortimer \"Mort\" Quigley",
  type: "player-character",
  role: "Cryptid Hunter",
  stats: {
    brawn: 1,
    moxie: 2,
    charm: 1,
    grit: 3,
    weirdSense: 5
  },
  ability: {
    name: "I Believe! & Track the Unknown",
    description: "Mort gains +1 on all Stat Checks involving Hazards or NPCs labeled with 'Weirdness', 'Animal', or 'Mystery' icons. Also, once per game, Mort may spend 1 Action to make a Luck check (DC 4). Success reveals the location of the nearest 'Cryptid' or 'Mystery' related NPC or Event."
  },
  health: 5,
  weirdness: 0,
  luck: 5,
  starterGear: [
    {
      name: "Blurry Photograph (Evidence?)",
      type: "Tool",
      effect: "+1 to checks when convincing others about cryptids"
    },
    {
      name: "Night Vision Goggles (Battery Low)",
      type: "Equipment",
      effect: "2 uses: See in darkness for one scene"
    },
    {
      name: "Plaster Cast Kit (Bigfoot Print?)",
      type: "Tool",
      effect: "Create evidence of creature encounters"
    },
    {
      name: "Tinfoil Hat (Standard Issue)",
      type: "Equipment",
      effect: "+1 resistance to mind-affecting Weirdness"
    },
    {
      name: "Journal of Sightings (Mostly Raccoons)",
      type: "Tool",
      effect: "+1 to Knowledge checks about local fauna"
    }
  ],
  icons: [
    { symbol: "👣", meaning: "Cryptid Expert" },
    { symbol: "🔍", meaning: "Investigation Expert" }
  ],
  keywords: ["cryptozoologist", "believer", "investigator", "paranormal"],
  rules: [
    "Start with 5 Health cards in hand",
    "Discard lowest card per damage",
    "Track Weirdness on a d10, starting at 0",
    "Gain 5 Luck tokens"
  ],
  flavor: "The Skunk Ape is real! The Mothman vacations here! The signs are everywhere... you just need the right kind of eyes... and maybe this blurry photo.",
  imagePrompt: "Photorealistic portrait of a man (Mort) with wide, slightly manic eyes, wearing outdoor gear and holding a strange device. Background is a dark, misty swamp or forest. Focus on earnest belief."
};
