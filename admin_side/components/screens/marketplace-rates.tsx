"use client"

import { ShoppingCart, Star, Search, Filter, Heart, TrendingUp, TrendingDown, Bell, BarChart3 } from "lucide-react"
import { useState } from "react"
import { useModal } from "@/components/providers/modal-provider"

interface MarketplaceRatesProps {
  onNavigate: (screen: string) => void
  theme: string
  language: string
}

const translations = {
  en: {
    marketplace: "Marketplace & Rates",
    searchProducts: "Search products...",
    categories: "Categories",
    all: "All",
    seeds: "Seeds",
    pesticides: "Pesticides",
    fertilizers: "Fertilizers",
    equipment: "Equipment",
    herbicide: "Herbicide",
    productsGrid: "Products",
    mandiRates: "Mandi Rates",
    noProducts: "No products found",
    addToCart: "Add to Cart",
    removeFromCart: "Remove from Cart",
    addedToCart: "Added to Cart",
    removedFromCart: "Removed from Cart",
    addedToFavorites: "Added to Favorites",
    removedFromFavorites: "Removed from Favorites",
    checkout: "Checkout",
    proceedCheckout: "Proceed to Checkout?",
    orderPlaced: "Order Placed!",
    deliveryDays: "Delivery in 2-3 business days",
    featuredDeals: "Featured Deals",
    monsoonSpecial: "Monsoon Season Special",
    monsoonDiscount: "Get 20% off on all flood-resistant seeds and drainage equipment",
    shopNow: "Shop Now",
    itemsInCart: "Items in cart",
    mandiRatesTitle: "Mandi Rates",
    nashikMarket: "Nashik Market - Updated today",
    currentRates:
      "Current market rates for major crops in Nashik Mandi. Prices updated hourly. Set price alerts to get notified.",
    ratesList: "Rates List",
    priceAlerts: "Active Price Alerts",
    sellingTips: "Selling Tips",
    priceHistory: "7-Day Price Trend",
    lowest: "Lowest",
    highest: "Highest",
    quality: "Quality",
    volume: "Volume",
    trend: "Trend",
  },
  hi: {
    marketplace: "बाजार और दरें",
    searchProducts: "उत्पाद खोजें...",
    categories: "श्रेणियां",
    all: "सभी",
    seeds: "बीज",
    pesticides: "कीटनाशक",
    fertilizers: "उर्वरक",
    equipment: "उपकरण",
    herbicide: "शाकनाशी",
    productsGrid: "उत्पाद",
    mandiRates: "मंडी दरें",
    noProducts: "कोई उत्पाद नहीं मिला",
    addToCart: "कार्ट में जोड़ें",
    removeFromCart: "कार्ट से हटाएं",
    addedToCart: "कार्ट में जोड़ा गया",
    removedFromCart: "कार्ट से हटाया गया",
    addedToFavorites: "पसंदीदा में जोड़ा गया",
    removedFromFavorites: "पसंदीदा से हटाया गया",
    checkout: "चेकआउट",
    proceedCheckout: "चेकआउट के लिए आगे बढ़ें?",
    orderPlaced: "ऑर्डर दिया गया!",
    deliveryDays: "2-3 व्यावसायिक दिनों में डिलीवरी",
    featuredDeals: "विशेष सौदे",
    monsoonSpecial: "मानसून सीजन विशेष",
    monsoonDiscount: "सभी बाढ़-प्रतिरोधी बीजों और जल निकासी उपकरण पर 20% छूट पाएं",
    shopNow: "अभी खरीदें",
    itemsInCart: "कार्ट में आइटम",
    mandiRatesTitle: "मंडी दरें",
    nashikMarket: "नाशिक बाजार - आज अपडेट किया गया",
    currentRates: "नाशिक मंडी में प्रमुख फसलों के लिए वर्तमान बाजार दरें। कीमतें प्रति घंटे अपडेट की जाती हैं। मूल्य सतर्कता सेट करें।",
    ratesList: "दरें सूची",
    priceAlerts: "सक्रिय मूल्य सतर्कता",
    sellingTips: "बिक्रय सुझाव",
    priceHistory: "7-दिन की कीमत प्रवृत्ति",
    lowest: "सबसे कम",
    highest: "सबसे अधिक",
    quality: "गुणवत्ता",
    volume: "मात्रा",
    trend: "प्रवृत्ति",
  },
  pa: {
    marketplace: "ਬਾਜ਼ਾਰ ਅਤੇ ਦਰਾਂ",
    searchProducts: "ਉਤਪਾਦ ਖੋਜੋ...",
    categories: "ਸ਼੍ਰੇਣੀਆਂ",
    all: "ਸਭ",
    seeds: "ਬੀਜ",
    pesticides: "ਕੀਟਨਾਸ਼ਕ",
    fertilizers: "ਖਾਦ",
    equipment: "ਸਾਜ਼ੋ-ਸਾਮਾਨ",
    herbicide: "ਘਾਹ ਨਾਸ਼ਕ",
    productsGrid: "ਉਤਪਾਦ",
    mandiRates: "ਮੰਡੀ ਦਰਾਂ",
    noProducts: "ਕੋਈ ਉਤਪਾਦ ਨਹੀਂ ਮਿਲਿਆ",
    addToCart: "ਕਾਰਟ ਵਿੱਚ ਜੋੜੋ",
    removeFromCart: "ਕਾਰਟ ਤੋਂ ਹਟਾਓ",
    addedToCart: "ਕਾਰਟ ਵਿੱਚ ਜੋੜਿਆ ਗਿਆ",
    removedFromCart: "ਕਾਰਟ ਤੋਂ ਹਟਾਇਆ ਗਿਆ",
    addedToFavorites: "ਪਸੰਦਾਂ ਵਿੱਚ ਜੋੜਿਆ ਗਿਆ",
    removedFromFavorites: "ਪਸੰਦਾਂ ਤੋਂ ਹਟਾਇਆ ਗਿਆ",
    checkout: "ਚੈਕਆਊਟ",
    proceedCheckout: "ਚੈਕਆਊਟ ਲਈ ਅੱਗੇ ਵਧੋ?",
    orderPlaced: "ਆਰਡਰ ਦਿੱਤਾ ਗਿਆ!",
    deliveryDays: "2-3 ਕਾਰੋਬਾਰੀ ਦਿਨਾਂ ਵਿੱਚ ਡਿਲੀਵਰੀ",
    featuredDeals: "ਵਿਸ਼ੇਸ਼ ਡੀਲਾਂ",
    monsoonSpecial: "ਮਾਨਸੂਨ ਸੀਜ਼ਨ ਵਿਸ਼ੇਸ਼",
    monsoonDiscount: "ਸਾਰੇ ਬਾੜ-ਰੋਧੀ ਬੀਜਾਂ ਅਤੇ ਡਰੇਨੇਜ ਸਾਜ਼ੋ-ਸਾਮਾਨ 'ਤੇ 20% ਛੂਟ ਪਾਓ",
    shopNow: "ਹੁਣ ਖਰੀਦੋ",
    itemsInCart: "ਕਾਰਟ ਵਿੱਚ ਆਈਟਮਾਂ",
    mandiRatesTitle: "ਮੰਡੀ ਦਰਾਂ",
    nashikMarket: "ਨਾਸ਼ਿਕ ਮਾਰਕੀਟ - ਅੱਜ ਅਪਡੇਟ ਕੀਤਾ ਗਿਆ",
    currentRates: "ਨਾਸ਼ਿਕ ਮੰਡੀ ਵਿੱਚ ਪ੍ਰਮੁੱਖ ਫਸਲਾਂ ਲਈ ਮੌਜੂਦਾ ਮਾਰਕੀਟ ਦਰਾਂ। ਕੀਮਤਾਂ ਪ੍ਰਤੀ ਘੰਟਾ ਅਪਡੇਟ ਕੀਤੀਆਂ ਜਾਂਦੀਆਂ ਹਨ।",
    ratesList: "ਦਰਾਂ ਸੂਚੀ",
    priceAlerts: "ਸਕਿਰਿਆ ਮੂਲ ਸਤਰਕਤਾ",
    sellingTips: "ਵਿਕਰੀ ਸੁਝਾਅ",
    priceHistory: "7-ਦਿਨ ਦੀ ਕੀਮਤ ਰੁਝਾਨ",
    lowest: "ਸਭ ਤੋਂ ਘੱਟ",
    highest: "ਸਭ ਤੋਂ ਵੱਧ",
    quality: "ਗੁਣਵੱਤਾ",
    volume: "ਵਾਲੀਅਮ",
    trend: "ਰੁਝਾਨ",
  },
}

const products = [
  {
    id: 1,
    name: "Bollworm Control Spray",
    category: "Pesticide",
    price: 450,
    rating: 4.5,
    reviews: 128,
    image: "🧪",
    inStock: true,
  },
  {
    id: 2,
    name: "Flood-Resistant Wheat Seeds",
    category: "Seeds",
    price: 2500,
    rating: 4.8,
    reviews: 89,
    image: "🌾",
    inStock: true,
  },
  {
    id: 3,
    name: "Organic Herbicide",
    category: "Herbicide",
    price: 380,
    rating: 4.3,
    reviews: 156,
    image: "🌿",
    inStock: true,
  },
  {
    id: 4,
    name: "Soil Nutrient Mix",
    category: "Fertilizer",
    price: 1200,
    rating: 4.6,
    reviews: 203,
    image: "🥄",
    inStock: true,
  },
  {
    id: 5,
    name: "Drip Irrigation Kit",
    category: "Equipment",
    price: 8500,
    rating: 4.7,
    reviews: 67,
    image: "💧",
    inStock: false,
  },
  {
    id: 6,
    name: "Disease Prevention Powder",
    category: "Pesticide",
    price: 650,
    rating: 4.4,
    reviews: 94,
    image: "💊",
    inStock: true,
  },
]

const rates = [
  {
    crop: "Wheat",
    price: 2450,
    change: 5.2,
    trend: "up",
    volume: "1,250 tons",
    quality: "A Grade",
    priceHistory: [2200, 2250, 2300, 2350, 2400, 2450],
  },
  {
    crop: "Rice",
    price: 3200,
    change: -2.1,
    trend: "down",
    volume: "890 tons",
    quality: "Premium",
    priceHistory: [3400, 3350, 3300, 3250, 3225, 3200],
  },
  {
    crop: "Cotton",
    price: 5800,
    change: 8.3,
    trend: "up",
    volume: "450 tons",
    quality: "Grade A",
    priceHistory: [5200, 5300, 5400, 5600, 5700, 5800],
  },
  {
    crop: "Sugarcane",
    price: 3100,
    change: 1.5,
    trend: "up",
    volume: "2,100 tons",
    quality: "Standard",
    priceHistory: [3000, 3020, 3050, 3070, 3085, 3100],
  },
  {
    crop: "Maize",
    price: 1950,
    change: -3.2,
    trend: "down",
    volume: "680 tons",
    quality: "Grade B",
    priceHistory: [2100, 2050, 2000, 1975, 1960, 1950],
  },
  {
    crop: "Soybean",
    price: 4500,
    change: 2.8,
    trend: "up",
    volume: "320 tons",
    quality: "Premium",
    priceHistory: [4200, 4250, 4300, 4350, 4425, 4500],
  },
]

export default function MarketplaceRatesScreen({ onNavigate, theme, language }: MarketplaceRatesProps) {
  const t = translations[language as keyof typeof translations] || translations.en
  const [activeTab, setActiveTab] = useState<"marketplace" | "rates">("marketplace")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [cart, setCart] = useState<number[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null)
  const [priceAlerts, setPriceAlerts] = useState<string[]>([])
  const { showModal } = useModal()

  const categories = ["All", "Seeds", "Pesticides", "Fertilizers", "Equipment", "Herbicide"]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleFavorite = (id: number) => {
    const product = products.find((p) => p.id === id)
    const isFavorited = favorites.includes(id)
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
    showModal({
      type: "success",
      title: isFavorited ? t.removedFromFavorites : t.addedToFavorites,
      message: `${product?.name}`,
    })
  }

  const toggleCart = (id: number) => {
    const product = products.find((p) => p.id === id)
    const isInCart = cart.includes(id)
    setCart((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
    showModal({
      type: "success",
      title: isInCart ? t.removedFromCart : t.addedToCart,
      message: `${product?.name}`,
    })
  }

  const togglePriceAlert = (crop: string) => {
    setPriceAlerts((prev) => (prev.includes(crop) ? prev.filter((c) => c !== crop) : [...prev, crop]))
  }

  const handleCheckout = () => {
    const total = cart.reduce((sum, id) => {
      const product = products.find((p) => p.id === id)
      return sum + (product?.price || 0)
    }, 0)

    showModal({
      type: "confirmation",
      title: t.proceedCheckout,
      message: `Total: ₹${total} for ${cart.length} items`,
      action: t.checkout,
      onConfirm: () => {
        showModal({
          type: "success",
          title: t.orderPlaced,
          message: t.deliveryDays,
        })
        setCart([])
      },
    })
  }

  const selectedCropData = rates.find((r) => r.crop === selectedCrop)

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900" : "bg-white"} pb-24`}>
      {/* Header */}
      <div
        className={`${theme === "dark" ? "bg-gradient-to-b from-cyan-500/20 to-slate-900 border-slate-700" : "bg-gradient-to-b from-cyan-500/10 to-slate-50 border-slate-200"} border-b p-4 sticky top-0 z-10`}
      >
        <div className="flex items-center gap-3 mb-3">
          <h1 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{t.marketplace}</h1>
          {cart.length > 0 && activeTab === "marketplace" && (
            <div className="ml-auto bg-cyan-400 text-slate-900 text-xs font-bold px-2 py-1 rounded-full">
              {cart.length}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("marketplace")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === "marketplace"
                ? "bg-cyan-500 text-white"
                : theme === "dark"
                  ? "bg-slate-800 text-slate-400 hover:text-white"
                  : "bg-slate-200 text-slate-600 hover:text-slate-900"
            }`}
          >
            {t.productsGrid}
          </button>
          <button
            onClick={() => setActiveTab("rates")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === "rates"
                ? "bg-cyan-500 text-white"
                : theme === "dark"
                  ? "bg-slate-800 text-slate-400 hover:text-white"
                  : "bg-slate-200 text-slate-600 hover:text-slate-900"
            }`}
          >
            {t.mandiRates}
          </button>
        </div>
      </div>

      {/* Marketplace Tab */}
      {activeTab === "marketplace" && (
        <div className="p-4 space-y-4">
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}
              />
              <input
                type="text"
                placeholder={t.searchProducts}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full ${theme === "dark" ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-500" : "bg-slate-100 border-slate-300 text-slate-900 placeholder:text-slate-500"} border rounded-lg pl-9 pr-3 py-2 text-sm`}
              />
            </div>
            <button
              className={`px-3 py-2 ${theme === "dark" ? "bg-slate-800 border-slate-700 hover:border-cyan-500" : "bg-slate-100 border-slate-300 hover:border-cyan-500"} border rounded-lg transition`}
            >
              <Filter className="w-4 h-4 text-cyan-400" />
            </button>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? "bg-cyan-500 text-white"
                    : theme === "dark"
                      ? "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
                      : "bg-slate-200 border-slate-300 text-slate-600 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg overflow-hidden hover:border-cyan-500 transition flex flex-col`}
                >
                  <div
                    className={`${theme === "dark" ? "bg-slate-700" : "bg-slate-200"} h-24 flex items-center justify-center text-4xl relative`}
                  >
                    {product.image}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className={`absolute top-2 right-2 p-1.5 ${theme === "dark" ? "bg-slate-800/80" : "bg-white/80"} rounded-lg hover:${theme === "dark" ? "bg-slate-700" : "bg-white"} transition`}
                    >
                      <Heart
                        className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : theme === "dark" ? "text-slate-400" : "text-gray-400"}`}
                      />
                    </button>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3 space-y-2 flex-1 flex flex-col">
                    <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      {product.category}
                    </p>
                    <h3
                      className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"} line-clamp-2 flex-1`}
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                    <div
                      className={`flex items-center justify-between pt-2 border-t ${theme === "dark" ? "border-slate-700" : "border-slate-300"}`}
                    >
                      <p className="font-bold text-cyan-400">₹{product.price}</p>
                      <button
                        onClick={() => toggleCart(product.id)}
                        disabled={!product.inStock}
                        className={`p-1.5 rounded transition ${
                          cart.includes(product.id)
                            ? "bg-cyan-500 text-white"
                            : theme === "dark"
                              ? "bg-slate-700 text-slate-400 hover:bg-cyan-500 hover:text-white"
                              : "bg-slate-200 text-slate-600 hover:bg-cyan-500 hover:text-white"
                        } ${!product.inStock ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.noProducts}</p>
            </div>
          )}

          {/* Cart Summary */}
          {cart.length > 0 && (
            <div
              className={`fixed bottom-20 left-4 right-4 ${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg p-4 shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t.itemsInCart}</p>
                  <p className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {cart.length} items
                  </p>
                </div>
                <button
                  onClick={handleCheckout}
                  className="px-4 py-2 bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-600 transition"
                >
                  {t.checkout}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Rates Tab */}
      {activeTab === "rates" && (
        <div className="p-4 space-y-4">
          {/* Info Banner */}
          <div
            className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"} border rounded-lg p-3`}
          >
            <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t.currentRates}</p>
          </div>

          {/* Rates List */}
          <div className="space-y-2">
            {rates.map((rate) => (
              <div
                key={rate.crop}
                onClick={() => setSelectedCrop(selectedCrop === rate.crop ? null : rate.crop)}
                className={`${theme === "dark" ? "bg-slate-800 border-slate-700 hover:border-cyan-500" : "bg-slate-100 border-slate-300 hover:border-cyan-500"} border rounded-lg p-4 transition cursor-pointer`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className={`font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                      {rate.crop}
                    </h3>
                    <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      {rate.quality}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-cyan-400">₹{rate.price}</p>
                    <div
                      className={`flex items-center gap-1 text-xs font-medium justify-end ${rate.trend === "up" ? "text-green-400" : "text-red-400"}`}
                    >
                      {rate.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {Math.abs(rate.change)}%
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Volume: {rate.volume}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      togglePriceAlert(rate.crop)
                    }}
                    className={`px-2 py-1 rounded transition ${
                      priceAlerts.includes(rate.crop)
                        ? "bg-cyan-500 text-white"
                        : theme === "dark"
                          ? "bg-slate-700 hover:bg-slate-600 text-slate-400"
                          : "bg-slate-200 hover:bg-slate-300 text-slate-600"
                    }`}
                  >
                    <Bell className="w-3 h-3" />
                  </button>
                </div>

                {/* Expanded View */}
                {selectedCrop === rate.crop && (
                  <div className="mt-3 pt-3 border-t border-slate-700 space-y-3">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-cyan-400" />
                      <span className={`text-xs font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                        {t.priceHistory}
                      </span>
                    </div>
                    <div className="flex items-end gap-1 h-16">
                      {rate.priceHistory.map((price, idx) => {
                        const minPrice = Math.min(...rate.priceHistory)
                        const maxPrice = Math.max(...rate.priceHistory)
                        const range = maxPrice - minPrice || 1
                        const height = ((price - minPrice) / range) * 100
                        return (
                          <div
                            key={idx}
                            className="flex-1 bg-cyan-500/30 rounded-t hover:bg-cyan-500/50 transition"
                            style={{ height: `${Math.max(height, 10)}%` }}
                            title={`₹${price}`}
                          />
                        )
                      })}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className={`${theme === "dark" ? "bg-slate-700" : "bg-slate-200"} rounded p-2`}>
                        <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.lowest}</p>
                        <p className={`font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                          ₹{Math.min(...rate.priceHistory)}
                        </p>
                      </div>
                      <div className={`${theme === "dark" ? "bg-slate-700" : "bg-slate-200"} rounded p-2`}>
                        <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.highest}</p>
                        <p className={`font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                          ₹{Math.max(...rate.priceHistory)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
