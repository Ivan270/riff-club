# Zine Gig-Flyer Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the Nuxt 3 SSG music teacher site into a cohesive Zine Gig-Flyer visual system across shared components and all pages.

**Architecture:** Keep the existing Nuxt page/component structure and SEO/schema behavior. Implement the redesign as CSS/SFC updates: global design primitives first, shared components second, page layouts third, then verify static generation and key regressions.

**Tech Stack:** Nuxt 3.17.0, Vue 3 Composition API with `<script setup>`, SSG via `npm run generate`, scoped SFC CSS, global CSS utilities.

---

## File Structure

- Modify: `assets/css/main.css` for global design tokens, typography, zine utilities, focus states, body atmosphere, reduced-motion support.
- Modify: `components/SiteHeader.vue` for active route states, flyer-strip treatment, and no-scrollbar nav.
- Modify: `components/HeroZine.vue` for the layered poster composition.
- Modify: `components/ServiceCard.vue` for `variant` prop and instrument-specific decorative visuals.
- Modify: `components/ContactCta.vue` for tear-off booking flyer CTA.
- Modify: `components/SiteFooter.vue` for poster-stack footer treatment.
- Modify: `pages/index.vue` for staggered pasted notes, service card variants, and setlist method panel.
- Modify: `pages/clases-guitarra-electrica.vue`, `pages/clases-guitarra-acustica.vue`, `pages/clases-bajo.vue` for inner-page visual consistency.
- Modify: `pages/sobre-mi.vue` for setlist method cards.
- Modify: `pages/contacto.vue` for clipped paper form and stapled FAQ rows.

## Task 1: Global Zine Design System

**Files:**
- Modify: `assets/css/main.css`

- [ ] **Step 1: Write the failing static check**

Run:

```bash
node - <<'NODE'
const fs = require('fs')
const css = fs.readFileSync('assets/css/main.css', 'utf8')
const checks = [
  ['body should not prefer Inter', !/font-family:\s*Inter/.test(css)],
  ['display font token exists', css.includes('--font-display')],
  ['paper panel utility exists', css.includes('.paper-panel')],
  ['stamp utility exists', css.includes('.stamp')],
  ['grain atmosphere exists', css.includes('body::before')],
  ['focus visible styles exist', css.includes(':focus-visible')],
  ['reduced motion exists', css.includes('prefers-reduced-motion')]
]
const failures = checks.filter(([, ok]) => !ok).map(([name]) => name)
if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}
console.log('global zine design checks passed')
NODE
```

Expected: FAIL with missing token/utility messages.

- [ ] **Step 2: Replace global CSS with expanded system**

Update `assets/css/main.css` to include these required pieces:

```css
:root {
  --ink: #101010;
  --black: #050505;
  --paper: #fff7e8;
  --paper-aged: #efe2c4;
  --acid: #d8ff00;
  --red: #ff3b30;
  --purple: #a855f7;
  --tape: #d7bd7d;
  --gray: #2a2a2a;
  --muted: #d8d0bf;
  --muted-ink: #4b4034;
  --max: 1120px;
  --font-display: Impact, Haettenschweiler, "Arial Narrow", "Roboto Condensed", sans-serif;
  --font-body: Avenir, "Gill Sans", "Trebuchet MS", sans-serif;
  --font-mono: "Courier New", Courier, monospace;
  --shadow-hard: 8px 8px 0 var(--black);
  color-scheme: dark;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  min-width: 320px;
  overflow-x: clip;
  background:
    radial-gradient(circle at 12% 8%, rgba(216, 255, 0, .14), transparent 28rem),
    radial-gradient(circle at 88% 18%, rgba(255, 59, 48, .16), transparent 24rem),
    linear-gradient(135deg, #101010 0%, #14110d 48%, #050505 100%);
  color: var(--paper);
  font-family: var(--font-body);
  line-height: 1.5;
}
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: .16;
  background-image:
    radial-gradient(circle, rgba(255,255,255,.42) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px);
  background-size: 4px 4px, 37px 37px;
  mix-blend-mode: screen;
}
a { color: inherit; }
a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible, summary:focus-visible {
  outline: 3px solid var(--acid);
  outline-offset: 4px;
}
.container { width: min(100% - 32px, var(--max)); margin-inline: auto; }
.section { padding: clamp(56px, 9vw, 96px) 0; }
.eyebrow, .stamp { font-family: var(--font-mono); letter-spacing: .12em; text-transform: uppercase; }
.eyebrow { color: var(--acid); font-weight: 900; font-size: .78rem; line-height: 1; }
.display { font-family: var(--font-display); font-size: clamp(3.4rem, 14vw, 9rem); line-height: .76; letter-spacing: -.07em; text-transform: uppercase; margin: 0; }
.button { display: inline-flex; align-items: center; justify-content: center; padding: 14px 18px; border: 2px solid currentColor; text-decoration: none; font-weight: 950; text-transform: uppercase; box-shadow: 5px 5px 0 var(--paper); transition: transform .18s ease, box-shadow .18s ease; }
.button:hover { transform: translate(-2px, -2px) rotate(-1deg); box-shadow: 8px 8px 0 var(--paper); }
.button-primary { background: var(--acid); color: var(--ink); }
.button-secondary { background: var(--red); color: var(--ink); }
.sticker, .stamp { display: inline-block; padding: 8px 12px; background: var(--paper); color: var(--ink); font-weight: 950; transform: rotate(-2deg); box-shadow: 4px 4px 0 var(--black); }
.paper-panel { background: var(--paper); color: var(--ink); border: 2px solid var(--black); box-shadow: var(--shadow-hard); }
.zine-card { position: relative; border: 2px solid var(--paper); background: #151515; box-shadow: 8px 8px 0 var(--red); }
.tape { position: relative; }
.tape::before { content: ""; position: absolute; width: 74px; height: 20px; background: rgba(215, 189, 125, .82); top: -12px; left: 18px; transform: rotate(-7deg); box-shadow: 0 1px 0 rgba(0,0,0,.28); }
.halftone { background-image: radial-gradient(circle, rgba(16,16,16,.36) 1px, transparent 1.5px); background-size: 9px 9px; }
.tear-edge { clip-path: polygon(0 0, 100% 0, 100% 92%, 96% 100%, 89% 94%, 81% 100%, 73% 93%, 64% 100%, 55% 94%, 47% 100%, 37% 93%, 28% 100%, 19% 94%, 9% 100%, 0 93%); }
::selection { background: var(--acid); color: var(--ink); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; transition-duration: .001ms !important; }
}
```

- [ ] **Step 3: Verify global CSS check passes**

Run the Step 1 `node` command again.

Expected: PASS with `global zine design checks passed`.

## Task 2: Header, Footer, And CTA Redesign

**Files:**
- Modify: `components/SiteHeader.vue`
- Modify: `components/SiteFooter.vue`
- Modify: `components/ContactCta.vue`

- [ ] **Step 1: Write the failing static check**

Run:

```bash
node - <<'NODE'
const fs = require('fs')
const header = fs.readFileSync('components/SiteHeader.vue', 'utf8')
const footer = fs.readFileSync('components/SiteFooter.vue', 'utf8')
const cta = fs.readFileSync('components/ContactCta.vue', 'utf8')
const failures = []
if (!header.includes('isActive')) failures.push('header needs active route helper')
if (/overflow-x\s*:\s*auto/.test(header)) failures.push('header must not use overflow-x auto')
if (!header.includes('nav-link')) failures.push('header links need nav-link class')
if (!footer.includes('footer-stamp')) failures.push('footer needs zine stamp')
if (!cta.includes('tear-offs')) failures.push('CTA needs tear-off visual')
if (!cta.includes('cta-paper')) failures.push('CTA needs paper panel')
if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}
console.log('shared component zine checks passed')
NODE
```

Expected: FAIL with missing redesign markers.

- [ ] **Step 2: Update `SiteHeader.vue` behavior and classes**

Implement this script/template shape while preserving existing links:

```vue
<script setup lang="ts">
const route = useRoute()

const isActive = (path: string) => route.path === path
</script>

<template>
  <header class="site-header tape">
    <NuxtLink class="brand" to="/" aria-label="Ir al inicio">Riff Club Local</NuxtLink>
    <nav aria-label="Navegación principal">
      <NuxtLink v-if="route.path !== '/'" class="nav-link" :class="{ active: isActive('/') }" to="/">Inicio</NuxtLink>
      <NuxtLink class="nav-link" :class="{ active: isActive('/clases-guitarra-electrica') }" to="/clases-guitarra-electrica">Eléctrica</NuxtLink>
      <NuxtLink class="nav-link" :class="{ active: isActive('/clases-guitarra-acustica') }" to="/clases-guitarra-acustica">Acústica</NuxtLink>
      <NuxtLink class="nav-link" :class="{ active: isActive('/clases-bajo') }" to="/clases-bajo">Bajo</NuxtLink>
      <NuxtLink class="nav-link" :class="{ active: isActive('/sobre-mi') }" to="/sobre-mi">Método</NuxtLink>
      <NuxtLink class="nav-link nav-cta" :class="{ active: isActive('/contacto') }" to="/contacto">Contacto</NuxtLink>
    </nav>
  </header>
</template>
```

Style requirements:

- `.site-header` remains sticky.
- `nav` uses `display:flex`, `flex-wrap:wrap`, `overflow:visible`.
- `.nav-link.active` uses acid highlight or underline.
- `.nav-cta` keeps high contrast.

- [ ] **Step 3: Update `ContactCta.vue` to tear-off flyer**

Keep the same `whatsappHref`, buttons, and semantic section. Add a `.cta-paper` wrapper and a `.tear-offs` visual list with repeated spans:

```vue
<section class="cta" aria-labelledby="cta-title">
  <div class="cta-paper tear-edge">
    <p class="stamp">Cupos presenciales</p>
    <h2 id="cta-title">¿Listo para tocar con dirección?</h2>
    <p>Escríbeme por WhatsApp o deja tus datos y coordinamos instrumento, nivel y horario.</p>
    <div class="actions">
      <a class="button button-primary" :href="whatsappHref" target="_blank" rel="noopener">Agendar por WhatsApp</a>
      <NuxtLink class="button button-secondary" to="/contacto">Enviar formulario</NuxtLink>
    </div>
    <div class="tear-offs" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>
  </div>
</section>
```

- [ ] **Step 4: Update footer styling and stamp**

Add an inline stamp marker in `SiteFooter.vue`:

```vue
<p class="footer-stamp">La Reina / Santiago Oriente</p>
```

Style footer as a stacked poster bottom with paper/ink contrast.

- [ ] **Step 5: Verify shared component check passes**

Run the Step 1 `node` command again.

Expected: PASS with `shared component zine checks passed`.

## Task 3: Hero And Service Cards

**Files:**
- Modify: `components/HeroZine.vue`
- Modify: `components/ServiceCard.vue`
- Modify: `pages/index.vue`

- [ ] **Step 1: Write the failing static check**

Run:

```bash
node - <<'NODE'
const fs = require('fs')
const hero = fs.readFileSync('components/HeroZine.vue', 'utf8')
const card = fs.readFileSync('components/ServiceCard.vue', 'utf8')
const home = fs.readFileSync('pages/index.vue', 'utf8')
const failures = []
if (!hero.includes('poster-tape')) failures.push('hero needs tape layers')
if (!hero.includes('string-lines')) failures.push('hero needs string/fret motif')
if (!hero.includes('poster-local')) failures.push('hero needs local poster label')
if (!card.includes("variant: 'electric' | 'acoustic' | 'bass'")) failures.push('ServiceCard needs variant prop union')
if (!card.includes('instrument-mark')) failures.push('ServiceCard needs decorative instrument mark')
if (!home.includes('variant="electric"')) failures.push('home electric card needs variant')
if (!home.includes('variant="acoustic"')) failures.push('home acoustic card needs variant')
if (!home.includes('variant="bass"')) failures.push('home bass card needs variant')
if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}
console.log('hero and service card checks passed')
NODE
```

Expected: FAIL with missing hero/card markers.

- [ ] **Step 2: Redesign `HeroZine.vue` poster**

Preserve H1 and CTA copy. Add inside `.poster`:

```vue
<i class="poster-tape tape-a"></i>
<i class="poster-tape tape-b"></i>
<div class="poster-local">La Reina / Santiago Oriente</div>
<div class="string-lines"><span></span><span></span><span></span><span></span><span></span><span></span></div>
<div class="poster-type"><span>Riff</span><span>Club</span><span>Local</span></div>
<div class="poster-note">Guitarra electrica / acustica / bajo</div>
<b>01</b>
```

Style requirements:

- `.poster` uses `background: var(--paper)` with ink text.
- Add `::before` halftone and `::after` dark clipped shape.
- `.poster-tape` appears as beige tape strips.
- `.string-lines span` are horizontal string/fret lines.
- Add a small entrance animation and reduced-motion support through global CSS.

- [ ] **Step 3: Add `variant` prop and visuals to `ServiceCard.vue`**

Update props:

```ts
defineProps<{
  title: string
  text: string
  to: string
  label: string
  variant: 'electric' | 'acoustic' | 'bass'
}>()
```

Add this visual block in the article:

```vue
<div class="instrument-mark" :class="variant" aria-hidden="true">
  <span></span><span></span><span></span><span></span>
</div>
```

Style `.instrument-mark.electric`, `.instrument-mark.acoustic`, and `.instrument-mark.bass` distinctly using CSS gradients, lines, circles, and rotations.

- [ ] **Step 4: Add variants to homepage service cards**

Update `pages/index.vue` service cards:

```vue
<ServiceCard variant="electric" title="Guitarra eléctrica" label="Riffs / técnica" text="Riffs, rock, técnica, sonido, improvisación y canciones que dan ganas de practicar." to="/clases-guitarra-electrica" />
<ServiceCard variant="acoustic" title="Guitarra acústica" label="Acordes / canciones" text="Acompañamiento, rasgueos, acordes, ritmo y repertorio para tocar desde la primera etapa." to="/clases-guitarra-acustica" />
<ServiceCard variant="bass" title="Bajo" label="Groove / ritmo" text="Base rítmica, digitación, groove, canciones y técnica aplicada al rol del bajista." to="/clases-bajo" />
```

- [ ] **Step 5: Verify hero/card check passes**

Run the Step 1 `node` command again.

Expected: PASS with `hero and service card checks passed`.

## Task 4: Page-Level Visual Rhythm

**Files:**
- Modify: `pages/index.vue`
- Modify: `pages/clases-guitarra-electrica.vue`
- Modify: `pages/clases-guitarra-acustica.vue`
- Modify: `pages/clases-bajo.vue`
- Modify: `pages/sobre-mi.vue`
- Modify: `pages/contacto.vue`

- [ ] **Step 1: Write the failing static check**

Run:

```bash
node - <<'NODE'
const fs = require('fs')
const files = {
  home: 'pages/index.vue',
  electric: 'pages/clases-guitarra-electrica.vue',
  acoustic: 'pages/clases-guitarra-acustica.vue',
  bass: 'pages/clases-bajo.vue',
  about: 'pages/sobre-mi.vue',
  contact: 'pages/contacto.vue'
}
const src = Object.fromEntries(Object.entries(files).map(([k, p]) => [k, fs.readFileSync(p, 'utf8')]))
const failures = []
if (!src.home.includes('note-grid')) failures.push('home needs pasted note grid')
if (!src.home.includes('setlist-panel')) failures.push('home needs setlist method panel')
for (const key of ['electric', 'acoustic', 'bass']) {
  if (!src[key].includes('flyer-panel')) failures.push(`${key} service page needs flyer-panel`)
  if (!src[key].includes('venue-note')) failures.push(`${key} service page needs venue-note`)
}
if (!src.about.includes('setlist-steps')) failures.push('about page needs setlist-steps')
if (!src.contact.includes('contact-form-card')) failures.push('contact page needs contact-form-card')
if (!src.contact.includes('faq-row')) failures.push('contact page needs faq-row')
if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}
console.log('page visual rhythm checks passed')
NODE
```

Expected: FAIL with missing page-level markers.

- [ ] **Step 2: Update homepage section classes and CSS**

In `pages/index.vue`:

- Change pain-point grid wrapper to `class="note-grid"`.
- Add `class="note"` to each pain-point article.
- Change method section to include `setlist-panel` class.

Style requirements:

- `.note-grid` uses staggered grid.
- `.note` uses paper panels, rotations, tape pseudo-elements.
- `.setlist-panel` uses numbered/setlist visual treatment with strong paper/ink contrast.

- [ ] **Step 3: Update service page panels**

In each service page:

- Add `flyer-panel` to the main content panel class.
- Add `venue-note` to the area panel class.
- Style related links as torn stickers with high contrast.

Example:

```vue
<article class="panel main-panel flyer-panel">
<aside class="panel area-panel venue-note" aria-labelledby="area-title">
```

- [ ] **Step 4: Update about page setlist**

In `pages/sobre-mi.vue`:

- Change steps section class to `section container setlist-steps`.
- Style `article` blocks as numbered setlist slips with alternating rotations.

- [ ] **Step 5: Update contact page form and FAQ classes**

In `pages/contacto.vue`:

- Add `class="contact-form-card"` to the form.
- Add `class="faq-row"` to each `details`.
- Style form as paper card; style FAQ as stapled/folded rows.

- [ ] **Step 6: Verify page rhythm check passes**

Run the Step 1 `node` command again.

Expected: PASS with `page visual rhythm checks passed`.

## Task 5: Final Verification

**Files:**
- Inspect generated output from `.output/public`.

- [ ] **Step 1: Run static generation**

Run:

```bash
npm run generate
```

Expected: PASS. Output includes `Generated public .output/public` and all configured routes prerender.

- [ ] **Step 2: Run regression checks**

Run:

```bash
node - <<'NODE'
const fs = require('fs')
const checks = []
const header = fs.readFileSync('components/SiteHeader.vue', 'utf8')
const home = fs.readFileSync('pages/index.vue', 'utf8')
const contact = fs.readFileSync('pages/contacto.vue', 'utf8')
const card = fs.readFileSync('components/ServiceCard.vue', 'utf8')
checks.push(['no header overflow-x auto', !/overflow-x\s*:\s*auto/.test(header)])
checks.push(['header keeps Inicio route condition', header.includes("route.path !== '/'")])
checks.push(['home JSON-LD preserved', home.includes('LocalBusiness') && home.includes('EducationalOrganization')])
checks.push(['contact FAQPage preserved', contact.includes('FAQPage')])
checks.push(['service card variant prop exists', card.includes("variant: 'electric' | 'acoustic' | 'bass'")])
for (const route of ['index.html', 'clases-guitarra-electrica/index.html', 'clases-guitarra-acustica/index.html', 'clases-bajo/index.html', 'sobre-mi/index.html', 'contacto/index.html']) {
  checks.push([`.output/public/${route} exists`, fs.existsSync(`.output/public/${route}`)])
}
const failures = checks.filter(([, ok]) => !ok).map(([name]) => name)
if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}
console.log('redesign regression checks passed')
NODE
```

Expected: PASS with `redesign regression checks passed`.

- [ ] **Step 3: Commit if repository exists**

Run:

```bash
git status --short
```

Expected in this workspace: `fatal: not a git repository...`. If still not a git repository, skip commit.

## Self-Review

- Spec coverage: Tasks cover global tokens/primitives, header/footer/CTA, hero, service cards, home page, service pages, about, contact, accessibility constraints, no-scrollbar regression, JSON-LD preservation, and SSG verification.
- Placeholder scan: The plan contains no unresolved implementation placeholders. Existing production integration placeholders are intentionally excluded from this redesign scope.
- Type consistency: `ServiceCard` variant is consistently specified as `'electric' | 'acoustic' | 'bass'`, and homepage calls use `variant="electric"`, `variant="acoustic"`, and `variant="bass"`.
