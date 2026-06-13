"use client"

import { motion } from "framer-motion"
import { Sparkles, Home, Search, Shirt, Palette, ShoppingBag } from "lucide-react"

type Section = "hero" | "discovery" | "closet" | "styling" | "shopping"

interface NavigationProps {
  currentSection: Section
  onNavigate: (section: Section) => void
}

const navItems = [
  { id: "hero" as Section, label: "Home", icon: Home },
  { id: "discovery" as Section, label: "Discover", icon: Search },
  { id: "closet" as Section, label: "Closet", icon: Shirt },
  { id: "styling" as Section, label: "Style", icon: Palette },
  { id: "shopping" as Section, label: "Shop", icon: ShoppingBag },
]

export function Navigation({ currentSection, onNavigate }: NavigationProps) {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-card/70 px-4 py-3 shadow-lg backdrop-blur-xl md:px-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
              AuraStyle
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  currentSection === item.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {currentSection === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg bg-primary/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <button className="hidden rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-105 md:block">
            Get Styled
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border/50 bg-card/90 px-2 pb-safe backdrop-blur-xl md:hidden">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1 rounded-lg px-3 py-2 transition-colors ${
                  currentSection === item.id
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </motion.nav>
  )
}
