
import { PlayerCharacterCard } from "@/types/cards/player-character";

export const LOCAL_BLOGGER: PlayerCharacterCard = {
  id: "lenny-harper",
  name: "Lenny \"Scoop\" Harper",
  type: "player-character",
  role: "Local Blogger / Journalist",
  stats: {
    brawn: 1,
    moxie: 3,
    charm: 3,
    grit: 2,
    weirdSense: 3
  },
  ability: {
    name: "Get the Scoop & Deadline Pressure",
    description: "Once per game, after successfully interacting with an NPC, Lenny may ask the Goblet one additional question about the NPC's knowledge. The Goblet provides a brief, potentially cryptic answer. Also, when the global Heat track reaches 5 or higher, Lenny gains +1 on all Moxie checks."
  },
  health: 5,
  weirdness: 0,
  luck: 4,
  starterGear: [
    {
      name: "Voice Recorder (Low Battery)",
      type: "Tool",
      effect: "2 uses: Record conversations for later reference"
    },
    {
      name: "Steno Pad (Coffee Stained)",
      type: "Tool",
      effect: "+1 to memory checks about recorded information"
    },
    {
      name: "Fedora (Slightly Crooked)",
      type: "Equipment",
      effect: "+1 to journalism-related Charm checks"
    },
    {
      name: "Camera with Cracked Lens",
      type: "Tool",
      effect: "Can take photos as evidence (80% clear)"
    },
    {
      name: "Press Pass (Expired)",
      type: "Tool",
      effect: "May attempt to access restricted areas (Charm check)"
    }
  ],
  icons: [
    { symbol: "🗞️", meaning: "Journalist" },
    { symbol: "✏️", meaning: "Blogger" }
  ],
  keywords: ["journalist", "investigator", "reporter", "curious"],
  rules: [
    "Start with 5 Health cards in hand",
    "Discard lowest card per damage",
    "Track Weirdness on a d10, starting at 0",
    "Gain 4 Luck tokens"
  ],
  flavor: "This is bigger than the county fair scandal! 'Flomanji Phenomenon Baffles Experts!' Just gotta get the story... and maybe survive to post it.",
  imagePrompt: "Photorealistic portrait of a determined-looking person (Lenny) holding a notepad and pen, maybe looking slightly harried. Background is a chaotic scene they are trying to document (e.g., aftermath of a Hazard, a strange Event). Focus on investigative drive."
};
