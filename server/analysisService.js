/**
 * Analysis Service
 * Analyzes YouTube data and generates marketing insights
 */

/**
 * Calculate engagement rate for a video
 */
function calculateEngagementRate(video) {
  if (!video.viewCount || video.viewCount === 0) return 0;
  const engagements = (video.likeCount || 0) + (video.commentCount || 0);
  return (engagements / video.viewCount) * 100;
}

/**
 * Analyze videos for themes and topics
 */
function analyzeContentThemes(videos) {
  const themes = {};
  const keywords = [
    'tutorial',
    'how to',
    'review',
    'unboxing',
    'announcement',
    'product',
    'behind the scenes',
    'interview',
    'live',
    'shorts',
    'challenge',
    'tips',
    'guide',
    'explainer',
    'case study',
    'webinar',
    'demo',
  ];

  videos.forEach((video) => {
    const title = video.title.toLowerCase();
    const description = (video.description || '').toLowerCase();
    const content = `${title} ${description}`;

    keywords.forEach((keyword) => {
      if (content.includes(keyword)) {
        themes[keyword] = (themes[keyword] || 0) + 1;
      }
    });
  });

  return themes;
}

/**
 * Calculate posting frequency (videos per week)
 */
function calculatePostingFrequency(videos) {
  if (videos.length < 2) return 0;

  const sortedVideos = videos.sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  );

  const latestDate = new Date(sortedVideos[0].publishedAt);
  const oldestDate = new Date(sortedVideos[sortedVideos.length - 1].publishedAt);

  const daysDiff = (latestDate - oldestDate) / (1000 * 60 * 60 * 24);
  const weeks = daysDiff / 7;

  if (weeks === 0) return 0;
  return videos.length / weeks;
}

/**
 * Calculate average engagement
 */
function calculateAverageEngagement(videos) {
  if (videos.length === 0) return { avgViews: 0, avgLikes: 0, avgComments: 0, avgEngagementRate: 0 };

  const totalViews = videos.reduce((sum, v) => sum + (v.viewCount || 0), 0);
  const totalLikes = videos.reduce((sum, v) => sum + (v.likeCount || 0), 0);
  const totalComments = videos.reduce((sum, v) => sum + (v.commentCount || 0), 0);

  const avgViews = totalViews / videos.length;
  const avgLikes = totalLikes / videos.length;
  const avgComments = totalComments / videos.length;

  const engagementRates = videos.map((v) => calculateEngagementRate(v));
  const avgEngagementRate =
    engagementRates.reduce((sum, rate) => sum + rate, 0) / videos.length;

  return {
    avgViews: Math.round(avgViews),
    avgLikes: Math.round(avgLikes),
    avgComments: Math.round(avgComments),
    avgEngagementRate: parseFloat(avgEngagementRate.toFixed(3)),
  };
}

/**
 * Get top performing videos
 */
function getTopVideos(videos, count = 5) {
  return videos
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, count)
    .map((video) => ({
      ...video,
      engagementRate: calculateEngagementRate(video),
    }));
}

/**
 * Calculate comprehensive score for a company
 */
function calculateCompanyScore(companyData) {
  const maxSubscribers = 1000000; // Reference: 1M subscribers
  const maxViews = 100000000; // Reference: 100M total views
  const maxEngagementRate = 5; // Reference: 5% engagement rate
  const maxPostingFrequency = 14; // Reference: 14 videos/week
  const maxVideoCount = 500; // Reference: 500 videos

  // Subscriber Strength (20 marks)
  const subscriberScore = Math.min(
    20,
    (companyData.subscriberCount / maxSubscribers) * 20
  );

  // Views Performance (20 marks)
  const viewsScore = Math.min(20, (companyData.totalViews / maxViews) * 20);

  // Engagement Rate (20 marks)
  const avgEngagement = calculateAverageEngagement(companyData.videos);
  const engagementScore = Math.min(20, (avgEngagement.avgEngagementRate / maxEngagementRate) * 20);

  // Posting Consistency (20 marks)
  const postingFrequency = calculatePostingFrequency(companyData.videos);
  const consistencyScore = Math.min(20, (postingFrequency / maxPostingFrequency) * 20);

  // Content Variety (20 marks)
  const themes = analyzeContentThemes(companyData.videos);
  const uniqueThemes = Object.keys(themes).length;
  const varietyScore = Math.min(20, (uniqueThemes / 10) * 20);

  const totalScore = Math.round(
    subscriberScore + viewsScore + engagementScore + consistencyScore + varietyScore
  );

  return {
    totalScore: Math.min(100, totalScore),
    subscriberScore: Math.round(subscriberScore),
    viewsScore: Math.round(viewsScore),
    engagementScore: Math.round(engagementScore),
    consistencyScore: Math.round(consistencyScore),
    varietyScore: Math.round(varietyScore),
  };
}

/**
 * Generate insights and recommendations
 */
function generateInsights(companyData, allCompaniesData) {
  const insights = [];
  const recommendations = [];

  const avgEngagement = calculateAverageEngagement(companyData.videos);
  const postingFrequency = calculatePostingFrequency(companyData.videos);
  const topVideos = getTopVideos(companyData.videos, 3);

  // Calculate averages across all companies
  const avgSubscriberCount =
    allCompaniesData.reduce((sum, c) => sum + c.subscriberCount, 0) / allCompaniesData.length;
  const avgTotalViews =
    allCompaniesData.reduce((sum, c) => sum + c.totalViews, 0) / allCompaniesData.length;
  const allEngagements = allCompaniesData.flatMap((c) => 
    c.videos.map((v) => calculateEngagementRate(v))
  );
  const avgCompetitorEngagement =
    allEngagements.reduce((sum, r) => sum + r, 0) / allEngagements.length;

  // Subscriber insights
  if (companyData.subscriberCount > avgSubscriberCount) {
    insights.push(
      `${companyData.companyName} has stronger subscriber base than competitors with ${companyData.subscriberCount.toLocaleString()} subscribers.`
    );
  } else {
    insights.push(
      `${companyData.companyName} has ${companyData.subscriberCount.toLocaleString()} subscribers. Focus on subscriber growth campaigns.`
    );
  }

  // Views insights
  if (companyData.totalViews > avgTotalViews) {
    insights.push(
      `${companyData.companyName} leads in total views with ${companyData.totalViews.toLocaleString()} total views, indicating strong content reach.`
    );
  } else {
    insights.push(
      `${companyData.companyName} has ${companyData.totalViews.toLocaleString()} total views. Prioritize content distribution and SEO.`
    );
  }

  // Engagement insights
  if (avgEngagement.avgEngagementRate > avgCompetitorEngagement) {
    insights.push(
      `${companyData.companyName}'s audience is highly engaged with an average engagement rate of ${avgEngagement.avgEngagementRate.toFixed(2)}%.`
    );
  } else {
    recommendations.push(
      `Increase viewer engagement by adding CTAs (calls-to-action), questions, and community interactions in video descriptions.`
    );
  }

  // Posting frequency insights
  if (postingFrequency >= 2) {
    insights.push(
      `${companyData.companyName} maintains strong posting consistency with ${postingFrequency.toFixed(1)} videos per week.`
    );
  } else {
    recommendations.push(
      `Increase posting frequency to at least 2 videos per week to maintain audience engagement and algorithm favor.`
    );
  }

  // Top video insights
  if (topVideos.length > 0) {
    const topVideo = topVideos[0];
    insights.push(
      `Top performing video "${topVideo.title}" received ${topVideo.viewCount.toLocaleString()} views, showing strong audience interest.`
    );
  }

  // Content variety
  const themes = analyzeContentThemes(companyData.videos);
  const topThemes = Object.entries(themes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map((t) => t[0]);

  if (topThemes.length > 0) {
    insights.push(
      `Primary content focus areas: ${topThemes.join(', ')}. Consider diversifying content for broader audience appeal.`
    );
  }

  // General recommendations
  if (avgEngagement.avgEngagementRate < 1) {
    recommendations.push(
      `Boost engagement through community-driven content, polls, and interactive elements in videos.`
    );
  }

  if (companyData.videoCount < 50) {
    recommendations.push(
      `Build content library: Aim for at least 50+ videos to establish authority and improve channel discoverability.`
    );
  }

  if (postingFrequency < 1) {
    recommendations.push(
      `Create a content calendar and commit to regular uploads. Consistency is key to YouTube algorithm success.`
    );
  }

  // Add specific competitive insights
  const competitors = allCompaniesData.filter((c) => c.companyName !== companyData.companyName);
  if (competitors.length > 0) {
    const topCompetitor = competitors.reduce((top, curr) => {
      const topScore = calculateCompanyScore(top).totalScore;
      const currScore = calculateCompanyScore(curr).totalScore;
      return currScore > topScore ? curr : top;
    });

    if (topCompetitor.subscr === Math.min(
      ...allCompaniesData.map((c) => calculateCompanyScore(c).totalScore)
    )) {
      insights.push(
        `${topCompetitor.companyName} is the market leader. Study their content strategy and engagement patterns.`
      );
    }
  }

  return { insights, recommendations };
}

/**
 * Generate gap analysis
 */
function generateGapAnalysis(companyData, allCompaniesData) {
  const gaps = {
    topicGaps: [],
    strategyGaps: [],
    performanceGaps: [],
  };

  const companyThemes = analyzeContentThemes(companyData.videos);
  const allThemes = {};

  allCompaniesData.forEach((company) => {
    const themes = analyzeContentThemes(company.videos);
    Object.entries(themes).forEach(([theme, count]) => {
      allThemes[theme] = Math.max((allThemes[theme] || 0), count);
    });
  });

  // Find topic gaps
  Object.entries(allThemes).forEach(([theme, count]) => {
    if (!companyThemes[theme] || companyThemes[theme] < count * 0.5) {
      gaps.topicGaps.push(theme);
    }
  });

  // Strategy gaps
  const companyPostingFrequency = calculatePostingFrequency(companyData.videos);
  const avgPostingFrequency =
    allCompaniesData.reduce(
      (sum, c) => sum + calculatePostingFrequency(c.videos),
      0
    ) / allCompaniesData.length;

  if (companyPostingFrequency < avgPostingFrequency * 0.8) {
    gaps.strategyGaps.push('Posting frequency is below competitors');
  }

  const companyEngagement = calculateAverageEngagement(companyData.videos);
  const avgEngagement = allCompaniesData.length > 0
    ? calculateAverageEngagement(
        allCompaniesData.flatMap((c) => c.videos)
      )
    : { avgEngagementRate: 0 };

  if (companyEngagement.avgEngagementRate < avgEngagement.avgEngagementRate * 0.8) {
    gaps.strategyGaps.push('Engagement rate lags behind competitors');
  }

  // Performance gaps
  const topCompetitorViews =
    Math.max(...allCompaniesData.map((c) => c.totalViews)) || 0;
  if (companyData.totalViews < topCompetitorViews * 0.5) {
    gaps.performanceGaps.push(
      `Total views significantly behind leader. Current: ${companyData.totalViews.toLocaleString()} vs Leader: ${topCompetitorViews.toLocaleString()}`
    );
  }

  return gaps;
}

/**
 * Create comprehensive analysis report
 */
function createAnalysisReport(companiesData) {
  const report = {
    timestamp: new Date().toISOString(),
    companies: [],
    rankings: [],
    overallInsights: [],
  };

  // Analyze each company
  companiesData.forEach((companyData) => {
    const score = calculateCompanyScore(companyData);
    const avgEngagement = calculateAverageEngagement(companyData.videos);
    const postingFrequency = calculatePostingFrequency(companyData.videos);
    const topVideos = getTopVideos(companyData.videos, 5);
    const themes = analyzeContentThemes(companyData.videos);
    const { insights, recommendations } = generateInsights(companyData, companiesData);
    const gaps = generateGapAnalysis(companyData, companiesData);

    report.companies.push({
      companyName: companyData.companyName,
      channelId: companyData.channelId,
      subscriberCount: companyData.subscriberCount,
      totalViews: companyData.totalViews,
      videoCount: companyData.videoCount,
      profileImage: companyData.profileImage,
      score,
      avgEngagement,
      postingFrequency: parseFloat(postingFrequency.toFixed(2)),
      topVideos,
      themes,
      insights,
      recommendations,
      gaps,
    });
  });

  // Create rankings
  report.rankings = report.companies
    .slice()
    .sort((a, b) => b.score.totalScore - a.score.totalScore)
    .map((company, index) => ({
      rank: index + 1,
      companyName: company.companyName,
      score: company.score.totalScore,
    }));

  // Generate overall insights
  const leader = report.rankings[0];
  if (leader) {
    const leaderData = report.companies.find((c) => c.companyName === leader.companyName);
    report.overallInsights.push(
      `${leader.companyName} is the market leader with a score of ${leader.score}/100.`
    );

    const strengths = [];
    if (leaderData.score.subscriberScore === 20) strengths.push('dominant subscriber base');
    if (leaderData.score.viewsScore === 20) strengths.push('exceptional view counts');
    if (leaderData.score.engagementScore === 20) strengths.push('highest engagement rate');
    if (leaderData.score.consistencyScore === 20) strengths.push('consistent posting schedule');

    if (strengths.length > 0) {
      report.overallInsights.push(
        `They excel in: ${strengths.join(', ')}.`
      );
    }
  }

  return report;
}

module.exports = {
  calculateEngagementRate,
  analyzeContentThemes,
  calculatePostingFrequency,
  calculateAverageEngagement,
  getTopVideos,
  calculateCompanyScore,
  generateInsights,
  generateGapAnalysis,
  createAnalysisReport,
};
