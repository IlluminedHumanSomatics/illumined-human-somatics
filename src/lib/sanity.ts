import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import type { About, ContactInfo, Service, Workshop } from './types'

export { client, urlFor }

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

export async function getAbout(): Promise<About | null> {
  return client.fetch<About | null>(`*[_type == "about"][0]`)
}

export async function getContactInfo(): Promise<ContactInfo | null> {
  return client.fetch<ContactInfo | null>(`*[_type == "contactInfo"][0]`)
}
