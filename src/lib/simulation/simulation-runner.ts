
/**
 * Main export file for the simulation system
 */

// Re-export the main simulation engine function
export { startSimulation } from './core/simulationEngine';

// Re-export utility functions that may be needed elsewhere
export { initializeGameState, updateGameState } from './state/gameStateManager';

// Re-export game event utilities
export { processPlayerAction, detectItemUsage } from './game-events';

// Re-export dice utilities
export { simulateDiceRoll, drawRandomCard } from './dice-utils';
