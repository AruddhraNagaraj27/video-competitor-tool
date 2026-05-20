import React from 'react'

export default function TopVideos({ report }) {
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-navy">Top Performing Videos</h2>

      <div className="space-y-6">
        {report.companies.map((company) => (
          <div key={company.companyName}>
            <h3 className="text-xl font-bold text-navy mb-4">{company.companyName}</h3>
            <div className="space-y-4">
              {company.topVideos.slice(0, 3).map((video, idx) => (
                <div
                  key={video.videoId}
                  className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gold hover:shadow-lg transition-shadow"
                >
                  <div className="flex gap-4">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-gold font-semibold mb-1">#{idx + 1} Top Video</div>
                          <h4 className="text-lg font-bold text-navy mb-2">{video.title}</h4>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-2 text-sm">
                        <div className="bg-blue-50 p-2 rounded">
                          <p className="text-gray-600 text-xs">Views</p>
                          <p className="font-bold text-blue-600">{formatNumber(video.viewCount)}</p>
                        </div>
                        <div className="bg-green-50 p-2 rounded">
                          <p className="text-gray-600 text-xs">Likes</p>
                          <p className="font-bold text-green-600">{formatNumber(video.likeCount)}</p>
                        </div>
                        <div className="bg-purple-50 p-2 rounded">
                          <p className="text-gray-600 text-xs">Comments</p>
                          <p className="font-bold text-purple-600">{formatNumber(video.commentCount)}</p>
                        </div>
                        <div className="bg-orange-50 p-2 rounded">
                          <p className="text-gray-600 text-xs">Engagement</p>
                          <p className="font-bold text-orange-600">{video.engagementRate?.toFixed(2)}%</p>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mt-3">
                        Published: {new Date(video.publishedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
