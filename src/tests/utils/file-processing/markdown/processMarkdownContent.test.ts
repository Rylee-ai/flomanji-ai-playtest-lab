
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { FileProcessingService } from '@/utils/file-processing/FileProcessingService';
import * as markdownUtils from '@/utils/markdown';
import * as baseTransformer from '@/utils/card-transformers/base-transformer';

// Mock dependencies
vi.mock('@/utils/markdown', () => ({
  transformMarkdownToCards: vi.fn()
}));

vi.mock('@/utils/card-transformers/base-transformer', () => ({
  ensureCardIds: vi.fn(cards => cards)
}));

// Mock File creation helper
const createMockFile = (name: string, content: string): File => {
  return new File([content], name, { type: name.endsWith('.json') ? 'application/json' : 'text/markdown' });
};

describe('FileProcessingService - processMarkdownContent', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('should process markdown files', async () => {
    // Create mock file and setup mocks
    const file = createMockFile('cards.md', '# Card content');
    const mockCards = [{ name: 'Test Card', type: 'gear' }];
    vi.mocked(markdownUtils.transformMarkdownToCards).mockReturnValue(mockCards as any);

    // Mock the file reading
    const originalText = File.prototype.text;
    File.prototype.text = vi.fn().mockResolvedValue('# Card content');
    
    try {
      const result = await FileProcessingService.processFileContent(
        file, 'gear', 'markdown'
      );
      
      expect(markdownUtils.transformMarkdownToCards).toHaveBeenCalledWith('# Card content', 'gear');
      expect(baseTransformer.ensureCardIds).toHaveBeenCalledWith(mockCards, 'gear');
      expect(result.processedCards).toEqual(mockCards);
      expect(result.errors).toHaveLength(0);
    } finally {
      // Restore original method
      File.prototype.text = originalText;
    }
  });
});
