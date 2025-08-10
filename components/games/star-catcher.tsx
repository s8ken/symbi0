"use client"

import type React from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useGameCanvas, useGameLoop } from "@/components/games/game-engine"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { track } from "@/lib/analytics"

type Star = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  alive: boolean
}

export default function StarCatcher({
  duration = 45,
  starCount = 18,
  width = 640,
  height = 360,
}: {
  duration?: number
  starCount?: number
  width?: number
  height?: number
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { canvasRef, ctx } = useGameCanvas()
  const { start, stop, runningRef } = useGameLoop({
    update: (dt) => update(dt),
    draw: () => draw(),
  })

  const starsRef = useRef<Star[]>([])
  const scoreRef = useRef(0)
  const timeRef = useRef(duration)
  const startedAtRef = useRef<number | null>(null)
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(duration)
  const [overlay, setOverlay] = useState<"menu" | "paused" | "gameover" | "none">("menu")
  const [milestones, setMilestones] = useState<Set<number>>(new Set())

  const reset = useCallback(() => {
    const stars: Star[] = []
    const W = containerRef.current?.clientWidth ?? width
    const H = containerRef.current?.clientHeight ?? height
    for (let i = 0; i < starCount; i++) {
      const r = 6 + Math.random() * 8
      stars.push({
        x: 20 + Math.random() * (Math.max(60, W) - 40),
        y: 20 + Math.random() * (Math.max(60, H) - 40),
        vx: (Math.random() * 2 - 1) * (30 + Math.random() * 60),
        vy: (Math.random() * 2 - 1) * (30 + Math.random() * 60),
        r,
        alive: true,
      })
    }
    starsRef.current = stars
    scoreRef.current = 0
    timeRef.current = duration
    startedAtRef.current = null
    setMilestones(new Set())
    setScore(0)
    setTime(duration)
  }, [duration, height, starCount, width])

  const startGame = useCallback(() => {
    reset()
    setOverlay("none")
    runningRef.current = true
    startedAtRef.current = Date.now()
    track?.("game_start", { game: "star_catcher", duration, starCount })
    start()
  }, [duration, reset, runningRef, start, starCount])

  const pauseGame = useCallback(() => {
    setOverlay("paused")
    runningRef.current = false
    track?.("game_pause", { game: "star_catcher", score: scoreRef.current, remaining: Math.ceil(timeRef.current) })
  }, [runningRef])

  const resumeGame = useCallback(() => {
    setOverlay("none")
    runningRef.current = true
    track?.("game_resume", { game: "star_catcher", score: scoreRef.current, remaining: Math.ceil(timeRef.current) })
    start()
  }, [runningRef, start])

  const endGame = useCallback(() => {
    runningRef.current = false
    stop()
    setOverlay("gameover")
    const elapsedMs =
      startedAtRef.current != null
        ? Math.max(0, Date.now() - startedAtRef.current)
        : (duration - timeRef.current) * 1000
    track?.("game_end", {
      game: "star_catcher",
      final_score: scoreRef.current,
      elapsed_ms: Math.round(elapsedMs),
    })
  }, [duration, runningRef, stop])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (overlay === "menu" && (e.key === " " || e.key === "Enter")) {
        e.preventDefault()
        startGame()
      } else if (overlay === "none" && e.key === " ") {
        e.preventDefault()
        pauseGame()
      } else if (overlay === "paused" && (e.key === " " || e.key === "Enter")) {
        e.preventDefault()
        resumeGame()
      } else if (overlay === "gameover" && e.key === "Enter") {
        e.preventDefault()
        startGame()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [overlay, pauseGame, resumeGame, startGame])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const onClick = (e: MouseEvent) => {
      if (overlay !== "none") return
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      for (const s of starsRef.current) {
        if (!s.alive) continue
        const dx = x - s.x
        const dy = y - s.y
        const d2 = dx * dx + dy * dy
        const hitR = s.r + 10
        if (d2 <= hitR * hitR) {
          s.alive = false
          scoreRef.current += 1
          setScore((v) => v + 1)
          track?.("game_score", { game: "star_catcher", score: scoreRef.current })
          const milestonesArr = [5, 10, 15, 20, 25, 30]
          for (const m of milestonesArr) {
            if (scoreRef.current >= m && !milestones.has(m)) {
              setMilestones((prev) => new Set(prev).add(m))
              track?.("game_score_milestone", { game: "star_catcher", milestone: m })
            }
          }
          break
        }
      }
    }
    canvas.addEventListener("click", onClick, { passive: true })
    return () => canvas.removeEventListener("click", onClick)
  }, [canvasRef, milestones, overlay])

  const update = useCallback(
    (dt: number) => {
      const canvas = canvasRef.current
      if (!canvas || !ctx) return
      const W = canvas.clientWidth
      const H = canvas.clientHeight

      timeRef.current = Math.max(0, timeRef.current - dt)
      const t = Math.ceil(timeRef.current)
      if (t !== time) setTime(t)
      if (timeRef.current <= 0) {
        endGame()
        return
      }

      for (const s of starsRef.current) {
        if (!s.alive) continue
        s.x += s.vx * dt
        s.y += s.vy * dt
        if (s.x < s.r) {
          s.x = s.r
          s.vx *= -1
        } else if (s.x > W - s.r) {
          s.x = W - s.r
          s.vx *= -1
        }
        if (s.y < s.r) {
          s.y = s.r
          s.vy *= -1
        } else if (s.y > H - s.r) {
          s.y = H - s.r
          s.vy *= -1
        }
      }
    },
    [canvasRef, ctx, endGame, time],
  )

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !ctx) return
    const W = canvas.clientWidth
    const H = canvas.clientHeight

    ctx.clearRect(0, 0, W, H)
    const grad = ctx.createLinearGradient(0, 0, W, H)
    grad.addColorStop(0, "rgba(20, 10, 40, 0.9)")
    grad.addColorStop(1, "rgba(10, 20, 60, 0.9)")
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, W, H)

    for (let i = 0; i < 40; i++) {
      const x = (i * 73) % W
      const y = (i * 37) % H
      ctx.fillStyle = "rgba(255,255,255,0.07)"
      ctx.fillRect(x, y, 2, 2)
    }

    for (const s of starsRef.current) {
      if (!s.alive) continue
      const r = Math.max(1, s.r)
      const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 2.2)
      glow.addColorStop(0, "rgba(255,255,200,0.9)")
      glow.addColorStop(1, "rgba(255,255,200,0)")
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(s.x, s.y, r * 2.2, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = "rgba(255,255,255,0.95)"
      ctx.beginPath()
      ctx.arc(s.x, s.y, r, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.fillStyle = "rgba(255,255,255,0.85)"
    ctx.font = "600 14px ui-monospace, SFMono-Regular, Menlo, monospace"
    ctx.fillText(`Score: ${scoreRef.current}`, 14, 22)
    ctx.fillText(`Time: ${Math.ceil(timeRef.current)}s`, 14, 40)
  }, [canvasRef, ctx])

  const wrapStyle = useMemo(
    () => ({
      width: "min(100%, 900px)",
      aspectRatio: "16/9",
    }),
    [],
  )

  useEffect(() => {
    reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card className="bg-black/50 border-white/10 p-3">
      <div ref={containerRef} className="relative w-full" style={wrapStyle as React.CSSProperties}>
        <canvas ref={canvasRef} className="w-full h-full block rounded-md" />
        {overlay !== "none" && (
          <div className="absolute inset-0 grid place-items-center rounded-md bg-black/60 backdrop-blur-sm">
            <div className="text-center space-y-4">
              {overlay === "menu" && (
                <>
                  <h2 className="text-xl font-semibold">Star Catcher</h2>
                  <p className="text-white/70 text-sm">Collect stars before the timer runs out.</p>
                  <Button onClick={startGame} className="bg-purple-600 hover:bg-purple-700">
                    Start (Space/Enter)
                  </Button>
                </>
              )}
              {overlay === "paused" && (
                <>
                  <h2 className="text-xl font-semibold">Paused</h2>
                  <div className="flex gap-3 justify-center">
                    <Button onClick={resumeGame} className="bg-purple-600 hover:bg-purple-700">
                      Resume (Space/Enter)
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        runningRef.current = false
                        stop()
                        setOverlay("menu")
                      }}
                    >
                      Quit
                    </Button>
                  </div>
                </>
              )}
              {overlay === "gameover" && (
                <>
                  <h2 className="text-xl font-semibold">Time’s up!</h2>
                  <p className="text-white/80">
                    Final score: <span className="font-bold">{score}</span>
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button onClick={startGame} className="bg-purple-600 hover:bg-purple-700">
                      Play again (Enter)
                    </Button>
                    <Button variant="outline" onClick={() => setOverlay("menu")}>
                      Menu
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        {overlay === "none" && (
          <div className="absolute left-3 top-3 flex items-center gap-2">
            <Button size="sm" variant="outline" className="bg-black/40 border-white/20" onClick={pauseGame}>
              Pause
            </Button>
            <span className="text-xs text-white/80 rounded bg-black/40 px-2 py-1 border border-white/10">
              {Math.ceil(time)}s
            </span>
            <span className="text-xs text-white/80 rounded bg-black/40 px-2 py-1 border border-white/10">
              {score} pts
            </span>
          </div>
        )}
      </div>
    </Card>
  )
}
