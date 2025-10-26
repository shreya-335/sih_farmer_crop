"use client"

import { CheckCircle, Clock, FileText } from "lucide-react"

interface ClaimSubmittedProps {
  onNavigate: (screen: string) => void
}

export default function ClaimSubmitted({ onNavigate }: ClaimSubmittedProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-foreground">Claim Status</h1>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Success Message */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center space-y-3">
          <div className="flex justify-center">
            <CheckCircle className="w-16 h-16 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-green-400">Claim Submitted!</h2>
          <p className="text-sm text-muted-foreground">Your claim has been successfully submitted for processing</p>
        </div>

        {/* Claim ID */}
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Claim ID</p>
          <p className="text-2xl font-bold text-accent font-mono">CLM-2025-001847</p>
          <p className="text-xs text-muted-foreground mt-2">Save this for your records</p>
        </div>

        {/* Timeline */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">What Happens Next</h3>

          <div className="space-y-3">
            {/* Step 1 */}
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <div className="w-0.5 h-12 bg-border my-1" />
              </div>
              <div className="pb-3">
                <p className="font-medium text-foreground">Claim Submitted</p>
                <p className="text-xs text-muted-foreground">Just now</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent flex items-center justify-center">
                  <Clock className="w-4 h-4 text-accent" />
                </div>
                <div className="w-0.5 h-12 bg-border my-1" />
              </div>
              <div className="pb-3">
                <p className="font-medium text-foreground">Under Review</p>
                <p className="text-xs text-muted-foreground">Expected: 24 hours</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground">Payment Processed</p>
                <p className="text-xs text-muted-foreground">Expected: 3-5 business days</p>
              </div>
            </div>
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
              <span className="text-muted-foreground">Location:</span>
              <span className="text-foreground font-medium">Nashik District</span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-secondary border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">
            You'll receive updates via SMS and in-app notifications. Keep your phone number updated in settings.
          </p>
        </div>

        {/* Suggested Actions */}
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">Suggested Actions</h3>
          <button
            onClick={() => onNavigate("marketplace")}
            className="w-full bg-card border border-border py-3 rounded-lg font-medium text-foreground hover:border-accent transition"
          >
            Browse Marketplace
          </button>
          <button
            onClick={() => onNavigate("mandi-rates")}
            className="w-full bg-card border border-border py-3 rounded-lg font-medium text-foreground hover:border-accent transition"
          >
            Check Mandi Rates
          </button>
          <button
            onClick={() => onNavigate("dashboard")}
            className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
