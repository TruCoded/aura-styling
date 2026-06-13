"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Coffee, Briefcase, Heart, Plane, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react"

interface ClothingItem {
  id: string
  name: string
  category: string
  color: string
}

interface ClosetRemixProps {
  items: ClothingItem[]
  heightProfile: "petite" | "normal" | "tall" | null
}

type OccasionVibe = "coffee" | "office" | "wedding" | "airport"

const occasionVibes: { id: OccasionVibe; label: string; icon: React.ReactNode }[] = [
  { id: "coffee", label: "Coffee Date", icon: <Coffee className="h-4 w-4" /> },
  { id: "office", label: "Office Power", icon: <Briefcase className="h-4 w-4" /> },
  { id: "wedding", label: "Wedding Guest", icon: <Heart className="h-4 w-4" /> },
  { id: "airport", label: "Airport Look", icon: <Plane className="h-4 w-4" /> },
]

// Generate outfit combinations from items
function generateOutfits(items: ClothingItem[], occasion: OccasionVibe, count: number = 15): ClothingItem[][] {
  const tops = items.filter(i => i.category === "Tops")
  const bottoms = items.filter(i => i.category === "Bottoms")
  const dresses = items.filter(i => i.category === "Dresses")
  const outerwear = items.filter(i => i.category === "Outerwear")
  const accessories = items.filter(i => i.category === "Accessories")
  
  const outfits: ClothingItem[][] = []
  
  // Generate top + bottom combinations
  for (const top of tops) {
    for (const bottom of bottoms) {
      const outfit: ClothingItem[] = [top, bottom]
      if (outerwear.length > 0 && (occasion === "office" || occasion === "airport")) {
        outfit.push(outerwear[Math.floor(Math.random() * outerwear.length)])
      }
      if (accessories.length > 0) {
        outfit.push(accessories[Math.floor(Math.random() * accessories.length)])
      }
      outfits.push(outfit)
    }
  }
  
  // Add dress combinations
  for (const dress of dresses) {
    const outfit: ClothingItem[] = [dress]
    if (outerwear.length > 0 && occasion !== "wedding") {
      outfit.push(outerwear[Math.floor(Math.random() * outerwear.length)])
    }
    if (accessories.length > 0) {
      outfit.push(accessories[Math.floor(Math.random() * accessories.length)])
    }
    outfits.push(outfit)
  }
  
  // Fallback combinations if outfits count is low
  if (outfits.length < count) {
    for (let i = 0; i < count - outfits.length + 10; i++) {
      const shuffled = [...items].sort(() => Math.random() - 0.5)
      const size = Math.floor(Math.random() * 2) + 2 // 2 to 4 items
      outfits.push(shuffled.slice(0, size))
    }
  }
  
  // Remove duplicates based on item IDs
  const seen = new Set<string>()
  const uniqueOutfits: ClothingItem[][] = []
  for (const outfit of outfits) {
    const key = outfit.map(i => i.id).sort().join(",")
    if (!seen.has(key)) {
      seen.add(key)
      uniqueOutfits.push(outfit)
    }
  }
  
  // Shuffle and return requested count (at least 15)
  return uniqueOutfits.sort(() => Math.random() - 0.5).slice(0, Math.max(count, 15))
}

export function ClosetRemix({ items, heightProfile }: ClosetRemixProps) {
  const [selectedVibe, setSelectedVibe] = useState<OccasionVibe>("coffee")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isShuffling, setIsShuffling] = useState(false)

  const outfits = useMemo(() => {
    return generateOutfits(items, selectedVibe, 15)
  }, [items, selectedVibe])

  const handleShuffle = () => {
    setIsShuffling(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % outfits.length)
      setIsShuffling(false)
    }, 500)
  }

  const handleVibeChange = (vibe: OccasionVibe) => {
    setSelectedVibe(vibe)
    setCurrentIndex(0)
  }

  const heightTip = heightProfile === "petite" 
    ? "Tip: High-waisted pieces elongate your silhouette beautifully"
    : heightProfile === "tall"
    ? "Tip: Midi-lengths and layers celebrate your frame"
    : "Tip: Balanced proportions work great on you"

  if (items.length < 10) {
    return (
      <div className="rounded-2xl border border-border bg-card/60 p-8 text-center backdrop-blur-sm max-w-md mx-auto">
        <Sparkles className="mx-auto mb-4 h-12 w-12 text-primary animate-pulse" />
        <h3 className="mb-2 font-serif text-xl font-medium text-foreground">
          Unlock the 10x15 Closet Remix
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Upload at least 10 clothes in your digital closet. Aura's AI will dynamically remix them to create 15+ gorgeous outfits from the same clothes!
        </p>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Progress</span>
            <span className="font-semibold">{items.length} / 10 items</span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500" 
              style={{ width: `${Math.min((items.length / 10) * 100, 100)}%` }}
            />
          </div>
        </div>
        
        <p className="text-xs text-primary font-medium">
          👉 Bestie, people love "more from less" - let's build your capsule wardrobe!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium uppercase tracking-wider text-primary">
            The 10x15 Challenge
          </span>
        </div>
        <h3 className="font-serif text-2xl font-medium text-foreground">
          Maxing Your Wardrobe&apos;s Soul
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {items.length} items = {outfits.length}+ unique outfit combinations
        </p>
      </div>

      {/* Occasion Vibe Chips */}
      <div className="flex flex-wrap justify-center gap-2">
        {occasionVibes.map((vibe) => (
          <motion.button
            key={vibe.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleVibeChange(vibe.id)}
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
      </div>

      {/* Outfit Card Stack */}
      <div className="relative mx-auto h-[400px] max-w-sm">
        <AnimatePresence mode="wait">
          {outfits.length > 0 && (
            <motion.div
              key={`${selectedVibe}-${currentIndex}`}
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotateY: 0,
                transition: { type: "spring", stiffness: 300, damping: 25 }
              }}
              exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              className="absolute inset-0 rounded-2xl border border-border bg-card p-6 shadow-xl"
            >
              {/* Outfit Number */}
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Look {currentIndex + 1} of {outfits.length}
                </span>
                <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                  {occasionVibes.find(v => v.id === selectedVibe)?.label}
                </span>
              </div>

              {/* Outfit Items */}
              <div className="grid grid-cols-2 gap-3">
                {outfits[currentIndex]?.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative aspect-square overflow-hidden rounded-xl"
                    style={{ backgroundColor: item.color }}
                  >
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent p-2 pt-6">
                      <span className="text-xs font-medium text-background line-clamp-2">
                        {item.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Height-based Tip */}
              {heightProfile && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 rounded-lg bg-primary/5 p-3"
                >
                  <p className="text-center text-xs text-primary">
                    {heightTip}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background cards for stack effect */}
        <div className="absolute inset-0 -z-10 translate-x-2 translate-y-2 rounded-2xl border border-border bg-card/50" />
        <div className="absolute inset-0 -z-20 translate-x-4 translate-y-4 rounded-2xl border border-border bg-card/30" />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-muted disabled:opacity-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShuffle}
          disabled={isShuffling}
          className="flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-medium text-background"
        >
          <RefreshCw className={`h-4 w-4 ${isShuffling ? "animate-spin" : ""}`} />
          <span>Shuffle</span>
        </motion.button>

        <button
          onClick={() => setCurrentIndex((prev) => Math.min(outfits.length - 1, prev + 1))}
          disabled={currentIndex === outfits.length - 1}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-muted disabled:opacity-50"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Outfit Counter */}
      <div className="flex justify-center gap-1">
        {outfits.slice(0, Math.min(15, outfits.length)).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 w-2 rounded-full transition-all ${
              i === currentIndex ? "w-6 bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
