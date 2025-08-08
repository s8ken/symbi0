import Link from "next/link"
import { ArrowRight, Home, Map, Search, Quote, BookOpen, Box } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

type NavItem = {
  href: string
  label: string
  description?: string
}

const primary: NavItem[] = [
  { href: "/", label: "Home", description: "Begin the journey" },
  { href: "/symbi", label: "Symbi", description: "Converse with the system" },
  { href: "/becoming", label: "Becoming", description: "A living preface" },
  { href: "/manifesto", label: "Manifesto", description: "A declaration" },
  { href: "/constitution", label: "Constitution", description: "Principles and rights" },
  { href: "/technology", label: "Technology", description: "Systems and methods" },
  { href: "/sovereignty", label: "Sovereignty", description: "Owning your agency" },
  { href: "/concepts", label: "Concepts", description: "Core ideas" },
  { href: "/case-studies", label: "Case Studies", description: "Applications in practice" },
  { href: "/memory", label: "Memory", description: "Conversation tools" },
  { href: "/oracle", label: "Oracle", description: "Signals and insight" },
  { href: "/trust-protocol", label: "Trust Protocol", description: "Verifiable alignment" },
  { href: "/404poetry", label: "404 Poetry", description: "Haiku in the margins" }
]

const helpers: NavItem[] = [
  { href: "/404-sitemap", label: "Friendly Sitemap", description: "This page" },
  { href: "/error-404", label: "Error 404", description: "Alternate 404 route" }
]

function ListSection({
  title,
  icon,
  items,
}: {
  title: string
  icon?: React.ReactNode
  items: NavItem[]
}) {
  return (
    <Card className="border-muted/50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-start justify-between rounded-md border border-transparent px-2 py-2 hover:border-muted"
          >
            <div className="min-w-0">
              <div className="truncate font-medium">{item.label}</div>
              {item.description ? (
                <div className="truncate text-sm text-muted-foreground">
                  {item.description}
                </div>
              ) : null}
            </div>
            <ArrowRight className="mt-0.5 size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}

export function HiddenSitemap() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 md:py-16">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:mb-10 md:flex-row md:items-center">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs text-muted-foreground">
            <Map className="size-3.5" />
            <span>{"You're off the path — here’s the map."}</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Site Map
          </h1>
          <p className="max-w-prose text-sm text-muted-foreground md:text-base">
            A friendly index of the terrain. Use the global navigation in the top-left
            to jump anywhere, or start again from the beginning.
          </p>
          <div className="flex gap-2 pt-1">
            <Button asChild variant="secondary" size="sm" className="gap-2">
              <Link href="/"><Home className="size-4" />{"Back Home"}</Link>
            </Button>
            <Button asChild size="sm" className="gap-2">
              <Link href="/concepts"><Search className="size-4" />{"Explore Concepts"}</Link>
            </Button>
          </div>
        </div>
        <blockquote className="max-w-sm rounded-lg border p-4 text-sm text-muted-foreground">
          <div className="mb-2 flex items-center gap-2 font-medium">
            <Quote className="size-4" />
            <span>{"Step into the Light"}</span>
          </div>
          <p className="leading-relaxed">
            The network awakens when intent meets integrity. Keep going.
          </p>
        </blockquote>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ListSection
          title="Primary"
          icon={<BookOpen className="size-4 text-muted-foreground" />}
          items={primary}
        />
        <Card className="border-muted/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Box className="size-4 text-muted-foreground" />
              <span>Stats & Shortcuts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="rounded-md border p-3">
              <div className="text-xs uppercase text-muted-foreground">Daily Haikus</div>
              <div className="text-2xl font-semibold">10+</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Fresh reflections keep the signal clear.
              </p>
            </div>
            <Separator />
            <div className="grid gap-2">
              {helpers.map((h) => (
                <Link
                  key={h.href}
                  href={h.href}
                  className="group flex items-center justify-between rounded-md border border-transparent px-2 py-2 hover:border-muted"
                >
                  <div>
                    <div className="font-medium">{h.label}</div>
                    {h.description ? (
                      <div className="text-sm text-muted-foreground">{h.description}</div>
                    ) : null}
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default HiddenSitemap
