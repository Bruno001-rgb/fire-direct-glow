export function track(eventName: string, props?: Record<string, string>) {
  try {
    if (typeof window !== "undefined" && (window as any).plausible) {
      (window as any).plausible(eventName, { props });
    }
    if (import.meta.env.DEV) {
      console.log("[track]", eventName, props);
    }
  } catch {
    // silent fail — tracking should never break the app
  }
}
