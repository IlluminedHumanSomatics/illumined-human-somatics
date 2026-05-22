import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
// about and contactInfo are singletons — each opens its one fixed document
// instead of a list, so duplicates can't be created from the desk.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('workshop').title('Workshops'),
      S.divider(),
      S.listItem()
        .title('About')
        .id('about')
        .child(S.document().schemaType('about').documentId('about')),
      S.listItem()
        .title('Contact Info')
        .id('contactInfo')
        .child(
          S.document().schemaType('contactInfo').documentId('contactInfo'),
        ),
    ])
