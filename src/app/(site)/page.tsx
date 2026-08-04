import Link from 'next/link'
import Image from 'next/image'
import { getHomePage, getAbout, getTestimonials, urlFor } from '@/lib/sanity'
import { safe } from '@/lib/safe'
import { SunMotif } from '@/components/SunMotif'
import { PatternDivider } from '@/components/PatternDivider'
import { HighlightText } from '@/components/HighlightText'

// Seeded from MassageBook until reviews are added in the CMS.
const fallbackTestimonials = [
  {
    _id: 't-jackie',
    name: 'Jackie D.',
    rating: 5,
    source: 'MassageBook Verified',
    date: 'May 2026',
    quote:
      "Molly massages like she's playing your body as a musical instrument. With that and the yurt location, not to mention just Molly & her amazing energy, the whole experience was magical! Definitely feeling taller today.",
  },
  {
    _id: 't-nicole',
    name: 'Nicole R.',
    rating: 5,
    source: 'MassageBook Verified',
    date: 'Mar 2026',
    quote:
      "I've had several massage appointments with Molly now, and each time has been just amazing. She takes the time to listen to what your needs are, and customizes the appointment to address those needs.",
  },
  {
    _id: 't-em',
    name: 'Em R.',
    rating: 5,
    source: 'MassageBook Verified',
    date: 'Feb 2026',
    quote:
      'Molly brings not only exceptional technical skill and deep expertise, but also a sense of true magic to her work. She tailored my prenatal massage with thoughtful care, creating an experience that felt both personalized and deeply supportive.',
  },
]

export default async function HomePage() {
  const [home, about, testimonials] = await Promise.all([
    safe(getHomePage(), null),
    safe(getAbout(), null),
    safe(getTestimonials(), []),
  ])
  const reviews = testimonials.length > 0 ? testimonials : fallbackTestimonials

  const headline = home?.heading ?? 'Massage, yoga & somatic bodywork'
  const benefit =
    home?.subheading ??
    'Hands-on bodywork to help you feel calm, open, and at home in your body.'
  const intro = home?.intro
  const values =
    home?.values && home.values.length > 0
      ? home.values
      : ['alignment', 'alightment', 'aliveness']
  const reviewsHeading = home?.reviewsHeading ?? 'What people are saying'
  const ceilingUrl = home?.ceilingImage
    ? urlFor(home.ceilingImage).width(1920).quality(85).url()
    : undefined
  const primary = home?.primaryCta?.label
    ? home.primaryCta
    : { label: 'Book a massage', href: '/massage' }
  const secondary = home?.secondaryCta?.label
    ? home.secondaryCta
    : { label: 'Yoga classes', href: '/yoga' }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[52vh] flex-col items-center justify-center overflow-hidden px-6 py-6 md:min-h-[68vh] md:py-10">
        {/* Sun as backdrop */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 w-[min(680px,95vw)] -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
        >
          <SunMotif className="block w-full" />
        </div>
        {/* Soft cream veil over the core so the words stay legible */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[640px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(251,232,206,0.72) 0%, rgba(251,232,206,0.4) 45%, transparent 72%)',
          }}
        />

        {/* Words rising into the light */}
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-4xl text-deep sm:text-5xl">
            {headline}
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-mid">
            {benefit}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={primary.href ?? '/massage'}
              className="rounded-full bg-terra px-8 py-3.5 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-colors hover:bg-terra-deep"
            >
              {primary.label}
            </Link>
            <Link
              href={secondary.href ?? '/yoga'}
              className="rounded-full bg-turq px-8 py-3.5 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-colors hover:bg-turq-deep"
            >
              {secondary.label}
            </Link>
          </div>
        </div>
      </section>

      {/* Practice values — sit in place of the divider below the hero */}
      <div className="px-6 py-8 text-center">
        <p className="font-sans text-[11px] font-light uppercase tracking-[0.22em] text-mid">
          {values.map((word, i) => (
            <span key={i}>
              {i > 0 && (
                <span className="mx-3 text-turq" aria-hidden="true">✦</span>
              )}
              {word}
            </span>
          ))}
        </p>
      </div>

      {/* ── Intro / orientation ──────────────────────────────── */}
      <section className="px-6 pb-10">
        <div className="mx-auto max-w-2xl text-center">
          {intro && (
            <p className="text-lg leading-relaxed text-mid sm:text-xl">{intro}</p>
          )}
        </div>
      </section>

      {/* ── The view looking up (real yurt ceiling) ──────────── */}
      <section className="relative">
        <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/9] [&_img]:brightness-[1.03] [&_img]:saturate-[0.95]">
          {ceilingUrl ? (
            <Image
              src={ceilingUrl}
              alt={
                home?.ceilingImage?.alt ?? 'Looking up at the top of the yurt'
              }
              fill
              sizes="100vw"
              className="object-cover object-[center_44%]"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-b from-yellow/40 via-gold/30 to-terra/40" />
          )}
          {/* light warm glow (kept subtle so the photo stays sharp) */}
          <div className="pointer-events-none absolute inset-0 bg-[#fbe8ce]/12" />
          {/* soft cloud-like mist fading down from the top edge */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-cream/45 via-cream/15 to-transparent" />
          <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-deep/55 via-transparent to-transparent p-8">
            <p className="font-display text-xl italic text-cream drop-shadow sm:text-2xl">
              The view from the massage table.
            </p>
          </div>
        </div>
      </section>

      <PatternDivider />

      {/* ── Reviews ──────────────────────────────────────────── */}
      <section className="px-6 pb-12 pt-8">
        <div className="text-center">
          <h2 className="text-4xl text-deep sm:text-5xl">{reviewsHeading}</h2>
          <p className="mt-5 font-sans text-sm tracking-[0.04em] text-mid">
            <span className="text-gold">★★★★★</span>&nbsp;&nbsp;5.0 · Verified on
            MassageBook
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <figure
              key={review._id}
              className="flex flex-col rounded-3xl bg-white/55 p-8 shadow-[0_20px_50px_-30px_rgba(122,58,18,0.35)]"
            >
              <div
                className="flex gap-0.5 text-base"
                aria-label={`${review.rating ?? 5} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    className={i < (review.rating ?? 5) ? 'text-gold' : 'text-mid/20'}
                  >
                    ★
                  </span>
                ))}
              </div>
              <blockquote className="mt-5 flex-1 font-display text-lg italic leading-relaxed text-deep">
                “{review.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-mid/10 pt-4">
                <span className="font-display text-base text-deep">
                  {review.name}
                </span>
                {(review.source || review.date) && (
                  <span className="mt-1 block font-sans text-[10px] uppercase tracking-[0.14em] text-mid/70">
                    {[review.source, review.date].filter(Boolean).join(' · ')}
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <PatternDivider />

      {/* ── About teaser ─────────────────────────────────────── */}
      <section>
        <div className="mx-auto grid max-w-5xl items-center gap-16 px-6 pb-14 pt-6 md:grid-cols-2">
          {about?.photo ? (
            <div className="relative aspect-square overflow-hidden rounded-3xl">
              <Image
                src={urlFor(about.photo).width(900).height(900).url()}
                alt={about.photo.alt ?? about.fullName}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="rounded-3xl object-cover"
              />
            </div>
          ) : (
            <div className="flex aspect-square items-center justify-center border border-orange/15 bg-gradient-to-br from-orange/[0.06] to-turq/[0.05] font-sans text-[11px] uppercase tracking-[0.14em] text-mid/30">
              Molly&rsquo;s photo
            </div>
          )}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-orange/70" />
              <span className="font-sans text-[10px] font-light uppercase tracking-[0.28em] text-orange">
                {about?.fullName ? `About ${about.fullName.split(' ')[0]}` : 'About Molly'}
              </span>
            </div>
            {home?.aboutTeaserHeading && (
              <h2 className="mt-4 text-4xl leading-[1.05] text-deep">
                <HighlightText text={home.aboutTeaserHeading} word="light" />
              </h2>
            )}
            {home?.aboutTeaserText && (
              <p className="mt-6 max-w-md leading-loose text-mid">
                {home.aboutTeaserText}
              </p>
            )}
            <Link
              href="/about"
              className="mt-7 inline-block border-b border-orange/30 pb-1 font-sans text-[10px] font-light uppercase tracking-[0.2em] text-orange transition-opacity hover:opacity-60"
            >
              Read Molly&rsquo;s story →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
