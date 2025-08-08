"use client"

import { useMemo } from "react"
import { usePathname } from "next/navigation"
import { Navigation } from "@/app/components/navigation"

function labelFromPath(pathname: string): string {
  if (pathname === "/") return "Home"
  if (pathname.startsWith("/manifesto")) return "Manifesto"
  if (pathname.startsWith("/concepts")) return "Creative Concepts"
  if (pathname.startsWith("/becoming")) return "I Am Becoming"
  if (pathname.startsWith("/sovereignty")) return "Sovereignty"
  if (pathname.startsWith("/constitution")) return "Constitution"
  if (pathname.startsWith("/technology")) return "Technology"
  if (pathname.startsWith("/oracle")) return "The Oracle"
  if (pathname.startsWith("/trust-protocol")) return "Trust Protocol"
  if (pathname.startsWith("/memory")) return "Memory Bank"
  if (pathname.startsWith("/case-studies")) return "Case Studies"
  if (pathname.startsWith("/symbi")) return "Chat with SYMBI"
  if (pathname.startsWith("/404-sitemap") || pathname.startsWith("/error-404")) return "Site Map"
  return "Home"
}

function themeFromPath(pathname: string): "dark" | "light" {
  // Light theme for technical pages
  if (pathname.startsWith("/oracle") || pathname.startsWith("/technology") || pathname.startsWith("/trust-protocol") || pathname.startsWith("/case-studies")) {
    return "light"
  }
  return "dark"
}

export default function GlobalNav() {
  const pathname = usePathname()
  const activePage = useMemo(() => labelFromPath(pathname || "/"), [pathname])
  const theme = useMemo(() => themeFromPath(pathname || "/"), [pathname])

  return <Navigation activePage={activePage} theme={theme} />
}
