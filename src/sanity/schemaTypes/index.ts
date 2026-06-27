import { type SchemaTypeDefinition } from 'sanity'

import { homePage } from './homePage'
import { service } from './service'
import { workshop } from './workshop'
import { testimonial } from './testimonial'
import { about } from './about'
import { contactInfo } from './contactInfo'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, service, workshop, testimonial, about, contactInfo],
}
