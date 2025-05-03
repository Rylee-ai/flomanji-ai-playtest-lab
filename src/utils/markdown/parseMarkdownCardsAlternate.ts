
import { CardFormValues } from "@/types/forms/card-form";
import { normalizeText } from "./utils/textProcessing";
import { processMarkdownChunks } from "./processors/alternateMarkdownParser";

/**
 * Alternative parsing approach for when the main parser fails
 * This uses a more lenient, line-by-line approach to identify card data
 * @param markdownContent Raw markdown content from a file
 * @returns An array of parsed card objects
 */
export const parseMarkdownCardsAlternate = (markdownContent: string): CardFormValues[] => {
  console.log("Using alternate markdown parsing approach");
  
  // Normalize line endings and clean up content
  const cleanedContent = normalizeText(markdownContent);
  
  // Split into logical chunks
  const chunks = cleanedContent.split(/\n\n+/);
  console.log(`Alternate parser found ${chunks.length} chunks`);

  // Process chunks into cards
  const cards = processMarkdownChunks(chunks);
  
  console.log(`Alternate parser found ${cards.length} cards`);
  return cards;
};
