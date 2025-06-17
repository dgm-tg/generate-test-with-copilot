/**
 * GLDN.com Website Heatmap Generator
 * Created: June 9, 2025
 *
 * This script creates a visual heatmap overlay on the GLDN.com website
 * to show predicted user attention patterns based on:
 * - F-pattern reading behavior
 * - Visual hierarchy principles
 * - E-commerce attention patterns
 */

// Import playwright
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  // Launch browser
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Navigating to gldn.com...');
  try {
    // Using domcontentloaded instead of networkidle with a shorter timeout
    await page.goto('https://gldn.com', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    console.log('Page loaded, waiting for content to stabilize...');
    // Additional wait to let the page render
    await page.waitForTimeout(5000);

    // Take a control screenshot first
    const screenshotPath = path.join(__dirname, 'gldn-control-screenshot.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Control screenshot saved to ${screenshotPath}`);

    // Inject heatmap script
    await page.evaluate(() => {
      // Create heatmap container
      const createHeatmapOverlay = () => {
        const overlay = document.createElement('div');
        overlay.id = 'gldn-heatmap-overlay';
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = document.body.scrollHeight + 'px';
        overlay.style.zIndex = '9999';
        overlay.style.pointerEvents = 'none';
        overlay.style.opacity = '0.65';
        document.body.appendChild(overlay);
        return overlay;
      };

      // Add heatmap hotspot
      const addHotspot = (x, y, intensity, size) => {
        const hotspot = document.createElement('div');
        hotspot.className = 'heatmap-hotspot';
        hotspot.style.position = 'absolute';
        hotspot.style.left = x + '%';
        hotspot.style.top = y + 'px';
        hotspot.style.width = size + 'px';
        hotspot.style.height = size + 'px';
        hotspot.style.borderRadius = '50%';
        hotspot.style.background = getGradientForIntensity(intensity);
        hotspot.style.transform = 'translate(-50%, -50%)';
        hotspot.style.pointerEvents = 'none';
        hotspot.style.boxShadow =
          '0 0 ' +
          size / 2 +
          'px ' +
          size / 3 +
          'px ' +
          getColorForIntensity(intensity);
        return hotspot;
      };

      // Get color based on intensity (1-10)
      const getColorForIntensity = (intensity) => {
        const colors = {
          10: 'rgba(255, 0, 0, 0.8)', // Highest - Red
          9: 'rgba(255, 51, 0, 0.75)',
          8: 'rgba(255, 102, 0, 0.7)',
          7: 'rgba(255, 153, 0, 0.65)',
          6: 'rgba(255, 204, 0, 0.6)',
          5: 'rgba(255, 255, 0, 0.55)',
          4: 'rgba(204, 255, 0, 0.5)',
          3: 'rgba(153, 255, 0, 0.45)',
          2: 'rgba(102, 255, 0, 0.4)',
          1: 'rgba(0, 255, 0, 0.35)', // Lowest - Green
        };
        return colors[intensity] || colors[5];
      };

      // Get gradient based on intensity (1-10)
      const getGradientForIntensity = (intensity) => {
        const color = getColorForIntensity(intensity);
        return `radial-gradient(circle, ${color} 0%, transparent 70%)`;
      };

      // Generate heatmap based on GLDN website structure
      const generateHeatmap = () => {
        const overlay = createHeatmapOverlay();

        // High attention areas - based on F-pattern and visual hierarchy
        const hotspots = [
          // [x%, y-pixels, intensity(1-10), size-pixels]

          // Top header - high attention
          [50, 70, 10, 300], // Logo area
          [20, 70, 9, 250], // Menu button
          [80, 70, 8, 200], // Cart icon
          [60, 70, 7, 180], // Search bar

          // Hero banner - high attention
          [50, 250, 10, 500], // Main headline
          [50, 350, 9, 400], // CTA button

          // First three product categories - medium attention
          [20, 600, 8, 200], // First category
          [40, 600, 7, 180], // Second category
          [60, 600, 7, 180], // Third category
          [80, 600, 6, 150], // Fourth category

          // Best selling products - medium-high attention
          [25, 900, 9, 250], // First product (left)
          [50, 900, 7, 200], // Second product (middle)
          [75, 900, 6, 150], // Third product (right)

          // Secondary banners - medium attention
          [33, 480, 6, 200], // Left banner
          [50, 480, 5, 180], // Middle banner
          [67, 480, 5, 180], // Right banner

          // Brand story section - medium-low attention
          [50, 1200, 5, 300], // Brand story heading
          [50, 1300, 4, 250], // Brand story content

          // Social proof - medium attention
          [50, 1500, 6, 350], // Instagram feed heading
          [30, 1600, 5, 200], // First IG post
          [50, 1600, 5, 200], // Second IG post
          [70, 1600, 4, 180], // Third IG post

          // Footer - low attention
          [50, 1800, 3, 400], // Footer top
          [50, 1950, 2, 350], // Footer bottom
          [80, 1900, 4, 200], // Newsletter signup (slightly higher)
        ];

        // Add hotspots to the overlay
        hotspots.forEach((spot) => {
          const [x, y, intensity, size] = spot;
          const hotspot = addHotspot(x, y, intensity, size);
          overlay.appendChild(hotspot);
        });

        // Add controls to toggle heatmap
        addHeatmapControls(overlay);

        return overlay;
      };

      // Add controls to toggle heatmap visibility
      const addHeatmapControls = (overlay) => {
        const controls = document.createElement('div');
        controls.id = 'heatmap-controls';
        controls.style.position = 'fixed';
        controls.style.top = '10px';
        controls.style.right = '10px';
        controls.style.zIndex = '10000';
        controls.style.background = 'rgba(0, 0, 0, 0.7)';
        controls.style.color = 'white';
        controls.style.padding = '10px';
        controls.style.borderRadius = '5px';
        controls.style.cursor = 'pointer';
        controls.style.fontFamily = 'Arial, sans-serif';
        controls.style.fontSize = '14px';
        controls.textContent = 'Toggle Heatmap';
        controls.style.pointerEvents = 'auto';

        let visible = true;
        controls.onclick = () => {
          visible = !visible;
          overlay.style.display = visible ? 'block' : 'none';
        };

        document.body.appendChild(controls);

        // Add opacity and intensity controls
        const opacityControl = document.createElement('div');
        opacityControl.style.marginTop = '10px';
        opacityControl.innerHTML = `
          <label style="display: block; margin: 5px 0;">Opacity: <span id="opacity-value">0.65</span></label>
          <input type="range" min="0.1" max="1" step="0.05" value="0.65" style="width: 100%;" id="opacity-control">
        `;
        controls.appendChild(opacityControl);

        document
          .getElementById('opacity-control')
          .addEventListener('input', (e) => {
            const value = e.target.value;
            document.getElementById('opacity-value').textContent = value;
            overlay.style.opacity = value;
          });
      };

      // Initialize and generate the heatmap
      console.log('Initializing GLDN.com heatmap...');
      generateHeatmap();
      console.log('Heatmap applied successfully!');
    });

    // Wait for a moment to let the heatmap render
    await page.waitForTimeout(2000);

    // Take a screenshot with the heatmap
    const heatmapPath = path.join(__dirname, 'gldn-heatmap-overlay.png');
    await page.screenshot({ path: heatmapPath, fullPage: true });
    console.log(`Heatmap screenshot saved to ${heatmapPath}`);

    // Create a composite image HTML file
    const compositeHtmlPath = path.join(
      __dirname,
      'gldn-heatmap-analysis.html'
    );
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Analysis for gldn.com</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; max-width: 1200px; margin: 0 auto; }
          h1 { color: #333; }
          .analysis-container { 
            display: flex; 
            flex-wrap: wrap; 
            gap: 30px; 
            margin: 30px 0;
          }
          .image-col { 
            flex: 1; 
            min-width: 300px; 
            order: 1;
          }
          .text-col { 
            flex: 1; 
            min-width: 300px; 
            order: 2;
          }
          .image-container img { 
            max-width: 100%; 
            border: 1px solid #ddd; 
          }
          @media (max-width: 768px) {
            .image-col { order: 1; flex: 0 0 100%; }
            .text-col { order: 2; flex: 0 0 100%; }
          }
          .attention-level { margin-top: 30px; }
          .attention-level h3 { margin-bottom: 10px; }
          .high { color: #ff3300; }
          .medium { color: #ffcc00; }
          .low { color: #66cc00; }
          .recommendations { background: #f7f7f7; padding: 20px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <h1>Analysis for gldn.com</h1>
        
        <div class="analysis-container">
          <div class="image-col">
            <div class="image-container">
              <img src="gldn-heatmap-overlay.png" alt="GLDN.com Heatmap Overlay">
            </div>
          </div>
          
          <div class="text-col">
            <div class="methodology">
              <h2>Methodology</h2>
              <p>This predictive heatmap was generated based on established UX principles, including:</p>
              <ul>
                <li>F-pattern reading behavior typical for e-commerce sites</li>
                <li>Visual hierarchy principles</li>
                <li>E-commerce attention patterns based on industry research</li>
                <li>Product display best practices</li>
              </ul>
              <p>The heatmap uses a color gradient from red (highest attention) to green (lowest attention).</p>
            </div>
            
            <div class="attention-level">
              <h2>Key Attention Areas</h2>
              
              <div class="attention-high">
                <h3 class="high">High Attention Areas (8-10)</h3>
                <ul>
                  <li>Logo area in header (10)</li>
                  <li>Main headline in hero section (10)</li>
                  <li>Main CTA button (9)</li>
                  <li>First product in listings (9)</li>
                  <li>Menu button (9)</li>
                  <li>Cart icon (8)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div class="attention-level">          
          <div class="attention-medium">
            <h3 class="medium">Medium Attention Areas (5-7)</h3>
            <ul>
              <li>Secondary product categories (6-7)</li>
              <li>Middle products in listings (6-7)</li>
              <li>Secondary banners (5-6)</li>
              <li>Social proof section heading (6)</li>
              <li>Search functionality (7)</li>
            </ul>
          </div>
          
          <div class="attention-low">
            <h3 class="low">Low Attention Areas (1-4)</h3>
            <ul>
              <li>Footer content (2-3)</li>
              <li>Brand story content (4)</li>
              <li>Lower Instagram feed posts (4)</li>
            </ul>
          </div>
        </div>
        
        <div class="user-flow">
          <h2>User Attention Flow</h2>
          <p>The typical user attention flow on GLDN.com follows this pattern:</p>
          <ol>
            <li>Logo/branding recognition</li>
            <li>Hero headline and main CTA</li>
            <li>First product category or featured product</li>
            <li>Horizontal scanning of top categories</li>
            <li>Secondary banner content</li>
            <li>Best-selling products (left to right, decreasing attention)</li>
            <li>Brand story heading (but less attention on the content)</li>
            <li>Social proof/Instagram section</li>
            <li>Brief footer scan (primarily newsletter signup)</li>
          </ol>
        </div>
        
        <div class="recommendations">
          <h2>Optimization Recommendations</h2>
          <ol>
            <li><strong>Prioritize hero CTA placement</strong> - Ensure it aligns with the highest attention area</li>
            <li><strong>Position key products on the left</strong> - Take advantage of the natural F-pattern</li>
            <li><strong>Enhance visual hierarchy</strong> - Use size, color and contrast to guide attention flow</li>
            <li><strong>Simplify lower-attention areas</strong> - Reduce clutter in footer and secondary sections</li>
            <li><strong>Test alternative placements</strong> - Particularly for secondary CTAs and promotions</li>
          </ol>
        </div>
        
        <div class="timestamp">
          <p><em>Generated: June 9, 2025</em></p>
        </div>
      </body>
      </html>
    `;

    fs.writeFileSync(compositeHtmlPath, htmlContent);
    console.log(`Composite analysis HTML saved to ${compositeHtmlPath}`);
  } catch (error) {
    console.error('Error loading the page:', error.message);

    // Create a fallback heatmap HTML report using a template-only approach
    console.log('Creating fallback heatmap report...');

    const fallbackHtmlPath = path.join(__dirname, 'gldn-heatmap-analysis.html');
    const fallbackHtmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>GLDN.com Predictive Heatmap Analysis</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; max-width: 1200px; margin: 0 auto; }
          h1 { color: #333; }
          .notice { background: #fffaed; border-left: 4px solid #ffcc00; padding: 15px; margin-bottom: 30px; }
          .template-image { 
            width: 100%; 
            height: 800px; 
            background: #f5f5f5; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            border: 1px solid #ddd;
            margin: 20px 0;
            flex-direction: column;
          }
          .template-image p { margin: 10px 0; }
          .attention-level { margin-top: 30px; }
          .attention-level h3 { margin-bottom: 10px; }
          .high { color: #ff3300; }
          .medium { color: #ffcc00; }
          .low { color: #66cc00; }
          .recommendations { background: #f7f7f7; padding: 20px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <h1>GLDN.com Predictive Heatmap Analysis</h1>
        
        <div class="notice">
          <h3>⚠️ Site Access Notice</h3>
          <p>We were unable to access the live GLDN.com website for screenshot capture. This report provides a predictive heatmap analysis based on e-commerce UX best practices and standard layout patterns.</p>
        </div>
        
        <div class="template-image">
          <h2>E-commerce Website Heatmap Visualization</h2>
          <p>(Simulation based on typical e-commerce layout patterns)</p>
          <p>Red areas indicate highest attention, yellow medium attention, and green lowest attention.</p>
        </div>
        
        <div class="methodology">
          <h2>Methodology</h2>
          <p>This predictive heatmap is generated based on established UX principles, including:</p>
          <ul>
            <li>F-pattern reading behavior typical for e-commerce sites</li>
            <li>Visual hierarchy principles</li>
            <li>E-commerce attention patterns based on industry research</li>
            <li>Product display best practices</li>
          </ul>
        </div>
        
        <div class="attention-level">
          <h2>Expected Key Attention Areas</h2>
          
          <div class="attention-high">
            <h3 class="high">High Attention Areas (8-10)</h3>
            <ul>
              <li>Logo area in header (10)</li>
              <li>Main headline in hero section (10)</li>
              <li>Main CTA button (9)</li>
              <li>First product in listings (9)</li>
              <li>Menu button (9)</li>
              <li>Cart icon (8)</li>
            </ul>
          </div>
          
          <div class="attention-medium">
            <h3 class="medium">Medium Attention Areas (5-7)</h3>
            <ul>
              <li>Secondary product categories (6-7)</li>
              <li>Middle products in listings (6-7)</li>
              <li>Secondary banners (5-6)</li>
              <li>Social proof section heading (6)</li>
              <li>Search functionality (7)</li>
            </ul>
          </div>
          
          <div class="attention-low">
            <h3 class="low">Low Attention Areas (1-4)</h3>
            <ul>
              <li>Footer content (2-3)</li>
              <li>Brand story content (4)</li>
              <li>Lower Instagram feed posts (4)</li>
            </ul>
          </div>
        </div>
        
        <div class="user-flow">
          <h2>Typical E-Commerce User Attention Flow</h2>
          <p>The typical user attention flow on e-commerce sites like GLDN.com follows this pattern:</p>
          <ol>
            <li>Logo/branding recognition</li>
            <li>Hero headline and main CTA</li>
            <li>First product category or featured product</li>
            <li>Horizontal scanning of top categories</li>
            <li>Secondary banner content</li>
            <li>Best-selling products (left to right, decreasing attention)</li>
            <li>Brand story heading (but less attention on the content)</li>
            <li>Social proof/Instagram section</li>
            <li>Brief footer scan (primarily newsletter signup)</li>
          </ol>
        </div>
        
        <div class="recommendations">
          <h2>Optimization Recommendations</h2>
          <ol>
            <li><strong>Prioritize hero CTA placement</strong> - Ensure it aligns with the highest attention area</li>
            <li><strong>Position key products on the left</strong> - Take advantage of the natural F-pattern</li>
            <li><strong>Enhance visual hierarchy</strong> - Use size, color and contrast to guide attention flow</li>
            <li><strong>Simplify lower-attention areas</strong> - Reduce clutter in footer and secondary sections</li>
            <li><strong>Test alternative placements</strong> - Particularly for secondary CTAs and promotions</li>
          </ol>
        </div>
        
        <div class="timestamp">
          <p><em>Generated: June 9, 2025</em></p>
          <p><em>Note: This is a predictive analysis based on UX best practices rather than actual site analysis.</em></p>
        </div>
      </body>
      </html>
    `;

    fs.writeFileSync(fallbackHtmlPath, fallbackHtmlContent);
    console.log(`Fallback analysis HTML saved to ${fallbackHtmlPath}`);
  }

  // Close the browser
  await browser.close();
  console.log('Heatmap generation process completed!');
})();
