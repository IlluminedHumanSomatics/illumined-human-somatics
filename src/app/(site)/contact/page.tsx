import type { Metadata } from 'next'
import Link from 'next/link'
import { getContactInfo } from '@/lib/sanity'
import type { ContactInfo } from '@/lib/types'
import { MapPin } from '@/components/MapPin'

export const metadata: Metadata = {
  title: 'Contact · Illumined Human Somatics',
  description:
    'Get in touch with Molly Dilg — book a massage or yoga session, or say hello by email or Instagram in Portland, Oregon.',
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-turq-deep" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-turq-deep" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-turq-deep" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default async function ContactPage() {
  let contact: ContactInfo | null = null
  try {
    contact = await getContactInfo()
  } catch {
    contact = null
  }

  const email = contact?.email ?? 'illuminedhumansomatics@gmail.com'
  const phone = contact?.phone
  const instagramUrl =
    contact?.instagramUrl ??
    'https://www.instagram.com/illumined_human_somatics/'
  const instagramHandle = contact?.instagramHandle ?? '@illumined_human_somatics'
  const location = contact?.locationDescription ?? 'Portland, Oregon'

  return (
    <section className="px-6 py-12">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-turq-deep">
          Contact
        </p>
        <h1 className="mt-3 text-4xl text-deep sm:text-5xl">Let&rsquo;s connect</h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-mid">
          Whether you&rsquo;re booking your first session or simply have a
          question, I&rsquo;d love to hear from you.
        </p>
      </div>

      {/* ── Reach out ────────────────────────────────────────── */}
      <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-mid/15 bg-white/55 p-10 text-center">
        <div className="flex flex-col items-start gap-5">
          {email && (
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-3 text-lg text-deep transition-colors hover:text-orange"
            >
              <MailIcon />
              {email}
            </a>
          )}
          {phone && (
            <a
              href={`tel:${phone.replace(/[^+\d]/g, '')}`}
              className="inline-flex items-center gap-3 text-base text-mid transition-colors hover:text-orange"
            >
              <PhoneIcon />
              {phone}
            </a>
          )}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-base text-mid transition-colors hover:text-turq-deep"
          >
            <InstagramIcon />
            {instagramHandle}
          </a>
          <div className="inline-flex items-center gap-3 text-base text-mid">
            <MapPin className="h-5 w-5 text-turq-deep" />
            {location}
          </div>
        </div>

        <p className="mt-8 text-sm leading-relaxed text-mid/75">
          Sessions are by appointment — the exact studio location is shared when
          you book.
        </p>
      </div>

      <p className="mx-auto mt-8 max-w-xl text-center text-sm text-mid/80">
        Ready to book? Find a time for{' '}
        <Link
          href="/massage"
          className="font-medium text-turq-deep underline-offset-4 hover:underline"
        >
          Massage
        </Link>{' '}
        or{' '}
        <Link
          href="/yoga"
          className="font-medium text-turq-deep underline-offset-4 hover:underline"
        >
          Yoga
        </Link>
        .
      </p>
    </section>
  )
}
