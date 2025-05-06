
import { FlomanjifiedRoleCard } from "@/types/cards/flomanjified";
import { log } from "@/utils/logging";

// Import card collections from individual files
import { governanceCards } from "./governance-cards";
import { natureCards } from "./nature-cards";
import { paranormalCards } from "./paranormal-cards";
import { weatherCards } from "./weather-cards";

// Combine all flomanjified cards into a single collection
export const FLOMANJIFIED_CARDS: FlomanjifiedRoleCard[] = [
  ...governanceCards,
  ...natureCards,
  ...paranormalCards,
  ...weatherCards
];

log.info(`Flomanjified cards initialized with ${FLOMANJIFIED_CARDS.length} role cards`);
