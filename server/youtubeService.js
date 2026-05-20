const axios = require('axios');

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';

/**
 * Search for a company's YouTube channel
 */
async function searchChannel(companyName) {
  try {
    const response = await axios.get(`${YOUTUBE_BASE_URL}/search`, {
      params: {
        key: YOUTUBE_API_KEY,
        q: `${companyName} official`,
        part: 'snippet',
        type: 'channel',
        maxResults: 1,
      },
    });

    if (response.data.items && response.data.items.length > 0) {
      return response.data.items[0].snippet.channelId;
    }
    return null;
  } catch (error) {
    console.error(`Error searching channel for ${companyName}:`, error.message);
    throw new Error(`Failed to search channel for ${companyName}`);
  }
}

/**
 * Get channel statistics
 */
async function getChannelStats(channelId) {
  try {
    const response = await axios.get(`${YOUTUBE_BASE_URL}/channels`, {
      params: {
        key: YOUTUBE_API_KEY,
        id: channelId,
        part: 'statistics,snippet,contentDetails',
      },
    });

    if (response.data.items && response.data.items.length > 0) {
      const channel = response.data.items[0];
      return {
        channelId: channel.id,
        channelName: channel.snippet.title,
        description: channel.snippet.description,
        profileImage: channel.snippet.thumbnails.high.url,
        subscriberCount: parseInt(channel.statistics.subscriberCount) || 0,
        videoCount: parseInt(channel.statistics.videoCount) || 0,
        totalViews: parseInt(channel.statistics.viewCount) || 0,
        uploadPlaylistId: channel.contentDetails.relatedPlaylists.uploads,
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching channel stats for ${channelId}:`, error.message);
    throw new Error(`Failed to fetch channel stats`);
  }
}

/**
 * Get latest videos from a channel
 */
async function getChannelVideos(uploadPlaylistId, maxResults = 50) {
  try {
    const videos = [];
    let nextPageToken = undefined;

    // Fetch multiple pages to get enough videos
    for (let i = 0; i < 3; i++) {
      const response = await axios.get(`${YOUTUBE_BASE_URL}/playlistItems`, {
        params: {
          key: YOUTUBE_API_KEY,
          playlistId: uploadPlaylistId,
          part: 'snippet,contentDetails',
          maxResults: 50,
          pageToken: nextPageToken,
        },
      });

      if (response.data.items) {
        videos.push(
          ...response.data.items.map((item) => ({
            videoId: item.contentDetails.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            publishedAt: item.snippet.publishedAt,
            thumbnail: item.snippet.thumbnails.high.url,
          }))
        );
      }

      nextPageToken = response.data.nextPageToken;
      if (!nextPageToken) break;
    }

    return videos.slice(0, maxResults);
  } catch (error) {
    console.error(
      `Error fetching videos for playlist ${uploadPlaylistId}:`,
      error.message
    );
    throw new Error(`Failed to fetch channel videos`);
  }
}

/**
 * Get video statistics (views, likes, comments)
 */
async function getVideoStats(videoIds) {
  try {
    if (!videoIds || videoIds.length === 0) return [];

    const response = await axios.get(`${YOUTUBE_BASE_URL}/videos`, {
      params: {
        key: YOUTUBE_API_KEY,
        id: videoIds.join(','),
        part: 'statistics,snippet,contentDetails',
      },
    });

    if (response.data.items) {
      return response.data.items.map((video) => ({
        videoId: video.id,
        title: video.snippet.title,
        publishedAt: video.snippet.publishedAt,
        duration: video.contentDetails.duration,
        description: video.snippet.description,
        thumbnail: video.snippet.thumbnails.high.url,
        viewCount: parseInt(video.statistics.viewCount) || 0,
        likeCount: parseInt(video.statistics.likeCount) || 0,
        commentCount: parseInt(video.statistics.commentCount) || 0,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching video stats:', error.message);
    throw new Error('Failed to fetch video statistics');
  }
}

/**
 * Get complete company data
 */
async function getCompanyData(companyName) {
  try {
    console.log(`Fetching data for: ${companyName}`);

    // Step 1: Find channel
    const channelId = await searchChannel(companyName);
    if (!channelId) {
      throw new Error(`Channel not found for ${companyName}`);
    }

    // Step 2: Get channel stats
    const channelStats = await getChannelStats(channelId);
    if (!channelStats) {
      throw new Error(`Failed to get stats for ${companyName}`);
    }

    // Step 3: Get videos
    const videos = await getChannelVideos(channelStats.uploadPlaylistId, 50);

    // Step 4: Get video statistics
    const videoIds = videos.map((v) => v.videoId);
    const videoStats = await getVideoStats(videoIds);

    return {
      companyName,
      channelId,
      ...channelStats,
      videos: videoStats,
    };
  } catch (error) {
    console.error(`Error getting company data for ${companyName}:`, error.message);
    throw error;
  }
}

module.exports = {
  searchChannel,
  getChannelStats,
  getChannelVideos,
  getVideoStats,
  getCompanyData,
};
