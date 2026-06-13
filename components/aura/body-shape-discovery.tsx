"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft, Upload, CheckCircle2, Sparkles, Ruler } from "lucide-react"

interface BodyShapeDiscoveryProps {
  onComplete: (profile: UserProfile) => void
}

export interface UserProfile {
  bodyShape: BodyShape | null
  heightProfile: HeightProfile | null
  vibeAnswers: string[]
}

type BodyShape = "pear" | "hourglass" | "rectangle" | "apple" | "inverted-triangle"
type HeightProfile = "petite" | "normal" | "tall"

const bodyShapes: { id: BodyShape; label: string; icon: string; description: string }[] = [
  { id: "pear", label: "Pear", icon: "🍐", description: "Wider hips, narrower shoulders" },
  { id: "hourglass", label: "Hourglass", icon: "⏳", description: "Balanced bust and hips, defined waist" },
  { id: "rectangle", label: "Rectangle", icon: "▬", description: "Balanced proportions, subtle waist" },
  { id: "apple", label: "Apple", icon: "🍎", description: "Fuller midsection, slender legs" },
  { id: "inverted-triangle", label: "Inverted", icon: "▽", description: "Broader shoulders, narrower hips" },
]

const heightProfiles: { id: HeightProfile; label: string; range: string; tip: string }[] = [
  { 
    id: "petite", 
    label: "Petite", 
    range: "Under 5&apos;4\"",
    tip: "High-waisted cuts and vertical lines to elongate your silhouette"
  },
  { 
    id: "normal", 
    label: "Normal", 
    range: "5&apos;4\" - 5&apos;7\"",
    tip: "Balanced proportions work beautifully on you"
  },
  { 
    id: "tall", 
    label: "Tall", 
    range: "Over 5&apos;7\"",
    tip: "Midi-lengths and layering that celebrates your frame"
  },
]

const vibeQuestions = [
  {
    question: "Which silhouette do you gravitate towards?",
    options: ["Flowy & Relaxed", "Structured & Tailored", "Body-hugging", "Oversized Comfort"],
  },
  {
    question: "Your go-to color palette?",
    options: ["Neutrals & Earth Tones", "Bold & Vibrant", "Pastels & Soft Hues", "Monochrome"],
  },
  {
    question: "What&apos;s your style icon energy?",
    options: ["Parisian Chic", "Street Style Edge", "Minimalist Modern", "Bohemian Free Spirit"],
  },
]

export function BodyShapeDiscovery({ onComplete }: BodyShapeDiscoveryProps) {
  const [step, setStep] = useState(1)
  const [selectedShape, setSelectedShape] = useState<BodyShape | null>(null)
  const [selectedHeight, setSelectedHeight] = useState<HeightProfile | null>(null)
  const [vibeAnswers, setVibeAnswers] = useState<string[]>([])
  const [isScanning, setIsScanning] = useState(false)

  const totalSteps = 4 // Body shape, Height, 2 vibe questions

  const handleVibeAnswer = (answer: string) => {
    const questionIndex = step - 3
    const newAnswers = [...vibeAnswers]
    newAnswers[questionIndex] = answer
    setVibeAnswers(newAnswers)
  }

  const handleScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      setSelectedShape("hourglass")
    }, 2500)
  }

  const canProceed = () => {
    if (step === 1) return selectedShape !== null
    if (step === 2) return selectedHeight !== null
    if (step >= 3) return vibeAnswers[step - 3] !== undefined
    return true
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      onComplete({
        bodyShape: selectedShape,
        heightProfile: selectedHeight,
        vibeAnswers,
      })
    }
  }

  return (
    <section className="min-h-screen px-4 pb-24 pt-28 md:px-8 md:pb-20 md:pt-32">
      <div className="mx-auto max-w-4xl">
        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Body Shape Discovery</span>
            <span>Step {step} of {totalSteps}</span>
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              className="h-full bg-primary"
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Step 1: Body Shape Selection */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="mb-2 text-center font-serif text-3xl font-medium text-foreground md:text-4xl">
                Let&apos;s Discover Your Shape
              </h2>
              <p className="mb-8 text-center text-muted-foreground">
                Select what feels most like you, or let our AI scan help
              </p>

              {/* Body Shape Cards */}
              <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
                {bodyShapes.map((shape) => (
                  <motion.button
                    key={shape.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedShape(shape.id)}
                    className={`relative flex flex-col items-center rounded-2xl border-2 p-4 transition-all md:p-6 ${
                      selectedShape === shape.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    {selectedShape === shape.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -right-2 -top-2"
                      >
                        <CheckCircle2 className="h-6 w-6 fill-primary text-primary-foreground" />
                      </motion.div>
                    )}
                    <span className="mb-2 text-3xl md:text-4xl">{shape.icon}</span>
                    <span className="font-medium text-foreground">{shape.label}</span>
                    <span className="mt-1 hidden text-center text-xs text-muted-foreground md:block">
                      {shape.description}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Scan Option */}
              <div className="relative my-8 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <span className="relative bg-background px-4 text-sm text-muted-foreground">
                  or
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleScan}
                disabled={isScanning}
                className="mx-auto flex items-center gap-3 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 px-8 py-6 transition-colors hover:border-primary/60"
              >
                {isScanning ? (
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="h-6 w-6 rounded-full bg-primary/30"
                    />
                    <span className="text-primary">Scanning your vibe...</span>
                  </div>
                ) : (
                  <>
                    <Upload className="h-6 w-6 text-primary" />
                    <div className="text-left">
                      <span className="block font-medium text-foreground">Scan Me</span>
                      <span className="text-sm text-muted-foreground">Upload a full-body photo</span>
                    </div>
                  </>
                )}
              </motion.button>
            </motion.div>
          )}

          {/* Step 2: Height Profile Selection */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-2 flex items-center justify-center gap-2">
                <Ruler className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium uppercase tracking-wider text-primary">
                  Height Profile
                </span>
              </div>
              <h2 className="mb-2 text-center font-serif text-3xl font-medium text-foreground md:text-4xl">
                How Tall Are You?
              </h2>
              <p className="mb-8 text-center text-muted-foreground">
                This helps us suggest the perfect hemlines and proportions for you
              </p>

              <div className="grid gap-4 md:grid-cols-3">
                {heightProfiles.map((height, index) => (
                  <motion.button
                    key={height.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedHeight(height.id)}
                    className={`relative flex flex-col items-center rounded-2xl border-2 p-6 text-center transition-all ${
                      selectedHeight === height.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    {selectedHeight === height.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -right-2 -top-2"
                      >
                        <CheckCircle2 className="h-6 w-6 fill-primary text-primary-foreground" />
                      </motion.div>
                    )}
                    
                    {/* Visual Height Indicator */}
                    <div className="mb-4 flex items-end gap-1">
                      <div 
                        className={`w-3 rounded-t-full bg-primary/20 ${
                          height.id === "petite" ? "h-8" : height.id === "normal" ? "h-12" : "h-16"
                        }`}
                      />
                      <div 
                        className={`w-3 rounded-t-full ${
                          selectedHeight === height.id ? "bg-primary" : "bg-primary/40"
                        } ${
                          height.id === "petite" ? "h-10" : height.id === "normal" ? "h-14" : "h-20"
                        }`}
                      />
                      <div 
                        className={`w-3 rounded-t-full bg-primary/20 ${
                          height.id === "petite" ? "h-8" : height.id === "normal" ? "h-12" : "h-16"
                        }`}
                      />
                    </div>

                    <span className="font-serif text-xl font-medium text-foreground">
                      {height.label}
                    </span>
                    <span 
                      className="mt-1 text-sm text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: height.range }}
                    />
                    
                    {selectedHeight === height.id && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 rounded-lg bg-primary/10 px-4 py-2 text-xs leading-relaxed text-primary"
                      >
                        {height.tip}
                      </motion.p>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Aura's Voice Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mx-auto mt-8 max-w-md rounded-xl border border-primary/20 bg-primary/5 p-4"
              >
                <p className="text-center text-sm italic text-muted-foreground">
                  &quot;Hey bestie! Your height is just a starting point. I&apos;ll use this to suggest cuts that make you feel amazing, not to limit your choices.&quot;
                  <span className="mt-2 block text-primary">— Aura</span>
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* Steps 3-4: Vibe Check Quiz */}
          {step >= 3 && step <= 4 && (
            <motion.div
              key={`step${step}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-2 flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium uppercase tracking-wider text-primary">
                  Vibe Check
                </span>
              </div>
              <h2 className="mb-8 text-center font-serif text-2xl font-medium text-foreground md:text-3xl">
                {vibeQuestions[step - 3].question}
              </h2>

              <div className="grid gap-3 md:grid-cols-2 md:gap-4">
                {vibeQuestions[step - 3].options.map((option, index) => (
                  <motion.button
                    key={option}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleVibeAnswer(option)}
                    className={`rounded-xl border-2 bg-card p-4 text-left transition-all hover:border-primary/50 md:p-6 ${
                      vibeAnswers[step - 3] === option
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                  >
                    <span className="font-medium text-foreground">{option}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-0"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-medium text-background transition-all hover:scale-105 disabled:opacity-50"
          >
            <span>{step === totalSteps ? "Continue to Closet" : "Next"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
