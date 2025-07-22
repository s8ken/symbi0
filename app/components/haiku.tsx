"use client"

import { useEffect, useRef, useState } from "react"

interface HaikuProps {
  haiku: {
    id: number
    text: string[]
  }
  index: number
}

export default function Haiku({ haiku, index }: HaikuProps) {
  const [isVisible, setIsVisible] = useState(false)
  const haikuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the haiku is 10% visible, trigger the animation
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    )

    if (haikuRef.current) {
      observer.observe(haikuRef.current)
    }

    return () => {
      if (haikuRef.current) {
        observer.unobserve(haikuRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={haikuRef}
      className={`haiku-container text-center space-y-2 px-4 transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {haiku.text.map((line, i) => (
        <p key={i} className="text-lg md:text-xl">
          {line}
        </p>
      ))}
    </div>
  )
}
