
// Import statements (no filesystem operations in browser)
import { marked } from 'marked';

// Define rule sections that will be loaded
const RULE_SECTIONS = [
  'introduction',
  'creating-survivor',
  // Add more rule section names as they are created
];

// Helper to fetch a rule section file
const fetchRuleSection = async (sectionName: string): Promise<string> => {
  try {
    // In a browser environment, we need to fetch the content instead of using fs
    const response = await fetch(`/rules/${sectionName}.md`);
    if (!response.ok) {
      console.error(`Failed to fetch rules section ${sectionName}: ${response.statusText}`);
      return '';
    }
    const text = await response.text();
    return marked(text);
  } catch (error) {
    console.error(`Error loading rules section ${sectionName}:`, error);
    return '';
  }
};

// Main function to get example rules
export const getExampleRules = async (): Promise<string> => {
  // Handle client-side case first
  if (typeof window !== "undefined") {
    const savedRules = localStorage.getItem("flonaki-rules");
    if (savedRules) {
      return savedRules;
    }
  }

  // Default rules content if we can't load sections
  let defaultRules = `# Flonaki Game Rules

## Introduction
Welcome to Flonaki, a collaborative storytelling game set in a post-apocalyptic Florida.

## Creating a Survivor
To create your survivor, choose a character card and record your starting stats.`;

  try {
    // Try to load rule sections from public directory
    const rulesPromises = RULE_SECTIONS.map(section => fetchRuleSection(section));
    const loadedRules = await Promise.all(rulesPromises);
    
    // Filter out any empty sections and join
    const validRules = loadedRules.filter(rule => rule.length > 0);
    
    // If we have valid rules, use them; otherwise use the default
    return validRules.length > 0 ? validRules.join('\n\n') : defaultRules;
  } catch (error) {
    console.error("Error loading rules:", error);
    return defaultRules;
  }
};

// This is just a stub for the other function that was defined
export const loadRulesSection = async (filename: string): Promise<string> => {
  try {
    return await fetchRuleSection(filename.replace('.md', ''));
  } catch (error) {
    console.error(`Error loading rules section ${filename}:`, error);
    return '';
  }
};
