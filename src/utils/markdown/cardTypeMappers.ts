
/**
 * Maps text descriptions of gear categories to our system's gear categories
 * @param categoryText The category text from the card
 * @returns A valid gear category
 */
export const mapGearCategory = (categoryText: string): 'consumable' | 'tool' | 'weapon' | 'vehicle' | 'supply' => {
  const lowerText = categoryText.toLowerCase();
  
  if (lowerText.includes('consumable')) return 'consumable';
  if (lowerText.includes('weapon')) return 'weapon';
  if (lowerText.includes('vehicle')) return 'vehicle';
  if (lowerText.includes('supply')) return 'supply';
  if (lowerText.includes('passive')) return 'tool'; // Map "Passive" to "Tool"
  
  // Default to tool for other categories
  return 'tool';
};

/**
 * Maps numerical formats (like 1., 2.) or asterisk formats (**1.**, **2.**) to extract the card number
 * @param text The text containing the card number format
 * @returns The extracted number or null if not found
 */
export const extractCardNumber = (text: string): number | null => {
  // Handle formats like "**1. CARD NAME**" or "1. CARD NAME"
  const match = text.match(/\*?\*?(\d+)\.?\s+/);
  return match ? parseInt(match[1], 10) : null;
};

/**
 * Cleans up a title string by removing asterisks, numbers, and other formatting
 * @param title The raw title string
 * @returns Clean title string
 */
export const cleanupTitle = (title: string): string => {
  return title
    .replace(/\*\*\d+\.?\s+/g, '') // Remove "**1. " format
    .replace(/\d+\.?\s+/g, '')     // Remove "1. " format
    .replace(/\*\*/g, '')          // Remove any remaining asterisks
    .trim();
};

