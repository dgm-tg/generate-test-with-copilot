function changeAddToCartButtonText() {
  // Find all buttons on the page
  const buttons = document.querySelectorAll('button');
  
  // Loop through buttons to find the 'Add to cart' button
  for (let button of buttons) {
    if (button.textContent.includes('Add to cart')) {
      // Change the button text
      button.textContent = 'Click this button';
      console.log('Button text changed successfully!');
      return true;
    }
  }
  
  console.log('Add to cart button not found');
  return false;
}

// This function provides an alternative method using the button's reference ID
function changeButtonTextById() {
  // Using the reference ID we identified (e231)
  const addToCartButton = document.querySelector('[ref="e231"]');
  if (addToCartButton) {
    addToCartButton.textContent = 'Click this button';
    console.log('Button text changed successfully using ID!');
    return true;
  }
  
  console.log('Button with specified ID not found');
  return false;
}

// Export both functions for use in the browser console or A/B testing tools
// This is the recommended one-liner for easy console execution
const changeAddToCartText = () => {
  return changeAddToCartButtonText() || changeButtonTextById();
};
