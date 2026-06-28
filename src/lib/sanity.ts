import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import type {
  About,
  ContactInfo,
  HomePage,
  Service,
  Testimonial,
  Workshop,
} from './types'

export { client, urlFor }

export async function getHomePage(): Promise<HomePage | null> {
  return client.fetch<HomePage | null>(
    `*[_type == "homePage"][0]{
      _id, _type, eyebrow, heading, subheading, intro, ceilingImage,
      "videoUrl": backgroundVideo.asset->url,
      backgroundPoster, primaryCta, secondaryCta,
      spaceHeading, spaceBody,
      "spaceVideoUrl": spaceVideo.asset->url,
      spacePoster
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

export async function getContactInfo(): Promise<ContactInfo | null> {
  return client.fetch<ContactInfo | null>(
    `*[_type == "contactInfo"][0]`,
    {},
    { next: { tags: ['contactInfo'], revalidate: 3600 } },
  )
}
