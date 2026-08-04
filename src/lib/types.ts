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
  heading?: string
  subheading?: string
  values?: string[]
  intro?: string
  ceilingImage?: SanityImage
  reviewsHeading?: string
  primaryCta?: CtaLink
  secondaryCta?: CtaLink
  aboutTeaserHeading?: string
  aboutTeaserText?: string
}

export interface MassagePage {
  _id: string
  _type: 'massagePage'
  heroHeading?: string
  heroSubheading?: string
  heroVideoUrl?: string
  heroPoster?: SanityImage
  bookingEyebrow?: string
  bookingHeading?: string
  bookingText?: string
  otherHeading?: string
  otherText?: string
}

export interface YogaPage {
  _id: string
  _type: 'yogaPage'
  heroHeading?: string
  heroText?: string
  heroImage?: SanityImage
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
  heroHeading?: string
  heroHighlight?: string
  credential?: string
  bio?: PortableTextBlock[]
  pullQuote?: string
  photo?: SanityImage
  featureImage?: SanityImage
  storyImages?: SanityImage[]
  certifications?: string[]
  yearsOfPractice?: number
}

export interface PracticeLocation {
  _id: string
  _type: 'practiceLocation'
  name: string
  logo?: SanityImage
  page: 'massage' | 'yoga'
  area?: string
  description?: string
  linkLabel?: string
  linkUrl?: string
  displayOrder?: number
}

export interface ContactInfo {
  _id: string
  _type: 'contactInfo'
  bookingUrl?: string
  phone?: string
  email?: string
  locationDescription?: string
  instagramHandle?: string
  instagramUrl?: string
}
