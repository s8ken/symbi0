// Node.js script to run a .sql file against a Postgres database.
// Usage:
//   1) Set DATABASE_URL in your environment
//   2) In v0, open this file and click "Run", or run with Node locally:
//      node --loader ts-node/esm scripts/run-sql.ts [optional-path-to-sql]
//
// Notes:
// - Works with Neon and Supabase Postgres when DATABASE_URL is a valid Postgres connection string.
// - The script splits the SQL file by semicolons and executes statements sequentially.
//   This is safe for simple DDL like CREATE TABLE/INDEX used here.

import { readFile } from "node:fs/promises"
import { neon } from "@neondatabase/serverless"

async function main() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    console.error(
      "DATABASE_URL is not set. Add a Postgres connection string (Neon or Supabase) to DATABASE_URL and try again.",
    )
    process.exit(1)
  }

  const sqlPath = process.argv[2] || "scripts/sql/001_create_notify_signups.sql"
  const raw = await readFile(sqlPath, "utf8")

  // Split into statements by semicolon, ignoring empties and comments-only lines.
  const statements = raw
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length && !s.startsWith("--"))

  if (!statements.length) {
    console.log(`No executable statements found in ${sqlPath}.`)
    return
  }

  const sql = neon(databaseUrl)

  console.log(`Running ${statements.length} statement(s) from ${sqlPath}...`)
  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i]
    console.log(`\n[${i + 1}/${statements.length}] Executing:\n${stmt};`)
    await sql(stmt as any)
  }
  console.log("\nDone. Database is ready.")
}

main().catch((err) => {
  console.error("Error running SQL:", err)
  process.exit(1)
})
