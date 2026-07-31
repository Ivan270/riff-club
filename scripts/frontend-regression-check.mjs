import { existsSync, readFileSync } from 'node:fs'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
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
assert(header.includes('/logo-full-dark.svg'), 'SiteHeader must render the dark theme full logo')
assert(header.includes('/logo-full-light.svg'), 'SiteHeader must render the light theme full logo')
assert(header.includes('<img class="brand-logo" :src="logoSrc" alt="Riff Club" />'), 'SiteHeader must bind the full logo image to the theme-aware source')
assert(!header.match(/<NuxtLink[^>]*class="brand"[^>]*>\s*Riff Club\s*<\/NuxtLink>/), 'SiteHeader must not render the brand as plain text')
assert(nuxtConfig.includes("{ rel: 'icon', href: '/favicon.svg' }"), 'Nuxt must use the SVG favicon')
assert(nuxtConfig.includes("{ rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }"), 'Nuxt must define the Apple touch icon')
assert(nuxtConfig.includes("rel: 'preconnect', href: 'https://fonts.googleapis.com'"), 'Nuxt must preconnect to Google Fonts')
assert(nuxtConfig.includes("rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ''"), 'Nuxt must preconnect to the Google Fonts asset host')
assert(nuxtConfig.includes('Bricolage+Grotesque'), 'Nuxt must load Bricolage Grotesque')
assert(nuxtConfig.includes('DM+Sans'), 'Nuxt must load DM Sans')
assert(nuxtConfig.includes('display=swap'), 'Google Fonts must use display=swap')
assert(netlifyConfig.includes('command = "pnpm generate"'), 'Netlify must use the static Nuxt generation command')
assert(netlifyConfig.includes('publish = "dist"'), 'Netlify must publish the Nuxt netlify-static output directory')
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
for (const asset of ['public/logo-full-dark.svg', 'public/logo-full-light.svg', 'public/favicon.svg', 'public/apple-touch-icon.png']) {
  assert(existsSync(new URL(`../${asset}`, import.meta.url)), `${asset} must exist`)
}
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
