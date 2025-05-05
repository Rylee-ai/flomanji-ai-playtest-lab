
/**
 * Extract image prompt information from markdown content
 */
export const extractImagePromptInfo = (markdownContent: string) => {
  // Try to find image prompt using various formats
  const imagePromptMatches = [
    // Format: image_prompt: "Description here"
    markdownContent.match(/image[_-]?prompt:\s*"(.*?)"/i),
    // Format: image_prompt: Description here
    markdownContent.match(/image[_-]?prompt:\s*(.+?)(?:\n|$)/i),
    // Format: image: Description here
    markdownContent.match(/image:\s*(.+?)(?:\n|$)/i)
  ].filter(Boolean);
  
  if (imagePromptMatches.length === 0) {
    return { imagePrompt: "" };
  }
  
  const imagePromptMatch = imagePromptMatches[0];
  return { imagePrompt: imagePromptMatch[1].trim() };
};
