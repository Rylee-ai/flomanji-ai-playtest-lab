
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { detectFileFormat, isValidFileType } from '@/utils/file-format/fileFormatDetector';

// Mock Files for testing
const createMockFile = (name: string, content: string): File => {
  return new File([content], name, { type: name.endsWith('.json') ? 'application/json' : 'text/markdown' });
};

describe('File Format Detector', () => {
  describe('isValidFileType', () => {
    test('should return true for JSON files', () => {
      const file = createMockFile('cards.json', '{}');
      expect(isValidFileType(file)).toBe(true);
    });

    test('should return true for Markdown files', () => {
      const file = createMockFile('cards.md', '# Cards');
      expect(isValidFileType(file)).toBe(true);
    });

    test('should return false for other file types', () => {
      const file = createMockFile('cards.txt', 'text');
      expect(isValidFileType(file)).toBe(false);
    });
  });

  describe('detectFileFormat', () => {
    test('should detect markdown format for .md files', async () => {
      const file = createMockFile('cards.md', '# Cards');
      const result = await detectFileFormat(file);
      expect(result.format).toBe('markdown');
      expect(result.fileExtension).toBe('md');
    });

    test('should detect standard JSON format', async () => {
      const standardJson = JSON.stringify([
        { id: '1', name: 'Card 1', type: 'gear', keywords: [], icons: [], rules: [] }
      ]);
      const file = createMockFile('cards.json', standardJson);
      const result = await detectFileFormat(file);
      expect(result.format).toBe('json-standard');
      expect(result.fileExtension).toBe('json');
    });

    test('should detect transform JSON format with title field', async () => {
      const transformJson = JSON.stringify([
        { id: '1', title: 'Card 1', type: 'GEAR – Consumable', keywords: [], icons: [] }
      ]);
      const file = createMockFile('cards.json', transformJson);
      const result = await detectFileFormat(file);
      expect(result.format).toBe('json-transform');
      expect(result.fileExtension).toBe('json');
    });

    test('should detect transform JSON format with specific type values', async () => {
      const transformJson = JSON.stringify([
        { id: '1', name: 'Card 1', type: 'consumable', keywords: [], icons: [] }
      ]);
      const file = createMockFile('cards.json', transformJson);
      const result = await detectFileFormat(file);
      expect(result.format).toBe('json-transform');
      expect(result.fileExtension).toBe('json');
    });

    test('should return unknown format for invalid JSON', async () => {
      const file = createMockFile('invalid.json', 'not-json');
      const result = await detectFileFormat(file);
      expect(result.format).toBe('unknown');
      expect(result.fileExtension).toBe('json');
    });

    test('should return unknown format for unsupported file types', async () => {
      const file = createMockFile('cards.txt', 'text');
      const result = await detectFileFormat(file);
      expect(result.format).toBe('unknown');
      expect(result.fileExtension).toBe('txt');
    });
  });
});
