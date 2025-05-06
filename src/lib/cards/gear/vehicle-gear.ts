
import { GearCard } from "@/types/cards/gear";

export const VEHICLE_GEAR_CARDS: GearCard[] = [
  {
    id: "gear-vehicle-001",
    name: "Off-road Jeep",
    type: "gear",
    icons: [{ symbol: "🚙", meaning: "Vehicle" }],
    keywords: ["vehicle", "transport", "off-road"],
    rules: ["Move up to 3 regions in a single action. Cannot cross water regions."],
    flavor: "Gets you there in style, though not always comfortably.",
    imagePrompt: "A rugged green jeep with oversized tires and mud splattered sides.",
    category: "vehicle"
  },
  // Additional vehicles would be here
];
