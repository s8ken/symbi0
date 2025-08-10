import { NextResponse } from "next/server"

type Body = {
  email?: string
  source?: string
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Body
    const email = (body.email || "").trim().toLowerCase()
    const source = (body.source || "website").slice(0, 64)

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 })
    }

    // Deploy-friendly: no DB write here (avoids lockfile/dependency churn).
    // We can enable Neon persistence after the lockfile is updated or install command is relaxed.
    return NextResponse.json({
      ok: true,
      duplicate: false,
      stored: false,
      email,
      source,
    })
  } catch {
    return NextResponse.json({ ok: false, error: "Unexpected error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ ok: true })
}
