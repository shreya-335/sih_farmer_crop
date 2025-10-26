"use client"

import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"

interface HeaderProps {
  onSettingsClick: () => void
  language: string
  onLanguageChange: (lang: string) => void
}

export default function Header({ onSettingsClick, language, onLanguageChange }: HeaderProps) {
  const translations = {
    en: { title: "FarmGuard", subtitle: "Crop Damage Claims" },
    hi: { title: "फार्मगार्ड", subtitle: "फसल क्षति दावे" },
    pa: { title: "ਫਾਰਮਗਾਰਡ", subtitle: "ਫਸਲ ਨੁਕਸਾਨ ਦਾਅਵੇ" },
  }

  const t = translations[language as keyof typeof translations] || translations.en

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex-1">
          <h1 className="text-xl font-bold">{t.title}</h1>
          <p className="text-xs opacity-90">{t.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/20"
            onClick={onSettingsClick}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
