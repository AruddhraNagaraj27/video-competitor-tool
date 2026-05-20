# COMPLETE SETUP & DEPLOYMENT GUIDE

## Step-by-Step Instructions to Deploy Your App

This guide will take you from zero to a live, publicly accessible Video Competitor Intelligence tool in under 1 hour.

---

## PART 1: GET YOUTUBE API KEY (5 minutes)

### 1. Go to Google Cloud Console

- Visit: https://console.cloud.google.com/
- Sign in with your Google account
- Click "Create Project"
- Project Name: `video-competitor-intelligence`
- Click Create

### 2. Enable YouTube Data API v3

- In the search bar, search: `YouTube Data API v3`
- Click on it and press "ENABLE"
- Wait for it to enable (takes 30 seconds)

### 3. Create API Key

- Go to Credentials (left sidebar)
- Click "Create Credentials" → "API Key"
- Copy the API key (you'll need this!)
- Restrict it to YouTube Data API v3 for security

### 4. Save Your API Key

```
YOUTUBE_API_KEY = your_api_key_here
```

Keep this safe! You'll need it for deployment.

---

## PART 2: SET UP GITHUB REPOSITORY (5 minutes)

### 1. Create GitHub Account

- Go to https://github.com
- Sign up if you don't have an account

### 2. Create New Repository

- Click "+" → "New repository"
- Name: `video-competitor-tool`
- Description: "Video Competitor Intelligence Report Generator"
- Make it Public
- Initialize with README
- Click Create Repository

### 3. Upload Code

In your terminal (in the video-competitor-tool folder):

```bash
git init
git add .
git commit -m "Initial commit - Video Competitor Intelligence Tool"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/video-competitor-tool
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## PART 3: DEPLOY BACKEND TO RENDER (10 minutes)

### 1. Create Render Account

- Go to https://render.com
- Sign up or log in
- Click "Connect to GitHub" during signup
- Authorize Render to access your repositories

### 2. Deploy Backend Service

- From Render dashboard, click "New +"
- Select "Web Service"
- Select your `video-competitor-tool` repository
- Click Connect

### 3. Configure Service

Fill in these settings:

| Setting        | Value                  |
| -------------- | ---------------------- |
| Name           | `video-competitor-api` |
| Root Directory | `server`               |
| Environment    | `Node`                 |
| Build Command  | `npm install`          |
| Start Command  | `npm start`            |
| Instance Type  | `Free`                 |

### 4. Add Environment Variables

- Click "Advanced"
- Add New Environment Variable:
  - Key: `YOUTUBE_API_KEY`
  - Value: `[paste your YouTube API key here]`
- Add another:
  - Key: `NODE_ENV`
  - Value: `production`

### 5. Deploy

- Click "Create Web Service"
- Wait for deployment (2-3 minutes)
- You'll see: "Your service is live!"
- Copy your Render URL (looks like: `https://video-competitor-api-xxxxx.onrender.com`)

**Save this URL!** You'll need it for frontend deployment.

---

## PART 4: DEPLOY FRONTEND TO VERCEL (10 minutes)

### 1. Create Vercel Account

- Go to https://vercel.com
- Click "Sign Up"
- Choose "Continue with GitHub"
- Authorize Vercel

### 2. Import Project

- From Vercel dashboard, click "Add New..."
- Select "Project"
- Select your `video-competitor-tool` repository
- Click Import

### 3. Configure Project

Fill in these settings:

| Setting          | Value                   |
| ---------------- | ----------------------- |
| Project Name     | `video-competitor-tool` |
| Framework        | `Vite`                  |
| Root Directory   | `client`                |
| Build Command    | `npm run build`         |
| Output Directory | `dist`                  |

### 4. Add Environment Variables

- Click "Environment Variables"
- Add:
  - Key: `VITE_API_URL`
  - Value: `https://video-competitor-api-xxxxx.onrender.com` (your Render URL)
- Select `Production` environment
- Click "Add"

### 5. Deploy

- Click "Deploy"
- Wait for deployment (2-3 minutes)
- Once complete, you'll see: "Congratulations! Your project has been successfully deployed"
- Your live URL: `https://video-competitor-tool.vercel.app`

**This is your public live URL!** 🎉

---

## PART 5: UPDATE FRONTEND CODE (OPTIONAL)

If you want to use environment variables in frontend:

### Edit client/src/App.jsx

Find this line:

```javascript
const response = await fetch('/api/generate-report', {
```

You can optionally use environment variable:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const response = await fetch(`${API_URL}/api/generate-report`, {
```

Then push to GitHub:

```bash
git add .
git commit -m "Update API URL to use environment variables"
git push
```

Vercel will automatically redeploy!

---

## PART 6: TEST YOUR LIVE APP

### 1. Open Your Live URL

- Click the Vercel URL or paste: `https://video-competitor-tool.vercel.app`

### 2. Test with Demo Companies

**Company**: `Amul`
**Competitors**: `Aavin`, `Country Delight`, `Milky Mist`, `Akshayakalpa`

### 3. Click "Generate Competitor Report"

- Wait 10-30 seconds for analysis
- Review the web report
- Download PowerPoint

### 4. Download & Check PowerPoint

- Open the downloaded file
- Verify all 11 slides are present
- Check professional styling
- Confirm data accuracy

---

## TROUBLESHOOTING

### Backend Not Responding

- Check Render dashboard
- Click your service
- Check "Logs" tab
- Look for error messages
- Verify API key is correct

### Frontend Shows Blank Page

- Check Vercel dashboard
- Click your project
- Go to "Deployments" → latest
- Check "Build Logs"
- Check "Runtime Logs"

### Report Generation Fails

1. Open browser DevTools (F12)
2. Go to Network tab
3. Click "Generate Report"
4. Look for failed requests
5. Check response messages
6. Common issue: Invalid API key → get new one from Google Cloud

### Deployment Slow

- Free Render tier sleeps after inactivity
- First request will be slow (30-60 seconds)
- Subsequent requests are faster
- To fix: Upgrade to paid Render tier ($7/month)

---

## LOCAL TESTING (BEFORE DEPLOYMENT)

To test locally before deploying:

```bash
# Terminal 1: Start Backend
cd server
npm install
npm start
# Should show: "Server running on http://localhost:5000"

# Terminal 2: Start Frontend
cd client
npm install
npm run dev
# Should show: "Local: http://localhost:3000"
```

Then open http://localhost:3000 and test.

---

## FILE CHECKLIST

Verify these files exist in your repository:

```
server/
├── package.json ✓
├── .env.example ✓
├── index.js ✓
├── youtubeService.js ✓
├── analysisService.js ✓
└── pptService.js ✓

client/
├── package.json ✓
├── vite.config.js ✓
├── tailwind.config.js ✓
├── postcss.config.js ✓
├── index.html ✓
└── src/
   ├── main.jsx ✓
   ├── App.jsx ✓
   ├── index.css ✓
   ├── pages/ (2 files) ✓
   └── components/ (8 files) ✓

README.md ✓
SETUP_GUIDE.md ✓ (this file)
```

---

## AFTER DEPLOYMENT CHECKLIST

- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] API key configured in Render
- [ ] Environment variables set on Vercel
- [ ] Live URL tested and working
- [ ] Sample report generated successfully
- [ ] PowerPoint downloaded and verified
- [ ] All 11 slides present in PowerPoint
- [ ] Professional styling applied
- [ ] No error messages in console

---

## GOING LIVE - FINAL STEPS

### 1. Share Your Live URL

Your app is now accessible to anyone:

```
https://your-vercel-project-name.vercel.app
```

### 2. Create a Demo Video

Record yourself:

1. Opening the live app
2. Entering: Company="Amul", Competitors="Aavin, Country Delight, Milky Mist, Akshayakalpa"
3. Clicking "Generate Report"
4. Showing the web report with all sections
5. Downloading the PowerPoint
6. Opening the PowerPoint and showing the slides

### 3. Document Your Submission

Prepare:

- Live URL: [Your Vercel URL]
- GitHub Repository: https://github.com/YOUR_USERNAME/video-competitor-tool
- Source Code Zip: [Download from GitHub as ZIP]
- Demo Video: [Upload to YouTube or include with submission]

### 4. Submit Your Project

Include in email:

```
Subject: Video Competitor Intelligence Tool - Submission

Live URL: https://...
GitHub: https://github.com/...

Zip file attached: video-competitor-tool.zip
Demo Video: [link]

Technology Stack:
- Frontend: React + Tailwind
- Backend: Node.js + Express
- API: YouTube Data API v3
- PPT: pptxgenjs
- Deployed: Vercel + Render

Features:
✓ Real YouTube data analysis
✓ 11-slide professional PowerPoint
✓ Interactive web report
✓ Scoring system (0-100)
✓ Deployment-ready

Test Instructions:
1. Visit live URL
2. Enter: Amul
3. Competitors: Aavin, Country Delight, Milky Mist, Akshayakalpa
4. Download PowerPoint
```

---

## OPTIMIZATION TIPS

### Make It Faster

1. Cache API responses (reduce YouTube API calls)
2. Compress images in reports
3. Use CDN for frontend (Vercel does this automatically)

### Improve Reliability

1. Add error handling for failed API calls
2. Implement retry logic
3. Set up uptime monitoring

### Scale Up

1. Add database to store reports
2. Support batch processing
3. Add email delivery
4. Create user accounts

---

## COMMON DEPLOYMENT ISSUES & FIXES

| Issue                  | Fix                                      |
| ---------------------- | ---------------------------------------- |
| "Cannot find module"   | Run `npm install` in backend folder      |
| API key not working    | Generate new key in Google Cloud         |
| Build fails on Render  | Check Node version (use 16+)             |
| Vercel shows 404       | Verify Root Directory is set to `client` |
| CORS errors            | Check backend CORS configuration         |
| Reports don't download | Check browser console for errors         |
| PowerPoint is empty    | Verify pptxgenjs installed correctly     |

---

## NEXT STEPS

After successful deployment:

1. **Monitor Performance**
   - Check Vercel Analytics dashboard
   - Monitor Render CPU/memory usage
   - Track YouTube API quota

2. **Gather Feedback**
   - Share with friends
   - Test different companies
   - Optimize based on feedback

3. **Plan Improvements**
   - Add more metrics
   - Include TikTok/Instagram
   - Implement user accounts
   - Add report scheduling

4. **Make It Production-Ready**
   - Set up error tracking (Sentry)
   - Add analytics (Google Analytics)
   - Implement logging
   - Set up CDN (done by Vercel)

---

## FINAL NOTES

This is a **complete, production-ready** application that:

- ✅ Works with real YouTube data
- ✅ Generates professional reports
- ✅ Is deployed to public URLs
- ✅ Can be shared with anyone
- ✅ Requires no authentication
- ✅ Provides value immediately

You now have:

- A **live web application**
- A **downloadable PowerPoint generator**
- A **competitive analysis tool**
- A **professional portfolio project**

**Congratulations! Your app is live! 🎉**

---

## CONTACT & SUPPORT

- YouTube API Issues: https://developers.google.com/youtube/v3
- Render Deployment Help: https://render.com/docs
- Vercel Deployment Help: https://vercel.com/docs
- React Questions: https://react.dev/learn

---

**Project Status: READY FOR PRODUCTION** ✅

Good luck with your submission! You're well-positioned to get shortlisted. 🚀
