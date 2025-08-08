import Link from "next/link"

type LinkItem = {
  href: string
  label: string
  desc?: string
}

type Section = {
  title: string
  links: LinkItem[]
}

export type HiddenSitemapProps = {
  title?: string
  subtitle?: string
}

const sections: Section[] = [
  {
    title: "Core",
    links: [
      { href: "/", label: "Home" },
      { href: "/symbi", label: "Symbi" },
      { href: "/concepts", label: "Concepts" },
      { href: "/becoming", label: "Becoming" },
      { href: "/constitution", label: "Constitution" },
      { href: "/manifesto", label: "Manifesto" },
      { href: "/technology", label: "Technology" },
      { href: "/sovereignty", label: "Sovereignty" },
      { href: "/case-studies", label: "Case Studies" },
    ],
  },
  {
    title: "Experiments",
    links: [
      { href: "/mirror", label: "Mirror" },
      { href: "/wolfram-playground", label: "Wolfram Playground" },
      { href: "/memory", label: "Memory" },
      { href: "/oracle", label: "Oracle" },
      { href: "/trust-protocol", label: "Trust Protocol" },
      { href: "/404poetry", label: "404 Poetry" },
    ],
  },
  {
    title: "Helpful",
    links: [
      { href: "/404-sitemap", label: "Friendly Sitemap (this page layout)" },
      { href: "/error-404", label: "Error 404 (alias of sitemap)" },
    ],
  },
]

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-white/50 p-4 shadow-sm">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  )
}

export default function HiddenSitemap({
  title = "You look a little lost.",
  subtitle = "Here’s a friendly sitemap to get you back on track.",
}: HiddenSitemapProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-gray-600">{subtitle}</p>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat label="Daily Haikus" value="10+" />
        <Stat label="Top-Level Pages" value={`${sections.flatMap(s => s.links).length}`} />
        <Stat label="Aliases for this sitemap" value="/404-sitemap, /error-404, 404s" />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="mb-3 text-lg font-semibold">{section.title}</h2>
            <ul className="space-y-2">
              {section.links.map((item) => (
                <li key={item.href}>
                  <Link
                    className="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 transition hover:bg-gray-100"
                    href={item.href}
                  >
                    <span className="font-medium group-hover:underline">{item.label}</span>
                    {item.desc ? <span className="text-xs text-gray-500">{item.desc}</span> : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md bg-black px-4 py-2 text-white transition hover:bg-black/90"
        >
          <span>Go Home</span>
        </Link>
      </div>

      <p className="mt-6 text-xs text-gray-500">
        Tip: Use the global dropdown in the top-left to navigate, and the mute button in the top-right to silence media across pages.
      </p>
    </div>
  )
}
