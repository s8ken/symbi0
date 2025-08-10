"use client"

import WolframSecrets from "@/components/wolfram-secrets"

export default function ConfessionsAlias() {
  // Render directly to avoid redirects; set via to customize title/hero
  return <WolframSecrets via="confessions" />
}
