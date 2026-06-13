"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Sparkles, ShoppingBag, Heart, Share2, RefreshCw, Coffee, Briefcase, Plane } from "lucide-react"
import type { UserProfile } from "./body-shape-discovery"
import type { ClothingItem } from "./digital-closet"

interface StylingDashboardProps {
  onViewShopping: () => void
  userProfile: UserProfile | null
  closetItems: ClothingItem[]
}

type OccasionVibe = "coffee" | "office" | "wedding" | "airport"

const occasionVibes: { id: OccasionVibe; label: string; icon: React.ReactNode }[] = [
  { id: "coffee", label: "Coffee Date", icon: <Coffee className="h-4 w-4" /> },
  { id: "office", label: "Office Power", icon: <Briefcase className="h-4 w-4" /> },
  { id: "wedding", label: "Wedding Guest", icon: <Heart className="h-4 w-4" /> },
  { id: "airport", label: "Airport Look", icon: <Plane className="h-4 w-4" /> },
]

interface OutfitSlot {
  id: string
  title: string
  subtitle: string
  items: { name: string; color: string; isOwned: boolean; price?: string }[]
  priceInsight: { type: "best" | "wait"; message: string }
}

export function StylingDashboard({ onViewShopping, userProfile, closetItems }: StylingDashboardProps) {
  const [likedOutfits, setLikedOutfits] = useState<Set<string>>(new Set())
  const [selectedVibe, setSelectedVibe] = useState<OccasionVibe>("coffee")

  // Generate outfit slots based on user's closet items and profile
  const outfitSlots: OutfitSlot[] = useMemo(() => {
    const tops = closetItems.filter(i => i.category === "Tops")
    const bottoms = closetItems.filter(i => i.category === "Bottoms")
    const outerwear = closetItems.filter(i => i.category === "Outerwear")

    // Height-specific recommendations
    const heightTip = userProfile?.heightProfile === "petite"
      ? "high-waisted"
      : userProfile?.heightProfile === "tall"
      ? "midi-length"
      : "balanced"

    return [
      {
        id: "wardrobe-mix",
        title: "The Wardrobe Mix",
        subtitle: `Your pieces + ${heightTip} new additions`,
        items: [
          { name: tops[0]?.name || "White Linen Blouse", color: tops[0]?.color || "#F5F5F5", isOwned: true },
          { name: bottoms[0]?.name || "Sage Midi Skirt", color: bottoms[0]?.color || "#8A9A5B", isOwned: true },
          { name: "Tan Leather Belt", color: "#C4A77D", isOwned: false, price: "₹2,499" },
          { name: "Nude Heels", color: "#E8D5C4", isOwned: false, price: "₹4,999" },
        ],
        priceInsight: { type: "best", message: "Best Price Now" },
      },
      {
        id: "aesthetic-goal",
        title: "The Aesthetic Goal",
        subtitle: "A complete new vibe",
        items: [
          { name: "Silk Midi Dress", color: "#D4C5B9", isOwned: false, price: "₹8,999" },
          { name: "Gold Chain Necklace", color: "#D4AF37", isOwned: false, price: "₹1,999" },
          { name: "Strappy Sandals", color: "#8B7355", isOwned: false, price: "₹3,499" },
          { name: "Woven Clutch", color: "#E8E7E2", isOwned: false, price: "₹2,299" },
        ],
        priceInsight: { type: "wait", message: "Wait for Sale (Diwali drop expected)" },
      },
      {
        id: "quick-look",
        title: "The Quick Look",
        subtitle: "Effortless everyday style",
        items: [
          { name: outerwear[0]?.name || "Navy Blazer", color: outerwear[0]?.color || "#1E3A5F", isOwned: true },
          { name: bottoms[1]?.name || "Black Wide-leg Pants", color: bottoms[1]?.color || "#2A2A2A", isOwned: true },
          { name: "White Sneakers", color: "#FFFFFF", isOwned: false, price: "₹6,999" },
        ],
        priceInsight: { type: "best", message: "Best Price Now" },
      },
    ]
  }, [closetItems, userProfile])

  const toggleLike = (id: string) => {
    const newLiked = new Set(likedOutfits)
    if (newLiked.has(id)) {
      newLiked.delete(id)
    } else {
      newLiked.add(id)
    }
    setLikedOutfits(newLiked)
  }

  // Get style insight based on profile
  const getStyleInsight = () => {
    const shape = userProfile?.bodyShape || "hourglass"
    const height = userProfile?.heightProfile || "normal"
    const vibe = userProfile?.vibeAnswers?.[1] || "Parisian Chic"

    const shapeAdvice = {
      pear: "A-line silhouettes that balance your proportions",
      hourglass: "Structured pieces that accentuate your balanced proportions",
      rectangle: "Layered looks that create dimension",
      apple: "Empire waists and flowing fabrics that flatter your frame",
      "inverted-triangle": "Wide-leg pants and fuller skirts to balance your shoulders",
    }

    const heightAdvice = {
      petite: "High-waisted cuts elongate your silhouette beautifully.",
      normal: "You can rock any length - we&apos;ve picked balanced proportions.",
      tall: "Midi-lengths and layering celebrate your elegant frame.",
    }

    return {
      shape: shapeAdvice[shape as keyof typeof shapeAdvice] || shapeAdvice.hourglass,
      height: heightAdvice[height as keyof typeof heightAdvice] || heightAdvice.normal,
      vibe,
    }
  }

  const insight = getStyleInsight()

  return (
    <section className="min-h-screen px-4 pb-24 pt-28 md:px-8 md:pb-20 md:pt-32">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <div className="mb-2 flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              AI Curated
            </span>
          </div>
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
            Your Styled Looks
          </h2>
          <p className="mt-2 text-muted-foreground">
            Personalized outfits based on your body shape and style preferences
          </p>
        </motion.div>

        {/* Occasion Vibe Quick-Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-wrap justify-center gap-2"
        >
          {occasionVibes.map((vibe) => (
            <motion.button
              key={vibe.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedVibe(vibe.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                selectedVibe === vibe.id
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {vibe.icon}
              <span>{vibe.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Outfit Slots */}
        <div className="grid gap-6 md:grid-cols-3">
          {outfitSlots.map((outfit, index) => (
            <motion.div
              key={outfit.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-sm"
            >
              {/* Price Insight Badge */}
              <div
                className={`absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-medium ${
                  outfit.priceInsight.type === "best"
                    ? "bg-primary/10 text-primary"
                    : "bg-amber-500/10 text-amber-600"
                }`}
              >
                {outfit.priceInsight.message}
              </div>

              {/* Action Buttons */}
              <div className="absolute right-4 top-4 z-10 flex gap-2">
                <button
                  onClick={() => toggleLike(outfit.id)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-all ${
                    likedOutfits.has(outfit.id)
                      ? "bg-red-500 text-white"
                      : "bg-card/80 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${likedOutfits.has(outfit.id) ? "fill-current" : ""}`}
                  />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-card/80 text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>

              {/* Outfit Preview - Card Stack Animation */}
              <div className="flex aspect-[4/5] items-center justify-center p-6 pt-14">
                <div className="grid h-full w-full grid-cols-2 gap-2">
                  {outfit.items.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      transition={{ 
                        delay: index * 0.1 + i * 0.08,
                        type: "spring",
                        stiffness: 200
                      }}
                      className="relative overflow-hidden rounded-xl"
                      style={{ backgroundColor: item.color }}
                    >
                      {!item.isOwned && (
                        <div className="absolute inset-x-0 bottom-0 bg-foreground/60 px-2 py-1 text-center text-[10px] font-medium text-background">
                          {item.price}
                        </div>
                      )}
                      {item.isOwned && (
                        <div className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                          ✓
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Outfit Info */}
              <div className="border-t border-border p-4">
                <h3 className="font-serif text-lg font-medium text-foreground">
                  {outfit.title}
                </h3>
                <p className="text-sm text-muted-foreground">{outfit.subtitle}</p>

                {/* Items List */}
                <div className="mt-3 space-y-1">
                  {outfit.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className={item.isOwned ? "text-muted-foreground" : "text-foreground"}>
                        {item.name}
                      </span>
                      {item.isOwned ? (
                        <span className="text-primary">Owned</span>
                      ) : (
                        <span className="font-medium text-foreground">{item.price}</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Total for new items */}
                {outfit.items.some((i) => !i.isOwned) && (
                  <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                    <span className="text-sm font-medium text-foreground">New Items Total</span>
                    <span className="font-serif text-lg font-medium text-primary">
                      ₹
                      {outfit.items
                        .filter((i) => !i.isOwned && i.price)
                        .reduce((sum, i) => sum + parseInt(i.price!.replace(/[₹,]/g, "")), 0)
                        .toLocaleString("en-IN")}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 font-medium text-foreground transition-all hover:border-primary/50">
            <RefreshCw className="h-4 w-4" />
            <span>Generate More</span>
          </button>
          <button
            onClick={onViewShopping}
            className="flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-medium text-background transition-transform hover:scale-105"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Shop These Looks</span>
          </button>
        </motion.div>

        {/* Style Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-6"
        >
          <h3 className="mb-3 flex items-center gap-2 font-serif text-lg font-medium text-foreground">
            <Sparkles className="h-5 w-5 text-primary" />
            Style Insight
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Based on your <strong className="text-foreground">{userProfile?.bodyShape || "hourglass"} shape</strong> and{" "}
            <strong className="text-foreground">{insight.vibe}</strong> aesthetic, we&apos;ve
            curated looks featuring {insight.shape}. {insight.height}
          </p>
        </motion.div>

        {/* Aura's Voice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mx-auto mt-6 max-w-lg rounded-xl border border-border bg-card/60 p-4 text-center backdrop-blur-sm"
        >
          <p className="text-sm italic text-muted-foreground">
            &quot;Bestie, these looks are curated just for you! The &apos;Wait for Sale&apos; tag means I&apos;m watching prices - 
            Diwali sales usually bring 30-40% off on these items.&quot;
            <span className="mt-2 block text-primary">— Aura</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
