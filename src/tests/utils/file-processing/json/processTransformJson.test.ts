
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { FileProcessingService } from '@/utils/file-processing/FileProcessingService';
import * as cardTransformers from '@/utils/card-transformers';
import * as baseTransformer from '@/utils/card-transformers/base-transformer';

// Mock dependencies
vi.mock('@/utils/card-transformers', () => ({
  transformCardData: vi.fn()
}));

vi.mock('@/utils/card-transformers/base-transformer', () => ({
  ensureCardIds: vi.fn(cards => cards)
}));

// Mock File creation helper
const createMockFile = (name: string, content: string): File => {
  return new File([content], name, { type: name.endsWith('.json') ? 'application/json' : 'text/markdown' });
};

describe('FileProcessingService - processTransformJson', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('should process transform JSON files', async () => {
    // Create mock file and setup mocks
    const jsonContent = JSON.stringify([{ title: 'Transform Card', type: 'GEAR' }]);
    const file = createMockFile('cards.json', jsonContent);
    const mockCards = [{ name: 'Transform Card', type: 'gear' }];
    vi.mocked(cardTransformers.transformCardData).mockReturnValue(mockCards as any);

    // Mock the file reading
    const originalText = File.prototype.text;
    File.prototype.text = vi.fn().mockResolvedValue(jsonContent);
    
    try {
      const result = await FileProcessingService.processFileContent(
        file, 'gear', 'json-transform'
      );
      
      expect(cardTransformers.transformCardData).toHaveBeenCalledWith(JSON.parse(jsonContent), 'gear');
      expect(result.processedCards).toEqual(mockCards);
      expect(result.errors).toHaveLength(0);
    } finally {
      // Restore original method
      File.prototype.text = originalText;
    }
  });
});
