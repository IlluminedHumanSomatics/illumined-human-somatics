import type { Metadata } from 'next'
import {
  getContactInfo,
  getMassagePage,
  getPracticeLocations,
  urlFor,
} from '@/lib/sanity'
import type { ContactInfo, MassagePage, PracticeLocation } from '@/lib/types'
import { safe } from '@/lib/safe'
import { HeroVideo } from '@/components/HeroVideo'
import { MapPin } from '@/components/MapPin'
import { LocationCard } from '@/components/LocationCard'

export const metadata: Metadata = {
  title: 'Massage · Illumined Human Somatics',
  description:
    'Somatic massage and bodywork with Molly in a Portland yurt — choose a service and book your session.',
}

// Shown only if no locations have been added in Studio yet.
const fallbackLocations: PracticeLocation[] = [
  {
    _id: 'fb-yomassage',
    _type: 'practiceLocation',
    name: 'Yomassage',
    page: 'massage',
    area: 'Portland',
    description: 'Bodywork sessions at Yomassage. Reach out to book a time.',
    linkLabel: 'Inquire',
    linkUrl: '/contact',
  },
  {
    _id: 'fb-wotb',
    _type: 'practiceLocation',
    name: 'Written on the Body',
    page: 'massage',
    area: 'Portland · Wednesdays',
    description:
      'Massage at the Written on the Body studio, booked through their scheduler.',
    linkLabel: 'Book here',
    linkUrl: 'https://www.portlandmassagestudio.com/massage#molly',
  },
]

export default async function MassagePage() {
  const [contact, massage, cmsLocations] = await Promise.all([
    safe<ContactInfo | null>(getContactInfo(), null),
    safe<MassagePage | null>(getMassagePage(), null),
    safe<PracticeLocation[]>(getPracticeLocations('massage'), []),
  ])

  const locations = cmsLocations.length > 0 ? cmsLocations : fallbackLocations

  const bookingUrl =
    contact?.bookingUrl ??
    'https://www.massagebook.com/therapists/illumined-human-somatics/widget/services'

  const heroPosterUrl = massage?.heroPoster
    ? urlFor(massage.heroPoster).width(1400).quality(70).url()
    : undefined

  // CMS text with the current copy as fallback (editable in Studio → Massage Page).
  const heroHeading = massage?.heroHeading ?? 'Somatic massage & bodywork'
  const heroSubheading =
    massage?.heroSubheading ??
    'Therapeutic, attuned bodywork that meets your whole system, in a hand-crafted yurt tucked into the green of Portland.'
  const bookingEyebrow = massage?.bookingEyebrow ?? 'The Yurt · Portland'
  const bookingHeading =
    massage?.bookingHeading ?? 'Book your session in the yurt'
  const bookingText =
    massage?.bookingText ??
    'Somatic massage & bodywork in the hand-crafted yurt, including couples massage for two. Molly can also travel to you. Choose a service and time below to book directly with her.'
  const otherHeading = massage?.otherHeading ?? 'Also find Molly at'
  const otherText =
    massage?.otherText ?? 'Molly also offers bodywork at two other Portland spaces.'

  return (
    <>
      {/* ── Video hero: text centered over an evenly-dimmed video ── */}
      <section className="relative flex min-h-[440px] w-full flex-col items-center justify-center overflow-hidden px-6 py-16 text-center md:h-[78vh] md:py-20">
        <HeroVideo
          videoUrl={massage?.heroVideoUrl}
          posterUrl={heroPosterUrl}
          alt={massage?.heroPoster?.alt ?? 'Inside the yurt'}
        />
        {/* even, full-cover scrim so the text reads anywhere (PBRC-style) */}
        <div className="absolute inset-0 bg-deep/55" />

        <div className="relative z-10 max-w-2xl [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
          <h1 className="text-balance text-4xl text-white sm:text-6xl">
            {heroHeading}
          </h1>
          <p className="mx-auto mt-6 max-w-lg font-sans text-base font-light leading-relaxed text-white sm:text-lg">
            {heroSubheading}
          </p>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-block rounded-full bg-orange px-8 py-3.5 font-sans text-[11px] font-normal uppercase tracking-[0.22em] text-white transition-colors hover:bg-terra-deep"
          >
            Book a session
          </a>
        </div>
      </section>

      {/* ── The Yurt — book right here (embedded scheduler) ──── */}
      <section id="book-yurt" className="px-6 pb-20 pt-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-turq-deep">
            <MapPin className="h-4 w-4" />
            {bookingEyebrow}
          </p>
          <h2 className="mt-4 text-3xl text-deep sm:text-4xl">
            {bookingHeading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-mid">
            {bookingText}
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border border-mid/15 bg-white/70">
          <iframe
            src="https://www.massagebook.com/therapists/illumined-human-somatics/widget/services"
            title="Book a massage with Molly in the yurt"
            loading="lazy"
            className="block h-[630px] w-full border-0"
          />
        </div>
      </section>

      {/* ── Also find Molly at (the other two locations) ─────── */}
      <section className="border-t border-mid/10 px-6 pb-24 pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl text-deep sm:text-4xl">{otherHeading}</h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-mid">
            {otherText}
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
          {locations.map((loc) => (
            <LocationCard key={loc._id} location={loc} />
          ))}
        </div>
      </section>
    </>
  )
}
