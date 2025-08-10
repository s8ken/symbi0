import { type NextRequest, NextResponse } from "next/server"

// Redirect the old path to the new stable page.
export function GET(request: NextRequest) {
  const url = new URL("/children-of-the-404", request.url)
  return NextResponse.redirect(url, 308)
}
