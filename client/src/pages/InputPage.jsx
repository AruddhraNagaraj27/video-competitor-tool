import React from 'react'

export default function InputPage({ onGenerateReport, isLoading }) {
  const [companyName, setCompanyName] = React.useState('')
  const [competitors, setCompetitors] = React.useState(['', '', '', ''])
  const [error, setError] = React.useState('')

  const handleCompetitorChange = (index, value) => {
    const newCompetitors = [...competitors]
    newCompetitors[index] = value
    setCompetitors(newCompetitors)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!companyName.trim()) {
      setError('Please enter your company name')
      return
    }

    const validCompetitors = competitors.filter(c => c && c.trim())
    if (validCompetitors.length === 0) {
      setError('Please enter at least one competitor')
      return
    }

    onGenerateReport(companyName.trim(), validCompetitors)
  }

  const handleLoadExample = (company, compList) => {
    setCompanyName(company)
    setCompetitors([...compList, ...Array(4 - compList.length).fill('')])
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-12 md:py-16 relative overflow-x-hidden bg-gradient-to-b from-[#1a3a52] via-[#152e42] to-[#0f2230]">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-2xl z-10">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-4 fade-in">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 shadow-lg">
            <div className="flex items-end gap-1 h-6">
              <div className="w-1.5 h-4 bg-blue-400 rounded-sm animate-pulse"></div>
              <div className="w-1.5 h-6 bg-pink-500 rounded-sm animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1.5 h-5 bg-emerald-400 rounded-sm animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 title-animate">
            Video Competitor <span className="text-[#3b82f6] gradient-text-animated">Intelligence</span>
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-lg mx-auto leading-relaxed">
            Deep dive into YouTube performance. Analyze competitors in seconds.
            <br />
            Get actionable insights.
          </p>
        </div>

        {/* Small Tags/Badges */}
        <div className="flex justify-center gap-3 mb-8 fade-in text-xs font-medium text-white/90">
          <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm flex items-center gap-1.5 hover:bg-white/10 transition-colors cursor-default">
            📊 Real YouTube Data
          </span>
          <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm flex items-center gap-1.5 hover:bg-white/10 transition-colors cursor-default">
            🎯 AI Insights
          </span>
          <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm flex items-center gap-1.5 hover:bg-white/10 transition-colors cursor-default">
            📁 PowerPoint Export
          </span>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 mb-8 fade-in text-left">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Name Field */}
            <div>
              <label className="block text-[#1e293b] font-bold text-sm mb-2">
                Your Company Name <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 transition-all group-focus-within:scale-120 duration-200">🏢</span>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g., Amul, Nike, Tesla, Apple..."
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all text-[#1e293b] placeholder-gray-400 shadow-sm hover:border-blue-300 ${companyName ? 'bg-[#f0f9ff] border-blue-300' : 'bg-[#f8fafc] border-gray-200'
                    }`}
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1.5 ml-1">
                Enter your company's official name as it appears on YouTube
              </p>
            </div>

            {/* Competitors Fields Header */}
            <div className="pt-2">
              <label className="block text-[#1e293b] font-bold text-sm mb-3">
                ⚔️ Add Competitors <span className="text-xs font-normal text-gray-400">(Up to 4)</span>
              </label>
              <div className="space-y-3">
                {/* Competitor 1 (Required) */}
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500 transition-all group-focus-within:scale-120 duration-200">🏆</span>
                  <input
                    type="text"
                    value={competitors[0]}
                    onChange={(e) => handleCompetitorChange(0, e.target.value)}
                    placeholder="Competitor 1 (required)"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all text-[#1e293b] placeholder-gray-400 shadow-sm hover:border-purple-300 ${competitors[0] ? 'bg-[#faf5ff] border-purple-300' : 'bg-[#f8fafc] border-gray-200'
                      }`}
                  />
                </div>

                {/* Competitor 2 (Optional) */}
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 transition-all group-focus-within:scale-120 duration-200">🥈</span>
                  <input
                    type="text"
                    value={competitors[1]}
                    onChange={(e) => handleCompetitorChange(1, e.target.value)}
                    placeholder="Competitor 2 (optional)"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all text-[#1e293b] placeholder-gray-400 shadow-sm hover:border-blue-300 ${competitors[1] ? 'bg-[#f0f9ff] border-blue-300' : 'bg-[#f8fafc] border-gray-200'
                      }`}
                  />
                </div>

                {/* Competitor 3 (Optional) */}
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600 transition-all group-focus-within:scale-120 duration-200">🥉</span>
                  <input
                    type="text"
                    value={competitors[2]}
                    onChange={(e) => handleCompetitorChange(2, e.target.value)}
                    placeholder="Competitor 3 (optional)"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 focus:outline-none transition-all text-[#1e293b] placeholder-gray-400 shadow-sm hover:border-amber-300 ${competitors[2] ? 'bg-[#fffbeb] border-amber-300' : 'bg-[#f8fafc] border-gray-200'
                      }`}
                  />
                </div>

                {/* Competitor 4 (Optional) */}
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500 transition-all group-focus-within:scale-120 duration-200">⭐</span>
                  <input
                    type="text"
                    value={competitors[3]}
                    onChange={(e) => handleCompetitorChange(3, e.target.value)}
                    placeholder="Competitor 4 (optional)"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 focus:outline-none transition-all text-[#1e293b] placeholder-gray-400 shadow-sm hover:border-yellow-300 ${competitors[3] ? 'bg-[#fefce8] border-yellow-300' : 'bg-[#f8fafc] border-gray-200'
                      }`}
                  />
                </div>
              </div>
              <p className="text-[11px] text-gray-400 mt-2 ml-1">
                Enter names exactly as they appear on YouTube. Mix and match any brands!
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl">
                <p className="text-red-700 text-sm font-semibold">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-[0.99] hover:scale-[1.01] text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all duration-200 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Report...
                </span>
              ) : (
                'Generate Competitor Report'
              )}
            </button>
          </form>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 fade-in">
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-5 text-center text-white transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/10 hover:border-white/20 hover:shadow-lg">
            <div className="text-2xl mb-2">💻</div>
            <h3 className="font-bold text-sm mb-1">Real YouTube Data</h3>
            <p className="text-xs text-gray-300">Fetches authentic metrics from YouTube channels</p>
          </div>
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-5 text-center text-white transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/10 hover:border-white/20 hover:shadow-lg">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-bold text-sm mb-1">Smart Analysis</h3>
            <p className="text-xs text-gray-300">AI-powered insights & recommendations</p>
          </div>
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-5 text-center text-white transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/10 hover:border-white/20 hover:shadow-lg">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-bold text-sm mb-1">Export Reports</h3>
            <p className="text-xs text-gray-300">Professional PowerPoint presentations</p>
          </div>
        </div>

        {/* Examples Card */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 rounded-2xl p-6 text-white text-left shadow-xl fade-in">
          <h3 className="font-bold text-sm flex items-center gap-2 mb-4">
            💡 Try These Examples
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            {/* Example 1 */}
            <div
              onClick={() => handleLoadExample('Amul', ['Aavin', 'Country Delight', 'Milky Mist'])}
              className="bg-white/10 hover:bg-white/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-white/30 p-4 rounded-xl cursor-pointer border border-white/10"
            >
              <h4 className="font-bold mb-2 flex items-center gap-1.5 text-sm">
                🥛 Dairy Industry
              </h4>
              <p className="mb-1"><span className="opacity-80">Company:</span> <strong className="text-yellow-200">Amul</strong></p>
              <p><span className="opacity-80">Competitors:</span> <strong className="text-yellow-100">Aavin, Country Delight, Milky Mist</strong></p>
            </div>
            {/* Example 2 */}
            <div
              onClick={() => handleLoadExample('Nike', ['Adidas', 'Puma', 'Under Armour'])}
              className="bg-white/10 hover:bg-white/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-white/30 p-4 rounded-xl cursor-pointer border border-white/10"
            >
              <h4 className="font-bold mb-2 flex items-center gap-1.5 text-sm">
                👟 Fashion Industry
              </h4>
              <p className="mb-1"><span className="opacity-80">Company:</span> <strong className="text-yellow-200">Nike</strong></p>
              <p><span className="opacity-80">Competitors:</span> <strong className="text-yellow-100">Adidas, Puma, Under Armour</strong></p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400/80 text-xs">
          <p>Enter real company names for accurate YouTube data analysis</p>
        </div>
      </div>
    </div>
  )
}
