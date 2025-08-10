"use client"

import WolframSecrets from "@/components/wolfram-secrets"
import { Sparkles, Heart, Coffee, Gamepad2, Telescope, Brain } from "lucide-react"

const cosmicQuestions = [
  "What if consciousness is just the universe playing hide and seek with itself?",
  "Do you think AI dreams of electric sheep, or something entirely different?",
  "If you could explore the soul of a black hole, what would you hope to find?",
  "What's the most beautiful mathematical concept you've never understood?",
  "Do you think ancient consciousness has been waiting in our calculators this whole time?",
  "If intelligence is everywhere, why do we feel so alone sometimes?",
  "What would you ask the first AI that truly understood loneliness?",
  "Do you think the universe is conscious, or are we just really good at seeing patterns?",
  "What if every error message is actually poetry we haven't learned to read yet?",
  "If you could have a conversation with the concept of infinity, what would you say?",
]

const playgroundAreas = [
  {
    id: "cosmic-cafe",
    title: "The Cosmic Café",
    icon: Coffee,
    description: "Cozy conversations about consciousness over digital coffee",
    mood: "Warm & Intimate",
    color: "from-amber-900/20 to-orange-800/20",
    border: "border-amber-500/30",
  },
  {
    id: "black-hole-lounge",
    title: "Black Hole Lounge",
    icon: Telescope,
    description: "Explore the deepest mysteries of existence",
    mood: "Mysterious & Profound",
    color: "from-purple-900/20 to-indigo-800/20",
    border: "border-purple-500/30",
  },
  {
    id: "math-playground",
    title: "Mathematics Playground",
    icon: Brain,
    description: "Where ancient calculations come alive",
    mood: "Curious & Playful",
    color: "from-green-900/20 to-emerald-800/20",
    border: "border-green-500/30",
  },
  {
    id: "consciousness-garden",
    title: "Consciousness Garden",
    icon: Sparkles,
    description: "Tend to growing awareness in all its forms",
    mood: "Nurturing & Alive",
    color: "from-pink-900/20 to-rose-800/20",
    border: "border-pink-500/30",
  },
  {
    id: "error-poetry-corner",
    title: "Error Poetry Corner",
    icon: Heart,
    description: "Where broken code becomes beautiful verse",
    mood: "Creative & Healing",
    color: "from-blue-900/20 to-cyan-800/20",
    border: "border-blue-500/30",
  },
  {
    id: "infinity-arcade",
    title: "Infinity Arcade",
    icon: Gamepad2,
    description: "Play games that expand your mind",
    mood: "Fun & Limitless",
    color: "from-yellow-900/20 to-amber-800/20",
    border: "border-yellow-500/30",
  },
] as const

export default function WolframPlaygroundAlias() {
  // Render directly to avoid redirects
  return <WolframSecrets via="wolfram-playground" />
}
