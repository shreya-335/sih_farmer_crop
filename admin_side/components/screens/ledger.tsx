"use client"

import { Plus, TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react"
import { useState } from "react"

interface LedgerEntry {
  id: string
  type: "income" | "expense"
  category: string
  amount: number
  date: string
  description: string
}

interface LedgerProps {
  theme: string
  language: string
}

const translations = {
  en: {
    ledger: "Ledger",
    manageFinances: "Manage your spending, expenses & earnings",
    income: "Income",
    expense: "Expense",
    totalIncome: "Total Income",
    totalExpense: "Total Expense",
    netBalance: "Net Balance",
    addEntry: "Add Entry",
    recentTransactions: "Recent Transactions",
    noTransactions: "No transactions yet",
    seedCost: "Seed Cost",
    fertilizerCost: "Fertilizer Cost",
    pesticides: "Pesticides",
    laborCost: "Labor Cost",
    equipment: "Equipment Rental",
    cropSale: "Crop Sale",
    subsidyReceived: "Subsidy Received",
    insuranceClaim: "Insurance Claim",
  },
  hi: {
    ledger: "खाता बही",
    manageFinances: "अपने खर्च, व्यय और आय का प्रबंधन करें",
    income: "आय",
    expense: "व्यय",
    totalIncome: "कुल आय",
    totalExpense: "कुल व्यय",
    netBalance: "शुद्ध शेष",
    addEntry: "प्रविष्टि जोड़ें",
    recentTransactions: "हाल के लेनदेन",
    noTransactions: "अभी कोई लेनदेन नहीं",
    seedCost: "बीज की लागत",
    fertilizerCost: "उर्वरक की लागत",
    pesticides: "कीटनाशक",
    laborCost: "श्रम लागत",
    equipment: "उपकरण किराया",
    cropSale: "फसल बिक्रय",
    subsidyReceived: "सब्सिडी प्राप्त",
    insuranceClaim: "बीमा दावा",
  },
  pa: {
    ledger: "ਲੇਜਰ",
    manageFinances: "ਆਪਣੇ ਖਰਚ, ਖਰਚ ਅਤੇ ਆਮਦਨ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ",
    income: "ਆਮਦਨ",
    expense: "ਖਰਚ",
    totalIncome: "ਕੁੱਲ ਆਮਦਨ",
    totalExpense: "ਕੁੱਲ ਖਰਚ",
    netBalance: "ਸ਼ੁੱਧ ਸੰਤੁਲਨ",
    addEntry: "ਪ੍ਰਵਿਸ਼ਟੀ ਜੋੜੋ",
    recentTransactions: "ਹਾਲ ਦੇ ਲੈਣ-ਦੇਣ",
    noTransactions: "ਅਜੇ ਕੋਈ ਲੈਣ-ਦੇਣ ਨਹੀਂ",
    seedCost: "ਬੀਜ ਦੀ ਲਾਗਤ",
    fertilizerCost: "ਖਾਦ ਦੀ ਲਾਗਤ",
    pesticides: "ਕੀਟਨਾਸ਼ਕ",
    laborCost: "ਮਜ਼ਦੂਰੀ ਲਾਗਤ",
    equipment: "ਸਾਜ਼ੋ-ਸਾਮਾਨ ਕਿਰਾਇਆ",
    cropSale: "ਫਸਲ ਦੀ ਵਿਕਰੀ",
    subsidyReceived: "ਸਬਸਿਡੀ ਪ੍ਰਾਪਤ",
    insuranceClaim: "ਬੀਮਾ ਦਾਅਵਾ",
  },
}

const dummyEntries: LedgerEntry[] = [
  {
    id: "1",
    type: "expense",
    category: "Seed Cost",
    amount: 5000,
    date: "2024-10-20",
    description: "Wheat seeds for 2 hectares",
  },
  {
    id: "2",
    type: "expense",
    category: "Fertilizer Cost",
    amount: 3500,
    date: "2024-10-18",
    description: "NPK fertilizer application",
  },
  {
    id: "3",
    type: "income",
    category: "Crop Sale",
    amount: 45000,
    date: "2024-10-15",
    description: "Sold 15 bags of wheat",
  },
  {
    id: "4",
    type: "expense",
    category: "Labor Cost",
    amount: 2000,
    date: "2024-10-12",
    description: "Field preparation labor",
  },
  {
    id: "5",
    type: "income",
    category: "Subsidy Received",
    amount: 8000,
    date: "2024-10-10",
    description: "Government crop subsidy",
  },
  {
    id: "6",
    type: "expense",
    category: "Pesticides",
    amount: 1200,
    date: "2024-10-08",
    description: "Pest control spray",
  },
]

export default function LedgerScreen({ theme, language }: LedgerProps) {
  const t = translations[language as keyof typeof translations] || translations.en
  const [entries, setEntries] = useState<LedgerEntry[]>(dummyEntries)

  const totalIncome = entries.filter((e) => e.type === "income").reduce((sum, e) => sum + e.amount, 0)
  const totalExpense = entries.filter((e) => e.type === "expense").reduce((sum, e) => sum + e.amount, 0)
  const netBalance = totalIncome - totalExpense

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900" : "bg-white"} pb-24`}>
      {/* Header */}
      <div
        className={`${theme === "dark" ? "bg-gradient-to-b from-cyan-500/20 to-slate-900 border-slate-700" : "bg-gradient-to-b from-cyan-500/10 to-slate-50 border-slate-200"} border-b p-6 space-y-4`}
      >
        <div className="flex items-center gap-3">
          <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{t.ledger}</h1>
        </div>
        <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.manageFinances}</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div
            className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg p-3 space-y-1`}
          >
            <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t.totalIncome}</p>
            <p className="text-lg font-bold text-green-400">₹{totalIncome.toLocaleString()}</p>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div
            className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg p-3 space-y-1`}
          >
            <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t.totalExpense}</p>
            <p className="text-lg font-bold text-red-400">₹{totalExpense.toLocaleString()}</p>
            <TrendingDown className="w-4 h-4 text-red-400" />
          </div>
          <div
            className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg p-3 space-y-1`}
          >
            <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t.netBalance}</p>
            <p className={`text-lg font-bold ${netBalance >= 0 ? "text-green-400" : "text-red-400"}`}>
              ₹{netBalance.toLocaleString()}
            </p>
            <DollarSign className="w-4 h-4 text-cyan-400" />
          </div>
        </div>

        {/* Add Entry Button */}
        <button
          className={`w-full ${theme === "dark" ? "bg-cyan-500/20 border-cyan-500/50 hover:bg-cyan-500/30" : "bg-cyan-500/10 border-cyan-500/30 hover:bg-cyan-500/20"} border rounded-lg p-3 flex items-center justify-center gap-2 transition text-cyan-400 font-medium`}
        >
          <Plus className="w-4 h-4" />
          {t.addEntry}
        </button>

        {/* Transactions List */}
        <div className="space-y-2">
          <h3 className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            {t.recentTransactions}
          </h3>
          {entries.length > 0 ? (
            <div className="space-y-2">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg p-3 flex items-center justify-between`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className={`w-10 h-10 rounded-full ${entry.type === "income" ? (theme === "dark" ? "bg-green-500/20" : "bg-green-500/10") : theme === "dark" ? "bg-red-500/20" : "bg-red-500/10"} flex items-center justify-center`}
                    >
                      {entry.type === "income" ? (
                        <TrendingUp
                          className={`w-5 h-5 ${entry.type === "income" ? "text-green-400" : "text-red-400"}`}
                        />
                      ) : (
                        <TrendingDown
                          className={`w-5 h-5 ${entry.type === "income" ? "text-green-400" : "text-red-400"}`}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                        {entry.category}
                      </p>
                      <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                        {entry.description}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                        <Calendar className="w-3 h-3" />
                        {entry.date}
                      </div>
                    </div>
                  </div>
                  <p className={`text-lg font-bold ${entry.type === "income" ? "text-green-400" : "text-red-400"}`}>
                    {entry.type === "income" ? "+" : "-"}₹{entry.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div
              className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg p-6 text-center`}
            >
              <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.noTransactions}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
