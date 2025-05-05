
import { describe, test, expect } from 'vitest';
import { 
  extractTypeInfo,
  extractIconInfo,
  extractKeywordInfo,
  extractRulesInfo,
  extractFlavorInfo,
  extractImagePromptInfo
} from '@/utils/markdown/extractors/fieldExtractors';

describe('Field Extractors', () => {
  // Type extractor tests
  test('should extract gear type and category', () => {
    const content = '* **Type:** GEAR – Consumable';
    
    const result = extractTypeInfo(content);
    
    expect(result.type).toBe('gear');
  });
  
  test('should extract hazard type', () => {
    const content = '* **Type:** HAZARD';
    
    const result = extractTypeInfo(content);
    
    expect(result.type).toBe('hazard');
  });
  
  // Keyword extractor tests
  test('should extract keywords', () => {
    const content = '* **Keywords:** Test, Example, Card';
    
    const result = extractKeywordInfo(content);
    
    expect(result.keywords).toEqual(['Test', 'Example', 'Card']);
  });
  
  // Rules extractor tests
  test('should extract rules text', () => {
    const content = '* **Rules:** This is a test card with rules.';
    
    const result = extractRulesInfo(content);
    
    expect(result.rules).toEqual(['This is a test card with rules.']);
  });
  
  // Flavor extractor tests
  test('should extract flavor text', () => {
    const content = '* **Flavor:** A mysterious object with unknown origins.';
    
    const result = extractFlavorInfo(content);
    
    expect(result.flavor).toBe('A mysterious object with unknown origins.');
  });
  
  // Image prompt extractor tests
  test('should extract image prompt', () => {
    const content = '* **Image Prompt:** A glowing artifact on a dark background.';
    
    const result = extractImagePromptInfo(content);
    
    expect(result.imagePrompt).toBe('A glowing artifact on a dark background.');
  });
  
  // Icon extractor tests
  test('should extract icons with brackets', () => {
    const content = '* **Icon(s):** [Fire] [Water] [Wind]';
    
    const result = extractIconInfo(content);
    
    expect(result.icons).toEqual([
      { symbol: 'Fire', meaning: 'Fire' },
      { symbol: 'Water', meaning: 'Water' },
      { symbol: 'Wind', meaning: 'Wind' }
    ]);
  });
});
