import { test, expect } from '@playwright/test';

test('Generate style guide for marketmotors.com', async ({ page }) => {
  // Visit the website
  await page.goto('https://marketmotors.com');
  
  // Take a screenshot of the homepage
  await page.screenshot({ path: 'style-guides/marketmotors.com/homepage.png', fullPage: true });
  
  // Extract color palette
  const colors = await page.evaluate(() => {
    const colorMap = new Map();
    const elements = document.querySelectorAll('*');
    
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      const backgroundColor = styles.backgroundColor;
      const color = styles.color;
      const borderColor = styles.borderColor;
      
      // Only add non-transparent colors
      if (backgroundColor !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'transparent') {
        colorMap.set(backgroundColor, (colorMap.get(backgroundColor) || 0) + 1);
      }
      
      if (color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent') {
        colorMap.set(color, (colorMap.get(color) || 0) + 1);
      }
      
      if (borderColor !== 'rgba(0, 0, 0, 0)' && borderColor !== 'transparent') {
        colorMap.set(borderColor, (colorMap.get(borderColor) || 0) + 1);
      }
    });
    
    // Convert to array and sort by frequency
    const sortedColors = [...colorMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(entry => entry[0]);
    
    return sortedColors;
  });
  
  // Extract fonts
  const fonts = await page.evaluate(() => {
    const fontMap = new Map();
    const elements = document.querySelectorAll('*');
    
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      const fontFamily = styles.fontFamily;
      
      if (fontFamily && fontFamily !== '') {
        fontMap.set(fontFamily, (fontMap.get(fontFamily) || 0) + 1);
      }
    });
    
    // Convert to array and sort by frequency
    const sortedFonts = [...fontMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(entry => entry[0]);
    
    return sortedFonts;
  });
  
  // Extract logos and key images
  const logos = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img'));
    return images
      .filter(img => {
        const src = img.src.toLowerCase();
        return src.includes('logo') || 
               (img.alt && img.alt.toLowerCase().includes('logo')) ||
               src.includes('brand') ||
               (img.width < 300 && img.height < 100);
      })
      .map(img => ({
        src: img.src,
        alt: img.alt,
        width: img.width,
        height: img.height
      }));
  });
  
  // Extract button styles
  const buttonStyles = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button, a.btn, .button, [class*="btn"]'));
    return buttons.slice(0, 5).map(btn => {
      const styles = window.getComputedStyle(btn);
      return {
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        borderRadius: styles.borderRadius,
        padding: `${styles.paddingTop} ${styles.paddingRight} ${styles.paddingBottom} ${styles.paddingLeft}`,
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight
      };
    });
  });
  
  // Save the extracted style information to a JSON file
  await page.evaluate(({ colors, fonts, logos, buttonStyles }) => {
    const styleData = { colors, fonts, logos, buttonStyles };
    return JSON.stringify(styleData, null, 2);
  }, { colors, fonts, logos, buttonStyles }).then(styleJson => {
    require('fs').writeFileSync('style-guides/marketmotors.com/style-data.json', styleJson);
  });
});