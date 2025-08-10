import { NextResponse } from "next/server"

type NotifyBody = {
  email?: string
  source?: string
}

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  try {
    const { email, source }: NotifyBody = await request.json()
    if (!email || !validEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    const ua = request.headers.get("user-agent") || ""
    const ip =
      request.headers.get("x-real-ip") || (request.headers.get("x-forwarded-for") || "").split(",")[0]?.trim() || ""
    const now = new Date().toISOString()
    const key = `notify:${email.toLowerCase()}`
    let deduped = false

    // Upstash KV (optional)
    const kvUrl = process.env.KV_REST_API_URL
    const kvToken = process.env.KV_REST_API_TOKEN
    let upstashOk = false

    try {
      if (kvUrl && kvToken) {
        // check if exists
        const getRes = await fetch(`${kvUrl}/get/${encodeURIComponent(key)}`, {
          headers: { Authorization: `Bearer ${kvToken}` },
          cache: "no-store",
        })
        if (getRes.ok) {
          const getJson = await getRes.json()
          if (getJson && getJson.result) deduped = true
        }
        if (!deduped) {
          const value = JSON.stringify({ email, source, ua, ip, created_at: now })
          const setRes = await fetch(`${kvUrl}/set`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${kvToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ key, value }),
          })
          upstashOk = setRes.ok
        } else {
          upstashOk = true
        }
      }
    } catch {
      // ignore upstash errors; proceed
    }

    // Supabase insert (optional)
    let supabaseOk = false
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY

    try {
      if (supabaseUrl && supabaseKey) {
        const { createClient } = await import("@supabase/supabase-js")
        const supabase = createClient(supabaseUrl, supabaseKey, {
          auth: { persistSession: false, autoRefreshToken: false },
        })
        const { error } = await supabase.from("notify_signups").insert({
          email,
          source: source || null,
          ua,
          ip,
          created_at: now,
        })
        if (!error) supabaseOk = true
      }
    } catch {
      // ignore supabase errors
    }

    return NextResponse.json({
      ok: true,
      deduped,
      storage: { upstash: upstashOk, supabase: supabaseOk },
      at: now,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Bad Request" }, { status: 400 })
  }
}
