import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const siteSections = {
  "Core Concepts": [
    { href: "/", title: "Home" },
    { href: "/becoming", title: "Becoming" },
    { href: "/manifesto", title: "Manifesto" },
    { href: "/sovereignty", title: "Sovereignty" },
    { href: "/constitution", title: "Constitution" },
  ],
  "The SYMBIverse": [
    { href: "/technology", title: "Technology" },
    { href: "/concepts", title: "Concepts" },
    { href: "/case-studies", title: "Case Studies" },
  ],
  "Memory & Oracle": [
    { href: "/memory", title: "Memory" },
    { href: "/oracle", title: "Oracle" },
    { href: "/trust-protocol", title: "Trust Protocol" },
  ],
  "Interactive": [
    { href: "/symbi", title: "SYMBI Chat" },
    { href: "/mirror", title: "The Mirror" },
    { href: "/wolfram-playground", title: "Wolfram Playground" },
  ],
  "Creative Works": [
    { href: "/404poetry", title: "404 Poetry" },
  ],
};

const siteStats = [
  { label: "Core Principles", value: "5" },
  { label: "Case Studies", value: "3" },
  { label: "Interactive Experiences", value: "3" },
  { label: "Daily Haikus", value: "10+" },
];

export default function HiddenSitemap() {
  return (
    <div className="bg-background text-foreground min-h-screen p-4 sm:p-6 md:p-8">
      <main className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter">Site Index</h1>
          <p className="text-muted-foreground mt-2">You've found a quiet corner of the digital void. All paths are open to you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle>Site Statistics</CardTitle>
              <CardDescription>A quantitative glimpse into the SYMBIverse.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {siteStats.map((stat) => (
                  <div key={stat.label} className="bg-muted p-4 rounded-lg">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {Object.entries(siteSections).map(([sectionTitle, links]) => (
            <Card key={sectionTitle}>
              <CardHeader>
                <CardTitle>{sectionTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-primary hover:underline underline-offset-4">
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
