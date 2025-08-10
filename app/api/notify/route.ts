import { NextResponse, type NextRequest } from "next/server"
import { neon } from "@neondatabase/serverless"

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  try {
    const url = process.env.DATABASE_URL
    if (!url) {
      return NextResponse.json({ ok: false, error: "DATABASE_URL is not configured on the server." }, { status: 500 })
    }

    const body = await req.json().catch(() => null)
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : ""
    const source = typeof body?.source === "string" ? body.source.trim().slice(0, 64) : "website"

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 400 })
    }

    const sql = neon(url)
    const rows = await sql<{ email: string }[]>`
      INSERT INTO public.notify_signups (email, source)
      VALUES (${email}, ${source})
      ON CONFLICT (email) DO NOTHING
      RETURNING email;
    `
    const inserted = rows.length > 0

    return NextResponse.json({
      ok: true,
      inserted,
      duplicate: !inserted,
      email,
      source,
    })
  } catch (err: any) {
    const message = typeof err?.message === "string" ? err.message : "Unexpected server error."
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
