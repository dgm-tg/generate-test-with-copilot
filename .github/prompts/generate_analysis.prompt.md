# A/B Test Prompt Templates with Screenshots & Heatmaps

## Basic Template with Screenshot:

```
@generate_test.prompt.md

**Website**: [URL]
**Target Element**: [Description]
**Desired Modification**: [Specific change]
**Documentation**: Take screenshots for analysis and documentation

**Steps**:
1. Go to [website URL]
2. Take a full-page screenshot and save to `/screenshots/[site-name]-original-[timestamp].png`
3. Find the [target element description]
4. Generate JavaScript to [specific modification]
5. Apply the modification and take another screenshot and save to `/screenshots/[site-name]-modified-[timestamp].png`
```

## Template with Heatmap Overlay:

```
@generate_test.prompt.md

**Website**: [URL]
**Target Element**: [Description]
**Desired Modification**: [Specific change]
**Heatmap**: I will provide a predictive heatmap image to overlay
**Documentation**: Capture screenshots with heatmap analysis

**Steps**:
1. Go to [website URL]
2. Take a full-page screenshot and save to `/screenshots/[site-name]-original.png`
3. Overlay the provided heatmap image onto the screenshot with 65% opacity
4. Save the combined image to `/heatmaps/[site-name]-with-heatmap.png`
5. Find the [target element description]
6. Analyze how the target element aligns with high-attention areas in the heatmap
7. Generate JavaScript to [specific modification]
8. Apply modifications and take final screenshot and save to `/screenshots/[site-name]-final.png`
```

## Complete Example with Heatmap:

```
@generate_test.prompt.md

**Website**: https://www.example.com
**Target Element**: Call-to-action button in the hero section
**Desired Modification**: Move the CTA button to align with the highest attention area shown in the heatmap
**Heatmap**: [Attach your predictive heatmap image file]
**Analysis Goal**: Optimize button placement based on predicted user attention patterns

**Steps**:
1. Go to https://www.example.com
2. Take a full-page screenshot and save to `/screenshots/example-com-original.png`
3. Load and overlay the provided heatmap image with 65% opacity
4. Save the combined image to `/heatmaps/example-com-heatmap-analysis.png`
5. Find the current CTA button in the hero section
6. Identify the coordinates of the highest attention area from the heatmap
7. Generate JavaScript to reposition the CTA button to align with the hottest heatmap area
8. Include CSS positioning and z-index adjustments as needed
9. Apply the modification and take a final screenshot and save to `/screenshots/example-com-optimized.png`
10. Create a comparison showing original vs heatmap vs final positioning
```

## Advanced Template - Multiple Elements with Heatmap:

```
@generate_test.prompt.md

**Website**: https://landing.example.com
**Target Elements**:
- Primary headline
- Hero image
- CTA button
- Social proof section
**Desired Modification**: Reorganize page layout based on heatmap attention patterns
**Heatmap**: [Attach predictive heatmap]
**Goal**: Restructure page hierarchy to match predicted user attention flow

**Steps**:
1. Go to https://landing.example.com
2. Take full-page screenshot and save to `/screenshots/landing-original.png`
3. Overlay heatmap with 60% opacity and save to `/heatmaps/landing-heatmap-overlay.png`
4. Identify all target elements and their current positions
5. Map each element's current position against heatmap attention areas
6. Create a priority ranking based on heatmap intensity:
   - Highest attention area: [most important element]
   - Second highest: [second most important]
   - etc.
7. Generate JavaScript functions to:
   - Reposition elements according to attention hierarchy
   - Adjust sizes based on attention area size
   - Modify colors/contrast for low-attention elements
8. Apply all modifications and take final screenshot and save to `/screenshots/landing-optimized.png`
9. Create a side-by-side comparison image showing before/after with heatmap reference
```

## Template for Heatmap-Driven Color/Contrast Changes:

```
@generate_test.prompt.md

**Website**: https://shop.example.com/product/123
**Target Element**: Product images and pricing information
**Desired Modification**: Adjust visual prominence based on heatmap data
**Heatmap**: [Attach eye-tracking or attention heatmap]
**Strategy**: Make high-attention areas more prominent, reduce visual noise in low-attention areas

**Steps**:
1. Go to https://shop.example.com/product/123
2. Capture original screenshot and save to `/screenshots/product-page-original.png`
3. Overlay heatmap at 70% opacity and save to `/heatmaps/product-page-analysis.png`
4. Identify which elements fall in:
   - High attention zones (red/orange in heatmap)
   - Medium attention zones (yellow/green)
   - Low attention zones (blue/cold areas)
5. Generate JavaScript to:
   - Increase contrast/saturation for high-attention elements
   - Add subtle highlighting or borders to medium-attention areas
   - Reduce opacity or desaturate low-attention elements
   - Adjust font weights based on attention levels
6. Apply changes and screenshot and save to `/screenshots/product-page-optimized.png`
7. Create a 3-panel comparison: original | heatmap | optimized
```

## Key Instructions for Heatmap Integration:

### File Handling:

- Save all files in a shared directory in /analysis
- Use consistent naming conventions: `[site]-[type]-[timestamp].png` and `[site]-heatmap-[type].png`
- Create comparison images when possible

### Heatmap Overlay Specifications:

- Use 60-70% opacity for heatmap overlays (maintains readability)
- Ensure proper alignment - ask for positioning guidance if the heatmap doesn't align perfectly
- Save both the individual screenshot and the overlay combination

### Analysis Integration:

- Reference specific heatmap zones when describing modifications
- Explain the reasoning: "Moving CTA to red zone because it shows 40% higher attention"
- Consider heatmap data in your modification strategy

### Documentation Output:

- Always provide before/after visual documentation
- Include the heatmap reference in your analysis
- Create summary images showing the optimization rationale
