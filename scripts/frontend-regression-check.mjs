import { existsSync, readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const readBuffer = (path) => readFileSync(new URL(`../${path}`, import.meta.url))
const sha256 = (path) => createHash('sha256').update(readBuffer(path)).digest('hex')
const readPngSize = (path) => {
  const image = readBuffer(path)
  return [image.readUInt32BE(16), image.readUInt32BE(20)]
}
const readOptional = (path) => {
  try {
    return read(path)
  } catch {
    return ''
  }
}
const failures = []

const assert = (condition, message) => {
  if (!condition) {
    failures.push(message)
  }
}

const hero = read('components/HeroZine.vue')
const home = read('pages/index.vue')
const footer = read('components/SiteFooter.vue')
const header = read('components/SiteHeader.vue')
const mobileMenu = readOptional('components/MobileMenu.vue')
const nuxtConfig = read('nuxt.config.ts')
const netlifyConfig = readOptional('netlify.toml')
const contact = read('pages/contacto.vue')
const thankYou = read('pages/gracias.vue')
const canonicalComposable = readOptional('composables/useCanonicalUrl.ts')
const robots = readOptional('public/robots.txt')
const sitemap = readOptional('public/sitemap.xml')
const css = read('assets/css/main.css')
const themedSurfaceFiles = [
  'components/ServicePage.vue',
  'components/SiteFooter.vue',
  'components/SiteHeader.vue',
  'pages/contacto.vue',
  'pages/index.vue'
].map((path) => [path, read(path)])
const servicePages = [
  'pages/clases-guitarra-electrica.vue',
  'pages/clases-guitarra-acustica.vue',
  'pages/clases-bajo.vue'
].map((path) => [path, read(path)])

assert(hero.includes('56995296324'), 'Hero WhatsApp CTA must use 56995296324')
assert(!hero.includes('56912345678'), 'Hero WhatsApp CTA must not use placeholder number')
assert(hero.includes('class="poster-brand"'), 'Hero poster must include the horizontal brand signature')
assert(hero.includes(':src="\'/logo-full-light.svg\'"'), 'Hero poster must bind the public Onyx horizontal logo without a Vite import')
assert(hero.includes('alt="" aria-hidden="true"'), 'Hero poster logo must be decorative')
assert(!hero.includes('<div class="poster-type">'), 'Hero poster must remove the duplicate Riff Club lettering')
assert(!hero.includes('<b>01</b>'), 'Hero poster must remove the legacy serial')
assert(hero.includes('.from(\n        ".poster-brand"'), 'Hero timeline must animate the horizontal brand signature')
assert(hero.includes('width: min(100%, 300px);'), 'Hero poster logo must stay responsive')
assert(hero.includes('min-width: min(180px, 100%);'), 'Hero poster logo must preserve its minimum width when space allows')
assert(footer.includes('Sitio desarrollado por'), 'SiteFooter must include a small developer credit')
assert(footer.includes('https://github.com/ivan270'), 'SiteFooter developer credit must link to GitHub')
assert(footer.includes('rel="noopener noreferrer nofollow"'), 'SiteFooter developer credit must use safe nofollow external link attributes')
assert(header.includes('aria-current'), 'SiteHeader must expose active page with aria-current')
assert(header.includes('ThemeToggle'), 'SiteHeader must render ThemeToggle')
assert(header.includes('<MobileMenu'), 'SiteHeader must render the responsive mobile menu')
assert(mobileMenu.includes('/isotype-dark.svg'), 'Mobile menu must use the dark theme isotype')
assert(mobileMenu.includes('/isotype-light.svg'), 'Mobile menu must use the light theme isotype')
assert(mobileMenu.includes('aria-expanded'), 'Mobile menu trigger must expose aria-expanded')
assert(mobileMenu.includes('aria-controls="mobile-menu"'), 'Mobile menu trigger must identify the controlled menu')
assert(mobileMenu.includes('keydown'), 'Mobile menu must handle keyboard dismissal and focus navigation')
assert(mobileMenu.includes("event.key === \"Escape\""), 'Mobile menu must close on Escape')
assert(mobileMenu.includes('body.style.overflow'), 'Mobile menu must lock body scrolling while open')
assert(mobileMenu.includes('@click.self="closeMenu"'), 'Mobile menu must close when its backdrop is clicked')
assert(mobileMenu.includes('@click="closeMenu"'), 'Mobile menu links must close the overlay')
assert(mobileMenu.includes('<Teleport to="body">'), 'Mobile menu overlay must escape the clipped header')
assert(mobileMenu.includes('resize'), 'Mobile menu must close when resizing back to desktop')
assert(mobileMenu.includes('@media (max-width: 900px)'), 'Mobile menu must target tablet and mobile widths')
assert(header.includes('/badge-navbar-dark.svg'), 'SiteHeader must render the dark theme badge')
assert(header.includes('/badge-navbar-light.svg'), 'SiteHeader must render the light theme badge')
assert(header.includes('theme.value === "light" ? "/badge-navbar-light.svg" : "/badge-navbar-dark.svg"'), 'SiteHeader must map light and dark themes to the correct badges')
assert(header.includes('class="brand-badge"'), 'SiteHeader must expose the navbar badge class')
assert(header.includes('<img class="brand-badge" :src="badgeSrc" alt="Riff Club" />'), 'SiteHeader badge must retain accessible brand text')
assert(header.includes('<NuxtLink class="brand" to="/" aria-label="Ir al inicio">'), 'SiteHeader badge must remain linked to the homepage')
assert(header.includes('width: clamp(68px, 5vw, 72px);'), 'SiteHeader badge must use the approved compact size')
assert(!header.includes('class="brand-logo"'), 'SiteHeader must not keep the horizontal navbar logo')
assert(!header.match(/<NuxtLink[^>]*class="brand"[^>]*>\s*Riff Club\s*<\/NuxtLink>/), 'SiteHeader must not render the brand as plain text')
assert(nuxtConfig.includes("{ rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }"), 'Nuxt must use the SVG favicon with its MIME type')
assert(nuxtConfig.includes("{ rel: 'icon', href: '/favicon.ico', sizes: 'any' }"), 'Nuxt must define the ICO favicon fallback')
assert(nuxtConfig.includes("{ rel: 'icon', href: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }"), 'Nuxt must define the 32px PNG favicon')
assert(nuxtConfig.includes("{ rel: 'icon', href: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }"), 'Nuxt must define the 16px PNG favicon')
assert(nuxtConfig.includes("{ rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }"), 'Nuxt must define the Apple touch icon')
assert(nuxtConfig.includes("{ rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#101010' }"), 'Nuxt must define the Safari pinned tab icon')
assert(nuxtConfig.includes("{ rel: 'manifest', href: '/site.webmanifest' }"), 'Nuxt must define the web manifest')
assert(nuxtConfig.includes("{ property: 'og:image', content: 'https://riffclub.cl/og-image.png' }"), 'Nuxt must define an absolute Open Graph image URL')
assert(nuxtConfig.includes("{ name: 'theme-color', content: '#101010' }"), 'Nuxt must retain the theme color')
assert(nuxtConfig.includes("{ property: 'og:type', content: 'website' }"), 'Nuxt must retain the Open Graph type')
assert(nuxtConfig.includes("{ property: 'og:locale', content: 'es_CL' }"), 'Nuxt must retain the Open Graph locale')
assert(nuxtConfig.includes("{ name: 'twitter:card', content: 'summary_large_image' }"), 'Nuxt must retain the Twitter card type')
assert(nuxtConfig.includes("rel: 'preconnect', href: 'https://fonts.googleapis.com'"), 'Nuxt must preconnect to Google Fonts')
assert(nuxtConfig.includes("rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ''"), 'Nuxt must preconnect to the Google Fonts asset host')
assert(nuxtConfig.includes('Bricolage+Grotesque'), 'Nuxt must load Bricolage Grotesque')
assert(nuxtConfig.includes('DM+Sans'), 'Nuxt must load DM Sans')
assert(nuxtConfig.includes('display=swap'), 'Google Fonts must use display=swap')
assert(netlifyConfig.includes('command = "pnpm generate"'), 'Netlify must use the static Nuxt generation command')
assert(netlifyConfig.includes('publish = "dist"'), 'Netlify must publish the directory produced by its Nuxt build environment')
assert(contact.includes('data-netlify="true"'), 'Contact form must be enabled for Netlify Forms')
assert(contact.includes('netlify-honeypot="bot-field"'), 'Contact form must configure a Netlify honeypot')
assert(contact.includes('name="contacto"'), 'Contact form must keep its Netlify form name')
assert(contact.includes('name="form-name" value="contacto"'), 'Contact form must identify its Netlify form name')
assert(contact.includes('name="bot-field"'), 'Contact form must include the Netlify honeypot field')
assert(contact.includes('action="/gracias"'), 'Contact form must use the dedicated success route')
assert(!contact.includes('formspree.io'), 'Contact form must not depend on Formspree')
assert(thankYou.includes('id="thank-you-title"'), 'Contact success route must include a labeled confirmation heading')
assert(canonicalComposable.includes('https://riffclub.cl'), 'Canonical URLs must use the primary production domain')
assert(canonicalComposable.includes('rel: "canonical"'), 'Canonical composable must emit canonical links')
assert(robots.includes('Sitemap: https://riffclub.cl/sitemap.xml'), 'robots.txt must reference the primary production sitemap')
for (const path of ['/', '/clases-guitarra-electrica', '/clases-guitarra-acustica', '/clases-bajo', '/sobre-mi', '/contacto']) {
  const sitemapPath = path === '/' ? '/' : `${path}/`
  assert(sitemap.includes(`<loc>https://riffclub.cl${sitemapPath}</loc>`), `Sitemap must include ${sitemapPath}`)
}
for (const page of [
  'pages/index.vue',
  'pages/clases-guitarra-electrica.vue',
  'pages/clases-guitarra-acustica.vue',
  'pages/clases-bajo.vue',
  'pages/sobre-mi.vue',
  'pages/contacto.vue'
]) {
  assert(read(page).includes('useCanonicalUrl()'), `${page} must use the canonical URL composable`)
}
for (const asset of [
  'public/logo-full-dark.svg',
  'public/logo-full-light.svg',
  'public/badge-navbar-dark.svg',
  'public/badge-navbar-light.svg',
  'public/isotype-dark.svg',
  'public/isotype-light.svg',
  'public/favicon.svg',
  'public/favicon.ico',
  'public/favicon-16x16.png',
  'public/favicon-32x32.png',
  'public/apple-touch-icon.png',
  'public/site.webmanifest',
  'public/og-image.png',
  'public/safari-pinned-tab.svg',
  'public/pwa-192x192.png',
  'public/pwa-512x512.png',
  'public/maskable-192x192.png',
  'public/maskable-512x512.png'
]) {
  assert(existsSync(new URL(`../${asset}`, import.meta.url)), `${asset} must exist`)
}
for (const asset of ['public/logo-full-dark.svg', 'public/logo-full-light.svg', 'public/badge-navbar-dark.svg', 'public/badge-navbar-light.svg', 'public/isotype-dark.svg', 'public/isotype-light.svg', 'public/favicon.svg', 'public/safari-pinned-tab.svg']) {
  assert(readOptional(asset).includes('<svg'), `${asset} must contain valid SVG markup`)
}
for (const [asset, expectedSize] of [
  ['public/favicon-16x16.png', [16, 16]],
  ['public/favicon-32x32.png', [32, 32]],
  ['public/apple-touch-icon.png', [180, 180]],
  ['public/pwa-192x192.png', [192, 192]],
  ['public/pwa-512x512.png', [512, 512]],
  ['public/maskable-192x192.png', [192, 192]],
  ['public/maskable-512x512.png', [512, 512]],
  ['public/og-image.png', [1200, 630]]
]) {
  assert(readPngSize(asset).every((size, index) => size === expectedSize[index]), `${asset} must use the expected dimensions`)
}
const faviconIco = readBuffer('public/favicon.ico')
assert(faviconIco.subarray(0, 4).equals(Buffer.from([0, 0, 1, 0])), 'favicon.ico must contain an ICO image')
const webManifest = JSON.parse(read('public/site.webmanifest'))
for (const icon of webManifest.icons ?? []) {
  assert(existsSync(new URL(`../public${icon.src}`, import.meta.url)), `Web manifest icon ${icon.src} must exist`)
}
assert(!existsSync(new URL('../public/logo-full.svg', import.meta.url)), 'Legacy logo-full.svg must be removed')
assert(!existsSync(new URL('../public/isotype.svg', import.meta.url)), 'Legacy isotype.svg must be removed')
assert(sha256('public/badge-navbar-dark.svg') === 'c5abed44cbaa423e857fa95574785747b4353a617a55bf9f01511f81e8c4fb20', 'Dark navbar badge must match the approved negative master')
assert(sha256('public/badge-navbar-light.svg') === '3102d0f262c9204a7634b9a833cbb9d37ef441b33c6d8a3684d72492dd62bd7e', 'Light navbar badge must match the approved positive master')
assert(css.includes('[data-theme="light"]'), 'Global CSS must define light theme variables')
assert(css.includes('--page-bg'), 'Global CSS must separate page background from ink text color')
assert(css.includes('--page-text'), 'Global CSS must separate page text from paper surface color')
assert(css.includes('--muted-on-dark'), 'Global CSS must define a muted text color for dark panels in light mode')
assert(css.includes('--section-bg'), 'Global CSS must define theme-aware section background color')
assert(css.includes('--section-text'), 'Global CSS must define theme-aware section text color')
assert(css.includes('--section-muted'), 'Global CSS must define theme-aware section muted text color')
assert(css.includes('--section-bg-end'), 'Global CSS must define theme-aware section gradient end color')
assert(css.includes('--section-overlay'), 'Global CSS must define theme-aware section overlay color')
assert(css.includes('--header-bg'), 'Global CSS must define theme-aware header background color')
assert(css.includes('--font-display: "Bricolage Grotesque"'), 'Display font token must use Bricolage Grotesque')
assert(css.includes('--font-body: "DM Sans"'), 'Body font token must use DM Sans')
assert(css.includes('--weight-heavy: 800'), 'Typography tokens must define the heavy display weight')
assert(css.includes('--type-hero: clamp(3.5rem, 7vw, 7.5rem)'), 'Typography tokens must define the responsive hero scale')
assert(css.includes('--type-body: clamp(1rem, 1.1vw, 1.125rem)'), 'Typography tokens must define the readable body scale')
assert(css.includes('--type-ui: clamp(1rem, 1vw, 1rem)'), 'Interactive UI typography must not fall below 16px')
assert(css.includes('--purple-link-text: var(--paper)'), 'Light theme must define a readable purple link foreground')
assert(css.includes('font-size: var(--type-body);'), 'Body must use the shared body type token')
assert(css.includes('font-weight: var(--weight-heavy);'), 'Global headings must use the shared heavy weight token')
assert(css.includes('--font-heading'), 'Global CSS must define an editorial heading font variable')
assert(css.includes('background: var(--page-bg);'), 'html background must use page background variable')
assert(css.includes('color: var(--page-text);'), 'body text must use page text variable')
assert(css.includes('--bg-end: #fff0cf'), 'Light theme must use a visibly light final background stop')
assert(css.includes('overflow-x: clip'), 'Global CSS must clip horizontal overflow')
assert(!css.includes('color-scheme: dark light'), 'Global CSS must not advertise both schemes globally')

const pkg = JSON.parse(read('package.json'))
const motion = readOptional('composables/useGsapMotion.ts')
const animatedFiles = [
  'components/HeroZine.vue',
  'components/ServicePage.vue',
  'components/ContactCta.vue',
  'components/SiteFooter.vue'
].map((path) => [path, read(path)])

assert(pkg.dependencies?.gsap, 'GSAP must be installed as a runtime dependency')
assert(motion.includes("import('gsap')"), 'GSAP must be dynamically imported inside the motion composable')
assert(motion.includes("import('gsap/ScrollTrigger')"), 'ScrollTrigger must be dynamically imported inside the motion composable')
assert(motion.includes('prefers-reduced-motion: reduce'), 'Motion composable must respect reduced motion')
assert(motion.includes('gsap.context'), 'Motion composable must use gsap.context for cleanup')
assert(!motion.includes('scrollerProxy'), 'Motion composable must not use scroll-jacking APIs')
assert(home.includes('class="pain-flyer"'), 'Homepage pain section must use the pinned flyer scene class')
assert(home.includes('pin: true'), 'Homepage pain flyer animation must pin the section')
assert(home.includes("trigger: flyer"), 'Homepage pain flyer animation must be triggered by the flyer section')
assert(home.includes('class="section container services-stage"'), 'Homepage services section must keep the services stage layout class')
assert(!home.includes('const services = homeRef.value?.querySelector(".services-stage")'), 'Homepage must not create a services-stage ScrollTrigger animation')
assert(!home.includes("trigger: services"), 'Homepage services section must not trigger a scroll animation')
assert(!home.includes('pin: services'), 'Homepage services section must not be pinned')
assert(!home.includes('id="servicios-eyebrow-clone"'), 'Homepage services section must not render an eyebrow animation clone')
assert(!home.includes('servicios-eyebrow-clone'), 'Homepage services eyebrow clone animation must be removed')
assert(!home.includes('to("#servicios-title", {\n          x: "50vw"'), 'Homepage services title must not be the typographic takeover target')
assert(!home.includes('x: "50vw"'), 'Homepage services eyebrow must not use relative 50vw movement for centering')
assert(!home.includes('y: "50vh"'), 'Homepage services eyebrow must not use relative 50vh movement for centering')
assert(home.includes('#servicios-eyebrow') && home.includes('width: max-content'), 'Homepage services eyebrow box must shrink to the text before centering')
assert(!home.includes('scale: 6.8'), 'Homepage services eyebrow must not use extreme transform scale that pixelates text')
assert(!home.includes('fontSize: "clamp(5rem, 18vw, 18rem)"'), 'Homepage services eyebrow font-size animation must be removed')
assert(home.includes('ScrollTrigger.refresh()'), 'Homepage scroll animation must refresh ScrollTrigger after setup')
assert(home.includes('font-family: var(--font-heading)'), 'Homepage h2 hierarchy must use the editorial heading font')
assert(read('components/ServicePage.vue').includes('font-family: var(--font-heading)'), 'Service page h2 hierarchy must use the editorial heading font')
assert(read('pages/contacto.vue').includes('font-family: var(--font-heading)'), 'Contact page h2 hierarchy must use the editorial heading font')
assert(read('pages/sobre-mi.vue').includes('font-family: var(--font-display)'), 'About page h2 hierarchy must use the expressive display font')

for (const [path, source] of animatedFiles) {
  assert(source.includes('useGsapMotion'), `${path} must use the shared GSAP motion composable`)
  assert(source.includes('onMounted'), `${path} must initialize animation from a client lifecycle hook`)
  assert(!source.includes('repeat: -1'), `${path} must not include infinite GSAP loops`)
}

for (const [path, source] of servicePages) {
  assert(source.includes('<ServicePage'), `${path} must use shared ServicePage component`)
  assert(!source.includes('max-width: calc(100% - 12px)'), `${path} must not keep overflow compensation anti-pattern`)
  assert(!source.includes('.content-grid'), `${path} must not keep duplicated service layout CSS`)
}

for (const [path, source] of themedSurfaceFiles) {
  assert(!source.includes('background: #050505'), `${path} must not hard-code dark section backgrounds`)
  assert(!source.includes('background: #111'), `${path} must not hard-code dark FAQ backgrounds`)
  assert(!source.includes('background: #151515'), `${path} must not hard-code dark panel backgrounds`)
  assert(!source.includes('rgba(5, 5, 5'), `${path} must not hard-code dark overlay backgrounds`)
  assert(!source.includes('rgba(16, 16, 16, .94)'), `${path} must not hard-code dark header backgrounds`)
  assert(!source.includes('linear-gradient(180deg, #101010 0%, #050505 100%)'), `${path} must not hard-code dark footer gradients`)
  assert(!source.includes('linear-gradient(180deg, #181818, #0b0b0b)'), `${path} must not hard-code dark panel gradients`)
  assert(!source.includes('linear-gradient(135deg, #050505'), `${path} must not hard-code dark setlist gradients`)
}

if (failures.length > 0) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'))
  process.exit(1)
}

console.log('Frontend regression checks passed')
