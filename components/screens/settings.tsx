"use client"

import { ArrowLeft, Globe, Bell, Lock, HelpCircle, LogOut, ChevronRight, Check } from "lucide-react"
import { useState } from "react"

interface SettingsProps {
  onNavigate: (screen: string) => void
  language: string
  setLanguage: (lang: string) => void
}

const translations = {
  en: {
    settings: "Settings",
    language: "Language",
    selectLanguage: "Select Your Language",
    english: "English",
    hindi: "Hindi",
    punjabi: "Punjabi",
    notifications: "Notifications",
    priceAlerts: "Price Alerts",
    claimUpdates: "Claim Updates",
    marketplaceOffers: "Marketplace Offers",
    security: "Security",
    changePassword: "Change Password",
    twoFactor: "Two-Factor Authentication",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    about: "About FarmGuard",
    version: "Version 1.0.0",
    help: "Help & Support",
    contactSupport: "Contact Support",
    faq: "Frequently Asked Questions",
    logout: "Logout",
    account: "Account",
    preferences: "Preferences",
    enabled: "Enabled",
    disabled: "Disabled",
  },
  hi: {
    settings: "सेटिंग्स",
    language: "भाषा",
    selectLanguage: "अपनी भाषा चुनें",
    english: "अंग्रेजी",
    hindi: "हिंदी",
    punjabi: "पंजाबी",
    notifications: "सूचनाएं",
    priceAlerts: "मूल्य सतर्कता",
    claimUpdates: "दावा अपडेट",
    marketplaceOffers: "बाजार प्रस्ताव",
    security: "सुरक्षा",
    changePassword: "पासवर्ड बदलें",
    twoFactor: "दो-कारक प्रमाणीकरण",
    privacy: "गोपनीयता नीति",
    terms: "शर्तें और शर्तें",
    about: "FarmGuard के बारे में",
    version: "संस्करण 1.0.0",
    help: "सहायता और समर्थन",
    contactSupport: "समर्थन से संपर्क करें",
    faq: "अक्सर पूछे जाने वाले प्रश्न",
    logout: "लॉगआउट",
    account: "खाता",
    preferences: "वरीयताएं",
    enabled: "सक्षम",
    disabled: "अक्षम",
  },
  pa: {
    settings: "ਸੈਟਿੰਗਾਂ",
    language: "ਭਾਸ਼ਾ",
    selectLanguage: "ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ",
    english: "ਅੰਗਰੇਜ਼ੀ",
    hindi: "ਹਿੰਦੀ",
    punjabi: "ਪੰਜਾਬੀ",
    notifications: "ਸੂਚਨਾਵਾਂ",
    priceAlerts: "ਕੀਮਤ ਸਤਰਕਤਾ",
    claimUpdates: "ਦਾਅਵਾ ਅਪਡੇਟ",
    marketplaceOffers: "ਬਾਜ਼ਾਰ ਦੀਆਂ ਪੇਸ਼ਕਸ਼ਾਂ",
    security: "ਸੁਰੱਖਿਆ",
    changePassword: "ਪਾਸਵਰਡ ਬਦਲੋ",
    twoFactor: "ਦੋ-ਫੈਕਟਰ ਪ੍ਰਮਾਣਿਕਰਣ",
    privacy: "ਗੋਪਨੀਯਤਾ ਨੀਤੀ",
    terms: "ਸ਼ਰਤਾਂ ਅਤੇ ਸ਼ਰਤਾਂ",
    about: "FarmGuard ਬਾਰੇ",
    version: "ਸੰਸਕਰਣ 1.0.0",
    help: "ਮਦਦ ਅਤੇ ਸਮਰਥਨ",
    contactSupport: "ਸਮਰਥਨ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",
    faq: "ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ",
    logout: "ਲਾਗ ਆਉਟ",
    account: "ਖਾਤਾ",
    preferences: "ਤਰਜੀਹਾਂ",
    enabled: "ਸਮਰਥ",
    disabled: "ਅਸਮਰਥ",
  },
}

export default function Settings({ onNavigate, language, setLanguage }: SettingsProps) {
  const [showLanguageModal, setShowLanguageModal] = useState(false)
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    claimUpdates: true,
    marketplaceOffers: false,
  })

  const t = translations[language as keyof typeof translations] || translations.en

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate("dashboard")} className="p-2 hover:bg-secondary rounded-lg transition">
            <ArrowLeft className="w-5 h-5 text-accent" />
          </button>
          <h1 className="text-xl font-bold text-foreground">{t.settings}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Account Section */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase">{t.account}</h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <span className="text-xl">👨‍🌾</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Rajesh Patil</p>
                  <p className="text-xs text-muted-foreground">Nashik District</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase">{t.preferences}</h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {/* Language */}
            <button
              onClick={() => setShowLanguageModal(true)}
              className="w-full p-4 border-b border-border flex items-center justify-between hover:bg-secondary transition"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-accent" />
                <div className="text-left">
                  <p className="font-medium text-foreground">{t.language}</p>
                  <p className="text-xs text-muted-foreground">
                    {language === "en" ? t.english : language === "hi" ? t.hindi : t.punjabi}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase">{t.notifications}</h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden space-y-0">
            {/* Price Alerts */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-accent" />
                <div className="text-left">
                  <p className="font-medium text-foreground">{t.priceAlerts}</p>
                  <p className="text-xs text-muted-foreground">{notifications.priceAlerts ? t.enabled : t.disabled}</p>
                </div>
              </div>
              <button
                onClick={() => toggleNotification("priceAlerts")}
                className={`w-12 h-6 rounded-full transition ${notifications.priceAlerts ? "bg-accent" : "bg-border"}`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition transform ${notifications.priceAlerts ? "translate-x-6" : "translate-x-0.5"}`}
                />
              </button>
            </div>

            {/* Claim Updates */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-accent" />
                <div className="text-left">
                  <p className="font-medium text-foreground">{t.claimUpdates}</p>
                  <p className="text-xs text-muted-foreground">{notifications.claimUpdates ? t.enabled : t.disabled}</p>
                </div>
              </div>
              <button
                onClick={() => toggleNotification("claimUpdates")}
                className={`w-12 h-6 rounded-full transition ${notifications.claimUpdates ? "bg-accent" : "bg-border"}`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition transform ${notifications.claimUpdates ? "translate-x-6" : "translate-x-0.5"}`}
                />
              </button>
            </div>

            {/* Marketplace Offers */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-accent" />
                <div className="text-left">
                  <p className="font-medium text-foreground">{t.marketplaceOffers}</p>
                  <p className="text-xs text-muted-foreground">
                    {notifications.marketplaceOffers ? t.enabled : t.disabled}
                  </p>
                </div>
              </div>
              <button
                onClick={() => toggleNotification("marketplaceOffers")}
                className={`w-12 h-6 rounded-full transition ${notifications.marketplaceOffers ? "bg-accent" : "bg-border"}`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition transform ${notifications.marketplaceOffers ? "translate-x-6" : "translate-x-0.5"}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase">{t.security}</h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <button className="w-full p-4 border-b border-border flex items-center justify-between hover:bg-secondary transition">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-accent" />
                <p className="font-medium text-foreground">{t.changePassword}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-full p-4 flex items-center justify-between hover:bg-secondary transition">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-accent" />
                <p className="font-medium text-foreground">{t.twoFactor}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase">{t.help}</h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <button className="w-full p-4 border-b border-border flex items-center justify-between hover:bg-secondary transition">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-accent" />
                <p className="font-medium text-foreground">{t.faq}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-full p-4 border-b border-border flex items-center justify-between hover:bg-secondary transition">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-accent" />
                <p className="font-medium text-foreground">{t.contactSupport}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-full p-4 flex items-center justify-between hover:bg-secondary transition">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-accent" />
                <p className="font-medium text-foreground">{t.about}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* About */}
        <div className="bg-secondary border border-border rounded-lg p-4 text-center space-y-1">
          <p className="text-sm font-medium text-foreground">FarmGuard</p>
          <p className="text-xs text-muted-foreground">{t.version}</p>
        </div>

        {/* Logout */}
        <button className="w-full bg-red-500/10 border border-red-500/30 text-red-500 py-3 rounded-lg font-semibold hover:bg-red-500/20 transition flex items-center justify-center gap-2">
          <LogOut className="w-5 h-5" />
          {t.logout}
        </button>
      </div>

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="w-full bg-card rounded-t-lg p-4 space-y-3 max-h-96 overflow-y-auto">
            <h2 className="text-lg font-bold text-foreground">{t.selectLanguage}</h2>

            {[
              { code: "en", name: t.english },
              { code: "hi", name: t.hindi },
              { code: "pa", name: t.punjabi },
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code)
                  setShowLanguageModal(false)
                }}
                className="w-full p-4 bg-secondary border border-border rounded-lg flex items-center justify-between hover:border-accent transition"
              >
                <span className="font-medium text-foreground">{lang.name}</span>
                {language === lang.code && <Check className="w-5 h-5 text-accent" />}
              </button>
            ))}

            <button
              onClick={() => setShowLanguageModal(false)}
              className="w-full p-3 bg-card border border-border rounded-lg font-medium text-foreground hover:bg-secondary transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
