"use client"

import type React from "react"
import { ArrowLeft, AlertCircle } from "lucide-react"
import { useState } from "react"
import { useModal } from "@/components/providers/modal-provider"

interface ReportCauseProps {
  onNavigate: (screen: string) => void
  onCauseSubmit: (
    cropType: string,
    damageType: string,
    affectedArea: string,
    dateOfDamage: string,
    description: string,
  ) => void
  initialData?: {
    cropType: string
    damageType: string
    affectedArea: string
    dateOfDamage: string
    description: string
  }
}

export default function ReportCause({ onNavigate, onCauseSubmit, initialData }: ReportCauseProps) {
  const [formData, setFormData] = useState({
    cropType: initialData?.cropType || "wheat",
    damageType: initialData?.damageType || "hailstorm",
    affectedArea: initialData?.affectedArea || "2.5",
    dateOfDamage: initialData?.dateOfDamage || "2024-10-20",
    description: initialData?.description || "Severe hailstorm damage across the field",
  })
  const { showModal } = useModal()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleContinue = () => {
    if (!formData.cropType || !formData.damageType || !formData.affectedArea || !formData.dateOfDamage) {
      showModal({
        type: "error",
        title: "Missing Information",
        message: "Please fill in all required fields before continuing.",
      })
      return
    }

    showModal({
      type: "success",
      title: "Details Saved",
      message: `Crop: ${formData.cropType}\nDamage: ${formData.damageType}\nArea: ${formData.affectedArea} acres`,
      onConfirm: () => {
        onCauseSubmit(
          formData.cropType,
          formData.damageType,
          formData.affectedArea,
          formData.dateOfDamage,
          formData.description,
        )
        onNavigate("data-gathering")
      },
    })
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate("camera-capture")} className="p-2 hover:bg-secondary rounded-lg transition">
            <ArrowLeft className="w-5 h-5 text-accent" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Report Damage Details</h1>
            <p className="text-xs text-muted-foreground">Step 3 of 5</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full transition-colors ${s <= 3 ? "bg-accent" : "bg-border"}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        <div className="space-y-4">
          {/* Crop Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Crop Type <span className="text-red-500">*</span>
            </label>
            <select
              name="cropType"
              value={formData.cropType}
              onChange={handleInputChange}
              className="w-full bg-card border border-border rounded-lg px-3 py-2 text-foreground focus:border-accent focus:outline-none"
            >
              <option value="">Select crop type...</option>
              <option value="wheat">Wheat</option>
              <option value="rice">Rice</option>
              <option value="cotton">Cotton</option>
              <option value="sugarcane">Sugarcane</option>
              <option value="maize">Maize</option>
              <option value="pulses">Pulses</option>
              <option value="oilseeds">Oilseeds</option>
            </select>
          </div>

          {/* Damage Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Damage Cause <span className="text-red-500">*</span>
            </label>
            <select
              name="damageType"
              value={formData.damageType}
              onChange={handleInputChange}
              className="w-full bg-card border border-border rounded-lg px-3 py-2 text-foreground focus:border-accent focus:outline-none"
            >
              <option value="">Select damage cause...</option>
              <option value="hailstorm">Hailstorm</option>
              <option value="flood">Flood/Waterlogging</option>
              <option value="drought">Drought</option>
              <option value="pest">Pest Infestation</option>
              <option value="disease">Disease</option>
              <option value="frost">Frost/Cold Wave</option>
              <option value="wind">Strong Winds</option>
              <option value="fire">Fire</option>
            </select>
          </div>

          {/* Affected Area */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Affected Area <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                name="affectedArea"
                value={formData.affectedArea}
                onChange={handleInputChange}
                placeholder="Enter area"
                className="flex-1 bg-card border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
              />
              <div className="bg-card border border-border rounded-lg px-3 py-2 text-foreground font-medium">acres</div>
            </div>
          </div>

          {/* Date of Damage */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Date of Damage <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dateOfDamage"
              value={formData.dateOfDamage}
              onChange={handleInputChange}
              className="w-full bg-card border border-border rounded-lg px-3 py-2 text-foreground focus:border-accent focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Additional Details</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the damage in detail (optional)..."
              rows={4}
              className="w-full bg-card border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none resize-none"
            />
          </div>

          {/* Warning */}
          <div className="bg-secondary border border-border rounded-lg p-3 space-y-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                Ensure all information is accurate. False claims may result in penalties and legal action.
              </p>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Continue to Analysis
        </button>
      </div>
    </div>
  )
}
