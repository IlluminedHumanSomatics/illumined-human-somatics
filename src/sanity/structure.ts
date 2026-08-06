import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
// homePage, about and contactInfo are singletons — each opens its one fixed
// document instead of a list, so duplicates can't be created from the desk.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // ── Pages ──────────────────────────────────────────────
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem()
        .title('Massage Page')
        .id('massagePage')
        .child(
          S.document().schemaType('massagePage').documentId('massagePage'),
        ),
      S.listItem()
        .title('Yoga Page')
        .id('yogaPage')
        .child(S.document().schemaType('yogaPage').documentId('yogaPage')),
      S.listItem()
        .title('About Page')
        .id('about')
        .child(S.document().schemaType('about').documentId('about')),
      S.listItem()
        .title('Contact')
        .id('contactInfo')
        .child(
          S.document().schemaType('contactInfo').documentId('contactInfo'),
        ),
      S.divider(),
      // ── Collections ────────────────────────────────────────
      S.documentTypeListItem('practiceLocation').title(
        'Massage & Yoga Locations',
      ),
      S.documentTypeListItem('workshop').title('Retreats & Workshops'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
    ])
