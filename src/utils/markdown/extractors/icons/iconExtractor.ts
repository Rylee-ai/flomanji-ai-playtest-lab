
/**
 * Extract icons from markdown content
 */
export const extractIconInfo = (markdownContent: string) => {
  // Try to find icons using various formats
  const iconMatches = [
    // Format: icons: [Fire] [Water]
    markdownContent.match(/icons?:\s*(?:\[([^\]]+)\])+/i),
    // Format: icons: Fire, Water
    markdownContent.match(/icons?:\s*(.+?)(?:\n|$)/i)
  ].filter(Boolean);
  
  if (iconMatches.length === 0) {
    return { icons: [] };
  }
  
  // Parse icons based on format
  let iconsText = iconMatches[0][1] || iconMatches[0][0].replace(/icons?:\s*/i, '');
  let icons = [];
  
  // If icons are in [Symbol] format
  if (iconsText.includes('[')) {
    const bracketMatches = iconsText.match(/\[([^\]]+)\]/g) || [];
    icons = bracketMatches.map(match => {
      const symbol = match.replace(/[\[\]]/g, '').trim();
      return { symbol, meaning: symbol };
    });
  } 
  // If icons are comma-separated
  else {
    icons = iconsText.split(/,\s*/).map(icon => {
      const symbol = icon.trim();
      return { symbol, meaning: symbol };
    });
  }
  
  return { icons };
};
