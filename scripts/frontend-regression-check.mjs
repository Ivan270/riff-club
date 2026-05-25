import { readFileSync } from 'node:fs'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const failures = []

const assert = (condition, message) => {
  if (!condition) {
    failures.push(message)
  }
}

const hero = read('components/HeroZine.vue')
const header = read('components/SiteHeader.vue')
const css = read('assets/css/main.css')
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
assert(css.includes('background: var(--page-bg);'), 'html background must use page background variable')
assert(css.includes('color: var(--page-text);'), 'body text must use page text variable')
assert(css.includes('--bg-end: #fff0cf'), 'Light theme must use a visibly light final background stop')
assert(css.includes('overflow-x: clip'), 'Global CSS must clip horizontal overflow')
assert(!css.includes('color-scheme: dark light'), 'Global CSS must not advertise both schemes globally')

for (const [path, source] of servicePages) {
  assert(source.includes('<ServicePage'), `${path} must use shared ServicePage component`)
  assert(!source.includes('max-width: calc(100% - 12px)'), `${path} must not keep overflow compensation anti-pattern`)
  assert(!source.includes('.content-grid'), `${path} must not keep duplicated service layout CSS`)
}

if (failures.length > 0) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'))
  process.exit(1)
}

console.log('Frontend regression checks passed')
