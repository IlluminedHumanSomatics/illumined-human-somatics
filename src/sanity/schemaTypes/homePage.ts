import { defineType, defineField } from 'sanity'

// Singleton — only one Home Page document should exist.
export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description:
        'Leave blank to use the default ("Massage, yoga & somatic bodywork").',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'values',
      title: 'Values tagline (below the hero)',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Short words shown below the hero, joined with a ✦ (e.g. alignment, alightment, aliveness). Leave blank to use the default three.',
      validation: (Rule) => Rule.max(5),
    }),
    defineField({
      name: 'intro',
      title: 'Intro (below hero)',
      type: 'text',
      rows: 4,
      description:
        'A short plain-language paragraph that orients first-time visitors.',
    }),
    defineField({
      name: 'ceilingImage',
      title: 'Yurt Ceiling Photo (the view looking up)',
      type: 'image',
      options: { hotspot: true },
      description:
        'A real photo of the top of the yurt, looking up — the inspiration for the sun animation. Shows as a full-width band on the homepage.',
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({
      name: 'reviewsHeading',
      title: 'Reviews — Heading',
      type: 'string',
      description:
        'Heading above the reviews. Leave blank to use the default ("What people are saying").',
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary Button',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'href', title: 'Link', type: 'string' }),
      ],
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary Button',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'href', title: 'Link', type: 'string' }),
      ],
    }),
    defineField({
      name: 'aboutTeaserHeading',
      title: 'About Teaser — Heading',
      type: 'string',
      description:
        'Heading for the "About Molly" preview near the bottom of the home page (next to her photo).',
    }),
    defineField({
      name: 'aboutTeaserText',
      title: 'About Teaser — Text',
      type: 'text',
      rows: 4,
      description:
        "Short blurb under that heading, above the “Read Molly’s story” link.",
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'Home Page' }),
  },
})
