
/**
 * Extract card icon information from markdown content
 */
export const extractIconInfo = (markdownContent: string) => {
  const iconSection = markdownContent.match(/icons:\s*\n((?:\s*-\s*.*\n?)*)/i);
  
  if (!iconSection || !iconSection[1]) {
    // Default icons if none found
    return {
      icons: []
    };
  }
  
  const iconLines = iconSection[1]
    .split('\n')
    .filter(line => line.trim().startsWith('-'));
  
  const icons = iconLines.map(line => {
    // Try to extract symbol and meaning from format "- 🔥: Fire" or "- 🔥 (Fire)"
    const symbolMeaningMatch = line.match(/-\s*([^\s:]+)(?::\s*|\s+\()(.*?)(?:\)|$)/);
    
    if (symbolMeaningMatch) {
      return {
        symbol: symbolMeaningMatch[1].trim(),
        meaning: symbolMeaningMatch[2].trim()
      };
    }
    
    // Fallback: just extract the emoji/symbol
    const symbolMatch = line.match(/-\s*([^\s]+)/);
    return {
      symbol: symbolMatch ? symbolMatch[1].trim() : '❓',
      meaning: 'Unknown'
    };
  });
  
  return { icons };
};
