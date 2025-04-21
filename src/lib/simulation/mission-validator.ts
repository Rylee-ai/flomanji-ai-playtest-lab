
import { SimulationConfig } from "@/types";
import { MissionSheet } from "@/types/cards/mission";

/**
 * Validates if a player count is appropriate for a given mission
 */
export function validatePlayerCountForMission(
  playerCount: number,
  mission: MissionSheet
): { valid: boolean; message?: string } {
  // Solo missions require exactly 1 player
  if (mission.type === "solo" && playerCount !== 1) {
    return { valid: false, message: "Solo missions require exactly 1 player" };
  }

  // Check recommended player count if available
  if (mission.recommendedPlayerCount && mission.recommendedPlayerCount.length > 0) {
    if (!mission.recommendedPlayerCount.includes(playerCount)) {
      return {
        valid: false,
        message: `This mission is recommended for ${mission.recommendedPlayerCount.join(
          ", "
        )} players`
      };
    }
  }

  // General validation based on mission type
  if (playerCount < 1) {
    return { valid: false, message: "At least 1 player is required" };
  }

  if (playerCount > 6) {
    return { valid: false, message: "Maximum 6 players allowed" };
  }

  // Check mission-specific requirements
  switch (mission.type) {
    case "escort":
      if (playerCount < 2) {
        return { valid: false, message: "Escort missions require at least 2 players" };
      }
      break;
    case "boss":
      if (playerCount < 3) {
        return { valid: false, message: "Boss missions recommend at least 3 players" };
      }
      break;
    default:
      break;
  }

  return { valid: true };
}

/**
 * Gets the appropriate mission scaling based on player count
 */
export function getMissionScaling(playerCount: number, mission: MissionSheet): string {
  if (!mission.scaling) {
    return "";
  }

  // Use small group scaling for 1-3 players, large for 4-6
  return playerCount <= 3 ? mission.scaling.small : mission.scaling.large;
}

/**
 * Applies mission-specific configuration adjustments based on player count
 */
export function applyMissionScaling(
  config: SimulationConfig,
  mission: MissionSheet
): SimulationConfig {
  const newConfig = { ...config };
  const playerCount = config.players || 2;
  
  // Apply type-specific adjustments
  if (mission.type === "solo" && playerCount !== 1) {
    newConfig.players = 1;
  }
  
  // Apply heat scaling
  if (mission.scaling) {
    // For larger groups, increase starting heat by 1
    if (playerCount >= 4 && mission.startingHeat) {
      newConfig.startingHeat = mission.startingHeat + 1;
    } else {
      newConfig.startingHeat = mission.startingHeat;
    }
  }
  
  // Ensure mission type matches
  newConfig.missionType = playerCount === 1 ? "solo" : mission.type;
  
  // Set extraction region if applicable
  if (mission.extractionRegion) {
    newConfig.extractionRegion = mission.extractionRegion;
  }
  
  // Apply mission duration
  if (mission.estimatedDuration) {
    newConfig.rounds = mission.estimatedDuration;
  }
  
  return newConfig;
}
