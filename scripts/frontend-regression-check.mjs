import { readFileSync } from 'node:fs'

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
const header = read('components/SiteHeader.vue')
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
assert(header.includes('aria-current'), 'SiteHeader must expose active page with aria-current')
assert(header.includes('ThemeToggle'), 'SiteHeader must render ThemeToggle')
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
