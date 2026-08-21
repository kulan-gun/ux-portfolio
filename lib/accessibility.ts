export function motionSafeScrollBehavior(): ScrollBehavior {
  if (typeof window === "undefined") return "auto"
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
}
