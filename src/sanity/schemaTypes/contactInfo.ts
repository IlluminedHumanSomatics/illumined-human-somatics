import { defineType, defineField } from 'sanity'

// Singleton — only one Contact Info document should exist.
export const contactInfo = defineType({
  name: 'contactInfo',
  title: 'Contact Info',
  type: 'document',
  fields: [
    defineField({
      name: 'bookingUrl',
      title: 'MassageBook Booking URL',
      type: 'url',
      description:
        'Your MassageBook booking page URL (from Business → Setup → Widgets for Your Website). Powers the embedded scheduler on /book and every "Book" button.',
    }),
    defineField({
      name: 'mindbodyScheduleUrl',
      title: 'NOW Yoga — Mindbody Schedule URL',
      type: 'url',
      description:
        "Mindbody Branded Web Tools schedule widget (iframe URL), filtered to Molly's classes. Powers the embedded group-class schedule on /classes. Provided by NOW Yoga.",
    }),
    defineField({
      name: 'yogaSixUrl',
      title: 'YogaSix — Slabtown URL',
      type: 'url',
      description:
        "Link to Molly's YogaSix Slabtown location/schedule page. Powers the YogaSix card on /yoga. Defaults to the Slabtown location page if left blank.",
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'locationDescription',
      title: 'Location Description',
      type: 'text',
    }),
    defineField({
      name: 'instagramHandle',
      title: 'Instagram Handle',
      type: 'string',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    }),
  ],
})
