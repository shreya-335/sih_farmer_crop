"use client"

import { ArrowLeft, ShoppingCart, Star, Search, Filter, Heart } from "lucide-react"
import { useState } from "react"
import { useModal } from "@/components/providers/modal-provider"

interface MarketplaceProps {
  onNavigate: (screen: string) => void
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

export default function Marketplace({ onNavigate }: MarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [cart, setCart] = useState<number[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
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
      title: isFavorited ? "Removed from Favorites" : "Added to Favorites",
      message: `${product?.name} has been ${isFavorited ? "removed from" : "added to"} your favorites.`,
    })
  }

  const toggleCart = (id: number) => {
    const product = products.find((p) => p.id === id)
    const isInCart = cart.includes(id)
    setCart((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
    showModal({
      type: "success",
      title: isInCart ? "Removed from Cart" : "Added to Cart",
      message: `${product?.name} has been ${isInCart ? "removed from" : "added to"} your shopping cart.`,
    })
  }

  const handleCheckout = () => {
    const total = cart.reduce((sum, id) => {
      const product = products.find((p) => p.id === id)
      return sum + (product?.price || 0)
    }, 0)

    showModal({
      type: "confirmation",
      title: "Proceed to Checkout?",
      message: `Total: ₹${total} for ${cart.length} items. Confirm your order?`,
      action: "Checkout",
      onConfirm: () => {
        showModal({
          type: "success",
          title: "Order Placed!",
          message: `Your order of ₹${total} has been successfully placed. Delivery in 2-3 business days.`,
        })
        setCart([])
      },
    })
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => onNavigate("dashboard")} className="p-2 hover:bg-secondary rounded-lg transition">
            <ArrowLeft className="w-5 h-5 text-accent" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Marketplace</h1>
          {cart.length > 0 && (
            <div className="ml-auto bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full">
              {cart.length}
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-secondary border border-border rounded-lg pl-9 pr-3 py-2 text-foreground placeholder:text-muted-foreground text-sm"
            />
          </div>
          <button className="px-3 py-2 bg-secondary border border-border rounded-lg hover:border-accent transition">
            <Filter className="w-4 h-4 text-accent" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-accent text-accent-foreground"
                  : "bg-card border border-border text-foreground hover:border-accent"
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
                className="bg-card border border-border rounded-lg overflow-hidden hover:border-accent transition flex flex-col"
              >
                <div className="bg-secondary h-24 flex items-center justify-center text-4xl relative">
                  {product.image}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-lg hover:bg-white transition"
                  >
                    <Heart
                      className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                    />
                  </button>
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">Out of Stock</span>
                    </div>
                  )}
                </div>
                <div className="p-3 space-y-2 flex-1 flex flex-col">
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                  <h3 className="text-sm font-semibold text-foreground line-clamp-2 flex-1">{product.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-muted-foreground">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <p className="font-bold text-accent">₹{product.price}</p>
                    <button
                      onClick={() => toggleCart(product.id)}
                      disabled={!product.inStock}
                      className={`p-1.5 rounded transition ${
                        cart.includes(product.id)
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground"
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
            <p className="text-muted-foreground">No products found</p>
          </div>
        )}

        {/* Featured Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">Featured Deals</h2>
          <div className="bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-1">Monsoon Season Special</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Get 20% off on all flood-resistant seeds and drainage equipment
            </p>
            <button
              onClick={() =>
                showModal({
                  type: "info",
                  title: "Monsoon Special",
                  message: "20% discount applied to flood-resistant seeds and drainage equipment!",
                })
              }
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:opacity-90 transition"
            >
              Shop Now
            </button>
          </div>
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="fixed bottom-20 left-4 right-4 bg-card border border-border rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Items in cart</p>
                <p className="text-lg font-bold text-foreground">{cart.length} items</p>
              </div>
              <button
                onClick={handleCheckout}
                className="px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
