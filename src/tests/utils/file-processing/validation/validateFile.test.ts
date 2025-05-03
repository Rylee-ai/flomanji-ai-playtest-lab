
import { describe, test, expect } from 'vitest';
import { FileProcessingService } from '@/utils/file-processing/FileProcessingService';

// Mock Files for testing
const createMockFile = (name: string, content: string): File => {
  return new File([content], name, { type: name.endsWith('.json') ? 'application/json' : 'text/markdown' });
};

describe('FileProcessingService - validateFile', () => {
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
