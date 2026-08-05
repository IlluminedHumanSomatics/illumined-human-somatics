import { defineType, defineField } from 'sanity'

export const workshop = defineType({
  name: 'workshop',
  title: 'Retreat / Workshop',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Name of retreat',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Photos (up to 4)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
        },
      ],
      validation: (rule) => rule.max(4),
      description:
        'Add 1–4 photos. One photo shows large; 2–4 show as a grid on the page.',
    }),
    defineField({
      name: 'date',
      title: 'Start Date',
      type: 'date',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'For multi-day retreats. Leave blank for a single-day event.',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g. "From $2,888". Shown as entered.',
    }),
    defineField({
      name: 'externalBookingLink',
      title: 'Retreat info / registration link',
      type: 'url',
      description:
        "The card's button links here — the retreat's own info or sign-up page. Leave blank to show an “Inquire” button that points to the Contact page instead.",
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      description: 'Adds a small “Featured retreat” label above the name.',
      initialValue: false,
    }),
    defineField({
      name: 'isSoldOut',
      title: 'Sold Out',
      type: 'boolean',
      description: 'Replaces the button with a “Sold out” label.',
      initialValue: false,
    }),
  ],
})
