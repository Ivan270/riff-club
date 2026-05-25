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
        '/contacto'
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
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [{ rel: 'icon', href: '/favicon.ico' }]
    }
  }
})
