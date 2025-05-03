
import { describe, test, expect } from 'vitest';
import {
  extractCardTitleFromChunk,
  isCardFieldChunk,
  detectCardTypeFromText,
  extractKeywordsFromText,
  extractRulesFromText,
  extractFlavorFromText,
  extractImagePromptFromText,
  extractIconsFromText
} from '@/utils/markdown/utils/alternateParserUtils';

describe('Alternate Parser Utils', () => {
  test('should extract title from chunk with Flomanji format', () => {
    const chunk = '* **Title:** Amazing Artifact**';
    const title = extractCardTitleFromChunk(chunk);
    expect(title).toBe('Amazing Artifact');
  });
  
  test('should extract title from numbered format', () => {
    const chunk = '**12. Dangerous Device**\nType: GEAR';
    const title = extractCardTitleFromChunk(chunk);
    expect(title).toBe('12. Dangerous Device');
  });
  
  test('should identify card field chunks', () => {
    expect(isCardFieldChunk('Type: GEAR')).toBe(true);
    expect(isCardFieldChunk('Keywords: test, example')).toBe(true);
    expect(isCardFieldChunk('Just some random text')).toBe(false);
  });
  
  test('should detect gear card type and category', () => {
    const { type, category } = detectCardTypeFromText('Type: GEAR - Consumable');
    expect(type).toBe('gear');
    expect(category).toBe('consumable');
  });
  
  test('should detect hazard card type', () => {
    const { type, category } = detectCardTypeFromText('Type: HAZARD');
    expect(type).toBe('hazard');
    expect(category).toBeUndefined();
  });
  
  test('should extract keywords from text', () => {
    const keywords = extractKeywordsFromText('Keywords: test, example, gear');
    expect(keywords).toEqual(['test', 'example', 'gear']);
  });
  
  test('should extract rules from text', () => {
    const rules = extractRulesFromText('Rules: This is a test rule.');
    expect(rules).toEqual(['This is a test rule.']);
  });
  
  test('should extract flavor text', () => {
    const flavor = extractFlavorFromText('Flavor: A mysterious object.');
    expect(flavor).toBe('A mysterious object.');
  });
  
  test('should extract image prompt', () => {
    const prompt = extractImagePromptFromText('Image prompt: A glowing artifact.');
    expect(prompt).toBe('A glowing artifact.');
  });
  
  test('should extract icons from text', () => {
    const icons = extractIconsFromText('Icon(s): [Fire] [Water]');
    expect(icons).toEqual([
      { symbol: 'Fire', meaning: 'Fire' },
      { symbol: 'Water', meaning: 'Water' }
    ]);
  });
});
