"use client"

import { ArrowLeft, TrendingUp, TrendingDown, Bell, BarChart3 } from "lucide-react"
import { useState } from "react"

interface MandiRatesProps {
  onNavigate: (screen: string) => void
}

const rates = [
  {
    crop: "Wheat",
    price: 2450,
    change: 5.2,
    trend: "up",
    volume: "1,250 tons",
    quality: "A Grade",
    priceHistory: [2200, 2250, 2300, 2350, 2400, 2450],
  },
  {
    crop: "Rice",
    price: 3200,
    change: -2.1,
    trend: "down",
    volume: "890 tons",
    quality: "Premium",
    priceHistory: [3400, 3350, 3300, 3250, 3225, 3200],
  },
  {
    crop: "Cotton",
    price: 5800,
    change: 8.3,
    trend: "up",
    volume: "450 tons",
    quality: "Grade A",
    priceHistory: [5200, 5300, 5400, 5600, 5700, 5800],
  },
  {
    crop: "Sugarcane",
    price: 3100,
    change: 1.5,
    trend: "up",
    volume: "2,100 tons",
    quality: "Standard",
    priceHistory: [3000, 3020, 3050, 3070, 3085, 3100],
  },
  {
    crop: "Maize",
    price: 1950,
    change: -3.2,
    trend: "down",
    volume: "680 tons",
    quality: "Grade B",
    priceHistory: [2100, 2050, 2000, 1975, 1960, 1950],
  },
  {
    crop: "Soybean",
    price: 4500,
    change: 2.8,
    trend: "up",
    volume: "320 tons",
    quality: "Premium",
    priceHistory: [4200, 4250, 4300, 4350, 4425, 4500],
  },
]

export default function MandiRates({ onNavigate }: MandiRatesProps) {
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null)
  const [priceAlerts, setPriceAlerts] = useState<string[]>([])

  const togglePriceAlert = (crop: string) => {
    setPriceAlerts((prev) => (prev.includes(crop) ? prev.filter((c) => c !== crop) : [...prev, crop]))
  }

  const selectedCropData = rates.find((r) => r.crop === selectedCrop)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate("dashboard")} className="p-2 hover:bg-secondary rounded-lg transition">
            <ArrowLeft className="w-5 h-5 text-accent" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Mandi Rates</h1>
            <p className="text-xs text-muted-foreground">Nashik Market - Updated today</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Info Banner */}
        <div className="bg-secondary border border-border rounded-lg p-3">
          <p className="text-xs text-muted-foreground">
            Current market rates for major crops in Nashik Mandi. Prices updated hourly. Set price alerts to get
            notified.
          </p>
        </div>

        {/* Rates List */}
        <div className="space-y-2">
          {rates.map((rate) => (
            <div
              key={rate.crop}
              onClick={() => setSelectedCrop(selectedCrop === rate.crop ? null : rate.crop)}
              className="bg-card border border-border rounded-lg p-4 hover:border-accent transition cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{rate.crop}</h3>
                  <p className="text-xs text-muted-foreground">{rate.quality}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-accent">₹{rate.price}</p>
                  <div
                    className={`flex items-center gap-1 text-xs font-medium justify-end ${rate.trend === "up" ? "text-green-500" : "text-red-500"}`}
                  >
                    {rate.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(rate.change)}%
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Volume: {rate.volume}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    togglePriceAlert(rate.crop)
                  }}
                  className={`px-2 py-1 rounded transition ${
                    priceAlerts.includes(rate.crop)
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary hover:bg-border text-foreground"
                  }`}
                >
                  <Bell className="w-3 h-3" />
                </button>
              </div>

              {/* Expanded View */}
              {selectedCrop === rate.crop && (
                <div className="mt-3 pt-3 border-t border-border space-y-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-accent" />
                    <span className="text-xs font-medium text-foreground">7-Day Price Trend</span>
                  </div>
                  <div className="flex items-end gap-1 h-16">
                    {rate.priceHistory.map((price, idx) => {
                      const minPrice = Math.min(...rate.priceHistory)
                      const maxPrice = Math.max(...rate.priceHistory)
                      const range = maxPrice - minPrice || 1
                      const height = ((price - minPrice) / range) * 100
                      return (
                        <div
                          key={idx}
                          className="flex-1 bg-accent/30 rounded-t hover:bg-accent/50 transition"
                          style={{ height: `${Math.max(height, 10)}%` }}
                          title={`₹${price}`}
                        />
                      )
                    })}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-secondary rounded p-2">
                      <p className="text-muted-foreground">Lowest</p>
                      <p className="font-bold text-foreground">₹{Math.min(...rate.priceHistory)}</p>
                    </div>
                    <div className="bg-secondary rounded p-2">
                      <p className="text-muted-foreground">Highest</p>
                      <p className="font-bold text-foreground">₹{Math.max(...rate.priceHistory)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Selling Tips */}
        <div className="bg-secondary border border-border rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-foreground">Selling Tips</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Wheat prices are trending up - good time to sell</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Rice demand is moderate - consider waiting for better rates</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Cotton prices at 6-month high - sell now if possible</span>
            </div>
          </div>
        </div>

        {/* Price Alerts */}
        {priceAlerts.length > 0 && (
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-foreground text-sm">Active Price Alerts</h3>
            <div className="flex flex-wrap gap-2">
              {priceAlerts.map((crop) => (
                <div key={crop} className="bg-accent text-accent-foreground text-xs px-3 py-1 rounded-full font-medium">
                  {crop}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              You'll receive notifications when prices change by 5% or more
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
