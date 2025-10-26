"use client"

import { ChevronRight } from "lucide-react"

interface OnboardingIntroProps {
  onNext: () => void
  theme: "light" | "dark"
  language: "en" | "hi" | "pa"
}

export default function OnboardingIntroScreen({ onNext, theme, language }: OnboardingIntroProps) {
  const translations = {
    en: {
      title: "Welcome to FarmGuard",
      subtitle: "Your Crop Protection Partner",
      description:
        "FarmGuard helps you document crop damage, file insurance claims, and track your farm's progress with ease.",
      features: [
        "Document crop damage with photos and AI analysis",
        "File insurance claims quickly and securely",
        "Track your crop growth with our gallery",
        "Access real-time market rates and weather data",
      ],
      next: "Next",
    },
    hi: {
      title: "FarmGuard में आपका स्वागत है",
      subtitle: "आपका फसल सुरक्षा साथी",
      description:
        "FarmGuard आपको फसल की क्षति को दस्तावेज़ करने, बीमा दावे दाखिल करने और अपने खेत की प्रगति को ट्रैक करने में मदद करता है।",
      features: [
        "फोटो और AI विश्लेषण के साथ फसल की क्षति को दस्तावेज़ करें",
        "बीमा दावे जल्दी और सुरक्षित रूप से दाखिल करें",
        "हमारी गैलरी के साथ अपनी फसल की वृद्धि को ट्रैक करें",
        "रीयल-टाइम बाजार दरें और मौसम डेटा तक पहुंचें",
      ],
      next: "अगला",
    },
    pa: {
      title: "FarmGuard ਵਿੱਚ ਸਵਾਗਤ ਹੈ",
      subtitle: "ਤੁਹਾਡਾ ਫਸਲ ਸੁਰੱਖਿਆ ਸਾਥੀ",
      description:
        "FarmGuard ਤੁਹਾਨੂੰ ਫਸਲ ਦੀ ਨੁਕਸਾਨ ਨੂੰ ਦਸਤਾਵੇਜ਼ ਕਰਨ, ਬੀਮਾ ਦਾਅਵੇ ਦਾਖਲ ਕਰਨ ਅਤੇ ਆਪਣੇ ਖੇਤ ਦੀ ਪ੍ਰਗਤੀ ਨੂੰ ਟ੍ਰੈਕ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।",
      features: [
        "ਫੋਟੋ ਅਤੇ AI ਵਿਸ਼ਲੇਸ਼ਣ ਦੇ ਨਾਲ ਫਸਲ ਦੀ ਨੁਕਸਾਨ ਨੂੰ ਦਸਤਾਵੇਜ਼ ਕਰੋ",
        "ਬੀਮਾ ਦਾਅਵੇ ਜਲਦੀ ਅਤੇ ਸੁਰੱਖਿਤ ਤਰੀਕੇ ਨਾਲ ਦਾਖਲ ਕਰੋ",
        "ਸਾਡੀ ਗੈਲਰੀ ਦੇ ਨਾਲ ਆਪਣੀ ਫਸਲ ਦੀ ਵਿਕਾਸ ਨੂੰ ਟ੍ਰੈਕ ਕਰੋ",
        "ਰੀਅਲ-ਟਾਈਮ ਮਾਰਕੀਟ ਦਰਾਂ ਅਤੇ ਮੌਸਮ ਡੇਟਾ ਤੱਕ ਪਹੁੰਚ ਪ੍ਰਾਪਤ ਕਰੋ",
      ],
      next: "ਅਗਲਾ",
    },
  }

  const t = translations[language]

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-gradient-to-b from-slate-900 to-slate-800" : "bg-gradient-to-b from-blue-50 to-white"} flex flex-col items-center justify-center px-4 py-8`}
    >
      <div className="max-w-md w-full space-y-8">
        {/* Logo/Icon */}
        <div className="flex justify-center">
          <div
            className={`w-24 h-24 rounded-full ${theme === "dark" ? "bg-cyan-500/20" : "bg-cyan-100"} flex items-center justify-center`}
          >
            <div
              className={`w-16 h-16 rounded-full ${theme === "dark" ? "bg-cyan-500" : "bg-cyan-500"} flex items-center justify-center text-white text-2xl font-bold`}
            >
              FG
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{t.title}</h1>
          <p className={`text-lg ${theme === "dark" ? "text-cyan-400" : "text-cyan-600"}`}>{t.subtitle}</p>
        </div>

        {/* Description */}
        <p className={`text-center ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>{t.description}</p>

        {/* Features */}
        <div className="space-y-3">
          {t.features.map((feature, index) => (
            <div key={index} className="flex gap-3">
              <div
                className={`w-6 h-6 rounded-full ${theme === "dark" ? "bg-cyan-500/20" : "bg-cyan-100"} flex items-center justify-center flex-shrink-0 mt-0.5`}
              >
                <div className={`w-2 h-2 rounded-full ${theme === "dark" ? "bg-cyan-400" : "bg-cyan-600"}`} />
              </div>
              <p className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>{feature}</p>
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${theme === "dark" ? "bg-cyan-500 hover:bg-cyan-600 text-white" : "bg-cyan-500 hover:bg-cyan-600 text-white"}`}
        >
          {t.next}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
