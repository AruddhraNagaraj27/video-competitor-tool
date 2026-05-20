import React from 'react'

export default function FinalRanking({ report }) {
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-yellow-500'
      case 2:
        return 'from-gray-300 to-gray-400'
      case 3:
        return 'from-orange-400 to-orange-500'
      default:
        return 'from-blue-400 to-blue-500'
    }
  }

  const getMedalEmoji = (rank) => {
    switch (rank) {
      case 1:
        return '🥇'
      case 2:
        return '🥈'
      case 3:
        return '🥉'
      default:
        return '4️⃣'
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-navy">Final Rankings & Scoring</h2>

      {/* Podium Rankings */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {report.rankings.slice(0, 3).map((rank, idx) => {
          const company = report.companies.find((c) => c.companyName === rank.companyName)
          return (
            <div
              key={rank.companyName}
              className={`transform transition-transform hover:scale-105 ${idx === 0 ? 'md:scale-110 md:-mt-8' : ''}`}
            >
              <div
                className={`bg-gradient-to-br ${getRankColor(rank.rank)} rounded-t-lg p-6 text-white`}
              >
                <div className="text-5xl mb-2">{getMedalEmoji(rank.rank)}</div>
                <h3 className="text-2xl font-bold">{rank.rank === 1 ? '1st' : rank.rank === 2 ? '2nd' : '3rd'}</h3>
              </div>

              <div className="bg-white rounded-b-lg shadow-lg p-6 border-t-4 border-gold">
                <h4 className="text-lg font-bold text-navy mb-2">{rank.companyName}</h4>
                <p className="text-3xl font-bold text-blue-600 mb-4">{rank.score}/100</p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subscribers</span>
                    <span className="font-semibold">{formatNumber(company.subscriberCount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Views</span>
                    <span className="font-semibold">{formatNumber(company.totalViews)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Engagement Rate</span>
                    <span className="font-semibold">{company.avgEngagement.avgEngagementRate.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Posting Frequency</span>
                    <span className="font-semibold">{company.postingFrequency.toFixed(1)}/week</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Complete Rankings Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-navy text-white">
              <th className="px-6 py-4 text-center font-semibold w-20">Rank</th>
              <th className="px-6 py-4 text-left font-semibold">Company</th>
              <th className="px-6 py-4 text-center font-semibold">Score</th>
              <th className="px-6 py-4 text-center font-semibold">Subscribers</th>
              <th className="px-6 py-4 text-center font-semibold">Avg Engagement</th>
              <th className="px-6 py-4 text-center font-semibold">Posting Frequency</th>
            </tr>
          </thead>
          <tbody>
            {report.rankings.map((rank, idx) => {
              const company = report.companies.find((c) => c.companyName === rank.companyName)
              return (
                <tr
                  key={rank.companyName}
                  className={`${
                    idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } border-b hover:bg-yellow-50 transition-colors`}
                >
                  <td className="px-6 py-4 text-center">
                    <span className="text-2xl font-bold text-navy">{getMedalEmoji(rank.rank)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-navy">{rank.companyName}</p>
                      <p className="text-sm text-gray-500">{company.videoCount} videos</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-block">
                      <div className="text-2xl font-bold text-blue-600">{rank.score}</div>
                      <div className="text-xs text-gray-500">/100</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-semibold text-navy">
                    {formatNumber(company.subscriberCount)}
                  </td>
                  <td className="px-6 py-4 text-center font-semibold text-navy">
                    {company.avgEngagement.avgEngagementRate.toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 text-center font-semibold text-navy">
                    {company.postingFrequency.toFixed(1)} /week
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Scoring Breakdown */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold text-navy mb-6">Score Breakdown</h3>

        <div className="grid md:grid-cols-2 gap-6">
          {report.companies.map((company) => (
            <div key={company.companyName} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold text-navy mb-4">{company.companyName}</h4>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Subscribers (20 pts)</span>
                    <span className="font-bold text-navy">{company.score.subscriberScore}</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(company.score.subscriberScore / 20) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Views (20 pts)</span>
                    <span className="font-bold text-navy">{company.score.viewsScore}</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(company.score.viewsScore / 20) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Engagement (20 pts)</span>
                    <span className="font-bold text-navy">{company.score.engagementScore}</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${(company.score.engagementScore / 20) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Consistency (20 pts)</span>
                    <span className="font-bold text-navy">{company.score.consistencyScore}</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: `${(company.score.consistencyScore / 20) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Content Variety (20 pts)</span>
                    <span className="font-bold text-navy">{company.score.varietyScore}</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div
                      className="bg-pink-500 h-2 rounded-full"
                      style={{ width: `${(company.score.varietyScore / 20) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-white p-3 rounded border-2 border-gold">
                  <div className="flex justify-between">
                    <span className="font-bold text-navy">Total Score</span>
                    <span className="text-xl font-bold text-blue-600">{company.score.totalScore}/100</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conclusion */}
      <div className="bg-gradient-to-r from-navy to-navy-light text-white rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Key Conclusion</h3>
        <p className="text-gray-200 leading-relaxed">
          {report.rankings[0] ? (
            <>
              <span className="font-bold text-gold">{report.rankings[0].companyName}</span> leads the competitive
              landscape with a score of {report.rankings[0].score}/100. Success factors include consistent
              publishing schedule, strong subscriber base, and high engagement rates. Competitors should focus on
              increasing posting frequency, diversifying content topics, and implementing strategies to boost
              audience engagement. The data reveals clear opportunities for market growth through content
              optimization and strategic consistency.
            </>
          ) : (
            'Analysis complete. Review scoring metrics above for detailed insights.'
          )}
        </p>
      </div>
    </div>
  )
}
