import HiddenSitemap from "@/components/hidden-sitemap"

export const metadata = {
  title: "Children of the 404 — Sitemap",
  description: "A symbolic glitch space and layered sitemap for the SYMBIverse.",
}

export default function Page() {
  return <HiddenSitemap reason="manual" />
}
