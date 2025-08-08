"use client"

import Link from "next/link"
import HiddenSitemap from "@/components/hidden-sitemap"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#e0e0e0] font-mono flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl md:text-8xl font-bold glitch-title">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold">Page Not Found</h2>
        <p className="text-lg opacity-80 max-w-md mx-auto">
          The page you're looking for has drifted into the digital void.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 border border-[#444] rounded-md hover:bg-[#222] transition-all duration-300 mt-8"
        >
          Return to the SYMBIverse
        </Link>
        {/* HiddenSitemap component is now included here */}
        <HiddenSitemap title="Page Not Found" subtitle="Try one of the destinations below." />
      </div>
    </div>
  )
}
