# Controlled Chaos GSAP Design

## Goal

Add GSAP-powered motion that strengthens the zine gig-flyer identity without changing the site's static-first behavior, accessibility, or conversion clarity.

## Direction

Use a **Controlled Chaos** motion language: elements should feel pasted, stamped, snapped, and dropped into place like a physical flyer wall. Motion should be expressive but short, intentional, and never required to understand or use the site.

## Scope

Included:
- Homepage hero animation.
- Scroll-triggered section/card entry animation.
- Sticker and stamp snap-in animation.
- CTA hover/tap feedback.
- Reduced-motion support.
- Static-generation-safe client-only GSAP loading.
- Regression checks for GSAP usage and reduced-motion guardrails.

Excluded:
- Scroll-jacking.
- Infinite decorative loops.
- Audio-reactive or music-synced motion.
- Route transition overhaul.
- Rewriting layout or visual identity.

## Animation Moments

### Hero Poster Load

On first render, the hero should stage like a gig poster being assembled:
- Hero copy enters with a short upward slide and opacity reveal.
- The poster drops in with a slight rotation and hard stop.
- Tape strips land with a small offset and settle.
- Poster title blocks stagger in with quick scale/rotation snaps.
- Guitar strings draw horizontally across the poster.

Fallback: existing CSS layout remains visible and usable if JS is unavailable.

### Section Entry

Sections and cards should enter on scroll with a flyer-like pop:
- Cards move from slightly lower opacity and y-offset into place.
- Existing crooked rotations are preserved; GSAP should animate toward the final CSS transform rather than normalize everything.
- Shadows can settle subtly to reinforce the physical paper feel.

### Stickers And Stamps

`.sticker`, `.stamp`, and similar label elements should snap into place:
- Small scale from `0.92` to `1`.
- Tiny rotation correction.
- Fast easing, not bouncy toy-like motion.

### CTA Feedback

Buttons and CTA blocks should respond like a quick amplifier hit:
- On hover/focus-capable devices, buttons shift slightly and shadow changes remain tactile.
- On tap/click, a brief scale/position punch is acceptable.
- No constant pulsing.

## Technical Design

### GSAP Loading

Install `gsap` as a dependency. Load it only on the client inside lifecycle/composable code so Nuxt SSG does not evaluate GSAP during server rendering.

### Composable Boundary

Create a focused motion composable, likely `composables/useGsapMotion.ts`, responsible for:
- Detecting `prefers-reduced-motion`.
- Dynamically importing GSAP and ScrollTrigger only on the client.
- Registering ScrollTrigger.
- Providing cleanup via `gsap.context()` or equivalent teardown.

Component animation setup should stay component-local so each component owns its own refs/selectors and cleanup.

### Component Targets

Primary targets:
- `components/HeroZine.vue`
- `components/ServicePage.vue`
- `components/ContactCta.vue`
- `components/SiteFooter.vue`

Optional later targets:
- `components/ServiceCard.vue`
- `pages/contacto.vue` FAQ rows

## Accessibility And Performance

- Respect `prefers-reduced-motion: reduce`; when enabled, skip GSAP timelines and preserve static CSS presentation.
- Do not animate layout-critical values in ways that cause content jumps after hydration.
- Prefer transform and opacity animations.
- Keep durations short, generally under 800ms for entry moments.
- Do not create keyboard traps or hide focused content.
- Ensure links and buttons are usable before animations complete.

## Testing And Verification

Add source-level checks to `scripts/frontend-regression-check.mjs` for:
- GSAP dependency exists only if animation files use it.
- GSAP is loaded through client lifecycle or dynamic import, not top-level server execution.
- Reduced-motion handling exists in the motion composable.
- No scroll-jacking API or infinite repeat patterns are introduced.

Run:
- `npm run test:frontend`
- `npm run generate`

## Open Decisions

No product decisions remain open. The chosen direction is Controlled Chaos, with strict no-scroll-jacking and reduced-motion guardrails.
