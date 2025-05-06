
import { GearCard } from "@/types/cards/gear";
import { STANDARD_GEAR_CARDS } from "./standard-gear";
import { FLOMANJI_GEAR_CARDS } from "../flomanji-gear-cards";

// Combine all gear cards from different sources
export const ALL_GEAR_CARDS: GearCard[] = [
  ...STANDARD_GEAR_CARDS,
  ...FLOMANJI_GEAR_CARDS
];
