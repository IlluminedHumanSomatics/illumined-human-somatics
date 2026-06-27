import { defineType, defineField } from 'sanity'

// Singleton — only one Home Page document should exist.
export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description:
        'Small label above the headline, e.g. "Bodywork · Movement · Gathering".',
    }),
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
      name: 'backgroundVideo',
      title: 'Background Video',
      type: 'file',
      options: { accept: 'video/*' },
      description:
        'Short looping clip (the yurt). Plays muted and silent — keep it short and compressed (ideally under ~10 MB) for fast loading.',
    }),
    defineField({
      name: 'backgroundPoster',
      title: 'Background Poster Image',
      type: 'image',
      options: { hotspot: true },
      description:
        'Still image shown on mobile, while the video loads, and for visitors who prefer reduced motion.',
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
      ],
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
      name: 'spaceHeading',
      title: 'The Space — Heading',
      type: 'string',
      description: 'Heading for the "The Space" (yurt) section.',
    }),
    defineField({
      name: 'spaceBody',
      title: 'The Space — Text',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'spaceVideo',
      title: 'The Space — Video',
      type: 'file',
      options: { accept: 'video/*' },
      description:
        'Short looping yurt clip (trimmed & compressed — ideally under ~10 MB). Plays muted and silent.',
    }),
    defineField({
      name: 'spacePoster',
      title: 'The Space — Poster Image',
      type: 'image',
      options: { hotspot: true },
      description:
        'Still shown on mobile, while the video loads, and for reduced motion.',
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'Home Page' }),
  },
})
