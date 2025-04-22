
import { getExampleRules as getExampleRulesImpl } from './rules-loader';

// Re-export with the same interface
export const getExampleRules = async (): Promise<string> => {
  return getExampleRulesImpl();
};

// Add any other API functions here
