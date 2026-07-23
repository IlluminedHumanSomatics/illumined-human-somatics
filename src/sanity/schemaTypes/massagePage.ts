import { defineType, defineField } from 'sanity'

// Singleton — settings for the Massage page (currently the hero video/poster).
export const massagePage = defineType({
  name: 'massagePage',
  title: 'Massage Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroVideo',
      title: 'Hero Video',
      type: 'file',
      options: { accept: 'video/*' },
      description:
        'Short looping yurt clip shown behind the massage page title (trimmed & compressed — ideally under ~10 MB). Plays muted and silent.',
    }),
    defineField({
      name: 'heroPoster',
      title: 'Hero Poster Image',
      type: 'image',
      options: { hotspot: true },
      description:
        'Still image shown on mobile, while the video loads, and for reduced motion.',
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Massage Page' }),
  },
})
