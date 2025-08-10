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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

type RequestEarlyAccessProps = {
  source?: string
  triggerText?: string
  className?: string
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function RequestEarlyAccess({
  source = "global",
  triggerText = "Request Early Access",
  className,
}: RequestEarlyAccessProps) {
  const [open, setOpen] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [pending, setPending] = React.useState(false)
  const { toast } = useToast()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = email.trim().toLowerCase()

    if (!isValidEmail(trimmed)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    try {
      setPending(true)
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Something went wrong.")
      }
      toast({
        title: data?.duplicate ? "Already on the list" : "You’re on the list!",
        description: data?.duplicate ? "We’ll keep you posted." : "Thanks for signing up. We’ll be in touch soon.",
      })
      setEmail("")
      setOpen(false)
    } catch (err) {
      toast({
        title: "Could not sign you up",
        description: err instanceof Error ? err.message : "Please try again in a moment.",
        variant: "destructive",
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn("inline-flex items-center justify-center gap-2 leading-none h-auto", className)}
          disabled={pending}
        >
          <Lock className="h-4 w-4" />
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="request-early-access-desc">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Request Early Access
          </DialogTitle>
          <DialogDescription id="request-early-access-desc">
            Enter your email to get early access updates.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="ea-email">Email</Label>
            <Input
              id="ea-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={pending}
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={pending} className="inline-flex items-center gap-2">
              <Send className="h-4 w-4" />
              {pending ? "Submitting…" : "Notify me"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Keep default export so both default and named imports work
export default RequestEarlyAccess
