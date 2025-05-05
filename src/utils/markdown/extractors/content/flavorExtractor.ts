
/**
 * Extract card flavor text from markdown content
 */
export const extractFlavorInfo = (markdownContent: string) => {
  // Try to find flavor text using various formats
  const flavorMatches = [
    // Format: flavor: "Text here"
    markdownContent.match(/flavor:\s*"(.*?)"/i),
    // Format: flavor: Text here
    markdownContent.match(/flavor:\s*(.+?)(?:\n|$)/i),
    // Format: > Flavor text here (blockquote)
    markdownContent.match(/>\s*(.+?)(?:\n|$)/i)
  ].filter(Boolean);
  
  if (flavorMatches.length === 0) {
    return { flavor: "" };
  }
  
  const flavorMatch = flavorMatches[0];
  return { flavor: flavorMatch[1].trim() };
};
