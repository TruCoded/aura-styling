"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Star } from "lucide-react"

interface HeroSectionProps {
  onBeginJourney: () => void
}

export function HeroSection({ onBeginJourney }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen overflow-hidden px-4 pb-20 pt-28 md:px-8 md:pt-32">
      {/* Decorative Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -right-20 top-20 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          className="absolute -left-20 bottom-40 h-[300px] w-[300px] rounded-full bg-primary/10 blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Fashion Intelligence</span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center"
        >
          <h1 className="font-serif text-4xl font-medium leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Your Aesthetic,
            <br />
            <span className="relative">
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Intelligentized
              </span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-primary to-transparent"
              />
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground md:mt-8 md:text-xl"
        >
          Discover your unique body shape, curate your digital closet, and let our AI
          craft personalized outfits that celebrate your authentic style.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex justify-center"
        >
          <button
            onClick={onBeginJourney}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-foreground px-8 py-4 text-lg font-medium text-background transition-transform hover:scale-105"
          >
            <span>Begin Journey</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            <motion.div
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent"
            />
          </button>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-6"
        >
          {[
            {
              title: "Body Shape Analysis",
              description: "Discover your silhouette with our intelligent vibe check",
              icon: "✦",
            },
            {
              title: "Digital Closet",
              description: "Upload and organize your wardrobe in one premium space",
              icon: "◈",
            },
            {
              title: "Smart Styling",
              description: "AI-curated outfits with real-time price insights",
              icon: "❖",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary">
                  {feature.icon}
                </div>
                <h3 className="mb-2 font-serif text-lg font-medium text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <div className="flex items-center -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium text-muted-foreground"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <span>Trusted by 50,000+ style-conscious individuals</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
