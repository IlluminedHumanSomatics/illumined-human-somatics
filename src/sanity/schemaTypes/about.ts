import { defineType, defineField } from 'sanity'

// Singleton — only one About document should exist.
export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'featureImage',
      title: 'Story Feature Photo (wide / full-width)',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
      description:
        'A wide landscape photo shown FULL-WIDTH partway through the story — e.g. the handstand on the painted street sun.',
    }),
    defineField({
      name: 'storyImages',
      title: 'Story Photos (woven through the story)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
        },
      ],
      description:
        'A few portrait photos placed between paragraphs of the story (they alternate sides). 2–3 is ideal.',
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'yearsOfPractice',
      title: 'Years of Practice',
      type: 'number',
    }),
  ],
})
