"use client"

import { Button } from "@/components/ui/button"
import { Home, FileText, ShoppingCart, TrendingUp } from "lucide-react"

interface BottomNavProps {
  currentScreen: string
  onNavigate: (screen: string) => void
}

export default function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "report-damage", label: "Report", icon: FileText },
    { id: "marketplace", label: "Market", icon: ShoppingCart },
    { id: "mandi-rates", label: "Rates", icon: TrendingUp },
  ]

  const getActiveState = (itemId: string) => {
    if (itemId === "report-damage") {
      return ["report-damage", "camera-capture", "report-cause", "data-gathering", "comprehensive-report"].includes(
        currentScreen,
      )
    }
    return currentScreen === itemId
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = getActiveState(item.id)
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`flex flex-col items-center gap-1 h-full rounded-none flex-1 ${
                isActive ? "bg-accent/10 text-accent" : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => {
                if (currentScreen === item.id) {
                  onNavigate(item.id)
                } else {
                  onNavigate(item.id)
                }
              }}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          )
        })}
      </div>
    </nav>
  )
}
