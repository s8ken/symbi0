"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Props = {
  triggerText?: string
  className?: string
  source?: string
}

function isValidEmail(email: string) {
  // Simple RFC5322-ish check, intentionally permissive
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function RequestEarlyAccess({ triggerText = "Join Waitlist", className, source }: Props) {
  const [open, setOpen] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)
  const [message, setMessage] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage(null)
    setError(null)

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: source ?? "unknown" }),
      })

      let duplicate = false
      try {
        const data = await res.json().catch(() => null)
        if (data && typeof data.duplicate === "boolean") {
          duplicate = data.duplicate
        }
      } catch {
        // ignore parse errors; treat by status only
      }

      if (res.ok) {
        setMessage(duplicate ? "You are already on the list." : "Success! You are on the list.")
        // Optionally close after a moment
        setTimeout(() => setOpen(false), 800)
        setEmail("")
      } else if (res.status === 409) {
        setMessage("You are already on the list.")
      } else {
        setError("Something went wrong. Please try again.")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* Plain button to avoid fixed h-10 from shadcn Button and ensure perfect alignment */}
        <button
          type="button"
          className={cn(
            "inline-flex items-center justify-center whitespace-nowrap gap-2 rounded-md",
            // Sensible defaults; your passed className can override colors/spacing
            "px-6 py-3 font-semibold transition-colors",
            className,
          )}
        >
          {triggerText}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Get early access</DialogTitle>
          <DialogDescription>Join the waitlist and we’ll notify you when it’s ready.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {message ? <div className="text-sm text-green-600">{message}</div> : null}
          {error ? <div className="text-sm text-red-600">{error}</div> : null}

          <DialogFooter className="flex items-center justify-between gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Submitting…" : "Join waitlist"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default RequestEarlyAccess
