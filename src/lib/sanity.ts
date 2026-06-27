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
  )
}

export async function getServices(): Promise<Service[]> {
  return client.fetch<Service[]>(
    `*[_type == "service"] | order(displayOrder asc)`,
  )
}

export async function getWorkshops(): Promise<Workshop[]> {
  return client.fetch<Workshop[]>(
    `*[_type == "workshop"] | order(date asc)`,
  )
}

export async function getFeaturedWorkshops(): Promise<Workshop[]> {
  return client.fetch<Workshop[]>(
    `*[_type == "workshop" && isFeatured == true] | order(date asc)`,
  )
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch<Testimonial[]>(
    `*[_type == "testimonial" && featured == true] | order(displayOrder asc, _createdAt desc)`,
  )
}

export async function getAbout(): Promise<About | null> {
  return client.fetch<About | null>(`*[_type == "about"][0]`)
}

export async function getContactInfo(): Promise<ContactInfo | null> {
  return client.fetch<ContactInfo | null>(`*[_type == "contactInfo"][0]`)
}
