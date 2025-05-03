
import { describe, test, expect } from 'vitest';
import { extractGearCategory, transformGearCardData } from '@/utils/card-transformers/gear-transformer';
import * as baseTransformer from '@/utils/card-transformers/base-transformer';

describe('Gear Card Transformer', () => {
  describe('extractGearCategory', () => {
    test('should extract consumable category', () => {
      expect(extractGearCategory('GEAR – Consumable')).toBe('consumable');
    });

    test('should extract weapon category', () => {
      expect(extractGearCategory('gear - weapon')).toBe('weapon');
    });

    test('should extract vehicle category', () => {
      expect(extractGearCategory('Gear: Vehicle')).toBe('vehicle');
    });

    test('should extract supply category', () => {
      expect(extractGearCategory('Supply gear')).toBe('supply');
    });

    test('should default to tool for unknown categories', () => {
      expect(extractGearCategory('Some unknown gear type')).toBe('tool');
    });
  });

  describe('transformGearCardData', () => {
    test('should transform gear card data with category', () => {
      const mockBaseData = { name: 'Test Gear', icons: [], keywords: [], rules: [] };
      vi.spyOn(baseTransformer, 'transformBaseCardData').mockReturnValue(mockBaseData);
      
      const inputData = [{ 
        id: '1',
        title: 'Test Gear',
        type: 'GEAR – Weapon',
        icons: [],
        keywords: [],
        rules: '',
        flavor: '',
        image_prompt: ''
      }];
      
      const result = transformGearCardData(inputData);
      
      expect(result).toEqual([{
        ...mockBaseData,
        type: 'gear',
        category: 'weapon',
        name: 'Test Gear'
      }]);
    });

    test('should provide default name if not in base data', () => {
      vi.spyOn(baseTransformer, 'transformBaseCardData').mockReturnValue({});
      
      const inputData = [{ 
        id: '1',
        title: '',
        type: 'GEAR',
        icons: [],
        keywords: [],
        rules: '',
        flavor: '',
        image_prompt: ''
      }];
      
      const result = transformGearCardData(inputData);
      
      expect(result[0].name).toBe('Unnamed Gear');
      expect(result[0].type).toBe('gear');
      expect(result[0].category).toBe('tool');
    });
  });
});
