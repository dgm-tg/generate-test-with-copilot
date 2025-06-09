// Simplified version for testing
function addCustomizationIconToPersonalizedProducts() {
  // Count how many product cards have personalize badges
  const allProductCards = document.querySelectorAll('article');
  let personalizedCardCount = 0;

  allProductCards.forEach(card => {
    const personalizeElement = Array.from(card.querySelectorAll('*')).find(
      el => el.textContent === 'Personalize'
    );
    if (personalizeElement) {
      personalizedCardCount++;
      console.log('Found personalized product:', card.querySelector('a').textContent);
      
      // Find the product link that contains the image
      const productLink = card.querySelector('a');
      if (productLink) {
        console.log('Found product link to modify');
      }
    }
  });

  console.log(`Found ${personalizedCardCount} products with personalize badge`);
  return personalizedCardCount;
}
