
import { describe, it, expect, vi } from 'vitest';
import {
  formatCardError,
  formatCardSpecificError,
  cardErrorsToMessages,
  handleFileProcessingError,
  safeCardOperation,
  logCardOperation,
  type CardOperationError
} from '@/utils/error-handling/cardErrorHandler';

describe('cardErrorHandler utilities', () => {
  describe('formatCardError', () => {
    it('should format Error objects properly', () => {
      const error = new Error('Test error');
      const formatted = formatCardError(error, 'test context');
      
      expect(formatted.message).toBe('Test error');
      expect(formatted.details).toBe(error);
      expect(formatted.timestamp).toBeDefined();
    });
    
    it('should format string errors properly', () => {
      const error = 'String error';
      const formatted = formatCardError(error);
      
      expect(formatted.message).toBe('String error');
      expect(formatted.timestamp).toBeDefined();
    });
    
    it('should handle unknown error types', () => {
      const error = { custom: 'error' };
      const formatted = formatCardError(error);
      
      expect(formatted.message).toBe('Unknown error occurred');
      expect(formatted.details).toBe(error);
      expect(formatted.timestamp).toBeDefined();
    });
  });
  
  describe('formatCardSpecificError', () => {
    it('should include card-specific information', () => {
      const error = new Error('Card error');
      const formatted = formatCardSpecificError(error, 1, 'Test Card', 'import');
      
      expect(formatted.message).toBe('Card error');
      expect(formatted.cardIndex).toBe(1);
      expect(formatted.cardName).toBe('Test Card');
      expect(formatted.operation).toBe('import');
    });
  });
  
  describe('cardErrorsToMessages', () => {
    it('should convert card errors to user-friendly messages', () => {
      const errors: CardOperationError[] = [
        { message: 'General error' },
        { message: 'Card error', cardIndex: 0, cardName: 'First Card' },
        { message: 'Operation error', cardName: 'Second Card', operation: 'import' }
      ];
      
      const messages = cardErrorsToMessages(errors);
      
      expect(messages).toEqual([
        'General error',
        'First Card: Card error',
        'import - Second Card: Operation error'
      ]);
    });
  });
  
  describe('handleFileProcessingError', () => {
    it('should return an array with the error message', () => {
      const error = new Error('File processing error');
      const messages = handleFileProcessingError(error);
      
      expect(messages).toEqual(['File processing error']);
    });
  });
  
  describe('safeCardOperation', () => {
    it('should return the result when successful', async () => {
      const operation = vi.fn().mockResolvedValue('success');
      
      const result = await safeCardOperation(operation, 'test');
      
      expect(result).toEqual({ result: 'success' });
      expect(operation).toHaveBeenCalled();
    });
    
    it('should return the error when operation fails', async () => {
      const error = new Error('Operation failed');
      const operation = vi.fn().mockRejectedValue(error);
      
      const result = await safeCardOperation(operation, 'test');
      
      expect(result).toHaveProperty('error');
      expect(result.error?.message).toBe('Operation failed');
      expect(operation).toHaveBeenCalled();
    });
  });
  
  describe('logCardOperation', () => {
    it('should log operations with details', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      logCardOperation('test operation', { id: '123' });
      
      expect(consoleSpy).toHaveBeenCalledWith('[Card Operation] test operation', { id: '123' });
      
      consoleSpy.mockRestore();
    });
    
    it('should work without details', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      logCardOperation('test operation');
      
      expect(consoleSpy).toHaveBeenCalledWith('[Card Operation] test operation', '');
      
      consoleSpy.mockRestore();
    });
  });
});
