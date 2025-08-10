import { type NextRequest, NextResponse } from "next/server"

export function GET(request: NextRequest) {
  const url = new URL("/children-of-the-404", request.url)
  // Permanent redirect to the new stable page
  return NextResponse.redirect(url, 308)
}
