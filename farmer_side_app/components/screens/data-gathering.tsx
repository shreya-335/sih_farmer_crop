"use client"

import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { useModal } from "@/components/providers/modal-provider"

interface DataGatheringProps {
  onNavigate: (screen: string) => void
}

export default function DataGathering({ onNavigate }: DataGatheringProps) {
  const [progress, setProgress] = useState({
    weather: false,
    satellite: false,
    analysis: false,
    complete: false,
  })
  const { showModal } = useModal()

  useEffect(() => {
    // Simulate weather data gathering
    const weatherTimer = setTimeout(() => {
      setProgress((prev) => ({ ...prev, weather: true }))
      showModal({
        type: "success",
        title: "Weather Data Retrieved",
        message: "Historical weather patterns and conditions loaded successfully",
      })
    }, 2000)

    // Simulate satellite imagery gathering
    const satelliteTimer = setTimeout(() => {
      setProgress((prev) => ({ ...prev, satellite: true }))
      showModal({
        type: "success",
        title: "Satellite Images Retrieved",
        message: "Latest satellite imagery and vegetation indices loaded",
      })
    }, 4000)

    // Simulate analysis
    const analysisTimer = setTimeout(() => {
      setProgress((prev) => ({ ...prev, analysis: true }))
      showModal({
        type: "success",
        title: "Analysis Complete",
        message: "AI analysis and damage assessment completed",
      })
    }, 6000)

    // Complete and navigate
    const completeTimer = setTimeout(() => {
      setProgress((prev) => ({ ...prev, complete: true }))
      showModal({
        type: "success",
        title: "Report Ready",
        message: "Your comprehensive damage report is ready for review",
        onConfirm: () => {
          onNavigate("comprehensive-report")
        },
      })
    }, 8000)

    return () => {
      clearTimeout(weatherTimer)
      clearTimeout(satelliteTimer)
      clearTimeout(analysisTimer)
      clearTimeout(completeTimer)
    }
  }, [onNavigate, showModal])

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="p-2">
            <ArrowLeft className="w-5 h-5 text-muted-foreground opacity-50" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Gathering Evidence</h1>
            <p className="text-xs text-muted-foreground">Step 4 of 5</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full transition-colors ${s <= 4 ? "bg-accent" : "bg-border"}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Main Loading Animation */}
        <div className="bg-card border border-border rounded-lg p-8 text-center space-y-4">
          <div className="w-20 h-20 bg-accent/10 rounded-lg flex items-center justify-center mx-auto">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Processing Your Report</h2>
            <p className="text-sm text-muted-foreground">
              Gathering data from multiple sources to create a comprehensive damage assessment...
            </p>
          </div>
        </div>

        {/* Data Gathering Steps */}
        <div className="space-y-3">
          {/* Weather Data */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    progress.weather ? "bg-green-500" : "bg-accent animate-pulse"
                  }`}
                >
                  {progress.weather && <span className="text-white text-xs">✓</span>}
                </div>
                <div>
                  <p className="font-medium text-foreground">Gathering Weather Data</p>
                  <p className="text-xs text-muted-foreground">Historical patterns, rainfall, temperature</p>
                </div>
              </div>
              {progress.weather && <span className="text-xs text-green-500 font-semibold">Done</span>}
            </div>
            {progress.weather && (
              <div className="ml-8 text-xs text-muted-foreground space-y-1">
                <p>• Rainfall: 45mm (2 days before damage)</p>
                <p>• Temperature: 28-32°C</p>
                <p>• Wind Speed: 35-40 km/h</p>
              </div>
            )}
          </div>

          {/* Satellite Imagery */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    progress.satellite ? "bg-green-500" : "bg-muted"
                  }`}
                >
                  {progress.satellite && <span className="text-white text-xs">✓</span>}
                </div>
                <div>
                  <p className={`font-medium ${progress.satellite ? "text-foreground" : "text-muted-foreground"}`}>
                    Gathering Satellite Images
                  </p>
                  <p className="text-xs text-muted-foreground">NDVI, vegetation indices, field mapping</p>
                </div>
              </div>
              {progress.satellite && <span className="text-xs text-green-500 font-semibold">Done</span>}
            </div>
            {progress.satellite && (
              <div className="ml-8 text-xs text-muted-foreground space-y-1">
                <p>• NDVI Index: 0.42 (Healthy: 0.6-0.8)</p>
                <p>• Field Coverage: 2.5 hectares</p>
                <p>• Damage Pattern: Scattered across field</p>
              </div>
            )}
          </div>

          {/* AI Analysis */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    progress.analysis ? "bg-green-500" : "bg-muted"
                  }`}
                >
                  {progress.analysis && <span className="text-white text-xs">✓</span>}
                </div>
                <div>
                  <p className={`font-medium ${progress.analysis ? "text-foreground" : "text-muted-foreground"}`}>
                    AI Damage Analysis
                  </p>
                  <p className="text-xs text-muted-foreground">Photo analysis, damage assessment, correlation</p>
                </div>
              </div>
              {progress.analysis && <span className="text-xs text-green-500 font-semibold">Done</span>}
            </div>
            {progress.analysis && (
              <div className="ml-8 text-xs text-muted-foreground space-y-1">
                <p>• Damage Type: Hailstorm (95% confidence)</p>
                <p>• Severity: High (60-70% crop loss)</p>
                <p>• Correlation: Weather + Satellite + Photos match</p>
              </div>
            )}
          </div>
        </div>

        {/* Status Message */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-center">
          <p className="text-sm text-accent font-medium">
            {progress.complete ? "✓ All data gathered successfully!" : "Processing... This may take a few moments"}
          </p>
        </div>
      </div>
    </div>
  )
}
