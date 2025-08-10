import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How SYMBI collects, uses, and protects your information.",
}

export default function PrivacyPage() {
  const updated = "August 10, 2025"

  return (
    <main className="mx-auto max-w-3xl px-4 py-14 md:py-20">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {updated}</p>
      </header>

      <div className="space-y-10 text-sm leading-7 md:text-base md:leading-8">
        <section aria-labelledby="intro">
          <h2 id="intro" className="text-xl font-semibold">
            Introduction
          </h2>
          <p className="mt-3 text-muted-foreground">
            This Privacy Policy explains how we collect, use, disclose, and safeguard information when you use our
            websites, products, and experiences (the “Services”). By using the Services, you agree to this policy.
          </p>
        </section>

        <section aria-labelledby="collection">
          <h2 id="collection" className="text-xl font-semibold">
            Information We Collect
          </h2>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-muted-foreground">
            <li>Usage data: interactions with pages and features (e.g., page views, clicks, basic device data).</li>
            <li>Contact info: email address if you opt into waitlists or notifications.</li>
            <li>
              Cookies and similar technologies to remember preferences and measure basic analytics. See our{" "}
              <Link href="/cookie-policy" className="underline underline-offset-2">
                Cookie Policy
              </Link>{" "}
              for details.
            </li>
            <li>Optional content you share (e.g., chat inputs). Sensitive data should not be submitted.</li>
          </ul>
        </section>

        <section aria-labelledby="use">
          <h2 id="use" className="text-xl font-semibold">
            How We Use Information
          </h2>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-muted-foreground">
            <li>Provide, maintain, and improve the Services and user experience.</li>
            <li>Respond to inquiries and send requested notifications (e.g., waitlist updates).</li>
            <li>Measure performance and reliability (aggregate analytics).</li>
            <li>Protect against abuse, fraud, and security risks.</li>
          </ul>
        </section>

        <section aria-labelledby="sharing">
          <h2 id="sharing" className="text-xl font-semibold">
            How We Share Information
          </h2>
          <p className="mt-3 text-muted-foreground">
            We do not sell your personal information. We may share limited data with service providers who support our
            infrastructure (e.g., hosting, analytics, email). These providers are bound by contractual obligations to
            protect your information and use it only for the services we request.
          </p>
        </section>

        <section aria-labelledby="legal">
          <h2 id="legal" className="text-xl font-semibold">
            Legal Basis and Retention
          </h2>
          <p className="mt-3 text-muted-foreground">
            We process information based on legitimate interests (e.g., operating and securing the Services) or your
            consent (e.g., optional cookies, waitlist sign‑ups). We retain data only as long as necessary for the
            purposes described or as required by law.
          </p>
        </section>

        <section aria-labelledby="rights">
          <h2 id="rights" className="text-xl font-semibold">
            Your Choices and Rights
          </h2>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-muted-foreground">
            <li>
              Cookies: Manage preferences via your browser and see our{" "}
              <Link href="/cookie-policy" className="underline underline-offset-2">
                Cookie Policy
              </Link>
              .
            </li>
            <li>Marketing: You can opt out of emails via unsubscribe links in our messages.</li>
            <li>
              Access/Deletion: Contact us to request access to or deletion of your information, subject to verification
              and applicable law.
            </li>
          </ul>
        </section>

        <section aria-labelledby="security">
          <h2 id="security" className="text-xl font-semibold">
            Security
          </h2>
          <p className="mt-3 text-muted-foreground">
            We take reasonable measures to protect your information. No system is 100% secure; please use the Services
            responsibly and avoid sharing sensitive information.
          </p>
        </section>

        <section aria-labelledby="children">
          <h2 id="children" className="text-xl font-semibold">
            Children’s Privacy
          </h2>
          <p className="mt-3 text-muted-foreground">
            The Services are not directed to children under 13 (or the minimum age required by your jurisdiction).
          </p>
        </section>

        <section aria-labelledby="changes">
          <h2 id="changes" className="text-xl font-semibold">
            Changes to This Policy
          </h2>
          <p className="mt-3 text-muted-foreground">
            We may update this Privacy Policy from time to time. We will update the “Last updated” date and, when
            appropriate, provide additional notice.
          </p>
        </section>

        <section aria-labelledby="contact">
          <h2 id="contact" className="text-xl font-semibold">
            Contact
          </h2>
          <p className="mt-3 text-muted-foreground">
            Questions? Reach out via the site’s contact options or reply to any official email you’ve received from us.
          </p>
        </section>
      </div>
    </main>
  )
}
