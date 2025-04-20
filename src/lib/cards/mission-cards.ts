
import { MissionSheet } from '@/types/cards/mission';

export const MISSION_CARDS: MissionSheet[] = [
  {
    id: "blood-tide",
    name: "Blood Tide",
    type: "mission",
    icons: [{ symbol: "🏖️", meaning: "Coastal" }, { symbol: "☣️", meaning: "Toxic" }],
    keywords: ["Escape", "Toxic", "Urgent"],
    hook: "Red tide turns deadly as something rises from the deep.",
    mapLayout: "3x3 grid",
    startingHeat: 3,
    objectives: [
      {
        description: "Collect 3 water samples",
        required: true,
        reward: "Draw 1 Treasure",
        difficultyLevel: 2,
        completionCheck: "Character must spend 1 action in a Water region and succeed on a Weirdness check (DC 6)"
      },
      {
        description: "Save all survivors",
        required: false,
        reward: "Reduce Heat by 2",
        difficultyLevel: 3,
        completionCheck: "All survivor tokens must be escorted to the Extraction point"
      }
    ],
    challenges: [
      {
        description: "Rising Tide - Water levels rise, making movement more difficult",
        frequency: "recurring",
        heatEffect: 1,
        weirdnessEffect: 0
      },
      {
        description: "Toxic Mist - A strange fog causes hallucinations",
        frequency: "triggered",
        trigger: "When Heat reaches 6",
        weirdnessEffect: 2
      }
    ],
    extractionRegion: "Research Lab",
    specialRules: ["Water contact causes +1 Weirdness", "Heat increases by 2 each round"],
    rules: ["Complete all required objectives and reach extraction"],
    flavor: "The waves glow an unnatural red under the setting sun.",
    imagePrompt: "Beach at sunset with crimson waves and dark shapes beneath the surface",
    scaling: {
      small: "Reduce required samples to 2",
      large: "Add 1 extra survivor to save"
    },
    recommendedPlayerCount: [2, 3, 4],
    estimatedDuration: 6,
    difficultyRating: 7
  },
  {
    id: "arcade-nightmares",
    name: "Arcade Nightmares",
    type: "mission",
    icons: [{ symbol: "🎮", meaning: "Arcade" }, { symbol: "👾", meaning: "Digital" }],
    keywords: ["Exploration", "Digital", "Containment"],
    hook: "Arcade machines come to life, trapping players in digital nightmares.",
    mapLayout: "2x3 grid with central hub",
    startingHeat: 2,
    objectives: [
      {
        description: "Power down the main server",
        required: true,
        reward: "All players reduce Weirdness by 1",
        difficultyLevel: 3,
        completionCheck: "Reach the Server Room and succeed on a Tech check (DC 7)"
      },
      {
        description: "Rescue trapped gamers",
        required: true,
        reward: "Each rescued gamer provides 1 Gear card",
        difficultyLevel: 2,
        completionCheck: "Find and free gamers from arcade machines with a Weird Sense check (DC 6)"
      },
      {
        description: "Collect high score tokens",
        required: false,
        reward: "+1 Luck for each token collected",
        difficultyLevel: 1,
        completionCheck: "Defeat arcade-themed hazards to collect tokens"
      }
    ],
    phases: [
      {
        name: "Power Fluctuation",
        description: "Lights flicker as arcade machines activate",
        objectives: [
          {
            description: "Locate the breaker box",
            required: true,
            reward: "Map revealed",
            difficultyLevel: 1
          }
        ],
        timeLimit: 2
      },
      {
        name: "Digital Invasion",
        description: "Pixel creatures emerge from the machines",
        objectives: [
          {
            description: "Contain the spread of digital entities",
            required: true,
            reward: "Prevent Heat increase for 1 round",
            difficultyLevel: 3
          }
        ],
        timeLimit: 3
      }
    ],
    challenges: [
      {
        description: "Reality Glitch - The environment shifts like a video game",
        frequency: "recurring",
        weirdnessEffect: 1
      },
      {
        description: "Final Boss - A massive digital entity appears",
        frequency: "triggered",
        trigger: "When main server is reached",
        heatEffect: 2
      }
    ],
    extractionRegion: "Arcade Entrance",
    specialRules: ["Digital items work as real gear", "Weirdness can be used to manipulate the digital environment"],
    rules: ["Power down the server and rescue trapped gamers before the digital world consumes reality"],
    flavor: "The neon lights of the arcade cast an eerie glow as pixels seep into the real world.",
    imagePrompt: "80s arcade with glowing machines and digital entities emerging from screens",
    scaling: {
      small: "Reduce required gamers to rescue to 2",
      large: "Add mini-boss encounters at each arcade machine"
    },
    recommendedPlayerCount: [3, 4],
    estimatedDuration: 5,
    difficultyRating: 6
  }
],

// Create a file to store mission analytics data
<lov-write file_path="src/lib/mission-analytics.ts">
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
