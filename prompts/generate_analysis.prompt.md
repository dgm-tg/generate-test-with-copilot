# Conversion Rate Optimization with Heatmaps

## URL-Only Template (Simplified Input):

```
**Website**: [URL]

This is all you need to provide! The system will automatically:
1. Visit the URL
2. Identify key elements
2. Take a screenshot
3. Generate a predictive heatmap analyses
5. Suggest optimizations
6. Create a complete analysis report with the heatmap in the 40% width left column and the analysis content in a 60% width right column.
```

## Key Instructions for Heatmap Integration:

### File Handling:

- Save all files in a structured directory: `/analysis/{url}/`
- **Report Replacement**: Always check if a report directory exists for the URL. If found, completely remove and recreate it to replace the old report
- Use consistent naming conventions: `original.png`, `heatmap.png`, `heatmap-overlay.png`, `final.png`, `comparison.png`
- Create comparison images automatically to show the optimization process

### HTML Report Layout Requirements:

- **Two-Column Layout**: Create HTML page with CSS grid or flexbox
- **Left Panel (40% width)**: Display all visual content
  - Heatmap
- **Right Panel (60% width)**: Display text content and analysis
  - Executive summary
  - Detailed analysis
  - Optimization recommendations
  - Metrics and expected improvements
  - Implementation notes
- **Responsive Design**: Ensure layout works on different screen sizes
- **Navigation**: Add anchor links between sections for easy navigation

### URL Processing:

- Extract domain from URL and sanitize for directory names
- Handle subdirectories and querystring parameters appropriately
- Create nested directory structure that mirrors the URL path when needed
- **Duplicate Handling**: Before creating new analysis, check if URL has been analyzed before and replace existing reports

### Heatmap Overlay Specifications:

- Use 60-70% opacity for heatmap overlays (maintains readability)
- Auto-generate predictive heatmap if one is not provided by the user
- Ensure proper alignment of heatmap with the page elements
- Save both the individual screenshot and the overlay combination

### Analysis Integration:

- Reference specific heatmap zones when describing modifications
- Explain the reasoning: "Moving CTA to red zone because it shows 40% higher attention"
- Consider heatmap data in your modification strategy

### Documentation Output:

- Always provide before/after visual documentation in the left panel
- Include the heatmap reference in your analysis in the right panel
- Create summary images showing the optimization rationale
- **No Unit Tests**: Focus on visual analysis and user experience optimization only
- Generate actionable recommendations rather than test code
