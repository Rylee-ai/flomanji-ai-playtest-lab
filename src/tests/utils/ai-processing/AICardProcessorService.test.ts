
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AICardProcessorService } from '@/utils/ai-processing/AICardProcessorService';
import { CardFormValues } from '@/types/forms/card-form';
import * as openrouterChat from '@/lib/openrouterChat';

// Mock the openrouterChat module
vi.mock('@/lib/openrouterChat', () => ({
  createChatCompletion: vi.fn()
}));

describe('AICardProcessorService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should process cards and return enhanced cards and suggestions', async () => {
    // Mock AI response
    const mockAIResponse = JSON.stringify({
      enhancedCards: [
        {
          name: "Enhanced Card Name",
          type: "gear",
          keywords: ["enhanced", "keyword"],
          rules: ["Enhanced rule text"],
          flavor: "Enhanced flavor text"
        }
      ],
      suggestions: [
        {
          cardName: "Sample Card",
          field: "rules",
          suggestion: "Clarify the rule text for better understanding",
          reason: "Current text is ambiguous"
        }
      ]
    });

    // Setup the mock implementation
    vi.mocked(openrouterChat.createChatCompletion).mockResolvedValue(mockAIResponse);

    // Sample input cards
    const inputCards: CardFormValues[] = [
      {
        id: "1",
        name: "Sample Card",
        type: "gear",
        keywords: ["keyword"],
        rules: ["Original rule text"],
        flavor: "Original flavor text",
        icons: []
      }
    ];

    // Process the cards
    const result = await AICardProcessorService.processCards(inputCards, "gear");

    // Check that the AI was called with appropriate parameters
    expect(openrouterChat.createChatCompletion).toHaveBeenCalled();
    
    // Check that we got the enhanced cards
    expect(result.enhancedCards).toHaveLength(1);
    expect(result.enhancedCards[0].name).toBe("Enhanced Card Name");
    
    // Check that we got the suggestions
    expect(result.suggestions).toHaveLength(1);
    expect(result.suggestions[0].cardName).toBe("Sample Card");
  });

  it('should handle AI processing errors gracefully', async () => {
    // Setup the mock to throw an error
    vi.mocked(openrouterChat.createChatCompletion).mockRejectedValue(new Error("AI processing failed"));

    // Sample input cards
    const inputCards: CardFormValues[] = [
      {
        id: "1",
        name: "Sample Card",
        type: "gear",
        keywords: ["keyword"],
        rules: ["Original rule text"],
        flavor: "Original flavor text",
        icons: []
      }
    ];

    // Process the cards
    const result = await AICardProcessorService.processCards(inputCards, "gear");

    // Check that we got back the original cards
    expect(result.enhancedCards).toEqual(inputCards);
    
    // Check that we got no suggestions
    expect(result.suggestions).toHaveLength(0);
  });

  it('should handle empty input gracefully', async () => {
    // Process empty card array
    const result = await AICardProcessorService.processCards([], "gear");

    // Check that we got empty arrays back
    expect(result.enhancedCards).toHaveLength(0);
    expect(result.suggestions).toHaveLength(0);
    
    // Check that the AI wasn't called
    expect(openrouterChat.createChatCompletion).not.toHaveBeenCalled();
  });

  it('should handle malformed AI responses gracefully', async () => {
    // Mock AI response with invalid JSON
    vi.mocked(openrouterChat.createChatCompletion).mockResolvedValue("This is not valid JSON");

    // Sample input cards
    const inputCards: CardFormValues[] = [
      {
        id: "1",
        name: "Sample Card",
        type: "gear",
        keywords: ["keyword"],
        rules: ["Original rule text"],
        flavor: "Original flavor text",
        icons: []
      }
    ];

    // Process the cards
    const result = await AICardProcessorService.processCards(inputCards, "gear");

    // Check that we got back the original cards
    expect(result.enhancedCards).toEqual(inputCards);
    
    // Check that we got no suggestions
    expect(result.suggestions).toHaveLength(0);
  });

  it('should clean and parse JSON responses with code blocks', async () => {
    // Mock AI response with JSON wrapped in markdown code blocks
    const mockResponse = `
Here's the analysis of your cards:

\`\`\`json
{
  "enhancedCards": [
    {
      "name": "Enhanced Card Name",
      "type": "gear",
      "keywords": ["enhanced", "keyword"],
      "rules": ["Enhanced rule text"],
      "flavor": "Enhanced flavor text"
    }
  ],
  "suggestions": [
    {
      "cardName": "Sample Card",
      "field": "rules",
      "suggestion": "Clarify the rule text for better understanding",
      "reason": "Current text is ambiguous"
    }
  ]
}
\`\`\`
`;

    vi.mocked(openrouterChat.createChatCompletion).mockResolvedValue(mockResponse);

    // Sample input cards
    const inputCards: CardFormValues[] = [
      {
        id: "1",
        name: "Sample Card",
        type: "gear",
        keywords: ["keyword"],
        rules: ["Original rule text"],
        flavor: "Original flavor text",
        icons: []
      }
    ];

    // Process the cards
    const result = await AICardProcessorService.processCards(inputCards, "gear");

    // Check that we got the enhanced cards from inside the code block
    expect(result.enhancedCards).toHaveLength(1);
    expect(result.enhancedCards[0].name).toBe("Enhanced Card Name");
    
    // Check that we got the suggestions from inside the code block
    expect(result.suggestions).toHaveLength(1);
    expect(result.suggestions[0].cardName).toBe("Sample Card");
  });
});
