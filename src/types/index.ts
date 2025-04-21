
// Re-export all types from domain-specific modules
// This maintains backward compatibility while improving organization

// Simulation types
export * from './simulation/config';
export * from './simulation/result';

// Agent types
export * from './agent/message';
export * from './agent/config';

// User types
export * from './users/profile';
export * from './users/conversation';

// Character types
export * from './characters/character';
export * from './characters/stats';

// Waitlist types
export * from './waitlist/entry';

// Card types - export everything except TreasureCard to avoid duplicate export
export * from './cards';
export * from './cards/mission';
export * from './cards/npc';
export * from './cards/flomanjified';
export * from './cards/chaos';
export * from './cards/region';
export * from './cards/gear';
export * from './cards/player-character';
export * from './cards/hazard';

// Export TreasureCard from its specific file to avoid duplicate exports
// Using "export type" syntax as required by isolatedModules
export type { TreasureCard } from './cards/treasure';
