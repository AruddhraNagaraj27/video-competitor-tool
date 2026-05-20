# Video Competitor Intelligence Report Generator

A professional web application that analyzes YouTube video marketing strategies for your company and competitors, generating comprehensive reports with actionable insights.

## Features

✅ **Real YouTube Data Analysis**

- Fetch live subscriber counts, video counts, and engagement metrics
- Analyze 50+ latest videos from each channel
- Calculate engagement rates, posting frequency, and content themes

✅ **Professional Reporting**

- 11-slide professional PowerPoint reports
- Interactive web-based report preview
- Custom scoring system (0-100 points)
- Charts, tables, and visual data representation

✅ **Comprehensive Analysis**

- Executive Summary with key findings
- Channel overview comparison
- Top performing videos identification
- Engagement metrics analysis
- Posting frequency and consistency tracking
- Content theme analysis
- Gap analysis with competitive opportunities
- Specific recommendations
- Final ranking with score breakdown

✅ **User-Friendly Interface**

- Clean, modern UI built with React and Tailwind CSS
- Responsive design works on all devices
- Fast report generation
- One-click PowerPoint download

## Tech Stack

- **Frontend**: React 18 + Tailwind CSS + Vite
- **Backend**: Node.js + Express.js
- **API**: YouTube Data API v3
- **PPT Generation**: pptxgenjs
- **Deployment**: Vercel (Frontend) + Render (Backend)

## Quick Start

### Prerequisites

- Node.js 16+
- YouTube API Key (free from [Google Cloud Console](https://console.cloud.google.com/))
- Git

### Installation

1. **Clone and setup**

```bash
cd video-competitor-tool

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

2. **Configure YouTube API Key**
   - Get your free API key from [Google Cloud Console](https://console.cloud.google.com/)
   - Create `.env` file in `server/` directory:

   ```
   YOUTUBE_API_KEY=your_api_key_here
   PORT=5000
   NODE_ENV=development
   ```

3. **Run locally**

```bash
# Terminal 1: Start backend (from server/)
npm start
# Server runs on http://localhost:5000

# Terminal 2: Start frontend (from client/)
npm run dev
# App runs on http://localhost:3000
```

4. **Test the application**
   - Open http://localhost:3000
   - Enter: Company = "Amul", Competitors = "Aavin, Country Delight, Milky Mist, Akshayakalpa"
   - Click "Generate Competitor Report"
   - Download PowerPoint when ready

## Deployment

### Deploy Backend to Render

1. **Push code to GitHub** (if not already done)

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/video-competitor-tool
git push -u origin main
```

2. **Create Render account** at [render.com](https://render.com)

3. **Deploy Backend**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Settings:
     - Name: `video-competitor-api`
     - Root Directory: `server`
     - Environment: `Node`
     - Build Command: `npm install`
     - Start Command: `npm start`
   - Add Environment Variable:
     - Key: `YOUTUBE_API_KEY`
     - Value: Your YouTube API Key
   - Click Deploy

4. **Note your Render URL** (e.g., `https://video-competitor-api.onrender.com`)

### Deploy Frontend to Vercel

1. **Create Vercel account** at [vercel.com](https://vercel.com)

2. **Import and deploy**
   - Click "New Project"
   - Import your GitHub repository
   - Framework: Vite
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Add Environment Variable:
     - Key: `VITE_API_URL`
     - Value: Your Render backend URL (e.g., `https://video-competitor-api.onrender.com`)

3. **Update frontend API calls**
   - In `client/src/App.jsx`, update API base URL:

   ```javascript
   const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
   ```

4. **Click Deploy** - Your app is now live!

## API Endpoints

### POST `/api/generate-report`

Generate a complete analysis report.

**Request:**

```json
{
  "companyName": "Amul",
  "competitors": ["Aavin", "Country Delight", "Milky Mist"]
}
```

**Response:**

```json
{
  "success": true,
  "report": {
    "companies": [...],
    "rankings": [...],
    "overallInsights": [...]
  }
}
```

### POST `/api/download-report`

Download analysis as PowerPoint file.

**Request:**

```json
{
  "analysisReport": { ...report object... }
}
```

**Response:** Binary PowerPoint file

### GET `/api/search-company?q=search_term`

Search for a company's YouTube channel.

**Response:**

```json
{
  "results": [
    {
      "id": "channelId",
      "name": "Channel Name",
      "subscribers": 1000000,
      "profileImage": "image_url"
    }
  ]
}
```

## Scoring System (0-100)

The tool scores each company on 5 metrics (20 points each):

1. **Subscriber Strength** (20 pts)
   - Based on subscriber count
   - Max reference: 1M subscribers = 20 pts

2. **Views Performance** (20 pts)
   - Based on total views
   - Max reference: 100M total views = 20 pts

3. **Engagement Rate** (20 pts)
   - (Likes + Comments) / Views × 100%
   - Max reference: 5% engagement = 20 pts

4. **Posting Consistency** (20 pts)
   - Videos per week
   - Max reference: 14 videos/week = 20 pts

5. **Content Variety** (20 pts)
   - Number of unique content themes
   - Max reference: 10+ themes = 20 pts

**Final Score**: Sum of all five scores (max 100 points)

## PowerPoint Report Contents (11 Slides)

1. **Cover Slide** - Company names and date
2. **Executive Summary** - Key findings and market leader
3. **Channel Overview** - Subscriber and video count comparison
4. **Subscriber Chart** - Visual comparison of subscribers
5. **Top Performing Videos** - Best videos from each company
6. **Engagement Analysis** - Views, likes, comments comparison
7. **Posting Frequency** - Upload consistency analysis
8. **Content Themes** - Topics covered by each company
9. **Gap Analysis** - Opportunities and missing content
10. **Recommendations** - Specific actionable steps
11. **Final Ranking** - Score breakdown and winner

## Professional Design Features

- Dark navy background (#1a3a52) with gold accents (#d4af37)
- Consistent typography and spacing
- Charts with easy-to-read data
- Color-coded metrics (blue=views, green=likes, purple=comments)
- Professional color scheme throughout
- Clean, organized layout
- Non-crowded slides with clear hierarchy

## Insights & Recommendations

The tool automatically generates intelligent insights such as:

- "Amul has stronger audience reach compared to competitors"
- "Aavin should improve consistency by posting at least 2 videos per week"
- "Country Delight has higher engagement than competitors - focus on community interaction"
- Gap analysis identifying missing content topics
- Specific recommendations based on competitor strategies

## Example Companies for Testing

These have strong YouTube presence for testing:

- Amul
- Aavin
- Country Delight
- Milky Mist
- Akshayakalpa

## Troubleshooting

**"Failed to fetch channel data"**

- Check YouTube API key is valid
- Ensure company name is correct/exists on YouTube
- Check API quota limits in Google Cloud Console

**Report generation takes too long**

- First request may be slower as it fetches 50 videos per channel
- Subsequent requests are faster (API caching)

**PowerPoint download fails**

- Check browser console for errors
- Ensure backend is running
- Try with simpler company names

**Deployment issues**

Render:

- Check build logs in Render dashboard
- Ensure environment variables are set
- Verify GitHub repo connection

Vercel:

- Check build logs
- Ensure Root Directory is set to `client`
- Verify environment variables

## File Structure

```
video-competitor-tool/
├── client/                    # React frontend
│   ├── src/
│   │   ├── App.jsx           # Main app component
│   │   ├── index.css         # Tailwind styles
│   │   ├── main.jsx          # App entry
│   │   ├── pages/
│   │   │   ├── InputPage.jsx    # Input form page
│   │   │   └── ReportPage.jsx   # Report display page
│   │   └── components/       # Report sections
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
│
├── server/                    # Node.js backend
│   ├── index.js              # Express server
│   ├── youtubeService.js     # YouTube API integration
│   ├── analysisService.js    # Data analysis & scoring
│   ├── pptService.js         # PowerPoint generation
│   ├── package.json
│   └── .env.example
│
└── README.md

```

## Key Features Explained

### Real Data Fetching

The app uses the official YouTube Data API v3 to fetch:

- Channel information (subscribers, description, profile image)
- Latest 50 videos from each channel
- Video statistics (views, likes, comments, publish date)

### Analysis Engine

Calculates complex metrics:

- Engagement rates across all videos
- Posting frequency (videos per week)
- Content theme analysis from video titles/descriptions
- Top performing videos by views
- Comparative metrics across all companies

### PowerPoint Generation

Uses `pptxgenjs` library to:

- Create professional slides with consistent styling
- Add charts and tables
- Include company logos
- Format data visualization
- Support binary file download

## Performance

- Reports generate in 10-30 seconds depending on network
- PowerPoint files are 500KB-2MB
- Frontend loads in under 3 seconds
- API responses are cached for 1 hour

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## Security

- API key stored server-side only
- No sensitive data stored client-side
- CORS enabled for cross-origin requests
- Input validation on all endpoints
- Error messages don't expose internal details

## Limitations & Disclaimers

- YouTube API has rate limits (10K quota units/day free)
- Private channels cannot be analyzed
- Data may have slight delay (YouTube caches for ~24 hours)
- Engagement metrics exclude Community posts and Shorts
- Video duration conversion approximated

## Cost

- **YouTube API**: Free (10K units/day quota)
- **Render Hosting**: Free tier available (sleeps after 15 min inactivity)
- **Vercel Hosting**: Free tier available
- **Total Cost**: $0 to start

To upgrade:

- Render: $7-20/month for always-on backend
- Vercel: Free stays free

## Support & Issues

**Common Issues**:

1. **API Quota Exceeded**
   - Free quota: 10K units/day
   - Each report uses ~1.5K units
   - Solution: Wait until next day or upgrade API quota

2. **Channel Not Found**
   - Company must have official YouTube channel
   - Try: "Company Name Official" or "Company Channel"

3. **No Videos Found**
   - Ensure channel has public videos
   - Check if channel is active

## Future Enhancements

- Add more YouTube metrics (Shorts, live streams)
- TikTok and Instagram integration
- Custom date range analysis
- Batch report generation
- Email delivery of reports
- Compare 8+ competitors
- Historical tracking
- Advanced AI-powered insights

## License

This project is provided as-is for educational and commercial use.

## Contact & Support

For issues or questions:

1. Check the Troubleshooting section above
2. Review API documentation at [developers.google.com/youtube](https://developers.google.com/youtube)
3. Check Render/Vercel dashboard logs

---

**Ready to Deploy?** You're just 3 steps away from a live, production-ready competitor intelligence tool!

1. Get YouTube API key
2. Deploy backend to Render
3. Deploy frontend to Vercel

Your live URL will look like: `https://your-app.vercel.app`

Good luck! 🚀
