
// Handles game state creation and region setup logic
import { FlomanjiCharacter } from "@/types";
import { initializeGameState, Objective } from "@/types/game-state";
import { MissionSheet } from "@/types/cards/mission";
import { MISSION_CARDS } from "@/lib/cards/mission-cards";

export function findMissionById(missionId: string): MissionSheet | null {
  return MISSION_CARDS.find((m) => m.id === missionId) || null;
}

export function initializeRegions(missionData: MissionSheet | null, missionType: string): any[] {
  const defaultRegions = [
    { id: "start", name: "Starting Area", connections: ["path1"] },
    { id: "path1", name: "Path 1", connections: ["start", "path2"] },
    { id: "path2", name: "Path 2", connections: ["path1", "exit"] },
    { id: "exit", name: "Exit", connections: ["path2"] }
  ];

  if (!missionData) return defaultRegions;

  // TODO: Parse mission.mapLayout for real data in the future.
  return [
    { id: "start", name: "Starting Area", connections: ["region1"] },
    { id: "region1", name: `${missionData.name} Area 1`, connections: ["start", "region2"] },
    { id: "region2", name: `${missionData.name} Area 2`, connections: ["region1", "region3"] },
    { id: "region3", name: `${missionData.name} Area 3`, connections: ["region2", missionData.extractionRegion] },
    { id: missionData.extractionRegion, name: "Extraction Point", connections: ["region3"] }
  ];
}

export function createNewGame(
  missionId: string,
  missionType: string,
  characters: FlomanjiCharacter[],
  startingHeat: number,
  objectives: Objective[],
  maxRounds: number,
  extractionRegion: string
) {
  const missionData = findMissionById(missionId);
  const regions = initializeRegions(missionData, missionType);
  const gameState = initializeGameState(
    missionId,
    missionType,
    characters,
    startingHeat,
    objectives,
    maxRounds,
    extractionRegion
  );
  gameState.regions = regions;
  if (missionType === "escape") {
    gameState.heatIncreasePerTurn = 1;
  }
  return gameState;
}
