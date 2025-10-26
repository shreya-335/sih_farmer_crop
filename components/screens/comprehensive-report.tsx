"use client"

import { ArrowLeft, Download, Share2, CheckCircle2, AlertCircle, TrendingUp, ShoppingCart } from "lucide-react"
import { useModal } from "@/components/providers/modal-provider"

interface ReportFlowState {
  photos: string[]
  cropType: string
  damageType: string
  affectedArea: string
  dateOfDamage: string
  description: string
  weatherData: {
    rainfall: string
    temperature: string
    windSpeed: string
  }
  satelliteData: {
    ndvi: string
    coverage: string
    damagePattern: string
  }
  aiAnalysis: {
    damageType: string
    severity: string
    confidence: string
    estimatedLoss: string
  }
}

interface ComprehensiveReportProps {
  onNavigate: (screen: string) => void
  reportData: ReportFlowState
}

export default function ComprehensiveReport({ onNavigate, reportData }: ComprehensiveReportProps) {
  const { showModal } = useModal()

  const handleDownload = () => {
    showModal({
      type: "success",
      title: "Report Downloaded",
      message: "Your comprehensive damage report has been downloaded as PDF",
    })
  }

  const handleShare = () => {
    showModal({
      type: "success",
      title: "Report Shared",
      message: "Report shared with insurance company and government authorities",
    })
  }

  const handleSubmit = () => {
    showModal({
      type: "confirmation",
      title: "Submit Report?",
      message: "Are you sure you want to submit this report? You can still make changes after submission.",
      action: "Submit",
      onConfirm: () => {
        showModal({
          type: "success",
          title: "Report Submitted",
          message: "Your damage report has been successfully submitted for processing",
          onConfirm: () => {
            onNavigate("home")
          },
        })
      },
    })
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate("data-gathering")} className="p-2 hover:bg-secondary rounded-lg transition">
            <ArrowLeft className="w-5 h-5 text-accent" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Damage Report</h1>
            <p className="text-xs text-muted-foreground">Step 5 of 5</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className={`flex-1 h-1 rounded-full transition-colors bg-accent`} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Report Status */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <p className="font-semibold text-green-600">Report Ready for Submission</p>
          </div>
          <p className="text-sm text-green-600/80">All data has been verified and cross-referenced</p>
        </div>

        {/* Report Summary */}
        <div className="bg-card border border-border rounded-lg p-4 space-y-4">
          <h2 className="font-semibold text-foreground text-lg">Report Summary</h2>

          {/* Farmer Details */}
          <div className="space-y-2 pb-4 border-b border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Farmer Information</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Name</p>
                <p className="text-foreground font-medium">Rajesh Patel</p>
              </div>
              <div>
                <p className="text-muted-foreground">Phone</p>
                <p className="text-foreground font-medium">+91 98765 43210</p>
              </div>
              <div>
                <p className="text-muted-foreground">District</p>
                <p className="text-foreground font-medium">Nashik</p>
              </div>
              <div>
                <p className="text-muted-foreground">State</p>
                <p className="text-foreground font-medium">Maharashtra</p>
              </div>
            </div>
          </div>

          {/* Crop Details */}
          <div className="space-y-2 pb-4 border-b border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Crop Information</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Crop Type</p>
                <p className="text-foreground font-medium capitalize">{reportData.cropType || "Wheat"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Affected Area</p>
                <p className="text-foreground font-medium">{reportData.affectedArea || "2.5"} acres</p>
              </div>
              <div>
                <p className="text-muted-foreground">Damage Cause</p>
                <p className="text-foreground font-medium capitalize">{reportData.damageType || "Hailstorm"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Date of Damage</p>
                <p className="text-foreground font-medium">{reportData.dateOfDamage || "Oct 20, 2024"}</p>
              </div>
            </div>
          </div>

          {/* Damage Assessment */}
          <div className="space-y-2 pb-4 border-b border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Damage Assessment</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Damage Severity</span>
                <span className="text-foreground font-medium">{reportData.aiAnalysis.severity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">AI Confidence</span>
                <span className="text-green-500 font-medium">{reportData.aiAnalysis.confidence}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Loss</span>
                <span className="text-foreground font-medium">{reportData.aiAnalysis.estimatedLoss}</span>
              </div>
            </div>
          </div>

          {/* Evidence Data */}
          <div className="space-y-2 pb-4 border-b border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Evidence Data</h3>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Weather Conditions</p>
                <p className="text-foreground">
                  Rainfall: {reportData.weatherData.rainfall} | Temp: {reportData.weatherData.temperature} | Wind:{" "}
                  {reportData.weatherData.windSpeed}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Satellite Analysis</p>
                <p className="text-foreground">
                  NDVI: {reportData.satelliteData.ndvi} (Healthy: 0.6-0.8) | Coverage:{" "}
                  {reportData.satelliteData.coverage}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Photo Analysis</p>
                <p className="text-foreground">
                  {reportData.photos.length} high-quality photos analyzed | Damage pattern confirmed
                </p>
              </div>
            </div>
          </div>

          {/* Verification Status */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 space-y-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <div className="text-xs text-accent">
                <p className="font-semibold mb-1">Verification Status: APPROVED</p>
                <p>All data sources align. Report is eligible for claim processing.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">While Your Claim Processes...</h3>

          {/* Mandi Rates Card */}
          <button
            onClick={() => onNavigate("mandi-rates")}
            className="w-full bg-card border border-border rounded-lg p-4 space-y-2 hover:border-accent transition text-left"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Check Mandi Rates</h4>
                  <p className="text-xs text-muted-foreground">See current prices for unaffected crops in your area</p>
                </div>
              </div>
            </div>
            <div className="bg-secondary rounded p-2 text-xs">
              <p className="text-muted-foreground">Wheat: ₹2,450 ↑5.2% | Rice: ₹3,200 ↓2.1%</p>
            </div>
          </button>

          {/* Marketplace Card */}
          <button
            onClick={() => onNavigate("marketplace")}
            className="w-full bg-card border border-border rounded-lg p-4 space-y-2 hover:border-accent transition text-left"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <ShoppingCart className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Explore Marketplace</h4>
                  <p className="text-xs text-muted-foreground">Plan for next season with flood-resistant seeds</p>
                </div>
              </div>
            </div>
            <div className="bg-secondary rounded p-2 text-xs">
              <p className="text-accent font-medium">20% off monsoon deals - Shop now</p>
            </div>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleDownload}
            className="w-full bg-card border border-border py-3 rounded-lg font-semibold text-foreground hover:border-accent transition flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Report
          </button>
          <button
            onClick={handleShare}
            className="w-full bg-card border border-border py-3 rounded-lg font-semibold text-foreground hover:border-accent transition flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share Report
          </button>
          <button
            onClick={handleSubmit}
            className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Submit Report
          </button>
        </div>
      </div>
    </div>
  )
}
