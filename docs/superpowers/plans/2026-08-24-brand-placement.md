# Brand Placement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Use a compact theme-aware badge in the navbar and move the horizontal Riff Club signature into the homepage Hero poster.

**Architecture:** Keep theme selection local to `SiteHeader.vue`, following its current computed-asset pattern. Reuse `/logo-full-light.svg` on the fixed Old Lace poster surface in `HeroZine.vue`, replacing only the decorative `Riff`, `Club`, and `01` elements while retaining the existing composition and GSAP timeline.

**Tech Stack:** Nuxt 3.17, Vue 3 Composition API, scoped CSS, GSAP through `useGsapMotion`, Node regression script.

---

## File Map

- Create: `public/badge-navbar-dark.svg` from `masters/logotipo/badge-v-circular-negative.svg`.
- Create: `public/badge-navbar-light.svg` from `masters/logotipo/badge-v-circular-positive.svg`.
- Modify: `components/SiteHeader.vue` to choose and size the badge.
- Modify: `components/HeroZine.vue` to replace decorative text with the horizontal logo.
- Modify: `scripts/frontend-regression-check.mjs` to validate assets, markup, accessibility, and removed decorative elements.

### Task 1: Add Theme-Aware Navbar Badges

**Files:**
- Create: `public/badge-navbar-dark.svg`
- Create: `public/badge-navbar-light.svg`
- Modify: `scripts/frontend-regression-check.mjs`

- [ ] **Step 1: Add failing asset and header-contract checks**

Add assertions to `scripts/frontend-regression-check.mjs`:

```js
assert(header.includes('/badge-navbar-dark.svg'), 'SiteHeader must render the dark theme badge')
assert(header.includes('/badge-navbar-light.svg'), 'SiteHeader must render the light theme badge')
assert(header.includes('class="brand-badge"'), 'SiteHeader must expose the navbar badge class')
assert(!header.includes('class="brand-logo"'), 'SiteHeader must not keep the horizontal navbar logo')

for (const asset of ['public/badge-navbar-dark.svg', 'public/badge-navbar-light.svg']) {
  assert(existsSync(new URL(`../${asset}`, import.meta.url)), `${asset} must exist`)
  assert(read(asset).includes('<svg'), `${asset} must contain valid SVG markup`)
}
```

- [ ] **Step 2: Run the regression to verify RED**

Run: `pnpm test:frontend`

Expected: FAIL for missing badge references, class, and files.

- [ ] **Step 3: Copy only the two approved badge masters**

Source mapping:

```text
masters/logotipo/badge-v-circular-negative.svg -> public/badge-navbar-dark.svg
masters/logotipo/badge-v-circular-positive.svg -> public/badge-navbar-light.svg
```

Do not copy the neutral badge or additional logo-system files.

### Task 2: Replace the Navbar Logo

**Files:**
- Modify: `components/SiteHeader.vue:1-7,18-22,79-91`

- [ ] **Step 1: Replace the computed horizontal logo source**

Use:

```ts
const badgeSrc = computed(() =>
  theme.value === "light" ? "/badge-navbar-light.svg" : "/badge-navbar-dark.svg",
);
```

- [ ] **Step 2: Render the accessible badge**

Replace the navbar image with:

```vue
<img class="brand-badge" :src="badgeSrc" alt="Riff Club" />
```

Keep the surrounding `NuxtLink`, destination, and `aria-label` unchanged.

- [ ] **Step 3: Apply the approved compact size**

Replace `.brand-logo` with:

```css
.brand-badge {
  display: block;
  width: clamp(68px, 5vw, 72px);
  height: auto;
}
```

Expected: the sticky navbar remains compact, the SVG stays square, and the badge is not clipped.

- [ ] **Step 4: Run the regression**

Run: `pnpm test:frontend`

Expected: badge header checks pass; Hero checks added in Task 3 may still fail.

### Task 3: Move the Horizontal Logo Into the Hero Poster

**Files:**
- Modify: `components/HeroZine.vue:38-50,101-112,237-270,288-297`
- Modify: `scripts/frontend-regression-check.mjs`

- [ ] **Step 1: Add failing Hero-contract checks**

Add:

```js
assert(hero.includes('class="poster-brand"'), 'Hero poster must include the horizontal brand signature')
assert(hero.includes('src="/logo-full-light.svg"'), 'Hero poster must use the Onyx horizontal logo')
assert(hero.includes('alt="" aria-hidden="true"'), 'Hero poster logo must be decorative')
assert(!hero.includes('<div class="poster-type">'), 'Hero poster must remove the duplicate Riff Club lettering')
assert(!hero.includes('<b>01</b>'), 'Hero poster must remove the legacy serial')
```

- [ ] **Step 2: Run the regression to verify RED**

Run: `pnpm test:frontend`

Expected: FAIL for the missing poster logo and remaining decorative text.

- [ ] **Step 3: Replace poster lettering with the logo**

Use:

```vue
<div class="poster-brand">
  <img src="/logo-full-light.svg" alt="" aria-hidden="true" />
</div>
```

Remove `.poster-type` markup and `<b>01</b>`. Keep `.poster-local`, `.string-lines`, and `.poster-note` unchanged.

- [ ] **Step 4: Update the GSAP selector**

Replace the `.poster-type span` animation target with `.poster-brand`, retaining the same timeline position and a single entrance:

```ts
.from(
  ".poster-brand",
  {
    x: -24,
    opacity: 0,
    rotate: -5,
    scale: 0.94,
    duration: 0.38,
    ease: "back.out(1.6)",
  },
  "-=0.14",
)
```

- [ ] **Step 5: Replace the lettering and serial CSS**

Use:

```css
.poster-brand {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  min-height: 190px;
  margin-top: 30px;
  padding: 22px 16px;
  background: color-mix(in srgb, var(--paper) 84%, transparent);
  border: 3px solid var(--ink);
  box-shadow: 8px 8px 0 var(--acid);
  transform: rotate(-2deg);
}

.poster-brand img {
  display: block;
  width: min(100%, 300px);
  min-width: min(180px, 100%);
  height: auto;
}
```

Remove the obsolete `.poster-type`, `.poster-type span`, nth-child, and `.poster b` rules.

- [ ] **Step 6: Run the regression to verify GREEN**

Run: `pnpm test:frontend`

Expected: `Frontend regression checks passed`.

### Task 4: Verify Build and Runtime

**Files:**
- Verify: `components/SiteHeader.vue`
- Verify: `components/HeroZine.vue`
- Verify: `public/badge-navbar-dark.svg`
- Verify: `public/badge-navbar-light.svg`
- Verify: `.output/public/`

- [ ] **Step 1: Validate Nuxt types and static generation**

Run:

```bash
pnpm exec nuxi prepare
pnpm generate
```

Expected: both commands exit successfully and `.output/public` is generated.

- [ ] **Step 2: Validate generated resources and metadata**

Run:

```bash
test -f .output/public/badge-navbar-dark.svg
test -f .output/public/badge-navbar-light.svg
test -f .output/public/favicon.svg
test -f .output/public/site.webmanifest
```

Expected: every selected asset is present.

- [ ] **Step 3: Validate the active development server**

Ensure `pnpm dev` is running and request:

```text
/
/clases-guitarra-electrica
/contacto
/badge-navbar-dark.svg
/badge-navbar-light.svg
/favicon.svg
/site.webmanifest
```

Expected: every route returns HTTP 200 with no `EMFILE` or runtime error.

- [ ] **Step 4: Review scope**

Confirm `git diff --check` passes and the diff contains only the approved brand placement, existing logo-resource integration, Netlify output correction, tests, specs, and plans. Do not commit unless the user explicitly requests it.
