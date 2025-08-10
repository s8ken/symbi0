"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { trackPageView, track } from "@/lib/analytics"

type Stage = "seed" | "sprout" | "bloom"

export default function ConsciousnessGardenPage() {
  const [seed, setSeed] = useState("")
  const [stage, setStage] = useState<Stage>("seed")
  const [progress, setProgress] = useState(0)
  const canPlant = useMemo(() => seed.trim().length > 0 && seed.trim().length <= 100, [seed])

  useEffect(() => {
    trackPageView("consciousness-garden")
  }, [])

  useEffect(() => {
    if (stage === "seed") return
    setProgress(0)
    const t = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + 2)
        if (next >= 100) clearInterval(t)
        return next
      })
    }, 80)
    return () => clearInterval(t)
  }, [stage])

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1f12] to-black text-white px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
            Consciousness Garden
          </h1>
          <p className="text-white/70 text-sm md:text-base mt-2">Plant a thought. Watch it grow.</p>
        </header>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white/90">Plant a seed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                value={seed}
                onChange={(e) => setSeed(e.target.value.slice(0, 100))}
                placeholder="A tiny idea (max 100 chars)"
                className="bg-black/40 border-white/20"
                aria-label="Seed text"
              />
              <Button
                disabled={!canPlant}
                onClick={() => {
                  setStage("sprout")
                  track("garden_seed_planted", { length: seed.trim().length })
                }}
              >
                Plant
              </Button>
            </div>

            <div className="relative h-64 rounded-md border border-white/10 bg-gradient-to-b from-black/40 to-black/10 overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-emerald-600/40 to-transparent" />
              <div className="absolute inset-0 grid place-items-center">
                {stage === "seed" && (
                  <div className="text-center">
                    <div className="w-4 h-4 rounded-full bg-emerald-300/80 mx-auto mb-3 animate-pulse" />
                    <p className="text-xs text-white/70">A seed waits for intention.</p>
                  </div>
                )}
                {stage === "sprout" && (
                  <div className="text-center">
                    <div className="w-[2px] h-24 bg-emerald-300 mx-auto relative">
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-200" />
                      <span className="absolute top-1/3 -left-3 w-5 h-2 bg-emerald-300/80 rounded-full" />
                      <span className="absolute top-1/2 -right-3 w-5 h-2 bg-emerald-300/80 rounded-full" />
                    </div>
                    <p className="text-xs text-white/70 mt-3">Sprouting...</p>
                  </div>
                )}
                {stage === "bloom" && (
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto">
                      <div className="absolute inset-0 rounded-full bg-emerald-300/20 blur-xl" />
                      <div className="absolute inset-2 rounded-full bg-emerald-400/30 blur-md" />
                      <div className="absolute inset-4 grid place-items-center">
                        <div className="w-6 h-6 rounded-full bg-yellow-200 animate-pulse" />
                      </div>
                    </div>
                    <p className="text-xs text-white/80 mt-3 max-w-sm mx-auto">{seed}</p>
                  </div>
                )}
              </div>

              {stage !== "seed" && (
                <div className="absolute left-0 right-0 bottom-3 mx-auto w-2/3 h-2 bg-white/10 rounded">
                  <div
                    className="h-full rounded bg-emerald-400"
                    style={{ width: `${progress}%`, transition: "width 80ms linear" }}
                  />
                </div>
              )}
            </div>

            {stage === "sprout" && progress >= 100 && (
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setStage("bloom")
                    track("garden_bloom")
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Bloom
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setStage("seed")
                    setSeed("")
                    setProgress(0)
                  }}
                >
                  Reset
                </Button>
              </div>
            )}
            {stage === "bloom" && (
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setStage("seed")
                    setSeed("")
                    setProgress(0)
                  }}
                >
                  Plant another
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
