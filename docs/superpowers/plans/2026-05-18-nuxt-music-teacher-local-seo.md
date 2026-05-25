# Nuxt Music Teacher Local SEO Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Nuxt 3 SSG website architecture, SEO content model, and Zine Underground base components for a private guitar and bass teacher in La Reina, Santiago.

**Architecture:** Create a static Nuxt 3 app with prerendered routes for home, three service pages, about, and contact/FAQ. Use page-level `useSeoMeta` and `useHead` JSON-LD so every static route ships SEO-ready HTML.

**Tech Stack:** Nuxt 3, Vue 3 Composition API with `<script setup>`, CSS in Vue SFCs, static generation through `nuxi generate`.

---

## File Structure

- Create: `package.json` for Nuxt scripts and dependencies.
- Create: `nuxt.config.ts` for SSG prerender routes and global head defaults.
- Create: `app.vue` for layout shell.
- Create: `assets/css/main.css` for global Zine Underground design tokens and base styles.
- Create: `components/SiteHeader.vue` for static navigation and CTA.
- Create: `components/SiteFooter.vue` for local service areas and links.
- Create: `components/HeroZine.vue` for the home hero.
- Create: `components/ServiceCard.vue` for instrument service cards.
- Create: `components/ContactCta.vue` for WhatsApp/form conversion blocks.
- Create: `pages/index.vue` for home copy, local SEO, and LocalBusiness JSON-LD.
- Create: `pages/clases-guitarra-electrica.vue` for electric guitar service SEO copy.
- Create: `pages/clases-guitarra-acustica.vue` for acoustic guitar service SEO copy.
- Create: `pages/clases-bajo.vue` for bass service SEO copy.
- Create: `pages/sobre-mi.vue` for methodology and trust copy.
- Create: `pages/contacto.vue` for contact form, FAQ, and FAQPage JSON-LD.

## Task 1: Scaffold Nuxt 3 SSG Project

**Files:**
- Create: `package.json`
- Create: `nuxt.config.ts`
- Create: `app.vue`
- Create: `assets/css/main.css`

- [ ] **Step 1: Initialize Nuxt using the official CLI command**

Run this command from the parent directory where the project should be created:

```bash
npx nuxi@latest init music-teacher-site
cd music-teacher-site
npm install
```

Expected: Nuxt creates a new app and installs dependencies after `npm install`.

- [ ] **Step 2: Add Nuxt scripts and dependency metadata**

Create `package.json` with:

```json
{
  "name": "music-teacher-site",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "preview": "nuxt preview"
  },
  "dependencies": {
    "nuxt": "^3.17.0",
    "vue": "^3.5.0",
    "vue-router": "^4.5.0"
  },
  "devDependencies": {}
}
```

- [ ] **Step 3: Configure SSG and global SEO defaults**

Create `nuxt.config.ts` with:

```ts
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
```

- [ ] **Step 4: Add app shell**

Create `app.vue` with:

```vue
<template>
  <div>
    <SiteHeader />
    <main>
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>
```

- [ ] **Step 5: Add global CSS tokens**

Create `assets/css/main.css` with:

```css
:root {
  --ink: #101010;
  --paper: #fff7e8;
  --acid: #d8ff00;
  --red: #ff3b30;
  --purple: #a855f7;
  --gray: #2a2a2a;
  --muted: #d8d0bf;
  --max: 1120px;
  color-scheme: dark;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--ink);
  color: var(--paper);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
a { color: inherit; }
.container { width: min(100% - 32px, var(--max)); margin-inline: auto; }
.section { padding: 72px 0; }
.eyebrow { color: var(--acid); font: 800 0.78rem/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .12em; text-transform: uppercase; }
.display { font-size: clamp(3rem, 14vw, 8.5rem); line-height: .78; letter-spacing: -.08em; text-transform: uppercase; margin: 0; }
.button { display: inline-flex; align-items: center; justify-content: center; padding: 14px 18px; border: 2px solid currentColor; text-decoration: none; font-weight: 900; text-transform: uppercase; box-shadow: 5px 5px 0 var(--paper); }
.button-primary { background: var(--acid); color: var(--ink); }
.button-secondary { background: var(--red); color: white; }
.sticker { display: inline-block; padding: 8px 12px; background: var(--paper); color: var(--ink); font: 900 .8rem/1 ui-monospace, SFMono-Regular, Menlo, monospace; text-transform: uppercase; transform: rotate(-2deg); }
```

- [ ] **Step 6: Verify scaffold generates**

Run:

```bash
npm run generate
```

Expected: PASS, Nuxt generates `.output/public` with static HTML.

## Task 2: Build Shared Layout Components

**Files:**
- Create: `components/SiteHeader.vue`
- Create: `components/SiteFooter.vue`
- Create: `components/ContactCta.vue`
- Create: `components/ServiceCard.vue`

- [ ] **Step 1: Create header**

Create `components/SiteHeader.vue` with:

```vue
<template>
  <header class="site-header">
    <NuxtLink class="brand" to="/">Riff Club Local</NuxtLink>
    <nav aria-label="Navegación principal">
      <NuxtLink to="/clases-guitarra-electrica">Eléctrica</NuxtLink>
      <NuxtLink to="/clases-guitarra-acustica">Acústica</NuxtLink>
      <NuxtLink to="/clases-bajo">Bajo</NuxtLink>
      <NuxtLink to="/sobre-mi">Método</NuxtLink>
      <NuxtLink class="nav-cta" to="/contacto">Contacto</NuxtLink>
    </nav>
  </header>
</template>

<style scoped>
.site-header { position: sticky; top: 0; z-index: 20; display: flex; gap: 18px; align-items: center; justify-content: space-between; padding: 14px 18px; background: rgba(16,16,16,.92); border-bottom: 1px dashed var(--paper); backdrop-filter: blur(10px); }
.brand { color: var(--acid); font-weight: 950; text-transform: uppercase; text-decoration: none; letter-spacing: -.04em; }
nav { display: flex; gap: 12px; align-items: center; overflow-x: auto; font-size: .88rem; }
nav a { white-space: nowrap; text-decoration: none; font-weight: 800; }
.nav-cta { background: var(--red); color: white; padding: 8px 10px; transform: rotate(1deg); }
@media (max-width: 760px) { .site-header { align-items: flex-start; flex-direction: column; } nav { width: 100%; } }
</style>
```

- [ ] **Step 2: Create footer**

Create `components/SiteFooter.vue` with:

```vue
<template>
  <footer class="footer">
    <div class="container footer-grid">
      <div>
        <p class="eyebrow">Clases presenciales</p>
        <h2>Guitarra y bajo en La Reina</h2>
      </div>
      <p>Para estudiantes de La Reina, Ñuñoa, Las Condes, Peñalolén, Providencia y Santiago Oriente.</p>
      <NuxtLink class="button button-primary" to="/contacto">Agendar clase</NuxtLink>
    </div>
  </footer>
</template>

<style scoped>
.footer { padding: 56px 0; border-top: 2px solid var(--paper); background: #050505; }
.footer-grid { display: grid; gap: 24px; grid-template-columns: 1.3fr 1fr auto; align-items: center; }
h2 { margin: 0; font-size: clamp(2rem, 6vw, 4.5rem); line-height: .9; letter-spacing: -.06em; text-transform: uppercase; }
p { color: var(--muted); }
@media (max-width: 820px) { .footer-grid { grid-template-columns: 1fr; } }
</style>
```

- [ ] **Step 3: Create conversion CTA**

Create `components/ContactCta.vue` with:

```vue
<script setup lang="ts">
const whatsappHref = 'https://wa.me/56912345678?text=Hola%2C%20quiero%20consultar%20por%20clases%20presenciales%20de%20guitarra%2Fbajo%20en%20La%20Reina.%20%C2%BFTienes%20horarios%20disponibles%3F'
</script>

<template>
  <section class="cta" aria-labelledby="cta-title">
    <p class="sticker">Cupos presenciales</p>
    <h2 id="cta-title">¿Listo para tocar con dirección?</h2>
    <p>Escríbeme por WhatsApp o deja tus datos y coordinamos instrumento, nivel y horario.</p>
    <div class="actions">
      <a class="button button-primary" :href="whatsappHref" target="_blank" rel="noopener">Agendar por WhatsApp</a>
      <NuxtLink class="button button-secondary" to="/contacto">Enviar formulario</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.cta { margin: 48px auto; padding: 32px; max-width: 920px; background: var(--purple); color: white; border: 2px solid var(--paper); box-shadow: 10px 10px 0 var(--acid); transform: rotate(-.5deg); }
h2 { margin: 14px 0; font-size: clamp(2.5rem, 9vw, 6rem); line-height: .8; letter-spacing: -.08em; text-transform: uppercase; }
p { max-width: 620px; }
.actions { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 22px; }
</style>
```

- [ ] **Step 4: Create service card**

Create `components/ServiceCard.vue` with:

```vue
<script setup lang="ts">
defineProps<{
  title: string
  text: string
  to: string
  label: string
}>()
</script>

<template>
  <article class="service-card">
    <p class="eyebrow">{{ label }}</p>
    <h3>{{ title }}</h3>
    <p>{{ text }}</p>
    <NuxtLink :to="to">Ver clases -></NuxtLink>
  </article>
</template>

<style scoped>
.service-card { padding: 24px; min-height: 260px; background: var(--paper); color: var(--ink); border: 2px solid var(--ink); box-shadow: 8px 8px 0 var(--red); }
.service-card:nth-child(2) { transform: rotate(1deg); box-shadow: 8px 8px 0 var(--acid); }
.service-card:nth-child(3) { transform: rotate(-1deg); box-shadow: 8px 8px 0 var(--purple); }
h3 { margin: 18px 0 10px; font-size: clamp(2rem, 6vw, 4rem); line-height: .82; letter-spacing: -.07em; text-transform: uppercase; }
a { font-weight: 950; text-transform: uppercase; }
</style>
```

- [ ] **Step 5: Verify shared components compile**

Run:

```bash
npm run generate
```

Expected: PASS. If Nuxt reports unresolved components, confirm component filenames match their use in `app.vue` and pages.

## Task 3: Build Home Page With Local SEO And JSON-LD

**Files:**
- Create: `components/HeroZine.vue`
- Create: `pages/index.vue`

- [ ] **Step 1: Create Zine hero**

Create `components/HeroZine.vue` with:

```vue
<script setup lang="ts">
const whatsappHref = 'https://wa.me/56912345678?text=Hola%2C%20quiero%20consultar%20por%20clases%20presenciales%20de%20guitarra%2Fbajo%20en%20La%20Reina.%20%C2%BFTienes%20horarios%20disponibles%3F'
</script>

<template>
  <section class="hero container" aria-labelledby="home-title">
    <div class="hero-copy">
      <p class="sticker">Clases presenciales / La Reina</p>
      <h1 id="home-title" class="display">Clases de guitarra en La Reina</h1>
      <p class="lead">Aprende guitarra eléctrica, acústica o bajo con método, canciones reales y una ruta clara para dejar de practicar a ciegas.</p>
      <div class="actions">
        <a class="button button-primary" :href="whatsappHref" target="_blank" rel="noopener">Agendar por WhatsApp</a>
        <NuxtLink class="button button-secondary" to="/contacto">Enviar formulario</NuxtLink>
      </div>
    </div>
    <div class="poster" aria-hidden="true">
      <span>Riff</span><span>Club</span><span>Local</span><b>01</b>
    </div>
  </section>
</template>

<style scoped>
.hero { display: grid; grid-template-columns: 1.1fr .9fr; gap: 36px; align-items: center; min-height: 82vh; padding: 72px 0; }
.lead { max-width: 680px; color: var(--muted); font-size: clamp(1.1rem, 2.5vw, 1.35rem); }
.actions { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 28px; }
.poster { position: relative; min-height: 420px; background: var(--gray); border: 2px dashed var(--paper); overflow: hidden; transform: rotate(1deg); }
.poster span { display: block; margin: 18px; padding: 10px; background: var(--acid); color: var(--ink); font-size: clamp(2.6rem, 8vw, 5.5rem); line-height: .78; font-weight: 950; text-transform: uppercase; letter-spacing: -.09em; transform: rotate(-3deg); }
.poster span:nth-child(2) { background: var(--purple); color: white; transform: rotate(2deg); }
.poster span:nth-child(3) { background: var(--red); color: white; transform: rotate(-1deg); }
.poster b { position: absolute; right: 18px; bottom: 8px; font-size: 7rem; line-height: 1; letter-spacing: -.12em; }
@media (max-width: 860px) { .hero { grid-template-columns: 1fr; min-height: auto; } .poster { min-height: 280px; } }
</style>
```

- [ ] **Step 2: Create home page SEO and content**

Create `pages/index.vue` with:

```vue
<script setup lang="ts">
useSeoMeta({
  title: 'Clases de guitarra en La Reina | Profesor',
  description: 'Clases presenciales de guitarra y bajo en La Reina. Aprende con método, canciones reales y agenda por WhatsApp.',
  ogTitle: 'Clases de guitarra en La Reina | Profesor',
  ogDescription: 'Clases presenciales de guitarra y bajo en La Reina. Aprende con método, canciones reales y agenda por WhatsApp.'
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': ['LocalBusiness', 'EducationalOrganization'],
        name: 'Riff Club Local - Clases de guitarra y bajo',
        description: 'Clases presenciales de guitarra eléctrica, guitarra acústica y bajo en La Reina, Santiago de Chile.',
        areaServed: ['La Reina', 'Ñuñoa', 'Las Condes', 'Peñalolén', 'Providencia', 'Santiago Oriente'],
        address: { '@type': 'PostalAddress', addressLocality: 'La Reina', addressRegion: 'Región Metropolitana', addressCountry: 'CL' },
        geo: { '@type': 'GeoCoordinates', latitude: -33.441, longitude: -70.535 },
        url: 'https://example.com/',
        sameAs: [],
        makesOffer: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Clases de guitarra eléctrica' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Clases de guitarra acústica' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Clases de bajo' } }
        ]
      })
    }
  ]
})
</script>

<template>
  <HeroZine />
  <section class="section container" aria-labelledby="dolores-title">
    <p class="eyebrow">Si esto te suena</p>
    <h2 id="dolores-title">Deja de aprender con videos sueltos.</h2>
    <div class="grid">
      <article><h3>No sabes qué practicar</h3><p>Ordenamos técnica, ritmo y canciones para que cada semana tenga foco.</p></article>
      <article><h3>Te cuesta cambiar acordes</h3><p>Trabajamos movimientos concretos, tempo lento y progresiones reales.</p></article>
      <article><h3>Sientes que no avanzas</h3><p>Detectamos el bloqueo y armamos ejercicios que se conectan con música.</p></article>
    </div>
  </section>
  <section class="section container" aria-labelledby="servicios-title">
    <p class="eyebrow">Elige tu instrumento</p>
    <h2 id="servicios-title">Clases presenciales cerca de Santiago Oriente.</h2>
    <div class="service-grid">
      <ServiceCard title="Guitarra eléctrica" label="Riffs / técnica" text="Riffs, rock, técnica, sonido, improvisación y canciones que dan ganas de practicar." to="/clases-guitarra-electrica" />
      <ServiceCard title="Guitarra acústica" label="Acordes / canciones" text="Acompañamiento, rasgueos, acordes, ritmo y repertorio para tocar desde la primera etapa." to="/clases-guitarra-acustica" />
      <ServiceCard title="Bajo" label="Groove / ritmo" text="Base rítmica, digitación, groove, canciones y técnica aplicada al rol del bajista." to="/clases-bajo" />
    </div>
  </section>
  <section class="section container method" aria-labelledby="metodo-title">
    <p class="sticker">Método sin relleno</p>
    <h2 id="metodo-title">Diagnóstico, ruta y canciones reales.</h2>
    <p>Las clases se adaptan a tu nivel, pero no son improvisadas: definimos objetivos, corregimos técnica y usamos canciones para que la práctica tenga sentido.</p>
  </section>
  <ContactCta />
</template>

<style scoped>
h2 { font-size: clamp(2.6rem, 8vw, 6rem); line-height: .82; letter-spacing: -.08em; text-transform: uppercase; margin: 12px 0 28px; }
.grid, .service-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
.grid article { padding: 22px; border: 1px dashed var(--paper); background: #181818; }
.grid h3 { color: var(--acid); font-size: 1.4rem; }
.grid p, .method p { color: var(--muted); }
.method { background: #050505; padding-inline: 24px; border-left: 8px solid var(--red); }
@media (max-width: 860px) { .grid, .service-grid { grid-template-columns: 1fr; } }
</style>
```

- [ ] **Step 3: Verify home page static SEO**

Run:

```bash
npm run generate
```

Expected: PASS and `.output/public/index.html` contains `Clases de guitarra en La Reina` and `application/ld+json`.

## Task 4: Build Service Pages

**Files:**
- Create: `pages/clases-guitarra-electrica.vue`
- Create: `pages/clases-guitarra-acustica.vue`
- Create: `pages/clases-bajo.vue`

- [ ] **Step 1: Create electric guitar page**

Create `pages/clases-guitarra-electrica.vue` with complete page-level SEO, H1, lesson details, internal links to acoustic/bass pages, and `ContactCta`.

```vue
<script setup lang="ts">
useSeoMeta({ title: 'Clases de guitarra eléctrica en Santiago', description: 'Aprende riffs, técnica y canciones con clases presenciales cerca de La Reina. Agenda tu primera clase.' })
</script>

<template>
  <section class="section container page-hero">
    <p class="sticker">Eléctrica / riffs / rock</p>
    <h1 class="display">Clases de guitarra eléctrica en Santiago</h1>
    <p>Para empezar desde cero o destrabar tu técnica con riffs, canciones, sonido, coordinación e improvisación.</p>
  </section>
  <section class="section container content-grid">
    <article><h2>Qué vas a trabajar</h2><p>Riffs, power chords, escalas, púa alternada, ritmo, bending, vibrato y repertorio elegido según tu nivel.</p></article>
    <article><h2>Para quién es</h2><p>Principiantes que quieren tocar canciones y estudiantes intermedios que necesitan orden, técnica y dirección.</p></article>
    <article><h2>Zona</h2><p>Clases presenciales en La Reina para estudiantes de Santiago Oriente, Ñuñoa, Las Condes, Peñalolén y Providencia.</p></article>
  </section>
  <section class="container related"><NuxtLink to="/clases-guitarra-acustica">Ver guitarra acústica</NuxtLink><NuxtLink to="/clases-bajo">Ver bajo</NuxtLink></section>
  <ContactCta />
</template>

<style scoped>
.page-hero p:not(.sticker), article p { color: var(--muted); max-width: 760px; }
.content-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
article { padding: 22px; background: var(--gray); border: 1px dashed var(--paper); }
h2 { color: var(--acid); text-transform: uppercase; }
.related { display: flex; gap: 18px; flex-wrap: wrap; font-weight: 900; text-transform: uppercase; }
@media (max-width: 860px) { .content-grid { grid-template-columns: 1fr; } }
</style>
```

- [ ] **Step 2: Create acoustic guitar page**

Create `pages/clases-guitarra-acustica.vue` by adapting the electric page with this SEO and copy:

```vue
<script setup lang="ts">
useSeoMeta({ title: 'Clases de guitarra acústica en La Reina', description: 'Aprende acordes, rasgueos y canciones con clases presenciales de guitarra acústica. Escríbeme para agendar.' })
</script>

<template>
  <section class="section container page-hero">
    <p class="sticker">Acústica / acordes / canciones</p>
    <h1 class="display">Clases de guitarra acústica en La Reina</h1>
    <p>Aprende acordes, rasgueos, ritmo y canciones con una ruta clara para tocar sin depender de tutoriales sueltos.</p>
  </section>
  <section class="section container content-grid">
    <article><h2>Qué vas a trabajar</h2><p>Cambios de acordes, cejilla, rasgueos, arpegios, tempo, oído práctico y repertorio cantable o instrumental.</p></article>
    <article><h2>Para quién es</h2><p>Ideal para principiantes, personas que quieren acompañar canciones y estudiantes que necesitan mejorar ritmo y fluidez.</p></article>
    <article><h2>Zona</h2><p>Clases presenciales en La Reina, cerca de Ñuñoa, Las Condes, Peñalolén, Providencia y Santiago Oriente.</p></article>
  </section>
  <section class="container related"><NuxtLink to="/clases-guitarra-electrica">Ver guitarra eléctrica</NuxtLink><NuxtLink to="/clases-bajo">Ver bajo</NuxtLink></section>
  <ContactCta />
</template>

<style scoped>
.page-hero p:not(.sticker), article p { color: var(--muted); max-width: 760px; }
.content-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
article { padding: 22px; background: var(--gray); border: 1px dashed var(--paper); }
h2 { color: var(--acid); text-transform: uppercase; }
.related { display: flex; gap: 18px; flex-wrap: wrap; font-weight: 900; text-transform: uppercase; }
@media (max-width: 860px) { .content-grid { grid-template-columns: 1fr; } }
</style>
```

- [ ] **Step 3: Create bass page**

Create `pages/clases-bajo.vue` with:

```vue
<script setup lang="ts">
useSeoMeta({ title: 'Clases de bajo en Santiago | Profesor', description: 'Clases presenciales de bajo para trabajar groove, ritmo y técnica. Cerca de La Reina y Santiago Oriente.' })
</script>

<template>
  <section class="section container page-hero">
    <p class="sticker">Bajo / groove / base</p>
    <h1 class="display">Clases de bajo en Santiago</h1>
    <p>Trabaja groove, digitación, ritmo, canciones y el rol del bajo dentro de una banda o grabación.</p>
  </section>
  <section class="section container content-grid">
    <article><h2>Qué vas a trabajar</h2><p>Pulso, subdivisión, digitación, patrones, escalas, líneas de bajo, canciones y conexión con batería.</p></article>
    <article><h2>Para quién es</h2><p>Para principiantes que quieren partir bien y bajistas intermedios que necesitan mejorar tiempo, sonido y recursos.</p></article>
    <article><h2>Zona</h2><p>Profesor de bajo con clases presenciales en La Reina para estudiantes de Santiago Oriente y comunas cercanas.</p></article>
  </section>
  <section class="container related"><NuxtLink to="/clases-guitarra-electrica">Ver guitarra eléctrica</NuxtLink><NuxtLink to="/clases-guitarra-acustica">Ver guitarra acústica</NuxtLink></section>
  <ContactCta />
</template>

<style scoped>
.page-hero p:not(.sticker), article p { color: var(--muted); max-width: 760px; }
.content-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
article { padding: 22px; background: var(--gray); border: 1px dashed var(--paper); }
h2 { color: var(--acid); text-transform: uppercase; }
.related { display: flex; gap: 18px; flex-wrap: wrap; font-weight: 900; text-transform: uppercase; }
@media (max-width: 860px) { .content-grid { grid-template-columns: 1fr; } }
</style>
```

- [ ] **Step 4: Verify service routes**

Run:

```bash
npm run generate
```

Expected: PASS and generated HTML exists for all three service routes.

## Task 5: Build About And Contact/FAQ Pages

**Files:**
- Create: `pages/sobre-mi.vue`
- Create: `pages/contacto.vue`

- [ ] **Step 1: Create about page**

Create `pages/sobre-mi.vue` with:

```vue
<script setup lang="ts">
useSeoMeta({ title: 'Profesor de guitarra y bajo en La Reina', description: 'Conoce el método de clases personalizadas para guitarra eléctrica, acústica y bajo en Santiago Oriente.' })
</script>

<template>
  <section class="section container">
    <p class="sticker">Método cercano y directo</p>
    <h1 class="display">Profesor de guitarra y bajo en La Reina</h1>
    <p class="lead">Las clases combinan diagnóstico, objetivos claros y canciones reales para que cada estudiante entienda qué practicar y por qué.</p>
  </section>
  <section class="section container steps">
    <article><h2>1. Diagnóstico</h2><p>Revisamos nivel, intereses, técnica, ritmo y bloqueos actuales.</p></article>
    <article><h2>2. Ruta</h2><p>Definimos ejercicios y canciones conectadas con tus metas.</p></article>
    <article><h2>3. Práctica guiada</h2><p>Te llevas indicaciones simples para avanzar entre clases sin perder foco.</p></article>
  </section>
  <ContactCta />
</template>

<style scoped>
.lead, .steps p { color: var(--muted); max-width: 760px; }
.steps { display: grid; gap: 22px; grid-template-columns: repeat(3, 1fr); }
article { padding: 24px; background: #181818; border-left: 8px solid var(--acid); }
h2 { text-transform: uppercase; }
@media (max-width: 860px) { .steps { grid-template-columns: 1fr; } }
</style>
```

- [ ] **Step 2: Create contact page with FAQ schema**

Create `pages/contacto.vue` with:

```vue
<script setup lang="ts">
const faqs = [
  { q: '¿Las clases son presenciales?', a: 'Sí. Las clases son presenciales en La Reina, Santiago de Chile.' },
  { q: '¿Puedo tomar clases si vivo en Ñuñoa o Las Condes?', a: 'Sí. Muchos estudiantes pueden venir desde Ñuñoa, Las Condes, Peñalolén, Providencia y otros sectores de Santiago Oriente.' },
  { q: '¿Necesito saber tocar antes de empezar?', a: 'No. Puedes partir desde cero en guitarra eléctrica, guitarra acústica o bajo.' },
  { q: '¿También sirven para nivel intermedio?', a: 'Sí. Trabajamos técnica, ritmo, repertorio, sonido y una ruta de práctica según tu nivel.' }
]

useSeoMeta({ title: 'Contacto | Clases de guitarra en La Reina', description: 'Agenda clases presenciales de guitarra o bajo en La Reina. Escríbeme por WhatsApp o envía el formulario.' })

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a }
        }))
      })
    }
  ]
})
</script>

<template>
  <section class="section container contact">
    <div>
      <p class="sticker">Contacto</p>
      <h1 class="display">Agenda tu clase</h1>
      <p>Cuéntame tu instrumento, nivel y disponibilidad. Respondo para coordinar una clase presencial en La Reina.</p>
      <a class="button button-primary" href="https://wa.me/56912345678?text=Hola%2C%20quiero%20consultar%20por%20clases%20presenciales%20de%20guitarra%2Fbajo%20en%20La%20Reina.%20%C2%BFTienes%20horarios%20disponibles%3F" target="_blank" rel="noopener">WhatsApp</a>
    </div>
    <form name="contacto" method="POST" action="https://formspree.io/f/your-form-id">
      <label>Nombre <input name="name" autocomplete="name" required></label>
      <label>Email <input name="email" type="email" autocomplete="email" required></label>
      <label>Instrumento <input name="instrument" required></label>
      <label>Mensaje <textarea name="message" rows="5" required></textarea></label>
      <button class="button button-secondary" type="submit">Enviar formulario</button>
    </form>
  </section>
  <section class="section container" aria-labelledby="faq-title">
    <p class="eyebrow">Preguntas frecuentes</p>
    <h2 id="faq-title">Antes de escribir</h2>
    <div class="faq-list">
      <details v-for="faq in faqs" :key="faq.q">
        <summary>{{ faq.q }}</summary>
        <p>{{ faq.a }}</p>
      </details>
    </div>
  </section>
</template>

<style scoped>
.contact { display: grid; grid-template-columns: 1fr 420px; gap: 36px; align-items: start; }
.contact p, details p { color: var(--muted); }
form { display: grid; gap: 14px; padding: 22px; background: var(--paper); color: var(--ink); box-shadow: 8px 8px 0 var(--red); }
label { display: grid; gap: 6px; font-weight: 900; }
input, textarea { width: 100%; padding: 12px; border: 2px solid var(--ink); font: inherit; }
h2 { font-size: clamp(2.5rem, 8vw, 5rem); line-height: .82; text-transform: uppercase; letter-spacing: -.08em; }
details { padding: 18px 0; border-top: 1px dashed var(--paper); }
summary { cursor: pointer; font-weight: 900; font-size: 1.2rem; }
@media (max-width: 860px) { .contact { grid-template-columns: 1fr; } }
</style>
```

- [ ] **Step 3: Replace placeholder form endpoint and phone number**

Edit every `wa.me/56912345678` URL to the teacher's real WhatsApp number. Edit `https://formspree.io/f/your-form-id` to the real static form endpoint.

- [ ] **Step 4: Verify contact route and FAQ schema**

Run:

```bash
npm run generate
```

Expected: PASS and `.output/public/contacto/index.html` contains `FAQPage` and visible FAQ questions.

## Task 6: Final Verification And Delivery

**Files:**
- Inspect: generated `.output/public/**/*.html`

- [ ] **Step 1: Generate static site**

Run:

```bash
npm run generate
```

Expected: PASS with static files in `.output/public`.

- [ ] **Step 2: Preview generated output**

Run:

```bash
npm run preview
```

Expected: local preview serves prerendered routes.

- [ ] **Step 3: Check SEO requirements manually**

Confirm these items in the generated HTML:

- Home title is under 60 characters.
- All meta descriptions are under 155 characters.
- Each page has exactly one visible H1.
- Home includes LocalBusiness/EducationalOrganization JSON-LD.
- Contact includes FAQPage JSON-LD.
- Header links and service page related links resolve.

- [ ] **Step 4: Commit if the project is a git repository**

Run:

```bash
git status --short
git add package.json nuxt.config.ts app.vue assets/css/main.css components pages
git commit -m "feat: add Nuxt SSG music teacher site"
```

Expected: commit succeeds. If `git status` says it is not a repository, skip this step.

## Self-Review

- Spec coverage: The plan covers official Nuxt installation, SSG config, routing, local SEO strategy, page-level metadata, LocalBusiness JSON-LD, FAQPage JSON-LD, Spanish copy, Zine Underground components, WhatsApp CTA, contact form, and static verification.
- Placeholder scan: The plan intentionally includes two replace-before-launch values: the WhatsApp phone number and static form endpoint. These are explicit integration inputs, not hidden implementation gaps.
- Type consistency: Component props and usage match: `ServiceCard` receives `title`, `text`, `to`, and `label`; shared components referenced in pages exist by filename.
