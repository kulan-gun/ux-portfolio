export {}

declare global {
  interface Window {
    Sparticles?: new (
      element: HTMLElement,
      options?: Record<string, unknown>
    ) => {
      loop?: { stop: () => void }
      canvas?: HTMLCanvasElement
      el?: HTMLElement
    }
  }
}
