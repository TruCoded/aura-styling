"use client"

import { motion } from "framer-motion"
import { ExternalLink, Star, Sparkles, BadgeCheck, TrendingUp } from "lucide-react"

interface Product {
  id: string
  name: string
  brand: string
  price: string
  originalPrice?: string
  image: string
  rating: number
  isPartner?: boolean
  marketplace?: "myntra" | "amazon" | "ajio"
}

const featuredPicks: Product[] = [
  {
    id: "1",
    name: "Silk Midi Dress in Champagne",
    brand: "The Label Life",
    price: "₹8,999",
    image: "#D4C5B9",
    rating: 4.8,
    isPartner: true,
  },
  {
    id: "2",
    name: "Gold-Plated Chain Necklace",
    brand: "Accessorize",
    price: "₹1,999",
    originalPrice: "₹2,999",
    image: "#D4AF37",
    rating: 4.6,
    isPartner: true,
  },
  {
    id: "3",
    name: "Strappy Leather Sandals",
    brand: "Aldo",
    price: "₹3,499",
    image: "#8B7355",
    rating: 4.5,
    isPartner: true,
  },
  {
    id: "4",
    name: "Hand-Woven Raffia Clutch",
    brand: "Mango",
    price: "₹2,299",
    image: "#E8E7E2",
    rating: 4.7,
    isPartner: true,
  },
]

const marketplaceProducts: Product[] = [
  {
    id: "5",
    name: "White Leather Sneakers",
    brand: "Nike",
    price: "₹6,999",
    originalPrice: "₹8,995",
    image: "#FFFFFF",
    rating: 4.9,
    marketplace: "myntra",
  },
  {
    id: "6",
    name: "Tan Leather Belt",
    brand: "Fossil",
    price: "₹2,499",
    image: "#C4A77D",
    rating: 4.4,
    marketplace: "amazon",
  },
  {
    id: "7",
    name: "Nude Block Heels",
    brand: "Aldo",
    price: "₹4,999",
    originalPrice: "₹5,999",
    image: "#E8D5C4",
    rating: 4.6,
    marketplace: "myntra",
  },
  {
    id: "8",
    name: "Navy Wool Blazer",
    brand: "Marks & Spencer",
    price: "₹7,999",
    image: "#1E3A5F",
    rating: 4.7,
    marketplace: "ajio",
  },
]

const marketplaceLogos = {
  myntra: { name: "Myntra", color: "#FF3E6C" },
  amazon: { name: "Amazon", color: "#FF9900" },
  ajio: { name: "AJIO", color: "#333333" },
}

export function ShoppingSection() {
  return (
    <section className="min-h-screen px-4 pb-24 pt-28 md:px-8 md:pb-20 md:pt-32">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
            Shop Your Style
          </h2>
          <p className="mt-2 text-muted-foreground">
            Curated pieces from our partners and top marketplaces
          </p>
        </motion.div>

        {/* Featured Picks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-serif text-xl font-medium text-foreground">
              Featured Picks
            </h3>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Partner Collection
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {featuredPicks.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg"
                style={{
                  boxShadow: product.isPartner
                    ? "0 0 20px rgba(138, 154, 91, 0.15)"
                    : undefined,
                }}
              >
                {/* Partner Badge */}
                {product.isPartner && (
                  <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-primary px-2 py-1">
                    <BadgeCheck className="h-3 w-3 text-primary-foreground" />
                    <span className="text-[10px] font-medium text-primary-foreground">
                      Partner
                    </span>
                  </div>
                )}

                {/* Product Image */}
                <div
                  className="aspect-square"
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
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/80 opacity-0 transition-opacity group-hover:opacity-100">
                  <button className="flex items-center gap-2 rounded-full bg-background px-6 py-3 font-medium text-foreground transition-transform hover:scale-105">
                    <span>View Item</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Marketplace Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
            <h3 className="font-serif text-xl font-medium text-foreground">
              Marketplace Finds
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {marketplaceProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg"
              >
                {/* Marketplace Badge */}
                {product.marketplace && (
                  <div
                    className="absolute left-3 top-3 z-10 rounded-full px-2 py-1 text-[10px] font-medium text-white"
                    style={{
                      backgroundColor: marketplaceLogos[product.marketplace].color,
                    }}
                  >
                    {marketplaceLogos[product.marketplace].name}
                  </div>
                )}

                {/* Product Image */}
                <div
                  className="aspect-square border-b border-border"
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
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/80 opacity-0 transition-opacity group-hover:opacity-100">
                  <button className="flex items-center gap-2 rounded-full bg-background px-6 py-3 font-medium text-foreground transition-transform hover:scale-105">
                    <span>Shop Now</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Price Alert CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-6 text-center md:p-8"
        >
          <h3 className="mb-2 font-serif text-xl font-medium text-foreground">
            Never Miss a Deal
          </h3>
          <p className="mb-4 text-muted-foreground">
            Set price alerts for items in your wishlist and we&apos;ll notify you when they drop
          </p>
          <button className="rounded-full bg-foreground px-6 py-3 font-medium text-background transition-transform hover:scale-105">
            Enable Price Alerts
          </button>
        </motion.div>
      </div>
    </section>
  )
}
