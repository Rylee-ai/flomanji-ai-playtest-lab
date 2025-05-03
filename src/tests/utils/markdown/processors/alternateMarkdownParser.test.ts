
import { describe, test, expect } from 'vitest';
import { 
  finalizeCardFromBuffer,
  isNewCardStart, 
  processMarkdownChunks 
} from '@/utils/markdown/processors/alternateMarkdownParser';

describe('Alternate Markdown Parser Processor', () => {
  test('should identify new card start with Flomanji format', () => {
    const chunk = '* **Title:** Test Card**';
    expect(isNewCardStart(chunk)).toBe(true);
  });
  
  test('should identify new card start with numbered format', () => {
    const chunk = '**1. Test Card**';
    expect(isNewCardStart(chunk)).toBe(true);
    
    const plainChunk = '2. Test Card';
    expect(isNewCardStart(plainChunk)).toBe(true);
  });
  
  test('should not identify regular text as card start', () => {
    const chunk = 'This is just some text';
    expect(isNewCardStart(chunk)).toBe(false);
  });
  
  test('should finalize card from buffer with gear type', () => {
    const currentCard = { 
      name: 'Test Gear', 
      id: 'card-test-gear' 
    };
    
    const cardContentBuffer = [
      '* **Title:** Test Gear**',
      'Type: GEAR - Consumable',
      'Keywords: test, consumable',
      'Rules: Test rule text.',
      'Flavor: Test flavor text.',
      'Image Prompt: A test image.'
    ];
    
    const result = finalizeCardFromBuffer(currentCard, cardContentBuffer);
    
    expect(result).toMatchObject({
      name: 'Test Gear',
      id: 'card-test-gear',
      type: 'gear',
      category: 'consumable',
      keywords: ['test', 'consumable'],
      rules: ['Test rule text.'],
      flavor: 'Test flavor text.',
      imagePrompt: 'A test image.'
    });
  });
  
  test('should process multiple chunks into cards', () => {
    const chunks = [
      '* **Title:** Card One**',
      'Type: GEAR - Tool',
      'Keywords: tool, useful',
      
      '* **Title:** Card Two**',
      'Type: HAZARD',
      'Rules: Dangerous effect.'
    ];
    
    const results = processMarkdownChunks(chunks);
    
    expect(results).toHaveLength(2);
    expect(results[0].name).toBe('Card One');
    expect(results[0].type).toBe('gear');
    expect(results[0].category).toBe('tool');
    
    expect(results[1].name).toBe('Card Two');
    expect(results[1].type).toBe('hazard');
  });
});
