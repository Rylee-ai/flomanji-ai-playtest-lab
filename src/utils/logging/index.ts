
// Export the logger utility
export * from './LogManager';

// Re-export a simplified API for common usage
import { logger } from './LogManager';

// Simplified logging API
export const log = {
  debug: (message: string, details?: any) => logger.debug(message, details),
  info: (message: string, details?: any) => logger.info(message, details),
  warn: (message: string, details?: any) => logger.warn(message, details),
  error: (message: string, details?: any) => logger.error(message, details),
  getAll: () => logger.getLogs(),
  getSession: () => logger.getCurrentSessionLogs(),
  clearAll: () => logger.clearLogs(),
  recordGitExclusion: (pattern: string) => logger.recordGitExclusion(pattern)
};
