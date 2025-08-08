import HiddenSitemap from "@/components/hidden-sitemap"

export const dynamic = "force-static"

export default function Page() {
  return <HiddenSitemap title="Error 404" subtitle="We couldn’t find that page. Try one of these." />
}
