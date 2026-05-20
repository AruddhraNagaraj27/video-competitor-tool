import React from 'react'

export default function GapAnalysis({ report }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-navy">Gap Analysis - Opportunities</h2>

      {/* Gap Analysis Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {report.companies.map((company) => (
          <div key={company.companyName} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-gold">
            <h3 className="text-lg font-bold text-navy mb-6">{company.companyName}</h3>

            {/* Topic Gaps */}
            {company.gaps.topicGaps && company.gaps.topicGaps.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-navy mb-3 flex items-center">
                  <span className="text-red-500 mr-2">●</span> Missing Content Topics
                </h4>
                <div className="space-y-2">
                  {company.gaps.topicGaps.slice(0, 5).map((gap) => (
                    <div key={gap} className="bg-red-50 p-3 rounded border-l-2 border-red-500">
                      <p className="text-sm text-gray-700 capitalize font-semibold">{gap}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Competitors are creating content about this topic that you're not covering.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Strategy Gaps */}
            {company.gaps.strategyGaps && company.gaps.strategyGaps.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-navy mb-3 flex items-center">
                  <span className="text-orange-500 mr-2">●</span> Strategy Gaps
                </h4>
                <div className="space-y-2">
                  {company.gaps.strategyGaps.map((gap) => (
                    <div key={gap} className="bg-orange-50 p-3 rounded border-l-2 border-orange-500">
                      <p className="text-sm text-gray-700 font-semibold">{gap}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Performance Gaps */}
            {company.gaps.performanceGaps && company.gaps.performanceGaps.length > 0 && (
              <div>
                <h4 className="font-semibold text-navy mb-3 flex items-center">
                  <span className="text-purple-500 mr-2">●</span> Performance Gaps
                </h4>
                <div className="space-y-2">
                  {company.gaps.performanceGaps.map((gap) => (
                    <div key={gap} className="bg-purple-50 p-3 rounded border-l-2 border-purple-500">
                      <p className="text-sm text-gray-700">{gap}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!company.gaps.topicGaps?.length &&
              !company.gaps.strategyGaps?.length &&
              !company.gaps.performanceGaps?.length && (
                <p className="text-gray-500 italic">No significant gaps identified</p>
              )}
          </div>
        ))}
      </div>

      {/* Competitive Opportunities */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200 p-6">
        <h3 className="text-lg font-bold text-navy mb-4 flex items-center">
          <span className="text-green-600 mr-2">💡</span> Key Opportunities
        </h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <span className="text-green-600 font-bold mr-3">1.</span>
            <p className="text-gray-700">
              <strong>Content Diversification:</strong> Identify topics competitors are not covering and
              create original content in those areas.
            </p>
          </div>
          <div className="flex items-start">
            <span className="text-green-600 font-bold mr-3">2.</span>
            <p className="text-gray-700">
              <strong>Frequency Improvement:</strong> Increase posting consistency to match or exceed
              competitor activity levels.
            </p>
          </div>
          <div className="flex items-start">
            <span className="text-green-600 font-bold mr-3">3.</span>
            <p className="text-gray-700">
              <strong>Engagement Enhancement:</strong> Study top-performing competitor videos and adapt
              successful formats to your content.
            </p>
          </div>
          <div className="flex items-start">
            <span className="text-green-600 font-bold mr-3">4.</span>
            <p className="text-gray-700">
              <strong>Subscriber Growth:</strong> Leverage gaps in competitor coverage to attract their
              audience with better/different content.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
