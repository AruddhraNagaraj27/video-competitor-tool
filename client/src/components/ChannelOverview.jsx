import React from 'react'

export default function ChannelOverview({ report }) {
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-extrabold text-navy tracking-tight">Channel Overview Comparison</h2>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-navy to-navy-light text-white text-sm">
              <th className="px-6 py-4 text-left font-bold tracking-wider">Company</th>
              <th className="px-6 py-4 text-center font-bold tracking-wider">Subscribers</th>
              <th className="px-6 py-4 text-center font-bold tracking-wider">Videos</th>
              <th className="px-6 py-4 text-center font-bold tracking-wider">Total Views</th>
              <th className="px-6 py-4 text-center font-bold tracking-wider">Avg Views/Video</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {report.companies.map((company, idx) => (
              <tr key={company.companyName} className="hover:bg-slate-50/80 transition-colors duration-150">
                <td className="px-6 py-4 font-bold text-navy capitalize">{company.companyName}</td>
                <td className="px-6 py-4 text-center font-black text-blue-600 text-base">
                  {formatNumber(company.subscriberCount)}
                </td>
                <td className="px-6 py-4 text-center font-bold text-slate-700 text-base">
                  {company.videoCount}
                </td>
                <td className="px-6 py-4 text-center font-black text-emerald-600 text-base">
                  {formatNumber(company.totalViews)}
                </td>
                <td className="px-6 py-4 text-center font-black text-slate-800 text-base">
                  {formatNumber(Math.round(company.totalViews / Math.max(company.videoCount, 1)))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detailed Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {report.companies.map((company) => (
          <div key={company.companyName} className="bg-white rounded-2xl shadow-md p-6 border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <h3 className="text-2xl font-extrabold text-navy capitalize">{company.companyName}</h3>
                {company.profileImage && (
                  <img
                    src={company.profileImage}
                    alt={company.companyName}
                    className="w-14 h-14 rounded-full border-2 border-slate-100 shadow-sm"
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 hover:bg-blue-50 transition-colors duration-200">
                  <p className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider">Subscribers</p>
                  <p className="text-2xl font-black text-blue-600 mt-1">{formatNumber(company.subscriberCount)}</p>
                </div>
                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50 hover:bg-emerald-50 transition-colors duration-200">
                  <p className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider">Total Views</p>
                  <p className="text-2xl font-black text-emerald-600 mt-1">{formatNumber(company.totalViews)}</p>
                </div>
                <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100/50 hover:bg-purple-50 transition-colors duration-200">
                  <p className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider">Videos Published</p>
                  <p className="text-2xl font-black text-purple-600 mt-1">{company.videoCount}</p>
                </div>
                <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100/50 hover:bg-amber-50 transition-colors duration-200">
                  <p className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider">Avg Views/Video</p>
                  <p className="text-2xl font-black text-amber-600 mt-1">
                    {formatNumber(Math.round(company.totalViews / Math.max(company.videoCount, 1)))}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
              <span className="text-slate-500 font-medium">Average Engagement Rate:</span>
              <span className="font-bold text-navy bg-slate-100 px-3 py-1 rounded-full text-xs">
                {company.avgEngagement.avgEngagementRate.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
