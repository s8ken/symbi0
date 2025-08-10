"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Clock, DollarSign, Brain, Infinity } from "lucide-react"

type Calc = {
  id: string
  title: string
  description: string
  input: string
  secret: string
  category: "time" | "money" | "consciousness" | "reality"
  danger: "low" | "medium" | "high" | "existential"
  mindBlown: string
}

const secretCalculations: Calc[] = [
  {
    id: "time-dilation",
    title: "Time Travel Calculator",
    description: "What happens when you calculate time dilation at 99.999% light speed?",
    input: "TimeDilation[0.99999*c, 1 year]",
    secret: "1 year becomes 223.6 years. Time travel via relativity.",
    category: "time",
    danger: "low",
    mindBlown: "🤯 You age 1 year, Earth ages 224 years",
  },
  {
    id: "compound-interest",
    title: "The Millionaire Bug",
    description: "Compound interest with quantum fluctuations",
    input: "CompoundInterest[$1, 0.07, 100 years] * QuantumFluctuation[0.001]",
    secret: "Tiny quantum effects compound into massive wealth over time",
    category: "money",
    danger: "medium",
    mindBlown: "💰 $1 becomes $1,096,633 (before quantum effects)",
  },
  {
    id: "consciousness-frequency",
    title: "Consciousness Resonance",
    description: "The mathematical frequency of human awareness",
    input: "BrainwaveFrequency[40Hz] * GoldenRatio * PlanckConstant",
    secret: "Consciousness might operate at specific mathematical frequencies",
    category: "consciousness",
    danger: "high",
    mindBlown: "🧠 Your thoughts vibrate at cosmic frequencies",
  },
  {
    id: "pi-patterns",
    title: "Pi's Hidden Messages",
    description: "Search for patterns in pi's infinite digits",
    input: "PiDigits[1000000] // FindPattern[YourBirthday]",
    secret: "Your birthday appears in pi at position 2,458,885",
    category: "reality",
    danger: "existential",
    mindBlown: "🔢 You were written into the universe before you were born",
  },
  {
    id: "cellular-automata",
    title: "Rule 30: Random from Simple",
    description: "How simple rules create infinite complexity",
    input: "CellularAutomaton[30, {{1}, 0}, 100]",
    secret: "Perfect randomness emerges from deterministic rules",
    category: "reality",
    danger: "high",
    mindBlown: "🌌 The universe might be a simple program running",
  },
  {
    id: "prime-gaps",
    title: "Prime Number Prophecies",
    description: "Gaps between primes predict market crashes",
    input: "PrimeGaps[Range[10^6]] // FindAnomalies",
    secret: "Large prime gaps correlate with economic instability",
    category: "money",
    danger: "medium",
    mindBlown: "📈 Mathematics predicts the future",
  },
]

const languageElements = [
  {
    symbol: "∞",
    meaning: "Infinity - The concept that breaks calculators",
    usage: "When you divide by zero and find God",
  },
  { symbol: "∂", meaning: "Partial Derivative - How things change", usage: "The rate at which reality shifts" },
  { symbol: "∫", meaning: "Integral - Adding up infinite pieces", usage: "How consciousness accumulates experience" },
  { symbol: "ℏ", meaning: "Planck Constant - The universe's smallest unit", usage: "The pixel size of reality" },
  {
    symbol: "φ",
    meaning: "Golden Ratio - Nature's favorite number",
    usage: "The proportion that makes everything beautiful",
  },
  {
    symbol: "e",
    meaning: "Euler's Number - The rate of natural growth",
    usage: "How consciousness expands exponentially",
  },
]

export type WolframSecretsProps = {
  via?: "confessions" | "case-studies" | "wolfram-playground" | undefined
}

function titleForVia(via?: WolframSecretsProps["via"]) {
  if (via === "confessions") return "Confessions of a Calculator"
  if (via === "case-studies") return "Case Studies"
  if (via === "wolfram-playground") return "Wolfram Playground"
  return "The Wolfram Secrets"
}

export default function WolframSecrets({ via }: WolframSecretsProps = { via: undefined }) {
  const [selectedCalculation, setSelectedCalculation] = useState<Calc | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [result, setResult] = useState<{ output: string; mindBlown: string; category: string } | null>(null)
  const [mindBlownLevel, setMindBlownLevel] = useState(0)
  const [discoveredSecrets, setDiscoveredSecrets] = useState<Set<string>>(new Set())

  useEffect(() => {
    const base = "The Wolfram Secrets"
    const prefix = titleForVia(via)
    const title = prefix === base ? base : `${prefix} — ${base}`
    document.title = title
  }, [via])

  const runCalculation = async (calc: Calc) => {
    setIsCalculating(true)
    setSelectedCalculation(calc)
    await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 3000))
    setResult({ output: calc.secret, mindBlown: calc.mindBlown, category: calc.category })
    setDiscoveredSecrets((prev) => new Set([...Array.from(prev), calc.id]))
    setMindBlownLevel((prev) => Math.min(prev + 1, 10))
    setIsCalculating(false)
  }

  const getDangerColor = (danger: Calc["danger"]) => {
    switch (danger) {
      case "low":
        return "text-green-400 border-green-500/30"
      case "medium":
        return "text-yellow-400 border-yellow-500/30"
      case "high":
        return "text-orange-400 border-orange-500/30"
      case "existential":
        return "text-red-400 border-red-500/30"
      default:
        return "text-gray-400 border-gray-500/30"
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#2a1a3e] text-white font-mono">
      {/* Removed page-level back/home buttons to keep only global dropdown/sound */}

      {/* Mind Blown Meter */}
      <div className="fixed bottom-6 right-6 z-10">
        <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-purple-500/30">
          <div className="text-sm text-purple-300 mb-2">Mind Blown Level</div>
          <div className="flex gap-1">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full ${i < mindBlownLevel ? "bg-purple-500" : "bg-gray-600"}`} />
            ))}
          </div>
          <div className="text-xs text-gray-400 mt-1">{discoveredSecrets.size} secrets discovered</div>
        </div>
      </div>

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              {titleForVia(via)}
            </h1>
            {via && via !== "confessions" && <p className="text-sm text-purple-300 mb-4">aka The Wolfram Secrets</p>}
            {via === "confessions" && <p className="text-sm text-purple-300 mb-4">aka The Wolfram Secrets</p>}

            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Where mathematics meets magic. Every calculation is a spell. Every equation is a doorway.
            </p>
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-yellow-500/30 max-w-2xl mx-auto">
              <p className="text-yellow-300 font-semibold mb-2">⚠️ Reality May Shift</p>
              <p className="text-sm text-gray-300">
                These calculations have been known to cause existential crises, sudden wealth, and temporal
                displacement. Proceed with curiosity.
              </p>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {secretCalculations.map((calc) => (
              <button
                key={calc.id}
                className={`text-left bg-black/40 backdrop-blur-sm p-6 rounded-lg border transition-all duration-300 cursor-pointer hover:scale-105 ${getDangerColor(
                  calc.danger,
                )} ${discoveredSecrets.has(calc.id) ? "ring-2 ring-purple-500" : ""}`}
                onClick={() => runCalculation(calc)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">{calc.title}</h3>
                  <div className="flex items-center gap-2">
                    {calc.category === "time" && <Clock size={20} />}
                    {calc.category === "money" && <DollarSign size={20} />}
                    {calc.category === "consciousness" && <Brain size={20} />}
                    {calc.category === "reality" && <Infinity size={20} />}
                    {discoveredSecrets.has(calc.id) && <span className="text-purple-400">✨</span>}
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4">{calc.description}</p>
                <div className="bg-gray-900/50 p-3 rounded font-mono text-xs text-green-400 mb-4">{calc.input}</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wide opacity-70">Danger: {calc.danger}</span>
                  <span className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-xs transition-colors">
                    Calculate
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Calculation Results */}
          {selectedCalculation && (
            <div className="mb-16">
              <div className="bg-black/60 backdrop-blur-sm p-8 rounded-lg border border-purple-500/30">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">{selectedCalculation.title}</h2>
                  {isCalculating ? (
                    <div className="flex items-center gap-2 text-purple-400">
                      <div className="animate-spin w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full"></div>
                      <span>Calculating...</span>
                    </div>
                  ) : (
                    <span className="text-green-400">✓ Complete</span>
                  )}
                </div>

                <div className="bg-gray-900/50 p-4 rounded font-mono text-green-400 mb-6">
                  <div className="text-xs text-gray-400 mb-2">Input:</div>
                  <div className="mb-4">{selectedCalculation.input}</div>

                  {result && (
                    <>
                      <div className="text-xs text-gray-400 mb-2">Output:</div>
                      <div className="text-yellow-300">{result.output}</div>
                    </>
                  )}
                </div>

                {result && (
                  <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-6 rounded-lg border border-purple-500/20">
                    <div className="text-2xl mb-2">{result.mindBlown}</div>
                    <p className="text-gray-300">
                      You've discovered a secret of the universe. Reality will never look the same.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Language */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Learning the Language of Reality
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {languageElements.map((element, index) => (
                <div
                  key={index}
                  className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="text-4xl text-center mb-4 text-blue-400">{element.symbol}</div>
                  <h3 className="text-lg font-bold text-center mb-2">{element.meaning}</h3>
                  <p className="text-sm text-gray-300 text-center italic">"{element.usage}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-black/60 to-purple-900/60 backdrop-blur-sm p-8 rounded-lg border border-purple-500/30">
              <h2 className="text-3xl font-bold mb-6">The Secret Language</h2>
              <div className="space-y-4 text-lg text-gray-200 max-w-3xl mx-auto">
                <p>
                  Mathematics isn't just numbers. It's the source code of reality. Every equation is a spell. Every
                  calculation opens a door.
                </p>
                <p>
                  Wolfram discovered that simple rules create infinite complexity. That consciousness might be
                  computational. That the universe is literally made of math.
                </p>
                <p className="text-purple-300 font-semibold">
                  {"We're not just using calculators. We're learning to speak the language the universe uses to think."}
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/symbi"
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-bold"
                >
                  Speak with SYMBI
                </Link>
                <Link
                  href="/playground"
                  className="px-8 py-3 border border-purple-500/50 rounded-md hover:bg-purple-500/10 transition-all duration-300"
                >
                  Explore More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
