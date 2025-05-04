
/**
 * Centralized error handling for card operations
 * This utility provides standardized error handling across all card-related operations
 */

/**
 * Standard error format for card operations
 */
export interface CardOperationError {
  message: string;
  code?: string;
  cardIndex?: number;
  cardName?: string;
  details?: unknown;
  timestamp?: string;
  operation?: string;
}

/**
 * Format an error into a standardized card operation error
 * @param error The error to format
 * @param context Optional context about where the error occurred
 */
export function formatCardError(error: unknown, context?: string): CardOperationError {
  console.error(`Card error${context ? ` (${context})` : ''}:`, error);
  
  const timestamp = new Date().toISOString();
  
  if (error instanceof Error) {
    return {
      message: error.message,
      details: error,
      timestamp
    };
  } else if (typeof error === 'string') {
    return {
      message: error,
      timestamp
    };
  } else {
    return {
      message: 'Unknown error occurred',
      details: error,
      timestamp
    };
  }
}

/**
 * Format a card-specific error
 */
export function formatCardSpecificError(
  error: unknown, 
  cardIndex?: number, 
  cardName?: string,
  operation?: string
): CardOperationError {
  const formattedError = formatCardError(error);
  
  return {
    ...formattedError,
    cardIndex,
    cardName,
    operation
  };
}

/**
 * Convert card operation errors to user-friendly error messages
 */
export function cardErrorsToMessages(errors: CardOperationError[]): string[] {
  return errors.map(error => {
    if (error.cardIndex !== undefined || error.cardName) {
      const identifier = error.cardName || `Card #${error.cardIndex! + 1}`;
      let message = `${identifier}: ${error.message}`;
      
      if (error.operation) {
        message = `${error.operation} - ${message}`;
      }
      
      return message;
    }
    return error.message;
  });
}

/**
 * Handle file processing errors 
 */
export function handleFileProcessingError(error: unknown): string[] {
  const formattedError = formatCardError(error, 'file processing');
  return [formattedError.message];
}

/**
 * Safely execute a card operation with error handling
 */
export async function safeCardOperation<T>(
  operation: () => Promise<T>, 
  errorContext: string
): Promise<{ result?: T, error?: CardOperationError }> {
  try {
    const result = await operation();
    return { result };
  } catch (error) {
    return { error: formatCardError(error, errorContext) };
  }
}

/**
 * Log an operation for debugging purposes
 */
export function logCardOperation(operation: string, details?: unknown): void {
  console.log(`[Card Operation] ${operation}`, details || '');
}
