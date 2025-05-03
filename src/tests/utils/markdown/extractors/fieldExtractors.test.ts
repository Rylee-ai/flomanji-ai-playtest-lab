
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
  test('should extract gear type and category', () => {
    const content = '* **Type:** GEAR – Consumable';
    const card = {};
    
    const result = extractTypeInfo(content, card);
    
    expect(result.type).toBe('gear');
    expect(result.category).toBe('consumable');
  });
  
  test('should extract hazard type', () => {
    const content = '* **Type:** HAZARD';
    const card = {};
    
    const result = extractTypeInfo(content, card);
    
    expect(result.type).toBe('hazard');
    expect(result.category).toBeUndefined();
  });
  
  test('should extract keywords', () => {
    const content = '* **Keywords:** Test, Example, Card';
    const card = {};
    
    const result = extractKeywordInfo(content, card);
    
    expect(result.keywords).toEqual(['Test', 'Example', 'Card']);
  });
  
  test('should extract rules text', () => {
    const content = '* **Rules:** This is a test card with rules.';
    const card = {};
    
    const result = extractRulesInfo(content, card);
    
    expect(result.rules).toEqual(['This is a test card with rules.']);
  });
  
  test('should extract flavor text', () => {
    const content = '* **Flavor:** A mysterious object with unknown origins.';
    const card = {};
    
    const result = extractFlavorInfo(content, card);
    
    expect(result.flavor).toBe('A mysterious object with unknown origins.');
  });
  
  test('should extract image prompt', () => {
    const content = '* **Image Prompt:** A glowing artifact on a dark background.';
    const card = {};
    
    const result = extractImagePromptInfo(content, card);
    
    expect(result.imagePrompt).toBe('A glowing artifact on a dark background.');
  });
  
  test('should extract icons with brackets', () => {
    const content = '* **Icon(s):** [Fire] [Water] [Wind]';
    const card = {};
    
    const result = extractIconInfo(content, card);
    
    expect(result.icons).toEqual([
      { symbol: 'Fire', meaning: 'Fire' },
      { symbol: 'Water', meaning: 'Water' },
      { symbol: 'Wind', meaning: 'Wind' }
    ]);
  });
});
