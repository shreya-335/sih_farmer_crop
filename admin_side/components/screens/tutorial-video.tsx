"use client"

import { ChevronRight, Play } from "lucide-react"

interface TutorialVideoProps {
  onNext: () => void
  theme: "light" | "dark"
  language: "en" | "hi" | "pa"
}

export default function TutorialVideoScreen({ onNext, theme, language }: TutorialVideoProps) {
  const translations = {
    en: {
      title: "How to Use FarmGuard",
      subtitle: "Watch this quick tutorial to get started",
      videoPlaceholder: "Video Player",
      videoPath: "Replace this with your video path: /videos/tutorial.mp4",
      description:
        "This tutorial will guide you through the main features of FarmGuard and how to file a crop damage claim.",
      next: "Go to Home",
      skip: "Skip",
    },
    hi: {
      title: "FarmGuard का उपयोग कैसे करें",
      subtitle: "शुरुआत करने के लिए इस त्वरित ट्यूटोरियल को देखें",
      videoPlaceholder: "वीडियो प्लेयर",
      videoPath: "इसे अपने वीडियो पथ से बदलें: /videos/tutorial.mp4",
      description: "यह ट्यूटोरियल आपको FarmGuard की मुख्य विशेषताओं और फसल क्षति दावे दाखिल करने के तरीके के बारे में बताएगा।",
      next: "होम पर जाएं",
      skip: "छोड़ें",
    },
    pa: {
      title: "FarmGuard ਦੀ ਵਰਤੋਂ ਕਿਵੇਂ ਕਰੀਏ",
      subtitle: "ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਇਸ ਤੇਜ਼ ਟਿਊਟੋਰਿਅਲ ਨੂੰ ਦੇਖੋ",
      videoPlaceholder: "ਵੀਡੀਓ ਪਲੇਅਰ",
      videoPath: "ਇਸ ਨੂੰ ਆਪਣੇ ਵੀਡੀਓ ਪਾਥ ਨਾਲ ਬਦਲੋ: /videos/tutorial.mp4",
      description: "ਇਹ ਟਿਊਟੋਰਿਅਲ ਤੁਹਾਨੂੰ FarmGuard ਦੀਆਂ ਮੁੱਖ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਅਤੇ ਫਸਲ ਨੁਕਸਾਨ ਦਾਅਵੇ ਦਾਖਲ ਕਰਨ ਦੇ ਤਰੀਕੇ ਬਾਰੇ ਦੱਸੇਗਾ।",
      next: "ਹੋਮ ਤੇ ਜਾਓ",
      skip: "ਛੱਡੋ",
    },
  }

  const t = translations[language]

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-slate-900" : "bg-white"} flex flex-col items-center justify-center px-4 py-8`}
    >
      <div className="max-w-2xl w-full space-y-6">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{t.title}</h1>
          <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t.subtitle}</p>
        </div>

        {/* Video Player */}
        <div
          className={`w-full aspect-video rounded-lg ${theme === "dark" ? "bg-slate-800" : "bg-slate-100"} flex items-center justify-center border-2 ${theme === "dark" ? "border-slate-700" : "border-slate-300"}`}
        >
          <div className="flex flex-col items-center gap-4">
            <div
              className={`w-16 h-16 rounded-full ${theme === "dark" ? "bg-cyan-500/20" : "bg-cyan-100"} flex items-center justify-center`}
            >
              <Play className={`w-8 h-8 ${theme === "dark" ? "text-cyan-400" : "text-cyan-600"}`} />
            </div>
            <div className="text-center">
              <p className={`font-semibold ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                {t.videoPlaceholder}
              </p>
              <p className={`text-xs mt-2 ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>{t.videoPath}</p>
            </div>
          </div>
        </div>

        {/* Video Embed (Uncomment and replace VIDEO_PATH with your actual video path) */}
        {/* 
        <video 
          width="100%" 
          height="auto" 
          controls 
          className="rounded-lg"
          src="/videos/tutorial.mp4"
        >
          Your browser does not support the video tag.
        </video>
        */}

        {/* Description */}
        <p className={`text-center ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>{t.description}</p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onNext}
            variant="outline"
            className={`flex-1 py-3 rounded-lg font-semibold transition ${theme === "dark" ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700" : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300"}`}
          >
            {t.skip}
          </button>
          <button
            onClick={onNext}
            className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${theme === "dark" ? "bg-cyan-500 hover:bg-cyan-600 text-white" : "bg-cyan-500 hover:bg-cyan-600 text-white"}`}
          >
            {t.next}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Instructions for adding video */}
        <div
          className={`p-4 rounded-lg ${theme === "dark" ? "bg-slate-800 border border-slate-700" : "bg-slate-50 border border-slate-300"}`}
        >
          <p className={`text-xs font-semibold ${theme === "dark" ? "text-cyan-400" : "text-cyan-600"} mb-2`}>
            HOW TO ADD YOUR VIDEO:
          </p>
          <ol className={`text-xs space-y-1 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
            <li>1. Place your video file in the public/videos folder (e.g., public/videos/tutorial.mp4)</li>
            <li>2. Uncomment the video tag in this component (around line 70)</li>
            <li>3. Replace the src path with your video path</li>
            <li>4. The video will now play in the tutorial screen</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
