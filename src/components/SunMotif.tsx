// The radiant sun: a breathing vessel (the body) with a luminous center
// (the window / yurt skylight) and rays pouring outward — the view looking
// up while lying on your back. Deterministic + CSS-animated (no client JS).
const CX = 260
const CY = 260

const outerPattern = [
  { l: 282, o: 0.55, w: 1.2 },
  { l: 218, o: 0.22, w: 0.5 },
  { l: 262, o: 0.38, w: 0.78 },
  { l: 198, o: 0.16, w: 0.38 },
  { l: 274, o: 0.46, w: 0.96 },
  { l: 210, o: 0.19, w: 0.44 },
  { l: 252, o: 0.32, w: 0.64 },
  { l: 190, o: 0.13, w: 0.34 },
]

function outerColor(i: number): { c: string; b: number } {
  const m = i % 12
  if (m === 0 || m === 6) return { c: '#d4a020', b: 1.0 } // bright yellow
  if (m === 3 || m === 9) return { c: '#b85a36', b: 0.82 } // terracotta
  if (m === 2 || m === 8) return { c: '#d07028', b: 0.9 } // orange
  if (m === 5 || m === 11) return { c: '#e8b820', b: 1.05 } // warm yellow
  return { c: '#c47616', b: 1.0 } // gold base
}

const innerPattern = [
  { l: 140, o: 0.3, w: 0.62 },
  { l: 112, o: 0.15, w: 0.34 },
  { l: 128, o: 0.22, w: 0.48 },
  { l: 104, o: 0.11, w: 0.28 },
]
const innerColors = [
  '#d4a010',
  '#c48810',
  '#d07028',
  '#c87818',
  '#e8b820',
  '#d4a010',
  '#c88810',
]

function ray(angle: number, start: number, length: number) {
  return {
    x1: +(CX + Math.sin(angle) * start).toFixed(2),
    y1: +(CY - Math.cos(angle) * start).toFixed(2),
    x2: +(CX + Math.sin(angle) * length).toFixed(2),
    y2: +(CY - Math.cos(angle) * length).toFixed(2),
  }
}

const OUTER_N = 60
const OUTER_START = 122
const outerRays = Array.from({ length: OUTER_N }, (_, i) => {
  const angle = (i / OUTER_N) * Math.PI * 2
  const p = outerPattern[i % outerPattern.length]
  const { c, b } = outerColor(i)
  return { ...ray(angle, OUTER_START, p.l), stroke: c, w: p.w, o: +(p.o * b).toFixed(2) }
})

const INNER_N = 42
const INNER_START = 66
const innerRays = Array.from({ length: INNER_N }, (_, i) => {
  const angle = (i / INNER_N) * Math.PI * 2
  const p = innerPattern[i % innerPattern.length]
  return {
    ...ray(angle, INNER_START, p.l),
    stroke: innerColors[i % innerColors.length],
    w: p.w,
    o: p.o,
  }
})

export function SunMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 520"
      className={className}
      style={{ overflow: 'visible' }}
      role="img"
      aria-label="A radiant sun with light pouring from a glowing center"
    >
      <defs>
        <radialGradient id="ihs-ambient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f0c050" stopOpacity="0.28" />
          <stop offset="55%" stopColor="#d09030" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#c07028" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ihs-body" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#eec488" stopOpacity="0.58" />
          <stop offset="38%" stopColor="#d08848" stopOpacity="0.32" />
          <stop offset="75%" stopColor="#c06838" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#b05030" stopOpacity="0.1" />
        </radialGradient>
        <radialGradient id="ihs-inner" cx="48%" cy="44%" r="58%">
          <stop offset="0%" stopColor="#fffdf6" />
          <stop offset="25%" stopColor="#faf2e2" />
          <stop offset="55%" stopColor="#f2e0c4" />
          <stop offset="85%" stopColor="#e8cca8" />
          <stop offset="100%" stopColor="#deb888" />
        </radialGradient>
        <radialGradient id="ihs-warmglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f6c45a" stopOpacity="0.72" />
          <stop offset="50%" stopColor="#e88a32" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#d96a36" stopOpacity="0" />
        </radialGradient>
        <filter id="ihs-blurXL" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
        <filter id="ihs-blurL" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="ihs-blurM" x="-28%" y="-28%" width="156%" height="156%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <filter id="ihs-blurS" x="-18%" y="-18%" width="136%" height="136%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      <circle cx={CX} cy={CY} r="260" fill="url(#ihs-ambient)" />

      <g className="ihs-spin">
        {outerRays.map((r, i) => (
          <line
            key={i}
            x1={r.x1}
            y1={r.y1}
            x2={r.x2}
            y2={r.y2}
            stroke={r.stroke}
            strokeWidth={r.w}
            opacity={r.o}
            strokeLinecap="round"
          />
        ))}
      </g>

      <g className="ihs-spin-rev">
        {innerRays.map((r, i) => (
          <line
            key={i}
            x1={r.x1}
            y1={r.y1}
            x2={r.x2}
            y2={r.y2}
            stroke={r.stroke}
            strokeWidth={r.w}
            opacity={r.o}
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* soft wide body glow */}
      <circle
        className="ihs-pulse"
        cx={CX}
        cy={CY}
        r="148"
        fill="#cc6418"
        opacity="0.24"
        filter="url(#ihs-blurXL)"
      />

      {/* the vessel — the body, breathing */}
      <ellipse
        className="ihs-breathe"
        cx={CX}
        cy={CY}
        rx="118"
        ry="124"
        fill="url(#ihs-body)"
        stroke="rgba(184,90,52,.22)"
        strokeWidth="0.8"
      />

      {/* warm bloom behind the window */}
      <circle
        className="ihs-pulse"
        cx={CX}
        cy={CY}
        r="88"
        fill="url(#ihs-warmglow)"
        filter="url(#ihs-blurL)"
      />
      <circle cx={CX} cy={CY} r="72" fill="#f2a44a" opacity="0.42" filter="url(#ihs-blurM)" />

      {/* faint yurt rafters (toono) — spokes reaching from the hub out to the rim */}
      <g stroke="#b8562d" strokeWidth="1" strokeLinecap="round" opacity="0.2">
        {Array.from({ length: 16 }).map((_, i) => (
          <line
            key={i}
            x1={CX}
            y1={CY - 66}
            x2={CX}
            y2={CY - 122}
            transform={`rotate(${(360 / 16) * i} ${CX} ${CY})`}
          />
        ))}
      </g>

      {/* the window of light, breathing */}
      <circle
        className="ihs-breathe"
        cx={CX}
        cy={CY}
        r="62"
        fill="url(#ihs-inner)"
        stroke="rgba(224,151,44,.3)"
        strokeWidth="0.8"
      />

      {/* luminous center */}
      <circle
        cx={CX}
        cy={CY}
        r="10"
        fill="#fff8ec"
        opacity="0.75"
        filter="url(#ihs-blurS)"
        style={{ mixBlendMode: 'screen' }}
      />
      <circle cx={CX} cy={CY} r="4" fill="#fffcf4" opacity="0.95" />
    </svg>
  )
}
