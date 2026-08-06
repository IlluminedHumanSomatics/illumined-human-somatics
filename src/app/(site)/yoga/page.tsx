import type { Metadata } from 'next'
import Image from 'next/image'
import { getPracticeLocations, getYogaPage, urlFor } from '@/lib/sanity'
import type { PracticeLocation, YogaPage } from '@/lib/types'
import { safe } from '@/lib/safe'
import { LocationCard } from '@/components/LocationCard'

export const metadata: Metadata = {
  title: 'Yoga · Illumined Human Somatics',
  description:
    "Molly's group yoga classes at NOW Yoga and YogaSix Slabtown in Portland.",
}

export default async function YogaPage() {
  const [yoga, locations] = await Promise.all([
    safe<YogaPage | null>(getYogaPage(), null),
    safe<PracticeLocation[]>(getPracticeLocations('yoga'), []),
  ])

  // CMS text with the current copy as fallback (editable in Studio → Yoga Page).
  const heroHeading = yoga?.heroHeading ?? 'Yoga with Molly'
  const heroText =
    yoga?.heroText ??
    'Find Molly’s group classes at two Portland studios below, and pick the one that fits. She also offers private 1:1 yoga sessions.'

  // Crop tight to the figure — the drawing sits centered on a large,
  // mostly-transparent canvas, so a rect crop keeps it from rendering small.
  const heroDrawingUrl = yoga?.heroImage
    ? urlFor(yoga.heroImage)
        .rect(1287, 460, 2196, 2932)
        .width(560)
        .quality(90)
        .url()
    : undefined

  return (
    <section className="px-6 py-10">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 md:flex-row md:justify-center md:gap-16">
        <div className="max-w-md text-center md:text-left">
          <h1 className="text-4xl text-deep sm:text-5xl">{heroHeading}</h1>
          <p className="mt-5 leading-relaxed text-mid">{heroText}</p>
        </div>
        {heroDrawingUrl && (
          <Image
            src={heroDrawingUrl}
            alt=""
            width={560}
            height={748}
            aria-hidden="true"
            className="w-[175px] shrink-0 sm:w-[200px]"
          />
        )}
      </div>

      {locations.length > 0 && (
        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
          {locations.map((loc) => (
            <LocationCard key={loc._id} location={loc} />
          ))}
        </div>
      )}
    </section>
  )
}
