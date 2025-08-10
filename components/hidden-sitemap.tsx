import Link from "next/link"

type Item = { href: string; label: string; external?: boolean }

const sections: { title: string; items: Item[] }[] = [
  {
    title: "Core",
    items: [
      { href: "/", label: "Home" },
      { href: "/symbi", label: "SYMBI" },
      { href: "/becoming", label: "Becoming" },
      { href: "/manifesto", label: "Manifesto" },
      { href: "/constitution", label: "Constitution" },
      { href: "/sovereignty", label: "Sovereignty" },
      { href: "/technology", label: "Technology" },
      { href: "/concepts", label: "Concepts" },
      { href: "/case-studies", label: "Case Studies" },
    ],
  },
  {
    title: "Playgrounds",
    items: [
      { href: "/mirror", label: "Mirror" },
      { href: "/wolfram-playground", label: "Wolfram Playground" },
    ],
  },
  {
    title: "Lore",
    items: [
      { href: "/404poetry", label: "404 Poetry" },
      { href: "/error404", label: "Error 404" },
    ],
  },
  {
    title: "Systems",
    items: [
      { href: "/memory", label: "Memory" },
      { href: "/oracle", label: "Oracle" },
      { href: "/trust-protocol", label: "Trust Protocol" },
    ],
  },
]

export default function HiddenSitemap() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">Site Map</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A friendly index for explorers and the children of the 404.
        </p>
        <div className="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat label="Pages" value="20+" />
          <Stat label="Daily Haikus" value="10+" />
          <Stat label="Status" value="Evolving" />
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {sections.map((sec) => (
          <section key={sec.title} aria-labelledby={`sec-${sec.title}`}>
            <h2 id={`sec-${sec.title}`} className="mb-3 text-base font-medium">
              {sec.title}
            </h2>
            <ul className="space-y-1.5">
              {sec.items.map((it) => (
                <li key={it.href}>
                  {it.external ? (
                    <a
                      href={it.href}
                      className="text-sm text-primary underline underline-offset-4 hover:no-underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {it.label}
                    </a>
                  ) : (
                    <Link
                      href={it.href}
                      className="text-sm text-primary underline underline-offset-4 hover:no-underline"
                    >
                      {it.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <footer className="mt-12 border-t pt-6 text-xs text-muted-foreground">
        Lost? The map is the territory when you’re 404. Step into the light.
      </footer>
    </main>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border p-3">
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  )
}
