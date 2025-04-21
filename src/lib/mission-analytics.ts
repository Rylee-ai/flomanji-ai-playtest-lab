
import { MissionAnalytics, MissionRunData } from '@/types/cards/mission';

// Initial empty mission analytics store
export const MISSION_ANALYTICS: MissionAnalytics[] = [];

/**
 * Records a new mission run and updates analytics
 * @param runData The data from a completed mission run
 */
export const recordMissionRun = (runData: MissionRunData): void => {
  // Find existing mission analytics or create new
  let missionAnalytics = MISSION_ANALYTICS.find(a => a.missionId === runData.missionId);
  
  if (!missionAnalytics) {
    missionAnalytics = {
      missionId: runData.missionId,
      runs: [],
      aggregateStats: {
        successRate: 0,
        averageCompletionRounds: 0,
        objectiveCompletionRates: {},
        characterPerformance: {},
        averageHeatProgression: [],
        commonFailureCauses: []
      }
    };
    MISSION_ANALYTICS.push(missionAnalytics);
  }
  
  // Add the new run
  missionAnalytics.runs.push(runData);
  
  // Update aggregate stats
  updateMissionAggregateStats(missionAnalytics);
};

/**
 * Updates the aggregate statistics for a mission based on all runs
 * @param missionAnalytics The mission analytics object to update
 */
const updateMissionAggregateStats = (missionAnalytics: MissionAnalytics): void => {
  const { runs } = missionAnalytics;
  
  if (runs.length === 0) return;
  
  // Calculate success rate
  const successfulRuns = runs.filter(run => run.completed);
  missionAnalytics.aggregateStats.successRate = successfulRuns.length / runs.length;
  
  // Calculate average completion rounds
  missionAnalytics.aggregateStats.averageCompletionRounds = 
    successfulRuns.reduce((sum, run) => sum + run.rounds, 0) / 
    (successfulRuns.length || 1);
  
  // Calculate objective completion rates
  const objectiveCounts: Record<string, { completed: number, total: number }> = {};
  
  runs.forEach(run => {
    run.objectivesCompleted.forEach(objective => {
      if (!objectiveCounts[objective]) {
        objectiveCounts[objective] = { completed: 0, total: 0 };
      }
      objectiveCounts[objective].completed++;
      objectiveCounts[objective].total++;
    });
  });
  
  Object.keys(objectiveCounts).forEach(objective => {
    missionAnalytics.aggregateStats.objectiveCompletionRates[objective] = 
      objectiveCounts[objective].completed / objectiveCounts[objective].total;
  });
  
  // Additional analysis would go here for character performance, heat progression, etc.
};

/**
 * Gets analytics for a specific mission
 * @param missionId The ID of the mission
 * @returns The mission analytics or undefined if not found
 */
export const getMissionAnalytics = (missionId: string): MissionAnalytics | undefined => {
  return MISSION_ANALYTICS.find(a => a.missionId === missionId);
};

/**
 * Gets all mission analytics
 * @returns Array of all mission analytics
 */
export const getAllMissionAnalytics = (): MissionAnalytics[] => {
  return [...MISSION_ANALYTICS];
};
