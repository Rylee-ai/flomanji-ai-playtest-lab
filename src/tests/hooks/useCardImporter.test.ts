
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCardImporter } from '@/components/admin/import/hooks/useCardImporter';
import { useCardImportOrchestrator } from '@/components/admin/import/hooks/useCardImportOrchestrator';
import { useFileProcessor } from '@/components/admin/import/hooks/useFileProcessor';
import { useCardImportResults } from '@/components/admin/import/hooks/useCardImportResults';
import { useAICardProcessing } from '@/components/admin/import/hooks/useAICardProcessing';
import { CardFormValues } from '@/types/forms/card-form';
import { CardSuggestion } from '@/utils/ai-processing/AICardProcessorService';

// Mock the dependent hooks
vi.mock('@/components/admin/import/hooks/useCardImportOrchestrator', () => ({
  useCardImportOrchestrator: vi.fn()
}));

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
  const mockOrchestratorResult = {
    isProcessing: false,
    cardType: 'gear',
    setCardType: vi.fn(),
    transformedCards: [],
    validationErrors: [],
    importResults: null,
    detectFileFormat: mockAnalyzeFile,
    processFile: mockProcessFile,
    resetState: vi.fn(),
    enableAIProcessing: false,
    setEnableAIProcessing: vi.fn(),
    aiSuggestions: [],
    handleApplySuggestion: vi.fn(),
    handleIgnoreSuggestion: vi.fn(),
    processingError: null
  };

  beforeEach(() => {
    vi.resetAllMocks();
    
    // Mock the orchestrator hook to return our mock result
    vi.mocked(useCardImportOrchestrator).mockReturnValue(mockOrchestratorResult);
  });

  it('should use the orchestrator hook and return its result', () => {
    const { result } = renderHook(() => useCardImporter({ 
      onImportComplete: mockOnImportComplete,
      initialCardType: 'gear'
    }));
    
    // Check that the orchestrator was called with the right props
    expect(useCardImportOrchestrator).toHaveBeenCalledWith({
      onImportComplete: mockOnImportComplete,
      initialCardType: 'gear'
    });
    
    // Check that all properties from orchestrator are passed through
    expect(result.current).toEqual(mockOrchestratorResult);
  });
});
