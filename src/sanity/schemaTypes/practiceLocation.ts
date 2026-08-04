import { defineType, defineField } from 'sanity'

// A place Molly practices — shown as a card on the Massage or Yoga page.
// Add, edit, reorder, or delete these freely (e.g. if she stops working
// somewhere, just delete its card here).
export const practiceLocation = defineType({
  name: 'practiceLocation',
  title: 'Practice Location',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'e.g. "Yomassage", "NOW Yoga".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      description:
        'Studio logo, shown at the top of the card. A transparent PNG looks best. Optional.',
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({
      name: 'page',
      title: 'Show on which page?',
      type: 'string',
      options: {
        list: [
          { title: 'Massage page', value: 'massage' },
          { title: 'Yoga page', value: 'yoga' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'area',
      title: 'Area / when',
      type: 'string',
      description: 'Shown under the name. e.g. "Portland", "NW Portland", "Portland · Wednesdays".',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'linkLabel',
      title: 'Button label',
      type: 'string',
      description: 'e.g. "Book here", "Inquire", "View schedule".',
    }),
    defineField({
      name: 'linkUrl',
      title: 'Button link',
      type: 'string',
      description:
        'A full web address (https://…) for an external site, or /contact to send people to the contact page.',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers show first.',
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrder',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', page: 'page', area: 'area' },
    prepare: ({ title, page, area }) => ({
      title,
      subtitle: `${page === 'yoga' ? 'Yoga' : 'Massage'}${area ? ` · ${area}` : ''}`,
    }),
  },
})
