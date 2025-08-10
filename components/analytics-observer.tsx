"use client"

import { useEffect } from "react"

// Provide both named and default exports so imports work either way.
// Tracks page views and basic delegated click events with data attributes.

export function AnalyticsObserver() {
  useEffect(() => {
    // Basic page view
    try {
      // Replace with your analytics pipeline as needed
      console.debug("[analytics] page_view", { path: window.location.pathname })
    } catch {
      // no-op
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      // Bubble up to find tracking attributes
      const trackEl = target.closest("[data-track]") as HTMLElement | null
      if (trackEl) {
        const event = trackEl.getAttribute("data-track") || "click"
        const source = trackEl.getAttribute("data-source") || undefined
        const meta: Record<string, string> = {}
        for (const { name, value } of Array.from(trackEl.attributes)) {
          if (name.startsWith("data-") && name !== "data-track" && name !== "data-source") {
            meta[name.replace("data-", "")] = value
          }
        }
        try {
          console.debug("[analytics] event", { event, source, ...meta })
        } catch {
          // no-op
        }
      }
    }

    window.addEventListener("click", handleClick)
    return () => {
      window.removeEventListener("click", handleClick)
    }
  }, [])

  return null
}

export default AnalyticsObserver
