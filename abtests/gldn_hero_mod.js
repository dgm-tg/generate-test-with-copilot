/**
 * A/B Test: GLDN Homepage Hero Modification
 * 
 * This function:
 * 1. Changes the hero background image
 * 2. Updates the hero headline text
 * 3. Updates the CTA button text and link
 */
function modifyGldnHero() {
  try {
    // Find the hero section container
    const heroSection = document.querySelector('.banner-slides');
    if (!heroSection) {
      console.error('❌ Hero section not found');
      return false;
    }

    // Change background image
    const newBackgroundImage = 'https://res.cloudinary.com/thegood/image/upload/f_auto,q_auto/Accounts/GLDN/Homepage%20-%20Hero%20Content/hero-necklace.png';
    heroSection.style.backgroundImage = `url('${newBackgroundImage}')`;
    heroSection.style.backgroundSize = 'cover';
    heroSection.style.backgroundPosition = 'center';

    // Update hero headline
    const headlineElement = heroSection.querySelector('h1, h2, h3, .hero-headline');
    if (headlineElement && headlineElement.textContent.includes('Pearls are here to play')) {
      headlineElement.textContent = 'Jewelry made personal';
    }

    // Update CTA button
    const ctaButton = heroSection.querySelector('a[href*="collections"], .cta-button, .hero-cta');
    if (ctaButton) {
      ctaButton.textContent = 'Shop personalized';
      ctaButton.href = 'https://gldn.com/collections/personalized-jewelry';
    }

    console.log('✅ Hero section modifications applied successfully');
    return true;
  } catch (error) {
    console.error('❌ Error modifying hero section:', error);
    return false;
  }
}

// Alternative approach using more specific selectors
function modifyGldnHeroFallback() {
  try {
    // Try alternative selectors for hero section
    const heroSection = document.querySelector('[data-section-type="slideshow"], [data-section-id*="slideshow"]');
    if (!heroSection) {
      console.error('❌ Hero section not found (fallback)');
      return false;
    }

    // Change background image using alternative method
    const slideElement = heroSection.querySelector('.slideshow__slide, .hero__slide');
    if (slideElement) {
      const newBackgroundImage = 'https://res.cloudinary.com/thegood/image/upload/f_auto,q_auto/Accounts/GLDN/Homepage%20-%20Hero%20Content/hero-necklace.png';
      slideElement.style.backgroundImage = `url('${newBackgroundImage}')`;
      slideElement.style.backgroundSize = 'cover';
      slideElement.style.backgroundPosition = 'center';
    }

    // Update headline using alternative selectors
    const headlineElement = heroSection.querySelector('.slideshow__title, .hero__title, [class*="heading"]');
    if (headlineElement && headlineElement.textContent.includes('Pearls are here to play')) {
      headlineElement.textContent = 'Jewelry made personal';
    }

    // Update CTA using alternative selectors
    const ctaButton = heroSection.querySelector('.slideshow__link, .hero__link, .btn--hero');
    if (ctaButton) {
      ctaButton.textContent = 'Shop personalized';
      ctaButton.href = 'https://gldn.com/collections/personalized-jewelry';
    }

    console.log('✅ Hero section modifications applied successfully (fallback)');
    return true;
  } catch (error) {
    console.error('❌ Error in fallback modification:', error);
    return false;
  }
}

// Export the main function for easy console execution
const applyGldnHeroTest = () => {
  return modifyGldnHero() || modifyGldnHeroFallback();
}; 