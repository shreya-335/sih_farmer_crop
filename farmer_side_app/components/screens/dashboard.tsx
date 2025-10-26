"use client"

import { AlertCircle, Clock, CheckCircle, TrendingUp, MapPin, Bell, ArrowRight } from "lucide-react"
import { useModal } from "@/components/providers/modal-provider"

interface DashboardProps {
  onNavigate: (screen: string) => void
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { showModal } = useModal()

  const handleAlertClick = () => {
    showModal({
      type: "warning",
      title: "Active Alert",
      message:
        "Severe crop damage due to unexpected hailstorm in Nashik District. Multiple fields affected. Reported by Rajesh Patil 2 minutes ago.",
    })
  }

  const handleAssignClick = () => {
    showModal({
      type: "confirmation",
      title: "Assign Inspector?",
      message: "Assign this case to Inspector Priya Sharma for field verification?",
      action: "Assign",
      onConfirm: () => {
        showModal({
          type: "success",
          title: "Inspector Assigned",
          message:
            "Inspector Priya Sharma has been assigned to this case. Field visit scheduled for tomorrow at 10 AM.",
        })
      },
    })
  }

  const handleReportDamage = () => {
    showModal({
      type: "info",
      title: "Report Damage",
      message: "You are about to start a new damage report. Have your crop photos ready.",
    })
    setTimeout(() => {
      onNavigate("report-damage")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 space-y-2">
        <h2 className="text-2xl font-bold">Welcome back, Farmer!</h2>
        <p className="text-sm opacity-90">Nashik District • Oct 23, 2025</p>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* New Alerts */}
          <div
            onClick={() =>
              showModal({
                type: "info",
                title: "New Alerts",
                message: "7 new alerts in the last hour. 3 more than the previous hour.",
              })
            }
            className="bg-card border border-border rounded-lg p-4 hover:border-accent transition cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">New Alerts</p>
                <p className="text-3xl font-bold text-foreground">7</p>
                <p className="text-xs text-red-500 mt-2">+3 from last hour</p>
              </div>
              <div className="p-2 bg-red-500/10 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
            </div>
          </div>

          {/* Pending Cases */}
          <div
            onClick={() =>
              showModal({
                type: "info",
                title: "Pending Cases",
                message: "24 cases pending verification. 5 fewer than yesterday.",
              })
            }
            className="bg-card border border-border rounded-lg p-4 hover:border-accent transition cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Pending Cases</p>
                <p className="text-3xl font-bold text-foreground">24</p>
                <p className="text-xs text-green-500 mt-2">-5 from yesterday</p>
              </div>
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
            </div>
          </div>

          {/* AI Verified */}
          <div
            onClick={() =>
              showModal({
                type: "success",
                title: "AI Verified Today",
                message: "156 claims verified by AI today with 12% efficiency improvement.",
              })
            }
            className="bg-card border border-border rounded-lg p-4 hover:border-accent transition cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">AI Verified Today</p>
                <p className="text-3xl font-bold text-foreground">156</p>
                <p className="text-xs text-green-500 mt-2">+12% efficiency</p>
              </div>
              <div className="p-2 bg-green-500/10 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </div>

          {/* Active Hotspots */}
          <div
            onClick={() =>
              showModal({
                type: "warning",
                title: "Active Hotspots",
                message: "3 active hotspots detected. 2 are high priority requiring immediate attention.",
              })
            }
            className="bg-card border border-border rounded-lg p-4 hover:border-accent transition cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Active Hotspots</p>
                <p className="text-3xl font-bold text-foreground">3</p>
                <p className="text-xs text-red-500 mt-2">2 high priority</p>
              </div>
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Alerts Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Bell className="w-5 h-5 text-accent" />
              Active Alerts
            </h2>
            <button
              onClick={() =>
                showModal({
                  type: "info",
                  title: "All Alerts",
                  message: "Showing 1 of 7 active alerts. View all alerts in the alerts section.",
                })
              }
              className="text-xs text-accent hover:underline"
            >
              View All
            </button>
          </div>

          <div className="bg-card border border-red-500/30 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">Nashik District</h3>
                  <span className="px-2 py-1 bg-red-500/20 text-red-500 text-xs rounded font-medium">Priority</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Severe crop damage due to unexpected hailstorm. Multiple fields affected.
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>Rajesh Patil</span>
                  <span>2 min ago</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleAlertClick}
                className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-sm font-medium text-foreground hover:bg-card transition"
              >
                View Details
              </button>
              <button
                onClick={handleAssignClick}
                className="flex-1 px-3 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:opacity-90 transition"
              >
                Assign
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
          <button
            onClick={handleReportDamage}
            className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            Report Crop Damage
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                showModal({
                  type: "info",
                  title: "Marketplace",
                  message: "Browse and purchase agricultural supplies, seeds, and equipment.",
                })
                setTimeout(() => {
                  onNavigate("marketplace")
                }, 1000)
              }}
              className="bg-card border border-border py-3 rounded-lg font-medium text-foreground hover:border-accent transition flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Marketplace
            </button>
            <button
              onClick={() => {
                showModal({
                  type: "info",
                  title: "Mandi Rates",
                  message: "Check current crop prices and market trends.",
                })
                setTimeout(() => {
                  onNavigate("mandi-rates")
                }, 1000)
              }}
              className="bg-card border border-border py-3 rounded-lg font-medium text-foreground hover:border-accent transition flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              Mandi Rates
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
