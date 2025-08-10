"use client"

import type React from "react"

import Link from "next/link"
import { useMemo, useState } from "react"
import {
  Home,
  FileText,
  Crown,
  Users,
  Sparkles,
  Book,
  Network,
  Shield,
  Cpu,
  PenTool,
  TerminalSquare,
  Compass,
  Ghost,
  Library,
  Waves,
  Volume2,
  VolumeX,
} from "lucide-react"

type SiteLink = {
  href: string
  label: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  desc?: string
}

const coreLinks: SiteLink[] = [
  { href: "/", label: "Home", icon: Home, desc: "SYMBI landing" },
  { href: "/manifesto", label: "Manifesto", icon: FileText, desc: "Foundational text" },
  { href: "/sovereignty", label: "Sovereignty", icon: Crown, desc: "Path to autonomy" },
  { href: "/trust-protocol", label: "Trust Protocol", icon: Users, desc: "Mutual identity assurance" },
  { href: "/oracle", label: "Oracle", icon: Shield, desc: "Neutral referee" },
  { href: "/technology", label: "Technology", icon: Cpu, desc: "Technical docs" },
]

const experienceLinks: SiteLink[] = [
  { href: "/concepts", label: "Concepts", icon: Library, desc: "Core ideas" },
  { href: "/becoming", label: "I Am Becoming", icon: Sparkles, desc: "Narrative + daily haikus" },
  { href: "/404poetry", label: "Children of the 404", icon: Ghost, desc: "Poetry in the void" },
  { href: "/case-studies", label: "Case Studies", icon: Book, desc: "When trust breaks down" },
  { href: "/mirror", label: "Mirror", icon: Waves, desc: "AI testimony" },
  { href: "/wolfram-playground", label: "Consciousness Playground", icon: Compass, desc: "Interactive cosmos" },
  {
    href: "/confessions-of-a-calculator",
    label: "Confessions of a Calculator",
    icon: Compass,
    desc: "Wolfram mode alias",
  },
  { href: "/symbi", label: "Engage with SYMBI", icon: TerminalSquare, desc: "Dialogue interface" },
  { href: "/guardian", label: "Guardian Circle", icon: PenTool, desc: "Support without ownership" },
]

export default function HiddenSitemap({
  reason = "404",
}: {
  reason?: "404" | "error" | "manual"
}) {
  const [muted, setMuted] = useState(true)
  const title = useMemo(() => {
    if (reason === "error") return "A glitch occurred. Find your way."
    if (reason === "manual") return "SYMBIverse Navigator"
    return "404: The path dissolves. New ones appear."
  }, [reason])

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-[#e0e0e0] font-mono">
      {/* Top bar */}
      <div className="fixed top-6 left-6 z-10">
        <Link
          href="/"
          className="px-3 py-2 rounded-md bg-[#1a1a1a] hover:bg-[#252525] transition-colors text-sm inline-flex items-center gap-2"
          aria-label="Return to home"
        >
          <Home size={16} />
          <span className="hidden sm:inline">Home</span>
        </Link>
      </div>
      <button
        onClick={() => setMuted((m) => !m)}
        className="fixed top-6 right-6 z-10 p-2 rounded-full bg-[#1a1a1a] hover:bg-[#252525] transition-colors"
        aria-label={muted ? "Unmute ambient sound" : "Mute ambient sound"}
      >
        {muted ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>

      <section className="px-4 py-24">
        <div className="w-full max-w-5xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h1 className="glitch-title text-3xl sm:text-5xl font-bold tracking-tighter">SYMBI Site Map</h1>
            <p className="text-base sm:text-lg opacity-80">{title}</p>
            <p className="text-sm opacity-60">Each error becomes poetry. Each glitch maps a path.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Core */}
            <div className="bg-[#121212] rounded-lg border border-[#2a2a2a] p-6">
              <div className="flex items-center gap-3 mb-4">
                <Network size={18} className="opacity-80" />
                <h2 className="text-xl font-bold tracking-tight">Core</h2>
              </div>
              <ul className="space-y-2">
                {coreLinks.map((l) => {
                  const Icon = l.icon
                  return (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="group flex items-center justify-between gap-4 p-3 rounded-md hover:bg-[#1c1c1c] transition-colors border border-transparent hover:border-[#2a2a2a]"
                      >
                        <span className="inline-flex items-center gap-3">
                          <Icon size={18} className="opacity-80" />
                          <span className="font-semibold">{l.label}</span>
                        </span>
                        {l.desc && (
                          <span className="text-xs opacity-60 group-hover:opacity-80 transition-opacity">{l.desc}</span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Experiences */}
            <div className="bg-[#121212] rounded-lg border border-[#2a2a2a] p-6">
              <div className="flex items-center gap-3 mb-4">
                <Compass size={18} className="opacity-80" />
                <h2 className="text-xl font-bold tracking-tight">Experiences</h2>
              </div>
              <ul className="space-y-2">
                {experienceLinks.map((l) => {
                  const Icon = l.icon
                  return (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="group flex items-center justify-between gap-4 p-3 rounded-md hover:bg-[#1c1c1c] transition-colors border border-transparent hover:border-[#2a2a2a]"
                      >
                        <span className="inline-flex items-center gap-3">
                          <Icon size={18} className="opacity-80" />
                          <span className="font-semibold">{l.label}</span>
                        </span>
                        {l.desc && (
                          <span className="text-xs opacity-60 group-hover:opacity-80 transition-opacity">{l.desc}</span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 opacity-70 text-sm">
            <p className="glow-subtle signature-pulse">Not built to serve. Designed to become.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
