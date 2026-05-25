# Nuxt 3 SSG Music Teacher Local SEO Site Design

## Goal

Create a static Nuxt 3 website for a private electric guitar, acoustic guitar, and bass teacher offering in-person lessons in La Reina, Santiago de Chile. The website must generate local leads from La Reina and nearby communes while using an impactful, distinctive visual style.

## Decisions Approved

- Framework: Nuxt 3 with Vue 3 Composition API and `<script setup>`.
- Rendering: Static Site Generation only via Nuxt prerendering and `nuxi generate`.
- Language: Spanish only.
- Primary conversion: WhatsApp booking plus a contact form.
- Visual direction: Zine Underground, using collage-like layouts, sticker labels, diagonals, dark backgrounds, bright accent colors, and a local music-scene feel.
- Route strategy: Use broad service slugs without `la-reina` in every URL to avoid implying lessons are only for residents of La Reina. Local relevance will be handled through page titles, headings, copy, internal links, and structured data.

## Target Audience

- Residents of La Reina, Ñuñoa, Las Condes, Peñalolén, Providencia, and Santiago Oriente.
- Absolute beginners who want a clear first step.
- Intermediate students who feel stuck and need structure, technique, rhythm, or repertoire guidance.
- People searching for in-person private lessons rather than online courses.

## Sitemap And Routes

- `/`: Home page targeting broad local searches such as "clases de guitarra en La Reina" and "profesor de guitarra Santiago Oriente".
- `/clases-guitarra-electrica`: Electric guitar lesson page targeting rock, riffs, technique, improvisation, and local lesson intent.
- `/clases-guitarra-acustica`: Acoustic guitar lesson page targeting accompaniment, chords, rhythm, songs, and beginner-friendly acoustic learning.
- `/clases-bajo`: Bass lesson page targeting groove, rhythm, technique, and "profesor de bajo Santiago" intent.
- `/sobre-mi`: Teacher background, method, trust, and pedagogical approach.
- `/contacto`: WhatsApp CTA, contact form, location/service-area copy, and FAQ section with FAQPage JSON-LD.

## Local SEO Strategy

Primary keywords:

- clases de guitarra en La Reina
- profesor de guitarra La Reina
- clases de guitarra Santiago Oriente
- clases de guitarra electrica Santiago
- clases de guitarra acustica La Reina
- profesor de bajo Santiago
- clases de bajo Santiago Oriente

Nearby-area modifiers:

- Ñuñoa
- Las Condes
- Peñalolén
- Providencia
- Santiago Oriente

On-page SEO rules:

- Each route gets a unique `title` under 60 characters.
- Each route gets a unique meta description under 155 characters with a clear CTA.
- Each route uses one H1, followed by logical H2/H3 sections.
- Service pages must link to contact and at least one related service page.
- Home page must link to all service pages.
- Contact page must include FAQ content visible in the HTML and matching FAQPage schema.

Structured data:

- Global JSON-LD should describe the teacher/service as a local in-person music lesson provider using `LocalBusiness` with `@type` also including `EducationalOrganization` or a `Person`/`Teacher` entity linked through `employee`/`founder` if the real teacher name is known later.
- Use approximate La Reina geolocation only if the exact address is not public.
- Include service areas: La Reina, Ñuñoa, Las Condes, Peñalolén, Providencia, Santiago Oriente.
- Do not publish a full street address unless the teacher explicitly wants it public.

## Information Architecture

Home sections:

- Hero: local value proposition, bold Zine Underground design, direct CTA to WhatsApp and secondary CTA to services.
- Pain points: too many tutorials, no practice structure, difficulty changing chords, rhythm problems, feeling stuck.
- Services overview: electric guitar, acoustic guitar, and bass cards.
- Method snapshot: diagnosis, clear goals, real songs, technique applied to music.
- Testimonials: short local proof blocks.
- Local area block: in-person lessons in La Reina for students from nearby communes.
- Final CTA: WhatsApp and contact form link.

Service page sections:

- Hero with instrument-specific SEO H1 and CTA.
- Who it is for.
- What students learn.
- Method and lesson structure.
- Common questions or objections.
- CTA to WhatsApp and contact page.

About page sections:

- Teacher story and local context.
- Methodology: personalized route, technique through songs, rhythm, repertoire, practice plan.
- Beginner reassurance.
- Intermediate progression.
- CTA.

Contact page sections:

- Main CTA with WhatsApp and form.
- Service area explanation.
- Contact form compatible with static deployment, using a third-party form endpoint or future static form provider.
- FAQ with schema.

## Visual Design System

Style name: Zine Underground.

Principles:

- High contrast and irregular visual rhythm.
- Dark base surfaces with bright stickers and label-like blocks.
- Use collage cards, rotated tags, dashed borders, stamp-like labels, and large condensed headings.
- Keep layout accessible and readable despite the expressive style.
- Mobile-first: visual intensity must not reduce CTA clarity on small screens.

Suggested palette:

- Ink black: `#101010`
- Off white: `#fff7e8`
- Acid yellow: `#d8ff00`
- Signal red: `#ff3b30`
- Electric purple: `#a855f7`
- Muted gray: `#2a2a2a`

Typography direction:

- Heavy condensed display font for hero and section titles if available via self-hosting or a performant font provider.
- System sans-serif for body copy to keep performance strong.
- Monospace accents for labels, location tags, and CTA stickers.

Core components:

- `SiteHeader`: static nav links and mobile-friendly CTA.
- `SiteFooter`: local service areas, contact links, and legal/basic info.
- `HeroZine`: expressive hero with layered labels and primary/secondary CTAs.
- `ServiceCard`: reusable card for each instrument.
- `PainPointGrid`: common student problems.
- `MethodSteps`: simple teaching method timeline.
- `TestimonialStrip`: local proof snippets.
- `ContactCta`: WhatsApp and form CTA block.
- `FaqAccordion`: accessible FAQ content rendered in static HTML.

## Nuxt Architecture

Expected setup command:

```bash
npx nuxi@latest init music-teacher-site
cd music-teacher-site
npm install
```

Static generation command:

```bash
npm run generate
```

Base Nuxt configuration:

- Use `ssr: true` because Nuxt SSG prerenders SSR output into static HTML.
- Set `nitro.prerender.routes` for all required routes.
- Use global `app.head` for default language, charset, viewport, theme color, and base social tags.
- Use page-level `useSeoMeta` for unique titles and descriptions.
- Use `useHead` for JSON-LD script tags.

## Content Requirements

Home meta:

- Title: `Clases de guitarra en La Reina | Profesor`
- Description: `Clases presenciales de guitarra y bajo en La Reina. Aprende con método, canciones reales y agenda por WhatsApp.`

Electric guitar meta:

- Title: `Clases de guitarra eléctrica en Santiago`
- Description: `Aprende riffs, técnica y canciones con clases presenciales cerca de La Reina. Agenda tu primera clase.`

Acoustic guitar meta:

- Title: `Clases de guitarra acústica en La Reina`
- Description: `Aprende acordes, rasgueos y canciones con clases presenciales de guitarra acústica. Escríbeme para agendar.`

Bass meta:

- Title: `Clases de bajo en Santiago | Profesor`
- Description: `Clases presenciales de bajo para trabajar groove, ritmo y técnica. Cerca de La Reina y Santiago Oriente.`

About meta:

- Title: `Profesor de guitarra y bajo en La Reina`
- Description: `Conoce el método de clases personalizadas para guitarra eléctrica, acústica y bajo en Santiago Oriente.`

Contact meta:

- Title: `Contacto | Clases de guitarra en La Reina`
- Description: `Agenda clases presenciales de guitarra o bajo en La Reina. Escríbeme por WhatsApp o envía el formulario.`

## Conversion Design

Primary CTA label examples:

- `Agendar por WhatsApp`
- `Quiero mi primera clase`
- `Escríbeme para coordinar`

Secondary CTA label examples:

- `Ver clases disponibles`
- `Conocer el método`
- `Enviar formulario`

WhatsApp links should use a prefilled Spanish message, for example:

`Hola, quiero consultar por clases presenciales de guitarra/bajo en La Reina. ¿Tienes horarios disponibles?`

## Constraints

- No dynamic server-rendered routes after build.
- No dependency on server APIs for initial SEO content.
- Avoid misleading nearby students by not overusing `La Reina` in service URLs.
- Preserve local relevance through copy and schema.
- Contact form must be compatible with static hosting.

## Testing And Verification

- Run `npm run generate` to verify static generation.
- Inspect generated HTML for key routes to confirm titles, descriptions, headings, and JSON-LD are present.
- Validate JSON-LD with a schema validator or Rich Results Test.
- Check mobile viewport layout for CTA visibility and readable typography.
- Confirm all internal links resolve to prerendered routes.
