
import { FlomanjifiedRoleCard } from "@/types/cards/flomanjified";

// Cards related to natural environment themes (swamp, wildlife)
export const natureCards: FlomanjifiedRoleCard[] = [
  {
    id: "flomanjified-gator-kings-herald",
    name: "The Gator King's Herald",
    type: "flomanjified",
    icons: [
      { symbol: "🐊", meaning: "Gator" },
      { symbol: "👑", meaning: "Crown" },
      { symbol: "🌿", meaning: "Swamp" }
    ],
    keywords: ["Reptilian Control", "Swamp Power", "Gator Hazards"],
    rules: [
      "Objective: Ensure at least 3 different Gator Hazards are active on the map simultaneously OR ensure a Survivor is eliminated by a Gator Hazard.",
      "Chaos Phase Action: Choose one:",
      "Summon Reptilian Minion: Place one 'Gator Hazard' card from the discard pile onto any Swamp or Water region without an active Gator Hazard.",
      "Gator's Gaze: Target one Survivor in a region with a Gator Hazard. Goblet prompts: \"The gators stare... Shake Moxie, DC 4, or flee!\" Failure: Survivor must move to an adjacent region.",
      "Special: Immune to negative effects of Gator Hazards. Gain +1 when making checks for Gator Hazards (if applicable)."
    ],
    flavor: "The swamp whispers promises of power... and scales. You serve the true king now.",
    imagePrompt: "A shadowy figure draped in moss and reeds, holding a crude sceptre topped with a gator skull, standing knee-deep in murky swamp water. Gator eyes glow nearby.",
    originalRole: "Survivor",
    chaosAction: "Choose: Summon Reptilian Minion (place Gator Hazard from discard pile) OR Gator's Gaze (force Moxie DC 4 check or target flees).",
    specialAbility: "Immune to negative Gator Hazard effects. +1 on Gator Hazard checks."
  },
  {
    id: "flomanjified-swamp-thing-kin",
    name: "The Swamp Thing's Kin",
    type: "flomanjified",
    icons: [
      { symbol: "🌿", meaning: "Plant" },
      { symbol: "🌿", meaning: "Swamp" },
      { symbol: "💪", meaning: "Grit" }
    ],
    keywords: ["Plant Control", "Swamp Power", "Terrain Manipulation"],
    rules: [
      "Objective: Ensure at least 3 different 'Plant' or 'Environmental' Hazards are active on the map OR ensure a Survivor is eliminated within a Swamp region.",
      "Chaos Phase Action: Choose one:",
      "Overgrowth: Target one region. Place one 'Plant' or 'Terrain' Hazard from the discard pile onto that region (if legally possible).",
      "Vine Snare: Target one Survivor in a Swamp or Forest region. Goblet describes: \"Vines lash out! Shake Moxie, DC 4, or get tangled!\" Failure: Survivor cannot take a Move action on their next turn.",
      "Special: Immune to negative effects from 'Plant' Hazards. Heals 1 Damage automatically when ending turn in a Swamp region."
    ],
    flavor: "The green calls. You are root and vine now. Protect the muck.",
    imagePrompt: "A figure seemingly merging with the swamp, covered in vines, moss, and mud, with glowing green eyes.",
    originalRole: "Survivor",
    chaosAction: "Choose: Overgrowth (place Plant/Terrain Hazard from discard) OR Vine Snare (force Moxie DC 4 check or block movement).",
    specialAbility: "Immune to Plant Hazards. Heal 1 Damage when ending turn in Swamp region."
  }
]
