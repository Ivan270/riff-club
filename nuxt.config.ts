export default defineNuxtConfig({
  compatibilityDate: '2026-05-18',
  ssr: true,
  css: ['~/assets/css/main.css'],
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/clases-guitarra-electrica',
        '/clases-guitarra-acustica',
        '/clases-bajo',
        '/sobre-mi',
        '/contacto',
        '/gracias'
      ]
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'es-CL' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      titleTemplate: '%s',
      meta: [
        { name: 'theme-color', content: '#101010' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'es_CL' },
        { property: 'og:image', content: 'https://riffclub.cl/og-image.png' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400;12..96,75..100,600;12..96,75..100,700;12..96,75..100,800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap'
        },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', href: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { rel: 'icon', href: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#101010' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  }
})
