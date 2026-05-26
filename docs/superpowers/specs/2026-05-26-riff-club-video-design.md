# Riff Club HyperFrames Promo Design

## Goal

Create a 20-second vertical product promo video for the Riff Club music teacher site in a new HyperFrames project at `riff-club-video`.

## Approved Direction

- Format: 9:16 vertical video for Reels, TikTok, Shorts, and mobile-first social placements.
- Style: Controlled Brutalist Precision.
- Source treatment: stylized recreations of page sections, not screenshots or live embeds.
- Audio: music bed only. The video must remain effective without audio if no local track is provided.
- Technology: HyperFrames HTML composition using HTML, CSS, vanilla JS, and GSAP. No React.
- Required delivery notes: include preview and render instructions using pnpm.

## Brand System

Use the web page palette as the video brand source:

- Black stage: `#050505` and `#101010`.
- Paper: `#fff7e8`.
- Acid accent: `#d8ff00`.
- Red accent: `#ff3b30`.
- Purple accent: `#a855f7`.

The video should feel premium and clean, not messy. Use brutalist edges, hard borders, large type, registration marks, zine stamps, guitar-string motifs, and precise color blocks. Avoid generic gradients and web-sized UI. Every frame should have visible foreground content, structural accents, and background texture.

Typography should be oversized, uppercase, condensed, and readable. Use built-in system display fallbacks compatible with HyperFrames such as `Impact`, `Haettenschweiler`, `Franklin Gothic Heavy`, and `Arial Black` for display type, plus a monospace stack for metadata and captions. Do not use banned generic composition defaults such as Inter, Roboto, Poppins, or Syne.

## Runtime And Composition Rules

- The root composition duration is exactly 20 seconds.
- Canvas is 1080x1920.
- Use a single standalone `index.html` with a top-level element carrying `data-composition-id="riff-club-promo"`.
- Register a paused GSAP timeline synchronously at `window.__timelines["riff-club-promo"]`.
- Use no React and no framework code.
- Use GSAP timelines with deterministic timing. Do not use `Math.random()`, `Date.now()`, async timeline construction, `setTimeout`, or infinite repeats.
- Use no `repeat: -1`.
- Use scene transitions between all scenes. Do not jump cut.
- Use entrance animations for every scene. Scene exits should be handled by transition overlays, except the final title card may fade down near the end.
- Prefer `fromTo()` for clip-scoped entrance states to keep HyperFrames seeking deterministic.
- Use transform and opacity animation properties, not layout dimensions.
- Keep captions readable at all key timestamps.

## Scene Plan

### Scene 1: Title Reveal, 0-2s

Concept: The frame opens like a brutalist club poster being stamped onto black concrete. `RIFF CLUB` lands in two stacked blocks with red and acid impact bars.

Content:

- Main title: `RIFF CLUB`.
- Caption: `Clases presenciales en La Reina`.
- Metadata label: `20s teaser / Santiago Oriente`.

Motion:

- Red block punches in from the side.
- Acid underline scales across the title.
- Title letters slam upward with a tiny rotation correction.
- Transition to Scene 2 uses a fast vertical block wipe.

### Scene 2: Hero Section Recreation, 2-8s

Concept: The website hero is reimagined as a premium mobile poster. A clean black content column faces a paper card that says Riff Club, with guitar strings running through the card.

Content:

- `Clases de guitarra en La Reina`.
- `Metodo, canciones reales y ruta clara`.
- `Guitarra electrica / acustica / bajo`.
- CTA chip: `Agendar por WhatsApp`.

Motion:

- Hero title enters in staggered type chunks.
- Poster card drops in with a controlled skew and settles.
- Guitar strings draw across the card.
- CTA chip stamps in last.
- Transition to Scene 3 uses a red/black shutter wipe timed to the string impact.

### Scene 3: Guitar String Impact, 9-12s

Concept: Six guitar strings become the whole visual system. They hit the frame like tuned steel cables and trigger labels for the method.

Content:

- Caption: `Practica con foco`.
- Impact labels: `Tecnica`, `Ritmo`, `Sonido`, `Groove`.

Motion:

- Six horizontal strings impact from alternating directions.
- Small red and acid flash blocks appear at string endpoints.
- Labels punch in as if attached to the vibration.
- Transition to Scene 4 uses a tight zoom-through / block wipe hybrid.

### Scene 4: Services, 13-16s

Concept: Three crisp service cards appear like premium setlist tiles. Each instrument has a distinct accent but a unified grid.

Content:

- `Electrica` / `Riffs, tecnica, sonido`.
- `Acustica` / `Acordes, ritmo, canciones`.
- `Bajo` / `Groove, base, digitacion`.

Motion:

- Cards cascade in with different directions and slight rotations.
- Accent bars scan across each card.
- Instrument labels remain large enough to read quickly.
- Transition to Scene 5 uses a purple block wipe and short blur.

### Scene 5: Final Title Card, 17-20s

Concept: The brand resolves into a premium black-and-paper title card. It should feel like the final frame of a music club teaser.

Content:

- `RIFF CLUB`.
- `Agenda tu clase`.
- `La Reina / Santiago Oriente`.
- CTA caption: `Guitarra electrica · Acustica · Bajo`.

Motion:

- Logo/title assembles from blocks.
- CTA text enters as a crisp footer caption.
- Final 0.4s may dip down subtly to black or hold cleanly.

## Captions

Captions are visual labels, not subtitles for voiceover. They must be large, high contrast, and readable on mobile. Use paper or acid blocks behind short captions where needed. Avoid long sentences; use short phrases from the site.

## Audio

The project should support an optional local music file at `assets/music.mp3`. If the file exists, include it as a separate `<audio>` clip with `data-start="0"`, `data-duration="20"`, `data-track-index="2"`, and a conservative volume such as `0.75`. If no file is present during implementation, ship the composition silent and document where to place `assets/music.mp3`.

## File Structure

Create:

- `riff-club-video/index.html`: HyperFrames composition source.
- `riff-club-video/package.json`: pnpm scripts for lint, inspect, preview, and render.
- `riff-club-video/README.md`: preview and render instructions using pnpm.
- `riff-club-video/assets/`: optional folder for `music.mp3`.

Do not create React files. Do not capture the live website into iframes. Use stylized HTML/CSS recreation.

## Verification

Run in `riff-club-video`:

- `pnpm install`
- `pnpm hyperframes lint`
- `pnpm hyperframes validate`
- `pnpm hyperframes inspect`

Render command should be documented as:

- `pnpm hyperframes render --output renders/riff-club-promo.mp4 --fps 30 --quality standard`

Preview command should be documented as:

- `pnpm hyperframes preview`

## Out Of Scope

- No screenshots of the live site.
- No voiceover.
- No generated TTS.
- No React or Remotion.
- No external paid assets.
- No infinite decorative loops.
