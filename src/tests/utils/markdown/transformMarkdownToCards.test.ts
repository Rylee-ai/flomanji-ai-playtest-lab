
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { transformMarkdownToCards } from '@/utils/markdown/transformMarkdownToCards';
import * as markdownParser from '@/utils/markdown/parseMarkdownCards';

// Mock the parser
vi.mock('@/utils/markdown/parseMarkdownCards', () => ({
  parseMarkdownCards: vi.fn()
}));

describe('Markdown Card Transformation', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  
  test('should transform markdown to cards with default type', () => {
    const mockCards = [
      { name: 'Card 1' },
      { name: 'Card 2', type: 'hazard' }
    ];
    
    vi.mocked(markdownParser.parseMarkdownCards).mockReturnValue(mockCards as any);
    
    const result = transformMarkdownToCards('# Markdown content', 'gear');
    
    expect(markdownParser.parseMarkdownCards).toHaveBeenCalledWith('# Markdown content');
    expect(result).toHaveLength(2);
    expect(result[0].type).toBe('gear'); // Default type applied
    expect(result[1].type).toBe('hazard'); // Existing type preserved
  });

  test('should set category for gear cards without category', () => {
    const mockCards = [
      { name: 'Card 1', type: 'gear' },
      { name: 'Card 2', type: 'gear', category: 'weapon' }
    ];
    
    vi.mocked(markdownParser.parseMarkdownCards).mockReturnValue(mockCards as any);
    
    const result = transformMarkdownToCards('# Markdown content', 'gear');
    
    expect(result[0].category).toBe('tool'); // Default category applied
    expect(result[1].category).toBe('weapon'); // Existing category preserved
  });

  test('should handle empty result from parser', () => {
    vi.mocked(markdownParser.parseMarkdownCards).mockReturnValue([] as any);
    
    const result = transformMarkdownToCards('# Empty content', 'treasure');
    
    expect(result).toEqual([]);
  });
});
