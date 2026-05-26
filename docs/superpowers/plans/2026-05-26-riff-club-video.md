# Riff Club HyperFrames Promo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 20-second 9:16 HyperFrames product promo video for Riff Club in `riff-club-video`.

**Architecture:** Use a standalone HyperFrames HTML composition with a single paused GSAP master timeline registered as `riff-club-promo`. The composition recreates the site as premium brutalist motion graphics, not screenshots, and ships with pnpm-based scripts plus a small source regression check.

**Tech Stack:** HyperFrames CLI, HTML, CSS, vanilla JS, GSAP, pnpm.

---

## File Structure

- Create `riff-club-video/` using `pnpm dlx hyperframes init riff-club-video --example blank --non-interactive`.
- Modify `riff-club-video/index.html`: complete 1080x1920 composition, inline CSS, GSAP timeline, optional audio clip.
- Modify `riff-club-video/package.json`: pnpm scripts for `hyperframes`, `lint`, `validate`, `inspect`, `preview`, `render`, and `test:composition`.
- Create `riff-club-video/scripts/check-composition.mjs`: source-level checks for duration, format, required content, GSAP registration, no React, no infinite repeats, and pnpm docs.
- Create `riff-club-video/assets/.gitkeep`: keeps optional audio directory in git.
- Modify `riff-club-video/README.md`: concise preview/render/audio instructions using pnpm.

## Task 1: Scaffold HyperFrames Project

**Files:**
- Create: `riff-club-video/`

- [ ] **Step 1: Verify target folder does not exist**

Run:

```bash
test ! -e riff-club-video
```

Expected: exit 0. If it exists, stop and inspect before modifying it.

- [ ] **Step 2: Scaffold with HyperFrames CLI using pnpm**

Run:

```bash
pnpm dlx hyperframes init riff-club-video --example blank --non-interactive
```

Expected: `riff-club-video` is created with a HyperFrames starter project.

- [ ] **Step 3: Inspect scaffolded files**

Run:

```bash
git status --short riff-club-video
```

Expected: new `riff-club-video` files are untracked.

- [ ] **Step 4: Commit scaffold**

Run:

```bash
git add riff-club-video
git commit -m "chore: scaffold riff club video"
```

Expected: scaffold commit succeeds.

## Task 2: Add Composition Regression Check

**Files:**
- Create: `riff-club-video/scripts/check-composition.mjs`
- Modify: `riff-club-video/package.json`

- [ ] **Step 1: Create the failing checker**

Create `riff-club-video/scripts/check-composition.mjs`:

```js
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
```

- [ ] **Step 2: Add script to package.json**

Update `riff-club-video/package.json` scripts to include:

```json
{
  "test:composition": "node scripts/check-composition.mjs"
}
```

Preserve existing scaffold scripts and fields.

- [ ] **Step 3: Run checker to verify RED**

Run:

```bash
pnpm test:composition
```

Expected: FAIL because the blank scaffold does not yet contain the Riff Club composition content.

- [ ] **Step 4: Commit failing checker**

Run:

```bash
git add riff-club-video/package.json riff-club-video/scripts/check-composition.mjs
git commit -m "test: add riff club video checks"
```

Expected: commit succeeds with the intentionally failing source check in place.

## Task 3: Add Project Scripts And README

**Files:**
- Modify: `riff-club-video/package.json`
- Modify: `riff-club-video/README.md`
- Create: `riff-club-video/assets/.gitkeep`

- [ ] **Step 1: Update package scripts**

Ensure `riff-club-video/package.json` contains these scripts:

```json
{
  "scripts": {
    "hyperframes": "hyperframes",
    "lint": "hyperframes lint",
    "validate": "hyperframes validate",
    "inspect": "hyperframes inspect",
    "preview": "hyperframes preview",
    "render": "hyperframes render --output renders/riff-club-promo.mp4 --fps 30 --quality standard",
    "test:composition": "node scripts/check-composition.mjs"
  }
}
```

If the scaffold already has a compatible dependency for the CLI, keep it. If it does not, add the HyperFrames package dependency used by the scaffold rather than inventing a second CLI package name.

- [ ] **Step 2: Add audio directory placeholder**

Create `riff-club-video/assets/.gitkeep` as an empty file.

- [ ] **Step 3: Replace README content**

Write `riff-club-video/README.md`:

```md
# Riff Club Video

20-second 9:16 HyperFrames promo for Riff Club.

## Setup

```bash
pnpm install
```

## Preview

```bash
pnpm preview
```

## Validate

```bash
pnpm lint
pnpm validate
pnpm inspect
pnpm test:composition
```

## Render

```bash
pnpm render
```

This writes `renders/riff-club-promo.mp4`.

## Optional Music Bed

Place a royalty-free music file at `assets/music.mp3`. The composition is designed to work without audio if that file is absent during preview or render.
```

- [ ] **Step 4: Run checker to verify still RED**

Run:

```bash
pnpm test:composition
```

Expected: FAIL only for missing composition content in `index.html`.

- [ ] **Step 5: Commit docs and scripts**

Run:

```bash
git add riff-club-video/package.json riff-club-video/README.md riff-club-video/assets/.gitkeep
git commit -m "docs: add riff club video pnpm workflow"
```

Expected: commit succeeds.

## Task 4: Implement Static Composition Layout

**Files:**
- Modify: `riff-club-video/index.html`

- [ ] **Step 1: Replace index.html with static end-state layout**

Write `riff-club-video/index.html` as a standalone composition with:

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Riff Club Promo</title>
  </head>
  <body>
    <div id="riff-club-promo" data-composition-id="riff-club-promo" data-start="0" data-duration="20" data-width="1080" data-height="1920" data-track-index="0">
      <div class="grain" data-layout-ignore></div>
      <div class="scene scene-title" data-scene="title">
        <div class="meta">20s teaser / Santiago Oriente</div>
        <div class="title-stack"><span>Riff</span><span>Club</span></div>
        <div class="caption">Clases presenciales en La Reina</div>
        <div class="red-block"></div>
        <div class="acid-rule"></div>
      </div>
      <div class="scene scene-hero" data-scene="hero">
        <div class="hero-copy">
          <div class="kicker">Metodo, canciones reales y ruta clara</div>
          <h1>Clases de guitarra en La Reina</h1>
          <p>Guitarra electrica / acustica / bajo</p>
          <div class="cta-chip">Agendar por WhatsApp</div>
        </div>
        <div class="poster-card">
          <div class="poster-local">La Reina / Santiago Oriente</div>
          <div class="poster-logo"><span>Riff</span><span>Club</span></div>
          <div class="poster-note">Ruta clara para practicar</div>
          <div class="poster-strings"><span></span><span></span><span></span><span></span><span></span><span></span></div>
        </div>
      </div>
      <div class="scene scene-strings" data-scene="strings">
        <div class="caption slab">Practica con foco</div>
        <div class="impact-strings"><span></span><span></span><span></span><span></span><span></span><span></span></div>
        <div class="impact-labels"><b>Tecnica</b><b>Ritmo</b><b>Sonido</b><b>Groove</b></div>
      </div>
      <div class="scene scene-services" data-scene="services">
        <div class="section-label">Elige tu instrumento</div>
        <article class="service-card electric"><h2>Electrica</h2><p>Riffs, tecnica, sonido</p></article>
        <article class="service-card acoustic"><h2>Acustica</h2><p>Acordes, ritmo, canciones</p></article>
        <article class="service-card bass"><h2>Bajo</h2><p>Groove, base, digitacion</p></article>
      </div>
      <div class="scene scene-final" data-scene="final">
        <div class="final-frame">
          <div class="title-stack"><span>Riff</span><span>Club</span></div>
          <h2>Agenda tu clase</h2>
          <p>La Reina / Santiago Oriente</p>
          <div class="caption">Guitarra electrica · Acustica · Bajo</div>
        </div>
      </div>
      <div class="transition transition-a"></div>
      <div class="transition transition-b"></div>
      <div class="transition transition-c"></div>
      <div class="transition transition-d"></div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });
      window.__timelines["riff-club-promo"] = tl;
    </script>
  </body>
</html>
```

Then add CSS in the same file before the closing `</head>` with final-state positioning for all scenes. Use literal colors from the design spec, not CSS variables. Set scenes to absolute full-frame layers and use opacity to reveal the active scene. Do not add animation yet.

- [ ] **Step 2: Run composition check**

Run:

```bash
pnpm test:composition
```

Expected: PASS for source checks, even though animation is not yet complete.

- [ ] **Step 3: Commit static layout**

Run:

```bash
git add riff-club-video/index.html
git commit -m "feat: add riff club video layout"
```

Expected: commit succeeds.

## Task 5: Add GSAP Timeline And Transitions

**Files:**
- Modify: `riff-club-video/index.html`

- [ ] **Step 1: Add scene visibility timeline**

In the existing script, replace the empty timeline body with synchronous GSAP setup:

```js
const tl = gsap.timeline({ paused: true, defaults: { overwrite: 'auto' } });

tl.set('.scene', { opacity: 0 }, 0);
tl.set('.scene-title', { opacity: 1 }, 0);
tl.set('.scene-hero', { opacity: 1 }, 2);
tl.set('.scene-strings', { opacity: 1 }, 9);
tl.set('.scene-services', { opacity: 1 }, 13);
tl.set('.scene-final', { opacity: 1 }, 17);
```

- [ ] **Step 2: Add title scene entrances**

Add `fromTo()` tweens for `.scene-title .meta`, `.scene-title .title-stack span`, `.scene-title .caption`, `.scene-title .red-block`, and `.scene-title .acid-rule` between `0.15` and `1.3` seconds. Use varied entrances: x movement, y movement, scaleX, rotation correction, and opacity.

- [ ] **Step 3: Add title-to-hero transition**

Use `.transition-a` as a full-frame red/black vertical block wipe from `1.72` to `2.12`. The outgoing title remains visible until the wipe covers it. Set `.scene-title` opacity to 0 after the wipe covers the frame.

- [ ] **Step 4: Add hero scene entrances**

Add `fromTo()` tweens between `2.15` and `4.2` for hero text, poster card, poster strings, logo spans, and CTA chip. Add a subtle ambient scale or drift on a child accent only, not on the same element used for entrance transforms.

- [ ] **Step 5: Add hero-to-strings transition**

Use `.transition-b` as a shutter wipe from `8.72` to `9.05`. Set `.scene-hero` opacity to 0 after the wipe covers the frame.

- [ ] **Step 6: Add string impact entrances**

Add `fromTo()` tweens between `9.1` and `10.8` for six strings, impact flashes, and four labels. Strings should enter from alternating x directions and settle at full-frame width.

- [ ] **Step 7: Add strings-to-services transition**

Use `.transition-c` as a zoom/block wipe from `12.72` to `13.05`. Set `.scene-strings` opacity to 0 after the wipe covers the frame.

- [ ] **Step 8: Add services entrances**

Add `fromTo()` tweens between `13.1` and `14.7` for the section label and three service cards. Cards must enter from different directions and rotations. Accent bars scan across each card.

- [ ] **Step 9: Add services-to-final transition**

Use `.transition-d` as a purple block wipe from `16.72` to `17.05`. Set `.scene-services` opacity to 0 after the wipe covers the frame.

- [ ] **Step 10: Add final title card entrances and end hold**

Add `fromTo()` tweens between `17.1` and `18.5` for final title, CTA, location, and instrument caption. Add a final subtle fade/dip from `19.6` to `20.0` if it does not hurt readability.

- [ ] **Step 11: Register timeline**

Ensure the script still ends with:

```js
window.__timelines["riff-club-promo"] = tl;
```

- [ ] **Step 12: Run source check**

Run:

```bash
pnpm test:composition
```

Expected: PASS.

- [ ] **Step 13: Commit animation**

Run:

```bash
git add riff-club-video/index.html
git commit -m "feat: animate riff club promo"
```

Expected: commit succeeds.

## Task 6: Add Optional Music Clip Support

**Files:**
- Modify: `riff-club-video/index.html`
- Modify: `riff-club-video/README.md`

- [ ] **Step 1: Add documented audio snippet as inactive-by-default guidance**

Because `assets/music.mp3` may not exist, do not add a broken `<audio>` source by default. Add this comment near the end of the composition root:

```html
<!-- Optional music bed:
  Add assets/music.mp3, then uncomment:
  <audio id="music-bed" data-start="0" data-duration="20" data-track-index="2" src="assets/music.mp3" data-volume="0.75"></audio>
-->
```

- [ ] **Step 2: Ensure README explains enabling audio**

Ensure `riff-club-video/README.md` includes:

```md
To render with music, place a royalty-free file at `assets/music.mp3`, then uncomment the `music-bed` audio element in `index.html`.
```

- [ ] **Step 3: Run source check**

Run:

```bash
pnpm test:composition
```

Expected: PASS because the optional music path is documented.

- [ ] **Step 4: Commit optional audio docs**

Run:

```bash
git add riff-club-video/index.html riff-club-video/README.md
git commit -m "docs: document riff club music bed"
```

Expected: commit succeeds.

## Task 7: HyperFrames Validation And Layout Fixes

**Files:**
- Modify if needed: `riff-club-video/index.html`

- [ ] **Step 1: Install dependencies**

Run:

```bash
pnpm install
```

Expected: dependencies install successfully.

- [ ] **Step 2: Run HyperFrames lint**

Run:

```bash
pnpm lint
```

Expected: PASS. Fix any missing composition attributes, overlapping tracks, or timeline registration errors before continuing.

- [ ] **Step 3: Run HyperFrames validate**

Run:

```bash
pnpm validate
```

Expected: PASS. If contrast warnings appear, adjust existing palette usage only by changing foreground/background pairing, not by inventing new brand colors.

- [ ] **Step 4: Run HyperFrames inspect**

Run:

```bash
pnpm inspect
```

Expected: PASS or only intentional decorative overflow marked with `data-layout-ignore` / `data-layout-allow-overflow`.

- [ ] **Step 5: Run source check**

Run:

```bash
pnpm test:composition
```

Expected: PASS.

- [ ] **Step 6: Commit validation fixes**

If any files changed, run:

```bash
git add riff-club-video
git commit -m "fix: validate riff club video composition"
```

Expected: commit succeeds if changes were needed. If no files changed, skip commit.

## Task 8: Final Render Smoke Test And Handoff

**Files:**
- Modify if needed: `riff-club-video/README.md`

- [ ] **Step 1: Run final checks**

Run:

```bash
pnpm test:composition
pnpm lint
pnpm validate
pnpm inspect
```

Expected: all pass.

- [ ] **Step 2: Run render command**

Run:

```bash
pnpm render
```

Expected: render succeeds and writes `renders/riff-club-promo.mp4`.

- [ ] **Step 3: Inspect git status**

Run:

```bash
git status --short
```

Expected: source changes are committed or intentionally staged for final commit. Render output may be untracked depending on `.gitignore`; do not commit rendered MP4 unless the user explicitly asks.

- [ ] **Step 4: Final commit if README changed**

If README or source changed during final verification, run:

```bash
git add riff-club-video/README.md riff-club-video/index.html riff-club-video/package.json riff-club-video/scripts/check-composition.mjs riff-club-video/assets/.gitkeep
git commit -m "docs: finalize riff club video handoff"
```

Expected: commit succeeds if changes were needed.

## Self-Review

- Spec coverage: project folder, 20s duration, 9:16 format, no React, HTML/CSS/vanilla JS, GSAP timeline, captions, services/method/FAQ-adjacent method content, optional music bed, pnpm instructions, preview/render commands, and verification are covered.
- Placeholder scan: no TBD/TODO/fill-in steps remain. Implementation tasks name exact files, commands, expected outputs, and required content.
- Type/name consistency: composition id is consistently `riff-club-promo`; folder is consistently `riff-club-video`; scripts consistently use pnpm.
