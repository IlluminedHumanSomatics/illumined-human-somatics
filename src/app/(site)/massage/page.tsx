import type { Metadata } from 'next'
import { getContactInfo, getHomePage, urlFor } from '@/lib/sanity'
import type { ContactInfo, HomePage } from '@/lib/types'
import { HeroVideo } from '@/components/HeroVideo'

export const metadata: Metadata = {
  title: 'Massage · Illumined Human Somatics',
  description:
    'Somatic massage and bodywork with Molly in a Portland yurt — choose a service and book your session.',
}

async function safe<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise
  } catch {
    return fallback
  }
}

export default async function MassagePage() {
  const [contact, home] = await Promise.all([
    safe<ContactInfo | null>(getContactInfo(), null),
    safe<HomePage | null>(getHomePage(), null),
  ])

  const bookingUrl =
    contact?.bookingUrl ??
    'https://www.massagebook.com/therapists/illumined-human-somatics/widget/services'

  const spacePosterUrl = home?.spacePoster
    ? urlFor(home.spacePoster).width(1400).quality(70).url()
    : undefined

  return (
    <>
      {/* ── Video hero: text centered over an evenly-dimmed video ── */}
      <section className="relative flex min-h-[540px] w-full flex-col items-center justify-center overflow-hidden px-6 py-20 text-center md:h-[78vh]">
        <HeroVideo
          videoUrl={home?.spaceVideoUrl}
          posterUrl={spacePosterUrl}
          alt={home?.spacePoster?.alt ?? 'Inside the yurt'}
        />
        {/* even, full-cover scrim so the text reads anywhere (PBRC-style) */}
        <div className="absolute inset-0 bg-deep/55" />

        <div className="relative z-10 max-w-2xl [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
          <h1 className="text-balance text-4xl text-white sm:text-6xl">
            Somatic massage &amp; bodywork
          </h1>
          <p className="mx-auto mt-6 max-w-lg font-sans text-base font-light leading-relaxed text-white sm:text-lg">
            Therapeutic, attuned bodywork that meets your whole system, in a
            hand-crafted yurt tucked into the green of Portland.
          </p>
          <a
            href="#book"
            className="mt-9 inline-block rounded-full bg-orange px-8 py-3.5 font-sans text-[11px] font-light uppercase tracking-[0.22em] text-cream transition-colors hover:bg-deep"
          >
            Book a session
          </a>
        </div>
      </section>

      {/* ── Scheduler ────────────────────────────────────────── */}
      <section id="book" className="px-6 pb-16 pt-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-7 text-center text-3xl text-deep sm:text-4xl">
            Book a session
          </h2>
          <iframe
            src={bookingUrl}
            title="Book a massage with Illumined Human Somatics"
            className="h-[620px] w-full rounded-2xl border border-mid/10 bg-white"
            loading="lazy"
          />
        </div>
      </section>
    </>
  )
}
