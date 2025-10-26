"use client"

import { ArrowLeft, MapPin, Calendar, User, Phone, AlertCircle, CheckCircle2, Clock } from "lucide-react"
import { useState } from "react"

interface AnalysisAssistedLaneProps {
  onNavigate: (screen: string) => void
}

export default function AnalysisAssistedLane({ onNavigate }: AnalysisAssistedLaneProps) {
  const [step, setStep] = useState(1)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate("dashboard")} className="p-2 hover:bg-secondary rounded-lg transition">
            <ArrowLeft className="w-5 h-5 text-accent" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Field Visit Required</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {step === 1 && (
          <div className="space-y-4">
            {/* Info Banner */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 space-y-2">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Manual Verification Needed</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your claim requires an on-site inspection by our certified inspector to verify the damage.
                  </p>
                </div>
              </div>
            </div>

            {/* Claim Summary */}
            <div className="bg-card border border-border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-foreground">Claim Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Crop Type:</span>
                  <span className="text-foreground font-medium">Cotton</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Damage Type:</span>
                  <span className="text-foreground font-medium">Pest Infestation</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Affected Area:</span>
                  <span className="text-foreground font-medium">3.5 acres</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">AI Confidence:</span>
                  <span className="text-yellow-500 font-medium">72%</span>
                </div>
              </div>
            </div>

            {/* Why Manual Verification */}
            <div className="bg-secondary border border-border rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-foreground text-sm">Why Manual Verification?</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Damage pattern is complex and requires expert assessment</li>
                <li>• Multiple damage types detected - needs clarification</li>
                <li>• Claim amount exceeds automated approval threshold</li>
              </ul>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Schedule Field Visit
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Select Preferred Date & Time</h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Preferred Date</label>
                <input
                  type="date"
                  className="w-full bg-card border border-border rounded-lg px-3 py-2 text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Preferred Time Slot</label>
                <div className="grid grid-cols-2 gap-2">
                  {["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"].map((time) => (
                    <button
                      key={time}
                      className="px-3 py-2 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:border-accent transition"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Additional Notes</label>
                <textarea
                  placeholder="Any special instructions for the inspector..."
                  rows={3}
                  className="w-full bg-card border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground resize-none"
                />
              </div>
            </div>

            <button
              onClick={() => setStep(3)}
              className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Confirm Appointment
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center space-y-2">
              <div className="flex justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-green-500">Appointment Confirmed!</h2>
              <p className="text-sm text-muted-foreground">Your field visit has been scheduled</p>
            </div>

            {/* Inspector Details */}
            <div className="bg-card border border-border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-foreground">Inspector Details</h3>

              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Amit Kumar</p>
                  <p className="text-xs text-muted-foreground">Certified Damage Inspector</p>
                  <p className="text-xs text-muted-foreground mt-1">Experience: 8 years</p>
                </div>
              </div>

              <div className="border-t border-border pt-3 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-accent" />
                  <span className="text-foreground">+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span className="text-foreground">Oct 25, 2025 • 2:00 PM</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-foreground">Your registered field location</span>
                </div>
              </div>
            </div>

            {/* What to Expect */}
            <div className="bg-secondary border border-border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-foreground text-sm">What to Expect</h3>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex gap-2">
                  <span className="text-accent font-bold">1.</span>
                  <span>Inspector will examine the damaged area thoroughly</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-accent font-bold">2.</span>
                  <span>Take detailed photos and measurements</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-accent font-bold">3.</span>
                  <span>Verify crop type and damage extent</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-accent font-bold">4.</span>
                  <span>Provide preliminary assessment on the spot</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-card border border-border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-foreground text-sm">Claim Timeline</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">Claim Submitted</p>
                    <p className="text-xs text-muted-foreground">Oct 23, 2025</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">Field Visit Scheduled</p>
                    <p className="text-xs text-muted-foreground">Oct 25, 2025</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-muted-foreground">3</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">Claim Decision</p>
                    <p className="text-xs text-muted-foreground">Within 48 hours of visit</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate("dashboard")}
              className="w-full bg-card border border-border py-3 rounded-lg font-semibold text-foreground hover:border-accent transition"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
