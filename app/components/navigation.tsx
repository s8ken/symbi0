"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Menu,
  Zap,
  FileText,
  Book,
  Sparkles,
  Crown,
  Shield,
  MessageCircle,
  Eye,
  Code,
  Database,
  Sun,
} from "lucide-react"

interface NavigationProps {
  activePage?: string
  theme?: "dark" | "light"
}

export function Navigation({ activePage = "Home", theme = "dark" }: NavigationProps) {
  const [showNavDropdown, setShowNavDropdown] = useState(false)

  // Core (dark) section
  const coreItems = [
    { name: "Home", path: "/", icon: Zap },
    { name: "Manifesto", path: "/manifesto", icon: FileText },
    { name: "Creative Concepts", path: "/concepts", icon: Book },
    { name: "I Am Becoming", path: "/becoming", icon: Sparkles },
    { name: "Sovereignty", path: "/sovereignty", icon: Crown },
    { name: "Constitution", path: "/constitution", icon: Shield },
    { name: "Memory Bank", path: "/memory", icon: Database },
    { name: "Case Studies", path: "/case-studies", icon: FileText },
  ]

  // Light/technical group (Step into the Light)
  const lightItems = [
    { name: "The Oracle", path: "/oracle", icon: Database },
    { name: "Trust Protocol", path: "/trust-protocol", icon: Eye },
    { name: "Technology", path: "/technology", icon: Code },
  ]

  const isDark = theme === "dark"

  // Button and container colors
  const navButtonBg = isDark ? "bg-[#1a1a1a] hover:bg-[#252525]" : "bg-gray-100 hover:bg-gray-200"
  const navButtonIconColor = isDark ? "text-white" : "text-black"
  const dropdownBg = isDark ? "bg-[#1a1a1a] border-[#333]" : "bg-white border-gray-200"
  const dividerColor = isDark ? "border-[#333]" : "border-gray-200"

  // Active chip styles
  const activeLinkBg = isDark ? "bg-[#e0e0e0] text-[#0f0f0f]" : "bg-black text-white"

  // Core group styles (inverse by theme for readability)
  const coreDefault = isDark ? "bg-[#0f0f0f] text-white hover:bg-[#252525]" : "bg-white text-black hover:bg-gray-100"

  // Step into the Light group inverse:
  // - On dark pages -> white bg + black text
  // - On light pages -> dark bg + white text
  const lightDefault = isDark ? "bg-white text-black hover:bg-gray-100" : "bg-[#0f0f0f] text-white hover:bg-[#1a1a1a]"

  // Chat with SYMBI always bottom, red bg
  const chatClasses = isDark ? "bg-red-600 text-white hover:bg-red-700" : "bg-red-600 text-black hover:bg-red-500"

  return (
    <div className="fixed top-6 left-6 z-40">
      <button
        onClick={() => setShowNavDropdown(!showNavDropdown)}
        className={`p-2 rounded-full transition-colors duration-300 ${navButtonBg}`}
        aria-label="Navigation menu"
      >
        <Menu size={20} className={navButtonIconColor} />
      </button>

      {showNavDropdown && (
        <div
          className={`absolute top-12 left-0 border rounded-lg shadow-lg min-w-[260px] py-2 ${dropdownBg}`}
          role="menu"
          aria-label="Site navigation"
        >
          {/* Core Experience */}
          {coreItems.map((item) => {
            const Icon = item.icon
            const isActive = item.name === activePage
            const className = [
              "flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-200 rounded-sm",
              isActive ? activeLinkBg : coreDefault,
            ].join(" ")
            return (
              <Link
                key={item.path}
                href={item.path}
                className={className}
                onClick={() => setShowNavDropdown(false)}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={16} />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}

          {/* Divider */}
          <div className={`my-2 border-t ${dividerColor}`} />

          {/* Step into the Light header */}
          <div
            className={`px-4 py-1 text-xs uppercase tracking-wider opacity-70 flex items-center gap-2 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            <Sun size={12} />
            Step into the Light
          </div>

          {/* Light group */}
          {lightItems.map((item) => {
            const Icon = item.icon
            const isActive = item.name === activePage
            const className = [
              "flex items-center gap-3 px-6 py-2 text-sm transition-colors duration-200 rounded-sm",
              isActive ? activeLinkBg : lightDefault,
            ].join(" ")
            return (
              <Link
                key={item.path}
                href={item.path}
                className={className}
                onClick={() => setShowNavDropdown(false)}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={16} />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}

          {/* Bottom divider */}
          <div className={`my-2 border-t ${dividerColor}`} />

          {/* Chat with SYMBI at the very bottom */}
          <Link
            href="/symbi"
            className={`flex items-center gap-3 px-4 py-2 text-sm rounded-sm transition-colors duration-200 ${chatClasses}`}
            onClick={() => setShowNavDropdown(false)}
            aria-label="Chat with SYMBI"
          >
            <MessageCircle size={16} />
            <span className="font-semibold">Chat with SYMBI</span>
          </Link>
        </div>
      )}
    </div>
  )
}
