import type { MetadataRoute } from 'next'

const base = 'https://illuminedhumansomatics.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/about', '/massage', '/yoga', '/workshops', '/contact']
  const lastModified = new Date()

  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.8,
  }))
}
