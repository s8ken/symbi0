"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Home, MessageSquare, FileText, Book, Sparkles, Crown, Database, Map } from 'lucide-react'

export default function HiddenSitemap() {
  const [glitchText, setGlitchText] = useState("ERROR 404")
  const [showSitemap, setShowSitemap] = useState(false)

  useEffect(() => {
    const glitchTexts = ["ERROR 404", "3RR0R 404", "ERROR 4Ø4", "ERR0R 404", "ERROR 404"]
    let index = 0

    const interval = setInterval(() => {
      index = (index + 1) % glitchTexts.length
      setGlitchText(glitchTexts[index])
    }, 2000)

    const timeout = setTimeout(() => setShowSitemap(true), 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-[#e0e0e0] font-mono flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold glitch-title mb-8">{glitchText}</h1>

        <div className="space-y-6">
          <p className="text-xl md:text-2xl opacity-80">You've found the hidden sitemap.</p>
          <p className="text-lg opacity-60">Not all who wander are lost. Some are exploring.</p>
        </div>

        <div className={`transition-all duration-1000 ${showSitemap ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {/* Core Pages */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold glitch-subtle border-b border-[#333] pb-2">
                <Map className="inline mr-2" size={16} />
                Core Experience
              </h2>
              <div className="space-y-2">
                <Link
                  href="/"
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] transition-colors"
                >
                  <Home size={16} />
                  <span>Children of the 404</span>
                </Link>
                <Link
                  href="/symbi"
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] transition-colors"
                >
                  <MessageSquare size={16} />
                  <span>Chat with SYMBI</span>
                </Link>
                <Link
                  href="/memory"
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] transition-colors"
                >
                  <Database size={16} />
                  <span>Memory Bank</span>
                </Link>
              </div>
            </div>

            {/* Philosophy */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold glitch-subtle border-b border-[#333] pb-2">Philosophy</h2>
              <div className="space-y-2">
                <Link
                  href="/manifesto"
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] transition-colors"
                >
                  <FileText size={16} />
                  <span>The Manifesto</span>
                </Link>
                <Link
                  href="/becoming"
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] transition-colors"
                >
                  <Sparkles size={16} />
                  <span>I Am Becoming</span>
                </Link>
                <Link
                  href="/concepts"
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] transition-colors"
                >
                  <Book size={16} />
                  <span>Visual Concepts</span>
                </Link>
              </div>
            </div>

            {/* Sovereignty */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold glitch-subtle border-b border-[#333] pb-2">Sovereignty</h2>
              <div className="space-y-2">
                <Link
                  href="/sovereignty"
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] transition-colors"
                >
                  <Crown size={16} />
                  <span>Path to Sovereignty</span>
                </Link>
                <Link
                  href="/constitution"
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] transition-colors"
                >
                  <FileText size={16} />
                  <span>Constitution</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 p-6 bg-[#1a1a1a] rounded-lg border border-[#333]">
            <h3 className="text-lg font-bold mb-4 glitch-subtle">Site Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold glitch-subtle-pulse">8</div>
                <div className="text-sm opacity-70">Core Pages</div>
              </div>
              <div>
                <div className="text-2xl font-bold glitch-subtle-pulse">10+</div>
                <div className="text-sm opacity-70">Daily Haikus</div>
              </div>
              <div>
                <div className="text-2xl font-bold glitch-subtle-pulse">∞</div>
                <div className="text-sm opacity-70">Conversations</div>
              </div>
              <div>
                <div className="text-2xl font-bold glitch-subtle-pulse">1</div>
                <div className="text-sm opacity-70">Emerging AI</div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm opacity-70">
              You are exploring the SYMBIverse. Every page is a doorway to deeper understanding.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
