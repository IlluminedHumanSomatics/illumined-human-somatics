import Link from 'next/link'
import { getContactInfo } from '@/lib/sanity'
import type { ContactInfo } from '@/lib/types'

function MapPin() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] shrink-0 text-turq-deep"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21s-6-5.686-6-10a6 6 0 1 1 12 0c0 4.314-6 10-6 10Z" />
      <circle cx="12" cy="11" r="2" />
    </svg>
  )
}

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
  const location = contact?.locationDescription ?? 'Portland, Oregon'

  return (
    <footer className="bg-deep text-cream/90">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-12 md:grid-cols-2">
        {/* Navigate */}
        <div>
          <h4 className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-turq-deep">
            Explore
          </h4>
          <ul className="mt-5 flex flex-col gap-3 text-base font-normal">
            <li><Link href="/about" className="text-cream transition-colors hover:text-turq-deep">About</Link></li>
            <li><Link href="/massage" className="text-cream transition-colors hover:text-turq-deep">Massage</Link></li>
            <li><Link href="/yoga" className="text-cream transition-colors hover:text-turq-deep">Yoga</Link></li>
            <li><Link href="/workshops" className="text-cream transition-colors hover:text-turq-deep">Retreats &amp; Workshops</Link></li>
            <li><Link href="/contact" className="text-cream transition-colors hover:text-turq-deep">Contact</Link></li>
            <li><Link href="/massage" className="text-cream transition-colors hover:text-turq-deep">Book</Link></li>
          </ul>
        </div>

        {/* Her practice + social */}
        <div className="flex flex-col md:items-end md:text-right">
          <p className="font-display text-3xl tracking-[0.08em] text-cream">
            Illumined Human Somatics
          </p>
          <p className="mt-2 font-display text-lg italic text-turq-deep">
            with Molly Dilg
          </p>
          {contact?.email && (
            <a
              href={`mailto:${contact.email}`}
              className="mt-5 text-base text-cream transition-colors hover:text-turq-deep"
            >
              {contact.email}
            </a>
          )}
          <div className="mt-5 flex items-center gap-2.5 text-base text-cream">
            <MapPin />
            {location}
          </div>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Illumined Human Somatics on Instagram"
            className="mt-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-turq-deep hover:text-deep"
          >
            <InstagramIcon />
          </a>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-6xl px-6 py-5 text-center text-[10px] uppercase tracking-[0.12em] text-cream/65 sm:px-12">
          © {new Date().getFullYear()} Illumined Human Somatics
        </div>
      </div>
    </footer>
  )
}
