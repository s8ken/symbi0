import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import CookieConsent from "@/components/cookie-consent"
import { GlobalNav } from "@/components/global-nav"
import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { MuteButton } from "@/components/mute-button"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        {/* Global, fixed UI */}
        <GlobalNav />
        <div className="fixed right-4 top-4 z-50">
          <MuteButton />
        </div>
        <Link
          href="/symbi"
          className="fixed right-4 top-16 z-50 p-2 rounded-full border border-red-500/30 hover:border-red-500/60 bg-[#1a1a1a] hover:bg-[#252525] transition-colors"
          aria-label="Chat with SYMBI"
        >
          <MessageCircle size={20} className="text-red-500" />
        </Link>

        {/* Page content */}
        {children}

        {/* Global utilities */}
        <CookieConsent />
      </body>
    </html>
  )
}
