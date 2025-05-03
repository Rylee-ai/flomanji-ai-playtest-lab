
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { FileProcessingService } from '@/utils/file-processing/FileProcessingService';
import * as markdownUtils from '@/utils/markdown';
import * as cardImport from '@/utils/cardImport';
import * as cardTransformers from '@/utils/card-transformers';
import * as baseTransformer from '@/utils/card-transformers/base-transformer';

// Mock dependencies
vi.mock('@/utils/markdown', () => ({
  transformMarkdownToCards: vi.fn()
}));

vi.mock('@/utils/cardImport', () => ({
  processImportedCards: vi.fn()
}));

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

describe('FileProcessingService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('validateFile', () => {
    test('should validate JSON files correctly', () => {
      const file = createMockFile('cards.json', '{}');
      const result = FileProcessingService.validateFile(file);
      expect(result.valid).toBe(true);
    });

    test('should validate Markdown files correctly', () => {
      const file = createMockFile('cards.md', '# Cards');
      const result = FileProcessingService.validateFile(file);
      expect(result.valid).toBe(true);
    });

    test('should reject invalid file types', () => {
      const file = createMockFile('cards.txt', 'text');
      const result = FileProcessingService.validateFile(file);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Only JSON and Markdown files are supported');
    });

    test('should handle null or undefined files', () => {
      const result = FileProcessingService.validateFile(null as unknown as File);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('No file provided');
    });
  });

  describe('processFileContent', () => {
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

    test('should handle unknown file formats', async () => {
      const file = createMockFile('cards.unknown', 'content');
      const result = await FileProcessingService.processFileContent(
        file, 'gear', 'unknown'
      );
      
      expect(result.processedCards).toHaveLength(0);
      expect(result.errors).toContain('Unsupported file format. Please use JSON or Markdown files.');
    });

    test('should handle cards with missing required properties', async () => {
      // Create mock file and setup mocks
      const jsonContent = JSON.stringify([
        { type: 'gear' }, // Missing name
        { name: 'Card' }  // Missing type
      ]);
      const file = createMockFile('cards.json', jsonContent);
      const mockCards = [
        { type: 'gear' },
        { name: 'Card' }
      ];
      vi.mocked(cardImport.processImportedCards).mockReturnValue(mockCards as any);

      // Mock the file reading
      const originalText = File.prototype.text;
      File.prototype.text = vi.fn().mockResolvedValue(jsonContent);
      
      try {
        const result = await FileProcessingService.processFileContent(
          file, 'gear', 'json-standard'
        );
        
        expect(result.errors).toContain('Card #1: Missing name');
        expect(result.errors).toContain('Card #2: Missing type');
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
    
    test('should handle empty card arrays', async () => {
      // Create mock file and setup mocks
      const jsonContent = JSON.stringify([]);
      const file = createMockFile('cards.json', jsonContent);
      const mockCards: any[] = [];
      vi.mocked(cardImport.processImportedCards).mockReturnValue(mockCards);

      // Mock the file reading
      const originalText = File.prototype.text;
      File.prototype.text = vi.fn().mockResolvedValue(jsonContent);
      
      try {
        const result = await FileProcessingService.processFileContent(
          file, 'gear', 'json-standard'
        );
        
        expect(result.errors).toContain('No valid cards found in file. Please check the format and card type selection.');
      } finally {
        // Restore original method
        File.prototype.text = originalText;
      }
    });
    
    test('should handle JSON parsing errors', async () => {
      // Create mock file with invalid JSON
      const file = createMockFile('invalid.json', 'not json');

      // Mock the file reading to return invalid JSON
      const originalText = File.prototype.text;
      File.prototype.text = vi.fn().mockResolvedValue('not json');
      
      try {
        const result = await FileProcessingService.processFileContent(
          file, 'gear', 'json-standard'
        );
        
        expect(result.processedCards).toHaveLength(0);
        expect(result.errors[0]).toContain('Failed to process file:');
      } finally {
        // Restore original method
        File.prototype.text = originalText;
      }
    });
  });
});
