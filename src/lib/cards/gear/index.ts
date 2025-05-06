
import { GearCard } from "@/types/cards/gear";
import { STANDARD_GEAR_CARDS } from "./standard-gear";
import { SPECIAL_GEAR_CARDS } from "./special-gear";
import { VEHICLE_GEAR_CARDS } from "./vehicle-gear";
import { TOOL_GEAR_CARDS } from "./tool-gear";

// Log the card counts from each source for debugging
console.log(`Standard gear: ${STANDARD_GEAR_CARDS.length}, Special gear: ${SPECIAL_GEAR_CARDS.length}, Vehicle gear: ${VEHICLE_GEAR_CARDS.length}, Tool gear: ${TOOL_GEAR_CARDS.length}`);

// Combine all gear cards from different categories
export const ALL_GEAR_CARDS: GearCard[] = [
  ...STANDARD_GEAR_CARDS,
  ...SPECIAL_GEAR_CARDS,
  ...VEHICLE_GEAR_CARDS,
  ...TOOL_GEAR_CARDS
];

// Log total gear card count
console.log(`Combined ${ALL_GEAR_CARDS.length} total gear cards`);
