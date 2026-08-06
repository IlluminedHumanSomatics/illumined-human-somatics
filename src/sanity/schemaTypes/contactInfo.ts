import { defineType, defineField } from 'sanity'

// Singleton — only one Contact Info document should exist.
export const contactInfo = defineType({
  name: 'contactInfo',
  title: 'Contact Info',
  type: 'document',
  groups: [
    { name: 'text', title: 'Page text' },
    { name: 'details', title: 'Contact details' },
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'text',
      description: 'The big title on the Contact page. Leave blank for the default ("Let’s connect").',
    }),
    defineField({
      name: 'intro',
      title: 'Intro text',
      type: 'text',
      rows: 3,
      group: 'text',
      description:
        'The short paragraph under the heading. Leave blank for the default.',
    }),
    defineField({
      name: 'appointmentNote',
      title: 'Appointment note',
      type: 'text',
      rows: 2,
      group: 'text',
      description:
        'The small note under the contact details. Leave blank for the default ("Sessions are by appointment — the exact studio location is shared when you book.").',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'locationDescription',
      title: 'Location Description',
      type: 'text',
      group: 'details',
    }),
    defineField({
      name: 'instagramHandle',
      title: 'Instagram Handle',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      group: 'details',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Contact' }),
  },
})
