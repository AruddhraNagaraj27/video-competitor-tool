import React from 'react'

export default function PostingFrequency({ report }) {
  const getFrequencyLabel = (frequency) => {
    if (frequency >= 2) return 'Very Active'
    if (frequency >= 1) return 'Active'
    if (frequency >= 0.5) return 'Moderately Active'
    return 'Inactive'
  }

  const getFrequencyColor = (frequency) => {
    if (frequency >= 2) return 'text-green-600'
    if (frequency >= 1) return 'text-blue-600'
    if (frequency >= 0.5) return 'text-orange-600'
    return 'text-red-600'
  }

  const maxFrequency = Math.max(...report.companies.map(c => c.postingFrequency))

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-navy">Posting Frequency & Consistency</h2>

      {/* Frequency Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        {report.companies.map((company) => {
          const frequency = company.postingFrequency
          const barPercentage = (frequency / maxFrequency) * 100

          return (
            <div key={company.companyName} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-navy mb-4">{company.companyName}</h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-600">Videos per Week</span>
                    <span className={`text-2xl font-bold ${getFrequencyColor(frequency)}`}>
                      {frequency.toFixed(1)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full transition-all ${
                        frequency >= 2
                          ? 'bg-green-500'
                          : frequency >= 1
                            ? 'bg-blue-500'
                            : frequency >= 0.5
                              ? 'bg-orange-500'
                              : 'bg-red-500'
                      }`}
                      style={{ width: `${barPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm mb-1">Activity Level</p>
                  <p className="text-lg font-bold text-navy">{getFrequencyLabel(frequency)}</p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm mb-1">Total Videos Analyzed</p>
                  <p className="text-lg font-bold text-navy">{company.videoCount}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-3 rounded">
                    <p className="text-gray-600 text-xs">Per Month</p>
                    <p className="text-lg font-bold text-green-600">
                      {Math.round(frequency * 4.3)}
                    </p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded">
                    <p className="text-gray-600 text-xs">Per Year</p>
                    <p className="text-lg font-bold text-orange-600">
                      {Math.round(frequency * 52)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-700">
                  {frequency >= 2 ? (
                    <span className="text-green-600 font-semibold">
                      ✓ Excellent posting consistency! This drives high audience engagement.
                    </span>
                  ) : frequency >= 1 ? (
                    <span className="text-blue-600 font-semibold">
                      → Good frequency. Consider increasing to 2x/week for better reach.
                    </span>
                  ) : frequency >= 0.5 ? (
                    <span className="text-orange-600 font-semibold">
                      ⚠ Inconsistent posting. Aim for at least 1 video per week.
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      ✗ Very low posting frequency. Start publishing 1-2 videos weekly.
                    </span>
                  )}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Benchmark Info */}
      <div className="bg-gradient-to-r from-navy to-navy-light text-white rounded-lg p-6">
        <h3 className="text-xl font-bold mb-3">YouTube Posting Frequency Benchmarks</h3>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gold font-semibold">Very Active</p>
            <p className="text-gray-300">2+ videos/week</p>
          </div>
          <div>
            <p className="text-gold font-semibold">Active</p>
            <p className="text-gray-300">1-2 videos/week</p>
          </div>
          <div>
            <p className="text-gold font-semibold">Moderate</p>
            <p className="text-gray-300">1-2 videos/month</p>
          </div>
          <div>
            <p className="text-gold font-semibold">Inactive</p>
            <p className="text-gray-300">&lt;1 video/month</p>
          </div>
        </div>
      </div>
    </div>
  )
}
