# Zine Gig-Flyer Redesign Spec

## Goal

Upgrade the current Nuxt 3 SSG music teacher site from a functional dark landing page with zine accents into a cohesive, production-grade Zine Gig-Flyer visual system across all pages.

## Approved Direction

Use the **Zine Gig-Flyer System** approach: the site should feel like a photocopied local music flyer for in-person guitar and bass lessons in La Reina. It should be expressive, memorable, and underground without sacrificing readability, local SEO, conversion clarity, or static-generation performance.

## Scope

This is a full visual system pass.

Included:

- Global CSS design tokens and primitives.
- Header and footer styling.
- Hero poster composition.
- Service cards with instrument-specific visual details.
- Homepage rhythm and section treatments.
- Contact CTA as a flyer/tear-off module.
- Service, about, and contact page visual consistency.
- Accessibility-preserving focus states, contrast, mobile layout, and reduced-motion support.

Excluded:

- Copy rewrites beyond small label and visual-context text changes.
- SEO metadata or schema changes unless needed to preserve existing behavior.
- New backend, CMS, animation library, or dynamic rendering.
- Real production integrations for WhatsApp, Formspree, or canonical domain.

## Visual Principles

- **Photocopied local flyer:** off-white paper, black ink, rough borders, clipped labels, poster slabs, hard shadows, halftone and grain.
- **Music-specific marks:** fret lines, strings, pick shapes, knob dots, waveform/groove marks, setlist numbering.
- **Controlled chaos:** staggered cards, slight rotations, overlapping labels, asymmetry, but the main CTA and text hierarchy must remain clear.
- **Local conversion:** every visually loud section still needs a clear path to WhatsApp or contact.

## Global Design System

Update `assets/css/main.css` with:

- Expanded color tokens:
  - ink black
  - photocopy black
  - aged paper
  - paper warm
  - acid yellow
  - signal red
  - electric purple
  - tape beige
  - muted ink
- Typography tokens:
  - display stack with narrow/heavy poster-like fallbacks.
  - body stack that avoids `Inter` as the first choice.
  - mono stack for labels and metadata.
- Surface utilities:
  - `.paper-panel`
  - `.zine-card`
  - `.stamp`
  - `.tape`
  - `.halftone`
  - `.tear-edge`
- Interaction states:
  - visible `:focus-visible`
  - tactile hover transforms on links/buttons/cards
  - reduced-motion media query that disables transforms/animations.
- Body atmosphere:
  - layered radial/linear background.
  - subtle fixed grain texture using CSS pseudo-element or background gradients.

## Component Changes

### `SiteHeader.vue`

- Preserve route-aware `Inicio` link.
- Keep scrollbar fix: no auto overflow scrollbars.
- Add active-route styling using route path checks.
- Make header feel like a clipped flyer strip with dashed bottom border, stamp-like CTA, and hover underline/highlighter states.

### `HeroZine.vue`

- Keep H1 and CTAs unchanged for SEO/conversion.
- Replace simple poster block with a layered poster composition:
  - Riff Club Local stacked type.
  - faux tape corners.
  - fret/string line motif.
  - halftone or grain layer.
  - local label such as `La Reina / Santiago Oriente`.
  - setlist number or `01` artifact.
- Add CSS-only entrance animation with reduced-motion fallback.

### `ServiceCard.vue`

- Add a `variant` prop: `electric`, `acoustic`, or `bass`.
- Render a decorative visual based on the variant:
  - electric: angled string/fret lines and pick shape.
  - acoustic: soundhole circle and chord grid.
  - bass: four thick string lines and groove dots.
- Keep card content semantic and readable.
- Preserve `title`, `text`, `to`, and `label` props.

### `ContactCta.vue`

- Redesign as a flyer tear-off/booking module:
  - off-white inner paper surface.
  - perforated bottom or side marks.
  - fluorescent WhatsApp sticker.
  - secondary form action as stamped link.
- Preserve existing WhatsApp URL and `/contacto` link.

### `SiteFooter.vue`

- Make the footer feel like the bottom of a flyer/poster stack.
- Keep local service-area copy and CTA.

## Page Changes

### Home Page

- Keep SEO metadata and JSON-LD intact.
- Rework visual layout only:
  - pain points become staggered pasted notes.
  - service cards use new variants.
  - method block becomes a numbered setlist or lesson route panel.
  - add stronger section separators using tape/stamp motifs.

### Service Pages

- Keep page SEO metadata and copy intact.
- Apply a more distinctive inner-page layout:
  - hero label as instrument badge.
  - main content panel as paper flyer.
  - area panel as local stamp or venue note.
  - related links as torn stickers.

### About Page

- Keep SEO metadata and copy intact.
- Turn the three method steps into a zine setlist with numbered blocks and paper layering.

### Contact Page

- Keep FAQPage JSON-LD and visible FAQ content intact.
- Style form as a clipped paper submission card.
- Style FAQ as folded flyer rows or stapled notes.

## Accessibility And Performance Requirements

- Preserve one visible H1 per page.
- Preserve existing semantic sections and labels.
- Maintain readable contrast for all body text and CTAs.
- Keep keyboard focus visible and not hidden by transforms.
- Avoid horizontal scrollbar regressions.
- Add `prefers-reduced-motion` handling.
- Use CSS-only visual effects; no heavy animation library.
- Keep SSG output passing with `npm run generate`.

## Verification

- Run a static code check for required component changes where practical.
- Run `npm run generate`.
- Confirm generated pages still prerender.
- Spot-check that header has no `overflow-x: auto`.
- Spot-check `ServiceCard` calls include the new `variant` prop.
- Confirm existing JSON-LD code remains in `pages/index.vue` and `pages/contacto.vue`.
