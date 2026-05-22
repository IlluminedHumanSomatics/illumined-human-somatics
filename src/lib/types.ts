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
  startTime?: string
  endTime?: string
  location?: string
  shortDescription?: string
  fullDescription?: PortableTextBlock[]
  price?: string
  image?: SanityImage
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
  phone?: string
  email?: string
  locationDescription?: string
  instagramHandle?: string
  instagramUrl?: string
}
