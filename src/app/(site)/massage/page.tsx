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
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-block rounded-full bg-orange px-8 py-3.5 font-sans text-[11px] font-light uppercase tracking-[0.22em] text-cream transition-colors hover:bg-deep"
          >
            Book a session
          </a>
        </div>
      </section>

      {/* ── Where to book (3 locations) ──────────────────────── */}
      <section className="px-6 pb-20 pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl text-deep sm:text-4xl">Where to book</h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-3">
          {/* The Yurt */}
          <div className="flex flex-col rounded-3xl border border-mid/15 bg-white/55 p-8">
            <h3 className="text-2xl text-deep">The Yurt</h3>
            <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.14em] text-mid/70">
              Portland
            </p>
            <p className="mt-4 flex-1 leading-relaxed text-mid">
              Somatic massage &amp; bodywork in the hand-crafted yurt.
            </p>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 self-start rounded-full bg-orange px-6 py-2.5 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-deep"
            >
              Book a session →
            </a>
          </div>

          {/* Yomassage */}
          <div className="flex flex-col rounded-3xl border border-mid/15 bg-white/55 p-8">
            <h3 className="text-2xl text-deep">Yomassage</h3>
            <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.14em] text-mid/70">
              Portland
            </p>
            <p className="mt-4 flex-1 leading-relaxed text-mid">
              Bodywork sessions at Yomassage — reach out to book a time.
            </p>
            <a
              href="/contact"
              className="mt-6 self-start rounded-full border border-turq-deep px-6 py-2.5 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-turq-deep transition-colors hover:bg-turq-deep hover:text-cream"
            >
              Inquire →
            </a>
          </div>

          {/* Written on the Body */}
          <div className="flex flex-col rounded-3xl border border-mid/15 bg-white/55 p-8">
            <h3 className="text-2xl text-deep">Written on the Body</h3>
            <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.14em] text-mid/70">
              Portland · Wednesdays
            </p>
            <p className="mt-4 flex-1 leading-relaxed text-mid">
              Massage at the Written on the Body studio, booked through their
              scheduler.
            </p>
            <a
              href="https://www.portlandmassagestudio.com/massage#molly"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 self-start rounded-full border border-turq-deep px-6 py-2.5 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-turq-deep transition-colors hover:bg-turq-deep hover:text-cream"
            >
              Book here →
            </a>
          </div>
        </div>
      </section>

    </>
  )
}
