import React from 'react'

export default function EngagementAnalysis({ report }) {
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const maxEngagement = Math.max(...report.companies.map(c => c.avgEngagement.avgEngagementRate))

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-navy">Engagement Analysis</h2>

      {/* Engagement Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-navy text-white">
              <th className="px-6 py-4 text-left font-semibold">Company</th>
              <th className="px-6 py-4 text-center font-semibold">Avg Views</th>
              <th className="px-6 py-4 text-center font-semibold">Avg Likes</th>
              <th className="px-6 py-4 text-center font-semibold">Avg Comments</th>
              <th className="px-6 py-4 text-center font-semibold">Engagement Rate</th>
            </tr>
          </thead>
          <tbody>
            {report.companies.map((company, idx) => (
              <tr key={company.companyName} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-6 py-4 font-semibold text-navy">{company.companyName}</td>
                <td className="px-6 py-4 text-center text-lg font-bold">
                  {formatNumber(company.avgEngagement.avgViews)}
                </td>
                <td className="px-6 py-4 text-center text-lg font-bold text-green-600">
                  {formatNumber(company.avgEngagement.avgLikes)}
                </td>
                <td className="px-6 py-4 text-center text-lg font-bold text-blue-600">
                  {formatNumber(company.avgEngagement.avgComments)}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-block px-3 py-1 rounded-full font-bold ${
                    company.avgEngagement.avgEngagementRate === maxEngagement
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {company.avgEngagement.avgEngagementRate.toFixed(2)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Engagement Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {report.companies.map((company) => (
          <div key={company.companyName} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-navy mb-6">{company.companyName}</h3>

            {/* Bar Charts */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-600">Avg Views per Video</span>
                  <span className="font-bold text-navy">{formatNumber(company.avgEngagement.avgViews)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full"
                    style={{
                      width: `${Math.min((company.avgEngagement.avgViews / 100000) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-600">Avg Likes per Video</span>
                  <span className="font-bold text-navy">{formatNumber(company.avgEngagement.avgLikes)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{
                      width: `${Math.min((company.avgEngagement.avgLikes / 5000) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-600">Avg Comments per Video</span>
                  <span className="font-bold text-navy">{formatNumber(company.avgEngagement.avgComments)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-purple-500 h-3 rounded-full"
                    style={{
                      width: `${Math.min((company.avgEngagement.avgComments / 1000) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-600">Engagement Rate</span>
                  <span className="font-bold text-navy">{company.avgEngagement.avgEngagementRate.toFixed(2)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-orange-500 h-3 rounded-full"
                    style={{
                      width: `${Math.min((company.avgEngagement.avgEngagementRate / 5) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
