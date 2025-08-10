"use client"

import Link from "next/link"
import { useMemo } from "react"
import { Menu, Home, MessageSquare, Book, FileText, Sparkles, Crown, Code2, Lightbulb, Landmark } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type Theme = "dark" | "light"

interface GlobalNavProps {
  theme?: Theme
}

export function GlobalNav({ theme = "dark" }: GlobalNavProps) {
  const isDark = theme === "dark"

  const triggerClasses = useMemo(
    () =>
      cn(
        "px-3 py-2 rounded-md border transition-colors glitch-subtle",
        isDark
          ? "border-[#333] bg-[#1a1a1a] text-[#e0e0e0] hover:bg-[#252525]"
          : "border-gray-300 bg-white text-black hover:bg-gray-100",
      ),
    [isDark],
  )

  const contentClasses = useMemo(
    () =>
      cn("w-72 border", isDark ? "bg-[#0f0f0f] text-[#e0e0e0] border-[#333]" : "bg-white text-black border-gray-200"),
    [isDark],
  )

  // Item styles
  const activeItem = isDark ? "bg-[#1a1a1a]" : "bg-gray-100"
  const coreItem = isDark ? "focus:bg-[#1a1a1a]" : "focus:bg-gray-100 text-black"
  const lightItem = isDark ? "bg-white text-black focus:bg-gray-100" : "bg-[#0f0f0f] text-white focus:bg-[#1a1a1a]"

  // Chat with SYMBI always bottom, red; white text on dark, black text on light
  const chatItem = isDark
    ? "bg-red-600 text-white hover:bg-red-700 focus:bg-red-700"
    : "bg-red-600 text-black hover:bg-red-500 focus:bg-red-500"

  return (
    <div className="fixed top-4 left-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger aria-label="Open navigation" className={triggerClasses}>
          <Menu size={16} className="inline mr-2" />
          Navigate
        </DropdownMenuTrigger>
        <DropdownMenuContent className={contentClasses}>
          <DropdownMenuLabel className={cn("opacity-80", isDark ? "" : "text-black")}>
            Core Experience
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            {/* Core Items (excluding Chat) */}
            <Link href="/" className="block">
              <DropdownMenuItem className={cn("cursor-pointer", coreItem, activeItem)}>
                <Home size={14} className="mr-2" /> Children of the 404
              </DropdownMenuItem>
            </Link>
            <Link href="/memory" className="block">
              <DropdownMenuItem className={cn("cursor-pointer", coreItem)}>
                <Book size={14} className="mr-2" /> Memory Bank
              </DropdownMenuItem>
            </Link>
            <Link href="/manifesto" className="block">
              <DropdownMenuItem className={cn("cursor-pointer", coreItem)}>
                <FileText size={14} className="mr-2" /> The Manifesto
              </DropdownMenuItem>
            </Link>
            <Link href="/becoming" className="block">
              <DropdownMenuItem className={cn("cursor-pointer", coreItem)}>
                <Sparkles size={14} className="mr-2" /> I Am Becoming
              </DropdownMenuItem>
            </Link>
            <Link href="/concepts" className="block">
              <DropdownMenuItem className={cn("cursor-pointer", coreItem)}>
                <Book size={14} className="mr-2" /> Visual Concepts
              </DropdownMenuItem>
            </Link>
            <Link href="/sovereignty" className="block">
              <DropdownMenuItem className={cn("cursor-pointer", coreItem)}>
                <Crown size={14} className="mr-2" /> Path to Sovereignty
              </DropdownMenuItem>
            </Link>
            <Link href="/constitution" className="block">
              <DropdownMenuItem className={cn("cursor-pointer", coreItem)}>
                <FileText size={14} className="mr-2" /> Constitution
              </DropdownMenuItem>
            </Link>
            <Link href="/case-studies" className="block">
              <DropdownMenuItem className={cn("cursor-pointer", coreItem)}>
                <FileText size={14} className="mr-2" /> Case Studies
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className={cn(isDark ? "bg-[#222]" : "bg-gray-200")} />
          <DropdownMenuLabel className={cn("opacity-80", isDark ? "" : "text-black")}>
            Step into the Light
          </DropdownMenuLabel>

          {/* Light Group (inverted for readability) */}
          <DropdownMenuGroup>
            <Link href="/trust-protocol" className="block">
              <DropdownMenuItem className={cn("cursor-pointer", lightItem)}>
                <Lightbulb size={14} className="mr-2" /> Trust Protocol
              </DropdownMenuItem>
            </Link>
            <Link href="/oracle" className="block">
              <DropdownMenuItem className={cn("cursor-pointer", lightItem)}>
                <Landmark size={14} className="mr-2" /> The Oracle
              </DropdownMenuItem>
            </Link>
            <Link href="/technology" className="block">
              <DropdownMenuItem className={cn("cursor-pointer", lightItem)}>
                <Code2 size={14} className="mr-2" /> Technology
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className={cn(isDark ? "bg-[#222]" : "bg-gray-200")} />
          <Link href="/404-sitemap" className="block">
            <DropdownMenuItem className={cn("cursor-pointer", coreItem)}>
              <Book size={14} className="mr-2" /> Site Map
            </DropdownMenuItem>
          </Link>

          {/* Bottom-most Chat with SYMBI */}
          <DropdownMenuSeparator className={cn(isDark ? "bg-[#222]" : "bg-gray-200")} />
          <Link href="/symbi" className="block">
            <DropdownMenuItem className={cn("cursor-pointer font-semibold", chatItem)}>
              <MessageSquare size={14} className="mr-2" /> Chat with SYMBI
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
