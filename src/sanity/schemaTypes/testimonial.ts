import { defineType, defineField } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1–5)',
      type: 'number',
      initialValue: 5,
      validation: (rule) => rule.min(1).max(5),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      initialValue: 'MassageBook Verified',
      description: 'e.g. "MassageBook Verified".',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
      description: 'e.g. "May 2026".',
    }),
    defineField({
      name: 'featured',
      title: 'Show on homepage',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'quote' },
  },
})
