import type { Metadata } from 'next'
import { getContactInfo } from '@/lib/sanity'
import type { ContactInfo } from '@/lib/types'
import { MapPin } from '@/components/MapPin'

export const metadata: Metadata = {
  title: 'Yoga · Illumined Human Somatics',
  description:
    "Molly's group yoga classes at NOW Yoga and YogaSix Slabtown in Portland.",
}

export default async function YogaPage() {
  let contact: ContactInfo | null = null
  try {
    contact = await getContactInfo()
  } catch {
    contact = null
  }
  const yogaSixUrl =
    contact?.yogaSixUrl ?? 'https://www.yogasix.com/location/slabtown'
  const nowYogaUrl =
    contact?.nowYogaUrl ?? 'https://www.nowyogapdx.com/schedule'

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl text-deep sm:text-5xl">Yoga with Molly</h1>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-mid">
          Find Molly&rsquo;s group classes at two Portland studios below, and pick
          the one that fits. She also offers private 1:1 yoga sessions.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-3xl gap-6 sm:grid-cols-2">
        <div className="flex flex-col rounded-3xl border border-mid/15 bg-white/55 p-8">
          <h2 className="text-2xl text-deep">NOW Yoga</h2>
          <p className="mt-1.5 flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.14em] text-mid/70">
            <MapPin className="h-3.5 w-3.5 text-turq-deep" />
            Portland
          </p>
          <p className="mt-4 flex-1 leading-relaxed text-mid">
            Weekly group classes in a warm, welcoming community space.
          </p>
          <a
            href={nowYogaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 self-start rounded-full border border-turq-deep px-6 py-2.5 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-turq-deep transition-colors hover:bg-turq-deep hover:text-cream"
          >
            View schedule →
          </a>
        </div>

        <div className="flex flex-col rounded-3xl border border-mid/15 bg-white/55 p-8">
          <h2 className="text-2xl text-deep">YogaSix · Slabtown</h2>
          <p className="mt-1.5 flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.14em] text-mid/70">
            <MapPin className="h-3.5 w-3.5 text-turq-deep" />
            NW Portland
          </p>
          <p className="mt-4 flex-1 leading-relaxed text-mid">
            Heated and flowing group classes at the Slabtown studio.
          </p>
          <a
            href={yogaSixUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 self-start rounded-full border border-turq-deep px-6 py-2.5 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-turq-deep transition-colors hover:bg-turq-deep hover:text-cream"
          >
            View schedule →
          </a>
        </div>
      </div>
    </section>
  )
}
