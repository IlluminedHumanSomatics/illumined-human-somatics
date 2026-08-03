import { defineType, defineField } from 'sanity'

// Singleton — settings for the Yoga page (currently the hero background drawing).
export const yogaPage = defineType({
  name: 'yogaPage',
  title: 'Yoga Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Background Drawing',
      type: 'image',
      options: { hotspot: true },
      description:
        'A line drawing shown softly faded behind the "Yoga with Molly" heading. Leave blank for no illustration. A tall/portrait drawing on a plain white background works best.',
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Yoga Page' }),
  },
})
