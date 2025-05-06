
import { PlayerCharacterCard } from "@/types/cards/player-character";

export const INSTAGRAM_INFLUENCER: PlayerCharacterCard = {
  id: "tiffany-monroe",
  name: "Tiffany \"Tiff\" Monroe",
  type: "player-character",
  role: "Instagram Influencer",
  stats: {
    brawn: 1,
    moxie: 1,
    charm: 5,
    grit: 1,
    weirdSense: 2
  },
  ability: {
    name: "Do It For The 'Gram! & Sponsored Content",
    description: "Once per game, Tiff can attempt to distract an NPC or non-animal Hazard by taking a selfie with it. \"Shake Charm, DC 4.\" Success = The Hazard/NPC is momentarily confused; ignore its effects for this turn. Failure = Gain 1 Weirdness. Also, when Tiff draws a Gear card with a 'Food', 'Luxury', or 'Fashion' keyword, she may immediately gain +1 Luck for her next check."
  },
  health: 5,
  weirdness: 0,
  luck: 4,
  starterGear: [
    {
      name: "Selfie Stick (Extended)",
      type: "Tool",
      effect: "+1 to social media related checks"
    },
    {
      name: "Ring Light (Battery Dying)",
      type: "Tool",
      effect: "2 uses: Provide light in darkness or +1 to appearance checks"
    },
    {
      name: "Portable Charger (Also Dying)",
      type: "Tool",
      effect: "2 uses: Recharge one electronic item"
    },
    {
      name: "Branded Water Bottle (Empty)",
      type: "Container",
      effect: "Can store water or other liquid"
    },
    {
      name: "Perfectly Applied Makeup (Sweating Off)",
      type: "Equipment",
      effect: "+1 to first impression Charm checks"
    }
  ],
  icons: [
    { symbol: "📱", meaning: "Social Media Expert" },
    { symbol: "🤳", meaning: "Selfie Specialist" }
  ],
  keywords: ["influencer", "social media", "trendy", "photogenic"],
  rules: [
    "Start with 5 Health cards in hand",
    "Discard lowest card per damage",
    "Track Weirdness on a d10, starting at 0",
    "Gain 4 Luck tokens"
  ],
  flavor: "#FlomanjiLife #Survivor #NoFilter #SponsoredByPanic! OMG, you guys, this lighting is terrible for my aesthetic, but the existential dread is kinda trending?",
  imagePrompt: "Photorealistic portrait of a young woman (Tiffany) striking a pose for a selfie amidst chaos. She looks slightly panicked but is trying to maintain her influencer smile. Background is a visually striking but dangerous Flomanji location (e.g., edge of a sinkhole, picturesque but gator-filled swamp). Focus on curated reality vs. harsh reality."
};
