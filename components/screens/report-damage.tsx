"use client"
import { ArrowLeft, Camera, AlertCircle } from "lucide-react"
import { useModal } from "@/components/providers/modal-provider"

interface ReportDamageProps {
  onNavigate: (screen: string) => void
}

export default function ReportDamage({ onNavigate }: ReportDamageProps) {
  const { showModal } = useModal()

  const handleStartReport = () => {
    showModal({
      type: "info",
      title: "Start Damage Report",
      message: "You're about to start the damage assessment process. This will take about 5-10 minutes.",
      action: "Continue",
      onConfirm: () => {
        onNavigate("camera-capture")
      },
    })
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate("home")} className="p-2 hover:bg-secondary rounded-lg transition">
            <ArrowLeft className="w-5 h-5 text-accent" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Report Crop Damage</h1>
            <p className="text-xs text-muted-foreground">Step 1 of 5</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full transition-colors ${s <= 1 ? "bg-accent" : "bg-border"}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        <div className="bg-card border border-border rounded-lg p-6 text-center space-y-4">
          <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto">
            <Camera className="w-8 h-8 text-accent" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Report Crop Loss</h2>
            <p className="text-sm text-muted-foreground">
              Start the damage assessment process. You'll capture photos and provide details about the damage.
            </p>
          </div>
        </div>

        <div className="bg-secondary border border-border rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-foreground text-sm">What You'll Need:</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-accent">✓</span>
              <span>Clear photos of damaged crop area</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">✓</span>
              <span>Crop type and affected area details</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">✓</span>
              <span>Description of damage cause</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">✓</span>
              <span>Date when damage occurred</span>
            </li>
          </ul>
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 space-y-2">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
            <div className="text-xs text-accent">
              <p className="font-semibold mb-1">Important:</p>
              <p>
                Report damage within 48 hours for faster processing. High-quality photos help our AI provide accurate
                assessment.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleStartReport}
          className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Start Report
        </button>
      </div>
    </div>
  )
}
