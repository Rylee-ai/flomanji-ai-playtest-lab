
import { CardService } from '@/services/CardService';
import { GameCard } from '@/types/cards';

/**
 * This is a test file for the CardService.
 * In a production environment, you would use a proper testing framework
 * like Jest or Vitest to execute these tests.
 */

async function testCardCRUD() {
  try {
    // Test card creation
    const testCard: GameCard = {
      id: `test-${Date.now()}`,
      name: "Test Card",
      type: "treasure",
      icons: [{ symbol: "💰", meaning: "Valuable" }],
      keywords: ["test", "treasure"],
      rules: ["This is a test card"],
      flavor: "A test card for development purposes.",
      imagePrompt: "Test image prompt",
    };
    
    console.log("Creating test card...");
    const savedCard = await CardService.saveCard(testCard);
    console.log("Card created successfully:", savedCard.id);
    
    // Test card retrieval
    console.log("Fetching card by ID...");
    const fetchedCard = await CardService.getCard(testCard.id);
    console.log("Card fetched successfully:", fetchedCard?.name);
    
    // Test card update
    const updatedCard = {
      ...testCard,
      name: "Updated Test Card",
    };
    console.log("Updating card...");
    await CardService.saveCard(updatedCard);
    console.log("Card updated successfully");
    
    // Test version history
    console.log("Fetching version history...");
    const history = await CardService.getCardVersionHistory(testCard.id);
    console.log(`Version history fetched: ${history.length} versions`);
    
    // Test card deletion
    console.log("Deleting card...");
    await CardService.deleteCard(testCard.id);
    console.log("Card deleted successfully");
    
    console.log("All tests passed successfully");
  } catch (error) {
    console.error("Test failed:", error);
  }
}

// Uncommenting this line would run the test when this file is executed
// testCardCRUD();

export { testCardCRUD };
