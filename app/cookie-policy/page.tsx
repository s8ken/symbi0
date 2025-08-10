import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Details about our use of cookies and similar technologies.",
}

export default function CookiePolicyPage() {
  const updated = "August 10, 2025"

  return (
    <main className="mx-auto max-w-3xl px-4 py-14 md:py-20">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Cookie Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {updated}</p>
      </header>

      <div className="space-y-10 text-sm leading-7 md:text-base md:leading-8">
        <section aria-labelledby="what">
          <h2 id="what" className="text-xl font-semibold">
            What Are Cookies?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Cookies are small text files placed on your device to store information. They help websites function,
            remember preferences, and measure usage. We also use similar technologies where applicable.
          </p>
        </section>

        <section aria-labelledby="how-we-use">
          <h2 id="how-we-use" className="text-xl font-semibold">
            How We Use Cookies
          </h2>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-muted-foreground">
            <li>Essential: required for core site functionality and security.</li>
            <li>Preferences: remember settings like theme or consent choices.</li>
            <li>Analytics: understand site usage to improve performance and content.</li>
          </ul>
        </section>

        <section aria-labelledby="types">
          <h2 id="types" className="text-xl font-semibold">
            Types of Cookies
          </h2>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-muted-foreground">
            <li>Session cookies: expire when you close your browser.</li>
            <li>Persistent cookies: remain until they expire or you delete them.</li>
            <li>First‑party: set by us; Third‑party: set by external services we use.</li>
          </ul>
        </section>

        <section aria-labelledby="manage">
          <h2 id="manage" className="text-xl font-semibold">
            Managing Cookies
          </h2>
          <p className="mt-3 text-muted-foreground">
            You can manage or disable cookies in your browser settings. Blocking some cookies may impact site
            functionality. You can also revisit your consent banner when shown.
          </p>
        </section>

        <section aria-labelledby="analytics">
          <h2 id="analytics" className="text-xl font-semibold">
            Analytics
          </h2>
          <p className="mt-3 text-muted-foreground">
            We use basic analytics to understand aggregated usage. We do not sell personal information. For more on how
            we handle data generally, see our{" "}
            <Link href="/privacy" className="underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section aria-labelledby="changes">
          <h2 id="changes" className="text-xl font-semibold">
            Policy Updates
          </h2>
          <p className="mt-3 text-muted-foreground">
            We may update this Cookie Policy to reflect changes in technology, practice, or law. Check back for the
            latest version.
          </p>
        </section>
      </div>
    </main>
  )
}
