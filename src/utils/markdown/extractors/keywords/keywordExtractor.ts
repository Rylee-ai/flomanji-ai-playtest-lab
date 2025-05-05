
/**
 * Extract card keyword information from markdown content
 */
export const extractKeywordInfo = (markdownContent: string) => {
  // Try to find a keywords section using various formats
  const keywordSectionMatches = [
    // Format: keywords: [keyword1, keyword2]
    markdownContent.match(/keywords:\s*\[(.*?)\]/i),
    // Format: keywords: 
    //   - keyword1
    //   - keyword2
    markdownContent.match(/keywords:\s*\n((?:\s*-\s*.*\n?)*)/i),
    // Format: keywords: keyword1, keyword2
    markdownContent.match(/keywords:\s*(.+?)(?:\n|$)/i)
  ].filter(Boolean);
  
  if (keywordSectionMatches.length === 0) {
    return { keywords: [] };
  }
  
  const keywordSection = keywordSectionMatches[0];
  let keywords: string[] = [];
  
  if (keywordSection[1].includes('-')) {
    // List format
    keywords = keywordSection[1]
      .split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^\s*-\s*/, '').trim());
  } else {
    // Comma-separated or array format
    keywords = keywordSection[1]
      .split(/,|\|/)
      .map(keyword => keyword.replace(/["\[\]]/g, '').trim())
      .filter(Boolean);
  }
  
  return { keywords };
};
