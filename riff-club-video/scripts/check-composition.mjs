import { readFileSync } from 'node:fs'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const index = read('index.html')
const readme = read('README.md')
const pkg = JSON.parse(read('package.json'))
const failures = []

const assert = (condition, message) => {
  if (!condition) failures.push(message)
}

assert(index.includes('data-composition-id="riff-club-promo"'), 'composition id must be riff-club-promo')
assert(index.includes('data-width="1080"'), 'composition width must be 1080 for 9:16')
assert(index.includes('data-height="1920"'), 'composition height must be 1920 for 9:16')
assert(index.includes('data-duration="20"'), 'composition duration must be 20 seconds')
assert(index.includes('window.__timelines["riff-club-promo"]'), 'GSAP timeline must be registered for riff-club-promo')
assert(index.includes('gsap.timeline({ paused: true'), 'GSAP timeline must be paused for HyperFrames seeking')
assert(index.includes('RIFF CLUB'), 'video must include RIFF CLUB title')
assert(index.includes('Clases de guitarra en La Reina'), 'video must include hero service headline')
assert(index.includes('Practica con foco'), 'video must include method/string impact caption')
assert(index.includes('Electrica') && index.includes('Acustica') && index.includes('Bajo'), 'video must include electric, acoustic, and bass service cards')
assert(index.includes('Agenda tu clase'), 'video must include final CTA')
assert(index.includes('#d8ff00') && index.includes('#ff3b30') && index.includes('#a855f7'), 'video must use Riff Club accent colors')
assert(index.includes('assets/music.mp3') || readme.includes('assets/music.mp3'), 'project must document optional music bed path')
assert(!index.includes('React'), 'composition must not use React')
assert(!index.includes('repeat: -1'), 'composition must not use infinite GSAP repeats')
assert(!index.includes('<iframe'), 'composition must not embed the live site in an iframe')
assert(pkg.scripts?.preview?.includes('hyperframes preview'), 'package.json must include pnpm preview script')
assert(pkg.scripts?.render?.includes('hyperframes render'), 'package.json must include pnpm render script')
assert(readme.includes('pnpm install'), 'README must include pnpm install instruction')
assert(readme.includes('pnpm preview'), 'README must include pnpm preview instruction')
assert(readme.includes('pnpm render'), 'README must include pnpm render instruction')

if (failures.length > 0) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'))
  process.exit(1)
}

console.log('Riff Club composition checks passed')
