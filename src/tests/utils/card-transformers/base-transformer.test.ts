
import { describe, test, expect } from 'vitest';
import { processIcons, transformBaseCardData } from '@/utils/card-transformers/base-transformer';

describe('Base Card Transformer', () => {
  describe('processIcons', () => {
    test('should process string icons', () => {
      const icons = ['Fire Icon', 'Water'];
      const processed = processIcons(icons);
      
      expect(processed).toEqual([
        { symbol: 'Fire', meaning: 'Fire' },
        { symbol: 'Water', meaning: 'Water' }
      ]);
    });

    test('should handle object icons', () => {
      const icons = [
        { symbol: 'Fire', meaning: 'Burning' },
        { symbol: 'Water', meaning: 'Flowing' }
      ];
      const processed = processIcons(icons);
      
      expect(processed).toEqual(icons);
    });

    test('should handle mixed icon formats', () => {
      const icons = [
        'Fire Icon',
        { symbol: 'Water', meaning: 'Flowing' }
      ];
      const processed = processIcons(icons);
      
      expect(processed).toEqual([
        { symbol: 'Fire', meaning: 'Fire' },
        { symbol: 'Water', meaning: 'Flowing' }
      ]);
    });

    test('should handle empty array', () => {
      const processed = processIcons([]);
      expect(processed).toEqual([]);
    });
  });

  describe('transformBaseCardData', () => {
    test('should transform basic card data', () => {
      const input = {
        id: '123',
        title: 'Test Card',
        type: 'gear',
        icons: ['Fire Icon'],
        keywords: ['keyword1', 'keyword2'],
        rules: 'These are the rules',
        flavor: 'Flavor text',
        image_prompt: 'Image description'
      };

      const result = transformBaseCardData(input);
      
      expect(result).toEqual({
        id: 'card-123',
        name: 'Test Card',
        icons: [{ symbol: 'Fire', meaning: 'Fire' }],
        keywords: ['keyword1', 'keyword2'],
        rules: ['These are the rules'],
        flavor: 'Flavor text',
        imagePrompt: 'Image description'
      });
    });

    test('should handle rules as array', () => {
      const input = {
        id: '123',
        title: 'Test Card',
        type: 'gear',
        icons: [],
        keywords: [],
        rules: ['Rule 1', 'Rule 2'],
        flavor: '',
        image_prompt: ''
      };

      const result = transformBaseCardData(input);
      
      expect(result.rules).toEqual(['Rule 1', 'Rule 2']);
    });

    test('should handle empty fields', () => {
      const input = {
        id: '123',
        title: 'Test Card',
        type: 'gear',
        icons: [],
        keywords: [],
        rules: '',
        flavor: '',
        image_prompt: ''
      };

      const result = transformBaseCardData(input);
      
      expect(result).toEqual({
        id: 'card-123',
        name: 'Test Card',
        icons: [],
        keywords: [],
        rules: [''],
        flavor: '',
        imagePrompt: ''
      });
    });
  });
});
