// Radiant sun-rays: light emanating from a glowing center — the brand's
// "rays from the center / window to expansion" motif. Purely decorative.
export function SunRays({ className }: { className?: string }) {
  const rayCount = 24

  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="sunray-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D4A010" stopOpacity="0.6" />
          <stop offset="32%" stopColor="#C48810" stopOpacity="0.28" />
          <stop offset="70%" stopColor="#CC6418" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g transform="translate(50 50)">
        {Array.from({ length: rayCount }).map((_, i) => (
          <polygon
            key={i}
            points="0,0 -1.5,-80 1.5,-80"
            fill="#D4A010"
            opacity={i % 2 === 0 ? 0.18 : 0.09}
            transform={`rotate(${(360 / rayCount) * i})`}
          />
        ))}
        {/* glowing center — the window of light */}
        <circle r="85" fill="url(#sunray-glow)" />
      </g>
    </svg>
  )
}
