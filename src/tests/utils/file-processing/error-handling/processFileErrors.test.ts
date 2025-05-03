
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { FileProcessingService } from '@/utils/file-processing/FileProcessingService';
import * as cardImport from '@/utils/cardImport';

// Mock dependencies
vi.mock('@/utils/cardImport', () => ({
  processImportedCards: vi.fn()
}));

// Mock File creation helper
const createMockFile = (name: string, content: string): File => {
  return new File([content], name, { type: name.endsWith('.json') ? 'application/json' : 'text/markdown' });
};

describe('FileProcessingService - Error Handling', () => {
  beforeEach(() => {
    vi.resetAllMocks();
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
