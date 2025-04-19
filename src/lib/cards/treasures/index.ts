
import { TreasureCard } from "@/types/cards";
import { STANDARD_TREASURES } from "./standard-treasures";
import { ARTIFACTS } from "./artifacts";
import { MISSION_TREASURES } from "./mission-treasures";
import { MINOR_TREASURES } from "./minor-treasures";

export const TREASURE_CARDS: TreasureCard[] = [
  ...STANDARD_TREASURES,
  ...ARTIFACTS,
  ...MISSION_TREASURES,
  ...MINOR_TREASURES
];
