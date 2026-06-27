import { defineType, defineField, defineArrayMember } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Offering',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Bodywork', value: 'bodywork' },
          { title: 'Movement', value: 'movement' },
          { title: 'Gathering', value: 'gathering' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'durations',
      title: 'Durations',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'durationOption',
          fields: [
            defineField({ name: 'duration', title: 'Duration', type: 'string' }),
            defineField({ name: 'price', title: 'Price', type: 'string' }),
          ],
          preview: {
            select: { title: 'duration', subtitle: 'price' },
          },
        }),
      ],
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
    }),
  ],
})
