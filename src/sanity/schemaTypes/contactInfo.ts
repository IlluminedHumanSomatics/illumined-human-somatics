import { defineType, defineField } from 'sanity'

// Singleton — only one Contact Info document should exist.
export const contactInfo = defineType({
  name: 'contactInfo',
  title: 'Contact Info',
  type: 'document',
  fields: [
    defineField({
      name: 'bookingUrl',
      title: 'MassageBook Booking Link',
      type: 'url',
      description:
        "Molly's MassageBook booking page link (the one from her Instagram bio). Powers the “Book a session” button in the massage hero. Note: the embedded yurt scheduler is set up in the site code — you don’t add it here.",
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
  preview: {
    prepare: () => ({ title: 'Contact & Booking Links' }),
  },
})
