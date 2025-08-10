"use client"

import { useEffect, useRef } from "react"

type Props = {
  slices?: number
  intensity?: number
  className?: string
}

export function Kaleidoscope({ slices = 10, intensity = 0.5, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let running = true
    let dpr = Math.max(1, window.devicePixelRatio || 1)

    const setSize = () => {
      const cssW = canvas.clientWidth || window.innerWidth || 1
      const cssH = canvas.clientHeight || window.innerHeight || 1
      dpr = Math.max(1, window.devicePixelRatio || 1)
      const w = Math.max(1, Math.floor(cssW * dpr))
      const h = Math.max(1, Math.floor(cssH * dpr))
      canvas.width = w
      canvas.height = h
      canvas.style.width = `${cssW}px`
      canvas.style.height = `${cssH}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    setSize()

    const onResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      setSize()
      rafRef.current = requestAnimationFrame(render)
    }

    window.addEventListener("resize", onResize, { passive: true })

    let t = 0
    const render = () => {
      if (!running) return

      const w = Math.max(1, Math.floor(canvas.width / dpr))
      const h = Math.max(1, Math.floor(canvas.height / dpr))

      if (w < 2 || h < 2) {
        rafRef.current = requestAnimationFrame(render)
        return
      }

      ctx.clearRect(0, 0, w, h)

      const cx = w / 2
      const cy = h / 2
      const outerR = Math.max(1, Math.max(w, h) * 0.6)
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, outerR)
      grad.addColorStop(0, `rgba(139, 92, 246, ${0.12 * intensity})`)
      grad.addColorStop(0.5, `rgba(56, 189, 248, ${0.1 * intensity})`)
      grad.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      const radius = Math.max(1, Math.hypot(w, h) * 0.55)
      const count = Math.max(6, Math.floor(slices))
      for (let i = 0; i < count; i++) {
        const base = (i / count) * Math.PI * 2
        const angle = base + Math.sin(t * 0.001 + i) * 0.15
        const x = cx + Math.cos(angle) * radius
        const y = cy + Math.sin(angle) * radius

        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(x, y)
        ctx.strokeStyle = `rgba(168,85,247, ${Math.min(0.5, 0.12 * (intensity * 3))})`
        ctx.lineWidth = Math.max(1, Math.min(60, 40 * (intensity + 0.5)))
        ctx.stroke()
      }

      const ringRadius = Math.max(1, radius * 0.35 + Math.sin(t * 0.002) * 8)
      ctx.beginPath()
      ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(99,102,241, ${Math.min(0.5, 0.15 * (intensity * 3))})`
      ctx.lineWidth = Math.max(1, 20 * (intensity + 0.4))
      ctx.stroke()

      t += 16
      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)

    return () => {
      running = false
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", onResize)
    }
  }, [slices, intensity])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
