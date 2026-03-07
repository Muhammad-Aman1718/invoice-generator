import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/', 
        '/dashboard/', // Dashboard ke andar ki har cheez block
        '/auth/',      // Auth ke andar login/sign-up sab block
      ],
    },
    sitemap: 'https://invoice-generator1718.vercel.app/sitemap.xml',
  }
}