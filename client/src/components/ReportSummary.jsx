import React from 'react'

export default function ReportSummary({ report }) {
  const leader = report.rankings[0]

  return (
    <div className="space-y-8">
      {/* Key Insights Card */}
      <div className="bg-gradient-to-r from-navy via-[#1e3e58] to-navy-light rounded-2xl shadow-xl p-8 text-white border border-white/5 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-48 h-48 bg-white/5 rounded-full blur-xl"></div>
        <h2 className="text-3xl font-extrabold mb-6 tracking-tight">Executive Summary</h2>
        <div className="grid md:grid-cols-2 gap-8 relative z-10">
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-200">
            <h3 className="text-gold text-sm font-bold uppercase tracking-wider mb-2">Market Leader</h3>
            <p className="text-3xl font-extrabold mb-1 capitalize">{leader.companyName}</p>
            <p className="text-gray-300 text-sm">Competitiveness Score: <span className="text-white font-bold">{leader.score}/100</span></p>
          </div>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-200">
            <h3 className="text-gold text-sm font-bold uppercase tracking-wider mb-2">Key Finding</h3>
            <p className="text-gray-200 text-sm leading-relaxed">
              {report.overallInsights[0] || 'Comprehensive analysis of video marketing strategies across all companies.'}
            </p>
          </div>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {report.companies.map((company) => (
          <div key={company.companyName} className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col">
            <div className="bg-gradient-to-r from-navy to-navy-light text-white px-6 py-4">
              <h3 className="text-xl font-bold capitalize">{company.companyName}</h3>
            </div>
            <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:bg-blue-50/40 transition-colors duration-200">
                  <p className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider">Subscribers</p>
                  <p className="text-2xl font-black text-navy mt-1">{formatNumber(company.subscriberCount)}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:bg-blue-50/40 transition-colors duration-200">
                  <p className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider">Total Views</p>
                  <p className="text-2xl font-black text-navy mt-1">{formatNumber(company.totalViews)}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:bg-blue-50/40 transition-colors duration-200">
                  <p className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider">Videos</p>
                  <p className="text-2xl font-black text-navy mt-1">{company.videoCount}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:bg-blue-50/40 transition-colors duration-200">
                  <p className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider">Posting Frequency</p>
                  <p className="text-2xl font-black text-navy mt-1">{company.postingFrequency}/wk</p>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-5">
                <h4 className="font-bold text-navy text-sm mb-3">Key Insights:</h4>
                <ul className="text-sm text-gray-600 space-y-2.5">
                  {company.insights.slice(0, 2).map((insight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gold font-bold">→</span>
                      <span className="leading-relaxed">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}
