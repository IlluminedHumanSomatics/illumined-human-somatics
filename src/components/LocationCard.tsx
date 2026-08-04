import Link from 'next/link'
import { MapPin } from './MapPin'
import { urlFor } from '@/lib/sanity'
import type { PracticeLocation } from '@/lib/types'

const buttonClass =
  'mt-6 self-start rounded-full border border-turq-deep px-6 py-2.5 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-turq-deep transition-colors hover:bg-turq-deep hover:text-cream'

// One location card (Yomassage, NOW Yoga, etc.), rendered from a CMS
// Practice Location. Handles both internal (/contact) and external links.
export function LocationCard({ location }: { location: PracticeLocation }) {
  const { name, logo, area, description, linkLabel, linkUrl } = location
  const label = `${linkLabel ?? 'Learn more'} →`
  const isInternal = !!linkUrl && linkUrl.startsWith('/')
  // Plain <img>: logos vary in format (incl. SVG), which the Next image
  // optimizer rejects. urlFor width is ignored for SVG and caps rasters.
  const logoUrl = logo ? urlFor(logo).width(400).url() : undefined

  return (
    <div className="flex flex-col rounded-3xl border border-mid/15 bg-white/55 p-8">
      <div className="flex items-center gap-3">
        {logoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoUrl}
            alt={logo?.alt ?? `${name} logo`}
            className="h-9 w-auto max-w-[110px] shrink-0 object-contain"
          />
        )}
        <h3 className="text-2xl text-deep">{name}</h3>
      </div>
      {area && (
        <p className="mt-1.5 flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.14em] text-mid/70">
          <MapPin className="h-3.5 w-3.5 text-turq-deep" />
          {area}
        </p>
      )}
      {description && (
        <p className="mt-4 flex-1 leading-relaxed text-mid">{description}</p>
      )}
      {linkUrl &&
        (isInternal ? (
          <Link href={linkUrl} className={buttonClass}>
            {label}
          </Link>
        ) : (
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass}
          >
            {label}
          </a>
        ))}
    </div>
  )
}
