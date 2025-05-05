
/**
 * Extract keywords from markdown content
 */
export const extractKeywordInfo = (markdownContent: string) => {
  // Try to find keywords using various formats
  const keywordMatches = [
    // Format: keywords: Keyword1, Keyword2
    markdownContent.match(/keywords?:\s*(.+?)(?:\n|$)/i)
  ].filter(Boolean);
  
  if (keywordMatches.length === 0) {
    return { keywords: [] };
  }
  
  const keywordsText = keywordMatches[0][1];
  const keywords = keywordsText
    .split(/,\s*/)
    .map(keyword => keyword.trim())
    .filter(keyword => keyword.length > 0);
  
  return { keywords };
};
