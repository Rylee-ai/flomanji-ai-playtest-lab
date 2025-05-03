
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { FileFormatService } from '@/utils/file-format/FileFormatService';

// Mock Files for testing
const createMockFile = (name: string, content: string): File => {
  return new File([content], name, { type: name.endsWith('.json') ? 'application/json' : 'text/markdown' });
};

describe('FileFormatService', () => {
  describe('isValidFileType', () => {
    test('should return true for JSON files', () => {
      const file = createMockFile('cards.json', '{}');
      expect(FileFormatService.isValidFileType(file)).toBe(true);
    });

    test('should return true for Markdown files', () => {
      const file = createMockFile('cards.md', '# Cards');
      expect(FileFormatService.isValidFileType(file)).toBe(true);
    });

    test('should return false for other file types', () => {
      const file = createMockFile('cards.txt', 'text');
      expect(FileFormatService.isValidFileType(file)).toBe(false);
    });
    
    test('should return false for null or undefined', () => {
      expect(FileFormatService.isValidFileType(undefined as unknown as File)).toBe(false);
      expect(FileFormatService.isValidFileType(null as unknown as File)).toBe(false);
    });
  });

  describe('detectFileFormat', () => {
    test('should detect markdown format for .md files', async () => {
      const file = createMockFile('cards.md', '# Cards');
      const result = await FileFormatService.detectFileFormat(file);
      expect(result.format).toBe('markdown');
      expect(result.fileExtension).toBe('md');
    });

    test('should detect standard JSON format', async () => {
      const standardJson = JSON.stringify([
        { id: '1', name: 'Card 1', type: 'gear', keywords: [], icons: [], rules: [] }
      ]);
      const file = createMockFile('cards.json', standardJson);
      const result = await FileFormatService.detectFileFormat(file);
      expect(result.format).toBe('json-standard');
      expect(result.fileExtension).toBe('json');
    });

    test('should detect transform JSON format with title field', async () => {
      const transformJson = JSON.stringify([
        { id: '1', title: 'Card 1', type: 'GEAR – Consumable', keywords: [], icons: [] }
      ]);
      const file = createMockFile('cards.json', transformJson);
      const result = await FileFormatService.detectFileFormat(file);
      expect(result.format).toBe('json-transform');
      expect(result.fileExtension).toBe('json');
    });

    test('should handle errors and return unknown format', async () => {
      const invalidFile = null as unknown as File;
      const result = await FileFormatService.detectFileFormat(invalidFile);
      expect(result.format).toBe('unknown');
    });

    test('should handle JSON parsing errors', async () => {
      // Mock a file with invalid JSON
      const file = createMockFile('invalid.json', 'not-json');
      
      // Mock the file.text() method to return the invalid content
      const originalText = File.prototype.text;
      File.prototype.text = vi.fn().mockResolvedValue('not-json');
      
      try {
        const result = await FileFormatService.detectFileFormat(file);
        expect(result.format).toBe('unknown');
      } finally {
        // Restore the original method
        File.prototype.text = originalText;
      }
    });
  });
});
