
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { transformCardData } from '@/utils/card-transformers/transform-card-data';
import * as gearTransformer from '@/utils/card-transformers/gear-transformer';
import * as treasureTransformer from '@/utils/card-transformers/treasure-transformer';
import * as hazardTransformer from '@/utils/card-transformers/hazard-transformer';
import * as regionTransformer from '@/utils/card-transformers/region-transformer';
import * as npcTransformer from '@/utils/card-transformers/npc-transformer';
import * as chaosTransformer from '@/utils/card-transformers/chaos-transformer';
import * as flomanjifiedTransformer from '@/utils/card-transformers/flomanjified-transformer';
import * as secretTransformer from '@/utils/card-transformers/secret-transformer';
import * as automaTransformer from '@/utils/card-transformers/automa-transformer';
import * as playerCharacterTransformer from '@/utils/card-transformers/player-character-transformer';
import * as missionTransformer from '@/utils/card-transformers/mission-transformer';

// Mock all transformer modules
vi.mock('@/utils/card-transformers/gear-transformer', () => ({
  transformGearCardData: vi.fn()
}));
vi.mock('@/utils/card-transformers/treasure-transformer', () => ({
  transformTreasureCardData: vi.fn()
}));
vi.mock('@/utils/card-transformers/hazard-transformer', () => ({
  transformHazardCardData: vi.fn()
}));
vi.mock('@/utils/card-transformers/region-transformer', () => ({
  transformRegionCardData: vi.fn()
}));
vi.mock('@/utils/card-transformers/npc-transformer', () => ({
  transformNPCCardData: vi.fn()
}));
vi.mock('@/utils/card-transformers/chaos-transformer', () => ({
  transformChaosCardData: vi.fn()
}));
vi.mock('@/utils/card-transformers/flomanjified-transformer', () => ({
  transformFlomanjifiedCardData: vi.fn()
}));
vi.mock('@/utils/card-transformers/secret-transformer', () => ({
  transformSecretCardData: vi.fn()
}));
vi.mock('@/utils/card-transformers/automa-transformer', () => ({
  transformAutomaCardData: vi.fn()
}));
vi.mock('@/utils/card-transformers/player-character-transformer', () => ({
  transformPlayerCharacterCardData: vi.fn()
}));
vi.mock('@/utils/card-transformers/mission-transformer', () => ({
  transformMissionCardData: vi.fn()
}));

describe('Transform Card Data', () => {
  const mockJsonData = [{ id: 1, title: 'Card' }];
  const mockResult = [{ name: 'Transformed Card', type: 'gear' }];
  
  beforeEach(() => {
    vi.resetAllMocks();
  });
  
  test('should throw error for empty data', () => {
    expect(() => {
      transformCardData([], 'gear');
    }).toThrow('Invalid or empty JSON data provided for transformation');
  });
  
  test('should throw error for non-array data', () => {
    expect(() => {
      transformCardData({} as any, 'gear');
    }).toThrow('Invalid or empty JSON data provided for transformation');
  });

  test('should transform gear cards', () => {
    vi.mocked(gearTransformer.transformGearCardData).mockReturnValue(mockResult as any);
    const result = transformCardData(mockJsonData, 'gear');
    expect(gearTransformer.transformGearCardData).toHaveBeenCalledWith(mockJsonData);
    expect(result).toEqual(mockResult);
  });

  test('should transform treasure cards', () => {
    vi.mocked(treasureTransformer.transformTreasureCardData).mockReturnValue(mockResult as any);
    const result = transformCardData(mockJsonData, 'treasure');
    expect(treasureTransformer.transformTreasureCardData).toHaveBeenCalledWith(mockJsonData);
    expect(result).toEqual(mockResult);
  });

  test('should transform artifact cards (using treasure transformer)', () => {
    vi.mocked(treasureTransformer.transformTreasureCardData).mockReturnValue(mockResult as any);
    const result = transformCardData(mockJsonData, 'artifact');
    expect(treasureTransformer.transformTreasureCardData).toHaveBeenCalledWith(mockJsonData);
    expect(result).toEqual(mockResult);
  });

  test('should transform hazard cards', () => {
    vi.mocked(hazardTransformer.transformHazardCardData).mockReturnValue(mockResult as any);
    const result = transformCardData(mockJsonData, 'hazard');
    expect(hazardTransformer.transformHazardCardData).toHaveBeenCalledWith(mockJsonData);
    expect(result).toEqual(mockResult);
  });

  test('should transform region cards', () => {
    vi.mocked(regionTransformer.transformRegionCardData).mockReturnValue(mockResult as any);
    const result = transformCardData(mockJsonData, 'region');
    expect(regionTransformer.transformRegionCardData).toHaveBeenCalledWith(mockJsonData);
    expect(result).toEqual(mockResult);
  });

  test('should transform npc cards', () => {
    vi.mocked(npcTransformer.transformNPCCardData).mockReturnValue(mockResult as any);
    const result = transformCardData(mockJsonData, 'npc');
    expect(npcTransformer.transformNPCCardData).toHaveBeenCalledWith(mockJsonData);
    expect(result).toEqual(mockResult);
  });

  test('should transform chaos cards', () => {
    vi.mocked(chaosTransformer.transformChaosCardData).mockReturnValue(mockResult as any);
    const result = transformCardData(mockJsonData, 'chaos');
    expect(chaosTransformer.transformChaosCardData).toHaveBeenCalledWith(mockJsonData);
    expect(result).toEqual(mockResult);
  });

  test('should transform flomanjified cards', () => {
    vi.mocked(flomanjifiedTransformer.transformFlomanjifiedCardData).mockReturnValue(mockResult as any);
    const result = transformCardData(mockJsonData, 'flomanjified');
    expect(flomanjifiedTransformer.transformFlomanjifiedCardData).toHaveBeenCalledWith(mockJsonData);
    expect(result).toEqual(mockResult);
  });

  test('should transform secret cards', () => {
    vi.mocked(secretTransformer.transformSecretCardData).mockReturnValue(mockResult as any);
    const result = transformCardData(mockJsonData, 'secret');
    expect(secretTransformer.transformSecretCardData).toHaveBeenCalledWith(mockJsonData);
    expect(result).toEqual(mockResult);
  });

  test('should transform automa cards', () => {
    vi.mocked(automaTransformer.transformAutomaCardData).mockReturnValue(mockResult as any);
    const result = transformCardData(mockJsonData, 'automa');
    expect(automaTransformer.transformAutomaCardData).toHaveBeenCalledWith(mockJsonData);
    expect(result).toEqual(mockResult);
  });

  test('should transform player-character cards', () => {
    vi.mocked(playerCharacterTransformer.transformPlayerCharacterCardData).mockReturnValue(mockResult as any);
    const result = transformCardData(mockJsonData, 'player-character');
    expect(playerCharacterTransformer.transformPlayerCharacterCardData).toHaveBeenCalledWith(mockJsonData);
    expect(result).toEqual(mockResult);
  });

  test('should transform mission cards (all mission types)', () => {
    vi.mocked(missionTransformer.transformMissionCardData).mockReturnValue(mockResult as any);
    
    const missionTypes = ['mission', 'exploration', 'escape', 'escort', 'collection', 'boss', 'solo'];
    
    missionTypes.forEach(type => {
      const result = transformCardData(mockJsonData, type);
      expect(missionTransformer.transformMissionCardData).toHaveBeenCalledWith(mockJsonData);
      expect(result).toEqual(mockResult);
    });
  });

  test('should throw error for unsupported card type', () => {
    expect(() => {
      transformCardData(mockJsonData, 'invalid-type' as any);
    }).toThrow('Unsupported card type: invalid-type');
  });

  test('should handle transformation errors', () => {
    vi.mocked(gearTransformer.transformGearCardData).mockImplementation(() => {
      throw new Error('Transformation failed');
    });
    
    expect(() => {
      transformCardData(mockJsonData, 'gear');
    }).toThrow('Failed to transform card data: Transformation failed');
  });
});
