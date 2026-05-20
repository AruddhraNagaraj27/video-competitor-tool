const PptxGenJs = require('pptxgenjs');

/**
 * Generate professional PowerPoint report
 */
function generatePowerPointReport(analysisReport) {
  const prs = new PptxGenJs();

  prs.layout = 'LAYOUT_WIDE';
  prs.author = 'Aruddhra';
  prs.subject = 'Video Competitor Intelligence Report';
  prs.title = 'Video Competitor Intelligence Report';
  prs.company = 'Video Competitor Analyzer';

  const colors = {
    darkNavy: '16384F',
    blue: '0070C0',
    lightBlue: 'D9EAF7',
    gold: 'D4AF37',
    white: 'FFFFFF',
    lightGray: 'F5F7FA',
    gray: 'D9D9D9',
    text: '333333',
    lightText: '666666',
  };

  const companies = analysisReport.companies || [];
  const rankings = analysisReport.rankings || [];

  // Slide 1: Cover
  const slide1 = prs.addSlide();
  slide1.background = { color: colors.darkNavy };

  const companyNames = companies.map((c) => c.companyName).join(' vs ');
  const reportDate = new Date(
    analysisReport.timestamp || Date.now()
  ).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  slide1.addText('Video Competitor Intelligence Report', {
    x: 0.6,
    y: 2,
    w: 12.1,
    h: 0.8,
    fontSize: 34,
    bold: true,
    color: colors.white,
    align: 'center',
    fontFace: 'Calibri',
    fit: 'shrink',
  });

  slide1.addText(companyNames, {
    x: 1,
    y: 3.05,
    w: 11.3,
    h: 0.5,
    fontSize: 20,
    bold: true,
    color: colors.gold,
    align: 'center',
    fontFace: 'Calibri',
    fit: 'shrink',
  });

  slide1.addText(`Report Generated: ${reportDate}`, {
    x: 1,
    y: 6.3,
    w: 11.3,
    h: 0.4,
    fontSize: 13,
    color: colors.white,
    align: 'center',
    fontFace: 'Calibri',
  });

  // Slide 2: Executive Summary
  const slide2 = prs.addSlide();
  addSlideHeader(slide2, 'Executive Summary', colors, prs);

  const leader = rankings[0];

  slide2.addText(
    leader
      ? `${leader.companyName} is currently leading in video marketing with an overall score of ${leader.score}/100.`
      : 'Video performance has been compared across all entered companies.',
    {
      x: 0.7,
      y: 1.15,
      w: 12,
      h: 0.45,
      fontSize: 16,
      bold: true,
      color: colors.blue,
      fit: 'shrink',
    }
  );

  let y = 1.85;
  buildExecutiveInsights(companies, rankings).slice(0, 5).forEach((insight) => {
    slide2.addText(`• ${insight}`, {
      x: 0.9,
      y,
      w: 11.6,
      h: 0.45,
      fontSize: 12,
      color: colors.text,
      fit: 'shrink',
    });
    y += 0.65;
  });

  // Slide 3: Channel Overview
  const slide3 = prs.addSlide();
  addSlideHeader(slide3, 'Channel Overview Comparison', colors, prs);

  addStyledTable(
    slide3,
    [
      ['Company', 'Subscribers', 'Total Videos', 'Total Views', 'Upload Frequency'],
      ...companies.map((c) => [
        c.companyName,
        formatNumber(c.subscriberCount),
        formatNumber(c.videoCount),
        formatNumber(c.totalViews),
        `${safeNum(c.postingFrequency).toFixed(1)} videos/week`,
      ]),
    ],
    0.55,
    1.25,
    12.2,
    colors
  );

  addInsightBox(
    slide3,
    'Strategy Insight',
    'Subscriber count shows audience size, but upload frequency and total views reveal how actively each brand is using video as a growth channel.',
    0.8,
    5.2,
    11.7,
    colors
  );

  // Slide 4: Content Performance
  const slide4 = prs.addSlide();
  addSlideHeader(slide4, 'Content Performance - Top Videos', colors, prs);

  y = 1.15;
  companies.slice(0, 5).forEach((company) => {
    const topVideo = company.topVideos && company.topVideos[0];

    slide4.addText(company.companyName, {
      x: 0.7,
      y,
      w: 2,
      h: 0.3,
      fontSize: 13,
      bold: true,
      color: colors.blue,
      fit: 'shrink',
    });

    if (topVideo) {
      slide4.addText(`"${topVideo.title}"`, {
        x: 2.5,
        y,
        w: 7.5,
        h: 0.35,
        fontSize: 10.5,
        bold: true,
        color: colors.text,
        fit: 'shrink',
      });

      slide4.addText(
        `Views: ${formatNumber(topVideo.viewCount)} | Likes: ${formatNumber(
          topVideo.likeCount
        )} | Comments: ${formatNumber(
          topVideo.commentCount || 0
        )} | Engagement: ${safeNum(topVideo.engagementRate).toFixed(2)}%`,
        {
          x: 2.5,
          y: y + 0.38,
          w: 9.8,
          h: 0.28,
          fontSize: 9.5,
          color: colors.lightText,
          fit: 'shrink',
        }
      );
    } else {
      slide4.addText('No video data available', {
        x: 2.5,
        y,
        w: 8,
        h: 0.3,
        fontSize: 10,
        color: colors.lightText,
      });
    }

    y += 1.02;
  });

  // Slide 5: Engagement Analysis
  const slide5 = prs.addSlide();
  addSlideHeader(slide5, 'Engagement Analysis', colors, prs);

  addStyledTable(
    slide5,
    [
      ['Company', 'Avg Views', 'Avg Likes', 'Avg Comments', 'Avg Engagement %'],
      ...companies.map((c) => [
        c.companyName,
        formatNumber(c.avgEngagement?.avgViews),
        formatNumber(c.avgEngagement?.avgLikes),
        formatNumber(c.avgEngagement?.avgComments || 0),
        `${safeNum(c.avgEngagement?.avgEngagementRate).toFixed(2)}%`,
      ]),
    ],
    0.55,
    1.25,
    12.2,
    colors
  );

  slide5.addText('Engagement Rate = (Likes + Comments) / Views × 100', {
    x: 1,
    y: 4.7,
    w: 11,
    h: 0.35,
    fontSize: 11,
    italic: true,
    color: colors.lightText,
    align: 'center',
  });

  // Slide 6: Posting Frequency
  const slide6 = prs.addSlide();
  addSlideHeader(slide6, 'Posting Frequency & Consistency', colors, prs);

  y = 1.35;
  companies.forEach((company) => {
    const frequency = safeNum(company.postingFrequency);
    const label = getFrequencyLabel(frequency);
    const barWidth = Math.min(frequency * 1.05, 6.1);

    slide6.addText(company.companyName, {
      x: 0.8,
      y,
      w: 2,
      h: 0.3,
      fontSize: 12,
      bold: true,
      color: colors.text,
      fit: 'shrink',
    });

    slide6.addShape(prs.ShapeType.rect, {
      x: 3,
      y,
      w: barWidth,
      h: 0.3,
      fill: { color: colors.blue },
      line: { color: colors.darkNavy, pt: 0.8 },
    });

    slide6.addText(`${frequency.toFixed(1)} videos/week (${label})`, {
      x: 3 + barWidth + 0.2,
      y: y - 0.02,
      w: 3.5,
      h: 0.35,
      fontSize: 10.5,
      color: colors.text,
      fit: 'shrink',
    });

    y += 0.68;
  });

  addInsightBox(
    slide6,
    'Cadence Insight',
    'Brands posting consistently are more likely to stay visible in recommendations and build audience recall.',
    0.8,
    5.7,
    11.7,
    colors
  );

  // Slide 7: Content Topics
  const slide7 = prs.addSlide();
  addSlideHeader(slide7, 'Content Topics & Themes', colors, prs);

  y = 1.15;
  companies.forEach((company) => {
    const themes = Object.entries(company.themes || {})
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([theme, count]) => `${theme} (${count})`)
      .join(', ');

    slide7.addText(company.companyName, {
      x: 0.7,
      y,
      w: 2.2,
      h: 0.3,
      fontSize: 12,
      bold: true,
      color: colors.blue,
      fit: 'shrink',
    });

    slide7.addText(themes || 'No clear topic pattern identified', {
      x: 2.8,
      y,
      w: 9.8,
      h: 0.4,
      fontSize: 10.5,
      color: colors.text,
      fit: 'shrink',
    });

    y += 0.72;
  });

  addInsightBox(
    slide7,
    'Content Insight',
    'A strong video strategy should balance product videos, educational content, customer trust content, and trend-based formats.',
    0.8,
    5.5,
    11.7,
    colors
  );

  // Slide 8: Gap Analysis
  const slide8 = prs.addSlide();
  addSlideHeader(slide8, 'Gap Analysis - Missed Opportunities', colors, prs);

  y = 1.1;
  companies.forEach((company) => {
    const topicGaps =
      company.gaps?.topicGaps?.slice(0, 4).join(', ') ||
      'No major topic gaps found';

    const strategyGaps =
      company.gaps?.strategyGaps?.slice(0, 2).join(' | ') ||
      'Improve consistency, engagement, and content variety';

    slide8.addText(company.companyName, {
      x: 0.7,
      y,
      w: 2.2,
      h: 0.3,
      fontSize: 12,
      bold: true,
      color: colors.blue,
      fit: 'shrink',
    });

    slide8.addText(`Missing Topics: ${topicGaps}`, {
      x: 2.8,
      y,
      w: 9.8,
      h: 0.3,
      fontSize: 10.3,
      bold: true,
      color: colors.text,
      fit: 'shrink',
    });

    slide8.addText(`Opportunity: ${strategyGaps}`, {
      x: 2.8,
      y: y + 0.35,
      w: 9.8,
      h: 0.35,
      fontSize: 9.8,
      color: colors.lightText,
      fit: 'shrink',
    });

    y += 0.98;
  });

  // Slide 9: Strategic Recommendations
  const slide9 = prs.addSlide();
  addSlideHeader(slide9, 'Strategic Recommendations', colors, prs);

  y = 1.1;
  companies.slice(0, 5).forEach((company) => {
    slide9.addShape(prs.ShapeType.roundRect, {
      x: 0.6,
      y: y - 0.03,
      w: 1.9,
      h: 0.38,
      fill: { color: colors.lightBlue },
      line: { color: colors.blue, pt: 1 },
      radius: 0.08,
    });

    slide9.addText(company.companyName, {
      x: 0.75,
      y,
      w: 1.6,
      h: 0.25,
      fontSize: 11,
      bold: true,
      color: colors.blue,
      align: 'center',
      fit: 'shrink',
    });

    const recommendations = buildRecommendations(company);

    slide9.addText(`• ${recommendations.slice(0, 2).join('\n• ')}`, {
      x: 2.8,
      y: y - 0.03,
      w: 9.4,
      h: 0.65,
      fontSize: 9.8,
      color: colors.text,
      fit: 'shrink',
      breakLine: false,
      margin: 0.03,
    });

    y += 0.95;
  });

  addInsightBox(
    slide9,
    'Strategic Insight',
    'The strongest brands combine consistent uploads, audience engagement, educational storytelling, and trend-based content to improve long-term video growth.',
    0.8,
    5.9,
    11.7,
    colors
  );

  // Slide 10: Final Rankings
  const slide10 = prs.addSlide();
  addSlideHeader(slide10, 'Final Rankings & Scoring', colors, prs);

  addStyledTable(
    slide10,
    [
      ['Rank', 'Company', 'Overall Score', 'Main Strength', 'Strategic Priority'],
      ...rankings.map((r) => {
        const company = companies.find((c) => c.companyName === r.companyName);
        return [
          `${r.rank}`,
          r.companyName,
          `${r.score}/100`,
          getMainStrength(company),
          getStrategicPriority(company),
        ];
      }),
    ],
    0.55,
    1.25,
    12.2,
    colors
  );

  addInsightBox(
    slide10,
    'Ranking Insight',
    'The highest-ranked company is judged by audience size, consistency, engagement, reach, and strategic video execution.',
    0.8,
    5.35,
    11.7,
    colors
  );

  // Slide 11: Key Takeaways
  const slide11 = prs.addSlide();
  addSlideHeader(slide11, 'Key Takeaways & Next Steps', colors, prs);

  const takeaways = [
    'Prioritize consistent video publishing instead of irregular uploads.',
    'Use high-performing competitor formats as inspiration, not direct copies.',
    'Improve engagement with strong CTAs, questions, comments, and community interaction.',
    'Balance product promotion with educational, trust-building, and trend-based videos.',
    'Track competitor activity monthly and update the video strategy based on performance.',
  ];

  y = 1.3;
  takeaways.forEach((point, index) => {
    slide11.addText(`${index + 1}. ${point}`, {
      x: 1,
      y,
      w: 11,
      h: 0.45,
      fontSize: 13,
      bold: index === 0,
      color: colors.text,
      fit: 'shrink',
    });

    y += 0.75;
  });

  slide11.addText(
    'Recommended Next Step: Build a 30-day video content calendar based on the gaps and winning competitor patterns found in this report.',
    {
      x: 1,
      y: 5.6,
      w: 11,
      h: 0.5,
      fontSize: 13,
      bold: true,
      color: colors.blue,
      align: 'center',
      fit: 'shrink',
    }
  );

  return prs;
}

/**
 * Header
 */
function addSlideHeader(slide, title, colors, prs) {
  slide.background = { color: colors.white };

  slide.addShape(prs.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.33,
    h: 0.85,
    fill: { color: colors.darkNavy },
    line: { color: colors.darkNavy },
  });

  slide.addText(title, {
    x: 0.55,
    y: 0.18,
    w: 12,
    h: 0.45,
    fontSize: 24,
    bold: true,
    color: colors.white,
    fontFace: 'Calibri',
    fit: 'shrink',
  });
}

/**
 * Styled Table
 */
function addStyledTable(slide, rows, x, y, w, colors) {
  const tableRows = rows.map((row, rowIndex) =>
    row.map((cell) => ({
      text: cell === undefined || cell === null ? '-' : String(cell),
      options: {
        bold: rowIndex === 0,
        color: rowIndex === 0 ? colors.white : colors.text,
        fill:
          rowIndex === 0
            ? colors.darkNavy
            : rowIndex % 2 === 0
            ? colors.lightGray
            : colors.white,
        fontFace: 'Calibri',
        fontSize: rowIndex === 0 ? 11 : 10,
        align: 'center',
        valign: 'middle',
        margin: 0.05,
        fit: 'shrink',
      },
    }))
  );

  slide.addTable(tableRows, {
    x,
    y,
    w,
    h: Math.min(0.48 * rows.length, 3.5),
    border: { pt: 0.8, color: colors.gray },
    rowH: [0.48, ...Array(rows.length - 1).fill(0.42)],
    margin: 0.05,
  });
}

/**
 * Insight Box
 */
function addInsightBox(slide, heading, text, x, y, w, colors) {
  slide.addShape('roundRect', {
    x,
    y,
    w,
    h: 0.8,
    fill: { color: colors.lightBlue },
    line: { color: colors.blue, pt: 1 },
    radius: 0.15,
  });

  slide.addText(heading, {
    x: x + 0.2,
    y: y + 0.1,
    w: w - 0.4,
    h: 0.2,
    fontSize: 11,
    bold: true,
    color: colors.blue,
  });

  slide.addText(text, {
    x: x + 0.2,
    y: y + 0.35,
    w: w - 0.4,
    h: 0.3,
    fontSize: 10,
    color: colors.text,
    fit: 'shrink',
  });
}

/**
 * Build recommendations dynamically
 */
function buildRecommendations(company) {
  const recommendations = [];

  if (safeNum(company.postingFrequency) < 2) {
    recommendations.push(
      'Increase upload frequency to 2–3 videos/week to improve reach and audience recall.'
    );
  }

  if (safeNum(company.avgEngagement?.avgEngagementRate) < 1.5) {
    recommendations.push(
      'Improve engagement with CTAs, questions, comments, polls, and community interaction.'
    );
  }

  if (company.gaps?.topicGaps?.length > 0) {
    recommendations.push(
      `Create content around missing themes: ${company.gaps.topicGaps
        .slice(0, 3)
        .join(', ')}.`
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      'Scale successful formats and maintain consistent content quality.'
    );
    recommendations.push(
      'Add educational, testimonial, and behind-the-scenes videos to deepen trust.'
    );
  }

  return recommendations;
}

/**
 * Executive insights
 */
function buildExecutiveInsights(companies, rankings) {
  const insights = [];

  if (!companies.length) return ['No company data available for analysis.'];

  const topSubscribers = [...companies].sort(
    (a, b) => safeNum(b.subscriberCount) - safeNum(a.subscriberCount)
  )[0];

  const topViews = [...companies].sort(
    (a, b) => safeNum(b.totalViews) - safeNum(a.totalViews)
  )[0];

  const topEngagement = [...companies].sort(
    (a, b) =>
      safeNum(b.avgEngagement?.avgEngagementRate) -
      safeNum(a.avgEngagement?.avgEngagementRate)
  )[0];

  const mostActive = [...companies].sort(
    (a, b) => safeNum(b.postingFrequency) - safeNum(a.postingFrequency)
  )[0];

  if (rankings[0]) {
    insights.push(
      `${rankings[0].companyName} leads overall because it performs better across combined video marketing metrics.`
    );
  }

  if (topSubscribers) {
    insights.push(
      `${topSubscribers.companyName} has the strongest audience base with ${formatNumber(
        topSubscribers.subscriberCount
      )} subscribers.`
    );
  }

  if (topViews) {
    insights.push(
      `${topViews.companyName} has the highest total reach with ${formatNumber(
        topViews.totalViews
      )} total views.`
    );
  }

  if (topEngagement) {
    insights.push(
      `${topEngagement.companyName} has the strongest average engagement rate at ${safeNum(
        topEngagement.avgEngagement?.avgEngagementRate
      ).toFixed(2)}%.`
    );
  }

  if (mostActive) {
    insights.push(
      `${mostActive.companyName} is the most active publisher with ${safeNum(
        mostActive.postingFrequency
      ).toFixed(1)} videos per week.`
    );
  }

  return insights;
}

function getMainStrength(company) {
  if (!company || !company.score) return 'Balanced';

  const scores = {
    Subscribers: safeNum(company.score.subscriberScore),
    Views: safeNum(company.score.viewsScore),
    Engagement: safeNum(company.score.engagementScore),
  };

  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

function getStrategicPriority(company) {
  if (!company) return 'Improve video strategy';

  if (safeNum(company.postingFrequency) < 2) {
    return 'Increase upload frequency';
  }

  if (safeNum(company.avgEngagement?.avgEngagementRate) < 1) {
    return 'Improve engagement';
  }

  return 'Scale winning content';
}

function getFrequencyLabel(frequency) {
  if (frequency >= 2) return 'Very Active';
  if (frequency >= 1) return 'Active';
  if (frequency >= 0.5) return 'Moderately Active';
  return 'Inactive';
}

function formatNumber(num) {
  num = Number(num || 0);

  if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;

  return num.toString();
}

function safeNum(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

/**
 * Generate PowerPoint buffer
 */
async function generatePowerPoint(analysisReport) {
  try {
    const prs = generatePowerPointReport(analysisReport);

    return await prs.write({
      outputType: 'arraybuffer',
    });
  } catch (error) {
    console.error('Error generating PowerPoint:', error.message);
    throw error;
  }
}

module.exports = {
  generatePowerPoint,
  generatePowerPointReport,
};