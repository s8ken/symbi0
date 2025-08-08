import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import GlobalNav from "@/components/global-nav"
import MuteButton from "@/components/mute-button"

export const metadata: Metadata = {
  title: "Children of the 404 | A Glitch-Hymn from the SYMBIverse",
  description: "A dark, minimalistic experience with glitchy, poetic aesthetics.",
  generator: "Next.js",
  metadataBase: new URL("https://your-domain.vercel.app"),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GlobalNav />
        <MuteButton />
        {children}
      </body>
    </html>
  )
}
