# Competitor Analysis Tool

A comprehensive web-based competitor analysis tool designed specifically for product managers to track, analyze, and compare competitors in their market.

## Features

### 1. Dashboard Overview
- Track total number of competitors
- Monitor features being compared
- View average market ratings
- Identify market leaders
- Quick overview of all competitors

### 2. Competitor Management
- Add, edit, and delete competitor profiles
- Track key metrics:
  - Company name and website
  - Market share percentage
  - Founded year
  - Rating (1-5 scale)
  - Number of employees
  - Pricing model (Freemium, Subscription, One-time, Usage-based, Enterprise)
  - Starting price
  - Target market
  - Key strengths and weaknesses
  - Additional notes

### 3. Feature Comparison Matrix
- Create custom features to compare across competitors
- Categorize features (Core, Integrations, Support, Security, Analytics, Other)
- Interactive comparison table with three states:
  - ✓ Feature available
  - ◐ Partially available
  - ✗ Not available
- Click to toggle feature status for each competitor

### 4. SWOT Analysis
- Detailed SWOT analysis for each competitor
- Four quadrants:
  - **Strengths**: Internal positive attributes
  - **Weaknesses**: Internal limitations
  - **Opportunities**: External favorable factors
  - **Threats**: External challenges
- Easy-to-edit text areas for each section
- Save and retrieve analysis per competitor

### 5. Pricing Comparison
- Side-by-side pricing comparison
- Compare pricing models across competitors
- View starting prices and target markets
- Identify pricing strategies

### 6. Market Positioning Map
- Visual 2D positioning map
- Customizable axes:
  - Price (Low to High)
  - Feature Richness
  - Market Share
  - Customer Satisfaction
  - Quality
  - Innovation
- Interactive canvas visualization
- Color-coded competitor markers with legend

### 7. Data Management
- Local storage-based persistence
- Export analysis data as JSON
- Import previous analyses
- No backend required - runs entirely in the browser

## How to Use

### Getting Started

1. **Open the Application**
   - Simply open `index.html` in any modern web browser
   - No installation or server setup required

2. **Add Your First Competitor**
   - Click the "Add Competitor" button in the header
   - Fill in the competitor information
   - Required: Company name
   - Optional: All other fields (recommended for better analysis)
   - Click "Add Competitor" to save

### Managing Competitors

**Viewing Competitors:**
- Click on the "Competitors" tab to see all competitor profiles
- Each card shows key metrics and information

**Editing Competitors:**
- Click the edit (pencil) icon on any competitor card
- Update the information
- Click "Update Competitor" to save changes

**Deleting Competitors:**
- Click the trash icon on any competitor card
- Confirm deletion when prompted

### Using the Feature Comparison

1. **Add Features:**
   - Navigate to the "Feature Comparison" tab
   - Click "Add Feature" button
   - Enter feature name, category, and description
   - Click "Add Feature" to save

2. **Compare Features:**
   - The matrix shows all competitors vs. all features
   - Click any cell to toggle the feature status:
     - Click once: Mark as available (✓)
     - Click twice: Mark as partially available (◐)
     - Click three times: Mark as not available (✗)

3. **Organize by Category:**
   - Features are automatically grouped by category
   - Categories appear as section headers in the matrix

### Conducting SWOT Analysis

1. Navigate to the "SWOT Analysis" tab
2. Select a competitor from the dropdown
3. Fill in the four quadrants:
   - Strengths: What they do well
   - Weaknesses: Where they fall short
   - Opportunities: Market opportunities they can leverage
   - Threats: External challenges they face
4. Click "Save SWOT Analysis" to store your notes

### Analyzing Pricing

1. Go to the "Pricing" tab
2. View side-by-side comparison of:
   - Pricing models
   - Starting prices
   - Target markets
3. Use this to identify pricing gaps and opportunities

### Visualizing Market Position

1. Navigate to the "Market Position" tab
2. Select X-axis metric (e.g., Price)
3. Select Y-axis metric (e.g., Quality)
4. Click "Update Map" to refresh the visualization
5. Analyze competitor clustering and positioning
6. Identify market gaps and positioning opportunities

### Exporting Data

- Click "Export Analysis" in the header
- Downloads a JSON file with all your data
- Includes competitors, features, and analysis
- Use for backups or sharing with team members

## Product Manager Use Cases

### 1. Competitive Intelligence
- Track competitor launches and updates
- Monitor market share changes
- Identify emerging competitors

### 2. Product Planning
- Identify feature gaps in your product
- Find underserved market segments
- Prioritize feature development based on competitor offerings

### 3. Go-to-Market Strategy
- Analyze competitor pricing strategies
- Identify positioning opportunities
- Define unique value propositions

### 4. Executive Reporting
- Export comprehensive analysis
- Share visual positioning maps
- Present SWOT findings to stakeholders

### 5. Strategic Planning
- Long-term competitor monitoring
- Market trend analysis
- Strategic threat assessment

## Technical Details

### Technologies Used
- **HTML5**: Structure and semantics
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: No frameworks required
- **Canvas API**: For positioning map visualization
- **LocalStorage API**: For data persistence
- **Font Awesome**: Icons

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with ES6 support

### Data Storage
- All data is stored locally in your browser using LocalStorage
- No data is sent to external servers
- Data persists across browser sessions
- Clear browser data will delete stored analysis

### Performance
- Handles hundreds of competitors efficiently
- Instant updates and rendering
- No network latency
- Runs entirely client-side

## Tips & Best Practices

1. **Regular Updates**: Update competitor data regularly to keep analysis current

2. **Comprehensive Profiles**: Fill in as many fields as possible for richer insights

3. **Feature Categories**: Use consistent categories for easier comparison

4. **SWOT Depth**: Be specific in SWOT analysis - avoid generic statements

5. **Multiple Perspectives**: Use different axis combinations in positioning map to gain various insights

6. **Backup Data**: Regularly export your analysis for backups

7. **Team Collaboration**: Export and share JSON files with team members

8. **Iterative Analysis**: Revisit and update analysis as market conditions change

## Future Enhancements

Potential features for future versions:
- PDF export with formatted reports
- Chart.js integration for more visualizations
- Competitor comparison scoring system
- Timeline tracking for historical changes
- Team collaboration features
- Cloud sync capabilities
- Mobile app version
- Integration with business intelligence tools

## Support

For issues, questions, or feature requests, please open an issue in the repository.

## License

This project is open source and available for use in your organization.