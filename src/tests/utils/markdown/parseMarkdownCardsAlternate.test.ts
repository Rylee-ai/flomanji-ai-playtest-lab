
import { describe, test, expect, vi } from 'vitest';
import { parseMarkdownCardsAlternate } from '@/utils/markdown/parseMarkdownCardsAlternate';
import * as alternateParser from '@/utils/markdown/processors/alternateMarkdownParser';

vi.mock('@/utils/markdown/processors/alternateMarkdownParser', () => ({
  processMarkdownChunks: vi.fn()
}));

describe('Alternate Markdown Parser', () => {
  test('should process markdown content with alternate parser', () => {
    const mockCards = [
      { name: 'Card 1', type: 'gear', id: 'card-1' },
      { name: 'Card 2', type: 'treasure', id: 'card-2' }
    ];
    
    vi.mocked(alternateParser.processMarkdownChunks).mockReturnValue(mockCards as any);
    
    const markdown = "# Card 1\n\nType: GEAR\n\n# Card 2\n\nType: TREASURE";
    const result = parseMarkdownCardsAlternate(markdown);
    
    expect(alternateParser.processMarkdownChunks).toHaveBeenCalled();
    expect(result).toEqual(mockCards);
  });
});
