
import { GearCard } from "@/types/cards/gear";

export const TOOL_GEAR_CARDS: GearCard[] = [
  {
    id: "gear-tool-001",
    name: "Lockpicking Set",
    type: "gear",
    icons: [{ symbol: "🔓", meaning: "Lock picking" }],
    keywords: ["tool", "thieving", "utility"],
    rules: ["Add +2 to any checks to open locks or disarm simple traps."],
    flavor: "A set of precision tools for those who encounter unexpected barriers.",
    imagePrompt: "A roll-up leather case containing various thin metal tools and picks.",
    category: "tool",
    statBonus: {
      stat: "moxie",
      value: 1
    }
  },
  // Additional tools would be here
];
