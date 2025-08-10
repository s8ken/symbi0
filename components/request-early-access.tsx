"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Send } from "lucide-react"
import { cn } from "@/lib/utils"

type EarlyAccessProps = {
  source?: string
  triggerText?: string
  className?: string
}

function safeTrack(event: string, data?: Record<string, unknown>) {
  try {
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      const payload = JSON.stringify({ event, data, ts: Date.now() })
      navigator.sendBeacon("/api/analytics", new Blob([payload], { type: "application/json" }))
    }
  } catch {
    // ignore analytics errors
  }
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function RequestEarlyAccess({
  source = "global",
  triggerText = "Request Early Access",
  className,
}: EarlyAccessProps) {
  const [open, setOpen] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null)

  async function submit() {
    if (!email) return
    const trimmed = email.trim().toLowerCase()
    if (!isValidEmail(trimmed)) {
      setMessage({ type: "error", text: "Please enter a valid email." })
      return
    }

    setLoading(true)
    setMessage(null)
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data?.ok === false) {
        throw new Error(data?.error || "Failed to submit.")
      }
      safeTrack("early_access_submit", { source, duplicate: !!data?.duplicate })
      setMessage({
        type: "success",
        text: data?.duplicate ? "You're already on the list. We’ll keep you posted." : "Thanks! You’re on the list.",
      })
      setEmail("")
      setTimeout(() => setOpen(false), 800)
    } catch (e: any) {
      safeTrack("early_access_submit_error", { source })
      setMessage({ type: "error", text: e?.message || "Something went wrong. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        className={cn("inline-flex items-center justify-center gap-2", className)}
        onClick={() => {
          setOpen(true)
          safeTrack("early_access_open", { source })
        }}
      >
        <Lock className="h-4 w-4" />
        {triggerText}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Request Early Access
            </DialogTitle>
            <DialogDescription>Leave your email and we’ll notify you when access unlocks.</DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="ea-email">Email</Label>
            <Input
              id="ea-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              autoComplete="email"
              aria-describedby="ea-help"
              required
            />
            <p id="ea-help" className="text-xs text-muted-foreground">
              We’ll only use your email to notify you about access.
            </p>
            {message ? (
              <p
                role="status"
                className={cn("text-sm", message.type === "success" ? "text-green-600" : "text-red-600")}
              >
                {message.text}
              </p>
            ) : null}
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button disabled={loading || !email} onClick={submit} className="inline-flex items-center gap-2">
              <Send className="h-4 w-4" />
              {loading ? "Sending..." : "Notify me"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Named and default exports so either import style works
export default RequestEarlyAccess
