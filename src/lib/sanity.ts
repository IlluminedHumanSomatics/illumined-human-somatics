import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import type {
  About,
  ContactInfo,
  HomePage,
  MassagePage,
  PracticeLocation,
  Service,
  Testimonial,
  Workshop,
  YogaPage,
} from './types'

export { client, urlFor }

export async function getHomePage(): Promise<HomePage | null> {
  return client.fetch<HomePage | null>(
    `*[_type == "homePage"][0]{
      _id, _type, heading, subheading, values, intro, ceilingImage,
      ceilingCaption, reviewsHeading, reviewsSubtext, primaryCta, secondaryCta,
      aboutTeaserHeading, aboutTeaserText
    }`,
    {},
    { next: { tags: ['homePage'], revalidate: 3600 } },
  )
}

export async function getServices(): Promise<Service[]> {
  return client.fetch<Service[]>(
    `*[_type == "service"] | order(displayOrder asc)`,
    {},
    { next: { tags: ['service'], revalidate: 3600 } },
  )
}

export async function getWorkshops(): Promise<Workshop[]> {
  return client.fetch<Workshop[]>(
    `*[_type == "workshop"] | order(date asc)`,
    {},
    { next: { tags: ['workshop'], revalidate: 3600 } },
  )
}

export async function getFeaturedWorkshops(): Promise<Workshop[]> {
  return client.fetch<Workshop[]>(
    `*[_type == "workshop" && isFeatured == true] | order(date asc)`,
    {},
    { next: { tags: ['workshop'], revalidate: 3600 } },
  )
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch<Testimonial[]>(
    `*[_type == "testimonial" && featured == true] | order(displayOrder asc, _createdAt desc)`,
    {},
    { next: { tags: ['testimonial'], revalidate: 3600 } },
  )
}

export async function getAbout(): Promise<About | null> {
  return client.fetch<About | null>(
    `*[_type == "about"][0]`,
    {},
    { next: { tags: ['about'], revalidate: 3600 } },
  )
}

export async function getMassagePage(): Promise<MassagePage | null> {
  return client.fetch<MassagePage | null>(
    `*[_type == "massagePage"][0]{
      _id, _type,
      heroHeading, heroSubheading,
      "heroVideoUrl": heroVideo.asset->url,
      heroPoster,
      bookingEyebrow, bookingHeading, bookingText,
      otherHeading, otherText
    }`,
    {},
    { next: { tags: ['massagePage'], revalidate: 3600 } },
  )
}

export async function getYogaPage(): Promise<YogaPage | null> {
  return client.fetch<YogaPage | null>(
    `*[_type == "yogaPage"][0]{ _id, _type, heroHeading, heroText, heroImage }`,
    {},
    { next: { tags: ['yogaPage'], revalidate: 3600 } },
  )
}

export async function getPracticeLocations(
  page: 'massage' | 'yoga',
): Promise<PracticeLocation[]> {
  return client.fetch<PracticeLocation[]>(
    `*[_type == "practiceLocation" && page == $page] | order(displayOrder asc, name asc)`,
    { page },
    { next: { tags: ['practiceLocation'], revalidate: 3600 } },
  )
}

export async function getContactInfo(): Promise<ContactInfo | null> {
  return client.fetch<ContactInfo | null>(
    `*[_type == "contactInfo"][0]`,
    {},
    { next: { tags: ['contactInfo'], revalidate: 3600 } },
  )
}
