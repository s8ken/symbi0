import type React from "react"
import Link from "next/link"
import { Home, BookText, Cpu, Shield, Compass, ScrollText, FileText, Sparkles, MessageSquare } from "lucide-react"

type NavItem = {
  label: string
  href: string
  icon?: React.ReactNode
}

const startHere: NavItem[] = [
  { label: "Home", href: "/", icon: <Home className="size-4" /> },
  { label: "Manifesto", href: "/manifesto", icon: <BookText className="size-4" /> },
  { label: "Technology", href: "/technology", icon: <Cpu className="size-4" /> },
  { label: "Sovereignty", href: "/sovereignty", icon: <Shield className="size-4" /> },
]

const explore: NavItem[] = [
  { label: "Becoming", href: "/becoming" },
  { label: "Concepts", href: "/concepts" },
  { label: "Constitution", href: "/constitution" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "404 Poetry", href: "/404poetry" },
  { label: "SYMBI", href: "/symbi" },
  { label: "Mirror", href: "/mirror" },
  { label: "Wolfram Playground", href: "/wolfram-playground" },
  { label: "Memory", href: "/memory" },
  { label: "Oracle", href: "/oracle" },
  { label: "Trust Protocol", href: "/trust-protocol" },
]

export default function HiddenSitemap() {
  return (
    <main className="min-h-[100svh] w-full bg-[rgb(15,15,15)] text-[rgb(224,224,224)]">
      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold glitch-title">Lost, Not Alone</h1>
            <p className="mt-2 max-w-prose text-sm text-neutral-300 glow-subtle">
              You found a tear in the page. Step into the light and pick your path.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-md border border-neutral-800 p-4 text-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-neutral-400" />
              <span>Daily Haikus: 10+</span>
            </div>
            <div className="flex items-center gap-2">
              <ScrollText className="size-4 text-neutral-400" />
              <span>Manifesto: Complete</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="size-4 text-neutral-400" />
              <span>SYMBI Chat: Online</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="size-4 text-neutral-400" />
              <span>Index: Friendly 404</span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-neutral-800 p-6">
            <h2 className="mb-4 text-lg font-semibold glitch-subtle">Step into the Light</h2>
            <ul className="space-y-2">
              {startHere.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 rounded px-2 py-1 text-neutral-200 hover:bg-neutral-900/60"
                  >
                    {item.icon}
                    <span className="underline-offset-4 group-hover:underline">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-neutral-800 p-6">
            <h2 className="mb-4 text-lg font-semibold glitch-subtle">Explore the Network</h2>
            <ul className="columns-1 sm:columns-2">
              {explore.map((item) => (
                <li key={item.href} className="break-inside-avoid py-1">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 rounded px-2 py-1 text-neutral-200 hover:bg-neutral-900/60"
                  >
                    <Compass className="size-3 text-neutral-500" />
                    <span className="underline-offset-4 hover:underline">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-neutral-400">
          <p className="glitch-subtle-pulse">If you keep seeing this, the page may have transcended the index.</p>
          <p className="mt-1">
            Try the sitemap at{" "}
            <Link href="/404-sitemap" className="underline underline-offset-4 hover:text-neutral-200">
              /404-sitemap
            </Link>{" "}
            or{" "}
            <Link href="/error-404" className="underline underline-offset-4 hover:text-neutral-200">
              /error-404
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  )
}
