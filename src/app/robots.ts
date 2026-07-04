import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/dashboard/',
        '/auth/', 
      ],
    },
    sitemap: 'https://invoice-generator1718.vercel.app/sitemap.xml',
  }
}