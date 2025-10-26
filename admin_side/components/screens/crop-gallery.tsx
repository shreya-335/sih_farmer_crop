"use client"

import { Plus, Trash2, Calendar } from "lucide-react"
import { useState } from "react"

interface CropGalleryProps {
  theme: "light" | "dark"
  language: "en" | "hi" | "pa"
}

interface CropPhoto {
  id: string
  date: string
  cropType: string
  notes: string
  image: string
}

export default function CropGalleryScreen({ theme, language }: CropGalleryProps) {
  const translations = {
    en: {
      title: "Crop Gallery",
      subtitle: "Track your crop growth and progress",
      addPhoto: "Add Photo",
      noPhotos: "No photos yet. Start documenting your crop growth!",
      wheat: "Wheat",
      rice: "Rice",
      corn: "Corn",
      cotton: "Cotton",
      sugarcane: "Sugarcane",
      delete: "Delete",
      viewDetails: "View Details",
      date: "Date",
      cropType: "Crop Type",
      notes: "Notes",
    },
    hi: {
      title: "फसल गैलरी",
      subtitle: "अपनी फसल की वृद्धि और प्रगति को ट्रैक करें",
      addPhoto: "फोटो जोड़ें",
      noPhotos: "अभी कोई फोटो नहीं। अपनी फसल की वृद्धि को दस्तावेज़ करना शुरू करें!",
      wheat: "गेहूं",
      rice: "चावल",
      corn: "मकई",
      cotton: "कपास",
      sugarcane: "गन्ना",
      delete: "हटाएं",
      viewDetails: "विवरण देखें",
      date: "तारीख",
      cropType: "फसल का प्रकार",
      notes: "नोट्स",
    },
    pa: {
      title: "ਫਸਲ ਗੈਲਰੀ",
      subtitle: "ਆਪਣੀ ਫਸਲ ਦੀ ਵਿਕਾਸ ਅਤੇ ਪ੍ਰਗਤੀ ਨੂੰ ਟ੍ਰੈਕ ਕਰੋ",
      addPhoto: "ਫੋਟੋ ਜੋੜੋ",
      noPhotos: "ਅਜੇ ਕੋਈ ਫੋਟੋ ਨਹੀਂ। ਆਪਣੀ ਫਸਲ ਦੀ ਵਿਕਾਸ ਨੂੰ ਦਸਤਾਵੇਜ਼ ਕਰਨਾ ਸ਼ੁਰੂ ਕਰੋ!",
      wheat: "ਕਣਕ",
      rice: "ਚਾਵਲ",
      corn: "ਮੱਕੀ",
      cotton: "ਕਪਾਸ",
      sugarcane: "ਗੰਨਾ",
      delete: "ਹਟਾਓ",
      viewDetails: "ਵੇਰਵੇ ਦੇਖੋ",
      date: "ਤਾਰੀਖ",
      cropType: "ਫਸਲ ਦੀ ਕਿਸਮ",
      notes: "ਨੋਟਸ",
    },
  }

  const t = translations[language]

  // Dummy crop photos with vector illustrations
  const [photos, setPhotos] = useState<CropPhoto[]>([
    {
      id: "1",
      date: "2024-10-15",
      cropType: "Wheat",
      notes: "Early growth stage, healthy green shoots",
      image: "🌾",
    },
    {
      id: "2",
      date: "2024-10-22",
      cropType: "Rice",
      notes: "Mid-season development, good water level",
      image: "🌾",
    },
    {
      id: "3",
      date: "2024-10-28",
      cropType: "Cotton",
      notes: "Flowering stage, white blooms appearing",
      image: "🌾",
    },
    {
      id: "4",
      date: "2024-11-05",
      cropType: "Corn",
      notes: "Mature stage, ready for harvest",
      image: "🌾",
    },
    {
      id: "5",
      date: "2024-11-10",
      cropType: "Sugarcane",
      notes: "Tall growth, excellent health",
      image: "🌾",
    },
    {
      id: "6",
      date: "2024-11-15",
      cropType: "Wheat",
      notes: "Golden color, approaching harvest",
      image: "🌾",
    },
  ])

  const deletePhoto = (id: string) => {
    setPhotos(photos.filter((photo) => photo.id !== id))
  }

  return (
    <div className={`min-h-screen pb-24 ${theme === "dark" ? "bg-slate-900" : "bg-white"}`}>
      {/* Header */}
      <div
        className={`sticky top-0 z-40 ${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"} border-b px-4 py-4`}
      >
        <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{t.title}</h1>
        <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t.subtitle}</p>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Add Photo Button */}
        <button
          className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition mb-6 ${theme === "dark" ? "bg-cyan-500 hover:bg-cyan-600 text-white" : "bg-cyan-500 hover:bg-cyan-600 text-white"}`}
        >
          <Plus className="w-5 h-5" />
          {t.addPhoto}
        </button>

        {/* Photos Grid */}
        {photos.length === 0 ? (
          <div className={`text-center py-12 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
            <p className="text-lg">{t.noPhotos}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className={`rounded-lg overflow-hidden ${theme === "dark" ? "bg-slate-800 border border-slate-700" : "bg-slate-50 border border-slate-300"}`}
              >
                {/* Image Container */}
                <div
                  className={`w-full aspect-square flex items-center justify-center text-6xl ${theme === "dark" ? "bg-gradient-to-br from-slate-700 to-slate-800" : "bg-gradient-to-br from-green-100 to-emerald-100"}`}
                >
                  {photo.image}
                </div>

                {/* Photo Info */}
                <div className="p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className={`w-4 h-4 ${theme === "dark" ? "text-cyan-400" : "text-cyan-600"}`} />
                    <span className={`text-xs ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      {photo.date}
                    </span>
                  </div>
                  <p className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {photo.cropType}
                  </p>
                  <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"} line-clamp-2`}>
                    {photo.notes}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <button
                      className={`flex-1 py-2 rounded text-xs font-semibold transition ${theme === "dark" ? "bg-slate-700 hover:bg-slate-600 text-slate-300" : "bg-slate-200 hover:bg-slate-300 text-slate-700"}`}
                    >
                      {t.viewDetails}
                    </button>
                    <button
                      onClick={() => deletePhoto(photo.id)}
                      className={`py-2 px-3 rounded text-xs font-semibold transition ${theme === "dark" ? "bg-red-500/20 hover:bg-red-500/30 text-red-400" : "bg-red-100 hover:bg-red-200 text-red-600"}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
