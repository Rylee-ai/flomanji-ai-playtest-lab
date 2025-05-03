
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFileFormat } from '@/components/admin/import/hooks/useFileFormat';
import { FileFormatService } from '@/utils/file-format/FileFormatService';

// Mock dependencies
vi.mock('@/utils/file-format/FileFormatService', () => ({
  FileFormatService: {
    detectFileFormat: vi.fn()
  }
}));

describe('useFileFormat', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should analyze a file and update state', async () => {
    // Setup mock
    vi.mocked(FileFormatService.detectFileFormat).mockResolvedValue({
      format: 'markdown',
      fileExtension: 'md'
    });
    
    const mockFile = new File(['test'], 'test.md');
    
    const { result } = renderHook(() => useFileFormat());
    
    // Initial state
    expect(result.current.fileFormat).toBeNull();
    expect(result.current.fileExtension).toBeNull();
    
    // Analyze file
    let formatResult;
    await act(async () => {
      formatResult = await result.current.analyzeFile(mockFile);
    });
    
    // Check updated state
    expect(formatResult).toBe('markdown');
    expect(result.current.fileFormat).toBe('markdown');
    expect(result.current.fileExtension).toBe('md');
    expect(FileFormatService.detectFileFormat).toHaveBeenCalledWith(mockFile);
  });

  it('should handle errors during file analysis', async () => {
    // Setup mock to throw error
    vi.mocked(FileFormatService.detectFileFormat).mockRejectedValue(new Error('Detection error'));
    
    const mockFile = new File(['test'], 'test.md');
    
    const { result } = renderHook(() => useFileFormat());
    
    let formatResult;
    await act(async () => {
      formatResult = await result.current.analyzeFile(mockFile);
    });
    
    // Should return unknown and update state accordingly
    expect(formatResult).toBe('unknown');
    expect(result.current.fileFormat).toBe('unknown');
    expect(FileFormatService.detectFileFormat).toHaveBeenCalledWith(mockFile);
  });
});
