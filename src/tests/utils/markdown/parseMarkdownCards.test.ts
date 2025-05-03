
import { describe, test, expect, vi } from 'vitest';
import { parseMarkdownCards } from '@/utils/markdown/parseMarkdownCards';
import * as parseCardSectionModule from '@/utils/markdown/parseCardSection';
import * as alternateParserModule from '@/utils/markdown/parseMarkdownCardsAlternate';

vi.mock('@/utils/markdown/parseCardSection', () => ({
  parseCardSection: vi.fn()
}));

vi.mock('@/utils/markdown/parseMarkdownCardsAlternate', () => ({
  parseMarkdownCardsAlternate: vi.fn()
}));

describe('Markdown Cards Parser', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('should parse Flomanji format cards', () => {
    // Mock parseCardSection to return valid cards
    vi.mocked(parseCardSectionModule.parseCardSection).mockImplementation((title, content) => {
      return {
        id: `card-${title.toLowerCase().replace(/\s+/g, '-')}`,
        name: title,
        type: 'gear',
        keywords: [],
        rules: [],
        icons: []
      };
    });

    const markdown = `
* **Title:** First Card**
* **Type:** GEAR - Tool
* **Keywords:** test, card

* **Title:** Second Card**
* **Type:** HAZARD
* **Rules:** Test rules
`;

    const result = parseMarkdownCards(markdown);
    
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('First Card');
    expect(result[1].name).toBe('Second Card');
    
    // Verify parseCardSection was called properly
    expect(parseCardSectionModule.parseCardSection).toHaveBeenCalledTimes(2);
  });
  
  test('should parse numbered format cards', () => {
    // Mock parseCardSection to return valid cards
    vi.mocked(parseCardSectionModule.parseCardSection).mockImplementation((title, content) => {
      return {
        id: `card-${title.toLowerCase().replace(/\s+/g, '-')}`,
        name: title.replace(/^\d+\.\s+/, ''), // Remove number prefix
        type: 'gear',
        keywords: [],
        rules: [],
        icons: []
      };
    });

    const markdown = `
**1. First Card**
Type: GEAR - Tool
Keywords: test, card

**2. Second Card**
Type: HAZARD
Rules: Test rules
`;

    const result = parseMarkdownCards(markdown);
    
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('First Card');
    expect(result[1].name).toBe('Second Card');
  });
  
  test('should fall back to alternate parser when standard parsing fails', () => {
    // Make parseCardSection return null to simulate parsing failure
    vi.mocked(parseCardSectionModule.parseCardSection).mockReturnValue(null);
    
    // Set up alternate parser to return test cards
    const alternateCards = [
      { id: 'alt-1', name: 'Alt Card 1', type: 'gear', keywords: [], rules: [], icons: [] },
      { id: 'alt-2', name: 'Alt Card 2', type: 'hazard', keywords: [], rules: [], icons: [] }
    ];
    vi.mocked(alternateParserModule.parseMarkdownCardsAlternate).mockReturnValue(alternateCards as any);
    
    const markdown = "Some unparseable format";
    const result = parseMarkdownCards(markdown);
    
    expect(result).toEqual(alternateCards);
    expect(alternateParserModule.parseMarkdownCardsAlternate).toHaveBeenCalledWith(markdown);
  });
});
