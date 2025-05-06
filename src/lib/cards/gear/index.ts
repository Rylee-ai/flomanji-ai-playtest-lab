
import { GearCard } from "@/types/cards/gear";
import { STANDARD_GEAR_CARDS } from "./standard-gear";
import { SPECIAL_GEAR_CARDS } from "./special-gear";
import { VEHICLE_GEAR_CARDS } from "./vehicle-gear";
import { TOOL_GEAR_CARDS } from "./tool-gear";

// Combine all gear cards from different categories
export const ALL_GEAR_CARDS: GearCard[] = [
  ...STANDARD_GEAR_CARDS,
  ...SPECIAL_GEAR_CARDS,
  ...VEHICLE_GEAR_CARDS,
  ...TOOL_GEAR_CARDS
];
