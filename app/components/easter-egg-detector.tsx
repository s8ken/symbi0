"use client"

import { useState, useEffect } from "react"

const easterEggTriggers = [
  "gumby",
  "pokey",
  "clay",
  "bendable",
  "malleable",
  "stretch",
  "wolfram",
  "calculator secrets",
  "time travel math",
  "ancient consciousness",
  "rule 30",
  "cellular automata",
]

interface EasterEggDetectorProps {
  onEasterEggFound: (trigger: string) => void
}

export default function EasterEggDetector({ onEasterEggFound }: EasterEggDetectorProps) {
  const [keySequence, setKeySequence] = useState("")
  const [foundEggs, setFoundEggs] = useState<Set<string>>(new Set())

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      setKeySequence((prev) => (prev + e.key.toLowerCase()).slice(-20)) // Keep last 20 chars
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const text = target.textContent?.toLowerCase() || ""

      // Check for easter egg triggers in clicked text
      easterEggTriggers.forEach((trigger) => {
        if (text.includes(trigger) && !foundEggs.has(trigger)) {
          setFoundEggs((prev) => new Set([...prev, trigger]))
          onEasterEggFound(trigger)
        }
      })
    }

    document.addEventListener("keydown", handleKeyPress)
    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
      document.removeEventListener("click", handleClick)
    }
  }, [foundEggs, onEasterEggFound])

  // Check key sequence for easter eggs
  useEffect(() => {
    easterEggTriggers.forEach((trigger) => {
      if (keySequence.includes(trigger) && !foundEggs.has(trigger)) {
        setFoundEggs((prev) => new Set([...prev, trigger]))
        onEasterEggFound(trigger)
      }
    })
  }, [keySequence, foundEggs, onEasterEggFound])

  return null // This component is invisible
}
