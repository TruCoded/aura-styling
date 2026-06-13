"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navigation } from "@/components/aura/navigation"
import { HeroSection } from "@/components/aura/hero-section"
import { BodyShapeDiscovery, type UserProfile } from "@/components/aura/body-shape-discovery"
import { DigitalCloset, type ClothingItem } from "@/components/aura/digital-closet"
import { StylingDashboard } from "@/components/aura/styling-dashboard"
import { SmartShopping } from "@/components/aura/smart-shopping"
import { AuraChatBubble } from "@/components/aura/aura-chat-bubble"

type Section = "hero" | "discovery" | "closet" | "styling" | "shopping"

export default function AuraStyleApp() {
  const [currentSection, setCurrentSection] = useState<Section>("hero")
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [closetItems, setClosetItems] = useState<ClothingItem[]>([])

  const handleBeginJourney = () => {
    setCurrentSection("discovery")
  }

  const handleDiscoveryComplete = (profile: UserProfile) => {
    setUserProfile(profile)
    setCurrentSection("closet")
  }

  const handleClosetComplete = (items: ClothingItem[]) => {
    setClosetItems(items)
    setCurrentSection("styling")
  }

  const handleViewShopping = () => {
    setCurrentSection("shopping")
  }

  const navigateTo = (section: Section) => {
    setCurrentSection(section)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentSection={currentSection} onNavigate={navigateTo} />
      
      <AnimatePresence mode="wait">
        {currentSection === "hero" && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HeroSection onBeginJourney={handleBeginJourney} />
          </motion.div>
        )}

        {currentSection === "discovery" && (
          <motion.div
            key="discovery"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <BodyShapeDiscovery onComplete={handleDiscoveryComplete} />
          </motion.div>
        )}

        {currentSection === "closet" && (
          <motion.div
            key="closet"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <DigitalCloset 
              onComplete={handleClosetComplete} 
              userProfile={userProfile}
            />
          </motion.div>
        )}

        {currentSection === "styling" && (
          <motion.div
            key="styling"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <StylingDashboard 
              onViewShopping={handleViewShopping}
              userProfile={userProfile}
              closetItems={closetItems}
            />
          </motion.div>
        )}

        {currentSection === "shopping" && (
          <motion.div
            key="shopping"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <SmartShopping ownedItems={closetItems} />
          </motion.div>
        )}
      </AnimatePresence>

      <AuraChatBubble />
    </div>
  )
}
