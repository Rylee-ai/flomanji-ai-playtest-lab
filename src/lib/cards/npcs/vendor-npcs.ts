
import { NPCCard } from '@/types/cards/npc';

export const VENDOR_NPC_CARDS: NPCCard[] = [
  {
    id: "shady-pawn-shop-owner",
    name: "Shady Pawn Shop Owner",
    type: "npc",
    icons: [
      { symbol: "🛒", meaning: "Vendor" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Trade", "Urban/Suburb", "Gear Source"],
    checkDC: 11,
    actions: [
      {
        description: "Sell Gear",
        cost: 1,
        effect: "Discard 1–2 non‑Artifact Gear → Draw that many Gear cards"
      },
      {
        description: "Buy Gear",
        cost: 1,
        effect: "Charm DC 11 → Success: Draw 1 Gear; Failure: Lose 1 Action & Gain 1 Weirdness"
      },
      {
        description: "Ask Questions",
        cost: 1,
        effect: "Moxie DC 9 → Success: Gain Info (view adjacent Hazard/Bonus); Failure: Gain 1 Heat"
      }
    ],
    rules: ["Must have Gear to sell for Sell action"],
    flavor: "Everything's got a price. Especially desperation.",
    imagePrompt: "A shifty‑eyed owner behind a cluttered pawn‑shop counter, poorly lit, eyeing you suspiciously"
  },
  {
    id: "questionable-roadside-vendor",
    name: "Questionable Roadside Vendor",
    type: "npc",
    icons: [
      { symbol: "🛒", meaning: "Vendor" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Highway", "Rural", "Weirdness"],
    checkDC: 9,
    actions: [
      {
        description: "Browse Wares",
        cost: 1,
        effect: "Luck DC 9 → Success: Draw 1 Gear; Failure: Draw 1 Gear & Gain 1 Weirdness; Natural 1: also Take 1 Damage or trigger minor Hazard"
      }
    ],
    rules: ["Natural 1 on check triggers additional negative effect"],
    flavor: "Taxidermy squirrels! Get 'em while they're… vaguely warm!",
    imagePrompt: "Rickety stand piled with odd junk—taxidermy, jars of mysterious fluids"
  },
  {
    id: "motel-manager",
    name: "Motel Manager",
    type: "npc",
    icons: [
      { symbol: "🏨", meaning: "Social" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Shelter", "Trade"],
    checkDC: 9,
    actions: [
      {
        description: "Book Room",
        cost: 1,
        effect: "Charm DC 9 → Success: Rest here (heal 1 Health or reduce 1 Weirdness) or draw 1 Gear; Failure: Gain 1 Heat"
      }
    ],
    rules: ["Success allows immediate rest action"],
    flavor: "Rooms are cheap… but your nightmares aren't.",
    imagePrompt: "Tired manager behind a cluttered desk, neon 'Vacancy' sign flickering"
  }
];
