
import { FlomanjiCharacter } from "../characters/character";

export interface SimulationConfig {
  scenarioPrompt: string;
  rounds?: number;
  players?: number;
  enableCritic?: boolean;
  outputMode?: "full" | "summary";
  characters?: string[];
  fullCharacters?: FlomanjiCharacter[];
  missionId?: string;
  extractionRegion?: string;
  startingHeat?: number;
  heatPerRound?: number;
  objectives?: any[];
  missionType?: string;
  secretTraitor?: boolean;
  arcadeModule?: boolean;
  nightmareDifficulty?: boolean;
  competitiveMode?: boolean;
}
