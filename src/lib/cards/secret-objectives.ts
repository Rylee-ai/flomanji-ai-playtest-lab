
import { SecretObjectiveCard } from "@/types/cards";
import { loadCardsByType } from './loadMarkdownCards';

// Load secret objective cards from markdown files
export const SECRET_OBJECTIVES: SecretObjectiveCard[] = loadCardsByType<SecretObjectiveCard>('secret');
