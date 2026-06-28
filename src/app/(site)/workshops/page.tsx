import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getWorkshops, urlFor } from '@/lib/sanity'
import type { Workshop } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Retreats & Workshops · Illumined Human Somatics',
  description:
    'Immersive retreats and workshops with Molly Dilg — invitations to slow down, move, and come home to your body in community.',
}

// Shown until Molly adds her own workshops/retreats in the Studio.
type FallbackWorkshop = Workshop & { imageUrl?: string; images?: string[] }

const FALLBACK_WORKSHOPS: FallbackWorkshop[] = [
  {
    _id: 'fallback-journey-to-joy',
    _type: 'workshop',
    images: ['/journey-to-joy.jpg', '/journey-to-joy-lounge.jpg'],
    title: 'Journey to Joy — A Queer Wellness Retreat',
    slug: { current: 'journey-to-joy' },
    date: '2026-11-05',
    endDate: '2026-11-10',
    location: 'Bacalar, Mexico',
    shortDescription:
      'Six days on the lagoon for LGBTQIA+ folks to rest, play, move, laugh, and let joy become something lived in the body again. Daily yoga, breathwork, sound healing, paddleboarding, community circles, and all meals included — co-led by Molly as the yoga & somatic guide.',
    price: 'From $2,888',
    externalBookingLink: 'https://www.risetoher.com/retreat-queer-joy',
    isFeatured: true,
  },
]

function formatDateRange(date?: string, endDate?: string) {
  if (!date) return null
  const parse = (d: string) => new Date(`${d}T00:00:00`)
  const start = parse(date)
  if (endDate) {
    const end = parse(endDate)
    const sameMonth =
      start.getFullYear() === end.getFullYear() &&
      start.getMonth() === end.getMonth()
    if (sameMonth) {
      return `${start.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
      })}–${end.toLocaleDateString('en-US', { day: 'numeric' })}, ${end.getFullYear()}`
    }
    return `${start.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    })} – ${end.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })}`
  }
  return start.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function WorkshopCard({ workshop }: { workshop: FallbackWorkshop }) {
  const dateRange = formatDateRange(workshop.date, workshop.endDate)
  const meta = [dateRange, workshop.location].filter(Boolean).join(' · ')
  const imageUrl = workshop.image
    ? urlFor(workshop.image).width(1200).quality(80).url()
    : (workshop.imageUrl ?? null)
  const gallery = workshop.gallery?.length
    ? workshop.gallery.map((img) => urlFor(img).width(1000).quality(80).url())
    : (workshop.images ?? [])

  return (
    <article className="overflow-hidden rounded-3xl border border-mid/15 bg-white/55">
      {gallery.length > 1 ? (
        <div className="grid grid-cols-2 gap-1">
          {gallery.slice(0, 4).map((src, i) => (
            <div key={src} className="relative aspect-[4/3]">
              <Image
                src={src}
                alt={i === 0 ? workshop.title : ''}
                fill
                sizes="(min-width: 768px) 384px, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : imageUrl ? (
        <div className="relative aspect-[16/9] w-full sm:aspect-[2/1]">
          <Image
            src={imageUrl}
            alt={workshop.image?.alt ?? workshop.title}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="p-8 sm:p-10">
        {workshop.isFeatured && (
          <span className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-turq-deep">
            Featured retreat
          </span>
        )}
        <h2 className="mt-3 text-2xl text-deep sm:text-3xl">{workshop.title}</h2>

        {meta && (
          <p className="mt-3 font-sans text-[12px] uppercase tracking-[0.14em] text-mid/70">
            {meta}
          </p>
        )}

        {workshop.shortDescription && (
          <p className="mt-5 leading-relaxed text-mid">
            {workshop.shortDescription}
          </p>
        )}

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          {workshop.price && (
            <span className="font-display text-xl text-deep">
              {workshop.price}
            </span>
          )}

          {workshop.isSoldOut ? (
            <span className="rounded-full border border-mid/25 px-6 py-2.5 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-mid/60">
              Sold out
            </span>
          ) : workshop.externalBookingLink ? (
            <a
              href={workshop.externalBookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-orange px-7 py-2.5 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-deep"
            >
              Learn more &amp; reserve →
            </a>
          ) : (
            <Link
              href="/contact"
              className="rounded-full bg-orange px-7 py-2.5 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-deep"
            >
              Inquire →
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}

export default async function WorkshopsPage() {
  let cms: Workshop[] = []
  try {
    cms = await getWorkshops()
  } catch {
    cms = []
  }
  const workshops: FallbackWorkshop[] = cms.length > 0 ? cms : FALLBACK_WORKSHOPS

  return (
    <section className="px-6 py-12">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-turq-deep">
          Retreats &amp; Workshops
        </p>
        <h1 className="mt-3 text-4xl text-deep sm:text-5xl">Gather &amp; restore</h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-mid">
          From day workshops to immersive retreats, these are invitations to slow
          down, move, and come home to your body — in community.
        </p>
      </div>

      {/* ── Listings ─────────────────────────────────────────── */}
      <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-8">
        {workshops.map((w) => (
          <WorkshopCard key={w._id} workshop={w} />
        ))}
      </div>

      {/* ── Nudge ────────────────────────────────────────────── */}
      <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-mid/80">
        Curious about an upcoming gathering?{' '}
        <Link
          href="/contact"
          className="font-medium text-turq-deep underline-offset-4 hover:underline"
        >
          Get in touch
        </Link>
        .
      </p>
    </section>
  )
}
