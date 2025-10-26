"use client"
import { ArrowLeft, Camera, Upload, AlertCircle, X } from "lucide-react"
import { useState } from "react"
import { useModal } from "@/components/providers/modal-provider"

interface CameraCaptureProps {
  onNavigate: (screen: string) => void
  onPhotosCapture: (photos: string[]) => void
  photos?: string[]
}

export default function CameraCapture({ onNavigate, onPhotosCapture, photos: initialPhotos = [] }: CameraCaptureProps) {
  const [photos, setPhotos] = useState<string[]>(initialPhotos)
  const [cameraActive, setCameraActive] = useState(false)
  const { showModal } = useModal()

  const handleCameraClick = () => {
    showModal({
      type: "info",
      title: "Camera Guidelines",
      message:
        "📸 Position the damaged crop within the blue box\n\n✓ Ensure good natural lighting\n✓ Keep the phone steady\n✓ Include surrounding healthy crops\n✓ Take multiple angles for better analysis",
      action: "Start Capturing",
      onConfirm: () => {
        setCameraActive(true)
        setTimeout(() => {
          setCameraActive(false)
          const newPhoto = `photo-${Date.now()}`
          const updatedPhotos = [...photos, newPhoto]
          setPhotos(updatedPhotos)
          showModal({
            type: "success",
            title: "Photo Captured",
            message: `High-quality photo saved (${updatedPhotos.length}/3)`,
          })
        }, 2000)
      },
    })
  }

  const handleGalleryUpload = () => {
    showModal({
      type: "info",
      title: "Upload from Gallery",
      message: "Select high-quality photos of the damaged crop area. You can upload up to 3 photos.",
      action: "Select Photos",
      onConfirm: () => {
        const newPhotos = [`gallery-${Date.now()}-1`, `gallery-${Date.now()}-2`]
        const updatedPhotos = [...photos, ...newPhotos]
        setPhotos(updatedPhotos)
        showModal({
          type: "success",
          title: "Photos Uploaded",
          message: `${newPhotos.length} photos added successfully`,
        })
      },
    })
  }

  const handleRemovePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index)
    setPhotos(newPhotos)
    showModal({
      type: "info",
      title: "Photo Removed",
      message: "Photo has been removed from your report",
    })
  }

  const handleContinue = () => {
    if (photos.length === 0) {
      showModal({
        type: "error",
        title: "No Photos",
        message: "Please capture or upload at least one photo of the damaged crop.",
      })
      return
    }
    showModal({
      type: "success",
      title: "Photos Confirmed",
      message: `${photos.length} high-quality photo(s) ready for analysis`,
      onConfirm: () => {
        onPhotosCapture(photos)
        onNavigate("report-cause")
      },
    })
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate("report-damage")} className="p-2 hover:bg-secondary rounded-lg transition">
            <ArrowLeft className="w-5 h-5 text-accent" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Capture Photos</h1>
            <p className="text-xs text-muted-foreground">Step 2 of 5</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full transition-colors ${s <= 2 ? "bg-accent" : "bg-border"}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Camera Preview */}
        {cameraActive && (
          <div className="bg-black rounded-lg overflow-hidden relative aspect-video flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-4 border-cyan-400 rounded-lg animate-pulse" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-white text-sm font-semibold">Position crop within the box</p>
            </div>
          </div>
        )}

        {/* Camera Guidelines */}
        {!cameraActive && (
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div className="bg-secondary border border-border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-accent" />
                Photo Guidelines
              </h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex gap-2">
                  <span className="text-accent">✓</span>
                  <span>Position damaged crop within the blue box on screen</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">✓</span>
                  <span>Ensure bright natural lighting (avoid shadows)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">✓</span>
                  <span>Include surrounding healthy crops for comparison</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">✓</span>
                  <span>Take multiple angles (close-up, wide, side view)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">✓</span>
                  <span>Keep phone steady and focus clearly</span>
                </li>
              </ul>
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <p className="text-sm text-accent font-medium">
                High-quality photos help our AI provide accurate damage assessment and faster claim processing.
              </p>
            </div>
          </div>
        )}

        {/* Photo Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleCameraClick}
            disabled={cameraActive}
            className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Camera className="w-5 h-5" />
            {cameraActive ? "Capturing..." : "Open Camera"}
          </button>
          <button
            onClick={handleGalleryUpload}
            className="w-full bg-card border border-border py-3 rounded-lg font-semibold text-foreground hover:border-accent transition flex items-center justify-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Upload from Gallery
          </button>
        </div>

        {/* Captured Photos */}
        {photos.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground text-sm">Captured Photos ({photos.length})</h3>
            <div className="grid grid-cols-3 gap-2">
              {photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <div className="bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg aspect-square flex items-center justify-center border border-border">
                    <Camera className="w-6 h-6 text-accent" />
                  </div>
                  <button
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <p className="text-xs text-muted-foreground text-center mt-1">Photo {index + 1}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Continue Button */}
        {photos.length > 0 && (
          <button
            onClick={handleContinue}
            className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Continue with {photos.length} Photo{photos.length !== 1 ? "s" : ""}
          </button>
        )}
      </div>
    </div>
  )
}
