"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const accepted = localStorage.getItem("cookie-consent") === "accepted"
      if (!accepted) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  function accept() {
    try {
      localStorage.setItem("cookie-consent", "accepted")
    } catch {
      // ignore
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-5xl m-3 rounded-xl border bg-background/95 backdrop-blur p-4 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <p className="text-sm text-muted-foreground">
            We use cookies for basic analytics and to improve your experience. See our{" "}
            <Link href="/privacy" className="underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex gap-2 sm:ml-auto">
            <Button size="sm" variant="outline" onClick={accept}>
              Got it
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
