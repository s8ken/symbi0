import { Concepts } from "@/app/components/concepts"

export const dynamic = "force-static"

export default function ConceptsPage() {
  // Render the Concepts component directly (no extra wrapper to avoid nested <main>)
  return <Concepts />
}
