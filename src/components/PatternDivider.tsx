// Southwestern stepped-diamond divider — line · terracotta hex · turquoise
// hex · terracotta hex · line. Colors use the palette CSS vars so it tracks
// any theme changes. Decorative only.
export function PatternDivider({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex justify-center px-6 py-8 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 420 28"
        className="h-auto w-full max-w-[420px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* left line */}
        <line
          x1="20"
          y1="14"
          x2="150"
          y2="14"
          stroke="var(--color-gold)"
          strokeWidth="0.8"
          opacity="0.6"
        />
        {/* left terracotta diamond */}
        <g transform="translate(165 14)">
          <polygon
            points="-8,0 -4,-6 4,-6 8,0 4,6 -4,6"
            fill="none"
            stroke="var(--color-terra)"
            strokeWidth="1.2"
          />
          <polygon
            points="-3,0 -1.5,-2 1.5,-2 3,0 1.5,2 -1.5,2"
            fill="var(--color-terra)"
          />
        </g>
        {/* center turquoise diamond */}
        <g transform="translate(210 14)">
          <polygon
            points="-12,0 -6,-8 6,-8 12,0 6,8 -6,8"
            fill="var(--color-turq)"
          />
          <polygon
            points="-6,0 -3,-4 3,-4 6,0 3,4 -3,4"
            fill="var(--color-cream)"
          />
          <circle cx="0" cy="0" r="1.5" fill="var(--color-turq)" />
        </g>
        {/* right terracotta diamond */}
        <g transform="translate(255 14)">
          <polygon
            points="-8,0 -4,-6 4,-6 8,0 4,6 -4,6"
            fill="none"
            stroke="var(--color-terra)"
            strokeWidth="1.2"
          />
          <polygon
            points="-3,0 -1.5,-2 1.5,-2 3,0 1.5,2 -1.5,2"
            fill="var(--color-terra)"
          />
        </g>
        {/* right line */}
        <line
          x1="270"
          y1="14"
          x2="400"
          y2="14"
          stroke="var(--color-gold)"
          strokeWidth="0.8"
          opacity="0.6"
        />
      </svg>
    </div>
  )
}
