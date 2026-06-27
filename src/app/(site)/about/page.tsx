import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getAbout, urlFor } from '@/lib/sanity'
import type { About } from '@/lib/types'

export const metadata: Metadata = {
  title: 'About · Illumined Human Somatics',
  description:
    'Meet Molly Dilg — somatic massage, private yoga, and psychosomatic coaching in Portland, Oregon.',
}

async function safe<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise
  } catch {
    return fallback
  }
}

export default async function AboutPage() {
  const about = await safe<About | null>(getAbout(), null)

  return (
    <section className="px-6 py-20">
      <div className="mx-auto grid max-w-5xl items-center gap-16 md:grid-cols-2">
        {about?.photo ? (
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
            <Image
              src={urlFor(about.photo).width(800).height(1066).url()}
              alt={about.photo.alt ?? about.fullName}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="rounded-3xl object-cover"
            />
          </div>
        ) : (
          <div className="flex aspect-[3/4] items-center justify-center rounded-3xl border border-orange/15 bg-gradient-to-br from-orange/[0.06] to-turq/[0.05] font-sans text-[11px] uppercase tracking-[0.14em] text-mid/30">
            Molly&rsquo;s photo
          </div>
        )}
        <div>
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
            <span className="font-sans text-[10px] font-light uppercase tracking-[0.28em] text-orange">
              About {about?.fullName ?? 'Molly'}
            </span>
          </div>
          <h1 className="mt-4 text-4xl leading-[1.05] text-deep sm:text-5xl">
            A guide back to
            <br />
            your own <em className="italic text-orange">body</em>
          </h1>
          <p className="mt-6 max-w-md leading-loose text-mid">
            Illumined Human Somatics is built on a foundation of health in
            wholeness rather than reduction to parts. Inquiry and invitation are
            used to assess the nervous system, heart, mind, and body to create a
            comprehensive treatment plan aimed at adding harmony, resonance, and
            resplendence to the whole self.
          </p>
          <p className="mt-4 max-w-md leading-loose text-mid">
            In deep reverence for the body&rsquo;s inherent wisdom, Illumined
            Human Somatics views bodies as inclined towards healing and
            wholeness. We work together to restore flow to the energetic pathways
            of the body, repattern adaptive barriers to ease, and unwind any
            entanglements that trap body, mind, heart, or nervous system in
            rigidity or inhibited capacity.
          </p>
          <p className="mt-6 font-sans text-[11px] font-light uppercase tracking-[0.18em] text-turq-deep">
            Trained at East West · Portland, OR
          </p>
          <Link
            href="/massage"
            className="mt-8 inline-block rounded-full bg-orange px-7 py-3 font-sans text-[11px] font-light uppercase tracking-[0.22em] text-cream transition-colors hover:bg-deep"
          >
            Book a session
          </Link>
        </div>
      </div>
    </section>
  )
}
