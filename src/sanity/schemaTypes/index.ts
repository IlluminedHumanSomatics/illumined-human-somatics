import { type SchemaTypeDefinition } from 'sanity'

import { service } from './service'
import { workshop } from './workshop'
import { about } from './about'
import { contactInfo } from './contactInfo'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [service, workshop, about, contactInfo],
}
