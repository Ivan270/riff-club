# Heading And Instrument String Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve heading readability and correct visual string counts in homepage service cards.

**Architecture:** Keep the current Nuxt/Vue structure and Zine Gig-Flyer visual system. Make focused CSS/SFC edits to global typography tokens, local heading rules, and `ServiceCard` instrument marks only.

**Tech Stack:** Nuxt 3.17.0, Vue 3 Composition API with `<script setup>`, scoped SFC CSS, SSG via `npm run generate`.

---

## File Structure

- Modify: `assets/css/main.css` for display font stack and global `.display` readability.
- Modify: `components/HeroZine.vue` for poster type line-height/letter-spacing if needed.
- Modify: `components/ContactCta.vue` for H2 readability.
- Modify: `components/SiteFooter.vue` for H2 readability.
- Modify: `components/ServiceCard.vue` for H3 readability and correct electric/acoustic/bass string counts.
- Modify: `pages/index.vue` for homepage H2 readability.
- Modify: `pages/clases-guitarra-electrica.vue`, `pages/clases-guitarra-acustica.vue`, `pages/clases-bajo.vue`, `pages/contacto.vue` for local H1/H2 readability.

## Task 1: Heading Typography Refinement

**Files:**
- Modify: `assets/css/main.css`
- Modify: `components/HeroZine.vue`
- Modify: `components/ContactCta.vue`
- Modify: `components/SiteFooter.vue`
- Modify: `components/ServiceCard.vue`
- Modify: `pages/index.vue`
- Modify: `pages/clases-guitarra-electrica.vue`
- Modify: `pages/clases-guitarra-acustica.vue`
- Modify: `pages/clases-bajo.vue`
- Modify: `pages/contacto.vue`

- [ ] **Step 1: Write the failing typography check**

Run:

```bash
node - <<'NODE'
const fs = require('fs')
const files = [
  'assets/css/main.css',
  'components/HeroZine.vue',
  'components/ContactCta.vue',
  'components/SiteFooter.vue',
  'components/ServiceCard.vue',
  'pages/index.vue',
  'pages/clases-guitarra-electrica.vue',
  'pages/clases-guitarra-acustica.vue',
  'pages/clases-bajo.vue',
  'pages/contacto.vue'
]
const css = fs.readFileSync('assets/css/main.css', 'utf8')
const failures = []
if (/--font-display:\s*Impact/.test(css)) failures.push('font display still starts with Impact')
if (!/--font-display:\s*"Arial Black",\s*"Franklin Gothic Heavy",\s*Haettenschweiler,\s*Impact/.test(css)) failures.push('font display stack does not use approved order')
if (!/\.display\s*\{[^}]*line-height:\s*\.86[^}]*letter-spacing:\s*-\.035em/s.test(css)) failures.push('global display spacing not relaxed')
for (const file of files) {
  const src = fs.readFileSync(file, 'utf8')
  const risky = src.match(/(?:h1|h2|h3|\.poster-type span|\.display)[^{]*\{[^}]*(?:line-height:\s*\.(?:78|8|82)|letter-spacing:\s*-\.(?:09|08)em)[^}]*\}/g)
  if (risky) failures.push(`${file} still has risky heading spacing: ${risky.join(' | ')}`)
}
if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}
console.log('heading typography checks passed')
NODE
```

Expected: FAIL because current display stack starts with `Impact` and several heading rules use very tight spacing.

- [ ] **Step 2: Update global display typography**

In `assets/css/main.css`, change:

```css
--font-display: Impact, Haettenschweiler, "Arial Black", "Franklin Gothic Heavy", sans-serif;
```

to:

```css
--font-display: "Arial Black", "Franklin Gothic Heavy", Haettenschweiler, Impact, sans-serif;
```

Update `.display` to:

```css
.display {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(3rem, 14vw, 8.5rem);
  font-weight: 900;
  line-height: .86;
  letter-spacing: -.035em;
  text-transform: uppercase;
  text-wrap: balance;
}
```

- [ ] **Step 3: Relax local heading rules**

Apply these targeted replacements:

- In `pages/index.vue`, change homepage `h2` to `line-height: .92; letter-spacing: -.04em;`.
- In all three service pages, change `h1` to `line-height: .88; letter-spacing: -.045em;` and `h2` to `line-height: .94; letter-spacing: -.04em;`.
- In `pages/contacto.vue`, change `h2` to `line-height: .94; letter-spacing: -.04em;`.
- In `components/ContactCta.vue`, change `h2` to `line-height: .92; letter-spacing: -.04em;`.
- In `components/SiteFooter.vue`, change `h2` to `line-height: .96; letter-spacing: -.035em;`.
- In `components/ServiceCard.vue`, change `h3` to `line-height: .9; letter-spacing: -.04em;`.
- In `components/HeroZine.vue`, change `.poster-type span` to `line-height: .86; letter-spacing: -.045em;`.

- [ ] **Step 4: Verify typography check passes**

Run the Step 1 `node` command again.

Expected: PASS with `heading typography checks passed`.

## Task 2: Instrument String Count Fix

**Files:**
- Modify: `components/ServiceCard.vue`

- [ ] **Step 1: Write the failing string-count check**

Run:

```bash
node - <<'NODE'
const fs = require('fs')
const src = fs.readFileSync('components/ServiceCard.vue', 'utf8')
const failures = []
const spanCount = (src.match(/<span><\/span>/g) || []).length
if (spanCount < 6) failures.push(`ServiceCard only renders ${spanCount} spans; needs at least 6 for guitar strings`)
if (!src.includes('.instrument-mark.electric span:nth-child(6)')) failures.push('electric guitar does not define 6th string')
if (!src.includes('.instrument-mark.acoustic span:nth-child(6)')) failures.push('acoustic guitar does not define 6th string')
if (!src.includes('.instrument-mark.bass span:nth-child(4)') || src.includes('.instrument-mark.bass span:nth-child(4) { top: 55px; left: auto')) failures.push('bass 4th span should be a string, not a decorative circle')
if (!src.includes('.instrument-mark.bass::after')) failures.push('bass decorative dot/circle should move to pseudo-element')
if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}
console.log('instrument string count checks passed')
NODE
```

Expected: FAIL because the component renders only four spans and the bass 4th span is decorative.

- [ ] **Step 2: Render six spans in `ServiceCard.vue`**

Change the instrument mark template to:

```vue
<div class="instrument-mark" :class="variant" aria-hidden="true">
  <span></span><span></span><span></span><span></span><span></span><span></span>
</div>
```

- [ ] **Step 3: Define six guitar string positions**

For `.instrument-mark.electric span`, keep horizontal/angled lines and define six positions:

```css
.instrument-mark.electric span:nth-child(1) { top: 12px; }
.instrument-mark.electric span:nth-child(2) { top: 21px; }
.instrument-mark.electric span:nth-child(3) { top: 30px; }
.instrument-mark.electric span:nth-child(4) { top: 39px; }
.instrument-mark.electric span:nth-child(5) { top: 48px; }
.instrument-mark.electric span:nth-child(6) { top: 57px; }
```

For `.instrument-mark.acoustic span`, ensure the first six spans are visible string/fret lines and move the decorative soundhole/circle to pseudo-elements. Define six positions such as `left: 14%`, `24%`, `34%`, `44%`, `54%`, `64%`.

- [ ] **Step 4: Define four bass strings and pseudo-element decoration**

For `.instrument-mark.bass span`, only the first four spans should be visible strings:

```css
.instrument-mark.bass span:nth-child(1) { top: 15px; }
.instrument-mark.bass span:nth-child(2) { top: 29px; }
.instrument-mark.bass span:nth-child(3) { top: 43px; }
.instrument-mark.bass span:nth-child(4) { top: 57px; }
.instrument-mark.bass span:nth-child(n + 5) { display: none; }
.instrument-mark.bass::after { ... decorative dot/circle ... }
```

Move the old decorative circle from `span:nth-child(4)` to `.instrument-mark.bass::after`.

- [ ] **Step 5: Verify string-count check passes**

Run the Step 1 `node` command again.

Expected: PASS with `instrument string count checks passed`.

## Task 3: Final Verification

**Files:**
- Inspect generated output from `.output/public`.

- [ ] **Step 1: Run both static checks**

Run the Task 1 typography check and Task 2 string-count check.

Expected: both PASS.

- [ ] **Step 2: Run static generation**

Run:

```bash
npm run generate
```

Expected: PASS with `.output/public` generated and all configured routes prerendered.

- [ ] **Step 3: Check git state**

Run:

```bash
git status --short
```

Expected in this workspace: `fatal: not a git repository...`. If still not a repository, skip commit.

## Self-Review

- Spec coverage: Plan covers display font ordering, heading spacing, exact risky values, electric/acoustic six-string marks, bass four-string mark, API preservation, and SSG verification.
- Placeholder scan: No implementation placeholders are present.
- Type consistency: `ServiceCard` keeps the existing `variant: 'electric' | 'acoustic' | 'bass'` prop API.
