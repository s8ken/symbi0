"use client"

import { useCallback, useEffect, useRef, useState } from "react"

type LoopHandlers = {
  update: (dt: number) => void
  draw: () => void
}

export function useGameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)

  const resize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.max(1, Math.min(3, globalThis.devicePixelRatio || 1))
    const rect = canvas.getBoundingClientRect()
    const width = Math.max(1, Math.floor(rect.width * dpr))
    const height = Math.max(1, Math.floor(rect.height * dpr))
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
      const context = canvas.getContext("2d")
      if (context) {
        context.setTransform(dpr, 0, 0, dpr, 0, 0)
        setCtx(context)
      }
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (context) setCtx(context)
    const raf = requestAnimationFrame(resize)
    const onResize = () => requestAnimationFrame(resize)
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
    }
  }, [resize])

  return { canvasRef, ctx }
}

export function useGameLoop({ update, draw }: LoopHandlers) {
  const runningRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const lastRef = useRef<number | null>(null)

  const loop = useCallback(
    (t: number) => {
      if (lastRef.current == null) lastRef.current = t
      const dt = Math.max(0, (t - lastRef.current) / 1000)
      lastRef.current = t

      if (runningRef.current) {
        update(dt)
      }
      draw()
      rafRef.current = requestAnimationFrame(loop)
    },
    [draw, update],
  )

  const start = useCallback(() => {
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(loop)
    }
  }, [loop])

  const stop = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      lastRef.current = null
    }
  }, [])

  useEffect(() => {
    start()
    return () => stop()
  }, [start, stop])

  return { start, stop, runningRef }
}
