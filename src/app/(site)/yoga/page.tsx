import type { Metadata } from 'next'
import { getPracticeLocations } from '@/lib/sanity'
import type { PracticeLocation } from '@/lib/types'
import { safe } from '@/lib/safe'
import { LocationCard } from '@/components/LocationCard'

export const metadata: Metadata = {
  title: 'Yoga · Illumined Human Somatics',
  description:
    "Molly's group yoga classes at NOW Yoga and YogaSix Slabtown in Portland.",
}

// Shown only if no yoga locations have been added in Studio yet.
const fallbackLocations: PracticeLocation[] = [
  {
    _id: 'fb-nowyoga',
    _type: 'practiceLocation',
    name: 'NOW Yoga',
    page: 'yoga',
    area: 'Portland',
    description: 'Weekly group classes in a warm, welcoming community space.',
    linkLabel: 'View schedule',
    linkUrl: 'https://www.nowyogapdx.com/schedule',
  },
  {
    _id: 'fb-yogasix',
    _type: 'practiceLocation',
    name: 'YogaSix · Slabtown',
    page: 'yoga',
    area: 'NW Portland',
    description: 'Heated and flowing group classes at the Slabtown studio.',
    linkLabel: 'View schedule',
    linkUrl: 'https://www.yogasix.com/location/slabtown',
  },
]

export default async function YogaPage() {
  const cmsLocations = await safe<PracticeLocation[]>(
    getPracticeLocations('yoga'),
    [],
  )
  const locations = cmsLocations.length > 0 ? cmsLocations : fallbackLocations

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
        {locations.map((loc) => (
          <LocationCard key={loc._id} location={loc} />
        ))}
      </div>
    </section>
  )
}
