// Loosely-typed Portable Text block for rich-text fields.
export interface PortableTextBlock {
  _type: string
  _key: string
  [key: string]: unknown
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface ServiceDuration {
  duration?: string
  price?: string
}

export interface CtaLink {
  label?: string
  href?: string
}

export interface HomePage {
  _id: string
  _type: 'homePage'
  eyebrow?: string
  heading?: string
  subheading?: string
  intro?: string
  ceilingImage?: SanityImage
  videoUrl?: string
  backgroundPoster?: SanityImage
  primaryCta?: CtaLink
  secondaryCta?: CtaLink
  spaceHeading?: string
  spaceBody?: string
  spaceVideoUrl?: string
  spacePoster?: SanityImage
}

export interface Testimonial {
  _id: string
  _type: 'testimonial'
  name: string
  quote: string
  rating?: number
  source?: string
  date?: string
  featured?: boolean
  displayOrder?: number
}

export interface Service {
  _id: string
  _type: 'service'
  title: string
  category: 'bodywork' | 'movement' | 'gathering'
  description?: string
  durations?: ServiceDuration[]
  location?: string
  displayOrder?: number
}

export interface Workshop {
  _id: string
  _type: 'workshop'
  title: string
  slug: { current: string }
  date?: string
  endDate?: string
  startTime?: string
  endTime?: string
  location?: string
  shortDescription?: string
  fullDescription?: PortableTextBlock[]
  price?: string
  image?: SanityImage
  gallery?: SanityImage[]
  externalBookingLink?: string
  isSoldOut?: boolean
  isFeatured?: boolean
}

export interface About {
  _id: string
  _type: 'about'
  fullName: string
  bio?: PortableTextBlock[]
  photo?: SanityImage
  certifications?: string[]
  yearsOfPractice?: number
}

export interface ContactInfo {
  _id: string
  _type: 'contactInfo'
  bookingUrl?: string
  mindbodyScheduleUrl?: string
  yogaSixUrl?: string
  phone?: string
  email?: string
  locationDescription?: string
  instagramHandle?: string
  instagramUrl?: string
}
