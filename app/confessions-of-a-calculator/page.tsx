import { redirect } from "next/navigation"

export default function Page() {
  // Preserve the original route but make "Confessions of a Calculator" an alias.
  return redirect("/wolfram-playground")
}
