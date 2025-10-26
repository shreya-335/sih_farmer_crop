"use client"

import { ArrowLeft, CheckCircle, Cloud, Droplets, MapPin } from "lucide-react"

interface AnalysisGreenLaneProps {
  onNavigate: (screen: string) => void
}

export default function AnalysisGreenLane({ onNavigate }: AnalysisGreenLaneProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate("dashboard")} className="p-2 hover:bg-secondary rounded-lg transition">
            <ArrowLeft className="w-5 h-5 text-accent" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Analysis Results</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Success Banner */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center space-y-2">
          <div className="flex justify-center">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
          <h2 className="text-xl font-bold text-green-400">Claim Verified!</h2>
          <p className="text-sm text-muted-foreground">Flood damage detected and confirmed</p>
        </div>

        {/* Evidence Section */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Evidence Summary</h3>

          {/* Geo-tag Location Data */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent" />
              <h4 className="font-semibold text-foreground">Geo-tag Location Data</h4>
            </div>
            <p className="text-sm text-muted-foreground">GPS coordinates: 19.8965°N, 73.7853°E (±5 meters accuracy)</p>
          </div>

          {/* Farmer's Photo */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="bg-secondary h-32 flex items-center justify-center">
              <div className="text-4xl">📷</div>
            </div>
            <div className="p-3">
              <p className="text-xs text-muted-foreground">Your Photo</p>
              <p className="text-sm font-medium text-foreground">Waterlogged field - Wheat crop</p>
            </div>
          </div>

          {/* Weather Data */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-accent" />
              <h4 className="font-semibold text-foreground">Weather Data</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Heavy rainfall (120mm) recorded in Nashik District on Oct 22, 2025
            </p>
          </div>

          {/* Satellite Data */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Cloud className="w-5 h-5 text-accent" />
              <h4 className="font-semibold text-foreground">Satellite Imagery</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              High water levels detected in your area matching the damage pattern
            </p>
          </div>
        </div>

        {/* Claim Details */}
        <div className="bg-card border border-border rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-foreground">Claim Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Crop Type:</span>
              <span className="text-foreground font-medium">Wheat</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Damage Type:</span>
              <span className="text-foreground font-medium">Flood</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Affected Area:</span>
              <span className="text-foreground font-medium">2.5 acres</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Confidence:</span>
              <span className="text-green-400 font-medium">98%</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => onNavigate("claim-submitted")}
            className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Submit Claim
          </button>
          <button
            onClick={() => onNavigate("dashboard")}
            className="w-full bg-card border border-border py-3 rounded-lg font-semibold text-foreground hover:border-accent transition"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Next Steps */}
        <div className="bg-secondary border border-border rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-foreground">Next Steps</h3>
          <div className="space-y-2 text-sm">
            <div className="flex gap-2">
              <span className="text-accent font-bold">1.</span>
              <span className="text-muted-foreground">Your claim will be processed within 24 hours</span>
            </div>
            <div className="flex gap-2">
              <span className="text-accent font-bold">2.</span>
              <span className="text-muted-foreground">
                You'll receive payment updates via SMS and app notifications
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-accent font-bold">3.</span>
              <span className="text-muted-foreground">Check Mandi Rates for selling unaffected crops</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
