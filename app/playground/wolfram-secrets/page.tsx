"use client"

import { useSearchParams } from "next/navigation"
import WolframSecrets from "@/components/wolfram-secrets"

export default function Page() {
  const params = useSearchParams()
  const via = (params.get("via") as "confessions" | "case-studies" | "wolfram-playground" | null) ?? undefined
  return <WolframSecrets via={via} />
}
