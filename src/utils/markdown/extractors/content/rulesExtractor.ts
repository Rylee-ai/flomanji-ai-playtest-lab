
/**
 * Extract rules text from markdown content
 */
export const extractRulesInfo = (markdownContent: string) => {
  // Try to find rules using various formats
  const rulesMatches = [
    // Format: rules: "Text here"
    markdownContent.match(/rules:\s*"(.*?)"/is),
    // Format: rules: Text here
    markdownContent.match(/rules:\s*(.+?)(?:\n\n|\n(?=[*#])|$)/is),
    // Format: rules:
    // Text here
    markdownContent.match(/rules:\s*\n\s*((?:.+?\n)+)(?:\n\n|\n(?=[*#])|$)/is)
  ].filter(Boolean);
  
  if (rulesMatches.length === 0) {
    return { rules: [] };
  }
  
  const rulesMatch = rulesMatches[0];
  const rulesText = rulesMatch[1].trim();
  
  // Split rules by newlines or bullet points
  const rules = rulesText
    .split(/\n+/)
    .map(rule => rule.replace(/^[-*•]\s*/, '').trim())
    .filter(rule => rule.length > 0);
  
  return { rules: rules.length ? rules : [rulesText] };
};
