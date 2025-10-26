"use client"

import { useState, useRef, useEffect } from "react"
import { Send, X, MessageCircle } from "lucide-react"

interface ChatbotProps {
  theme?: "light" | "dark"
  language?: "en" | "hi" | "pa"
}

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function Chatbot({ theme = "dark", language = "en" }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const translations = {
    en: {
      chatbot: "Farm Assistant",
      placeholder: "Ask about farming...",
      hello:
        "Hello! I am your Farm Assistant. I can help you with crop care, pest management, weather tips, and more. How can I help you today?",
      cropCare: "For crop care, ensure proper watering, use quality seeds, and monitor soil health regularly.",
      pestManagement:
        "Use organic pesticides when possible, rotate crops, and maintain field hygiene to prevent pest infestations.",
      weather: "Check local weather forecasts regularly. Adjust irrigation based on rainfall and temperature.",
      irrigation: "Water your crops early morning or late evening. Avoid watering during peak heat.",
      fertilizer: "Use balanced fertilizers. Conduct soil tests to determine nutrient requirements.",
      default:
        "I can help with crop care, pest management, weather tips, irrigation, and fertilizer advice. Please ask a specific question.",
    },
    hi: {
      chatbot: "खेत सहायक",
      placeholder: "खेती के बारे में पूछें...",
      hello:
        "नमस्ते! मैं आपका खेत सहायक हूँ। मैं फसल की देखभाल, कीट प्रबंधन, मौसम की सलाह और बहुत कुछ में आपकी मदद कर सकता हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?",
      cropCare:
        "फसल की देखभाल के लिए, उचित सिंचाई सुनिश्चित करें, गुणवत्ता वाले बीज का उपयोग करें, और नियमित रूप से मिट्टी के स्वास्थ्य की निगरानी करें।",
      pestManagement:
        "जहाँ संभव हो जैविक कीटनाशकों का उपयोग करें, फसलों को घुमाएं, और कीट संक्रमण को रोकने के लिए खेत की स्वच्छता बनाए रखें।",
      weather: "नियमित रूप से स्थानीय मौसम पूर्वानुमान जांचें। वर्षा और तापमान के आधार पर सिंचाई को समायोजित करें।",
      irrigation: "अपनी फसलों को सुबह जल्दी या शाम को देर से पानी दें। चरम गर्मी के दौरान पानी देने से बचें।",
      fertilizer: "संतुलित उर्वरक का उपयोग करें। पोषक तत्वों की आवश्यकता निर्धारित करने के लिए मिट्टी परीक्षण करें।",
      default: "मैं फसल की देखभाल, कीट प्रबंधन, मौसम की सलाह, सिंचाई, और उर्वरक सलाह में मदद कर सकता हूँ। कृपया एक विशिष्ट प्रश्न पूछें।",
    },
    pa: {
      chatbot: "ਖੇਤ ਸਹਾਇਕ",
      placeholder: "ਖੇਤੀ ਬਾਰੇ ਪੁੱਛੋ...",
      hello:
        "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਖੇਤ ਸਹਾਇਕ ਹਾਂ। ਮੈਂ ਫਸਲ ਦੀ ਦੇਖਭਾਲ, ਕੀਟ ਪ੍ਰਬੰਧਨ, ਮੌਸਮ ਦੀ ਸਲਾਹ ਅਤੇ ਹੋਰ ਬਹੁਤ ਕੁਝ ਵਿੱਚ ਤੁਹਾਡੀ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ। ਮੈਂ ਅੱਜ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?",
      cropCare:
        "ਫਸਲ ਦੀ ਦੇਖਭਾਲ ਲਈ, ਸਹੀ ਸਿੰਚਾਈ ਯਕੀਨੀ ਬਣਾਓ, ਗੁਣਵੱਤਾ ਵਾਲੇ ਬੀਜ ਦੀ ਵਰਤੋਂ ਕਰੋ, ਅਤੇ ਨਿਯਮਿਤ ਤੌਰ ਤੇ ਮਿੱਟੀ ਦੀ ਸਿਹਤ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ।",
      pestManagement: "ਜਿੱਥੇ ਸੰਭਵ ਹੋ ਜੈਵਿਕ ਕੀਟਨਾਸ਼ਕਾਂ ਦੀ ਵਰਤੋਂ ਕਰੋ, ਫਸਲਾਂ ਨੂੰ ਘੁਮਾਓ, ਅਤੇ ਕੀਟ ਸੰਕ੍ਰਮਣ ਨੂੰ ਰੋਕਣ ਲਈ ਖੇਤ ਦੀ ਸਫਾਈ ਬਣਾਈ ਰੱਖੋ।",
      weather: "ਨਿਯਮਿਤ ਤੌਰ ਤੇ ਸਥਾਨਕ ਮੌਸਮ ਦੀ ਭਵਿੱਖਬਾਣੀ ਜਾਂਚੋ। ਮੀਂਹ ਅਤੇ ਤਾਪਮਾਨ ਦੇ ਆਧਾਰ ਤੇ ਸਿੰਚਾਈ ਨੂੰ ਸਮਾਯੋਜਿਤ ਕਰੋ।",
      irrigation: "ਆਪਣੀ ਫਸਲਾਂ ਨੂੰ ਸਵੇਰੇ ਜਲਦੀ ਜਾਂ ਸ਼ਾਮ ਨੂੰ ਦੇਰ ਨਾਲ ਪਾਣੀ ਦਿਓ। ਸਿਖਰ ਗਰਮੀ ਦੌਰਾਨ ਪਾਣੀ ਦੇਣ ਤੋਂ ਬਚੋ।",
      fertilizer: "ਸੰਤੁਲਿਤ ਖਾਦ ਦੀ ਵਰਤੋਂ ਕਰੋ। ਪੋਸ਼ਕ ਤੱਤਾਂ ਦੀ ਲੋੜ ਨਿਰਧਾਰਤ ਕਰਨ ਲਈ ਮਿੱਟੀ ਦੀ ਜਾਂਚ ਕਰੋ।",
      default:
        "ਮੈਂ ਫਸਲ ਦੀ ਦੇਖਭਾਲ, ਕੀਟ ਪ੍ਰਬੰਧਨ, ਮੌਸਮ ਦੀ ਸਲਾਹ, ਸਿੰਚਾਈ, ਅਤੇ ਖਾਦ ਦੀ ਸਲਾਹ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ। ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਖਾਸ ਸਵਾਲ ਪੁੱਛੋ।",
    },
  }

  const t = translations[language as keyof typeof translations] || translations.en

  const getBotResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase()
    if (msg.includes("crop") || msg.includes("फसल") || msg.includes("ਫਸਲ")) return t.cropCare
    if (msg.includes("pest") || msg.includes("कीट") || msg.includes("ਕੀਟ")) return t.pestManagement
    if (msg.includes("weather") || msg.includes("मौसम") || msg.includes("ਮੌਸਮ")) return t.weather
    if (msg.includes("water") || msg.includes("सिंचाई") || msg.includes("ਸਿੰਚਾਈ")) return t.irrigation
    if (msg.includes("fertilizer") || msg.includes("उਰ्वਰक") || msg.includes("ਖਾਦ")) return t.fertilizer
    return t.default
  }

  const handleSendMessage = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(input),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 500)
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "0",
        text: t.hello,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen])

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-full shadow-lg transition z-40"
        title={t.chatbot}
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    )
  }

  return (
    <div
      className={`fixed bottom-24 right-4 w-80 h-96 ${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-slate-300"} border rounded-lg shadow-xl flex flex-col z-40`}
    >
      {/* Header */}
      <div
        className={`${theme === "dark" ? "bg-slate-700 border-slate-600" : "bg-slate-100 border-slate-200"} border-b px-4 py-3 flex justify-between items-center`}
      >
        <h3 className={`font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{t.chatbot}</h3>
        <button
          onClick={() => setIsOpen(false)}
          className={`p-1 ${theme === "dark" ? "hover:bg-slate-600" : "hover:bg-slate-200"} rounded transition`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-3 ${theme === "dark" ? "bg-slate-800" : "bg-white"}`}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                msg.sender === "user"
                  ? "bg-cyan-500 text-white"
                  : theme === "dark"
                    ? "bg-slate-700 text-slate-100"
                    : "bg-slate-100 text-slate-900"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        className={`${theme === "dark" ? "bg-slate-700 border-slate-600" : "bg-slate-50 border-slate-200"} border-t px-3 py-3 flex gap-2`}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder={t.placeholder}
          className={`flex-1 px-3 py-2 rounded-lg text-sm ${theme === "dark" ? "bg-slate-600 text-white border-slate-500" : "bg-white text-slate-900 border-slate-300"} border`}
        />
        <button
          onClick={handleSendMessage}
          className="bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded-lg transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
