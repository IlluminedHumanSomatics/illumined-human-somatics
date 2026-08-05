import { defineType, defineField } from 'sanity'

// Singleton — settings for the Massage page (currently the hero video/poster).
export const massagePage = defineType({
  name: 'massagePage',
  title: 'Massage Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'booking', title: 'Yurt Booking Section' },
    { name: 'other', title: 'Other Locations Section' },
  ],
  fields: [
    defineField({
      name: 'heroHeading',
      title: 'Hero — Heading',
      type: 'string',
      group: 'hero',
      description: 'Big title over the video. e.g. "Somatic massage & bodywork".',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero — Subheading',
      type: 'text',
      rows: 3,
      group: 'hero',
      description: 'The sentence under the title.',
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Video',
      type: 'file',
      options: { accept: 'video/*' },
      group: 'hero',
      description:
        'Short looping yurt clip shown behind the massage page title (trimmed & compressed — ideally under ~10 MB). Plays muted and silent.',
    }),
    defineField({
      name: 'heroPoster',
      title: 'Hero Poster Image',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
      description:
        'Still image shown on mobile, while the video loads, and for reduced motion.',
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({
      name: 'bookingEyebrow',
      title: 'Small label (above heading)',
      type: 'string',
      group: 'booking',
      description: 'The little label above the heading. e.g. "The Yurt · Portland".',
    }),
    defineField({
      name: 'bookingHeading',
      title: 'Heading',
      type: 'string',
      group: 'booking',
      description: 'e.g. "Book your session in the yurt".',
    }),
    defineField({
      name: 'bookingText',
      title: 'Text',
      type: 'text',
      rows: 3,
      group: 'booking',
      description: 'The paragraph above the booking scheduler.',
    }),
    defineField({
      name: 'bookingEmbedUrl',
      title: 'Embedded scheduler URL',
      type: 'url',
      group: 'booking',
      description:
        'The MassageBook booking widget shown in the box on the page. Paste the "widget/services" embed URL from MassageBook. Leave blank to use the current default.',
    }),
    defineField({
      name: 'otherHeading',
      title: 'Heading',
      type: 'string',
      group: 'other',
      description: 'e.g. "Also find Molly at".',
    }),
    defineField({
      name: 'otherText',
      title: 'Text',
      type: 'text',
      rows: 2,
      group: 'other',
      description: 'The line under that heading, above the other-location cards.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Massage Page' }),
  },
})
