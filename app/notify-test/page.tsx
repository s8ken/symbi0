import RequestEarlyAccess from "@/components/request-early-access"
import { Toaster } from "@/components/ui/toaster"

export default function NotifyTestPage() {
  return (
    <main className="mx-auto grid w-full max-w-2xl gap-8 p-6">
      <header>
        <h1 className="text-2xl font-semibold">Notify Test</h1>
        <p className="text-sm text-muted-foreground">Use this page to test /api/notify with your Neon database.</p>
      </header>

      <RequestEarlyAccess source="notify-test" />

      <footer className="text-xs text-muted-foreground">
        Tip: Check your database table public.notify_signups after submitting.
      </footer>

      {/* Ensure toasts are visible on this page */}
      <Toaster />
    </main>
  )
}
