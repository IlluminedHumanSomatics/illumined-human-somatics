import { defineType, defineField } from 'sanity'

// Singleton — settings for the Yoga page (currently the hero background drawing).
export const yogaPage = defineType({
  name: 'yogaPage',
  title: 'Yoga Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeading',
      title: 'Heading',
      type: 'string',
      description:
        'Leave blank to use the default ("Yoga with Molly").',
    }),
    defineField({
      name: 'heroText',
      title: 'Text',
      type: 'text',
      rows: 3,
      description: 'The paragraph under the heading.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Drawing',
      type: 'image',
      options: { hotspot: true },
      description:
        'Line drawing shown to the right of the heading. Leave blank for no illustration.',
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Yoga Page' }),
  },
})
