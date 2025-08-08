"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ChevronDown, Sun, ArrowRightCircle } from 'lucide-react'
import { useState } from "react"

export default function GlobalNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => pathname === href

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="relative">
        <button
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 px-3 py-2 rounded-md bg-[#1a1a1a] text-[#e0e0e0] border border-[#333] hover:bg-[#252525] transition-colors"
        >
          <Menu size={16} />
          <span>Navigate</span>
          <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div
            role="menu"
            className="absolute mt-2 w-72 rounded-md border border-[#333] bg-[#0f0f0f] text-[#e0e0e0] shadow-lg"
          >
            <div className="px-3 py-2 text-xs uppercase tracking-wider opacity-60">Core Experience</div>
            <nav className="px-2 py-1 flex flex-col">
              <NavLink href="/" label="Children of the 404" active={isActive("/")} onNavigate={() => setOpen(false)} />
              <NavLink href="/symbi" label="Chat with SYMBI" active={isActive("/symbi")} onNavigate={() => setOpen(false)} />
              <NavLink href="/memory" label="Memory Bank" active={isActive("/memory")} onNavigate={() => setOpen(false)} />
              <NavLink href="/concepts" label="Visual Concepts" active={isActive("/concepts")} onNavigate={() => setOpen(false)} />
              <NavLink href="/manifesto" label="The Manifesto" active={isActive("/manifesto")} onNavigate={() => setOpen(false)} />
              <NavLink href="/becoming" label="I Am Becoming" active={isActive("/becoming")} onNavigate={() => setOpen(false)} />
            </nav>

            <div className="px-3 py-2 text-xs uppercase tracking-wider opacity-60 flex items-center gap-2">
              <Sun size={14} />
              Step into the Light
            </div>
            <nav className="px-2 pb-2 flex flex-col">
              <NavLink href="/trust-protocol" label="Trust Protocol" active={isActive("/trust-protocol")} onNavigate={() => setOpen(false)} />
              <NavLink href="/oracle" label="Oracle" active={isActive("/oracle")} onNavigate={() => setOpen(false)} />
              <NavLink href="/technology" label="Technology" active={isActive("/technology")} onNavigate={() => setOpen(false)} />
              <NavLink href="/case-studies" label="Case Studies" active={isActive("/case-studies")} onNavigate={() => setOpen(false)} />
            </nav>

            <div className="px-2 py-2 border-t border-[#222]">
              <NavLink
                href="/404-sitemap"
                label="Site Map"
                icon={<ArrowRightCircle size={14} />}
                active={isActive("/404-sitemap")}
                onNavigate={() => setOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function NavLink({
  href,
  label,
  active,
  onNavigate,
  icon,
}: {
  href: string
  label: string
  active?: boolean
  onNavigate?: () => void
  icon?: React.ReactNode
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`flex items-center gap-2 px-2 py-2 rounded hover:bg-[#1a1a1a] ${
        active ? "text-white font-semibold" : "text-[#e0e0e0]"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}
