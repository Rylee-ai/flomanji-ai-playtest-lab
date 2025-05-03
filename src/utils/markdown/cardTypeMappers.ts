
/**
 * Maps a gear category text to our internal category type
 * @param categoryText The category text from the markdown
 * @returns The mapped category
 */
export const mapGearCategory = (categoryText: string): 'consumable' | 'tool' | 'weapon' | 'vehicle' | 'supply' => {
  const lowerText = categoryText.toLowerCase();
  
  if (lowerText.includes('consumable')) return 'consumable';
  if (lowerText.includes('weapon')) return 'weapon';
  if (lowerText.includes('vehicle')) return 'vehicle';
  if (lowerText.includes('supply')) return 'supply';
  
  // Default to tool for other categories
  return 'tool';
};
