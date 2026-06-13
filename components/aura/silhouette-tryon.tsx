"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, Layers, User, Sparkles, MapPin } from "lucide-react"

interface ClothingItem {
  id: string
  name: string
  category: string
  color: string
}

interface SilhouetteTryOnProps {
  heightProfile: "petite" | "normal" | "tall" | null
  bodyShape: "pear" | "hourglass" | "rectangle" | "apple" | "inverted-triangle" | null
  selectedItems: ClothingItem[]
}

interface ModelLook {
  id: string
  title: string
  modelName: string
  vibe: string
  setting: string
  description: string
  colorTheme: string
  matchingCategories: string[]
}

const modelLooksList: ModelLook[] = [
  {
    id: "m1",
    title: "Parisian Chic Blazer",
    modelName: "Clara D.",
    vibe: "Sophisticated Editorial",
    setting: "Café de Flore, Paris",
    description: "A structured double-breasted navy blazer styled with black wide-leg trousers and minimal gold hardware.",
    colorTheme: "linear-gradient(135deg, #1E3A5F 0%, #2A2A2A 100%)",
    matchingCategories: ["Outerwear", "Bottoms"]
  },
  {
    id: "m2",
    title: "Linen Loft Minimalist",
    modelName: "Anya K.",
    vibe: "Relaxed Luxury",
    setting: "Sunlit Loft, Milan",
    description: "An airy linen blouse paired with a fluid sage midi skirt in soft organic earth tones.",
    colorTheme: "linear-gradient(135deg, #F5F5F5 0%, #8A9A5B 100%)",
    matchingCategories: ["Tops", "Bottoms"]
  },
  {
    id: "m3",
    title: "Urban Utility Edge",
    modelName: "Zoe M.",
    vibe: "Street Style Edge",
    setting: "Harajuku, Tokyo",
    description: "An olive green utility jacket layered over a clean white cotton tee and relaxed-fit trousers.",
    colorTheme: "linear-gradient(135deg, #6B7A45 0%, #FFFFFF 100%)",
    matchingCategories: ["Outerwear", "Tops"]
  },
  {
    id: "m4",
    title: "Sunset Slip Dress",
    modelName: "Elena R.",
    vibe: "Ibiza Resort Minimalist",
    setting: "Sunset Terrace, Ibiza",
    description: "A lustrous champagne silk slip dress paired with delicate strappy tan sandals and warm gold accents.",
    colorTheme: "linear-gradient(135deg, #D4C5B9 0%, #C4A77D 100%)",
    matchingCategories: ["Dresses", "Accessories"]
  }
]

export function SilhouetteTryOn({ heightProfile, bodyShape, selectedItems }: SilhouetteTryOnProps) {
  const [tryOnMode, setTryOnMode] = useState<"silhouette" | "model">("silhouette")
  const [isOverlayVisible, setIsOverlayVisible] = useState(true)

  // Get silhouette dimensions based on height profile
  const silhouetteHeight = heightProfile === "petite" ? 280 : heightProfile === "tall" ? 380 : 330
  const waistPosition = heightProfile === "petite" ? "38%" : heightProfile === "tall" ? "35%" : "36%"
  const hemlinePosition = heightProfile === "petite" ? "75%" : heightProfile === "tall" ? "70%" : "72%"

  // Get body shape path
  const getBodyPath = () => {
    switch (bodyShape) {
      case "pear":
        return "M 60 30 Q 75 30 80 50 L 82 80 Q 84 100 75 120 Q 95 180 100 220 L 100 280 L 85 280 L 80 180 L 70 180 L 65 280 L 50 280 L 45 180 L 35 180 L 30 280 L 15 280 L 15 220 Q 20 180 40 120 Q 31 100 33 80 L 35 50 Q 40 30 55 30 Z"
      case "hourglass":
        return "M 60 30 Q 80 30 85 50 L 85 80 Q 82 100 70 115 Q 82 130 85 160 Q 90 200 95 250 L 95 280 L 80 280 L 78 180 L 68 180 L 65 280 L 50 280 L 47 180 L 37 180 L 35 280 L 20 280 L 20 250 Q 25 200 30 160 Q 33 130 45 115 Q 33 100 30 80 L 30 50 Q 35 30 55 30 Z"
      case "rectangle":
        return "M 60 30 Q 75 30 78 50 L 80 80 Q 80 100 78 120 Q 80 160 82 200 L 85 280 L 70 280 L 68 180 L 62 180 L 60 280 L 45 280 L 43 180 L 37 180 L 35 280 L 20 280 L 23 200 Q 25 160 27 120 Q 25 100 25 80 L 27 50 Q 30 30 55 30 Z"
      case "apple":
        return "M 60 30 Q 78 30 82 50 L 85 80 Q 90 110 88 140 Q 85 170 80 200 L 82 280 L 67 280 L 65 200 L 55 200 L 53 280 L 38 280 L 40 200 Q 35 170 32 140 Q 30 110 35 80 L 38 50 Q 42 30 55 30 Z"
      case "inverted-triangle":
        return "M 60 30 Q 85 30 90 50 L 88 80 Q 85 100 78 120 Q 72 160 70 200 L 72 280 L 60 280 L 58 180 L 52 180 L 50 280 L 38 280 L 40 200 Q 38 160 32 120 Q 25 100 22 80 L 20 50 Q 25 30 55 30 Z"
      default:
        return "M 60 30 Q 75 30 80 50 L 82 80 Q 82 100 75 120 Q 82 160 85 200 L 88 280 L 73 280 L 70 180 L 60 180 L 57 280 L 42 280 L 40 180 L 30 180 L 27 280 L 12 280 L 15 200 Q 18 160 25 120 Q 18 100 18 80 L 20 50 Q 25 30 55 30 Z"
    }
  }

  const topItem = selectedItems.find(i => i.category === "Tops" || i.category === "Dresses")
  const bottomItem = selectedItems.find(i => i.category === "Bottoms")
  const outerItem = selectedItems.find(i => i.category === "Outerwear")

  // Filter model looks based on selected categories for try-on
  const getModelLooks = () => {
    const selectedCats = selectedItems.map(i => i.category)
    return modelLooksList.map(look => {
      const matchCount = look.matchingCategories.filter(cat => selectedCats.includes(cat)).length
      return {
        ...look,
        matchCount
      }
    }).sort((a, b) => b.matchCount - a.matchCount)
  }

  const modelLooks = getModelLooks()

  return (
    <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            <h3 className="font-serif text-lg font-medium text-foreground">
              Try-On Simulation
            </h3>
          </div>
          
          {/* Mode Switcher */}
          <div className="flex rounded-full bg-muted p-1 text-xs">
            <button
              onClick={() => setTryOnMode("silhouette")}
              className={`rounded-full px-3 py-1 transition-all ${
                tryOnMode === "silhouette"
                  ? "bg-background text-foreground shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Silhouette
            </button>
            <button
              onClick={() => setTryOnMode("model")}
              className={`rounded-full px-3 py-1 transition-all ${
                tryOnMode === "model"
                  ? "bg-background text-foreground shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Model Looks
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {tryOnMode === "silhouette" ? (
            <motion.div
              key="silhouette"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="mb-4 flex w-full justify-end">
                <button
                  onClick={() => setIsOverlayVisible(!isOverlayVisible)}
                  className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs transition-all ${
                    isOverlayVisible
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Eye className="h-3 w-3" />
                  <span>{isOverlayVisible ? "Overlay On" : "Overlay Off"}</span>
                </button>
              </div>

              {/* Silhouette Container */}
              <div className="relative mx-auto mb-6" style={{ width: 120, height: silhouetteHeight }}>
                {/* Base Silhouette */}
                <svg
                  viewBox="0 0 120 300"
                  className="h-full w-full"
                  style={{ height: silhouetteHeight }}
                >
                  <circle cx="55" cy="15" r="12" fill="currentColor" className="text-muted-foreground/30" />
                  <path
                    d={getBodyPath()}
                    fill="currentColor"
                    className="text-muted-foreground/20"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>

                {/* Clothing Overlays */}
                {isOverlayVisible && (
                  <>
                    {topItem && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 0.85, scale: 1 }}
                        className="absolute left-1/2 -translate-x-1/2"
                        style={{
                          top: "10%",
                          width: "70%",
                          height: topItem.category === "Dresses" ? "60%" : "30%",
                          backgroundColor: topItem.color,
                          borderRadius: "8px 8px 4px 4px",
                          border: "2px solid rgba(0,0,0,0.1)",
                        }}
                      />
                    )}

                    {bottomItem && !selectedItems.find(i => i.category === "Dresses") && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 0.85, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="absolute left-1/2 -translate-x-1/2"
                        style={{
                          top: waistPosition,
                          width: "65%",
                          height: "45%",
                          backgroundColor: bottomItem.color,
                          borderRadius: "4px 4px 2px 2px",
                          border: "2px solid rgba(0,0,0,0.1)",
                        }}
                      />
                    )}

                    {outerItem && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 0.7, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute left-1/2 -translate-x-1/2"
                        style={{
                          top: "8%",
                          width: "80%",
                          height: "45%",
                          backgroundColor: outerItem.color,
                          borderRadius: "8px",
                          border: "2px dashed rgba(0,0,0,0.15)",
                        }}
                      />
                    )}
                  </>
                )}

                {/* Reference Lines */}
                <div 
                  className="absolute left-0 right-0 border-t border-dashed border-primary/30"
                  style={{ top: waistPosition }}
                >
                  <span className="absolute -right-16 -top-2 text-[10px] text-primary/60">
                    Waistline
                  </span>
                </div>
                <div 
                  className="absolute left-0 right-0 border-t border-dashed border-primary/30"
                  style={{ top: hemlinePosition }}
                >
                  <span className="absolute -right-16 -top-2 text-[10px] text-primary/60">
                    Hemline
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="model"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 overflow-y-auto max-h-[360px] pr-1"
            >
              {modelLooks.map((look) => (
                <div 
                  key={look.id} 
                  className={`relative overflow-hidden rounded-xl border p-4 bg-card/40 backdrop-blur-sm transition-all hover:border-primary/40 ${
                    look.matchCount > 0 ? "border-primary/20 shadow-sm" : "border-border"
                  }`}
                >
                  {look.matchCount > 0 && (
                    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                      <Sparkles className="h-3 w-3" />
                      <span>Fits {look.matchCount} selected</span>
                    </div>
                  )}
                  
                  <div className="flex gap-4">
                    {/* Mock Model Image Placeholder */}
                    <div 
                      className="w-16 h-20 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                      style={{ background: look.colorTheme }}
                    >
                      <User className="h-8 w-8 opacity-75" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-semibold text-foreground truncate">
                        {look.title}
                      </h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3" />
                        <span>{look.setting}</span>
                      </p>
                      <p className="text-xs italic text-primary mt-1">
                        Model: {look.modelName} ({look.vibe})
                      </p>
                      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                        {look.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected Items List */}
        <div className="mt-6 space-y-2">
          {selectedItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2"
            >
              <div
                className="h-6 w-6 rounded-md border border-border"
                style={{ backgroundColor: item.color }}
              />
              <span className="flex-1 text-sm text-foreground">{item.name}</span>
              <span className="text-xs text-muted-foreground">{item.category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Height Profile Note */}
      {heightProfile && (
        <div className="mt-4 rounded-lg bg-primary/5 p-3">
          <p className="text-center text-xs text-primary">
            {heightProfile === "petite" && "Proportions adjusted for petite frame - notice the high-waistline emphasis."}
            {heightProfile === "normal" && "Proportions adjusted for standard frame."}
            {heightProfile === "tall" && "Proportions adjusted for tall frame."}
          </p>
        </div>
      )}
    </div>
  )
}
