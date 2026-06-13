"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ExternalLink, Star, Sparkles, BadgeCheck, TrendingUp,
  X, Check, SlidersHorizontal, DollarSign
} from "lucide-react"

interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  isPartner?: boolean
  marketplace?: "myntra" | "amazon" | "ajio"
  category: string
  color: string
  newOutfitCombos: number
  similarOwned?: string
}

interface ClothingItem {
  id: string
  name: string
  category: string
  color: string
}

interface SmartShoppingProps {
  ownedItems: ClothingItem[]
}

const allProducts: Product[] = [
  {
    id: "1",
    name: "Silk Midi Dress in Champagne",
    brand: "The Label Life",
    price: 8999,
    image: "#D4C5B9",
    rating: 4.8,
    isPartner: true,
    category: "Dresses",
    color: "champagne",
    newOutfitCombos: 8,
  },
  {
    id: "2",
    name: "Gold-Plated Chain Necklace",
    brand: "Accessorize",
    price: 1999,
    originalPrice: 2999,
    image: "#D4AF37",
    rating: 4.6,
    isPartner: true,
    category: "Accessories",
    color: "gold",
    newOutfitCombos: 12,
  },
  {
    id: "3",
    name: "Black Structured Blazer",
    brand: "Zara",
    price: 5999,
    image: "#2A2A2A",
    rating: 4.7,
    marketplace: "myntra",
    category: "Outerwear",
    color: "black",
    newOutfitCombos: 2,
    similarOwned: "Navy Blazer",
  },
  {
    id: "4",
    name: "Strappy Leather Sandals",
    brand: "Aldo",
    price: 3499,
    image: "#8B7355",
    rating: 4.5,
    isPartner: true,
    category: "Accessories",
    color: "tan",
    newOutfitCombos: 6,
  },
  {
    id: "5",
    name: "White Leather Sneakers",
    brand: "Nike",
    price: 6999,
    originalPrice: 8995,
    image: "#FFFFFF",
    rating: 4.9,
    marketplace: "myntra",
    category: "Accessories",
    color: "white",
    newOutfitCombos: 15,
  },
  {
    id: "6",
    name: "Tan Leather Belt",
    brand: "Fossil",
    price: 2499,
    image: "#C4A77D",
    rating: 4.4,
    marketplace: "amazon",
    category: "Accessories",
    color: "tan",
    newOutfitCombos: 10,
  },
  {
    id: "7",
    name: "Olive Cargo Pants",
    brand: "H&M",
    price: 2999,
    image: "#6B7A45",
    rating: 4.3,
    marketplace: "ajio",
    category: "Bottoms",
    color: "olive",
    newOutfitCombos: 7,
  },
  {
    id: "8",
    name: "Navy Wool Blazer",
    brand: "Marks & Spencer",
    price: 7999,
    image: "#1E3A5F",
    rating: 4.7,
    marketplace: "ajio",
    category: "Outerwear",
    color: "navy",
    newOutfitCombos: 1,
    similarOwned: "Navy Blazer",
  },
]

const marketplaceLogos = {
  myntra: { name: "Myntra", color: "#FF3E6C" },
  amazon: { name: "Amazon", color: "#FF9900" },
  ajio: { name: "AJIO", color: "#333333" },
}

const budgetRanges = [
  { label: "$", max: 3000 },
  { label: "$$", max: 6000 },
  { label: "$$$", max: Infinity },
]

const getSimilarOwnedItem = (product: Product, ownedItems: ClothingItem[]) => {
  const sameCategoryItems = ownedItems.filter(
    item => item.category.toLowerCase() === product.category.toLowerCase()
  )
  
  const keywords = ["blazer", "jacket", "sweater", "pants", "skirt", "blouse", "tee", "dress", "belt", "necklace", "sandals", "sneakers"]
  const prodNameLower = product.name.toLowerCase()
  const matchedKeyword = keywords.find(kw => prodNameLower.includes(kw))
  
  if (matchedKeyword) {
    const match = sameCategoryItems.find(item => item.name.toLowerCase().includes(matchedKeyword))
    if (match) return match.name
  }
  
  const matchByColor = sameCategoryItems.find(
    item => item.color.toLowerCase() === product.color.toLowerCase()
  )
  if (matchByColor) return matchByColor.name
  
  return null
}

const getOutfitMatchesCount = (product: Product, ownedItems: ClothingItem[]) => {
  const tops = ownedItems.filter(i => i.category === "Tops")
  const bottoms = ownedItems.filter(i => i.category === "Bottoms")
  const outerwear = ownedItems.filter(i => i.category === "Outerwear")
  const dresses = ownedItems.filter(i => i.category === "Dresses")
  const accessories = ownedItems.filter(i => i.category === "Accessories")
  
  let count = 0
  if (product.category === "Tops") {
    count = bottoms.length * Math.max(1, outerwear.length)
  } else if (product.category === "Bottoms") {
    count = tops.length * Math.max(1, outerwear.length)
  } else if (product.category === "Dresses") {
    count = Math.max(1, outerwear.length) * Math.max(1, accessories.length)
  } else if (product.category === "Outerwear") {
    count = (tops.length * bottoms.length) + dresses.length
  } else if (product.category === "Accessories") {
    count = (tops.length * bottoms.length) + dresses.length
  }
  
  return Math.max(count, product.newOutfitCombos)
}

export function SmartShopping({ ownedItems }: SmartShoppingProps) {
  const [budgetLevel, setBudgetLevel] = useState(2) // 0 = $, 1 = $$, 2 = $$$
  const [showOnlyRecommended, setShowOnlyRecommended] = useState(false)

  const processedProducts = useMemo(() => {
    return allProducts.map(p => {
      const similarOwned = getSimilarOwnedItem(p, ownedItems)
      const matchesCount = getOutfitMatchesCount(p, ownedItems)
      return {
        ...p,
        similarOwned: similarOwned || undefined,
        newOutfitCombos: matchesCount
      }
    })
  }, [ownedItems])

  const filteredProducts = useMemo(() => {
    let products = processedProducts.filter(p => p.price <= budgetRanges[budgetLevel].max)
    if (showOnlyRecommended) {
      products = products.filter(p => !p.similarOwned && p.newOutfitCombos >= 5)
    }
    return products
  }, [processedProducts, budgetLevel, showOnlyRecommended])

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString("en-IN")}`
  }

  return (
    <section className="min-h-screen px-4 pb-24 pt-28 md:px-8 md:pb-20 md:pt-32">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
            Shop Smarter
          </h2>
          <p className="mt-2 text-muted-foreground">
            Honest recommendations based on what you already own
          </p>
        </motion.div>

        {/* Budget Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mb-8 max-w-md rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">Budget Filter</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Up to {budgetLevel === 2 ? "Any" : formatPrice(budgetRanges[budgetLevel].max)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {budgetRanges.map((range, index) => (
              <button
                key={range.label}
                onClick={() => setBudgetLevel(index)}
                className={`flex-1 rounded-lg py-3 text-center font-medium transition-all ${
                  budgetLevel === index
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  {Array.from({ length: index + 1 }).map((_, i) => (
                    <DollarSign key={i} className="h-4 w-4" />
                  ))}
                </div>
              </button>
            ))}
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowOnlyRecommended(!showOnlyRecommended)}
            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm transition-all ${
              showOnlyRecommended
                ? "bg-primary/10 text-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <Check className={`h-4 w-4 ${showOnlyRecommended ? "opacity-100" : "opacity-0"}`} />
            <span>Only show great investments</span>
          </button>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence>
            {filteredProducts.map((product, index) => {
              const isSkip = product.similarOwned !== undefined
              const isGreatInvestment = !isSkip && product.newOutfitCombos >= 5

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group relative overflow-hidden rounded-2xl border bg-card transition-all ${
                    isSkip
                      ? "border-red-200 bg-red-50/50"
                      : isGreatInvestment
                      ? "border-green-200 bg-green-50/50"
                      : "border-border"
                  }`}
                >
                  {/* Smart Check Overlay */}
                  <div
                    className={`absolute inset-x-0 top-0 z-20 px-3 py-2 text-xs font-medium ${
                      isSkip
                        ? "bg-red-500 text-white"
                        : isGreatInvestment
                        ? "bg-green-500 text-white"
                        : "hidden"
                    }`}
                  >
                    {isSkip ? (
                      <div className="flex items-center gap-1">
                        <X className="h-3 w-3" />
                        <span>You own similar: {product.similarOwned}</span>
                      </div>
                    ) : isGreatInvestment ? (
                      <div className="flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        <span>+{product.newOutfitCombos} outfit combos!</span>
                      </div>
                    ) : null}
                  </div>

                  {/* Partner/Marketplace Badge */}
                  <div className="absolute left-3 top-3 z-10">
                    {product.isPartner ? (
                      <div className="flex items-center gap-1 rounded-full bg-primary px-2 py-1">
                        <BadgeCheck className="h-3 w-3 text-primary-foreground" />
                        <span className="text-[10px] font-medium text-primary-foreground">
                          Partner
                        </span>
                      </div>
                    ) : product.marketplace ? (
                      <div
                        className="rounded-full px-2 py-1 text-[10px] font-medium text-white"
                        style={{
                          backgroundColor: marketplaceLogos[product.marketplace].color,
                        }}
                      >
                        {marketplaceLogos[product.marketplace].name}
                      </div>
                    ) : null}
                  </div>

                  {/* Product Image */}
                  <div
                    className={`aspect-square ${isSkip || isGreatInvestment ? "mt-8" : ""}`}
                    style={{ backgroundColor: product.image }}
                  />

                  {/* Product Info */}
                  <div className="p-4">
                    <p className="mb-1 text-xs text-muted-foreground">{product.brand}</p>
                    <h4 className="mb-2 text-sm font-medium leading-tight text-foreground line-clamp-2">
                      {product.name}
                    </h4>

                    <div className="mb-2 flex items-center gap-1">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <span className="text-xs text-muted-foreground">{product.rating}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-lg font-medium text-foreground">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* New Outfit Combos Badge */}
                    {!isSkip && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-primary">
                        <Sparkles className="h-3 w-3" />
                        <span>+{product.newOutfitCombos} new looks</span>
                      </div>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/80 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      className={`flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-transform hover:scale-105 ${
                        isSkip
                          ? "bg-red-100 text-red-700"
                          : "bg-background text-foreground"
                      }`}
                    >
                      <span>{isSkip ? "Skip This" : "View Item"}</span>
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Aura's Shopping Advice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-6"
        >
          <h3 className="mb-3 flex items-center gap-2 font-serif text-lg font-medium text-foreground">
            <Sparkles className="h-5 w-5 text-primary" />
            Aura&apos;s Shopping Wisdom
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            &quot;Hey bestie! I&apos;ve analyzed your closet and found that you already own {ownedItems.length} amazing pieces. 
            The items marked with a green check will add the most versatility to your wardrobe. 
            Skip the red ones - you&apos;ve already got that vibe covered!&quot;
          </p>
        </motion.div>
      </div>
    </section>
  )
}
