
// Export core rule components
export * from './core-rules-processor';
export * from './turn-manager';
export * from './heat-manager';
export * from './action-validator';
export * from './action-validations';
export * from './action-processors';

// Export the refactored game engine components
export * from './engine/game-engine';
export * from './engine/game-engine-factory';
export * from './engine/game-engine-types';
export * from './engine/action-service';
export * from './engine/state-service';
export * from './engine/region-service';
export * from './engine/objective-service';

// Re-export the singleton gameEngine instance for backward compatibility
export { gameEngine } from './engine/game-engine-factory';
