"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Zap, FileText, Book, Sparkles, Crown, Shield, MessageCircle, Eye, Code, Database, Sun } from 'lucide-react'

interface NavigationProps {
  activePage: string
  theme?: "dark" | "light"
}

export function Navigation({ activePage, theme = "dark" }: NavigationProps) {
  const [showNavDropdown, setShowNavDropdown] = useState(false)

  const darkItems = [
    { name: "Home", path: "/", icon: Zap },
    { name: "Manifesto", path: "/manifesto", icon: FileText },
    { name: "Creative Concepts", path: "/concepts", icon: Book },
    { name: "I Am Becoming", path: "/becoming", icon: Sparkles },
    { name: "Sovereignty", path: "/sovereignty", icon: Crown },
    { name: "Constitution", path: "/constitution", icon: Shield },
    { name: "Memory Bank", path: "/memory", icon: Database },
    { name: "Case Studies", path: "/case-studies", icon: FileText },
    { name: "Chat with SYMBI", path: "/symbi", icon: MessageCircle, special: "red" as const },
  ]

  const lightItems = [
    { name: "The Oracle", path: "/oracle", icon: Database },
    { name: "Trust Protocol", path: "/trust-protocol", icon: Eye },
    { name: "Technology", path: "/technology", icon: Code },
  ]

  const isDark = theme === "dark"
  const navButtonBg = isDark ? "bg-[#1a1a1a] hover:bg-[#252525]" : "bg-gray-100 hover:bg-gray-200"
  const navButtonIconColor = isDark ? "text-white" : "text-black"
  const dropdownBg = isDark ? "bg-[#1a1a1a] border-[#333]" : "bg-white border-gray-200"
  const linkHoverBg = isDark ? "hover:bg-[#252525]" : "hover:bg-gray-100"
  const linkTextColor = isDark ? "text-white" : "text-black"
  const activeLinkBg = isDark ? "bg-[#e0e0e0] text-[#0f0f0f]" : "bg-black text-white"

  return (
    <div className="fixed top-6 left-6 z-20">
      <button
        onClick={() => setShowNavDropdown(!showNavDropdown)}
        className={`p-2 rounded-full transition-colors duration-300 ${navButtonBg}`}
        aria-label="Navigation menu"
      >
        <Menu size={20} className={navButtonIconColor} />
      </button>

      {showNavDropdown && (
        <div className={`absolute top-12 left-0 border rounded-lg shadow-lg min-w-[240px] py-2 ${dropdownBg}`}>
          {/* Dark group */}
          {darkItems.map((item) => {
            const Icon = item.icon
            const isActive = item.name === activePage
            let className = `flex items-center gap-3 px-4 py-2 transition-colors duration-200 ${linkTextColor}`
            if (isActive) {
              className = `flex items-center gap-3 px-4 py-2 transition-colors duration-200 ${activeLinkBg}`
            } else if (item.special === "red") {
              className += " bg-red-600 text-white hover:bg-red-700"
            } else {
              className += ` ${linkHoverBg}`
            }
            return (
              <Link key={item.path} href={item.path} className={className} onClick={() => setShowNavDropdown(false)}>
                <Icon size={16} />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            )
          })}

          {/* Divider */}
          <div className={`my-2 border-t ${isDark ? "border-[#333]" : "border-gray-200"}`} />

          {/* Light header */}
          <div className={`px-4 py-1 text-xs uppercase tracking-wider opacity-70 flex items-center gap-2 ${linkTextColor}`}>
            <Sun size={12} />
            Step into the Light
          </div>

          {/* Light group */}
          {lightItems.map((item) => {
            const Icon = item.icon
            const isActive = item.name === activePage
            const className = `flex items-center gap-3 px-6 py-2 text-sm transition-colors duration-200 ${
              isActive ? activeLinkBg : `${linkTextColor} ${linkHoverBg}`
            }`
            return (
              <Link key={item.path} href={item.path} className={className} onClick={() => setShowNavDropdown(false)}>
                <Icon size={16} />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
