import Link from 'next/link'
import { getContactInfo } from '@/lib/sanity'
import type { ContactInfo } from '@/lib/types'
import { MapPin } from '@/components/MapPin'

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

// Small rotating sun mark for the footer (deterministic rays + brand spin).
function FooterSunMark() {
  const rays = Array.from({ length: 20 }, (_, i) => {
    const a = (i / 20) * Math.PI * 2
    const long = i % 5 === 0
    const r1 = 6
    const r2 = long ? 26 : 18
    return {
      x1: (30 + r1 * Math.sin(a)).toFixed(1),
      y1: (30 - r1 * Math.cos(a)).toFixed(1),
      x2: (30 + r2 * Math.sin(a)).toFixed(1),
      y2: (30 - r2 * Math.cos(a)).toFixed(1),
      stroke: i % 3 === 0 ? 'var(--color-turq)' : 'var(--color-terra)',
      opacity: long ? 0.95 : 0.6,
    }
  })
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 60 60"
      className="overflow-visible"
      aria-hidden="true"
    >
      <g className="ihs-spin">
        {rays.map((r, i) => (
          <line
            key={i}
            x1={r.x1}
            y1={r.y1}
            x2={r.x2}
            y2={r.y2}
            stroke={r.stroke}
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity={r.opacity}
          />
        ))}
      </g>
      <circle cx="30" cy="30" r="9" fill="var(--color-terra)" opacity="0.5" />
      <circle cx="30" cy="30" r="6" fill="var(--color-orange)" opacity="0.9" />
      <circle cx="30" cy="30" r="3" fill="var(--color-gold)" opacity="1" />
    </svg>
  )
}

export async function SiteFooter() {
  let contact: ContactInfo | null = null
  try {
    contact = await getContactInfo()
  } catch {
    contact = null
  }

  const instagramUrl =
    contact?.instagramUrl ??
    'https://www.instagram.com/illumined_human_somatics/'
  const email = contact?.email ?? 'illuminedhumansomatics@gmail.com'
  const location = contact?.locationDescription ?? 'Portland, Oregon'

  return (
    <footer className="border-t border-deep/10 bg-[#efe3d1] text-mid">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-12 md:grid-cols-2">
        {/* Navigate */}
        <div>
          <h4 className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-turq-deep">
            Explore
          </h4>
          <ul className="mt-5 flex flex-col gap-3 text-base font-normal">
            <li><Link href="/about" className="text-deep transition-colors hover:text-orange">About</Link></li>
            <li><Link href="/massage" className="text-deep transition-colors hover:text-orange">Massage</Link></li>
            <li><Link href="/yoga" className="text-deep transition-colors hover:text-orange">Yoga</Link></li>
            <li><Link href="/workshops" className="text-deep transition-colors hover:text-orange">Retreats &amp; Workshops</Link></li>
            <li><Link href="/contact" className="text-deep transition-colors hover:text-orange">Contact</Link></li>
            <li><Link href="/massage" className="text-deep transition-colors hover:text-orange">Book</Link></li>
          </ul>
        </div>

        {/* Her practice + social */}
        <div className="flex flex-col md:items-end md:text-right">
          <div className="flex items-center gap-3">
            <FooterSunMark />
            <p className="font-display text-3xl tracking-[0.08em] text-deep">
              Illumined Human Somatics
            </p>
          </div>
          <p className="mt-2 font-display text-lg italic text-mid">
            with Molly Dilg
          </p>
          <a
            href={`mailto:${email}`}
            className="mt-5 text-base text-mid transition-colors hover:text-orange"
          >
            {email}
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Illumined Human Somatics on Instagram"
            className="mt-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-turq-deep text-cream transition-colors hover:bg-turq"
          >
            <InstagramIcon />
          </a>
          <div className="mt-5 flex items-center gap-2.5 text-base text-mid">
            <MapPin className="h-[18px] w-[18px] text-turq-deep" />
            {location}
          </div>
        </div>
      </div>

      <div className="border-t border-deep/10">
        <div className="mx-auto max-w-6xl px-6 py-5 text-center text-[10px] uppercase tracking-[0.12em] text-mid/60 sm:px-12">
          © {new Date().getFullYear()} Illumined Human Somatics
        </div>
      </div>
    </footer>
  )
}
