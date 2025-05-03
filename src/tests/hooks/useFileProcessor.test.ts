
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFileProcessor } from '@/components/admin/import/hooks/useFileProcessor';
import { useFileFormat } from '@/components/admin/import/hooks/useFileFormat';
import { FileProcessingService } from '@/utils/file-processing/FileProcessingService';
import { CardType } from '@/types/cards';
import { CardFormValues } from '@/types/forms/card-form';

// Mock dependencies
vi.mock('@/components/admin/import/hooks/useFileFormat', () => ({
  useFileFormat: vi.fn().mockReturnValue({
    fileFormat: null,
    fileExtension: null,
    analyzeFile: vi.fn().mockResolvedValue('markdown')
  })
}));

vi.mock('@/utils/file-processing/FileProcessingService', () => ({
  FileProcessingService: {
    validateFile: vi.fn(),
    processFileContent: vi.fn()
  }
}));

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn()
  }
}));

describe('useFileProcessor', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should process a valid file', async () => {
    // Setup mocks
    const mockFile = new File(['test'], 'test.md');
    const mockResult = {
      processedCards: [{ id: '1', name: 'Card', type: 'gear' as CardType }] as CardFormValues[],
      errors: []
    };
    
    vi.mocked(FileProcessingService.validateFile).mockReturnValue({ valid: true });
    vi.mocked(FileProcessingService.processFileContent).mockResolvedValue(mockResult);
    
    const { result } = renderHook(() => useFileProcessor());
    
    let processResult;
    await act(async () => {
      processResult = await result.current.processFile(mockFile, 'gear');
    });
    
    expect(FileProcessingService.validateFile).toHaveBeenCalledWith(mockFile);
    expect(FileProcessingService.processFileContent).toHaveBeenCalled();
    expect(processResult).toEqual(mockResult);
  });

  it('should handle invalid files', async () => {
    // Setup mocks
    const mockFile = new File(['test'], 'test.txt');
    vi.mocked(FileProcessingService.validateFile).mockReturnValue({ 
      valid: false, 
      error: "Only JSON and Markdown files are supported" 
    });
    
    const { result } = renderHook(() => useFileProcessor());
    
    let processResult;
    await act(async () => {
      processResult = await result.current.processFile(mockFile, 'gear');
    });
    
    expect(FileProcessingService.validateFile).toHaveBeenCalledWith(mockFile);
    expect(FileProcessingService.processFileContent).not.toHaveBeenCalled();
    expect(processResult.errors).toContain("Only JSON and Markdown files are supported");
  });

  it('should handle processing errors', async () => {
    // Setup mocks
    const mockFile = new File(['test'], 'test.md');
    const mockError = new Error('Processing error');
    
    vi.mocked(FileProcessingService.validateFile).mockReturnValue({ valid: true });
    vi.mocked(FileProcessingService.processFileContent).mockRejectedValue(mockError);
    
    const { result } = renderHook(() => useFileProcessor());
    
    let processResult;
    await act(async () => {
      processResult = await result.current.processFile(mockFile, 'gear');
    });
    
    expect(processResult.errors[0]).toContain("Failed to process file");
    expect(processResult.processedCards).toHaveLength(0);
  });
});
