"use client"

import { useState } from "react"
import { Plus, ExternalLink, FileText } from "lucide-react"

interface InsuranceScreenProps {
  theme?: "light" | "dark"
  language?: "en" | "hi" | "pa"
}

export default function InsuranceScreen({ theme = "dark", language = "en" }: InsuranceScreenProps) {
  const [showAddPolicy, setShowAddPolicy] = useState(false)
  const [policyId, setPolicyId] = useState("")
  const [policies, setPolicies] = useState([
    {
      id: "POL-2024-001",
      type: "PMFBY",
      status: "Active",
      premium: "₹500",
      coverage: "₹50,000",
      startDate: "2024-06-01",
      endDate: "2025-05-31",
    },
    {
      id: "POL-2023-045",
      type: "PMFBY",
      status: "Expired",
      premium: "₹450",
      coverage: "₹45,000",
      startDate: "2023-06-01",
      endDate: "2024-05-31",
    },
  ])

  const translations = {
    en: {
      insurance: "Insurance",
      activeApplications: "Active Applications",
      buyInsurance: "Buy Insurance",
      addNewPolicy: "Add New Policy",
      policyId: "Policy ID",
      status: "Status",
      premium: "Premium",
      coverage: "Coverage",
      startDate: "Start Date",
      endDate: "End Date",
      type: "Type",
      claimStatus: "Claim Status",
      noClaims: "No claims filed",
      addPolicy: "Add Policy",
      cancel: "Cancel",
      enterPolicyId: "Enter Policy ID",
      policyAdded: "Policy added successfully",
      redirecting: "Redirecting to PMFBY...",
    },
    hi: {
      insurance: "बीमा",
      activeApplications: "सक्रिय आवेदन",
      buyInsurance: "बीमा खरीदें",
      addNewPolicy: "नई नीति जोड़ें",
      policyId: "नीति आईडी",
      status: "स्थिति",
      premium: "प्रीमियम",
      coverage: "कवरेज",
      startDate: "शुरुआत की तारीख",
      endDate: "समाप्ति की तारीख",
      type: "प्रकार",
      claimStatus: "दावा स्थिति",
      noClaims: "कोई दावा दायर नहीं",
      addPolicy: "नीति जोड़ें",
      cancel: "रद्द करें",
      enterPolicyId: "नीति आईडी दर्ज करें",
      policyAdded: "नीति सफलतापूर्वक जोड़ी गई",
      redirecting: "PMFBY पर रीडायरेक्ट किया जा रहा है...",
    },
    pa: {
      insurance: "ਬੀਮਾ",
      activeApplications: "ਸਕਿਰਿਆ ਅਰਜ਼ੀਆਂ",
      buyInsurance: "ਬੀਮਾ ਖਰੀਦੋ",
      addNewPolicy: "ਨਵੀ ਪਾਲਿਸੀ ਜੋੜੋ",
      policyId: "ਪਾਲਿਸੀ ਆਈਡੀ",
      status: "ਸਥਿਤੀ",
      premium: "ਪ੍ਰੀਮੀਅਮ",
      coverage: "ਕਵਰੇਜ",
      startDate: "ਸ਼ੁਰੂ ਤਾਰੀਖ",
      endDate: "ਸਮਾਪਤੀ ਤਾਰੀਖ",
      type: "ਕਿਸਮ",
      claimStatus: "ਦਾਅਵਾ ਸਥਿਤੀ",
      noClaims: "ਕੋਈ ਦਾਅਵਾ ਦਾਖਲ ਨਹੀਂ",
      addPolicy: "ਪਾਲਿਸੀ ਜੋੜੋ",
      cancel: "ਰੱਦ ਕਰੋ",
      enterPolicyId: "ਪਾਲਿਸੀ ਆਈਡੀ ਦਰਜ ਕਰੋ",
      policyAdded: "ਪਾਲਿਸੀ ਸਫਲਤਾਪੂਰਵਕ ਜੋੜੀ ਗਈ",
      redirecting: "PMFBY ਵਿੱਚ ਰੀਡਾਇਰੈਕਟ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...",
    },
  }

  const t = translations[language as keyof typeof translations] || translations.en

  const handleAddPolicy = () => {
    if (policyId.trim()) {
      const newPolicy = {
        id: policyId,
        type: "PMFBY",
        status: "Active",
        premium: "₹500",
        coverage: "₹50,000",
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      }
      setPolicies([newPolicy, ...policies])
      setPolicyId("")
      setShowAddPolicy(false)
    }
  }

  const handleBuyInsurance = () => {
    window.open("https://pmfby.gov.in/", "_blank")
  }

  return (
    <div className={`min-h-screen pb-24 ${theme === "dark" ? "bg-slate-900" : "bg-white"}`}>
      <div
        className={`sticky top-0 z-40 ${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"} border-b px-4 py-4`}
      >
        <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{t.insurance}</h1>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleBuyInsurance}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition"
          >
            <ExternalLink className="w-4 h-4" />
            {t.buyInsurance}
          </button>
          <button
            onClick={() => setShowAddPolicy(true)}
            className={`${theme === "dark" ? "bg-slate-700 hover:bg-slate-600 text-white" : "bg-slate-200 hover:bg-slate-300 text-slate-900"} font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition`}
          >
            <Plus className="w-4 h-4" />
            {t.addNewPolicy}
          </button>
        </div>

        {/* Add Policy Modal */}
        {showAddPolicy && (
          <div
            className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"} border rounded-lg p-4 space-y-3`}
          >
            <input
              type="text"
              placeholder={t.enterPolicyId}
              value={policyId}
              onChange={(e) => setPolicyId(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg ${theme === "dark" ? "bg-slate-700 text-white border-slate-600" : "bg-white text-slate-900 border-slate-300"} border`}
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddPolicy}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-lg transition"
              >
                {t.addPolicy}
              </button>
              <button
                onClick={() => setShowAddPolicy(false)}
                className={`flex-1 ${theme === "dark" ? "bg-slate-700 hover:bg-slate-600 text-white" : "bg-slate-200 hover:bg-slate-300 text-slate-900"} font-semibold py-2 rounded-lg transition`}
              >
                {t.cancel}
              </button>
            </div>
          </div>
        )}

        {/* Active Policies */}
        <div>
          <h2 className={`text-lg font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            {t.activeApplications}
          </h2>
          <div className="space-y-3">
            {policies.map((policy) => (
              <div
                key={policy.id}
                className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"} border rounded-lg p-4`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className={`font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{policy.id}</p>
                    <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{policy.type}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      policy.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {policy.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                  <div>
                    <p className={`${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t.premium}</p>
                    <p className={`font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                      {policy.premium}
                    </p>
                  </div>
                  <div>
                    <p className={`${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t.coverage}</p>
                    <p className={`font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                      {policy.coverage}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className={`${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t.startDate}</p>
                    <p className={`font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                      {policy.startDate}
                    </p>
                  </div>
                  <div>
                    <p className={`${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t.endDate}</p>
                    <p className={`font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                      {policy.endDate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Claim Status */}
        <div
          className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"} border rounded-lg p-4`}
        >
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h3 className={`font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{t.claimStatus}</h3>
          </div>
          <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t.noClaims}</p>
        </div>
      </div>
    </div>
  )
}
