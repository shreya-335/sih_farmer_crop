"use client"

import type React from "react"
import { useState } from "react"
import {
  ArrowLeft,
  Home,
  FileText,
  ShoppingCart,
  TrendingUp,
  Download,
  Share2,
  CheckCircle2,
  AlertCircle,
  Camera,
  Loader,
} from "lucide-react"

interface ReportFlowState {
  photos: string[]
  cropType: string
  damageType: string
  affectedArea: string
  dateOfDamage: string
  description: string
  weatherData: {
    rainfall: string
    temperature: string
    windSpeed: string
  }
  satelliteData: {
    ndvi: string
    coverage: string
    damagePattern: string
  }
  aiAnalysis: {
    damageType: string
    severity: string
    confidence: string
    estimatedLoss: string
  }
  aiReport?: string
}

export default function AppPage() {
  const [currentScreen, setCurrentScreen] = useState("home")
  const [reportData, setReportData] = useState<ReportFlowState>({
    photos: ["photo-1", "photo-2"],
    cropType: "wheat",
    damageType: "hailstorm",
    affectedArea: "2.5",
    dateOfDamage: "2024-10-20",
    description: "Severe hailstorm damage across the field",
    weatherData: {
      rainfall: "45mm",
      temperature: "28-32°C",
      windSpeed: "35-40 km/h",
    },
    satelliteData: {
      ndvi: "0.42",
      coverage: "2.5 hectares",
      damagePattern: "Scattered across field",
    },
    aiAnalysis: {
      damageType: "Hailstorm",
      severity: "High (60-70% loss)",
      confidence: "95%",
      estimatedLoss: "₹1,25,000",
    },
    aiReport: `COMPREHENSIVE CROP DAMAGE ASSESSMENT REPORT

EXECUTIVE SUMMARY
This report documents the assessment of crop damage on the field located in Nashik District, Maharashtra. Based on multi-source data analysis including weather patterns, satellite imagery, and photographic evidence, the damage has been classified as severe hailstorm damage with an estimated crop loss of 60-70%.

DAMAGE ASSESSMENT DETAILS
Damage Type: Hailstorm
Severity Level: High
Confidence Score: 95%
Estimated Financial Loss: ₹1,25,000
Affected Area: 2.5 acres
Date of Damage: October 20, 2024

WEATHER ANALYSIS
The meteorological data for the region shows:
- Rainfall: 45mm recorded 2 days before damage
- Temperature Range: 28-32°C during the damage period
- Wind Speed: 35-40 km/h with gusts up to 50 km/h
- Weather Pattern: Severe thunderstorm with hail

SATELLITE IMAGERY ANALYSIS
Satellite data from NDVI (Normalized Difference Vegetation Index) analysis:
- Current NDVI Index: 0.42 (Healthy range: 0.6-0.8)
- Field Coverage: 2.5 hectares
- Damage Pattern: Scattered across field with concentrated damage zones
- Vegetation Loss: Approximately 65% reduction in vegetation index

PHOTOGRAPHIC EVIDENCE ANALYSIS
Analysis of 2 high-quality photographs:
- Damage Pattern: Consistent with hailstorm impact
- Crop Condition: Severe physical damage to crop structure
- Correlation: 100% match between satellite data and ground-level observations

CONTRIBUTING FACTORS
1. Severe weather event with hail formation
2. Timing coincided with crop growth stage
3. Field exposure without protective structures
4. Hail size and intensity exceeded crop resilience threshold

VERIFICATION STATUS
✓ All data sources align and cross-reference
✓ Weather data correlates with satellite imagery
✓ Photographic evidence confirms satellite analysis
✓ Report is eligible for insurance claim processing

RECOMMENDATIONS
1. Document all damage for insurance purposes
2. Plan crop recovery strategy for next season
3. Consider weather-resistant crop varieties
4. Implement protective measures for future seasons

This report has been verified and approved for claim processing.`,
  })

  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState({ title: "", message: "", type: "info" })
  const [gatheringProgress, setGatheringProgress] = useState({ weather: false, satellite: false, analysis: false })

  const openModal = (title: string, message: string, type = "info") => {
    setModalData({ title, message, type })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  // HOME SCREEN
  const HomeScreen = () => (
    <div className="min-h-screen bg-slate-900 pb-24">
      <div className="bg-gradient-to-b from-cyan-500/20 to-slate-900 border-b border-slate-700 p-6 space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Welcome Back!</h1>
          <p className="text-slate-400">Nashik District • Oct 24, 2024</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 space-y-1">
            <p className="text-xs text-slate-400">Active Claims</p>
            <p className="text-2xl font-bold text-cyan-400">2</p>
            <p className="text-xs text-green-400">Processing</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 space-y-1">
            <p className="text-xs text-slate-400">Approved Claims</p>
            <p className="text-2xl font-bold text-green-400">5</p>
            <p className="text-xs text-slate-400">₹2,50,000</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <button
          onClick={() => {
            openModal("Start Report", "Begin your crop damage claim process", "info")
            setTimeout(() => {
              closeModal()
              setCurrentScreen("report-damage")
            }, 1500)
          }}
          className="w-full bg-cyan-500 text-white rounded-lg p-4 space-y-2 hover:bg-cyan-600 transition text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Report Crop Loss</h2>
              <p className="text-sm opacity-90">Start a new damage claim</p>
            </div>
            <span>→</span>
          </div>
        </button>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">Claim #12345 Approved</p>
                <p className="text-xs text-slate-400">Hailstorm damage - Wheat field</p>
                <p className="text-xs text-green-400 font-medium">₹1,25,000 credited</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // REPORT DAMAGE SCREEN
  const ReportDamageScreen = () => (
    <div className="min-h-screen bg-slate-900 pb-24">
      <div className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrentScreen("home")} className="p-2 hover:bg-slate-700 rounded-lg transition">
            <ArrowLeft className="w-5 h-5 text-cyan-400" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">Report Crop Damage</h1>
            <p className="text-xs text-slate-400">Step 1 of 5</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 border-b border-slate-700 px-4 py-3">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className={`flex-1 h-1 rounded-full ${s <= 1 ? "bg-cyan-500" : "bg-slate-700"}`} />
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center space-y-4">
          <div className="w-16 h-16 bg-cyan-500/10 rounded-lg flex items-center justify-center mx-auto">
            <Camera className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">Report Crop Loss</h2>
            <p className="text-sm text-slate-400">
              Start the damage assessment process. You'll capture photos and provide details about the damage.
            </p>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-white text-sm">What You'll Need:</h3>
          <ul className="text-sm text-slate-400 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>Clear photos of damaged crop area</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>Crop type and affected area details</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>Description of damage cause</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>Date when damage occurred</span>
            </li>
          </ul>
        </div>

        <button
          onClick={() => {
            openModal("Starting Report", "Proceeding to photo capture...", "info")
            setTimeout(() => {
              closeModal()
              setCurrentScreen("camera-capture")
            }, 1500)
          }}
          className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition"
        >
          Start Report
        </button>
      </div>
    </div>
  )

  // CAMERA CAPTURE SCREEN
  const CameraCaptureScreen = () => (
    <div className="min-h-screen bg-slate-900 pb-24">
      <div className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen("report-damage")}
            className="p-2 hover:bg-slate-700 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5 text-cyan-400" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">Capture Photos</h1>
            <p className="text-xs text-slate-400">Step 2 of 5</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 border-b border-slate-700 px-4 py-3">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className={`flex-1 h-1 rounded-full ${s <= 2 ? "bg-cyan-500" : "bg-slate-700"}`} />
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-black rounded-lg overflow-hidden relative aspect-video flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 border-4 border-cyan-400 rounded-lg animate-pulse" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <p className="text-white text-sm font-semibold">Position crop within the box</p>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-white text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-400" />
            Photo Guidelines
          </h3>
          <ul className="text-sm text-slate-400 space-y-2">
            <li className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>Position damaged crop within the blue box on screen</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>Ensure bright natural lighting (avoid shadows)</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>Include surrounding healthy crops for comparison</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>Take multiple angles (close-up, wide, side view)</span>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => {
              openModal("Photo Captured", "High-quality photo saved (2/3)", "success")
              setTimeout(() => {
                closeModal()
              }, 1500)
            }}
            className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition flex items-center justify-center gap-2"
          >
            <Camera className="w-5 h-5" />
            Open Camera
          </button>
          <button
            onClick={() => {
              openModal("Photos Uploaded", "2 photos added successfully", "success")
              setTimeout(() => {
                closeModal()
              }, 1500)
            }}
            className="w-full bg-slate-800 border border-slate-700 py-3 rounded-lg font-semibold text-white hover:border-cyan-500 transition flex items-center justify-center gap-2"
          >
            <FileText className="w-5 h-5" />
            Upload from Gallery
          </button>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-white text-sm">Captured Photos (2)</h3>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 rounded-lg aspect-square flex items-center justify-center border border-slate-700"
              >
                <Camera className="w-6 h-6 text-cyan-400" />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            openModal("Photos Confirmed", "2 high-quality photo(s) ready for analysis", "success")
            setTimeout(() => {
              closeModal()
              setCurrentScreen("report-cause")
            }, 1500)
          }}
          className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition"
        >
          Continue with 2 Photos
        </button>
      </div>
    </div>
  )

  // REPORT CAUSE SCREEN
  const ReportCauseScreen = () => (
    <div className="min-h-screen bg-slate-900 pb-24">
      <div className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen("camera-capture")}
            className="p-2 hover:bg-slate-700 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5 text-cyan-400" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">Report Damage Details</h1>
            <p className="text-xs text-slate-400">Step 3 of 5</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 border-b border-slate-700 px-4 py-3">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className={`flex-1 h-1 rounded-full ${s <= 3 ? "bg-cyan-500" : "bg-slate-700"}`} />
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Crop Type *</label>
            <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-500 focus:outline-none">
              <option value="wheat">Wheat</option>
              <option value="rice">Rice</option>
              <option value="cotton">Cotton</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Damage Cause *</label>
            <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-500 focus:outline-none">
              <option value="hailstorm">Hailstorm</option>
              <option value="flood">Flood/Waterlogging</option>
              <option value="drought">Drought</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Affected Area *</label>
            <div className="flex gap-2">
              <input
                type="number"
                defaultValue="2.5"
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
              />
              <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium">
                acres
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Date of Damage *</label>
            <input
              type="date"
              defaultValue="2024-10-20"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Additional Details</label>
            <textarea
              defaultValue="Severe hailstorm damage across the field"
              rows={4}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-500 focus:outline-none resize-none"
            />
          </div>
        </div>

        <button
          onClick={() => {
            openModal("Details Saved", "Crop: Wheat\nDamage: Hailstorm\nArea: 2.5 acres", "success")
            setTimeout(() => {
              closeModal()
              setCurrentScreen("data-gathering")
              setTimeout(() => {
                setGatheringProgress({ weather: true, satellite: true, analysis: true })
              }, 500)
            }, 1500)
          }}
          className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition"
        >
          Continue to Analysis
        </button>
      </div>
    </div>
  )

  // DATA GATHERING SCREEN
  const DataGatheringScreen = () => (
    <div className="min-h-screen bg-slate-900 pb-24">
      <div className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="p-2">
            <ArrowLeft className="w-5 h-5 text-slate-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Gathering Evidence</h1>
            <p className="text-xs text-slate-400">Step 4 of 5</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 border-b border-slate-700 px-4 py-3">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className={`flex-1 h-1 rounded-full ${s <= 4 ? "bg-cyan-500" : "bg-slate-700"}`} />
          ))}
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center space-y-4">
          <div className="w-20 h-20 bg-cyan-500/10 rounded-lg flex items-center justify-center mx-auto">
            {gatheringProgress.analysis ? (
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            ) : (
              <Loader className="w-12 h-12 text-cyan-500 animate-spin" />
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">Processing Your Report</h2>
            <p className="text-sm text-slate-400">
              Gathering data from multiple sources to create a comprehensive damage assessment...
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Weather Data */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${gatheringProgress.weather ? "bg-green-500" : "bg-cyan-500 animate-pulse"}`}
                >
                  {gatheringProgress.weather && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
                <div>
                  <p className="font-medium text-white">Gathering Weather Data</p>
                  <p className="text-xs text-slate-400">Historical patterns, rainfall, temperature</p>
                </div>
              </div>
              {gatheringProgress.weather && <span className="text-xs text-green-400 font-semibold">Done</span>}
            </div>
            {gatheringProgress.weather && (
              <div className="ml-8 text-xs text-slate-400 space-y-1">
                <p>• Rainfall: 45mm (2 days before damage)</p>
                <p>• Temperature: 28-32°C</p>
                <p>• Wind Speed: 35-40 km/h</p>
              </div>
            )}
          </div>

          {/* Satellite Imagery */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${gatheringProgress.satellite ? "bg-green-500" : "bg-slate-700"}`}
                >
                  {gatheringProgress.satellite && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
                <div>
                  <p className={`font-medium ${gatheringProgress.satellite ? "text-white" : "text-slate-400"}`}>
                    Gathering Satellite Images
                  </p>
                  <p className="text-xs text-slate-400">NDVI, vegetation indices, field mapping</p>
                </div>
              </div>
              {gatheringProgress.satellite && <span className="text-xs text-green-400 font-semibold">Done</span>}
            </div>
            {gatheringProgress.satellite && (
              <div className="ml-8 text-xs text-slate-400 space-y-1">
                <p>• NDVI Index: 0.42 (Healthy: 0.6-0.8)</p>
                <p>• Field Coverage: 2.5 hectares</p>
                <p>• Damage Pattern: Scattered across field</p>
              </div>
            )}
          </div>

          {/* AI Analysis */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${gatheringProgress.analysis ? "bg-green-500" : "bg-slate-700"}`}
                >
                  {gatheringProgress.analysis && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
                <div>
                  <p className={`font-medium ${gatheringProgress.analysis ? "text-white" : "text-slate-400"}`}>
                    AI Damage Analysis
                  </p>
                  <p className="text-xs text-slate-400">Photo analysis, damage assessment, correlation</p>
                </div>
              </div>
              {gatheringProgress.analysis && <span className="text-xs text-green-400 font-semibold">Done</span>}
            </div>
            {gatheringProgress.analysis && (
              <div className="ml-8 text-xs text-slate-400 space-y-1">
                <p>• Damage Type: Hailstorm (95% confidence)</p>
                <p>• Severity: High (60-70% crop loss)</p>
                <p>• Correlation: Weather + Satellite + Photos match</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4 text-center">
          <p className="text-sm text-cyan-400 font-medium">
            {gatheringProgress.analysis
              ? "✓ All data gathered successfully!"
              : "Processing... This may take a few moments"}
          </p>
        </div>
      </div>

      {gatheringProgress.analysis && (
        <div className="fixed bottom-24 left-4 right-4">
          <button
            onClick={() => {
              openModal("Report Ready", "Your comprehensive damage report is ready for review", "success")
              setTimeout(() => {
                closeModal()
                setCurrentScreen("comprehensive-report")
              }, 1500)
            }}
            className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition"
          >
            View Report
          </button>
        </div>
      )}
    </div>
  )

  // COMPREHENSIVE REPORT SCREEN
  const ComprehensiveReportScreen = () => (
    <div className="min-h-screen bg-slate-900 pb-24">
      <div className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen("data-gathering")}
            className="p-2 hover:bg-slate-700 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5 text-cyan-400" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">Damage Report</h1>
            <p className="text-xs text-slate-400">Step 5 of 5</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 border-b border-slate-700 px-4 py-3">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex-1 h-1 rounded-full bg-cyan-500" />
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <p className="font-semibold text-green-400">Report Ready for Submission</p>
          </div>
          <p className="text-sm text-green-400/80">All data has been verified and cross-referenced</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 space-y-4">
          <h2 className="font-semibold text-white text-lg">Report Summary</h2>

          <div className="space-y-2 pb-4 border-b border-slate-700">
            <h3 className="text-sm font-medium text-slate-400">Farmer Information</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-slate-400">Name</p>
                <p className="text-white font-medium">Rajesh Patel</p>
              </div>
              <div>
                <p className="text-slate-400">Phone</p>
                <p className="text-white font-medium">+91 98765 43210</p>
              </div>
              <div>
                <p className="text-slate-400">District</p>
                <p className="text-white font-medium">Nashik</p>
              </div>
              <div>
                <p className="text-slate-400">State</p>
                <p className="text-white font-medium">Maharashtra</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 pb-4 border-b border-slate-700">
            <h3 className="text-sm font-medium text-slate-400">Crop Information</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-slate-400">Crop Type</p>
                <p className="text-white font-medium">{reportData.cropType}</p>
              </div>
              <div>
                <p className="text-slate-400">Affected Area</p>
                <p className="text-white font-medium">{reportData.affectedArea} acres</p>
              </div>
              <div>
                <p className="text-slate-400">Damage Cause</p>
                <p className="text-white font-medium">{reportData.damageType}</p>
              </div>
              <div>
                <p className="text-slate-400">Date of Damage</p>
                <p className="text-white font-medium">{reportData.dateOfDamage}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 pb-4 border-b border-slate-700">
            <h3 className="text-sm font-medium text-slate-400">Damage Assessment</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Damage Severity</span>
                <span className="text-white font-medium">{reportData.aiAnalysis.severity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">AI Confidence</span>
                <span className="text-green-400 font-medium">{reportData.aiAnalysis.confidence}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Loss</span>
                <span className="text-white font-medium">{reportData.aiAnalysis.estimatedLoss}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pb-4 border-b border-slate-700">
            <h3 className="text-sm font-medium text-slate-400">Evidence Data</h3>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-slate-400 mb-1">Weather Conditions</p>
                <p className="text-white">
                  Rainfall: {reportData.weatherData.rainfall} | Temp: {reportData.weatherData.temperature} | Wind:{" "}
                  {reportData.weatherData.windSpeed}
                </p>
              </div>
              <div>
                <p className="text-slate-400 mb-1">Satellite Analysis</p>
                <p className="text-white">
                  NDVI: {reportData.satelliteData.ndvi} (Healthy: 0.6-0.8) | Coverage:{" "}
                  {reportData.satelliteData.coverage}
                </p>
              </div>
              <div>
                <p className="text-slate-400 mb-1">Photo Analysis</p>
                <p className="text-white">
                  {reportData.photos.length} high-quality photos analyzed | Damage pattern confirmed
                </p>
              </div>
            </div>
          </div>

          {reportData.aiReport && (
            <div className="space-y-2 pb-4 border-b border-slate-700">
              <h3 className="text-sm font-medium text-slate-400">AI-Generated Assessment Report</h3>
              <div className="bg-slate-900 rounded-lg p-3 text-sm text-slate-300 max-h-96 overflow-y-auto">
                <div className="whitespace-pre-wrap text-xs leading-relaxed font-mono">{reportData.aiReport}</div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <button
            onClick={() => {
              openModal("Report Downloaded", "Your comprehensive damage report has been downloaded as PDF", "success")
              setTimeout(() => closeModal(), 1500)
            }}
            className="w-full bg-slate-800 border border-slate-700 py-3 rounded-lg font-semibold text-white hover:border-cyan-500 transition flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Report
          </button>
          <button
            onClick={() => {
              openModal("Report Shared", "Report shared with insurance company and government authorities", "success")
              setTimeout(() => closeModal(), 1500)
            }}
            className="w-full bg-slate-800 border border-slate-700 py-3 rounded-lg font-semibold text-white hover:border-cyan-500 transition flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share Report
          </button>
          <button
            onClick={() => {
              openModal("Submit Report?", "Are you sure you want to submit this report?", "confirmation")
              setTimeout(() => {
                closeModal()
                openModal(
                  "Report Submitted",
                  "Your damage report has been successfully submitted for processing",
                  "success",
                )
                setTimeout(() => {
                  closeModal()
                  setCurrentScreen("home")
                }, 1500)
              }, 1500)
            }}
            className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            Submit Report
          </button>
        </div>
      </div>
    </div>
  )

  // MODAL COMPONENT
  const Modal = () =>
    showModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 max-w-sm w-full space-y-4">
          <h2 className="text-lg font-bold text-white">{modalData.title}</h2>
          <p className="text-slate-400 whitespace-pre-line">{modalData.message}</p>
          <button
            onClick={closeModal}
            className="w-full bg-cyan-500 text-white py-2 rounded-lg font-semibold hover:bg-cyan-600 transition"
          >
            OK
          </button>
        </div>
      </div>
    )

  // BOTTOM NAVIGATION
  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 px-4 py-3 flex justify-around">
      <button
        onClick={() => setCurrentScreen("home")}
        className={`flex flex-col items-center gap-1 ${currentScreen === "home" ? "text-cyan-400" : "text-slate-400"}`}
      >
        <Home className="w-5 h-5" />
        <span className="text-xs">Home</span>
      </button>
      <button
        onClick={() => setCurrentScreen("report-damage")}
        className={`flex flex-col items-center gap-1 ${["report-damage", "camera-capture", "report-cause", "data-gathering", "comprehensive-report"].includes(currentScreen) ? "text-cyan-400" : "text-slate-400"}`}
      >
        <FileText className="w-5 h-5" />
        <span className="text-xs">Report</span>
      </button>
      <button
        onClick={() => setCurrentScreen("marketplace")}
        className={`flex flex-col items-center gap-1 ${currentScreen === "marketplace" ? "text-cyan-400" : "text-slate-400"}`}
      >
        <ShoppingCart className="w-5 h-5" />
        <span className="text-xs">Market</span>
      </button>
      <button
        onClick={() => setCurrentScreen("mandi-rates")}
        className={`flex flex-col items-center gap-1 ${currentScreen === "mandi-rates" ? "text-cyan-400" : "text-slate-400"}`}
      >
        <TrendingUp className="w-5 h-5" />
        <span className="text-xs">Rates</span>
      </button>
    </div>
  )

  // MARKETPLACE SCREEN
  const MarketplaceScreen = () => (
    <div className="min-h-screen bg-slate-900 pb-24">
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <h1 className="text-xl font-bold text-white">Marketplace</h1>
        <p className="text-xs text-slate-400">Buy agricultural supplies</p>
      </div>
      <div className="p-4 space-y-3">
        {[
          { name: "Flood-Resistant Wheat Seeds", price: "₹450/kg", discount: "20% off" },
          { name: "Fungicide Treatment", price: "₹350/liter", discount: "15% off" },
          { name: "Drip Irrigation Kit", price: "₹2,500", discount: "Free delivery" },
        ].map((item, i) => (
          <div key={i} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-white">{item.name}</h3>
              <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">{item.discount}</span>
            </div>
            <p className="text-cyan-400 font-bold">{item.price}</p>
            <button className="mt-3 w-full bg-cyan-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-cyan-600 transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  // MANDI RATES SCREEN
  const MandiRatesScreen = () => (
    <div className="min-h-screen bg-slate-900 pb-24">
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <h1 className="text-xl font-bold text-white">Mandi Rates</h1>
        <p className="text-xs text-slate-400">Current market prices</p>
      </div>
      <div className="p-4 space-y-3">
        {[
          { crop: "Wheat", price: "₹2,450", change: "↑5.2%", color: "green" },
          { crop: "Rice", price: "₹3,200", change: "↓2.1%", color: "red" },
          { crop: "Cotton", price: "₹5,800", change: "↑3.5%", color: "green" },
          { crop: "Sugarcane", price: "₹320/quintal", change: "→0%", color: "gray" },
        ].map((item, i) => (
          <div key={i} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-white">{item.crop}</h3>
                <p className="text-sm text-slate-400">Updated today</p>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">{item.price}</p>
                <p
                  className={`text-sm ${item.color === "green" ? "text-green-400" : item.color === "red" ? "text-red-400" : "text-slate-400"}`}
                >
                  {item.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // RENDER SCREENS
  const screens: Record<string, React.ReactNode> = {
    home: <HomeScreen />,
    "report-damage": <ReportDamageScreen />,
    "camera-capture": <CameraCaptureScreen />,
    "report-cause": <ReportCauseScreen />,
    "data-gathering": <DataGatheringScreen />,
    "comprehensive-report": <ComprehensiveReportScreen />,
    marketplace: <MarketplaceScreen />,
    "mandi-rates": <MandiRatesScreen />,
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {screens[currentScreen] || screens["home"]}
      <BottomNav />
      <Modal />
    </div>
  )
}
