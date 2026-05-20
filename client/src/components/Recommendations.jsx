import React from 'react'

export default function Recommendations({ report }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-navy">Recommendations</h2>

      {/* Individual Recommendations */}
      <div className="grid md:grid-cols-2 gap-6">
        {report.companies.map((company) => (
          <div key={company.companyName} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-navy text-white p-4">
              <h3 className="text-lg font-bold">{company.companyName}</h3>
            </div>

            <div className="p-6 space-y-3">
              {company.recommendations && company.recommendations.length > 0 ? (
                company.recommendations.map((rec, idx) => (
                  <div key={idx} className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <div className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold text-lg flex-shrink-0 mt-1">
                        {idx + 1}.
                      </span>
                      <p className="text-gray-700 text-sm leading-relaxed">{rec}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No specific recommendations at this time.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Priority Action Items */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-2 border-orange-200 p-6">
        <h3 className="text-lg font-bold text-navy mb-6 flex items-center">
          <span className="text-orange-600 mr-2">🎯</span> Priority Action Items (Next 30 Days)
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {report.companies.map((company) => {
            const topRec = company.recommendations?.[0]
            const postingFrequency = company.postingFrequency

            return (
              <div key={company.companyName} className="bg-white p-4 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-bold text-navy mb-3">{company.companyName}</h4>

                <ul className="space-y-2 text-sm">
                  {postingFrequency < 2 && (
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">→</span>
                      <span>Increase posting frequency to 2+ videos/week</span>
                    </li>
                  )}

                  {company.avgEngagement.avgEngagementRate < 1 && (
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">→</span>
                      <span>Boost engagement with CTAs and community interaction</span>
                    </li>
                  )}

                  {company.gaps.topicGaps?.length > 0 && (
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">→</span>
                      <span>Create 2-3 videos on missing topics</span>
                    </li>
                  )}

                  {topRec && (
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">→</span>
                      <span>{topRec.split(' ').slice(0, 8).join(' ')}...</span>
                    </li>
                  )}
                </ul>
              </div>
            )
          })}
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-gradient-to-r from-navy to-navy-light text-white rounded-lg p-6">
        <h3 className="text-xl font-bold mb-6">YouTube Video Marketing Best Practices</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-gold font-semibold mb-3">Content Strategy</h4>
            <ul className="text-sm space-y-2 text-gray-200">
              <li>✓ Post consistently on a set schedule</li>
              <li>✓ Create compelling video thumbnails</li>
              <li>✓ Write detailed video descriptions with keywords</li>
              <li>✓ Use relevant tags and categories</li>
              <li>✓ Create custom playlists for organization</li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold font-semibold mb-3">Engagement & Growth</h4>
            <ul className="text-sm space-y-2 text-gray-200">
              <li>✓ Add clear calls-to-action in videos</li>
              <li>✓ Respond to comments consistently</li>
              <li>✓ Create community posts and polls</li>
              <li>✓ Collaborate with other creators</li>
              <li>✓ Promote videos across social platforms</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
