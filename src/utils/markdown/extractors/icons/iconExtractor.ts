
import { CardFormValues } from "@/types/forms/card-form";

/**
 * Extracts and processes the card icon information from content
 * @param content The card section content
 * @param card The card object being built
 * @returns Updated card object with icon information
 */
export const extractIconInfo = (content: string, card: Partial<CardFormValues>): Partial<CardFormValues> => {
  const iconMatch = content.match(/\*\s*\*\*Icon\(s\):\*\*\s*([^\n]+)/i) || 
                   content.match(/Icon\(s\):\s*([^\n]+)/i) || 
                   content.match(/\*\s*Icons?:\s*([^\n]+)/i);
  
  if (iconMatch) {
    const iconsText = iconMatch[1].trim();
    console.log(`Found icons: "${iconsText}"`);
    
    // Extract icons in [Icon Name] format - handle escaped brackets \[Icon Name\]
    const iconRegex = /\\\[([^\\\]]+)\\\]|\[([^\]]+)\]/g;
    let match;
    const extractedIcons = [];
    
    while ((match = iconRegex.exec(iconsText)) !== null) {
      // Either use the first capture group (escaped brackets) or second (normal brackets)
      const iconName = match[1] || match[2];
      if (iconName && iconName.trim()) {
        extractedIcons.push({
          symbol: iconName.trim(),
          meaning: iconName.trim()
        });
      }
    }
    
    // If no bracketed icons found, try splitting by commas or spaces
    if (extractedIcons.length === 0 && iconsText) {
      const plainIcons = iconsText.split(/,|\s+/).filter(i => i.trim());
      plainIcons.forEach(icon => {
        if (icon.trim()) {
          extractedIcons.push({
            symbol: icon.trim(),
            meaning: icon.trim()
          });
        }
      });
    }
    
    if (extractedIcons.length > 0) {
      card.icons = extractedIcons;
      console.log(`Extracted ${extractedIcons.length} icons`);
    }
  }
  
  return card;
};
