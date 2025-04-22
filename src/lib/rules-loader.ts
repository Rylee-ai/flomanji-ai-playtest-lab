
import { readFileSync } from 'fs';
import { join } from 'path';
import { marked } from 'marked';

const RULES_DIRECTORY = join(__dirname, 'rules');

export const loadRulesSection = async (filename: string): Promise<string> => {
  try {
    const filePath = join(RULES_DIRECTORY, filename);
    const fileContent = readFileSync(filePath, 'utf-8');
    return marked(fileContent);
  } catch (error) {
    console.error(`Error loading rules section ${filename}:`, error);
    return '';
  }
};

export const getExampleRules = async (): Promise<string> => {
  // Handle client-side case first
  if (typeof window !== "undefined") {
    const savedRules = localStorage.getItem("flonaki-rules");
    if (savedRules) {
      return savedRules;
    }
  }

  // Combine rule sections
  const ruleSections = [
    'introduction.md',
    'creating-survivor.md',
    // Add more rule section files as they are created
  ];

  try {
    const rulesPromises = ruleSections.map(section => loadRulesSection(section));
    const loadedRules = await Promise.all(rulesPromises);
    return loadedRules.join('\n\n');
  } catch (error) {
    console.error("Error loading rules:", error);
    return "Unable to load rules content";
  }
};
