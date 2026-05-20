import React from 'react'

export default function ContentThemes({ report }) {
  const allThemes = new Set()
  report.companies.forEach((company) => {
    Object.keys(company.themes).forEach((theme) => allThemes.add(theme))
  })

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-navy">Content Themes & Topics</h2>

      {/* Themes Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {report.companies.map((company) => {
          const topThemes = Object.entries(company.themes)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8)

          return (
            <div key={company.companyName} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-navy mb-6">{company.companyName}</h3>

              <div className="space-y-3">
                {topThemes.map(([theme, count]) => (
                  <div key={theme}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-gray-700 capitalize">{theme}</span>
                      <span className="text-sm font-bold text-navy">{count} videos</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gold h-2 rounded-full"
                        style={{ width: `${(count / Math.max(...report.companies.flatMap(c => Object.values(c.themes)))) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {topThemes.length === 0 && (
                <p className="text-gray-500 italic">No specific themes identified</p>
              )}
            </div>
          )
        })}
      </div>

      {/* Theme Comparison */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold text-navy mb-6">Theme Distribution Across All Companies</h3>

        <div className="space-y-4">
          {Array.from(allThemes)
            .sort((a, b) => {
              const countA = report.companies.reduce((sum, c) => sum + (c.themes[a] || 0), 0)
              const countB = report.companies.reduce((sum, c) => sum + (c.themes[b] || 0), 0)
              return countB - countA
            })
            .slice(0, 10)
            .map((theme) => {
              const themeData = report.companies.map((company) => ({
                company: company.companyName,
                count: company.themes[theme] || 0,
              }))

              const totalCount = themeData.reduce((sum, d) => sum + d.count, 0)

              return (
                <div key={theme}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700 capitalize">{theme}</span>
                    <span className="text-sm font-bold text-navy">{totalCount} total videos</span>
                  </div>

                  <div className="flex gap-1 h-6 rounded-lg overflow-hidden bg-gray-100">
                    {themeData.map((data) =>
                      data.count > 0 ? (
                        <div
                          key={data.company}
                          className="bg-navy hover:opacity-80 transition-opacity flex items-center justify-center text-white text-xs font-bold"
                          style={{
                            width: `${(data.count / totalCount) * 100}%`,
                            minWidth: '30px',
                          }}
                          title={`${data.company}: ${data.count}`}
                        >
                          {(data.count / totalCount) * 100 > 15 && data.count}
                        </div>
                      ) : null
                    )}
                  </div>

                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    {themeData.map((data) => (
                      <span key={data.company}>
                        {data.company}: {data.count}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
