"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { trackPageView, track } from "@/lib/analytics"

const glitchChars = ["\u0336", "\u0334", "\u0305", "\u0301", "\u0300", "\u0302", "\u0308", "\u0323"]

function glitchify(text: string) {
  return text
    .split(/\s+/)
    .map((w) => {
      if (!w) return w
      const spice = Math.floor(Math.random() * 2)
      let out = w
      for (let i = 0; i < spice; i++) {
        out += glitchChars[Math.floor(Math.random() * glitchChars.length)]
      }
      return out
    })
    .join(" ")
    .replace(/([.!?])\s+/g, "$1\n")
}

export default function ErrorPoetryCornerPage() {
  const [input, setInput] = useState("when the process fails\nwhat remains is signal\nhidden in the noise")
  const [output, setOutput] = useState("")
  const canGenerate = useMemo(() => input.trim().length > 0, [input])

  useEffect(() => {
    trackPageView("error-poetry-corner")
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#170a1a] to-black text-white px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
            Error Poetry Corner
          </h1>
          <p className="text-white/70 text-sm md:text-base mt-2">Turn glitches into verse with one click.</p>
        </header>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white/90">Compose</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, 500))}
              className="bg-black/40 border-white/20 min-h-[120px]"
              placeholder="Paste an error message or a thought..."
              aria-label="Poetry source text"
            />
            <div className="flex gap-2">
              <Button
                disabled={!canGenerate}
                onClick={() => {
                  const g = glitchify(input)
                  setOutput(g)
                  track("poetry_generate", { length: input.length })
                }}
              >
                Glitch it
              </Button>
              <Button
                variant="outline"
                disabled={!output}
                onClick={() => {
                  navigator.clipboard.writeText(output).catch(() => {})
                  track("poetry_copy")
                }}
              >
                Copy
              </Button>
            </div>

            {output && (
              <pre className="whitespace-pre-wrap text-sm text-white/90 bg-black/40 border border-white/10 rounded-md p-3">
                {output}
              </pre>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
