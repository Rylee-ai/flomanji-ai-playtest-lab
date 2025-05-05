
import { NPCCard } from '@/types/cards/npc';

export const VENDOR_NPC_CARDS: NPCCard[] = [
  {
    id: "swamp-outfitter",
    name: "Swamp Outfitter",
    type: "npc",
    icons: [
      { symbol: "🛒", meaning: "Vendor" },
      { symbol: "🌿", meaning: "Swamp" }
    ],
    keywords: ["Shop", "Gear", "Swamp"],
    checkDC: 8,
    actions: [
      {
        description: "Browse Inventory",
        cost: 1,
        effect: "Draw 3 Gear Cards (Swamp-related). May purchase 1 for 2 Resources."
      },
      {
        description: "Haggle",
        cost: 1,
        effect: "Charm DC 8 → Success: Reduce cost of one item by 1 Resource"
      }
    ],
    rules: [
      "Only found in Swamp or Rural regions",
      "Will not buy damaged goods"
    ],
    flavor: "Got everything you need to survive out there... for a price.",
    imagePrompt: "Grizzled vendor with patched waders and a floating shop boat filled with survival gear"
  },
  {
    id: "beach-pawn-shop",
    name: "Beach Pawn Shop",
    type: "npc",
    icons: [
      { symbol: "🏪", meaning: "Shop" },
      { symbol: "🏖️", meaning: "Beach" }
    ],
    keywords: ["Exchange", "Treasure", "Coastal"],
    checkDC: 9,
    actions: [
      {
        description: "Sell Treasures",
        cost: 1,
        effect: "Sell any non-Artifact Treasure for +1 Resource over its base value"
      },
      {
        description: "Buy Goods",
        cost: 1,
        effect: "Draw 3 Gear Cards. May purchase 1 for 1 Resource."
      }
    ],
    rules: [
      "Only appears in Coastal or Tourist regions",
      "Will not handle Artifacts or highly Weird items"
    ],
    flavor: "One man's trash washes up as another man's cash.",
    imagePrompt: "Cluttered beachside shop with display cases full of odd trinkets and salvaged goods"
  }
];
