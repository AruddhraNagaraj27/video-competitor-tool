import React from 'react'
import ReportSummary from '../components/ReportSummary'
import ChannelOverview from '../components/ChannelOverview'
import TopVideos from '../components/TopVideos'
import EngagementAnalysis from '../components/EngagementAnalysis'
import PostingFrequency from '../components/PostingFrequency'
import ContentThemes from '../components/ContentThemes'
import GapAnalysis from '../components/GapAnalysis'
import Recommendations from '../components/Recommendations'
import FinalRanking from '../components/FinalRanking'

export default function ReportPage({ reportData, onBack }) {
  const [downloadLoading, setDownloadLoading] = React.useState(false)
  const [selectedSection, setSelectedSection] = React.useState('summary')

const handleDownloadPPT = async () => {
  setDownloadLoading(true)

  try {
    const API_URL = import.meta.env.VITE_API_URL

    const response = await fetch(`${API_URL}/api/download-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        analysisReport: reportData.report,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to download report')
    }

    const filename =
      response.headers
        .get('content-disposition')
        ?.split('filename=')[1]
        ?.replace(/"/g, '') || `Video_Report_${Date.now()}.pptx`

    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = filename

    document.body.appendChild(link)
    link.click()

    window.URL.revokeObjectURL(url)
    document.body.removeChild(link)

  } catch (error) {
    alert(`Error: ${error.message}`)
  } finally {
    setDownloadLoading(false)
  }
}

  const sections = [
    { id: 'summary', label: 'Executive Summary', icon: '📊' },
    { id: 'channel', label: 'Channel Overview', icon: '📺' },
    { id: 'videos', label: 'Top Videos', icon: '🎥' },
    { id: 'engagement', label: 'Engagement', icon: '💬' },
    { id: 'frequency', label: 'Posting Frequency', icon: '📅' },
    { id: 'themes', label: 'Content Themes', icon: '🏷️' },
    { id: 'gaps', label: 'Gap Analysis', icon: '🔍' },
    { id: 'recommendations', label: 'Recommendations', icon: '💡' },
    { id: 'ranking', label: 'Final Ranking', icon: '🏆' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-navy-light text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Competitor Intelligence Report</h1>
            <p className="text-gray-300 mt-1">
              {reportData.companyName} vs {reportData.competitors.join(', ')}
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleDownloadPPT}
              disabled={downloadLoading}
              className="btn-secondary"
            >
              {downloadLoading ? 'Downloading...' : '⬇️ Download PowerPoint'}
            </button>
            <button onClick={onBack} className="btn-secondary">
              ← Back
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/95 border-b sticky top-24 z-40 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-2.5 py-4 scrollbar-none">
            {sections.map((section) => {
              const isActive = selectedSection === section.id
              return (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`px-4 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 text-xs xl:text-sm ${
                    isActive
                      ? 'bg-blue-50 text-navy border border-blue-100 border-b-2 border-gold scale-[1.02] shadow-sm'
                      : 'bg-white text-slate-500 hover:text-navy hover:bg-slate-50 border border-slate-200/80'
                  }`}
                >
                  <span className={`text-sm xl:text-base transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
                    {section.icon}
                  </span>
                  <span>{section.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="fade-in">
          {selectedSection === 'summary' && <ReportSummary report={reportData.report} />}
          {selectedSection === 'channel' && <ChannelOverview report={reportData.report} />}
          {selectedSection === 'videos' && <TopVideos report={reportData.report} />}
          {selectedSection === 'engagement' && <EngagementAnalysis report={reportData.report} />}
          {selectedSection === 'frequency' && <PostingFrequency report={reportData.report} />}
          {selectedSection === 'themes' && <ContentThemes report={reportData.report} />}
          {selectedSection === 'gaps' && <GapAnalysis report={reportData.report} />}
          {selectedSection === 'recommendations' && <Recommendations report={reportData.report} />}
          {selectedSection === 'ranking' && <FinalRanking report={reportData.report} />}
        </div>
      </div>
    </div>
  )
}
