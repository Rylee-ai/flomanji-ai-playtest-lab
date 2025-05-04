
/**
 * Centralized error handling for card operations
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
}

/**
 * Format an error into a standardized card operation error
 */
export function formatCardError(error: unknown, context?: string): CardOperationError {
  console.error(`Card error${context ? ` (${context})` : ''}:`, error);
  
  if (error instanceof Error) {
    return {
      message: error.message,
      details: error
    };
  } else if (typeof error === 'string') {
    return {
      message: error
    };
  } else {
    return {
      message: 'Unknown error occurred',
      details: error
    };
  }
}

/**
 * Format a card-specific error
 */
export function formatCardSpecificError(
  error: unknown, 
  cardIndex?: number, 
  cardName?: string
): CardOperationError {
  const formattedError = formatCardError(error);
  
  return {
    ...formattedError,
    cardIndex,
    cardName
  };
}

/**
 * Convert card operation errors to user-friendly error messages
 */
export function cardErrorsToMessages(errors: CardOperationError[]): string[] {
  return errors.map(error => {
    if (error.cardIndex !== undefined || error.cardName) {
      const identifier = error.cardName || `Card #${error.cardIndex! + 1}`;
      return `${identifier}: ${error.message}`;
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
