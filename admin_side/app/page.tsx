"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Home,
  FileText,
  ShoppingCart,
  Download,
  Share2,
  CheckCircle2,
  AlertCircle,
  Camera,
  Loader,
  User,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Shield,
  Settings,
} from "lucide-react"

import LedgerScreen from "@/components/screens/ledger"
import MarketplaceRatesScreen from "@/components/screens/marketplace-rates"
import InsuranceScreen from "@/components/screens/insurance"
import Chatbot from "@/components/screens/chatbot"

interface ReportFlowState {
  photos: string[]
  cropType: string
  damageType: string
  affectedArea: string
  dateOfDamage: string
  description: string
  latitude: string
  longitude: string
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

const translations = {
  en: {
    home: "Home",
    report: "Report",
    market: "Market",
    rates: "Rates",
    welcomeBack: "Welcome Back!",
    activeClaims: "Active Claims",
    approvedClaims: "Approved Claims",
    viewDetails: "View Details",
    reportCropLoss: "Report Crop Loss",
    startNewClaim: "Start a new damage claim",
    scheduledVisits: "Scheduled Visits",
    upcomingInspections: "Upcoming field inspections",
    recentActivity: "Recent Activity",
    claimApproved: "Claim #12345 Approved",
    hailstormDamage: "Hailstorm damage - Wheat field",
    credited: "₹1,25,000 credited",
    trackClaims: "Track your ongoing claims",
    claimId: "Claim ID",
    underReview: "Under Review",
    verification: "Verification",
    cropType: "Crop Type",
    affectedArea: "Affected Area",
    damageType: "Damage Type",
    dateReported: "Date Reported",
    processingProgress: "Processing Progress",
    viewDetails2: "View Details",
    approvedSettled: "Your approved and settled claims",
    credited2: "Credited",
    settlementDate: "Settlement Date",
    amountCredited: "Amount Credited",
    inspector: "Inspector",
    confirmed: "Confirmed",
    pending: "Pending",
    reschedule: "Reschedule",
    capturePhotos: "Capture Photos",
    step: "Step",
    of: "of",
    positionCrop: "Position crop within the box",
    photoGuidelines: "Photo Guidelines",
    openCamera: "Open Camera",
    uploadGallery: "Upload from Gallery",
    capturedPhotos: "Captured Photos",
    continuePhotos: "Continue with 2 Photos",
    reportDamageDetails: "Report Damage Details",
    cropTypeLabel: "Crop Type *",
    damageCauseLabel: "Damage Cause *",
    affectedAreaLabel: "Affected Area *",
    dateOfDamageLabel: "Date of Damage *",
    additionalDetails: "Additional Details",
    continueAnalysis: "Continue to Analysis",
    gatheringEvidence: "Gathering Evidence",
    processingReport: "Processing Your Report",
    geotagLocation: "Geo-tag Location Data",
    gpsCoordinates: "GPS coordinates from photo metadata",
    done: "Done",
    latitude: "Latitude",
    longitude: "Longitude",
    accuracy: "Accuracy",
    gatheringWeather: "Gathering Weather Data",
    historicalPatterns: "Historical patterns, rainfall, temperature",
    rainfall: "Rainfall",
    temperature: "Temperature",
    windSpeed: "Wind Speed",
    gatheringSatellite: "Gathering Satellite Images",
    ndvi: "NDVI, vegetation indices, field mapping",
    ndviIndex: "NDVI Index",
    fieldCoverage: "Field Coverage",
    damagePattern: "Damage Pattern",
    aiAnalysis: "AI Damage Analysis",
    photoAnalysis: "Photo analysis, damage assessment, correlation",
    damageTypeLabel: "Damage Type",
    severity: "Severity",
    confidence: "Confidence",
    correlation: "Correlation",
    allDataGathered: "All data gathered successfully!",
    processing: "Processing... This may take a few moments",
    viewReport: "View Report",
    damageReport: "Damage Report",
    reportReady: "Report Ready for Submission",
    allDataVerified: "All data has been verified and cross-referenced",
    reportSummary: "Report Summary",
    farmerInformation: "Farmer Information",
    name: "Name",
    phone: "Phone",
    district: "District",
    state: "State",
    cropInformation: "Crop Information",
    damageAssessment: "Damage Assessment",
    damageSeverity: "Damage Severity",
    aiConfidence: "AI Confidence",
    estimatedLoss: "Estimated Loss",
    evidenceData: "Evidence Data",
    geotagLocationData: "Geo-tag Location Data",
    weatherConditions: "Weather Conditions",
    satelliteAnalysis: "Satellite Analysis",
    photoAnalysisLabel: "Photo Analysis",
    aiGeneratedReport: "AI-Generated Assessment Report",
    downloadReport: "Download Report",
    shareReport: "Share Report",
    submitReport: "Submit Report",
    submitReportConfirm: "Submit Report?",
    confirmSubmit: "Are you sure you want to submit this report for processing?",
    cancel: "Cancel",
    submit: "Submit",
    reportSubmitted: "Report Submitted",
    reportSuccess: "Your damage report has been successfully submitted for processing. Click OK to return to home.",
    marketplace: "Marketplace",
    buySupplies: "Buy agricultural supplies",
    addCart: "Add to Cart",
    mandiRates: "Mandi Rates",
    currentPrices: "Current market prices",
    updatedToday: "Updated today",
    photosCaptured: "Photos Captured",
    photoUploaded: "Photo Uploaded",
    detailsSaved: "Details Saved",
    startReport: "Start Report",
    proceedingCapture: "Proceeding to photo capture...",
    startingReport: "Starting Report",
    photosConfirmed: "Photos Confirmed",
    highQualityPhotos: "2 high-quality photo(s) ready for analysis",
    reportReady2: "Report Ready",
    comprehensiveDamage: "Your comprehensive damage report is ready for review",
    reportDownloaded: "Report Downloaded",
    reportDownloadedMsg: "Your comprehensive damage report has been downloaded as PDF",
    reportShared: "Report Shared",
    reportSharedMsg: "Report shared with insurance company and government authorities",
    ok: "OK",
    gallery: "Gallery",
    ledger: "Ledger", // Added translation for Ledger
    insurance: "Insurance", // Added translation for Insurance
    settings: "Settings", // Added translation for Settings
  },
  hi: {
    home: "होम",
    report: "रिपोर्ट",
    market: "बाजार",
    rates: "दरें",
    welcomeBack: "स्वागत है!",
    activeClaims: "सक्रिय दावे",
    approvedClaims: "अनुमोदित दावे",
    viewDetails: "विवरण देखें",
    reportCropLoss: "फसल नुकसान की रिपोर्ट करें",
    startNewClaim: "एक नया नुकसान दावा शुरू करें",
    scheduledVisits: "निर्धारित दौरे",
    upcomingInspections: "आने वाले क्षेत्र निरीक्षण",
    recentActivity: "हाल की गतिविधि",
    claimApproved: "दावा #12345 अनुमोदित",
    hailstormDamage: "ओलावृष्टि क्षति - गेहूं की फसल",
    credited: "₹1,25,000 जमा किया गया",
    trackClaims: "अपने चल रहे दावों को ट्रैक करें",
    claimId: "दावा आईडी",
    underReview: "समीक्षा में",
    verification: "सत्यापन",
    cropType: "फसल का प्रकार",
    affectedArea: "प्रभावित क्षेत्र",
    damageType: "नुकसान का प्रकार",
    dateReported: "रिपोर्ट की तारीख",
    processingProgress: "प्रसंस्करण प्रगति",
    viewDetails2: "विवरण देखें",
    approvedSettled: "आपके अनुमोदित और निपटाए गए दावे",
    credited2: "जमा किया गया",
    settlementDate: "निपटान तारीख",
    amountCredited: "जमा की गई राशि",
    inspector: "निरीक्षक",
    confirmed: "पुष्टि की गई",
    pending: "लंबित",
    reschedule: "पुनः शेड्यूल करें",
    capturePhotos: "फोटो कैप्चर करें",
    step: "चरण",
    of: "का",
    positionCrop: "फसल को बॉक्स के भीतर रखें",
    photoGuidelines: "फोटो दिशानिर्देश",
    openCamera: "कैमरा खोलें",
    uploadGallery: "गैलरी से अपलोड करें",
    capturedPhotos: "कैप्चर की गई फोटो",
    continuePhotos: "2 फोटो के साथ जारी रखें",
    reportDamageDetails: "नुकसान विवरण की रिपोर्ट करें",
    cropTypeLabel: "फसल का प्रकार *",
    damageCauseLabel: "नुकसान का कारण *",
    affectedAreaLabel: "प्रभावित क्षेत्र *",
    dateOfDamageLabel: "नुकसान की तारीख *",
    additionalDetails: "अतिरिक्त विवरण",
    continueAnalysis: "विश्लेषण के लिए जारी रखें",
    gatheringEvidence: "साक्ष्य एकत्र करना",
    processingReport: "आपकी रिपोर्ट प्रसंस्करण",
    geotagLocation: "जियो-टैग स्थान डेटा",
    gpsCoordinates: "फोटो मेटाडेटा से जीपीएस निर्देशांक",
    done: "पूर्ण",
    latitude: "अक्षांश",
    longitude: "देशांतर",
    accuracy: "सटीकता",
    gatheringWeather: "मौसम डेटा एकत्र करना",
    historicalPatterns: "ऐतिहासिक पैटर्न, वर्षा, तापमान",
    rainfall: "वर्षा",
    temperature: "तापमान",
    windSpeed: "हवा की गति",
    gatheringSatellite: "उपग्रह छवियां एकत्र करना",
    ndvi: "एनडीवीआई, वनस्पति सूचकांक, क्षेत्र मानचित्रण",
    ndviIndex: "एनडीवीआई सूचकांक",
    fieldCoverage: "क्षेत्र कवरेज",
    damagePattern: "नुकसान पैटर्न",
    aiAnalysis: "एआई नुकसान विश्लेषण",
    photoAnalysis: "फोटो विश्लेषण, नुकसान मूल्यांकन, सहसंबंध",
    damageTypeLabel: "नुकसान का प्रकार",
    severity: "गंभीरता",
    confidence: "आत्मविश्वास",
    correlation: "सहसंबंध",
    allDataGathered: "सभी डेटा सफलतापूर्वक एकत्र किया गया!",
    processing: "प्रसंस्करण... यह कुछ समय ले सकता है",
    viewReport: "रिपोर्ट देखें",
    damageReport: "नुकसान रिपोर्ट",
    reportReady: "प्रस्तुतिकरण के लिए तैयार रिपोर्ट",
    allDataVerified: "सभी डेटा सत्यापित और क्रॉस-संदर्भित किया गया है",
    reportSummary: "रिपोर्ट सारांश",
    farmerInformation: "किसान की जानकारी",
    name: "नाम",
    phone: "फोन",
    district: "जिला",
    state: "राज्य",
    cropInformation: "फसल की जानकारी",
    damageAssessment: "नुकसान मूल्यांकन",
    damageSeverity: "नुकसान की गंभीरता",
    aiConfidence: "एआई आत्मविश्वास",
    estimatedLoss: "अनुमानित नुकसान",
    evidenceData: "साक्ष्य डेटा",
    geotagLocationData: "जियो-टैग स्थान डेटा",
    weatherConditions: "मौसम की स्थिति",
    satelliteAnalysis: "उपग्रह विश्लेषण",
    photoAnalysisLabel: "फोटो विश्लेषण",
    aiGeneratedReport: "एआई-जनित मूल्यांकन रिपोर्ट",
    downloadReport: "रिपोर्ट डाउनलोड करें",
    shareReport: "रिपोर्ट साझा करें",
    submitReport: "रिपोर्ट प्रस्तुत करें",
    submitReportConfirm: "रिपोर्ट प्रस्तुत करें?",
    confirmSubmit: "क्या आप सुनिश्चित हैं कि आप इस रिपोर्ट को प्रसंस्करण के लिए प्रस्तुत करना चाहते हैं?",
    cancel: "रद्द करें",
    submit: "प्रस्तुत करें",
    reportSubmitted: "रिपोर्ट प्रस्तुत की गई",
    reportSuccess: "आपकी नुकसान रिपोर्ट सफलतापूर्वक प्रसंस्करण के लिए प्रस्तुत की गई है। होम पर लौटने के लिए ठीक है पर क्लिक करें।",
    marketplace: "बाजार",
    buySupplies: "कृषि आपूर्ति खरीदें",
    addCart: "कार्ट में जोड़ें",
    mandiRates: "मंडी दरें",
    currentPrices: "वर्तमान बाजार मूल्य",
    updatedToday: "आज अपडेट किया गया",
    photosCaptured: "फोटो कैप्चर किए गए",
    photoUploaded: "फोटो अपलोड किया गया",
    detailsSaved: "विवरण सहेजे गए",
    startReport: "रिपोर्ट शुरू करें",
    proceedingCapture: "फोटो कैप्चर के लिए आगे बढ़ रहे हैं...",
    startingReport: "रिपोर्ट शुरू करना",
    photosConfirmed: "फोटो की पुष्टि की गई",
    highQualityPhotos: "2 उच्च-गुणवत्ता वाली फोटो विश्लेषण के लिए तैयार",
    reportReady2: "रिपोर्ट तैयार",
    comprehensiveDamage: "आपकी व्यापक नुकसान रिपोर्ट समीक्षा के लिए तैयार है",
    reportDownloaded: "रिपोर्ट डाउनलोड की गई",
    reportDownloadedMsg: "आपकी व्यापक नुकसान रिपोर्ट पीडीएफ के रूप में डाउनलोड की गई है",
    reportShared: "रिपोर्ट साझा की गई",
    reportSharedMsg: "बीमा कंपनी और सरकारी अधिकारियों के साथ रिपोर्ट साझा की गई",
    ok: "ठीक है",
    gallery: "गैलरी",
    ledger: "खाता बही", // Added translation for Ledger
    insurance: "बीमा", // Added translation for Insurance
    settings: "सेटिंग्स", // Added translation for Settings
  },
  pa: {
    home: "ਘਰ",
    report: "ਰਿਪੋਰਟ",
    market: "ਮਾਰਕੀਟ",
    rates: "ਦਰਾਂ",
    welcomeBack: "ਸਵਾਗਤ ਹੈ!",
    activeClaims: "ਸਕਿਰਿਆ ਦਾਅਵੇ",
    approvedClaims: "ਮਨਜ਼ੂਰ ਦਾਅਵੇ",
    viewDetails: "ਵੇਰਵੇ ਦੇਖੋ",
    reportCropLoss: "ਫਸਲ ਦੇ ਨੁਕਸਾਨ ਦੀ ਰਿਪੋਰਟ ਕਰੋ",
    startNewClaim: "ਇੱਕ ਨਵਾਂ ਨੁਕਸਾਨ ਦਾਅਵਾ ਸ਼ੁਰੂ ਕਰੋ",
    scheduledVisits: "ਨਿਰਧਾਰਤ ਦੌਰੇ",
    upcomingInspections: "ਆਉਣ ਵਾਲੇ ਖੇਤ ਨਿਰੀਖਣ",
    recentActivity: "ਹਾਲ ਦੀ ਗਤੀਵਿਧੀ",
    claimApproved: "ਦਾਅਵਾ #12345 ਮਨਜ਼ੂਰ",
    hailstormDamage: "ਓਲਾਵਾਂ ਦਾ ਨੁਕਸਾਨ - ਕਣਕ ਦੀ ਫਸਲ",
    credited: "₹1,25,000 ਜਮਾ ਕੀਤਾ ਗਿਆ",
    trackClaims: "ਆਪਣੇ ਚੱਲ ਰਹੇ ਦਾਅਵਿਆਂ ਨੂੰ ਟ੍ਰੈਕ ਕਰੋ",
    claimId: "ਦਾਅਵਾ ਆਈਡੀ",
    underReview: "ਸਮੀਖਿਆ ਵਿੱਚ",
    verification: "ਪ੍ਰਮਾਣਿਕਤਾ",
    cropType: "ਫਸਲ ਦੀ ਕਿਸਮ",
    affectedArea: "ਪ੍ਰਭਾਵਿਤ ਖੇਤਰ",
    damageType: "ਨੁਕਸਾਨ ਦੀ ਕਿਸਮ",
    dateReported: "ਰਿਪੋਰਟ ਦੀ ਤਾਰੀਖ",
    processingProgress: "ਪ੍ਰਸੰਸਕਰਣ ਦੀ ਪ੍ਰਗਤੀ",
    viewDetails2: "ਵੇਰਵੇ ਦੇਖੋ",
    approvedSettled: "ਤੁਹਾਡੇ ਮਨਜ਼ੂਰ ਅਤੇ ਨਿਪਟਾਏ ਗਏ ਦਾਅਵੇ",
    credited2: "ਜਮਾ ਕੀਤਾ ਗਿਆ",
    settlementDate: "ਨਿਪਟਾਰੇ ਦੀ ਤਾਰੀਖ",
    amountCredited: "ਜਮਾ ਕੀਤੀ ਗਈ ਰਕਮ",
    inspector: "ਨਿਰੀਖਕ",
    confirmed: "ਪੁਸ਼ਟੀ ਕੀਤੀ ਗਈ",
    pending: "ਲੰਬਿਤ",
    reschedule: "ਦੁਬਾਰਾ ਸਮਾਂ ਨਿਰਧਾਰਤ ਕਰੋ",
    capturePhotos: "ਫੋਟੋ ਕੈਪਚਰ ਕਰੋ",
    step: "ਪੜਾਅ",
    of: "ਦਾ",
    positionCrop: "ਫਸਲ ਨੂੰ ਬਾਕਸ ਦੇ ਅੰਦਰ ਰੱਖੋ",
    photoGuidelines: "ਫੋਟੋ ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼",
    openCamera: "ਕੈਮਰਾ ਖੋਲੋ",
    uploadGallery: "ਗੈਲਰੀ ਤੋਂ ਅਪਲੋਡ ਕਰੋ",
    capturedPhotos: "ਕੈਪਚਰ ਕੀਤੀਆਂ ਫੋਟੋਆਂ",
    continuePhotos: "2 ਫੋਟੋ ਦੇ ਨਾਲ ਜਾਰੀ ਰੱਖੋ",
    reportDamageDetails: "ਨੁਕਸਾਨ ਦੇ ਵੇਰਵੇ ਦੀ ਰਿਪੋਰਟ ਕਰੋ",
    cropTypeLabel: "ਫਸਲ ਦੀ ਕਿਸਮ *",
    damageCauseLabel: "ਨੁਕਸਾਨ ਦਾ ਕਾਰਨ *",
    affectedAreaLabel: "ਪ੍ਰਭਾਵਿਤ ਖੇਤਰ *",
    dateOfDamageLabel: "ਨੁਕਸਾਨ ਦੀ ਤਾਰੀਖ *",
    additionalDetails: "ਵਾਧੂ ਵੇਰਵੇ",
    continueAnalysis: "ਵਿਸ਼ਲੇਸ਼ਣ ਲਈ ਜਾਰੀ ਰੱਖੋ",
    gatheringEvidence: "ਸਬੂਤ ਇਕੱਠਾ ਕਰਨਾ",
    processingReport: "ਤੁਹਾਡੀ ਰਿਪੋਰਟ ਦੀ ਪ੍ਰਸੰਸਕਰਣ",
    geotagLocation: "ਜਿਓ-ਟੈਗ ਸਥਾਨ ਡੇਟਾ",
    gpsCoordinates: "ਫੋਟੋ ਮੈਟਾਡੇਟਾ ਤੋਂ ਜੀਪੀਐਸ ਕੋਆਰਡੀਨੇਟ",
    done: "ਪੂਰਾ",
    latitude: "ਅਕਸ਼ਾਂਸ਼",
    longitude: "ਲੰਬਕਾਰ",
    accuracy: "ਸ਼ੁੱਧਤਾ",
    gatheringWeather: "ਮੌਸਮ ਡੇਟਾ ਇਕੱਠਾ ਕਰਨਾ",
    historicalPatterns: "ਐਤਿਹਾਸਿਕ ਪੈਟਰਨ, ਮੀਂਹ, ਤਾਪਮਾਨ",
    rainfall: "ਮੀਂਹ",
    temperature: "ਤਾਪਮਾਨ",
    windSpeed: "ਹਵਾ ਦੀ ਗਤੀ",
    gatheringSatellite: "ਸੈਟੇਲਾਈਟ ਚਿੱਤਰ ਇਕੱਠਾ ਕਰਨਾ",
    ndvi: "ਐਨਡੀਵੀਆਈ, ਵਨਸਪਤੀ ਸੂਚਕਾਂਕ, ਖੇਤ ਮੈਪਿੰਗ",
    ndviIndex: "ਐਨਡੀਵੀਆਈ ਸੂਚਕਾਂਕ",
    fieldCoverage: "ਖੇਤ ਕਵਰੇਜ",
    damagePattern: "ਨੁਕਸਾਨ ਦਾ ਪੈਟਰਨ",
    aiAnalysis: "ਏਆਈ ਨੁਕਸਾਨ ਵਿਸ਼ਲੇਸ਼ਣ",
    photoAnalysis: "ਫੋਟੋ ਵਿਸ਼ਲੇਸ਼ਣ, ਨੁਕਸਾਨ ਮੁਲਾਂਕਣ, ਸਬੰਧ",
    damageTypeLabel: "ਨੁਕਸਾਨ ਦੀ ਕਿਸਮ",
    severity: "ਗੰਭੀਰਤਾ",
    confidence: "ਆਤਮ ਵਿਸ਼ਵਾਸ",
    correlation: "ਸਬੰਧ",
    allDataGathered: "ਸਾਰਾ ਡੇਟਾ ਸਫਲਤਾਪੂਰਵਕ ਇਕੱਠਾ ਕੀਤਾ ਗਿਆ!",
    processing: "ਪ੍ਰਸੰਸਕਰਣ... ਇਹ ਕੁਝ ਸਮਾਂ ਲੱਗ ਸਕਦਾ ਹੈ",
    viewReport: "ਰਿਪੋਰਟ ਦੇਖੋ",
    damageReport: "ਨੁਕਸਾਨ ਰਿਪੋਰਟ",
    reportReady: "ਜਮਾ ਕਰਨ ਲਈ ਤਿਆਰ ਰਿਪੋਰਟ",
    allDataVerified: "ਸਾਰਾ ਡੇਟਾ ਪ੍ਰਮਾਣਿਤ ਅਤੇ ਕ੍ਰਾਸ-ਸੰਦਰਭਿਤ ਕੀਤਾ ਗਿਆ ਹੈ",
    reportSummary: "ਰਿਪੋਰਟ ਸਾਰ",
    farmerInformation: "ਕਿਸਾਨ ਦੀ ਜਾਣਕਾਰੀ",
    name: "ਨਾਮ",
    phone: "ਫੋਨ",
    district: "ਜ਼ਿਲ੍ਹਾ",
    state: "ਰਾਜ",
    cropInformation: "ਫਸਲ ਦੀ ਜਾਣਕਾਰੀ",
    damageAssessment: "ਨੁਕਸਾਨ ਮੁਲਾਂਕਣ",
    damageSeverity: "ਨੁਕਸਾਨ ਦੀ ਗੰਭੀਰਤਾ",
    aiConfidence: "ਏਆਈ ਆਤਮ ਵਿਸ਼ਵਾਸ",
    estimatedLoss: "ਅਨੁਮਾਨਿਤ ਨੁਕਸਾਨ",
    evidenceData: "ਸਬੂਤ ਡੇਟਾ",
    geotagLocationData: "ਜਿਓ-ਟੈਗ ਸਥਾਨ ਡੇਟਾ",
    weatherConditions: "ਮੌਸਮ ਦੀ ਸਥਿਤੀ",
    satelliteAnalysis: "ਸੈਟੇਲਾਈਟ ਵਿਸ਼ਲੇਸ਼ਣ",
    photoAnalysisLabel: "ਫੋਟੋ ਵਿਸ਼ਲੇਸ਼ਣ",
    aiGeneratedReport: "ਏਆਈ-ਜਨਰੇਟ ਮੁਲਾਂਕਣ ਰਿਪੋਰਟ",
    downloadReport: "ਰਿਪੋਰਟ ਡਾਊਨਲੋਡ ਕਰੋ",
    shareReport: "ਰਿਪੋਰਟ ਸਾਂਝੀ ਕਰੋ",
    submitReport: "ਰਿਪੋਰਟ ਜਮਾ ਕਰੋ",
    submitReportConfirm: "ਰਿਪੋਰਟ ਜਮਾ ਕਰੋ?",
    confirmSubmit: "ਕੀ ਤੁਸੀਂ ਯਕੀਨੀ ਹੋ ਕਿ ਤੁਸੀਂ ਇਸ ਰਿਪੋਰਟ ਨੂੰ ਪ੍ਰਸੰਸਕਰਣ ਲਈ ਜਮਾ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?",
    cancel: "ਰੱਦ ਕਰੋ",
    submit: "ਜਮਾ ਕਰੋ",
    reportSubmitted: "ਰਿਪੋਰਟ ਜਮਾ ਕੀਤੀ ਗਈ",
    reportSuccess: "ਤੁਹਾਡੀ ਨੁਕਸਾਨ ਰਿਪੋਰਟ ਸਫਲਤਾਪੂਰਵਕ ਪ੍ਰਸੰਸਕਰਣ ਲਈ ਜਮਾ ਕੀਤੀ ਗਈ ਹੈ। ਘਰ ਵਾਪਸ ਜਾਣ ਲਈ ਠੀਕ ਹੈ ਤੇ ਕਲਿੱਕ ਕਰੋ।",
    marketplace: "ਮਾਰਕੀਟ",
    buySupplies: "ਖੇਤੀ ਸਪਲਾਈ ਖਰੀਦੋ",
    addCart: "ਕਾਰਟ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰੋ",
    mandiRates: "ਮੰਡੀ ਦਰਾਂ",
    currentPrices: "ਮੌਜੂਦਾ ਬਾਜ਼ਾਰ ਕੀਮਤਾਂ",
    updatedToday: "ਅੱਜ ਅਪਡੇਟ ਕੀਤਾ ਗਿਆ",
    photosCaptured: "ਫੋਟੋਆਂ ਕੈਪਚਰ ਕੀਤੀਆਂ ਗਈਆਂ",
    photoUploaded: "ਫੋਟੋ ਅਪਲੋਡ ਕੀਤੀ ਗਈ",
    detailsSaved: "ਵੇਰਵੇ ਸੁਰੱਖਿਤ ਕੀਤੇ ਗਏ",
    startReport: "ਰਿਪੋਰਟ ਸ਼ੁਰੂ ਕਰੋ",
    proceedingCapture: "ਫੋਟੋ ਕੈਪਚਰ ਲਈ ਅੱਗੇ ਵਧ ਰਹੇ ਹਾਂ...",
    startingReport: "ਰਿਪੋਰਟ ਸ਼ੁਰੂ ਕਰ ਰਹੇ ਹਾਂ",
    photosConfirmed: "ਫੋਟੋਆਂ ਦੀ ਪੁਸ਼ਟੀ ਕੀਤੀ ਗਈ",
    highQualityPhotos: "2 ਉੱਚ-ਗੁਣਵੱਤਾ ਵਾਲੀਆਂ ਫੋਟੋਆਂ ਵਿਸ਼ਲੇਸ਼ਣ ਲਈ ਤਿਆਰ",
    reportReady2: "ਰਿਪੋਰਟ ਤਿਆਰ",
    comprehensiveDamage: "ਤੁਹਾਡੀ ਵਿਆਪਕ ਨੁਕਸਾਨ ਰਿਪੋਰਟ ਸਮੀਖਿਆ ਲਈ ਤਿਆਰ ਹੈ",
    reportDownloaded: "ਰਿਪੋਰਟ ਡਾਊਨਲੋਡ ਕੀਤੀ ਗਈ",
    reportDownloadedMsg: "ਤੁਹਾਡੀ ਵਿਆਪਕ ਨੁਕਸਾਨ ਰਿਪੋਰਟ ਪੀਡੀਐਫ ਦੇ ਰੂਪ ਵਿੱਚ ਡਾਊਨਲੋਡ ਕੀਤੀ ਗਈ ਹੈ",
    reportShared: "ਰਿਪੋਰਟ ਸਾਂਝੀ ਕੀਤੀ ਗਈ",
    reportSharedMsg: "ਬੀਮਾ ਕੰਪਨੀ ਅਤੇ ਸਰਕਾਰੀ ਅਧਿਕਾਰੀਆਂ ਨਾਲ ਰਿਪੋਰਟ ਸਾਂਝੀ ਕੀਤੀ ਗਈ",
    ok: "ਠੀਕ ਹੈ",
    gallery: "ਗੈਲਰੀ",
    ledger: "ਲੈਜਰ", // Added translation for Ledger
    insurance: "ਬੀਮਾ", // Added translation for Insurance
    settings: "ਸੈਟਿੰਗਜ਼", // Added translation for Settings
  },
}

export default function PageHome() {
  // Renamed from Home to PageHome to avoid redeclaration
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false)
  const [currentScreen, setCurrentScreen] = useState("onboarding-intro")
  const [reportData, setReportData] = useState<ReportFlowState>({
    photos: ["photo-1", "photo-2"],
    cropType: "wheat",
    damageType: "hailstorm",
    affectedArea: "2.5",
    dateOfDamage: "2024-10-20",
    description: "Severe hailstorm damage across the field",
    latitude: "19.8965",
    longitude: "73.7853",
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
  const [showSubmissionConfirmation, setShowSubmissionConfirmation] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [language, setLanguage] = useState<"en" | "hi" | "pa">("en")
  const [showThemeLanguageMenu, setShowThemeLanguageMenu] = useState(false)

  // Dummy function to fix lint error. Replace with actual logic if needed.
  const handleTutorialComplete = () => {
    setHasSeenOnboarding(true)
    setCurrentScreen("home")
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const savedLanguage = localStorage.getItem("language") as "en" | "hi" | "pa" | null
    const seenOnboarding = localStorage.getItem("hasSeenOnboarding")

    if (savedTheme) setTheme(savedTheme)
    if (savedLanguage) setLanguage(savedLanguage)

    if (seenOnboarding) {
      setHasSeenOnboarding(true)
      setCurrentScreen("home")
    }
  }, [])

  useEffect(() => {
    const html = document.documentElement
    if (theme === "dark") {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const t = translations[language]

  const openModal = (title: string, message: string, type = "info") => {
    setModalData({ title, message, type })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  // HOME SCREEN
  const HomeScreen = () => (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900" : "bg-white"} pb-24`}>
      <div
        className={`${theme === "dark" ? "bg-gradient-to-b from-cyan-500/20 to-slate-900 border-slate-700" : "bg-gradient-to-b from-cyan-500/10 to-slate-50 border-slate-200"} border-b p-6 space-y-4`}
      >
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              {t.welcomeBack}
            </h1>
            <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>Nashik District • Oct 24, 2024</p>
          </div>
          <button
            className={`w-10 h-10 rounded-full ${theme === "dark" ? "bg-cyan-500/20 border-cyan-500/50" : "bg-cyan-500/10 border-cyan-500/30"} border flex items-center justify-center hover:${theme === "dark" ? "bg-cyan-500/30" : "bg-cyan-500/20"} transition`}
          >
            <User className="w-5 h-5 text-cyan-400" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div
            className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg p-3 space-y-1`}
          >
            <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t.activeClaims}</p>
            <p className="text-2xl font-bold text-cyan-400">2</p>
            <button
              onClick={() => setCurrentScreen("active-claims")}
              className="text-xs text-cyan-400 hover:text-cyan-300 transition font-medium"
            >
              {t.viewDetails} →
            </button>
          </div>
          <div
            className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg p-3 space-y-1`}
          >
            <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t.approvedClaims}</p>
            <p className="text-2xl font-bold text-green-400">5</p>
            <button
              onClick={() => setCurrentScreen("approved-claims")}
              className="text-xs text-green-400 hover:text-green-300 transition font-medium"
            >
              {t.viewDetails} →
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <button
          onClick={() => setCurrentScreen("crop-gallery")}
          className={`w-full ${theme === "dark" ? "bg-slate-800 border-slate-700 hover:border-cyan-500" : "bg-slate-100 border-slate-300 hover:border-cyan-500"} border rounded-lg p-4 space-y-2 transition text-left`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                {t.gallery || "Crop Gallery"}
              </h2>
              <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                Track your crop growth and progress
              </p>
            </div>
            <span className="text-cyan-400">→</span>
          </div>
        </button>

        <button
          onClick={() => {
            openModal(t.startReport, t.proceedingCapture, "info")
            setTimeout(() => {
              closeModal()
              setCurrentScreen("report-damage")
            }, 1500)
          }}
          className="w-full bg-cyan-500 text-white rounded-lg p-4 space-y-2 hover:bg-cyan-600 transition text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">{t.reportCropLoss}</h2>
              <p className="text-sm opacity-90">{t.startNewClaim}</p>
            </div>
            <span>→</span>
          </div>
        </button>

        <button
          onClick={() => setCurrentScreen("scheduled-visits")}
          className={`w-full ${theme === "dark" ? "bg-slate-800 border-slate-700 hover:border-cyan-500" : "bg-slate-100 border-slate-300 hover:border-cyan-500"} border rounded-lg p-4 space-y-2 transition text-left`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                {t.scheduledVisits}
              </h2>
              <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                {t.upcomingInspections}
              </p>
            </div>
            <span className="text-cyan-400">→</span>
          </div>
        </button>

        <div className="space-y-2">
          <h3 className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            {t.recentActivity}
          </h3>
          <div
            className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg p-3 space-y-2`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-full ${theme === "dark" ? "bg-green-500/20" : "bg-green-500/10"} flex items-center justify-center flex-shrink-0`}
              >
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  {t.claimApproved}
                </p>
                <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  {t.hailstormDamage}
                </p>
                <p className="text-xs text-green-400 font-medium">{t.credited}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const ActiveClaimsScreen = () => (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900" : "bg-white"} pb-24`}>
      <div
        className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border-b p-4 sticky top-0 z-10`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen("home")}
            className={`p-2 ${theme === "dark" ? "hover:bg-slate-700" : "hover:bg-slate-200"} rounded-lg transition`}
          >
            <ArrowLeft className="w-5 h-5 text-cyan-400" />
          </button>
          <div>
            <h1 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              {t.activeClaims}
            </h1>
            <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t.trackClaims}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {[
          {
            id: "CLM-001",
            crop: "Wheat",
            area: "2.5 acres",
            damage: "Hailstorm",
            date: "Oct 20, 2024",
            status: t.underReview,
            progress: 65,
          },
          {
            id: "CLM-002",
            crop: "Rice",
            area: "1.8 acres",
            damage: "Flood",
            date: "Oct 18, 2024",
            status: t.verification,
            progress: 40,
          },
        ].map((claim) => (
          <div
            key={claim.id}
            className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg p-4 space-y-3`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-xs font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  {t.claimId}
                </p>
                <p className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{claim.id}</p>
              </div>
              <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">{claim.status}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.cropType}</p>
                <p className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>{claim.crop}</p>
              </div>
              <div>
                <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.affectedArea}</p>
                <p className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>{claim.area}</p>
              </div>
              <div>
                <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.damageType}</p>
                <p className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>{claim.damage}</p>
              </div>
              <div>
                <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.dateReported}</p>
                <p className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>{claim.date}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.processingProgress}</span>
                <span className="text-cyan-400 font-medium">{claim.progress}%</span>
              </div>
              <div className={`w-full ${theme === "dark" ? "bg-slate-700" : "bg-slate-300"} rounded-full h-2`}>
                <div className="bg-cyan-500 h-2 rounded-full transition-all" style={{ width: `${claim.progress}%` }} />
              </div>
            </div>

            <button
              className={`w-full ${theme === "dark" ? "bg-slate-700 hover:bg-slate-600" : "bg-slate-300 hover:bg-slate-400"} ${theme === "dark" ? "text-white" : "text-slate-900"} py-2 rounded-lg text-sm font-medium transition`}
            >
              {t.viewDetails2}
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  const ApprovedClaimsScreen = () => (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900" : "bg-white"} pb-24`}>
      <div
        className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border-b p-4 sticky top-0 z-10`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen("home")}
            className={`p-2 ${theme === "dark" ? "hover:bg-slate-700" : "hover:bg-slate-200"} rounded-lg transition`}
          >
            <ArrowLeft className="w-5 h-5 text-cyan-400" />
          </button>
          <div>
            <h1 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              {t.approvedClaims}
            </h1>
            <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t.approvedSettled}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {[
          {
            id: "CLM-12345",
            crop: "Wheat",
            area: "2.5 acres",
            damage: "Hailstorm",
            amount: "₹1,25,000",
            date: "Sep 15, 2024",
            status: t.credited2,
          },
          {
            id: "CLM-12344",
            crop: "Cotton",
            area: "3.0 acres",
            damage: "Drought",
            amount: "₹98,500",
            date: "Aug 22, 2024",
            status: t.credited2,
          },
          {
            id: "CLM-12343",
            crop: "Rice",
            area: "1.5 acres",
            damage: "Pest Attack",
            amount: "₹45,000",
            date: "Jul 10, 2024",
            status: t.credited2,
          },
        ].map((claim) => (
          <div
            key={claim.id}
            className={`${theme === "dark" ? "bg-slate-800 border-green-500/20" : "bg-slate-100 border-green-500/30"} border rounded-lg p-4 space-y-3`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-xs font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  {t.claimId}
                </p>
                <p className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{claim.id}</p>
              </div>
              <div className="flex items-center gap-1 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                <CheckCircle2 className="w-3 h-3" />
                {claim.status}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.cropType}</p>
                <p className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>{claim.crop}</p>
              </div>
              <div>
                <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.affectedArea}</p>
                <p className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>{claim.area}</p>
              </div>
              <div>
                <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.damageType}</p>
                <p className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>{claim.damage}</p>
              </div>
              <div>
                <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.settlementDate}</p>
                <p className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>{claim.date}</p>
              </div>
            </div>

            <div className={`${theme === "dark" ? "bg-green-500/10" : "bg-green-500/5"} rounded-lg p-3`}>
              <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"} mb-1`}>
                {t.amountCredited}
              </p>
              <p className="text-2xl font-bold text-green-400">{claim.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const ScheduledVisitsScreen = () => (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900" : "bg-white"} pb-24`}>
      <div
        className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border-b p-4 sticky top-0 z-10`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen("home")}
            className={`p-2 ${theme === "dark" ? "hover:bg-slate-700" : "hover:bg-slate-200"} rounded-lg transition`}
          >
            <ArrowLeft className="w-5 h-5 text-cyan-400" />
          </button>
          <div>
            <h1 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              {t.scheduledVisits}
            </h1>
            <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
              {t.upcomingInspections}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {[
          {
            id: 1,
            inspector: "Rajesh Kumar",
            date: "Oct 28, 2024",
            time: "10:00 AM",
            claim: "CLM-001",
            crop: "Wheat",
            location: "Field A, Nashik",
            status: t.confirmed,
          },
          {
            id: 2,
            inspector: "Priya Sharma",
            date: "Oct 30, 2024",
            time: "2:00 PM",
            claim: "CLM-002",
            crop: "Rice",
            location: "Field B, Nashik",
            status: t.pending,
          },
        ].map((visit) => (
          <div
            key={visit.id}
            className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg p-4 space-y-3`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-xs font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  {t.inspector}
                </p>
                <p className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  {visit.inspector}
                </p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded font-medium ${
                  visit.status === t.confirmed ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {visit.status}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>{visit.date}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>{visit.time}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>{visit.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className={`${theme === "dark" ? "bg-slate-700" : "bg-slate-200"} rounded p-2`}>
                <p className={`text-slate-400 text-xs`}>{t.claimId}</p>
                <p className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>{visit.claim}</p>
              </div>
              <div className={`${theme === "dark" ? "bg-slate-700" : "bg-slate-200"} rounded p-2`}>
                <p className={`text-slate-400 text-xs`}>{t.cropType}</p>
                <p className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>{visit.crop}</p>
              </div>
            </div>

            <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg text-sm font-medium transition">
              {t.reschedule}
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  // REPORT DAMAGE SCREEN
  const ReportDamageScreen = () => (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900" : "bg-white"} pb-24`}>
      <div
        className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border-b p-4 sticky top-0 z-10`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen("home")}
            className={`p-2 ${theme === "dark" ? "hover:bg-slate-700" : "hover:bg-slate-200"} rounded-lg transition`}
          >
            <ArrowLeft className="w-5 h-5 text-cyan-400" />
          </button>
          <div>
            <h1 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              {t.reportCropLoss}
            </h1>
            <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
              {t.step} 1 {t.of} 5
            </p>
          </div>
        </div>
      </div>

      <div
        className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border-b px-4 py-3`}
      >
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full ${s <= 1 ? "bg-cyan-500" : theme === "dark" ? "bg-slate-700" : "bg-slate-300"}`}
            />
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div
          className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg p-6 text-center space-y-4`}
        >
          <div
            className={`w-16 h-16 ${theme === "dark" ? "bg-cyan-500/10" : "bg-cyan-500/5"} rounded-lg flex items-center justify-center mx-auto`}
          >
            <Camera className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h2 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"} mb-2`}>
              {t.reportCropLoss}
            </h2>
            <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t.startNewClaim}</p>
          </div>
        </div>

        <div
          className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg p-4 space-y-3`}
        >
          <h3 className={`font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"} text-sm`}>
            What You'll Need:
          </h3>
          <ul className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"} space-y-2`}>
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
            openModal(t.startingReport, t.proceedingCapture, "info")
            setTimeout(() => {
              closeModal()
              setCurrentScreen("camera-capture")
            }, 1500)
          }}
          className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition"
        >
          {t.startReport}
        </button>
      </div>
    </div>
  )

  // CAMERA CAPTURE SCREEN
  const CameraCaptureScreen = () => (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900" : "bg-white"} pb-24`}>
      <div
        className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border-b p-4 sticky top-0 z-10`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen("report-damage")}
            className={`p-2 ${theme === "dark" ? "hover:bg-slate-700" : "hover:bg-slate-200"} rounded-lg transition`}
          >
            <ArrowLeft className="w-5 h-5 text-cyan-400" />
          </button>
          <div>
            <h1 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              {t.capturePhotos}
            </h1>
            <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
              {t.step} 2 {t.of} 5
            </p>
          </div>
        </div>
      </div>

      <div
        className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border-b px-4 py-3`}
      >
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full ${s <= 2 ? "bg-cyan-500" : theme === "dark" ? "bg-slate-700" : "bg-slate-300"}`}
            />
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
            <p className="text-white text-sm font-semibold">{t.positionCrop}</p>
          </div>
        </div>

        <div
          className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg p-4 space-y-3`}
        >
          <h3
            className={`font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"} text-sm flex items-center gap-2`}
          >
            <AlertCircle className="w-4 h-4 text-yellow-400" />
            {t.photoGuidelines}
          </h3>
          <ul className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"} space-y-2`}>
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
              openModal(t.photosCaptured, "High-quality photo saved (2/3)", "success")
              setTimeout(() => {
                closeModal()
              }, 1500)
            }}
            className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition flex items-center justify-center gap-2"
          >
            <Camera className="w-5 h-5" />
            {t.openCamera}
          </button>
          <button
            onClick={() => {
              openModal(t.photoUploaded, "2 photos added successfully", "success")
              setTimeout(() => {
                closeModal()
              }, 1500)
            }}
            className={`w-full ${theme === "dark" ? "bg-slate-800 border-slate-700 hover:border-cyan-500" : "bg-slate-100 border-slate-300 hover:border-cyan-500"} border py-3 rounded-lg font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"} transition flex items-center justify-center gap-2`}
          >
            <FileText className="w-5 h-5" />
            {t.uploadGallery}
          </button>
        </div>

        <div className="space-y-3">
          <h3 className={`font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"} text-sm`}>
            {t.capturedPhotos} (2)
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className={`${theme === "dark" ? "bg-cyan-500/20 border-slate-700" : "bg-cyan-500/5 border-slate-300"} rounded-lg aspect-square flex items-center justify-center border`}
              >
                <Camera className="w-6 h-6 text-cyan-400" />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            openModal(t.photosConfirmed, t.highQualityPhotos, "success")
            setTimeout(() => {
              closeModal()
              setCurrentScreen("report-cause")
            }, 1500)
          }}
          className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition"
        >
          {t.continuePhotos}
        </button>
      </div>
    </div>
  )

  // REPORT CAUSE SCREEN
  const ReportCauseScreen = () => (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900" : "bg-white"} pb-24`}>
      <div
        className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border-b p-4 sticky top-0 z-10`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen("camera-capture")}
            className={`p-2 ${theme === "dark" ? "hover:bg-slate-700" : "hover:bg-slate-200"} rounded-lg transition`}
          >
            <ArrowLeft className="w-5 h-5 text-cyan-400" />
          </button>
          <div>
            <h1 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              {t.reportDamageDetails}
            </h1>
            <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
              {t.step} 3 {t.of} 5
            </p>
          </div>
        </div>
      </div>

      <div
        className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border-b px-4 py-3`}
      >
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full ${s <= 3 ? "bg-cyan-500" : theme === "dark" ? "bg-slate-700" : "bg-slate-300"}`}
            />
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"} mb-2`}>
              {t.cropTypeLabel}
            </label>
            <select
              className={`w-full ${theme === "dark" ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-300 text-slate-900"} border rounded-lg px-3 py-2 focus:border-cyan-500 focus:outline-none`}
            >
              <option value="wheat">Wheat</option>
              <option value="rice">Rice</option>
              <option value="cotton">Cotton</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"} mb-2`}>
              {t.damageCauseLabel}
            </label>
            <select
              className={`w-full ${theme === "dark" ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-300 text-slate-900"} border rounded-lg px-3 py-2 focus:border-cyan-500 focus:outline-none`}
            >
              <option value="hailstorm">Hailstorm</option>
              <option value="flood">Flood/Waterlogging</option>
              <option value="drought">Drought</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"} mb-2`}>
              {t.affectedAreaLabel}
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                defaultValue="2.5"
                className={`flex-1 ${theme === "dark" ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-300 text-slate-900"} border rounded-lg px-3 py-2 focus:border-cyan-500 focus:outline-none`}
              />
              <div
                className={`${theme === "dark" ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-300 text-slate-900"} border rounded-lg px-3 py-2 font-medium`}
              >
                acres
              </div>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"} mb-2`}>
              {t.dateOfDamageLabel}
            </label>
            <input
              type="date"
              defaultValue="2024-10-20"
              className={`w-full ${theme === "dark" ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-300 text-slate-900"} border rounded-lg px-3 py-2 focus:border-cyan-500 focus:outline-none`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"} mb-2`}>
              {t.additionalDetails}
            </label>
            <textarea
              defaultValue="Severe hailstorm damage across the field"
              rows={4}
              className={`w-full ${theme === "dark" ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-300 text-slate-900"} border rounded-lg px-3 py-2 focus:border-cyan-500 focus:outline-none resize-none`}
            />
          </div>
        </div>

        <button
          onClick={() => {
            openModal(t.detailsSaved, "Crop: Wheat\nDamage: Hailstorm\nArea: 2.5 acres", "success")
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
          {t.continueAnalysis}
        </button>
      </div>
    </div>
  )

  // DATA GATHERING SCREEN
  const DataGatheringScreen = () => (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900" : "bg-white"} pb-24`}>
      <div
        className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border-b p-4 sticky top-0 z-10`}
      >
        <div className="flex items-center gap-3">
          <div className="p-2">
            <ArrowLeft className={`w-5 h-5 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`} />
          </div>
          <div>
            <h1 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              {t.gatheringEvidence}
            </h1>
            <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
              {t.step} 4 {t.of} 5
            </p>
          </div>
        </div>
      </div>

      <div
        className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border-b px-4 py-3`}
      >
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full ${s <= 4 ? "bg-cyan-500" : theme === "dark" ? "bg-slate-700" : "bg-slate-300"}`}
            />
          ))}
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div
          className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg p-8 text-center space-y-4`}
        >
          <div
            className={`w-20 h-20 ${theme === "dark" ? "bg-cyan-500/10" : "bg-cyan-500/5"} rounded-lg flex items-center justify-center mx-auto`}
          >
            {gatheringProgress.analysis ? (
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            ) : (
              <Loader className="w-12 h-12 text-cyan-500 animate-spin" />
            )}
          </div>
          <div>
            <h2 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"} mb-2`}>
              {t.processingReport}
            </h2>
            <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
              Gathering data from multiple sources to create a comprehensive damage assessment...
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Geo-tag Location Data - FIRST */}
          <div
            className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg p-4 space-y-2`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-green-500">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className={`font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {t.geotagLocation}
                  </p>
                  <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    {t.gpsCoordinates}
                  </p>
                </div>
              </div>
              <span className="text-xs text-green-400 font-semibold">{t.done}</span>
            </div>
            <div className={`ml-8 text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"} space-y-1`}>
              <p>
                • {t.latitude}: {reportData.latitude}
              </p>
              <p>
                • {t.longitude}: {reportData.longitude}
              </p>
              <p>• {t.accuracy}: ±5 meters</p>
            </div>
          </div>

          {/* Weather Data */}
          <div
            className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg p-4 space-y-2`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${gatheringProgress.weather ? "bg-green-500" : "bg-cyan-500 animate-pulse"}`}
                >
                  {gatheringProgress.weather && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
                <div>
                  <p className={`font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {t.gatheringWeather}
                  </p>
                  <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    {t.historicalPatterns}
                  </p>
                </div>
              </div>
              {gatheringProgress.weather && <span className="text-xs text-green-400 font-semibold">{t.done}</span>}
            </div>
            {gatheringProgress.weather && (
              <div className={`ml-8 text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"} space-y-1`}>
                <p>• {t.rainfall}: 45mm (2 days before damage)</p>
                <p>• {t.temperature}: 28-32°C</p>
                <p>• {t.windSpeed}: 35-40 km/h</p>
              </div>
            )}
          </div>

          {/* Satellite Imagery */}
          <div
            className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg p-4 space-y-2`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${gatheringProgress.satellite ? "bg-green-500" : theme === "dark" ? "bg-slate-700" : "bg-slate-300"}`}
                >
                  {gatheringProgress.satellite && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
                <div>
                  <p
                    className={`font-medium ${gatheringProgress.satellite ? (theme === "dark" ? "text-white" : "text-slate-900") : theme === "dark" ? "text-slate-400" : "text-slate-600"}`}
                  >
                    {t.gatheringSatellite}
                  </p>
                  <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t.ndvi}</p>
                </div>
              </div>
              {gatheringProgress.satellite && <span className="text-xs text-green-400 font-semibold">{t.done}</span>}
            </div>
            {gatheringProgress.satellite && (
              <div className={`ml-8 text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"} space-y-1`}>
                <p>• {t.ndviIndex}: 0.42 (Healthy: 0.6-0.8)</p>
                <p>• {t.fieldCoverage}: 2.5 hectares</p>
                <p>• {t.damagePattern}: Scattered across field</p>
              </div>
            )}
          </div>

          {/* AI Analysis */}
          <div
            className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg p-4 space-y-2`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${gatheringProgress.analysis ? "bg-green-500" : theme === "dark" ? "bg-slate-700" : "bg-slate-300"}`}
                >
                  {gatheringProgress.analysis && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
                <div>
                  <p
                    className={`font-medium ${gatheringProgress.analysis ? (theme === "dark" ? "text-white" : "text-slate-900") : theme === "dark" ? "text-slate-400" : "text-slate-600"}`}
                  >
                    {t.aiAnalysis}
                  </p>
                  <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    {t.photoAnalysis}
                  </p>
                </div>
              </div>
              {gatheringProgress.analysis && <span className="text-xs text-green-400 font-semibold">{t.done}</span>}
            </div>
            {gatheringProgress.analysis && (
              <div className={`ml-8 text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"} space-y-1`}>
                <p>• {t.damageTypeLabel}: Hailstorm (95% confidence)</p>
                <p>• {t.severity}: High (60-70% crop loss)</p>
                <p>• {t.correlation}: Weather + Satellite + Photos match</p>
              </div>
            )}
          </div>
        </div>

        <div
          className={`${theme === "dark" ? "bg-cyan-500/10 border-cyan-500/20" : "bg-cyan-500/5 border-cyan-500/30"} border rounded-lg p-4 text-center`}
        >
          <p className="text-sm text-cyan-400 font-medium">
            {gatheringProgress.analysis ? `✓ ${t.allDataGathered}` : t.processing}
          </p>
        </div>
      </div>

      {gatheringProgress.analysis && (
        <div className="fixed bottom-24 left-4 right-4">
          <button
            onClick={() => {
              openModal(t.reportReady2, t.comprehensiveDamage, "success")
              setTimeout(() => {
                closeModal()
                setCurrentScreen("comprehensive-report")
              }, 1500)
            }}
            className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition"
          >
            {t.viewReport}
          </button>
        </div>
      )}
    </div>
  )

  // COMPREHENSIVE REPORT SCREEN
  const ComprehensiveReportScreen = () => (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900" : "bg-white"} pb-24`}>
      <div
        className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border-b p-4 sticky top-0 z-10`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen("data-gathering")}
            className={`p-2 ${theme === "dark" ? "hover:bg-slate-700" : "hover:bg-slate-200"} rounded-lg transition`}
          >
            <ArrowLeft className="w-5 h-5 text-cyan-400" />
          </button>
          <div>
            <h1 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              {t.damageReport}
            </h1>
            <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
              {t.step} 5 {t.of} 5
            </p>
          </div>
        </div>
      </div>

      <div
        className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border-b px-4 py-3`}
      >
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
            <p className="font-semibold text-green-400">{t.reportReady}</p>
          </div>
          <p className="text-sm text-green-400/80">{t.allDataVerified}</p>
        </div>

        <div
          className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg p-4 space-y-4`}
        >
          <h2 className={`font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"} text-lg`}>
            {t.reportSummary}
          </h2>

          <div className={`space-y-2 pb-4 ${theme === "dark" ? "border-slate-700" : "border-slate-300"} border-b`}>
            <h3 className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
              {t.farmerInformation}
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className={`text-xs font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  {t.name}
                </p>
                <p className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>Rajesh Patel</p>
              </div>
              <div>
                <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.phone}</p>
                <p className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>+91 98765 43210</p>
              </div>
              <div>
                <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.district}</p>
                <p className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>Nashik</p>
              </div>
              <div>
                <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.state}</p>
                <p className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>Maharashtra</p>
              </div>
            </div>
          </div>

          <div className={`space-y-2 pb-4 ${theme === "dark" ? "border-slate-700" : "border-slate-300"} border-b`}>
            <h3 className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
              {t.cropInformation}
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.cropType}</p>
                <p className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>
                  {reportData.cropType}
                </p>
              </div>
              <div>
                <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.affectedArea}</p>
                <p className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>
                  {reportData.affectedArea} acres
                </p>
              </div>
              <div>
                <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.damageType}</p>
                <p className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>
                  {reportData.damageType}
                </p>
              </div>
              <div>
                <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.dateReported}</p>
                <p className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>
                  {reportData.dateOfDamage}
                </p>
              </div>
            </div>
          </div>

          <div className={`space-y-2 pb-4 ${theme === "dark" ? "border-slate-700" : "border-slate-300"} border-b`}>
            <h3 className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
              {t.damageAssessment}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.damageSeverity}</span>
                <span className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>
                  {reportData.aiAnalysis.severity}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.aiConfidence}</span>
                <span className="text-green-400 font-medium">{reportData.aiAnalysis.confidence}</span>
              </div>
              <div className="flex justify-between">
                <span className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.estimatedLoss}</span>
                <span className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>
                  {reportData.aiAnalysis.estimatedLoss}
                </span>
              </div>
            </div>
          </div>

          <div className={`space-y-2 pb-4 ${theme === "dark" ? "border-slate-700" : "border-slate-300"} border-b`}>
            <h3 className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
              {t.evidenceData}
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <p className={`${theme === "dark" ? "text-slate-400" : "text-slate-600"} mb-1`}>
                  {t.geotagLocationData}
                </p>
                <p className={theme === "dark" ? "text-white" : "text-slate-900"}>
                  Lat: {reportData.latitude} | Long: {reportData.longitude}
                </p>
              </div>
              <div>
                <p className={`${theme === "dark" ? "text-slate-400" : "text-slate-600"} mb-1`}>
                  {t.weatherConditions}
                </p>
                <p className={theme === "dark" ? "text-white" : "text-slate-900"}>
                  Rainfall: {reportData.weatherData.rainfall} | Temp: {reportData.weatherData.temperature} | Wind:{" "}
                  {reportData.weatherData.windSpeed}
                </p>
              </div>
              <div>
                <p className={`${theme === "dark" ? "text-slate-400" : "text-slate-600"} mb-1`}>
                  {t.satelliteAnalysis}
                </p>
                <p className={theme === "dark" ? "text-white" : "text-slate-900"}>
                  NDVI: {reportData.satelliteData.ndvi} (Healthy: 0.6-0.8) | Coverage:{" "}
                  {reportData.satelliteData.coverage}
                </p>
              </div>
              <div>
                <p className={`${theme === "dark" ? "text-slate-400" : "text-slate-600"} mb-1`}>
                  {t.photoAnalysisLabel}
                </p>
                <p className={theme === "dark" ? "text-white" : "text-slate-900"}>
                  {reportData.photos.length} high-quality photos analyzed | Damage pattern confirmed
                </p>
              </div>
            </div>
          </div>

          {reportData.aiReport && (
            <div className={`space-y-2 pb-4 ${theme === "dark" ? "border-slate-700" : "border-slate-300"} border-b`}>
              <h3 className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                {t.aiGeneratedReport}
              </h3>
              <div
                className={`${theme === "dark" ? "bg-slate-900" : "bg-slate-50"} rounded-lg p-3 text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-700"} max-h-96 overflow-y-auto`}
              >
                <div className="whitespace-pre-wrap text-xs leading-relaxed font-mono">{reportData.aiReport}</div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <button
            onClick={() => {
              openModal(t.reportDownloaded, t.reportDownloadedMsg, "success")
              setTimeout(() => closeModal(), 1500)
            }}
            className={`w-full ${theme === "dark" ? "bg-slate-800 border-slate-700 hover:border-cyan-500" : "bg-slate-100 border-slate-300 hover:border-cyan-500"} border py-3 rounded-lg font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"} transition flex items-center justify-center gap-2`}
          >
            <Download className="w-5 h-5" />
            {t.downloadReport}
          </button>
          <button
            onClick={() => {
              openModal(t.reportShared, t.reportSharedMsg, "success")
              setTimeout(() => closeModal(), 1500)
            }}
            className={`w-full ${theme === "dark" ? "bg-slate-800 border-slate-700 hover:border-cyan-500" : "bg-slate-100 border-slate-300 hover:border-cyan-500"} border py-3 rounded-lg font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"} transition flex items-center justify-center gap-2`}
          >
            <Share2 className="w-5 h-5" />
            {t.shareReport}
          </button>
          <button
            onClick={() => {
              setShowSubmissionConfirmation(true)
            }}
            className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            {t.submitReport}
          </button>
        </div>
      </div>

      {showSubmissionConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-slate-300"} border rounded-lg p-6 max-w-sm w-full space-y-4`}
          >
            <h2 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              {t.submitReportConfirm}
            </h2>
            <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.confirmSubmit}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowSubmissionConfirmation(false)}
                className={`flex-1 ${theme === "dark" ? "bg-slate-700 hover:bg-slate-600" : "bg-slate-300 hover:bg-slate-400"} ${theme === "dark" ? "text-white" : "text-slate-900"} py-2 rounded-lg font-semibold transition`}
              >
                {t.cancel}
              </button>
              <button
                onClick={() => {
                  setShowSubmissionConfirmation(false)
                  openModal(t.reportSubmitted, t.reportSuccess, "success")
                  setTimeout(() => {
                    closeModal()
                    setCurrentScreen("home")
                  }, 2000)
                }}
                className="flex-1 bg-cyan-500 text-white py-2 rounded-lg font-semibold hover:bg-cyan-600 transition"
              >
                {t.submit}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // MODAL COMPONENT
  const Modal = () =>
    showModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div
          className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-slate-300"} border rounded-lg p-6 max-w-sm w-full space-y-4`}
        >
          <h2 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            {modalData.title}
          </h2>
          <p className={`${theme === "dark" ? "text-slate-400" : "text-slate-600"} whitespace-pre-line`}>
            {modalData.message}
          </p>
          <button
            onClick={closeModal}
            className="w-full bg-cyan-500 text-white py-2 rounded-lg font-semibold hover:bg-cyan-600 transition"
          >
            {t.ok}
          </button>
        </div>
      </div>
    )

  const BottomNav = () => (
    <div
      className={`fixed bottom-0 left-0 right-0 ${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-slate-300"} border-t px-4 py-3 flex justify-between items-center`}
    >
      <div className="flex justify-around flex-1">
        <button
          onClick={() => setCurrentScreen("home")}
          className={`flex flex-col items-center gap-1 ${currentScreen === "home" ? "text-cyan-400" : theme === "dark" ? "text-slate-400" : "text-slate-600"}`}
        >
          <Home className="w-5 h-5" />
          <span className="text-xs">{t.home}</span>
        </button>
        <button
          onClick={() => setCurrentScreen("report-damage")}
          className={`flex flex-col items-center gap-1 ${["report-damage", "camera-capture", "report-cause", "data-gathering", "comprehensive-report"].includes(currentScreen) ? "text-cyan-400" : theme === "dark" ? "text-slate-400" : "text-slate-600"}`}
        >
          <FileText className="w-5 h-5" />
          <span className="text-xs">{t.report}</span>
        </button>
        {/* Removed Gallery button */}
        <button
          onClick={() => setCurrentScreen("marketplace-rates")}
          className={`flex flex-col items-center gap-1 ${currentScreen === "marketplace-rates" ? "text-cyan-400" : theme === "dark" ? "text-slate-400" : "text-slate-600"}`}
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="text-xs">{t.market}</span>
        </button>
        <button
          onClick={() => setCurrentScreen("ledger")}
          className={`flex flex-col items-center gap-1 ${currentScreen === "ledger" ? "text-cyan-400" : theme === "dark" ? "text-slate-400" : "text-slate-600"}`}
        >
          <DollarSign className="w-5 h-5" />
          <span className="text-xs">{t.ledger || "Ledger"}</span>
        </button>
        <button
          onClick={() => setCurrentScreen("insurance")}
          className={`flex flex-col items-center gap-1 ${currentScreen === "insurance" ? "text-cyan-400" : theme === "dark" ? "text-slate-400" : "text-slate-600"}`}
        >
          <Shield className="w-5 h-5" />
          <span className="text-xs">{t.insurance || "Insurance"}</span>
        </button>
      </div>
      <div className={`relative ml-4 ${theme === "dark" ? "border-slate-700" : "border-slate-300"} border-l pl-4`}>
        <button
          onClick={() => setShowThemeLanguageMenu(!showThemeLanguageMenu)}
          className={`p-2 ${theme === "dark" ? "hover:bg-slate-700" : "hover:bg-slate-200"} rounded-lg transition ${theme === "dark" ? "text-slate-400 hover:text-cyan-400" : "text-slate-600 hover:text-cyan-400"}`}
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
        {showThemeLanguageMenu && (
          <div
            className={`absolute bottom-full right-0 mb-2 ${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-slate-300"} border rounded-lg shadow-lg z-50 min-w-48`}
          >
            {/* Theme Section */}
            <div className={`${theme === "dark" ? "border-slate-700" : "border-slate-300"} border-b px-4 py-3`}>
              <p className={`text-xs font-semibold mb-2 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                Theme
              </p>
              <button
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark")
                }}
                className={`w-full text-left px-3 py-2 text-sm rounded ${theme === "dark" ? "bg-slate-700 text-white hover:bg-slate-600" : "bg-slate-100 text-slate-900 hover:bg-slate-200"} transition`}
              >
                {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>
            </div>
            {/* Language Section */}
            <div className="px-4 py-3">
              <p className={`text-xs font-semibold mb-2 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                Language
              </p>
              {(["en", "hi", "pa"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang)
                    setShowThemeLanguageMenu(false)
                  }}
                  className={`block w-full text-left px-3 py-2 text-sm rounded mb-1 ${
                    language === lang
                      ? "bg-cyan-500/20 text-cyan-400"
                      : theme === "dark"
                        ? "text-slate-300 hover:bg-slate-700"
                        : "text-slate-700 hover:bg-slate-100"
                  } transition`}
                >
                  {lang === "en" ? "English" : lang === "hi" ? "हिंदी" : "ਪੰਜਾਬੀ"}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  // MARKETPLACE SCREEN
  const MarketplaceScreen = () => (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900" : "bg-white"} pb-24`}>
      <div
        className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border-b p-4`}
      >
        <h1 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{t.marketplace}</h1>
        <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t.buySupplies}</p>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "Flood-Resistant Wheat Seeds", price: "₹450/kg", discount: "20% off" },
            { name: "Fungicide Treatment", price: "₹350/liter", discount: "15% off" },
            { name: "Drip Irrigation Kit", price: "₹2,500", discount: "Free delivery" },
            { name: "Organic Fertilizer", price: "₹200/kg", discount: "10% off" },
            { name: "Pest Control Spray", price: "₹150/liter", discount: "5% off" },
            { name: "Soil Testing Kit", price: "₹800", discount: "Free shipping" },
          ].map((item, i) => (
            <div
              key={i}
              className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg p-3 space-y-2`}
            >
              <div className="flex items-start justify-between gap-2">
                <h3
                  className={`font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"} text-sm line-clamp-2`}
                >
                  {item.name}
                </h3>
                <span className="text-xs bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded whitespace-nowrap flex-shrink-0">
                  {item.discount}
                </span>
              </div>
              <p className="text-cyan-400 font-bold text-sm">{item.price}</p>
              <button className="w-full bg-cyan-500 text-white py-1.5 rounded text-xs font-semibold hover:bg-cyan-600 transition">
                {t.addCart}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // MANDI RATES SCREEN
  const MandiRatesScreen = () => (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900" : "bg-white"} pb-24`}>
      <div
        className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border-b p-4`}
      >
        <h1 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{t.mandiRates}</h1>
        <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t.currentPrices}</p>
      </div>
      <div className="p-4 space-y-3">
        {[
          { crop: "Wheat", price: "₹2,450", change: "↑5.2%", color: "green" },
          { crop: "Rice", price: "₹3,200", change: "↓2.1%", color: "red" },
          { crop: "Cotton", price: "₹5,800", change: "↑3.5%", color: "green" },
          { crop: "Sugarcane", price: "₹320/quintal", change: "→0%", color: "gray" },
        ].map((item, i) => (
          <div
            key={i}
            className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg p-4`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className={`font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{item.crop}</h3>
                <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t.updatedToday}</p>
              </div>
              <div className="text-right">
                <p className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-bold`}>{item.price}</p>
                <p
                  className={`text-sm ${item.color === "green" ? "text-green-400" : item.color === "red" ? "text-red-400" : theme === "dark" ? "text-slate-400" : "text-slate-600"}`}
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

  // ONBOARDING INTRO SCREEN
  const OnboardingIntroScreen = ({
    onNext,
    theme,
    language,
  }: { onNext: () => void; theme: string; language: string }) => (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900" : "bg-white"} pb-24`}>
      <div
        className={`${theme === "dark" ? "bg-gradient-to-b from-cyan-500/20 to-slate-900 border-slate-700" : "bg-gradient-to-b from-cyan-500/10 to-slate-50 border-slate-200"} border-b p-6 space-y-4`}
      >
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              {t.welcomeBack}
            </h1>
            <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>Nashik District • Oct 24, 2024</p>
          </div>
          <button
            className={`w-10 h-10 rounded-full ${theme === "dark" ? "bg-cyan-500/20 border-cyan-500/50" : "bg-cyan-500/10 border-cyan-500/30"} border flex items-center justify-center hover:${theme === "dark" ? "bg-cyan-500/30" : "bg-cyan-500/20"} transition`}
          >
            <User className="w-5 h-5 text-cyan-400" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div
            className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg p-3 space-y-1`}
          >
            <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t.activeClaims}</p>
            <p className="text-2xl font-bold text-cyan-400">2</p>
            <button
              onClick={() => setCurrentScreen("active-claims")}
              className="text-xs text-cyan-400 hover:text-cyan-300 transition font-medium"
            >
              {t.viewDetails} →
            </button>
          </div>
          <div
            className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg p-3 space-y-1`}
          >
            <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t.approvedClaims}</p>
            <p className="text-2xl font-bold text-green-400">5</p>
            <button
              onClick={() => setCurrentScreen("approved-claims")}
              className="text-xs text-green-400 hover:text-green-300 transition font-medium"
            >
              {t.viewDetails} →
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <button
          onClick={() => {
            openModal(t.startReport, t.proceedingCapture, "info")
            setTimeout(() => {
              closeModal()
              setCurrentScreen("report-damage")
            }, 1500)
          }}
          className="w-full bg-cyan-500 text-white rounded-lg p-4 space-y-2 hover:bg-cyan-600 transition text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">{t.reportCropLoss}</h2>
              <p className="text-sm opacity-90">{t.startNewClaim}</p>
            </div>
            <span>→</span>
          </div>
        </button>

        <button
          onClick={() => setCurrentScreen("scheduled-visits")}
          className={`w-full ${theme === "dark" ? "bg-slate-800 border-slate-700 hover:border-cyan-500" : "bg-slate-100 border-slate-300 hover:border-cyan-500"} border rounded-lg p-4 space-y-2 transition text-left`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                {t.scheduledVisits}
              </h2>
              <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                {t.upcomingInspections}
              </p>
            </div>
            <span className="text-cyan-400">→</span>
          </div>
        </button>

        <div className="space-y-2">
          <h3 className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            {t.recentActivity}
          </h3>
          <div
            className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg p-3 space-y-2`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-full ${theme === "dark" ? "bg-green-500/20" : "bg-green-500/10"} flex items-center justify-center flex-shrink-0`}
              >
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  {t.claimApproved}
                </p>
                <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  {t.hailstormDamage}
                </p>
                <p className="text-xs text-green-400 font-medium">{t.credited}</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            onNext()
            localStorage.setItem("hasSeenOnboarding", "true")
          }}
          className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition"
        >
          {t.home}
        </button>
      </div>
    </div>
  )

  // TUTORIAL VIDEO SCREEN
  const TutorialVideoScreen = ({
    onNext,
    theme,
    language,
  }: { onNext: () => void; theme: string; language: string }) => (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900" : "bg-white"} pb-24`}>
      <div
        className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border-b p-4 sticky top-0 z-10`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen("home")}
            className={`p-2 ${theme === "dark" ? "hover:bg-slate-700" : "hover:bg-slate-200"} rounded-lg transition`}
          >
            <ArrowLeft className="w-5 h-5 text-cyan-400" />
          </button>
          <div>
            <h1 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              {t.activeClaims}
            </h1>
            <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t.trackClaims}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {[
          {
            id: "CLM-001",
            crop: "Wheat",
            area: "2.5 acres",
            damage: "Hailstorm",
            date: "Oct 20, 2024",
            status: t.underReview,
            progress: 65,
          },
          {
            id: "CLM-002",
            crop: "Rice",
            area: "1.8 acres",
            damage: "Flood",
            date: "Oct 18, 2024",
            status: t.verification,
            progress: 40,
          },
        ].map((claim) => (
          <div
            key={claim.id}
            className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg p-4 space-y-3`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-xs font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  {t.claimId}
                </p>
                <p className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{claim.id}</p>
              </div>
              <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">{claim.status}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.cropType}</p>
                <p className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>{claim.crop}</p>
              </div>
              <div>
                <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.affectedArea}</p>
                <p className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>{claim.area}</p>
              </div>
              <div>
                <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.damageType}</p>
                <p className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>{claim.damage}</p>
              </div>
              <div>
                <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.dateReported}</p>
                <p className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>{claim.date}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.processingProgress}</span>
                <span className="text-cyan-400 font-medium">{claim.progress}%</span>
              </div>
              <div className={`w-full ${theme === "dark" ? "bg-slate-700" : "bg-slate-300"} rounded-full h-2`}>
                <div className="bg-cyan-500 h-2 rounded-full transition-all" style={{ width: `${claim.progress}%` }} />
              </div>
            </div>

            <button
              className={`w-full ${theme === "dark" ? "bg-slate-700 hover:bg-slate-600" : "bg-slate-300 hover:bg-slate-400"} ${theme === "dark" ? "text-white" : "text-slate-900"} py-2 rounded-lg text-sm font-medium transition`}
            >
              {t.viewDetails2}
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  // CROP GALLERY SCREEN
  const CropGalleryScreen = () => (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900" : "bg-white"} pb-24`}>
      <div
        className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border-b p-4 sticky top-0 z-10`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen("home")}
            className={`p-2 ${theme === "dark" ? "hover:bg-slate-700" : "hover:bg-slate-200"} rounded-lg transition`}
          >
            <ArrowLeft className="w-5 h-5 text-cyan-400" />
          </button>
          <div>
            <h1 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              {t.approvedClaims}
            </h1>
            <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t.approvedSettled}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {[
          {
            id: "CLM-12345",
            crop: "Wheat",
            area: "2.5 acres",
            damage: "Hailstorm",
            amount: "₹1,25,000",
            date: "Sep 15, 2024",
            status: t.credited2,
          },
          {
            id: "CLM-12344",
            crop: "Cotton",
            area: "3.0 acres",
            damage: "Drought",
            amount: "₹98,500",
            date: "Aug 22, 2024",
            status: t.credited2,
          },
          {
            id: "CLM-12343",
            crop: "Rice",
            area: "1.5 acres",
            damage: "Pest Attack",
            amount: "₹45,000",
            date: "Jul 10, 2024",
            status: t.credited2,
          },
        ].map((claim) => (
          <div
            key={claim.id}
            className={`${theme === "dark" ? "bg-slate-800 border-green-500/20" : "bg-slate-100 border-green-500/30"} border rounded-lg p-4 space-y-3`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-xs font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  {t.claimId}
                </p>
                <p className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{claim.id}</p>
              </div>
              <div className="flex items-center gap-1 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                <CheckCircle2 className="w-3 h-3" />
                {claim.status}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.cropType}</p>
                <p className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>{claim.crop}</p>
              </div>
              <div>
                <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.affectedArea}</p>
                <p className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>{claim.area}</p>
              </div>
              <div>
                <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.damageType}</p>
                <p className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>{claim.damage}</p>
              </div>
              <div>
                <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.settlementDate}</p>
                <p className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>{claim.date}</p>
              </div>
            </div>

            <div className={`${theme === "dark" ? "bg-green-500/10" : "bg-green-500/5"} rounded-lg p-3`}>
              <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"} mb-1`}>
                {t.amountCredited}
              </p>
              <p className="text-2xl font-bold text-green-400">{claim.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const screens: Record<string, React.ReactNode> = {
    "onboarding-intro": <OnboardingIntroScreen onNext={handleTutorialComplete} theme={theme} language={language} />,
    "tutorial-video": <TutorialVideoScreen onNext={handleTutorialComplete} theme={theme} language={language} />,
    home: <HomeScreen />,
    "active-claims": <ActiveClaimsScreen />,
    "approved-claims": <ApprovedClaimsScreen />,
    "scheduled-visits": <ScheduledVisitsScreen />,
    "report-damage": <ReportDamageScreen />,
    "camera-capture": <CameraCaptureScreen />,
    "report-cause": <ReportCauseScreen />,
    "data-gathering": <DataGatheringScreen />,
    "comprehensive-report": <ComprehensiveReportScreen />,
    "crop-gallery": <CropGalleryScreen theme={theme} language={language} />,
    "marketplace-rates": <MarketplaceRatesScreen onNavigate={setCurrentScreen} theme={theme} language={language} />, // Updated key and component
    ledger: <LedgerScreen theme={theme} language={language} />, // Added ledger screen
    insurance: <InsuranceScreen theme={theme} language={language} />,
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900" : "bg-white"} flex flex-col`}>
      {screens[currentScreen] || screens["home"]}
      {hasSeenOnboarding && <BottomNav />}
      {hasSeenOnboarding && <Chatbot theme={theme} language={language} />} {/* Add chatbot */}
      <Modal />
    </div>
  )
}
