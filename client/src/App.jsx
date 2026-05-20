import './index.css'
import React, { useState } from 'react'
import InputPage from './pages/InputPage'
import ReportPage from './pages/ReportPage'

function App() {
  const [currentPage, setCurrentPage] = useState('input')
  const [reportData, setReportData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerateReport = async (companyName, competitors) => {
  setIsLoading(true)

  try {
    const API_URL = import.meta.env.VITE_API_URL

    const response = await fetch(`${API_URL}/api/generate-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companyName,
        competitors: competitors.filter(c => c && c.trim()),
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to generate report')
    }

    setReportData({
      companyName,
      competitors,
      report: data.report,
    })

    setCurrentPage('report')

  } catch (error) {
    alert(`Error: ${error.message}`)
  } finally {
    setIsLoading(false)
  }
}

  const handleBackToInput = () => {
    setCurrentPage('input')
    setReportData(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy to-navy-light">
      {currentPage === 'input' && (
        <InputPage onGenerateReport={handleGenerateReport} isLoading={isLoading} />
      )}
      {currentPage === 'report' && reportData && (
        <ReportPage
          reportData={reportData}
          onBack={handleBackToInput}
        />
      )}
    </div>
  )
}

export default App
