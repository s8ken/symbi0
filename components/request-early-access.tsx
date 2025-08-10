"use client"

import { useState } from "react"
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
import { Send, Lock } from "lucide-react"
import { track } from "@/lib/analytics"

type EarlyAccessProps = {
  source?: string // where the request originated, e.g., "header-cta", "restricted:trust-framework"
  triggerText?: string
  className?: string
}

export function RequestEarlyAccess({
  source = "global",
  triggerText = "Request Early Access",
  className,
}: EarlyAccessProps) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  async function submit() {
    if (!email) return
    setLoading(true)
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to save")
      track("early_access_submit", { source, storage: data.storage })
      setOpen(false)
      setEmail("")
    } catch (e) {
      track("early_access_submit_error", { source })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        className={className}
        onClick={() => {
          setOpen(true)
          track("early_access_open", { source })
        }}
        data-track="early_access_click"
        data-source={source}
      >
        <Lock className="h-4 w-4 mr-2" />
        {triggerText}
      </Button>
      <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
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
            />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button disabled={loading || !email} onClick={submit}>
              <Send className="h-4 w-4 mr-2" />
              {loading ? "Sending..." : "Notify me"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
