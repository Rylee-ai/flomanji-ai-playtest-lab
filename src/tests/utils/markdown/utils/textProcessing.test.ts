
import { describe, test, expect } from 'vitest';
import { normalizeText, generateCardId, validateCardMinimum } from '@/utils/markdown/utils/textProcessing';

describe('Text Processing Utils', () => {
  test('should normalize text', () => {
    const input = "Line 1\r\nLine 2\r\n\r\n\r\n\r\nLine 3   ";
    const expected = "Line 1\nLine 2\n\nLine 3";
    
    expect(normalizeText(input)).toBe(expected);
  });
  
  test('should generate card ID from name', () => {
    const cardName = "Test Card Name!";
    const id = generateCardId(cardName);
    
    expect(id).toContain('card-test-card-name-');
    expect(id.length).toBeGreaterThan(20); // ID should contain the UUID portion
  });
  
  test('should generate card ID for empty name', () => {
    const id = generateCardId("");
    
    expect(id).toContain('card-unnamed-');
  });
  
  test('should validate minimum card requirements', () => {
    const validCard = { name: 'Test Card', id: 'test-id' };
    const noName = { id: 'test-id' };
    const noId = { name: 'Test Card' };
    const emptyName = { name: '', id: 'test-id' };
    
    expect(validateCardMinimum(validCard)).toBe(true);
    expect(validateCardMinimum(noName)).toBe(false);
    expect(validateCardMinimum(noId)).toBe(false);
    expect(validateCardMinimum(emptyName)).toBe(false);
    expect(validateCardMinimum(null)).toBe(false);
  });
});
