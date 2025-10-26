"use client"

import { ArrowRight, AlertCircle, TrendingUp, ShoppingCart, FileText } from "lucide-react"
import { useModal } from "@/components/providers/modal-provider"

interface HomeProps {
  onNavigate: (screen: string) => void
}

export default function Home({ onNavigate }: HomeProps) {
  const { showModal } = useModal()

  const handleReportClick = () => {
    onNavigate("report-damage")
  }

  const handleMarketplaceClick = () => {
    showModal({
      type: "info",
      title: "Marketplace",
      message: "Browse and purchase agricultural supplies, seeds, pesticides, and equipment.",
      action: "Browse",
      onConfirm: () => {
        onNavigate("marketplace")
      },
    })
  }

  const handleMandiClick = () => {
    showModal({
      type: "info",
      title: "Mandi Rates",
      message: "Check current market prices for your crops and get selling recommendations.",
      action: "Check Rates",
      onConfirm: () => {
        onNavigate("mandi-rates")
      },
    })
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-accent/20 to-background border-b border-border p-6 space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Welcome Back!</h1>
          <p className="text-muted-foreground">Nashik District • Oct 24, 2024</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card border border-border rounded-lg p-3 space-y-1">
            <p className="text-xs text-muted-foreground">Active Claims</p>
            <p className="text-2xl font-bold text-accent">2</p>
            <p className="text-xs text-green-500">Processing</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3 space-y-1">
            <p className="text-xs text-muted-foreground">Approved Claims</p>
            <p className="text-2xl font-bold text-green-500">5</p>
            <p className="text-xs text-muted-foreground">₹2,50,000</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Primary Action */}
        <button
          onClick={handleReportClick}
          className="w-full bg-accent text-accent-foreground rounded-lg p-4 space-y-2 hover:opacity-90 transition text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Report Crop Loss</h2>
              <p className="text-sm opacity-90">Start a new damage claim</p>
            </div>
            <ArrowRight className="w-5 h-5" />
          </div>
        </button>

        {/* Recent Activity */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
          <div className="bg-card border border-border rounded-lg p-3 space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">Claim #12345 Approved</p>
                <p className="text-xs text-muted-foreground">Hailstorm damage - Wheat field</p>
                <p className="text-xs text-green-500 font-medium">₹1,25,000 credited</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Features */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground">Quick Access</h3>
          <div className="grid grid-cols-2 gap-3">
            {/* Mandi Rates Card */}
            <button
              onClick={handleMandiClick}
              className="bg-card border border-border rounded-lg p-4 space-y-3 hover:border-accent transition text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">Mandi Rates</h4>
                <p className="text-xs text-muted-foreground">Check crop prices</p>
              </div>
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-accent font-medium">Wheat: ₹2,450 ↑5.2%</p>
              </div>
            </button>

            {/* Marketplace Card */}
            <button
              onClick={handleMarketplaceClick}
              className="bg-card border border-border rounded-lg p-4 space-y-3 hover:border-accent transition text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">Marketplace</h4>
                <p className="text-xs text-muted-foreground">Buy supplies</p>
              </div>
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-accent font-medium">20% off monsoon deals</p>
              </div>
            </button>
          </div>
        </div>

        {/* Weather Alert */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 space-y-2">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-600 text-sm">Weather Alert</p>
              <p className="text-xs text-yellow-600/80">
                Heavy rainfall expected in next 48 hours. Ensure proper drainage.
              </p>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-card border border-border rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-foreground">Helpful Tips</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Take clear photos in good lighting for better damage assessment</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Report damage within 48 hours for faster processing</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Keep your land documents ready for field visits</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
