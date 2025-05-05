
/**
 * Extract card rules information from markdown content
 */
export const extractRulesInfo = (markdownContent: string) => {
  // Try to find a rules section using various formats
  const rulesSectionMatches = [
    // Format: rules: 
    //   - rule1
    //   - rule2
    markdownContent.match(/rules:\s*\n((?:\s*-\s*.*\n?)*)/i),
    // Format: rules: rule1, rule2
    markdownContent.match(/rules:\s*(.+?)(?:\n|$)/i),
    // Fallback: look for a section titled "Rules:"
    markdownContent.match(/rules:\s*\n([\s\S]*?)(?:\n\w+:|$)/i)
  ].filter(Boolean);
  
  if (rulesSectionMatches.length === 0) {
    return { rules: [] };
  }
  
  const rulesSection = rulesSectionMatches[0];
  let rules: string[] = [];
  
  if (rulesSection[1].includes('-')) {
    // List format
    rules = rulesSection[1]
      .split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^\s*-\s*/, '').trim());
  } else if (rulesSection[1].includes(',')) {
    // Comma-separated format
    rules = rulesSection[1]
      .split(',')
      .map(rule => rule.trim())
      .filter(Boolean);
  } else {
    // Paragraph format, split by sentences or lines
    rules = rulesSection[1]
      .split(/\.(?=\s|$)|\n/)
      .map(rule => rule.trim())
      .filter(Boolean)
      .map(rule => rule.endsWith('.') ? rule : `${rule}.`);
  }
  
  return { rules };
};
