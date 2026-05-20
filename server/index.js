require('dotenv').config();
const express = require('express');
const cors = require('cors');
const youtubeService = require('./youtubeService');
const analysisService = require('./analysisService');
const { generatePowerPoint } = require('./pptService');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

/**
 * Main endpoint: Generate report
 * POST /api/generate-report
 * Body: { companyName, competitors: [name1, name2, ...] }
 */
app.post('/api/generate-report', async (req, res) => {
  try {
    const { companyName, competitors } = req.body;

    if (!companyName) {
      return res.status(400).json({ error: 'Company name is required' });
    }

    if (!competitors || competitors.length === 0) {
      return res.status(400).json({ error: 'At least one competitor name is required' });
    }

    // Validate API key
    if (!process.env.YOUTUBE_API_KEY) {
      return res.status(500).json({
        error: 'YouTube API key not configured',
      });
    }

    console.log(`\n📊 Generating report for: ${companyName}`);
    console.log(`Competitors: ${competitors.join(', ')}`);

    // Fetch data for company and competitors
    const allCompanies = [companyName, ...competitors];
    const companiesData = [];

    for (const company of allCompanies) {
      try {
        console.log(`Fetching data for: ${company}`);
        const data = await youtubeService.getCompanyData(company);
        companiesData.push(data);
        console.log(
          `✅ Fetched: ${company} (${data.subscriberCount} subscribers, ${data.videoCount} videos)`
        );
      } catch (error) {
        console.error(`❌ Error fetching data for ${company}: ${error.message}`);
        // Continue with other companies even if one fails
      }
    }

    if (companiesData.length === 0) {
      return res.status(400).json({
        error: 'Failed to fetch data for any company. Please check the company names.',
      });
    }

    // Generate analysis report
    console.log('\n🔍 Analyzing data...');
    const analysisReport = analysisService.createAnalysisReport(companiesData);

    // Generate PowerPoint
    res.json({
  success: true,
  report: analysisReport,
});
  } catch (error) {
    console.error('Error generating report:', error.message);
    res.status(500).json({
      error: error.message || 'Failed to generate report',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
});

/**
 * Download PowerPoint endpoint
 * POST /api/download-report
 * Body: { analysisReport }
 */
app.post('/api/download-report', async (req, res) => {
  try {
    const { analysisReport } = req.body;

    if (!analysisReport) {
      return res.status(400).json({ error: 'Analysis report is required' });
    }

    console.log('📥 Generating PowerPoint for download...');
    const pptBuffer = await generatePowerPoint(analysisReport);

    const companyNames = analysisReport.companies
      .map((c) => c.companyName)
      .join('_vs_')
      .replace(/\s+/g, '_');

    const filename = `Video_Competitor_Report_${companyNames}_${Date.now()}.pptx`;

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    );

    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${filename}"`
    );

    return res.send(pptBuffer);
  } catch (error) {
    console.error('Error downloading report:', error);

    return res.status(500).json({
      error: error.message || 'Failed to generate PowerPoint',
    });
  }
});


/**
 * Search company endpoint (for autocomplete)
 * GET /api/search-company?q=query
 */
app.get('/api/search-company', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.length < 2) {
      return res.json({ results: [] });
    }

    console.log(`Searching for company: ${q}`);
    const channelId = await youtubeService.searchChannel(q);

    if (channelId) {
      const channelStats = await youtubeService.getChannelStats(channelId);
      return res.json({
        results: [
          {
            id: channelId,
            name: channelStats.channelName,
            subscribers: channelStats.subscriberCount,
            profileImage: channelStats.profileImage,
          },
        ],
      });
    }

    res.json({ results: [] });
  } catch (error) {
    console.error('Error searching company:', error.message);
    res.json({ results: [] });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Video Competitor Intelligence Server`);
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API Key configured: ${!!process.env.YOUTUBE_API_KEY}`);
  console.log('\n📍 Endpoints:');
  console.log(`   POST /api/generate-report - Generate full report`);
  console.log(`   POST /api/download-report - Download PowerPoint`);
  console.log(`   GET  /api/search-company  - Search company`);
  console.log(`   GET  /api/health          - Health check\n`);
});

module.exports = app;
