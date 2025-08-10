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
    const body = (await req.json()) as Body
    const email = (body.email || "").trim().toLowerCase()
    const source = (body.source || "unknown").slice(0, 64)

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 })
    }

    // Optional basic rate-limit via IP in memory (best-effort; not durable across serverless runs)
    // For production, use Upstash or a durable store. Omitted here to avoid lockfile changes.

    // TODO: Persist to Neon
    // Example (after adding @neondatabase/serverless and committing the lockfile):
    //
    // import { neon } from "@neondatabase/serverless"
    // const sql = neon(process.env.DATABASE_URL as string)
    // await sql`CREATE TABLE IF NOT EXISTS notify_signups (
    //   email text PRIMARY KEY,
    //   source text,
    //   created_at timestamptz DEFAULT now()
    // )`
    // const result = await sql`
    //   INSERT INTO notify_signups (email, source)
    //   VALUES (${email}, ${source})
    //   ON CONFLICT (email) DO NOTHING
    //   RETURNING email
    // `
    // const duplicate = result.length === 0

    // For now, pretend success without persistence.
    const duplicate = false

    return NextResponse.json({
      ok: true,
      duplicate,
      storage: "none",
      email,
      source,
    })
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 })
  }
}

export async function GET() {
  // Health check endpoint
  return NextResponse.json({ ok: true })
}
