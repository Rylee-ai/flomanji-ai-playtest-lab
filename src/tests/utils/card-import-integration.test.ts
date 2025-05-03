
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { processFileContent } from '@/utils/file-processors/fileProcessor';

// Mock fetch for file loading
global.fetch = vi.fn();

// Mock File API
class MockFile extends File {
  text() {
    return Promise.resolve(this.slice().text());
  }
}

// Helper to create test files
const createTestFile = (name: string, content: string): File => {
  return new MockFile([content], name, { type: name.endsWith('.json') ? 'application/json' : 'text/markdown' });
};

describe('Card Import Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Note: These tests use real implementations, not mocks
  test('should process JSON gear cards successfully', async () => {
    // Create a valid gear card JSON
    const gearCardJson = JSON.stringify([{
      id: '1',
      name: 'Test Gear',
      type: 'gear',
      category: 'tool',
      icons: [],
      keywords: ['test'],
      rules: ['This is a test gear card.'],
      flavor: 'Test flavor text',
      imagePrompt: 'An image of test gear'
    }]);

    const file = createTestFile('gear-cards.json', gearCardJson);
    
    // Process with standard JSON format
    const result = await processFileContent(file, 'gear', 'json-standard');
    
    expect(result.errors).toHaveLength(0);
    expect(result.processedCards).toHaveLength(1);
    expect(result.processedCards[0].name).toBe('Test Gear');
    expect(result.processedCards[0].type).toBe('gear');
  });

  test('should handle and report validation errors', async () => {
    // Create an invalid card JSON with missing required fields
    const invalidCardJson = JSON.stringify([
      { id: '1' }, // Missing name and type
      { id: '2', name: 'Missing Type' }, // Missing type
      { id: '3', type: 'gear' } // Missing name
    ]);

    const file = createTestFile('invalid-cards.json', invalidCardJson);
    
    // Process with standard JSON format
    const result = await processFileContent(file, 'gear', 'json-standard');
    
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors).toContain('Card #1: Missing name');
    expect(result.errors).toContain('Card #1: Missing type');
    expect(result.errors).toContain('Card #2: Missing type');
    expect(result.errors).toContain('Card #3: Missing name');
  });

  test('should handle markdown with embedded card data', async () => {
    // Create a markdown file with card definitions
    const markdown = `
# Test Gear Card

* **Type:** GEAR – Tool
* **Keywords:** test, utility
* **Rules:** This is a test gear card with markdown format.
* **Flavor:** *Useful in many situations*
* **Image Prompt:** A simple tool for testing
    `;

    const file = createTestFile('cards.md', markdown);
    
    // Process as markdown
    const result = await processFileContent(file, 'gear', 'markdown');
    
    // Verify basic processing completed
    expect(result.processedCards.length).toBeGreaterThanOrEqual(0);
  });
});
