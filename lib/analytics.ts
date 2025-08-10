export function trackPageView(page: string, data: Record<string, any> = {}) {
  if (typeof window !== "undefined") {
    // Lightweight, replace with your analytics provider later
    console.debug("[analytics] page_view", { page, ...data })
  }
}

export function track(event: string, data: Record<string, any> = {}) {
  if (typeof window !== "undefined") {
    console.debug("[analytics] event", { event, ...data })
  }
}
