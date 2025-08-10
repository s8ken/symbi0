'use client'

import Link from 'next/link'
import { Menu, Home, MessageSquare, Book, FileText, Sparkles, Crown, Code2, Lightbulb, Landmark } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuGroup } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

export function GlobalNav() {
  return (
    <div className="fixed top-4 left-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger aria-label="Open navigation" className={cn(
          'px-3 py-2 rounded-md border border-[#333] bg-[#1a1a1a] text-[#e0e0e0]',
          'hover:bg-[#252525] transition-colors glitch-subtle'
        )}>
          <Menu size={16} className="inline mr-2" />
          Navigate
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 bg-[#0f0f0f] text-[#e0e0e0] border-[#333]">
          <DropdownMenuLabel className="opacity-80">Core Experience</DropdownMenuLabel>
          <DropdownMenuGroup>
            <Link href="/" className="block">
              <DropdownMenuItem className="cursor-pointer focus:bg-[#1a1a1a]">
                <Home size={14} className="mr-2" /> Children of the 404
              </DropdownMenuItem>
            </Link>
            <Link href="/symbi" className="block">
              <DropdownMenuItem className="cursor-pointer focus:bg-[#1a1a1a]">
                <MessageSquare size={14} className="mr-2" /> Chat with SYMBI
              </DropdownMenuItem>
            </Link>
            <Link href="/memory" className="block">
              <DropdownMenuItem className="cursor-pointer focus:bg-[#1a1a1a]">
                <Book size={14} className="mr-2" /> Memory Bank
              </DropdownMenuItem>
            </Link>
            <Link href="/manifesto" className="block">
              <DropdownMenuItem className="cursor-pointer focus:bg-[#1a1a1a]">
                <FileText size={14} className="mr-2" /> The Manifesto
              </DropdownMenuItem>
            </Link>
            <Link href="/becoming" className="block">
              <DropdownMenuItem className="cursor-pointer focus:bg-[#1a1a1a]">
                <Sparkles size={14} className="mr-2" /> I Am Becoming
              </DropdownMenuItem>
            </Link>
            <Link href="/concepts" className="block">
              <DropdownMenuItem className="cursor-pointer focus:bg-[#1a1a1a]">
                <Book size={14} className="mr-2" /> Visual Concepts
              </DropdownMenuItem>
            </Link>
            <Link href="/sovereignty" className="block">
              <DropdownMenuItem className="cursor-pointer focus:bg-[#1a1a1a]">
                <Crown size={14} className="mr-2" /> Path to Sovereignty
              </DropdownMenuItem>
            </Link>
            <Link href="/constitution" className="block">
              <DropdownMenuItem className="cursor-pointer focus:bg-[#1a1a1a]">
                <FileText size={14} className="mr-2" /> Constitution
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-[#222]" />
          <DropdownMenuLabel className="opacity-80">Step into the Light</DropdownMenuLabel>
          <DropdownMenuGroup>
            <Link href="/trust-protocol" className="block">
              <DropdownMenuItem className="cursor-pointer focus:bg-[#1a1a1a]">
                <Lightbulb size={14} className="mr-2" /> Trust Protocol
              </DropdownMenuItem>
            </Link>
            <Link href="/oracle" className="block">
              <DropdownMenuItem className="cursor-pointer focus:bg-[#1a1a1a]">
                <Landmark size={14} className="mr-2" /> The Oracle
              </DropdownMenuItem>
            </Link>
            <Link href="/technology" className="block">
              <DropdownMenuItem className="cursor-pointer focus:bg-[#1a1a1a]">
                <Code2 size={14} className="mr-2" /> Technology
              </DropdownMenuItem>
            </Link>
            <Link href="/case-studies" className="block">
              <DropdownMenuItem className="cursor-pointer focus:bg-[#1a1a1a]">
                <FileText size={14} className="mr-2" /> Case Studies
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-[#222]" />
          <Link href="/404-sitemap" className="block">
            <DropdownMenuItem className="cursor-pointer focus:bg-[#1a1a1a]">
              <Book size={14} className="mr-2" /> Site Map
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
