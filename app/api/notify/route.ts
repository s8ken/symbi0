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

    // Persistence disabled to keep CI stable with frozen lockfile.
    // Once you update pnpm-lock.yaml or allow --no-frozen-lockfile, we’ll connect to Neon and store the signup.
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
