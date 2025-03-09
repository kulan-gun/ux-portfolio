export default function HexagonPattern() {
  return (
    <div className="fixed inset-0 z-[-1] opacity-40" aria-hidden="true">
      <svg width="100%" height="100%">
        <pattern
          id="hexagon-pattern"
          x="0"
          y="0"
          width="50"
          height="44"
          patternUnits="userSpaceOnUse"
          viewBox="0 0 50 44"
        >
          <path
            d="M25,0 L50,14.5 L50,29.5 L25,44 L0,29.5 L0,14.5 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-gray-800"
          />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#hexagon-pattern)" />
      </svg>
    </div>
  )
}

