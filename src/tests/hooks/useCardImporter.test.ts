
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCardImporter } from '@/components/admin/import/hooks/useCardImporter';
import { useFileProcessor } from '@/components/admin/import/hooks/useFileProcessor';
import { useCardImportResults } from '@/components/admin/import/hooks/useCardImportResults';
import { useAICardProcessing } from '@/components/admin/import/hooks/useAICardProcessing';
import { CardFormValues } from '@/types/forms/card-form';

// Mock the dependent hooks
vi.mock('@/components/admin/import/hooks/useFileProcessor', () => ({
  useFileProcessor: vi.fn()
}));

vi.mock('@/components/admin/import/hooks/useCardImportResults', () => ({
  useCardImportResults: vi.fn()
}));

vi.mock('@/components/admin/import/hooks/useCardImportConfig', () => ({
  useCardImportConfig: vi.fn().mockReturnValue({
    cardType: 'gear',
    setCardType: vi.fn()
  })
}));

vi.mock('@/components/admin/import/hooks/useAICardProcessing', () => ({
  useAICardProcessing: vi.fn()
}));

describe('useCardImporter', () => {
  const mockOnImportComplete = vi.fn();
  const mockProcessFile = vi.fn();
  const mockAnalyzeFile = vi.fn();
  const mockSetTransformedCards = vi.fn();
  const mockSetValidationErrors = vi.fn();
  const mockSetImportResults = vi.fn();
  const mockCreateImportResults = vi.fn();
  const mockResetResults = vi.fn();
  const mockProcessCardsWithAI = vi.fn();
  const mockResetAIProcessing = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    
    // Mock useFileProcessor implementation
    vi.mocked(useFileProcessor).mockReturnValue({
      isProcessing: false,
      fileFormat: null,
      fileExtension: null,
      analyzeFile: mockAnalyzeFile,
      processFile: mockProcessFile
    });
    
    // Mock useCardImportResults implementation
    vi.mocked(useCardImportResults).mockReturnValue({
      transformedCards: [],
      setTransformedCards: mockSetTransformedCards,
      validationErrors: [],
      setValidationErrors: mockSetValidationErrors,
      importResults: null,
      setImportResults: mockSetImportResults,
      createImportResults: mockCreateImportResults.mockReturnValue({ imported: 0, updated: 0, failed: 0, errors: [] }),
      resetResults: mockResetResults
    });
    
    // Mock useAICardProcessing implementation
    vi.mocked(useAICardProcessing).mockReturnValue({
      isProcessing: false,
      suggestions: [],
      enhancedCards: [],
      originalCards: [],
      processCardsWithAI: mockProcessCardsWithAI,
      applySuggestion: vi.fn().mockReturnValue([]),
      resetAIProcessing: mockResetAIProcessing
    });
  });

  it('should process file without AI when enableAIProcessing is false', async () => {
    const mockFile = new File(['test'], 'test.md');
    const mockProcessedCards = [{ name: "Card", type: "gear" } as CardFormValues];
    const mockErrors: string[] = [];

    mockProcessFile.mockResolvedValue({ processedCards: mockProcessedCards, errors: mockErrors });
    
    const { result } = renderHook(() => useCardImporter({ 
      onImportComplete: mockOnImportComplete,
      initialCardType: 'gear'
    }));
    
    await act(async () => {
      await result.current.processFile(mockFile, 'gear');
    });
    
    // Check that the file was processed
    expect(mockProcessFile).toHaveBeenCalledWith(mockFile, 'gear');
    
    // Check that the results were set
    expect(mockSetTransformedCards).toHaveBeenCalledWith(mockProcessedCards);
    expect(mockSetValidationErrors).toHaveBeenCalledWith(mockErrors);
    
    // Check that AI processing was NOT used
    expect(mockProcessCardsWithAI).not.toHaveBeenCalled();
    
    // Check that import results were created and set
    expect(mockCreateImportResults).toHaveBeenCalledWith(mockProcessedCards, mockErrors);
    expect(mockSetImportResults).toHaveBeenCalled();
  });

  it('should process file with AI when enableAIProcessing is true', async () => {
    const mockFile = new File(['test'], 'test.md');
    const mockProcessedCards = [{ name: "Card", type: "gear" } as CardFormValues];
    const mockAIProcessedCards = [{ name: "Enhanced Card", type: "gear" } as CardFormValues];
    const mockErrors: string[] = [];

    mockProcessFile.mockResolvedValue({ processedCards: mockProcessedCards, errors: mockErrors });
    mockProcessCardsWithAI.mockResolvedValue(mockAIProcessedCards);
    
    const { result } = renderHook(() => useCardImporter({ 
      onImportComplete: mockOnImportComplete,
      initialCardType: 'gear'
    }));
    
    // Enable AI processing
    act(() => {
      result.current.setEnableAIProcessing(true);
    });
    
    await act(async () => {
      await result.current.processFile(mockFile, 'gear');
    });
    
    // Check that the file was processed
    expect(mockProcessFile).toHaveBeenCalledWith(mockFile, 'gear');
    
    // Check that AI processing was used
    expect(mockProcessCardsWithAI).toHaveBeenCalledWith(mockProcessedCards, 'gear');
    
    // Check that the AI results were set
    expect(mockSetTransformedCards).toHaveBeenCalledWith(mockAIProcessedCards);
    
    // Check that import results were created with AI processed cards
    expect(mockCreateImportResults).toHaveBeenCalledWith(mockAIProcessedCards, mockErrors);
  });

  it('should handle validation errors and not proceed with AI processing', async () => {
    const mockFile = new File(['test'], 'test.md');
    const mockProcessedCards = [{ name: "Card", type: "gear" } as CardFormValues];
    const mockErrors = ["Validation error"];

    mockProcessFile.mockResolvedValue({ processedCards: mockProcessedCards, errors: mockErrors });
    
    const { result } = renderHook(() => useCardImporter({ 
      onImportComplete: mockOnImportComplete,
      initialCardType: 'gear'
    }));
    
    // Enable AI processing
    act(() => {
      result.current.setEnableAIProcessing(true);
    });
    
    await act(async () => {
      await result.current.processFile(mockFile, 'gear');
    });
    
    // Check that the file was processed
    expect(mockProcessFile).toHaveBeenCalledWith(mockFile, 'gear');
    
    // Check that AI processing was NOT used due to validation errors
    expect(mockProcessCardsWithAI).not.toHaveBeenCalled();
    
    // Check that import results were created with processed cards and errors
    expect(mockCreateImportResults).toHaveBeenCalledWith(mockProcessedCards, mockErrors);
  });

  it('should reset all state when resetting', () => {
    const { result } = renderHook(() => useCardImporter({ 
      onImportComplete: mockOnImportComplete,
      initialCardType: 'gear'
    }));
    
    act(() => {
      result.current.resetState();
    });
    
    expect(mockResetResults).toHaveBeenCalled();
    expect(mockResetAIProcessing).toHaveBeenCalled();
  });
});
