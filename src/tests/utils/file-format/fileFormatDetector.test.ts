
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { detectFileFormat, isValidFileType } from '@/utils/file-format/fileFormatDetector';
import { FileFormatService } from '@/utils/file-format/FileFormatService';

// Spy on FileFormatService
vi.spyOn(FileFormatService, 'detectFileFormat');
vi.spyOn(FileFormatService, 'isValidFileType');

// Mock Files for testing
const createMockFile = (name: string, content: string): File => {
  return new File([content], name, { type: name.endsWith('.json') ? 'application/json' : 'text/markdown' });
};

describe('File Format Detector', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('isValidFileType', () => {
    test('should return true for JSON files', () => {
      const file = createMockFile('cards.json', '{}');
      
      // Setup the spy
      vi.mocked(FileFormatService.isValidFileType).mockReturnValue(true);
      
      expect(isValidFileType(file)).toBe(true);
      expect(FileFormatService.isValidFileType).toHaveBeenCalledWith(file);
    });

    test('should return true for Markdown files', () => {
      const file = createMockFile('cards.md', '# Cards');
      
      // Setup the spy
      vi.mocked(FileFormatService.isValidFileType).mockReturnValue(true);
      
      expect(isValidFileType(file)).toBe(true);
      expect(FileFormatService.isValidFileType).toHaveBeenCalledWith(file);
    });

    test('should return false for other file types', () => {
      const file = createMockFile('cards.txt', 'text');
      
      // Setup the spy
      vi.mocked(FileFormatService.isValidFileType).mockReturnValue(false);
      
      expect(isValidFileType(file)).toBe(false);
      expect(FileFormatService.isValidFileType).toHaveBeenCalledWith(file);
    });
  });

  describe('detectFileFormat', () => {
    test('should delegate to the FileFormatService', async () => {
      const file = createMockFile('cards.md', '# Cards');
      const expectedResult = { format: 'markdown' as const, fileExtension: 'md' };
      
      // Setup the spy
      vi.mocked(FileFormatService.detectFileFormat).mockResolvedValue(expectedResult);
      
      const result = await detectFileFormat(file);
      expect(result).toEqual(expectedResult);
      expect(FileFormatService.detectFileFormat).toHaveBeenCalledWith(file);
    });
  });
});
