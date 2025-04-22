
import { readFileSync } from 'fs';
import { join } from 'path';
import { marked } from 'marked';

const RULES_DIRECTORY = join(__dirname, 'rules');

export const loadRulesSection = (filename: string): string => {
  try {
    const filePath = join(RULES_DIRECTORY, filename);
    const fileContent = readFileSync(filePath, 'utf-8');
    return marked(fileContent);
  } catch (error) {
    console.error(`Error loading rules section ${filename}:`, error);
    return '';
  }
};

export const getExampleRules = (): string => {
  const savedRules =
    typeof window !== "undefined"
      ? localStorage.getItem("flonaki-rules")
      : null;

  if (savedRules) {
    return savedRules;
  }

  // Combine rule sections
  const ruleSections = [
    'introduction.md',
    'creating-survivor.md',
    // Add more rule section files as they are created
  ];

  const combinedRules = ruleSections
    .map(section => loadRulesSection(section))
    .join('\n\n');

  return combinedRules;
};
