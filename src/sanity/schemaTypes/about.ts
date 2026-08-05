import { defineType, defineField } from 'sanity'

// Singleton — only one About document should exist.
export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'photo',
      title: 'Main Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'The main photo at the top of the About page.',
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      description: 'Shown in the small "About …" label at the top.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'text',
      rows: 2,
      description:
        'The large tagline at the top. Leave blank for the default ("I add light through grounded gratitude and empathic inquiry.").',
    }),
    defineField({
      name: 'heroHighlight',
      title: 'Hero Heading — highlighted word',
      type: 'string',
      description:
        'One word from the heading to italicize in orange (e.g. "light"). Leave blank for none.',
    }),
    defineField({
      name: 'credential',
      title: 'Credential line',
      type: 'string',
      description:
        'The small line under the heading. Leave blank for the default ("Trained at East West · Portland, OR").',
    }),
    defineField({
      name: 'bio',
      title: 'Story',
      type: 'array',
      of: [{ type: 'block' }],
      description:
        "Molly's story, shown on the About page. Each paragraph is one block — the story photos are woven between them automatically, alternating sides.",
    }),
    defineField({
      name: 'storyImages',
      title: 'Story Photos (woven through the story)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt text', type: 'string' },
            {
              name: 'size',
              title: 'Size',
              type: 'string',
              options: {
                list: [
                  { title: 'Small', value: 'sm' },
                  { title: 'Medium (default)', value: 'md' },
                  { title: 'Large', value: 'lg' },
                ],
                layout: 'radio',
              },
              initialValue: 'md',
            },
          ],
        },
      ],
      description:
        'Portrait photos woven between the story paragraphs (they alternate sides). Set each one’s Size to make it a bit wider or narrower.',
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
      name: 'pullQuote',
      title: 'Pull Quote',
      type: 'text',
      rows: 2,
      description:
        'A short highlighted quote shown partway through the story. Leave blank to hide it. (Quotation marks are added automatically.)',
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
