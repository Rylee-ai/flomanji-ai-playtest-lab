
import { NPCCard } from '@/types/cards/npc';

export const HELPER_NPC_CARDS: NPCCard[] = [
  {
    id: "tour-bus-driver",
    name: "Tour Bus Driver",
    type: "npc",
    icons: [
      { symbol: "🚌", meaning: "Vehicle" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Mass Move", "Urban"],
    checkDC: 9,
    actions: [
      {
        description: "Hitch Ride",
        cost: 1,
        effect: "Moxie DC 9 → Success: All players on this Region move 1 tile toward any Urban or Highway Region; Failure: Take 1 Damage and Gain 1 Heat"
      }
    ],
    rules: ["Affects all players in Region"],
    flavor: "Next stop: somewhere less deadly… maybe.",
    imagePrompt: "Old bus idling in traffic, driver leaning out window, megaphone in hand"
  },
  {
    id: "wildlife-conservationist",
    name: "Wildlife Conservationist",
    type: "npc",
    icons: [
      { symbol: "🦜", meaning: "Creature" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Swamp/Forest", "Aid"],
    checkDC: 9,
    actions: [
      {
        description: "Grit DC 9",
        cost: 1,
        effect: "Success: Heal 1 Damage to any one Survivor or Reduce 1 Weirdness; Failure: Gain 1 Weirdness"
      }
    ],
    rules: ["Can target any Survivor in Region"],
    flavor: "We're all part of the ecosystem… some of us bite back.",
    imagePrompt: "Green‑vested biologist cradling a small gator or bird, earnest expression"
  }
];
