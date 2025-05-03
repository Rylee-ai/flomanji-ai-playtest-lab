
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { FileProcessingService } from '@/utils/file-processing/FileProcessingService';
import * as cardImport from '@/utils/cardImport';
import * as baseTransformer from '@/utils/card-transformers/base-transformer';

// Mock dependencies
vi.mock('@/utils/cardImport', () => ({
  processImportedCards: vi.fn()
}));

vi.mock('@/utils/card-transformers/base-transformer', () => ({
  ensureCardIds: vi.fn(cards => cards)
}));

// Mock File creation helper
const createMockFile = (name: string, content: string): File => {
  return new File([content], name, { type: name.endsWith('.json') ? 'application/json' : 'text/markdown' });
};

describe('FileProcessingService - processStandardJson', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('should process standard JSON files', async () => {
    // Create mock file and setup mocks
    const jsonContent = JSON.stringify([{ name: 'JSON Card', type: 'gear' }]);
    const file = createMockFile('cards.json', jsonContent);
    const mockCards = [{ name: 'JSON Card', type: 'gear' }];
    vi.mocked(cardImport.processImportedCards).mockReturnValue(mockCards as any);

    // Mock the file reading
    const originalText = File.prototype.text;
    File.prototype.text = vi.fn().mockResolvedValue(jsonContent);
    
    try {
      const result = await FileProcessingService.processFileContent(
        file, 'gear', 'json-standard'
      );
      
      expect(cardImport.processImportedCards).toHaveBeenCalledWith(JSON.parse(jsonContent), 'gear');
      expect(result.processedCards).toEqual(mockCards);
      expect(result.errors).toHaveLength(0);
    } finally {
      // Restore original method
      File.prototype.text = originalText;
    }
  });

  test('should auto-assign tool category for gear cards without category', async () => {
    // Create mock file and setup mocks
    const jsonContent = JSON.stringify([{ name: 'Gear Card', type: 'gear' }]);
    const file = createMockFile('cards.json', jsonContent);
    const mockCards = [{ name: 'Gear Card', type: 'gear' }];
    vi.mocked(cardImport.processImportedCards).mockReturnValue(mockCards as any);

    // Mock the file reading
    const originalText = File.prototype.text;
    File.prototype.text = vi.fn().mockResolvedValue(jsonContent);
    
    try {
      const result = await FileProcessingService.processFileContent(
        file, 'gear', 'json-standard'
      );
      
      expect(result.processedCards[0].category).toBe('tool');
    } finally {
      // Restore original method
      File.prototype.text = originalText;
    }
  });
});
