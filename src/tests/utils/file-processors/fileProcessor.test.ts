
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { processFileContent, validateFile } from '@/utils/file-processors/fileProcessor';
import * as markdownUtils from '@/utils/markdown';
import * as cardImport from '@/utils/cardImport';
import * as cardTransformers from '@/utils/card-transformers';

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

// Mock File creation helper
const createMockFile = (name: string, content: string): File => {
  return new File([content], name, { type: name.endsWith('.json') ? 'application/json' : 'text/markdown' });
};

describe('File Processor', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('validateFile', () => {
    test('should return valid for JSON files', () => {
      const file = createMockFile('cards.json', '{}');
      const result = validateFile(file);
      expect(result.valid).toBe(true);
    });

    test('should return valid for MD files', () => {
      const file = createMockFile('cards.md', '# Cards');
      const result = validateFile(file);
      expect(result.valid).toBe(true);
    });

    test('should return invalid for other file types', () => {
      const file = createMockFile('cards.txt', 'content');
      const result = validateFile(file);
      expect(result.valid).toBe(false);
      expect(result.error).toBe("Only JSON and Markdown files are supported");
    });

    test('should return invalid when no file is provided', () => {
      const result = validateFile(undefined as unknown as File);
      expect(result.valid).toBe(false);
      expect(result.error).toBe("No file provided");
    });
  });

  describe('processFileContent', () => {
    test('should process markdown file correctly', async () => {
      const mockCards = [{ name: 'Markdown Card', type: 'gear' }];
      vi.mocked(markdownUtils.transformMarkdownToCards).mockReturnValue(mockCards as any);
      
      const file = createMockFile('cards.md', '# Cards');
      const result = await processFileContent(file, 'gear', 'markdown');
      
      expect(markdownUtils.transformMarkdownToCards).toHaveBeenCalledWith('# Cards', 'gear');
      expect(result.processedCards).toEqual(mockCards);
      expect(result.errors).toHaveLength(0);
    });

    test('should process standard JSON file correctly', async () => {
      const mockCards = [{ name: 'JSON Card', type: 'gear' }];
      vi.mocked(cardImport.processImportedCards).mockReturnValue(mockCards as any);
      
      const jsonContent = JSON.stringify([{ name: 'JSON Card', type: 'gear' }]);
      const file = createMockFile('cards.json', jsonContent);
      const result = await processFileContent(file, 'gear', 'json-standard');
      
      expect(cardImport.processImportedCards).toHaveBeenCalledWith(JSON.parse(jsonContent), 'gear');
      expect(result.processedCards).toEqual(mockCards);
      expect(result.errors).toHaveLength(0);
    });

    test('should process transform JSON file correctly', async () => {
      const mockCards = [{ name: 'Transform Card', type: 'gear' }];
      vi.mocked(cardTransformers.transformCardData).mockReturnValue(mockCards as any);
      
      const jsonContent = JSON.stringify([{ title: 'Transform Card', type: 'GEAR' }]);
      const file = createMockFile('cards.json', jsonContent);
      const result = await processFileContent(file, 'gear', 'json-transform');
      
      expect(cardTransformers.transformCardData).toHaveBeenCalledWith(JSON.parse(jsonContent), 'gear');
      expect(result.processedCards).toEqual(mockCards);
      expect(result.errors).toHaveLength(0);
    });

    test('should return error for unknown file format', async () => {
      const file = createMockFile('cards.json', '{}');
      const result = await processFileContent(file, 'gear', 'unknown');
      
      expect(result.processedCards).toHaveLength(0);
      expect(result.errors).toContain("Unsupported file format. Please use JSON or Markdown files.");
    });

    test('should validate cards and report missing properties', async () => {
      const mockCards = [
        { type: 'gear' }, // Missing name
        { name: 'Card' }  // Missing type
      ];
      vi.mocked(cardImport.processImportedCards).mockReturnValue(mockCards as any);
      
      const file = createMockFile('cards.json', '{}');
      const result = await processFileContent(file, 'gear', 'json-standard');
      
      expect(result.errors).toContain("Card #1: Missing name");
      expect(result.errors).toContain("Card #2: Missing type");
    });

    test('should handle errors during processing', async () => {
      vi.mocked(cardImport.processImportedCards).mockImplementation(() => {
        throw new Error("Processing error");
      });
      
      const file = createMockFile('cards.json', '{}');
      const result = await processFileContent(file, 'gear', 'json-standard');
      
      expect(result.processedCards).toHaveLength(0);
      expect(result.errors[0]).toContain("Failed to process file");
    });
  });
});
