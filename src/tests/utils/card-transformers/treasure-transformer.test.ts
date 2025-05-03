
import { describe, test, expect, vi } from 'vitest';
import { transformTreasureCardData } from '@/utils/card-transformers/treasure-transformer';
import * as baseTransformer from '@/utils/card-transformers/base-transformer';

describe('Treasure Card Transformer', () => {
  test('should transform treasure card data with values', () => {
    const mockBaseData = { name: 'Test Treasure', icons: [], keywords: [], rules: [] };
    vi.spyOn(baseTransformer, 'transformBaseCardData').mockReturnValue(mockBaseData);
    
    const inputData = [{ 
      id: '1',
      title: 'Test Treasure',
      type: 'Treasure',
      icons: [],
      keywords: [],
      rules: '',
      flavor: '',
      image_prompt: '',
      value: 100,
      consumable: true
    }];
    
    const result = transformTreasureCardData(inputData);
    
    expect(result).toEqual([{
      ...mockBaseData,
      type: 'treasure',
      value: 100,
      consumable: true,
      name: 'Test Treasure'
    }]);
  });

  test('should provide default values if not provided', () => {
    const mockBaseData = { name: 'Test Treasure', icons: [], keywords: [], rules: [] };
    vi.spyOn(baseTransformer, 'transformBaseCardData').mockReturnValue(mockBaseData);
    
    const inputData = [{ 
      id: '1',
      title: 'Test Treasure',
      type: 'Treasure',
      icons: [],
      keywords: [],
      rules: '',
      flavor: '',
      image_prompt: ''
    }];
    
    const result = transformTreasureCardData(inputData);
    
    expect(result).toEqual([{
      ...mockBaseData,
      type: 'treasure',
      value: 0,
      consumable: false,
      name: 'Test Treasure'
    }]);
  });

  test('should provide default name if not in base data', () => {
    vi.spyOn(baseTransformer, 'transformBaseCardData').mockReturnValue({});
    
    const inputData = [{ 
      id: '1',
      title: '',
      type: 'Treasure',
      icons: [],
      keywords: [],
      rules: '',
      flavor: '',
      image_prompt: ''
    }];
    
    const result = transformTreasureCardData(inputData);
    
    expect(result[0].name).toBe('Unnamed Treasure');
    expect(result[0].type).toBe('treasure');
  });
});
