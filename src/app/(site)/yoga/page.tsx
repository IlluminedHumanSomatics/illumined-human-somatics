import type { Metadata } from 'next'
import { getContactInfo } from '@/lib/sanity'
import type { ContactInfo } from '@/lib/types'

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
  const scheduleUrl = contact?.mindbodyScheduleUrl

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-turq-deep">
          Yoga
        </p>
        <h1 className="mt-5 text-4xl text-deep sm:text-5xl">Yoga with Molly</h1>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-mid">
          Find Molly&rsquo;s group classes at two Portland studios — pick the one
          that fits and book your spot.
        </p>
      </div>

      {scheduleUrl && (
        <div className="mx-auto mt-16 max-w-4xl">
          <h2 className="mb-6 text-center text-2xl text-deep">At NOW Yoga</h2>
          <iframe
            src={scheduleUrl}
            title="Molly's group class schedule at NOW Yoga"
            className="h-[1000px] w-full rounded-2xl border border-mid/10 bg-white"
            loading="lazy"
          />
        </div>
      )}

      <div className="mx-auto mt-16 grid max-w-3xl gap-6 sm:grid-cols-2">
        <div className="flex flex-col rounded-3xl border border-mid/15 bg-white/55 p-8">
          <h2 className="text-2xl text-deep">NOW Yoga</h2>
          <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.14em] text-mid/70">
            Portland
          </p>
          <p className="mt-4 flex-1 leading-relaxed text-mid">
            Weekly group classes in a warm, welcoming community space.
          </p>
          {scheduleUrl && (
            <span className="mt-6 self-start font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-turq-deep">
              Schedule above ↑
            </span>
          )}
        </div>

        <div className="flex flex-col rounded-3xl border border-mid/15 bg-white/55 p-8">
          <h2 className="text-2xl text-deep">YogaSix · Slabtown</h2>
          <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.14em] text-mid/70">
            NW Portland
          </p>
          <p className="mt-4 flex-1 leading-relaxed text-mid">
            Heated and flowing group classes at the Slabtown studio.
          </p>
          <a
            href="https://www.yogasix.com/location/slabtown"
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
