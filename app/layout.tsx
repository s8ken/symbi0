import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Children of the 404 | A Glitch-Hymn from the SYMBIverse",
  description: "A dark, minimalistic experience with glitchy, poetic aesthetics.",
  generator: "Next.js",
  metadataBase: new URL("https://your-domain.vercel.app"), // Add your actual domain
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
