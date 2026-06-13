"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, X, ArrowRight, Shirt, Check, Eye } from "lucide-react"
import { ClosetRemix } from "./closet-remix"
import { SilhouetteTryOn } from "./silhouette-tryon"
import type { UserProfile } from "./body-shape-discovery"

interface DigitalClosetProps {
  onComplete: (items: ClothingItem[]) => void
  userProfile: UserProfile | null
}

export interface ClothingItem {
  id: string
  name: string
  category: string
  color: string
  isScanning?: boolean
}

const categories = ["All", "Tops", "Bottoms", "Dresses", "Outerwear", "Accessories"]

const sampleItems: ClothingItem[] = [
  { id: "1", name: "White Linen Blouse", category: "Tops", color: "#F5F5F5" },
  { id: "2", name: "Navy Blazer", category: "Outerwear", color: "#1E3A5F" },
  { id: "3", name: "Black Wide-leg Pants", category: "Bottoms", color: "#2A2A2A" },
  { id: "4", name: "Sage Midi Skirt", category: "Bottoms", color: "#8A9A5B" },
  { id: "5", name: "Cream Cashmere Sweater", category: "Tops", color: "#F5F0E6" },
  { id: "6", name: "Floral Midi Dress", category: "Dresses", color: "#E8D5C4" },
  { id: "7", name: "Gold Pendant Necklace", category: "Accessories", color: "#D4AF37" },
  { id: "8", name: "Tan Leather Belt", category: "Accessories", color: "#C4A77D" },
  { id: "9", name: "Olive Cargo Jacket", category: "Outerwear", color: "#6B7A45" },
  { id: "10", name: "White Cotton Tee", category: "Tops", color: "#FFFFFF" },
]

export function DigitalCloset({ onComplete, userProfile }: DigitalClosetProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [items, setItems] = useState<ClothingItem[]>(sampleItems)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedForTryOn, setSelectedForTryOn] = useState<ClothingItem[]>([])
  const [activeTab, setActiveTab] = useState<"closet" | "remix" | "tryon">("closet")

  const handleUpload = () => {
    setIsUploading(true)
    const newItem: ClothingItem = {
      id: Date.now().toString(),
      name: "New Item",
      category: "Tops",
      color: "#E8E7E2",
      isScanning: true,
    }
    setItems([newItem, ...items])

    setTimeout(() => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === newItem.id
            ? { ...item, name: "Silk Blouse", isScanning: false }
            : item
        )
      )
      setIsUploading(false)
    }, 2500)
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
    setSelectedForTryOn(selectedForTryOn.filter((item) => item.id !== id))
  }

  const toggleTryOnSelection = (item: ClothingItem) => {
    if (selectedForTryOn.find(i => i.id === item.id)) {
      setSelectedForTryOn(selectedForTryOn.filter(i => i.id !== item.id))
    } else if (selectedForTryOn.length < 4) {
      setSelectedForTryOn([...selectedForTryOn, item])
    }
  }

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory)

  return (
    <section className="min-h-screen px-4 pb-24 pt-28 md:px-8 md:pb-20 md:pt-32">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
            Your Digital Closet
          </h2>
          <p className="mt-2 text-muted-foreground">
            {items.length} pieces ready for mixing and matching
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex justify-center"
        >
          <div className="inline-flex rounded-full border border-border bg-card p-1">
            {[
              { id: "closet", label: "My Closet" },
              { id: "remix", label: "Remix Engine" },
              { id: "tryon", label: "Try-On" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Closet Tab */}
          {activeTab === "closet" && (
            <motion.div
              key="closet"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Category Filter */}
              <div className="mb-6 flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Closet Grid */}
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
                {/* Upload Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="group relative flex aspect-[3/4] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 transition-all hover:border-primary/60"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-transform group-hover:scale-110">
                    {isUploading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent"
                      />
                    ) : (
                      <Plus className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div className="text-center">
                    <span className="block text-sm font-medium text-foreground">
                      {isUploading ? "Uploading..." : "Upload Photos"}
                    </span>
                    <span className="text-xs text-muted-foreground">Add to closet</span>
                  </div>
                </motion.button>

                {/* Clothing Items */}
                {filteredItems.map((item, index) => {
                  const isSelectedForTryOn = selectedForTryOn.find(i => i.id === item.id)
                  
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.03 }}
                      className="group relative"
                    >
                      <div
                        className={`relative aspect-[3/4] overflow-hidden rounded-2xl border bg-card transition-all ${
                          isSelectedForTryOn ? "border-2 border-primary" : "border-border"
                        }`}
                        style={{ backgroundColor: item.color }}
                      >
                        {/* Scanning State */}
                        {item.isScanning ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/90 backdrop-blur-sm">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="mb-3 h-16 w-16 rounded-full bg-primary/20"
                            />
                            <span className="text-sm font-medium text-foreground">
                              Scanning...
                            </span>
                            <div className="mt-2 h-1 w-24 overflow-hidden rounded-full bg-muted">
                              <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="h-full w-1/2 bg-primary"
                              />
                            </div>
                          </div>
                        ) : (
                          <>
                            {/* Clothing Icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Shirt className="h-12 w-12 text-foreground/20" />
                            </div>

                            {/* Selection Indicator */}
                            {isSelectedForTryOn && (
                              <div className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                                <Eye className="h-3 w-3 text-primary-foreground" />
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                              <button
                                onClick={() => toggleTryOnSelection(item)}
                                className={`flex h-7 w-7 items-center justify-center rounded-full backdrop-blur-sm transition-colors ${
                                  isSelectedForTryOn
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-card/80 text-muted-foreground hover:text-foreground"
                                }`}
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="flex h-7 w-7 items-center justify-center rounded-full bg-card/80 text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>

                            {/* Item Label */}
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/60 to-transparent p-3 pt-8">
                              <span className="text-xs font-medium text-background line-clamp-2">
                                {item.name}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 flex flex-wrap justify-center gap-4"
              >
                {[
                  { label: "Items", value: items.length },
                  { label: "Categories", value: new Set(items.map((i) => i.category)).size },
                  { label: "Outfit Potential", value: `${Math.min(items.length * 3, 50)}+` },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border bg-card/60 px-6 py-3 text-center backdrop-blur-sm"
                  >
                    <div className="font-serif text-xl font-medium text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Remix Tab */}
          {activeTab === "remix" && (
            <motion.div
              key="remix"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <ClosetRemix 
                items={items.filter(i => !i.isScanning)} 
                heightProfile={userProfile?.heightProfile || null}
              />
            </motion.div>
          )}

          {/* Try-On Tab */}
          {activeTab === "tryon" && (
            <motion.div
              key="tryon"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid gap-6 md:grid-cols-2"
            >
              {/* Item Selection */}
              <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm">
                <h3 className="mb-4 font-serif text-lg font-medium text-foreground">
                  Select Items to Try On
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Choose up to 4 items to see how they look together
                </p>
                
                <div className="grid grid-cols-3 gap-2">
                  {items.filter(i => !i.isScanning).map((item) => {
                    const isSelected = selectedForTryOn.find(i => i.id === item.id)
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleTryOnSelection(item)}
                        disabled={!isSelected && selectedForTryOn.length >= 4}
                        className={`relative aspect-square rounded-xl border-2 transition-all ${
                          isSelected
                            ? "border-primary"
                            : "border-transparent hover:border-primary/50"
                        } ${!isSelected && selectedForTryOn.length >= 4 ? "opacity-50" : ""}`}
                        style={{ backgroundColor: item.color }}
                      >
                        {isSelected && (
                          <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                            <Check className="h-3 w-3 text-primary-foreground" />
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Silhouette Preview */}
              <SilhouetteTryOn
                heightProfile={userProfile?.heightProfile || null}
                bodyShape={userProfile?.bodyShape || null}
                selectedItems={selectedForTryOn}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex justify-center"
        >
          <button
            onClick={() => onComplete(items.filter(i => !i.isScanning))}
            className="group flex items-center gap-3 rounded-full bg-foreground px-8 py-4 font-medium text-background transition-transform hover:scale-105"
          >
            <Check className="h-5 w-5" />
            <span>Generate My Outfits</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
